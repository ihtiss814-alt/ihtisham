export function normalizedStatus(car) {
  return String(car?.status ?? '').trim().toLowerCase();
}

export function isAvailableVehicle(car) {
  return normalizedStatus(car) === 'available';
}

export function isSoldVehicle(car) {
  return ['sold', 'unavailable'].includes(normalizedStatus(car));
}

function hasText(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  return typeof value === 'number' ? Number.isFinite(value) : value != null;
}

function hasFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

export function validImageUrls(car) {
  const images = (car?.car_images ?? [])
    .filter(image => /^https?:\/\//i.test(image?.image_url ?? ''))
    .sort((a, b) => Number(Boolean(b.is_primary)) - Number(Boolean(a.is_primary))
      || (a.display_order ?? 0) - (b.display_order ?? 0));
  return [...new Set(images.map(image => image.image_url))];
}

export function vehicleQualityIssues(car) {
  const issues = [];
  if (!car || !hasText(car.ref_number) || /[\\/]/.test(String(car.ref_number).trim())) issues.push('invalid-reference');
  if (!hasText(car?.make)) issues.push('missing-make');
  if (!hasText(car?.model)) issues.push('missing-model');
  if (!hasFiniteNumber(car?.year)) issues.push('missing-year');
  if (!isAvailableVehicle(car)) issues.push('not-available');
  const hasMeaningfulSpecification = [
    car?.variant, car?.mileage_km, car?.engine_cc, car?.fuel_type,
    car?.transmission, car?.body_type, car?.drive, car?.color, car?.auction_grade,
  ].some(hasText);
  if (!hasMeaningfulSpecification) issues.push('missing-specifications');
  if (!validImageUrls(car).length) issues.push('missing-image');
  return issues;
}

export function isIndexableVehicle(car) {
  return vehicleQualityIssues(car).length === 0;
}

export function vehicleName(car) {
  return [car?.make, car?.model, car?.variant, car?.year ? String(car.year) : '']
    .filter(Boolean)
    .join(' ')
    .trim();
}

function joinFacts(facts) {
  if (facts.length < 2) return facts[0] ?? '';
  if (facts.length === 2) return `${facts[0]} and ${facts[1]}`;
  return `${facts.slice(0, -1).join(', ')}, and ${facts[facts.length - 1]}`;
}

export function vehicleSummary(car) {
  const name = vehicleName(car);
  const identityFacts = [
    car?.year != null ? `a ${car.year} model year` : null,
    car?.body_type ? `a ${String(car.body_type).toLowerCase()} body type` : null,
    car?.fuel_type ? `${String(car.fuel_type).toLowerCase()} fuel` : null,
    car?.transmission ? `${String(car.transmission).toLowerCase()} transmission` : null,
  ].filter(Boolean);
  const specificationFacts = [
    car?.mileage_km != null ? `${Number(car.mileage_km).toLocaleString('en-US')} km recorded mileage` : null,
    car?.engine_cc != null ? `${car.engine_cc} cc engine` : null,
    car?.drive ? `${car.drive} drive` : null,
    car?.color ? `${String(car.color).toLowerCase()} exterior colour` : null,
    car?.auction_grade ? `auction grade ${car.auction_grade}` : null,
  ].filter(Boolean);
  const firstSentence = identityFacts.length
    ? `${name} is ${joinFacts(identityFacts)}.`
    : `${name} is listed in the Wazir Trading vehicle inventory.`;
  const secondSentence = specificationFacts.length
    ? `The available record shows ${joinFacts(specificationFacts)}.`
    : '';
  return [firstSentence, secondSentence]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function vehicleImageAlt(car, index, suffix = 'vehicle photo') {
  const position = index > 0 ? ` ${index + 1}` : '';
  return `${vehicleName(car)} — ${suffix}${position}`.trim();
}

export function relatedVehicleScore(current, candidate) {
  if (!isIndexableVehicle(candidate) || candidate.ref_number === current.ref_number) return -1;
  let score = 0;
  if (candidate.make?.toLowerCase() === current.make?.toLowerCase()) score += 1000;
  if (candidate.model?.toLowerCase() === current.model?.toLowerCase()) score += 500;
  if (candidate.body_type && candidate.body_type === current.body_type) score += 250;
  if (candidate.fuel_type && candidate.fuel_type === current.fuel_type) score += 50;
  if (candidate.transmission && candidate.transmission === current.transmission) score += 50;
  if (Number.isFinite(current.year) && Number.isFinite(candidate.year)) {
    score += Math.max(0, 40 - Math.abs(current.year - candidate.year));
  }
  if (Number.isFinite(current.fob_price_usd) && Number.isFinite(candidate.fob_price_usd)) {
    const distance = Math.abs(current.fob_price_usd - candidate.fob_price_usd);
    score += Math.max(0, 20 - Math.min(20, distance / 1000));
  }
  return score;
}

export function rankRelatedVehicles(current, candidates, limit = 6) {
  const unique = new Map();
  for (const candidate of candidates) {
    if (candidate?.ref_number && !unique.has(candidate.ref_number)) unique.set(candidate.ref_number, candidate);
  }
  return [...unique.values()]
    .map((candidate, index) => ({ candidate, index, score: relatedVehicleScore(current, candidate) }))
    .filter(item => item.score >= 0)
    .sort((a, b) => b.score - a.score
      || Number(b.candidate.year ?? 0) - Number(a.candidate.year ?? 0)
      || String(a.candidate.ref_number).localeCompare(String(b.candidate.ref_number))
      || a.index - b.index)
    .slice(0, limit)
    .map(item => item.candidate);
}