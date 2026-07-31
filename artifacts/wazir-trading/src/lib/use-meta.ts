import { useEffect } from 'react';

const BASE_TITLE    = 'Wazir Trading LLC — Import Japanese Cars';
const HOME_CANON    = 'https://wazirtradingllc.com/';
const HOME_ROBOTS   = 'index, follow';

/**
 * Sets page-level <title>, <meta name="description">, <link rel="canonical">,
 * and optionally <meta name="robots"> while the component is mounted.
 * Restores homepage defaults on unmount so navigating back works correctly.
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
    // ── Title ──────────────────────────────────────────────────────────────
    const prevTitle = document.title;
    document.title = title;

    // ── Description ────────────────────────────────────────────────────────
    const prevDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')?.getAttribute('content') ?? '';
    if (description) {
      let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!el) { el = document.createElement('meta'); el.name = 'description'; document.head.appendChild(el); }
      el.setAttribute('content', description);
    }

    // ── Canonical ──────────────────────────────────────────────────────────
    let canon = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; document.head.appendChild(canon); }
    const prevCanon = canon.href;
    if (canonical) canon.href = canonical;

    // ── Robots ─────────────────────────────────────────────────────────────
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const prevRobots = robots?.getAttribute('content') ?? HOME_ROBOTS;
    if (noindex) {
      if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots); }
      robots.setAttribute('content', 'noindex, nofollow');
    }

    return () => {
      document.title = prevTitle || BASE_TITLE;
      const d = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (d) d.setAttribute('content', prevDesc);
      const c = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (c) c.href = prevCanon || HOME_CANON;
      const r = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
      if (r) r.setAttribute('content', prevRobots);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
