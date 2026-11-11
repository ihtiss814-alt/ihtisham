import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, CarFront, ShieldCheck } from "lucide-react";
import CarCard, { resolvePrimaryImage, type Car } from "@/components/CarCard";
import { quoteRequestHref } from "@/lib/destination-links";
import { BodyTypeIcon, MakeLogo } from "@/components/VehicleIdentity";
import NotFound from "@/pages/not-found";
import { useSeoBootstrap } from "@/lib/seo-bootstrap-context";
import { useMeta } from "@/lib/use-meta";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { isIndexableVehicle, type VehicleSeoCar } from "@/lib/vehicle-seo";
import {
  MODEL_LANDING_PAGES,
  VEHICLE_LANDING_DIRECTORY_PATH,
  getBodyTypeLandingPage,
  getMakeLandingPage,
  getModelLandingPage,
  vehicleLandingCarsFilterPath,
  vehicleLandingDirectoryCounts,
  vehicleLandingDirectorySections,
  type VehicleLandingInventorySummary,
  type VehicleLandingPage,
  MIN_INDEXABLE_LANDING_STOCK,
  summarizeVehicleLandingInventory,
  vehicleLandingAliasOrFilter,
} from "@/lib/vehicle-landing-pages";

function VehiclePageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-[#0D1B3E] text-white" style={{ paddingTop: "var(--header-h)" }}>
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65 mb-4">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-3xl md:text-5xl font-serif font-bold leading-tight">
          {title}
        </h1>
        <p className="max-w-3xl mt-5 text-base md:text-lg leading-relaxed text-white/75">
          {description}
        </p>
      </div>
    </section>
  );
}

export function VehicleLandingDirectoryPage() {
  const bootstrap = useSeoBootstrap();
  const [location] = useLocation();
  const hasQuery = Boolean(
    location.split("?")[1] ||
    (bootstrap?.pathname === VEHICLE_LANDING_DIRECTORY_PATH &&
      new URLSearchParams(bootstrap?.search ?? "").toString()),
  );
  useMeta({
    title: "Japanese Used Cars by Make, Model & Body Type | Wazir Trading",
    description:
      "Browse Japanese used vehicle guides by manufacturer, model and body type. Compare specifications and view matching available inventory from Japan.",
    canonical: `https://www.wazirtradingllc.com${VEHICLE_LANDING_DIRECTORY_PATH}`,
    noindex: hasQuery,
  });
  const sections = vehicleLandingDirectorySections();
  const directoryCounts = vehicleLandingDirectoryCounts();

  return (
    <div className="min-h-screen bg-background">
      <VehiclePageIntro
        eyebrow="Japanese vehicle catalogue"
        title="Find Japanese Used Cars by Make, Model or Body Type"
        description="Explore manufacturer, model and body-style guides for Japanese used vehicles. Each guide explains the details worth comparing and, when qualifying stock is available, links directly to current vehicle records from Japan."
      />
      <main className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <CarFront size={17} /> {directoryCounts.makes} manufacturers · {directoryCounts.models}{" "}
            models · {directoryCounts.bodyTypes} body styles
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Browse vehicle guides
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Available stock changes as vehicles are added or sold. Individual guide pages are
            eligible for search indexing only while enough complete, photographed, available vehicle
            records match that make, model or body style. A guide does not guarantee that a matching
            vehicle is currently in stock.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <section
              key={section.title}
              aria-labelledby={`vehicle-section-${section.title.replace(/\W+/g, "-").toLowerCase()}`}
            >
              <h2
                id={`vehicle-section-${section.title.replace(/\W+/g, "-").toLowerCase()}`}
                className="text-xl md:text-2xl font-serif font-bold text-foreground border-b border-border pb-3 mb-5"
              >
                {section.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.pages.map((page) => (
                  <Link
                    key={page.path}
                    href={page.path}
                    className="group flex items-center justify-between gap-3 border border-border bg-card px-4 py-4 hover:border-primary/50 transition-colors"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      {page.kind === "body-type" ? (
                        <BodyTypeIcon bodyType={page.bodyType || page.label} />
                      ) : (
                        <MakeLogo make={page.make || page.label} />
                      )}
                      <span className="min-w-0">
                        <span className="block font-semibold text-foreground">{page.label}</span>
                        <span className="block mt-1 text-xs text-muted-foreground">
                          {page.kind === "make"
                            ? "Browse manufacturer stock"
                            : page.kind === "model"
                              ? `${page.make} model guide`
                              : "Browse matching body style"}
                        </span>
                      </span>
                    </span>
                    <ArrowRight
                      size={17}
                      className="text-primary shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 border border-border bg-muted/30 p-6 md:p-8">
          <h2 className="text-xl font-serif font-bold text-foreground">
            Want to see every available vehicle?
          </h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Open the main inventory to use make, model, price, body-type and specification filters.
            Check the individual vehicle record and ask us to confirm its current status and
            quotation in writing.
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 mt-5 bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
          >
            Browse available vehicles <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
}

type ClientLandingInventory = {
  path: string;
  cars: Car[];
  availableCount: number;
  qualifiedCount: number;
  resolved: boolean;
  summary?: VehicleLandingInventorySummary;
};

function DetailPageContent({ page }: { page: VehicleLandingPage }) {
  const bootstrap = useSeoBootstrap();
  const [location] = useLocation();
  const matchingBootstrap = bootstrap?.pathname === page.path;
  const hasQuery = Boolean(
    location.split("?")[1] ||
    (matchingBootstrap && new URLSearchParams(bootstrap?.search ?? "").toString()),
  );
  const serverInventoryResolved =
    matchingBootstrap && bootstrap?.vehicleLandingResolved === true && !hasQuery;
  const [clientInventory, setClientInventory] = useState<ClientLandingInventory | null>(null);

  useEffect(() => {
    let active = true;
    setClientInventory(null);

    if (serverInventoryResolved || hasQuery)
      return () => {
        active = false;
      };
    if (!isSupabaseConfigured) {
      setClientInventory({
        path: page.path,
        cars: [],
        availableCount: 0,
        qualifiedCount: 0,
        resolved: false,
      });
      return () => {
        active = false;
      };
    }

    const loadInventory = async () => {
      try {
        let query = supabase
          .from("cars")
          .select("*, car_images(image_url, is_primary, display_order)", { count: "exact" })
          .eq("status", "available");
        if (page.make) {
          const aliases = page.makeAliases?.length ? page.makeAliases : [page.make];
          query =
            aliases.length > 1
              ? query.or(vehicleLandingAliasOrFilter("make", aliases))
              : query.ilike("make", aliases[0]);
        }
        if (page.model) {
          const aliases = page.modelAliases?.length ? page.modelAliases : [page.model];
          query =
            aliases.length > 1
              ? query.or(vehicleLandingAliasOrFilter("model", aliases))
              : query.ilike("model", aliases[0]);
        }
        if (page.bodyType) {
          const aliases = page.bodyTypeAliases?.length ? page.bodyTypeAliases : [page.bodyType];
          query =
            aliases.length > 1
              ? query.or(vehicleLandingAliasOrFilter("body_type", aliases))
              : query.ilike("body_type", aliases[0]);
        }

        const { data, count, error } = await query
          .order("created_at", { ascending: false })
          .range(0, 199);
        if (error) throw error;

        const qualifying = ((data ?? []) as unknown as VehicleSeoCar[]).filter(isIndexableVehicle);
        if (!active) return;
        setClientInventory({
          path: page.path,
          cars: qualifying.slice(0, 8) as unknown as Car[],
          availableCount: count ?? data?.length ?? 0,
          qualifiedCount: qualifying.length,
          summary: summarizeVehicleLandingInventory(qualifying, count ?? data?.length ?? 0),
          resolved: true,
        });
      } catch (error) {
        console.warn(`Could not load ${page.path} vehicle inventory in the browser:`, error);
        if (active)
          setClientInventory({
            path: page.path,
            cars: [],
            availableCount: 0,
            qualifiedCount: 0,
            resolved: false,
          });
      }
    };

    void loadInventory();
    return () => {
      active = false;
    };
  }, [page.path, page.make, page.model, page.bodyType, serverInventoryResolved, hasQuery]);

  const activeClientInventory = clientInventory?.path === page.path ? clientInventory : null;
  const cars = serverInventoryResolved
    ? ((bootstrap?.vehicleLandingCars ?? []) as unknown as Car[])
    : (activeClientInventory?.cars ?? []);
  const inventoryResolved = serverInventoryResolved || activeClientInventory?.resolved === true;
  const availableCount = serverInventoryResolved
    ? (bootstrap?.vehicleLandingAvailableCount ?? 0)
    : (activeClientInventory?.availableCount ?? 0);
  const qualifiedCount = serverInventoryResolved
    ? (bootstrap?.vehicleLandingQualifiedCount ?? 0)
    : (activeClientInventory?.qualifiedCount ?? 0);
  const noindex =
    hasQuery ||
    page.directoryVisible === false ||
    !inventoryResolved ||
    qualifiedCount < MIN_INDEXABLE_LANDING_STOCK;

  useMeta({
    title: page.title,
    description: page.description,
    canonical: `https://www.wazirtradingllc.com${page.path}`,
    noindex,
  });

  const carsFilterPath = vehicleLandingCarsFilterPath(page);
  const inventorySummary = serverInventoryResolved
    ? bootstrap?.vehicleLandingInventorySummary
    : activeClientInventory?.summary;
  const relatedModels =
    page.kind === "make"
      ? MODEL_LANDING_PAGES.filter(
          (item) => item.directoryVisible !== false && item.makeSlug === page.slug,
        )
      : page.kind === "model"
        ? MODEL_LANDING_PAGES.filter(
            (item) =>
              item.directoryVisible !== false &&
              item.makeSlug === page.makeSlug &&
              item.path !== page.path,
          )
        : [];

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-[#0D1B3E] text-white" style={{ paddingTop: "var(--header-h)" }}>
        <div className="container mx-auto px-4 md:px-8 py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={VEHICLE_LANDING_DIRECTORY_PATH} className="hover:text-white">
              Japanese Used Cars
            </Link>
            <span className="mx-2">/</span>
            {page.kind === "model" && page.make && (
              <>
                <Link
                  href={`${VEHICLE_LANDING_DIRECTORY_PATH}/${page.makeSlug}`}
                  className="hover:text-white"
                >
                  {page.make}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-white">{page.label}</span>
          </nav>
          <div className="mb-5 flex items-center gap-3">
            {page.kind === "body-type" ? (
              <BodyTypeIcon bodyType={page.bodyType || page.label} />
            ) : (
              <MakeLogo make={page.make || page.label} size="lg" />
            )}
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">
              {page.kind === "make"
                ? "Manufacturer guide"
                : page.kind === "model"
                  ? "Model guide"
                  : "Body-style guide"}
            </p>
          </div>
          <h1 className="max-w-4xl text-3xl md:text-5xl font-serif font-bold leading-tight">
            {page.kind === "body-type"
              ? `Japanese ${page.label} Vehicles for Export`
              : `${page.label} Used Cars from Japan`}
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg leading-relaxed text-white/75">
            {page.intro}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={carsFilterPath}
              className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-5 py-3 text-sm font-bold hover:opacity-90"
            >
              View matching stock <ArrowRight size={16} />
            </Link>
            <Link
              href={quoteRequestHref({
                vehicleModel: [page.make, page.model].filter(Boolean).join(" ") || page.label,
                requestType: "sourcing",
              })}
              className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Ask about a vehicle
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14">
          <article className="min-w-0 space-y-10">
            {inventoryResolved && inventorySummary && (
              <section
                aria-labelledby="inventory-snapshot-heading"
                className="border border-border bg-card p-5 md:p-6"
              >
                <h2
                  id="inventory-snapshot-heading"
                  className="text-xl font-serif font-bold text-foreground"
                >
                  Current {page.label} inventory snapshot
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The live catalogue currently reports{" "}
                  {inventorySummary.availableCount.toLocaleString()} available matching vehicle
                  record(s). The details below are calculated from the matching listings that passed
                  the page’s vehicle data and image checks.
                </p>
                <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Qualified listings checked</dt>
                    <dd className="mt-1 font-semibold text-foreground">
                      {inventorySummary.qualifiedCount}
                    </dd>
                  </div>
                  {inventorySummary.oldestYear != null && inventorySummary.newestYear != null && (
                    <div>
                      <dt className="text-muted-foreground">Model years represented</dt>
                      <dd className="mt-1 font-semibold text-foreground">
                        {inventorySummary.oldestYear}–{inventorySummary.newestYear}
                      </dd>
                    </div>
                  )}
                  {inventorySummary.bodyStyles.length > 0 && (
                    <div>
                      <dt className="text-muted-foreground">Body styles</dt>
                      <dd className="mt-1 font-semibold text-foreground">
                        {inventorySummary.bodyStyles.join(", ")}
                      </dd>
                    </div>
                  )}
                  {inventorySummary.engineSizes.length > 0 && (
                    <div>
                      <dt className="text-muted-foreground">Engine sizes recorded</dt>
                      <dd className="mt-1 font-semibold text-foreground">
                        {inventorySummary.engineSizes
                          .map((size) => `${size.toLocaleString()} cc`)
                          .join(", ")}
                      </dd>
                    </div>
                  )}
                  {inventorySummary.fuelTypes.length > 0 && (
                    <div>
                      <dt className="text-muted-foreground">Fuel types</dt>
                      <dd className="mt-1 font-semibold text-foreground">
                        {inventorySummary.fuelTypes.join(", ")}
                      </dd>
                    </div>
                  )}
                  {inventorySummary.transmissions.length > 0 && (
                    <div>
                      <dt className="text-muted-foreground">Transmissions</dt>
                      <dd className="mt-1 font-semibold text-foreground">
                        {inventorySummary.transmissions.join(", ")}
                      </dd>
                    </div>
                  )}
                </dl>
                {inventorySummary.variantExamples.length > 0 && (
                  <p className="mt-4 text-xs leading-5 text-muted-foreground">
                    Examples of grades or variants in the checked inventory:{" "}
                    {inventorySummary.variantExamples.join(", ")}. Confirm the precise grade and
                    equipment against each vehicle’s reference.
                  </p>
                )}
              </section>
            )}
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                What to compare when choosing {page.label}
              </h2>
              <p className="text-muted-foreground leading-7">{page.buyerGuide}</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                Buyer checklist
              </h2>
              <ol className="space-y-4">
                {page.focusPoints.map((point, index) => (
                  <li key={point} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="text-muted-foreground leading-7">{point}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section id="matching-stock" className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground">
                    Matching vehicles in current inventory
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {inventoryResolved
                      ? `${availableCount.toLocaleString()} available stock record(s) currently match this filter.`
                      : "Live inventory counts are not currently available for this guide."}
                  </p>
                </div>
                <Link
                  href={carsFilterPath}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Open filtered inventory <ArrowRight size={15} />
                </Link>
              </div>
              {cars.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {cars.map((car) => (
                      <CarCard
                        key={car.ref_number}
                        car={car}
                        variant="grid"
                        primaryImage={resolvePrimaryImage(car.car_images)}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-5 text-muted-foreground">
                    These are matching vehicle records that passed the site’s minimum SEO
                    data-quality checks when this page was rendered. Availability and price can
                    change; confirm both with Wazir Trading before payment.
                  </p>
                </>
              ) : (
                <div className="border border-border bg-muted/30 p-6 md:p-8">
                  <p className="font-semibold text-foreground">
                    There are no qualifying vehicle cards to show right now.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-6">
                    Stock changes over time. Open the main inventory or contact our team with the
                    make or model you are looking for.
                  </p>
                  <Link
                    href="/cars"
                    className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-primary hover:underline"
                  >
                    Browse all vehicles <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </section>

            {relatedModels.length > 0 && (
              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                  Explore {page.make} models
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedModels.map((related) => (
                    <Link
                      key={related.path}
                      href={related.path}
                      className="flex items-center justify-between gap-3 border border-border bg-card px-4 py-3 hover:border-primary/50 transition-colors"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <MakeLogo make={page.make || related.make || related.label} size="sm" />
                        <span className="font-semibold text-foreground">{related.label}</span>
                      </span>
                      <ArrowRight size={16} className="text-primary" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                Frequently asked questions
              </h2>
              <div className="space-y-3">
                {page.faqs.map((faq) => (
                  <details key={faq.question} className="group border border-border bg-card p-4">
                    <summary className="cursor-pointer list-none font-semibold text-foreground flex items-center justify-between gap-4">
                      {faq.question}
                      <span
                        className="text-primary text-xl leading-none group-open:rotate-45 transition-transform"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-5">
            <div className="border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.18em] mb-3">
                <ShieldCheck size={16} /> Before you buy
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">
                Verify the exact vehicle
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-6">
                Ask us to confirm the reference number, current availability, specification,
                condition information, FOB price and export scope in writing. Do not rely on a model
                description as a substitute for the vehicle-specific record.
              </p>
              <Link
                href={quoteRequestHref({
                  vehicleModel: [page.make, page.model].filter(Boolean).join(" ") || page.label,
                  requestType: "sourcing",
                })}
                className="inline-flex w-full items-center justify-center gap-2 mt-5 bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
              >
                Contact our team <ArrowRight size={16} />
              </Link>
            </div>
            <div className="border border-border p-6">
              <h2 className="font-semibold text-foreground">Related information</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/cars" className="text-muted-foreground hover:text-primary">
                    Browse all available vehicles
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-muted-foreground hover:text-primary">
                    How buying works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping-information"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Shipping information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buyer-information"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Buyer checklist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/import-japanese-cars"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Destination import guides
                  </Link>
                </li>
                <li>
                  <Link
                    href={VEHICLE_LANDING_DIRECTORY_PATH}
                    className="text-muted-foreground hover:text-primary"
                  >
                    All make, model and body-style guides
                  </Link>
                </li>
              </ul>
            </div>
            {page.kind !== "make" && page.make && (
              <div className="border border-border p-6">
                <h2 className="font-semibold text-foreground">Manufacturer</h2>
                <Link
                  href={`${VEHICLE_LANDING_DIRECTORY_PATH}/${page.makeSlug}`}
                  className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-primary hover:underline"
                >
                  More {page.make} listings <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </aside>
        </div>
        <div className="mt-12 border-l-4 border-primary bg-muted/40 p-5">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <ShieldCheck size={18} className="text-primary" /> Stock and import notice
          </div>
          <p className="mt-2 text-sm text-muted-foreground leading-6">
            This guide is general buying information, not a guarantee of stock, mechanical
            condition, shipping availability or destination import approval. Individual vehicles,
            export routes, duties, taxes, permits and local registration requirements must be
            confirmed for the specific enquiry.
          </p>
        </div>
      </main>
    </div>
  );
}

export function VehicleMakeLandingRoute({ slug }: { slug: string }) {
  const page = getMakeLandingPage(slug);
  return page ? <DetailPageContent page={page} /> : <NotFound />;
}

export function VehicleModelLandingRoute({
  makeSlug,
  modelSlug,
}: {
  makeSlug: string;
  modelSlug: string;
}) {
  const page = getModelLandingPage(makeSlug, modelSlug);
  return page ? <DetailPageContent page={page} /> : <NotFound />;
}

export function VehicleBodyTypeLandingRoute({ slug }: { slug: string }) {
  const page = getBodyTypeLandingPage(slug);
  return page ? <DetailPageContent page={page} /> : <NotFound />;
}
