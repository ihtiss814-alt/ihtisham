import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Router as WouterRouter, useLocation, useRoute } from "wouter";

// Components always needed — load eagerly
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/home";

// Load route pages eagerly instead of creating browser-side dynamic chunks.
// This avoids a deployment/CDN mismatch where /assets/<route-hash>.js is
// rewritten to HTML and the route crashes before it can render.
import CarsPage from "@/pages/cars";
import CarDetailPage from "@/pages/car-detail";
import AboutPage from "@/pages/about";
import HowItWorksPage from "@/pages/how-it-works";
import AutoPartsPage from "@/pages/auto-parts";
import ShippingInformationPage from "@/pages/shipping-information";
import ContactPage from "@/pages/contact";
import FaqsPage from "@/pages/faqs";
import PaymentInformationPage from "@/pages/payment-information";
import BuyerInformationPage from "@/pages/buyer-information";
import TermsAndConditionsPage from "@/pages/terms-and-conditions";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import NotFound from "@/pages/not-found";
import AdminBulkUpload from "@/pages/admin/bulk-upload";
import { prefetchCarsPage } from "@/pages/cars";
import { prefetchVehicleDetail } from "@/lib/vehicle-request-cache";
import { CountryDirectoryPage, CountryLandingPageRoute } from "@/pages/country-landing-pages";
import {
  VehicleBodyTypeLandingRoute,
  VehicleLandingDirectoryPage,
  VehicleMakeLandingRoute,
  VehicleModelLandingRoute,
} from "@/pages/vehicle-landing-pages";

function ScrollToTop() {
  const [location] = useLocation();
  const positions = React.useRef(new Map<string, number>());
  const restoring = React.useRef(false);
  useEffect(() => {
    const keyName = "__wazirScrollEntry";
    const nativePush = window.history.pushState;
    const nativeReplace = window.history.replaceState;
    const previous = window.history.scrollRestoration;
    const stateOf = (value: unknown): Record<string, unknown> =>
      value && typeof value === "object" ? (value as Record<string, unknown>) : {};
    const newKey = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    const initial = stateOf(window.history.state);
    let activeKey = typeof initial[keyName] === "string" ? (initial[keyName] as string) : newKey();
    if (typeof initial[keyName] !== "string")
      nativeReplace.call(
        window.history,
        { ...initial, [keyName]: activeKey },
        "",
        window.location.href,
      );
    const save = () => positions.current.set(activeKey, window.scrollY);
    window.history.pushState = function (state, unused, url) {
      save();
      const nextKey = newKey();
      const result = nativePush.call(
        window.history,
        { ...stateOf(state), [keyName]: nextKey },
        unused,
        url,
      );
      activeKey = nextKey;
      return result;
    };
    window.history.replaceState = function (state, unused, url) {
      const next = stateOf(state);
      const nextKey = typeof next[keyName] === "string" ? (next[keyName] as string) : activeKey;
      const result = nativeReplace.call(
        window.history,
        { ...next, [keyName]: nextKey },
        unused,
        url,
      );
      activeKey = nextKey;
      return result;
    };
    const pop = (event: PopStateEvent) => {
      const state = stateOf(event.state);
      if (typeof state[keyName] === "string") activeKey = state[keyName] as string;
      restoring.current = true;
      requestAnimationFrame(() => {
        window.scrollTo({
          top: positions.current.get(activeKey) ?? 0,
          left: 0,
          behavior: "instant",
        });
        restoring.current = false;
      });
    };
    window.history.scrollRestoration = "manual";
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("popstate", pop);
    return () => {
      window.removeEventListener("scroll", save);
      window.removeEventListener("popstate", pop);
      window.history.pushState = nativePush;
      window.history.replaceState = nativeReplace;
      window.history.scrollRestoration = previous;
    };
  }, []);
  useEffect(() => {
    if (!restoring.current) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function NavigationPrefetcher() {
  useEffect(() => {
    const seen = new Map<string, number>();
    const prefetch = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      let run: (() => void) | null = null;
      if (url.pathname === "/cars" && !url.search) run = prefetchCarsPage;
      else {
        const match = url.pathname.match(/^\/cars\/([^/]+)\/?$/);
        if (match) {
          try {
            const ref = decodeURIComponent(match[1]);
            run = () => prefetchVehicleDetail(ref);
          } catch {
            return;
          }
        }
      }
      if (!run) return;
      const key = url.pathname + url.search;
      if (Date.now() - (seen.get(key) ?? 0) < 15000) return;
      seen.set(key, Date.now());
      const idle = window as Window & {
        requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      };
      if (idle.requestIdleCallback) idle.requestIdleCallback(run, { timeout: 900 });
      else window.setTimeout(run, 100);
    };
    document.addEventListener("pointerover", prefetch, { passive: true });
    document.addEventListener("focusin", prefetch);
    return () => {
      document.removeEventListener("pointerover", prefetch);
      document.removeEventListener("focusin", prefetch);
    };
  }, []);
  return null;
}

type AppErrorBoundaryState = { hasError: boolean };

/**
 * A route should never turn the whole preview into a blank page because one
 * record has an unexpected value. The route still logs the original error,
 * while giving visitors a recoverable screen instead of an empty document.
 */
class AppErrorBoundary extends React.Component<React.PropsWithChildren, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Unhandled application error:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-sm border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
            Wazir Trading LLC
          </p>
          <h1 className="mb-3 font-serif text-2xl font-bold text-[#0D1B3E]">
            This page needs a refresh
          </h1>
          <p className="mb-6 text-sm leading-6 text-gray-500">
            We couldn’t load this page correctly. Please try again or return to the home page.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-sm bg-[#C8102E] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="rounded-sm border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
            >
              Go home
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function CountrySlugRoute() {
  const [match, params] = useRoute("/import-japanese-cars/:slug");
  if (!match || !params?.slug) return <NotFound />;
  return <CountryLandingPageRoute slug={params.slug} />;
}

function VehicleMakePathRoute() {
  const [match, params] = useRoute("/used-japanese-cars/:makeSlug");
  if (!match || !params?.makeSlug) return <NotFound />;
  return <VehicleMakeLandingRoute slug={params.makeSlug} />;
}

function VehicleModelPathRoute() {
  const [match, params] = useRoute("/used-japanese-cars/:makeSlug/:modelSlug");
  if (!match || !params?.makeSlug || !params?.modelSlug) return <NotFound />;
  return <VehicleModelLandingRoute makeSlug={params.makeSlug} modelSlug={params.modelSlug} />;
}

function VehicleBodyTypePathRoute() {
  const [match, params] = useRoute("/used-japanese-cars/body-type/:bodySlug");
  if (!match || !params?.bodySlug) return <NotFound />;
  return <VehicleBodyTypeLandingRoute slug={params.bodySlug} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/cars" component={CarsPage} />
      <Route path="/cars/:ref" component={CarDetailPage} />
      <Route path="/import-japanese-cars" component={CountryDirectoryPage} />
      <Route path="/import-japanese-cars/:slug" component={CountrySlugRoute} />
      <Route path="/used-japanese-cars" component={VehicleLandingDirectoryPage} />
      <Route path="/used-japanese-cars/body-type/:bodySlug" component={VehicleBodyTypePathRoute} />
      <Route path="/used-japanese-cars/:makeSlug/:modelSlug" component={VehicleModelPathRoute} />
      <Route path="/used-japanese-cars/:makeSlug" component={VehicleMakePathRoute} />
      <Route path="/about" component={AboutPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/auto-parts" component={AutoPartsPage} />
      <Route path="/shipping-information" component={ShippingInformationPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/faqs" component={FaqsPage} />
      <Route path="/payment-information" component={PaymentInformationPage} />
      <Route path="/buyer-information" component={BuyerInformationPage} />
      <Route path="/terms-and-conditions" component={TermsAndConditionsPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/admin/bulk-upload" component={AdminBulkUpload} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <NavigationPrefetcher />
        <Router />
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <NavigationPrefetcher />
      <div className="flex flex-col min-h-[100dvh]">
        <Navbar />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
      </div>
    </>
  );
}

function App({ ssrPath = "/" }: { ssrPath?: string }) {
  return (
    <AppErrorBoundary>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
          <AppShell />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </AppErrorBoundary>
  );
}

export default App;
