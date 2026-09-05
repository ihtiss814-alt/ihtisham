import { useEffect } from 'react';

const BASE_TITLE  = 'Japanese Used Cars for Export | Wazir Trading LLC';
const BASE_DESC   = 'Wazir Trading LLC — Browse current Japanese used vehicle listings, review specifications and photos, and request export information.';
const HOME_CANON  = 'https://www.wazirtradingllc.com/';
const HOME_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1';

/** Create-or-update a meta tag; pass content = null to remove it. */
function setMeta(attr: 'name' | 'property', key: string, content: string | null) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets page-level <title>, meta description, canonical, robots, and the
 * matching Open Graph / Twitter tags while the component is mounted.
 * Restores homepage defaults on unmount so navigating back works correctly,
 * and ensures every route (including noindex pages) restores a crawlable
 * robots directive when the visitor returns to a public page.
 */
export function useMeta({
  title,
  description,
  canonical,
  noindex = false,
}: {
  title: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
}) {
  useEffect(() => {
    // ── Title ────────────────────────────────────────────────────────────
    const prevTitle = document.title;
    document.title = title;

    // ── Description ──────────────────────────────────────────────────────
    const prevDesc =
      document.querySelector<HTMLMetaElement>('meta[name="description"]')?.getAttribute('content') ?? '';
    if (description) setMeta('name', 'description', description);

    // ── Canonical ────────────────────────────────────────────────────────
    let canon = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.rel = 'canonical';
      document.head.appendChild(canon);
    }
    const prevCanon = canon.href;
    const pageUrl = canonical || HOME_CANON;
    canon.href = pageUrl;

    // ── Robots — always set explicitly so state never leaks between pages ─
    const prevRobots =
      document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.getAttribute('content') ?? HOME_ROBOTS;
    setMeta('name', 'robots', noindex ? 'noindex, follow' : HOME_ROBOTS);

    // ── Social tags — per page so shared links preview correctly ──────────
    const desc = description || BASE_DESC;
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', pageUrl);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);

    return () => {
      document.title = prevTitle || BASE_TITLE;
      setMeta('name', 'description', prevDesc || BASE_DESC);
      const c = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (c) c.href = prevCanon || HOME_CANON;
      setMeta('name', 'robots', prevRobots || HOME_ROBOTS);
      setMeta('property', 'og:title', prevTitle || BASE_TITLE);
      setMeta('property', 'og:description', prevDesc || BASE_DESC);
      setMeta('property', 'og:url', prevCanon || HOME_CANON);
      setMeta('name', 'twitter:title', prevTitle || BASE_TITLE);
      setMeta('name', 'twitter:description', prevDesc || BASE_DESC);
    };
  }, [title, description, canonical, noindex]);
}
