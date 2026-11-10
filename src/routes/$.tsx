import { createFileRoute, notFound } from '@tanstack/react-router';
import WazirApp from '../components/WazirApp';
import { buildSeoHead, loadSeoBootstrap } from '../lib/seo-bootstrap';

export const Route = createFileRoute('/$')({
  loader: async ({ location }) => {
    const bootstrap = await loadSeoBootstrap(location.pathname, location.searchStr);
    if (bootstrap.notFound) throw notFound();
    return bootstrap;
  },
  head: ({ loaderData }) => buildSeoHead(loaderData),
  component: CatchAll,
});

function CatchAll() {
  const bootstrap = Route.useLoaderData();
  const ssrPath = `${bootstrap.pathname}${bootstrap.search}`;
  return <WazirApp ssrPath={ssrPath} bootstrap={bootstrap} />;
}
