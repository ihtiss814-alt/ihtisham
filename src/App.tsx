import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

// Components always needed — load eagerly
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/home';

// Load route pages eagerly instead of creating browser-side dynamic chunks.
// This avoids a deployment/CDN mismatch where /assets/<route-hash>.js is
// rewritten to HTML and the route crashes before it can render.
import CarsPage from '@/pages/cars';
import CarDetailPage from '@/pages/car-detail';
import AboutPage from '@/pages/about';
import HowItWorksPage from '@/pages/how-it-works';
import AutoPartsPage from '@/pages/auto-parts';
import ShippingInformationPage from '@/pages/shipping-information';
import ContactPage from '@/pages/contact';
import FaqsPage from '@/pages/faqs';
import PaymentInformationPage from '@/pages/payment-information';
import NotFound from '@/pages/not-found';
import AdminBulkUpload from '@/pages/admin/bulk-upload';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,       // 60 s — avoid refetching on every mount
      gcTime: 5 * 60_000,      // 5 min cache retention
      retry: 1,
    },
  },
});

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);
  return null;
}

type AppErrorBoundaryState = { hasError: boolean };

/**
 * A route should never turn the whole preview into a blank page because one
 * record has an unexpected value. The route still logs the original error,
 * while giving visitors a recoverable screen instead of an empty document.
 */
class AppErrorBoundary extends React.Component<
  React.PropsWithChildren,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled application error:', error, info);
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
            We couldn’t load this page correctly. Please try again or return to
            the home page.
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
              onClick={() => { window.location.href = '/'; }}
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

function Router() {
  return (
    <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/cars" component={CarsPage} />
        <Route path="/cars/:ref" component={CarDetailPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/how-it-works" component={HowItWorksPage} />
        <Route path="/auto-parts" component={AutoPartsPage} />
        <Route path="/shipping-information" component={ShippingInformationPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/faqs" component={FaqsPage} />
        <Route path="/payment-information" component={PaymentInformationPage} />
        <Route path="/admin/bulk-upload" component={AdminBulkUpload} />
        <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isAdmin = location.startsWith('/admin');

  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <Router />
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
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

function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <AppShell />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}

export default App;
