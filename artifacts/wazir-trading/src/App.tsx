import React, { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

// Components always needed — load eagerly
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Pages — lazy-loaded so each route only downloads its own code
const HomePage      = React.lazy(() => import('@/pages/home'));
const CarsPage      = React.lazy(() => import('@/pages/cars'));
const CarDetailPage = React.lazy(() => import('@/pages/car-detail'));
const AboutPage     = React.lazy(() => import('@/pages/about'));
const HowItWorksPage          = React.lazy(() => import('@/pages/how-it-works'));
const ShippingInformationPage = React.lazy(() => import('@/pages/shipping-information'));
const ContactPage             = React.lazy(() => import('@/pages/contact'));
const FaqsPage                = React.lazy(() => import('@/pages/faqs'));
const PaymentInformationPage  = React.lazy(() => import('@/pages/payment-information'));
const NotFound                = React.lazy(() => import('@/pages/not-found'));

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

// Minimal skeleton shown while a lazy chunk is downloading (rare after first load)
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse" aria-hidden="true" />
  );
}

function Router() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/cars" component={CarsPage} />
        <Route path="/cars/:ref" component={CarDetailPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/how-it-works" component={HowItWorksPage} />
        <Route path="/shipping-information" component={ShippingInformationPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/faqs" component={FaqsPage} />
        <Route path="/payment-information" component={PaymentInformationPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ScrollToTop />
          <div className="flex flex-col min-h-[100dvh]">
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
