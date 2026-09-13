export type SmartSearchVocabulary = {
  makes: string[];
  models: string[];
  bodyTypes: string[];
  fuels: string[];
  transmissions: string[];
  drives: string[];
  locations: string[];
  colors: string[];
};

export type SmartSearchFilters = {
  make?: string;
  body?: string;
  fuel?: string;
  trans?: string;
  drive?: string;
  location?: string;
  advModel?: string;
  advColor?: string;
  advYearFrom?: string;
  advYearTo?: string;
  advMinPrice?: string;
  advMaxPrice?: string;
  smartFuel?: 'hybrid' | 'gasoline' | 'electric' | 'diesel';
  smartTrans?: 'automatic' | 'manual';
  smartDrive?: '4wd' | '2wd';
  smartMinMileage?: string;
  smartMaxMileage?: string;
  smartMinEngine?: string;
  smartMaxEngine?: string;
};

export type SmartSearchResult = {
  filters: SmartSearchFilters;
  cleanedQuery: string;
  corrections: string[];
  interpretations: string[];
  confidence: number;
  hasIntent: boolean;
};

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'any', 'are', 'at', 'car', 'cars', 'condition', 'find',
  'for', 'from', 'good', 'have', 'i', 'in', 'looking', 'me', 'my', 'of',
  'please', 'show', 'the', 'to', 'vehicle', 'vehicles', 'want', 'with',
  'year', 'years', 'price', 'priced', 'under', 'below', 'less', 'than',
  'over', 'above', 'up', 'upto', 'maximum', 'minimum', 'max', 'min',
  'mileage', 'miles', 'kilometers', 'kilometres', 'km', 'engine', 'cc',
  'cheap', 'cheapest', 'affordable', 'budget', 'new', 'used', 'automatic',
  'family', 'large', 'small', 'best', 'low', 'high', 'clean', 'reliable',
  'luxury', 'sport', 'sports',
  'auto', 'manual', 'gear', 'transmission', 'petrol', 'gas', 'diesel',
  'hybrid', 'electric', 'ev', 'awd', '4wd', '4x4', 'fwd', '2wd',
  'lac', 'lakh', 'thousand', 'million', 'dollars', 'usd', 'pkr', 'rs',
]);

const ALIASES: Array<{
  terms: string[];
  filter: SmartSearchFilters;
  label: string;
}> = [
  { terms: ['automatic', 'auto', 'automatic transmission'], filter: { smartTrans: 'automatic' }, label: 'automatic transmission' },
  { terms: ['manual', 'manual gear', 'stick shift'], filter: { smartTrans: 'manual' }, label: 'manual transmission' },
  { terms: ['4wd', '4x4', 'awd', 'four wheel drive', 'four wheel'], filter: { smartDrive: '4wd' }, label: '4WD / AWD' },
  { terms: ['2wd', 'fwd', 'two wheel drive', 'front wheel drive'], filter: { smartDrive: '2wd' }, label: '2WD / FWD' },
  { terms: ['hybrid', 'hybrids'], filter: { smartFuel: 'hybrid' }, label: 'hybrid fuel' },
  { terms: ['petrol', 'gas', 'gasoline'], filter: { smartFuel: 'gasoline' }, label: 'gasoline / petrol' },
  { terms: ['electric', 'ev', 'electric vehicle'], filter: { smartFuel: 'electric' }, label: 'electric fuel' },
  { terms: ['diesel'], filter: { smartFuel: 'diesel' }, label: 'diesel fuel' },
];

function normalize(value: string): string {
  return value
    .toLocaleLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function tokens(value: string): string[] {
  return normalize(value).split(' ').filter(Boolean);
}

function unique(values: string[]): string[] {
  return [...new Set(values.map(value => value.trim()).filter(Boolean))];
}

function editDistance(a: string, b: string): number {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = previous[0];
    previous[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const saved = previous[j];
      previous[j] = a[i - 1] === b[j - 1]
        ? diagonal
        : Math.min(previous[j] + 1, previous[j - 1] + 1, diagonal + 1);
      diagonal = saved;
    }
  }
  return previous[b.length];
}

function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;
  if (a.includes(b) || b.includes(a)) {
    return Math.min(a.length, b.length) / Math.max(a.length, b.length) * 0.1 + 0.88;
  }
  return 1 - editDistance(a, b) / Math.max(a.length, b.length);
}

function hasWordPhrase(queryTokens: string[], phraseTokens: string[]): number {
  if (phraseTokens.length > queryTokens.length) return -1;
  for (let start = 0; start <= queryTokens.length - phraseTokens.length; start += 1) {
    if (phraseTokens.every((token, offset) => queryTokens[start + offset] === token)) {
      return start;
    }
  }
  return -1;
}

function markConsumed(consumed: Set<number>, start: number, length: number) {
  for (let index = start; index < start + length; index += 1) consumed.add(index);
}

type ValueMatch = {
  value: string;
  start: number;
  length: number;
  score: number;
  corrected: boolean;
};

function findValueMatch(queryTokens: string[], values: string[], consumed: Set<number>): ValueMatch | null {
  const candidates = unique(values)
    .map(value => ({ value, normalized: tokens(value) }))
    .filter(candidate => candidate.normalized.length > 0)
    .sort((a, b) => b.normalized.length - a.normalized.length || b.value.length - a.value.length);

  let best: ValueMatch | null = null;

  for (const candidate of candidates) {
    const exactStart = hasWordPhrase(queryTokens, candidate.normalized);
    if (exactStart >= 0 && candidate.normalized.every((_, offset) => !consumed.has(exactStart + offset))) {
      return {
        value: candidate.value,
        start: exactStart,
        length: candidate.normalized.length,
        score: 1,
        corrected: false,
      };
    }
  }

  for (const candidate of candidates) {
    if (candidate.normalized.length !== 1 || candidate.normalized[0].length < 4) continue;
    for (let index = 0; index < queryTokens.length; index += 1) {
      const queryToken = queryTokens[index];
      if (consumed.has(index) || queryToken.length < 4 || STOP_WORDS.has(queryToken)) continue;
      const score = similarity(queryToken, candidate.normalized[0]);
      const allowed = Math.max(1, Math.floor(candidate.normalized[0].length / 4));
      if (score >= 0.72 && editDistance(queryToken, candidate.normalized[0]) <= allowed) {
        if (!best || score > best.score) {
          best = {
            value: candidate.value,
            start: index,
            length: 1,
            score,
            corrected: queryToken !== candidate.normalized[0],
          };
        }
      }
    }
  }
  return best;
}

function findAlias(queryTokens: string[], consumed: Set<number>) {
  let best: { alias: typeof ALIASES[number]; start: number; length: number } | null = null;
  for (const alias of ALIASES) {
    for (const term of alias.terms) {
      const phraseTokens = tokens(term);
      const start = hasWordPhrase(queryTokens, phraseTokens);
      if (
        start >= 0 &&
        phraseTokens.every((_, offset) => !consumed.has(start + offset)) &&
        (!best || phraseTokens.length > best.length)
      ) {
        best = { alias, start, length: phraseTokens.length };
      }
    }
  }
  return best;
}

function toNumber(value: string): number {
  return Number(value.replace(/,/g, ''));
}

function parseAmount(raw: string, pkrRate: number): number | null {
  const match = raw
    .toLocaleLowerCase()
    .replace(/,/g, '')
    .match(/(?:rs\.?|pkr|₨|\$|usd|dollars?)?\s*(\d+(?:\.\d+)?)\s*(k|thousand|lac|lakh|million|m)?/);
  if (!match) return null;

  let amount = Number(match[1]);
  const unit = match[2];
  if (unit === 'k' || unit === 'thousand') amount *= 1_000;
  if (unit === 'million' || unit === 'm') amount *= 1_000_000;
  if (unit === 'lac' || unit === 'lakh') amount *= 100_000 / pkrRate;
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return Math.round(amount);
}

function addNumberIntent(
  raw: string,
  pkrRate: number,
  filters: SmartSearchFilters,
  consumed: Set<number>,
  queryTokens: string[],
  interpretations: string[],
) {
  const hasExplicitPriceUnit = /[$₨]|(?:usd|dollars?|pkr|rs\.?|lac|lakh|thousand|million)\b|\bk\b/i.test(raw);
  const isYearOnly = (value: string) => /^(?:19|20)\d{2}$/.test(value.trim());
  if (!hasExplicitPriceUnit && [...raw.matchAll(/\b(?:19|20)\d{2}\b/g)].length > 0) {
    // "from 2018 to 2020" is a year range, not a $2,018–$2,020 price range.
    // Bare year phrases should be handled only by the year parser below.
    const numericMatches = [...raw.matchAll(/\b(?:19|20)\d{2}\b/g)].map(match => match[0]);
    if (numericMatches.length >= 1 && numericMatches.every(isYearOnly)) return false;
  }
  const amountPattern = '(?:\\$|rs\\.?|pkr|₨|usd)?\\s*\\d[\\d,]*(?:\\.\\d+)?\\s*(?:k|thousand|lac|lakh|million|m)?';
  const range = raw.match(new RegExp(`(?:between|from)\\s+(${amountPattern})\\s+(?:and|to)\\s+(${amountPattern})`, 'i'));
  const max = raw.match(new RegExp(`(?:under|below|up to|upto|less than|maximum|max)\\s+(${amountPattern})`, 'i'));
  const min = raw.match(new RegExp(`(?:over|above|more than|minimum|min|starting at|from)\\s+(${amountPattern})`, 'i'));

  const setBounds = (low: string | undefined, high: string | undefined) => {
    const minValue = low ? parseAmount(low, pkrRate) : null;
    const maxValue = high ? parseAmount(high, pkrRate) : null;
    if (minValue !== null) {
      filters.advMinPrice = String(minValue);
      interpretations.push(`from $${minValue.toLocaleString()}`);
    }
    if (maxValue !== null) {
      filters.advMaxPrice = String(maxValue);
      interpretations.push(`up to $${maxValue.toLocaleString()}`);
    }
    return minValue !== null || maxValue !== null;
  };

  if (range && setBounds(range[1], range[2])) {
    // Number tokens are consumed below so they do not become residual search text.
  } else if (max && setBounds(undefined, max[1])) {
    // Handled as a price ceiling.
  } else if (min && setBounds(min[1], undefined)) {
    // Handled as a price floor.
  } else {
    return false;
  }

  queryTokens.forEach((token, index) => {
    if (/^\d/.test(token) || /^\d/.test(token.replace(/^(rs|pkr|usd)$/, ''))) consumed.add(index);
  });
  return true;
}

function addNumericBounds(
  raw: string,
  filters: SmartSearchFilters,
  consumed: Set<number>,
  queryTokens: string[],
  interpretations: string[],
) {
  const mileage = raw.match(/(?:under|below|less than|max(?:imum)?)\s+([\d,]+)\s*(?:k|thousand)?\s*(?:km|kilometers?|miles?)/i);
  const engine = raw.match(/(?:around|about|with|engine)?\s*([\d,.]+)\s*(?:cc|l|litre|liter)\b/i);
  let found = false;

  if (mileage) {
    let value = toNumber(mileage[1]);
    const suffix = mileage[0].toLocaleLowerCase();
    if (/\bk\b|\bthousand\b/.test(suffix)) value *= 1_000;
    filters.smartMaxMileage = String(Math.round(value));
    interpretations.push(`under ${Math.round(value).toLocaleString()} km`);
    found = true;
  }
  if (engine) {
    let value = Number(engine[1].replace(/,/g, ''));
    if (/\bl\b|\blitre\b|\bliter\b/i.test(engine[0])) value *= 1_000;
    if (Number.isFinite(value) && value > 0) {
      const lower = Math.max(0, Math.round(value - 100));
      const upper = Math.round(value + 100);
      filters.smartMinEngine = String(lower);
      filters.smartMaxEngine = String(upper);
      interpretations.push(`around ${Math.round(value).toLocaleString()} cc`);
      found = true;
    }
  }
  if (found) {
    queryTokens.forEach((token, index) => {
      if (/^\d/.test(token)) consumed.add(index);
    });
  }
  return found;
}

export function parseSmartSearch(
  rawQuery: string,
  vocabulary: SmartSearchVocabulary,
  pkrRate = 278,
): SmartSearchResult {
  const raw = rawQuery.trim();
  if (!raw) {
    return {
      filters: {},
      cleanedQuery: '',
      corrections: [],
      interpretations: [],
      confidence: 1,
      hasIntent: false,
    };
  }

  const queryTokens = tokens(raw);
  const consumed = new Set<number>();
  const filters: SmartSearchFilters = {};
  const corrections: string[] = [];
  const interpretations: string[] = [];

  let alias = findAlias(queryTokens, consumed);
  while (alias) {
    Object.assign(filters, alias.alias.filter);
    markConsumed(consumed, alias.start, alias.length);
    interpretations.push(alias.alias.label);
    alias = findAlias(queryTokens, consumed);
  }

  const valueFields: Array<{
    key: keyof SmartSearchFilters;
    values: string[];
    label: string;
  }> = [
    { key: 'make', values: vocabulary.makes, label: 'make' },
    { key: 'advModel', values: vocabulary.models, label: 'model' },
    { key: 'body', values: vocabulary.bodyTypes, label: 'body type' },
    { key: 'advColor', values: vocabulary.colors, label: 'color' },
    { key: 'location', values: vocabulary.locations, label: 'location' },
  ];

  for (const field of valueFields) {
    const match = findValueMatch(queryTokens, field.values, consumed);
    if (!match) continue;
    (filters as Record<string, string>)[field.key] = match.value;
    markConsumed(consumed, match.start, match.length);
    interpretations.push(`${field.label}: ${match.value}`);
    if (match.corrected) corrections.push(match.value);
  }

  const transmission = findValueMatch(queryTokens, vocabulary.transmissions, consumed);
  if (transmission) {
    filters.trans = transmission.value;
    markConsumed(consumed, transmission.start, transmission.length);
    interpretations.push(`transmission: ${transmission.value}`);
    if (transmission.corrected) corrections.push(transmission.value);
  }

  const fuel = findValueMatch(queryTokens, vocabulary.fuels, consumed);
  if (fuel && !filters.smartFuel) {
    filters.fuel = fuel.value;
    markConsumed(consumed, fuel.start, fuel.length);
    interpretations.push(`fuel: ${fuel.value}`);
    if (fuel.corrected) corrections.push(fuel.value);
  }

  const drive = findValueMatch(queryTokens, vocabulary.drives, consumed);
  if (drive && !filters.smartDrive) {
    filters.drive = drive.value;
    markConsumed(consumed, drive.start, drive.length);
    interpretations.push(`drive: ${drive.value}`);
    if (drive.corrected) corrections.push(drive.value);
  }

  const yearRange = raw.match(/\b((?:19|20)\d{2})\s*(?:-|to|through)\s*((?:19|20)\d{2})\b/i);
  const years = [...raw.matchAll(/\b((?:19|20)\d{2})\b/g)].map(match => match[1]);
  if (yearRange) {
    filters.advYearFrom = yearRange[1];
    filters.advYearTo = yearRange[2];
    interpretations.push(`years ${yearRange[1]}–${yearRange[2]}`);
  } else if (years.length > 0) {
    filters.advYearFrom = years[0];
    filters.advYearTo = years[0];
    interpretations.push(`year ${years[0]}`);
  }
  queryTokens.forEach((token, index) => {
    if (/^(?:19|20)\d{2}$/.test(token)) consumed.add(index);
  });

  addNumberIntent(raw, pkrRate, filters, consumed, queryTokens, interpretations);
  addNumericBounds(raw, filters, consumed, queryTokens, interpretations);

  const residual = queryTokens
    .filter((token, index) => !consumed.has(index) && !STOP_WORDS.has(token) && !/^\d+$/.test(token))
    .join(' ');
  const hasIntent = interpretations.length > 0;
  const confidence = hasIntent
    ? Math.min(0.99, 0.7 + interpretations.length * 0.06 + corrections.length * 0.04)
    : 0.2;

  return {
    filters,
    cleanedQuery: hasIntent ? residual : normalize(raw),
    corrections,
    interpretations,
    confidence,
    hasIntent,
  };
}