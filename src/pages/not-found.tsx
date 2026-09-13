import { useEffect } from 'react';
import { Link } from 'wouter';

/**
 * Client-side 404. Marked noindex so thin error pages never enter the index,
 * and routes visitors back into the crawlable site architecture.
 */
export default function NotFound() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Page Not Found | Wazir Trading LLC';

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const prevRobots = robots?.getAttribute('content') ?? '';
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, follow');

    return () => {
      document.title = prevTitle;
      robots?.setAttribute('content', prevRobots || 'index, follow, max-image-preview:large, max-snippet:-1');
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md text-center">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
          Wazir Trading LLC
        </p>
        <h1 className="mb-3 font-serif text-3xl font-bold text-[#0D1B3E]">
          Page not found
        </h1>
        <p className="mb-8 text-sm leading-6 text-gray-500">
          The page you are looking for no longer exists or has moved. Browse our
          current Japanese vehicle stock or contact our export team for help.
        </p>
        <nav aria-label="Helpful links" className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-sm bg-[#C8102E] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Home
          </Link>
          <Link
            href="/cars"
            className="rounded-sm border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
          >
            Browse cars
          </Link>
          <Link
            href="/contact"
            className="rounded-sm border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
          >
            Contact us
          </Link>
        </nav>
      </div>
    </div>
  );
}
