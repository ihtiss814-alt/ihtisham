import { createContext, useContext, type ReactNode } from 'react';
import type { SeoBootstrapData } from './seo-bootstrap';

const SeoBootstrapContext = createContext<SeoBootstrapData | null>(null);

export function SeoBootstrapProvider({
  value,
  children,
}: {
  value: SeoBootstrapData | null;
  children: ReactNode;
}) {
  return (
    <SeoBootstrapContext.Provider value={value}>
      {children}
    </SeoBootstrapContext.Provider>
  );
}

export function useSeoBootstrap(): SeoBootstrapData | null {
  return useContext(SeoBootstrapContext);
}
