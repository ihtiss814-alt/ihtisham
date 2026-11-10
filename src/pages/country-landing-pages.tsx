import { Link } from 'wouter';
import { ArrowRight, ExternalLink, Globe2, ShieldCheck } from 'lucide-react';
import {
  COUNTRY_LANDING_PAGES,
  getCountryLandingPage,
  type CountryLandingPage as CountryPageData,
} from '@/lib/country-landing-pages';

const DIRECTORY_PATH = '/import-japanese-cars';

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="bg-[#0D1B3E] text-white" style={{ paddingTop: 'var(--header-h)' }}>
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65 mb-4">{eyebrow}</p>
        <h1 className="max-w-4xl text-3xl md:text-5xl font-serif font-bold leading-tight">{title}</h1>
        <p className="max-w-3xl mt-5 text-base md:text-lg leading-relaxed text-white/75">{description}</p>
      </div>
    </section>
  );
}

export function CountryDirectoryPage() {
  const regions = Array.from(new Set(COUNTRY_LANDING_PAGES.map((country) => country.region)));

  return (
    <div className="min-h-screen bg-background">
      <PageIntro
        eyebrow="Destination research"
        title="Japanese Used Car Import Guides by Country"
        description="Explore destination-specific planning guides for buyers researching Japanese used vehicles. Each guide links to official customs or government information and lists the details to confirm before requesting a vehicle-specific export quotation."
      />
      <section className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3"><Globe2 size={17} /> {COUNTRY_LANDING_PAGES.length} destination guides</div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Choose your destination</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">Import rules, vehicle eligibility, taxes and port procedures vary by country and can change. Use the official sources on each page and confirm the current requirements with the destination authority or a qualified customs professional.</p>
        </div>
        <div className="space-y-10">
          {regions.map((region) => {
            const countries = COUNTRY_LANDING_PAGES.filter((country) => country.region === region);
            return (
              <section key={region} aria-labelledby={`region-${region.replace(/\W+/g, '-').toLowerCase()}`}>
                <h3 id={`region-${region.replace(/\W+/g, '-').toLowerCase()}`} className="text-lg font-bold text-foreground border-b border-border pb-3 mb-4">{region}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {countries.map((country) => (
                    <Link key={country.slug} href={`${DIRECTORY_PATH}/${country.slug}`} className="group flex items-center justify-between gap-3 border border-border bg-card px-4 py-4 hover:border-primary/50 transition-colors">
                      <span className="font-semibold text-foreground">{country.name}</span>
                      <ArrowRight size={17} className="text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        <div className="mt-12 border border-border bg-muted/30 p-6 md:p-8">
          <h2 className="text-xl font-serif font-bold text-foreground">Need help preparing a vehicle enquiry?</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">Send us the destination, vehicle reference or specifications, and intended port. We can review the enquiry and confirm whether a suitable export quotation can be prepared. Destination import approval and taxes must be verified separately.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 mt-5 bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">Contact Wazir Trading <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}

function CountryPageContent({ country }: { country: CountryPageData }) {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-[#0D1B3E] text-white" style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container mx-auto px-4 md:px-8 py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>
            <Link href={DIRECTORY_PATH} className="hover:text-white">Import by Country</Link><span className="mx-2">/</span>
            <span className="text-white">{country.name}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65 mb-4">{country.region} · Destination guide</p>
          <h1 className="max-w-4xl text-3xl md:text-5xl font-serif font-bold leading-tight">{country.name}: Japanese Used Vehicle Import Guide</h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg leading-relaxed text-white/75">{country.intro}</p>
          <p className="mt-6 text-xs text-white/55">Official-source review date: {country.reviewedOn}</p>
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14">
          <article className="min-w-0 space-y-10">
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Before choosing a vehicle for {country.name}</h2>
              <p className="text-muted-foreground leading-7">{country.buyerContext}</p>
            </section>
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Import and customs points to verify</h2>
              <p className="text-muted-foreground leading-7">{country.regulatorySnapshot}</p>
              <div className="mt-5 border-l-4 border-primary bg-muted/40 p-5">
                <div className="flex items-center gap-2 font-semibold text-foreground"><ShieldCheck size={18} className="text-primary" /> Important buyer notice</div>
                <p className="mt-2 text-sm text-muted-foreground leading-6">This page is a starting-point guide, not legal, customs or tax advice and not confirmation that a particular vehicle can be imported. Rules, duties, permits and carrier services can change. Confirm eligibility and current charges with the relevant authority or a qualified local professional before paying or arranging shipment.</p>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Checklist before requesting a quotation</h2>
              <ol className="space-y-4">
                {country.checks.map((check, index) => (
                  <li key={check} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">{index + 1}</span>
                    <p className="text-muted-foreground leading-7">{check}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">What to include in your enquiry</h2>
              <p className="text-muted-foreground leading-7">{country.quoteFocus}</p>
              <Link href="/contact" className="inline-flex items-center gap-2 mt-5 bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">Send a vehicle enquiry <ArrowRight size={16} /></Link>
            </section>
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Official information and useful sources</h2>
              <p className="text-sm text-muted-foreground mb-4">Use these government and official trade resources to confirm the current requirements. The authority’s latest notice takes precedence over this summary.</p>
              <ul className="space-y-3">
                {country.sources.map((source) => (
                  <li key={source.url} className="border border-border p-4">
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary">{source.label}<ExternalLink size={14} /></a>
                    <p className="mt-1 text-xs text-muted-foreground">{source.authority}</p>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="space-y-5">
            <div className="border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">For buyers in {country.name}</p>
              <h2 className="text-xl font-serif font-bold text-foreground">Request a destination-specific review</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-6">Tell us which vehicle you are considering and which port you intend to use. We will review whether an export quotation can be prepared for your enquiry.</p>
              <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 mt-5 bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">Contact our team <ArrowRight size={16} /></Link>
            </div>
            <div className="border border-border p-6">
              <h2 className="font-semibold text-foreground">Related information</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li><Link href="/cars" className="text-muted-foreground hover:text-primary">Browse available vehicles</Link></li>
                <li><Link href="/shipping-information" className="text-muted-foreground hover:text-primary">Shipping information</Link></li>
                <li><Link href="/buyer-information" className="text-muted-foreground hover:text-primary">Buyer checklist</Link></li>
                <li><Link href="/faqs" className="text-muted-foreground hover:text-primary">Frequently asked questions</Link></li>
                <li><Link href={DIRECTORY_PATH} className="text-muted-foreground hover:text-primary">All destination guides</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export function CountryLandingPageRoute({ slug }: { slug: string }) {
  const country = getCountryLandingPage(slug);
  if (!country) return null;
  return <CountryPageContent country={country} />;
}
