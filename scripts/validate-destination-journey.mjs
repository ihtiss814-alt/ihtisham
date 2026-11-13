import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(path.resolve(file), "utf8");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const globalCountries = read("src/lib/global-destination-countries.ts");
const shipping = read("src/lib/shipping.ts");
const destinationHook = read("src/hooks/useDestinationPreference.ts");
const destinationFields = read("src/components/DestinationFields.tsx");
const destinationControl = read("src/components/DestinationPreferenceControl.tsx");
const links = read("src/lib/destination-links.ts");
const quotePage = read("src/pages/request-a-quote.tsx");
const app = read("src/App.tsx");
const seo = read("src/lib/seo-bootstrap.ts");
const sitemap = read("src/routes/sitemap[.]xml.ts");
const navbar = read("src/components/Navbar.tsx");
const footer = read("src/components/Footer.tsx");
const home = read("src/pages/home.tsx");
const cars = read("src/pages/cars.tsx");
const vehicleDetail = read("src/pages/car-detail.tsx");
const contact = read("src/pages/contact.tsx");
const countryPages = read("src/pages/country-landing-pages.tsx");
const vehiclePages = read("src/pages/vehicle-landing-pages.tsx");
const howToBuy = read("src/components/HowToBuy.tsx");

const globalCountryNames = [...globalCountries.matchAll(/^\s{2}"([^"]+)",?$/gm)].map(
  (match) => match[1],
);
check(
  globalCountryNames.length >= 240,
  `Global destination selector only has ${globalCountryNames.length} entries; expected at least 240 countries/territories.`,
);
check(
  new Set(globalCountryNames).size === globalCountryNames.length,
  "Global destination country list contains duplicate names.",
);
check(
  shipping.includes(
    'import { GLOBAL_DESTINATION_COUNTRIES } from "./global-destination-countries";',
  ),
  "Shipping registry does not import the global country/territory list.",
);
check(
  shipping.includes("export const DEST_COUNTRIES = [...destinationOptions.values()]"),
  "Destination selector is not built from the global country list.",
);
check(
  shipping.includes("const portKey = port.trim();"),
  "Shipping rate lookup does not normalize free-text port input.",
);
check(
  shipping.includes('.eq("country", countryKey)') && shipping.includes('.eq("port", portKey)'),
  "Shipping rate lookup must match the exact selected country and port in the database.",
);
check(
  !shipping.includes("portsFor(countryKey).includes(port)"),
  "Shipping rate lookup still blocks destinations based on the optional port suggestion list.",
);
check(
  shipping.includes("!Number.isFinite(freight)") &&
    shipping.includes("!Number.isFinite(inspection)") &&
    shipping.includes("!Number.isFinite(insuranceRate)"),
  "Shipping rate lookup does not validate all numeric rate fields.",
);
check(
  shipping.includes("if (rate == null) return null;"),
  "Landed-cost calculator must return no estimate when no exact route rate exists.",
);
check(
  shipping.includes(
    "Optional common port/city suggestions. An empty list does not mean shipping is unavailable.",
  ),
  "Port suggestions must not describe an empty suggestion list as a service-unavailability decision.",
);

check(
  destinationHook.includes("wazir_destination_preference_v1") &&
    destinationHook.includes("wazir:destination-preference-change"),
  "Saved destination preference must use the versioned local setting and sync event.",
);
check(
  destinationHook.includes("window.localStorage") &&
    destinationHook.includes('window.addEventListener("storage"'),
  "Saved destination preference does not support same-device persistence and cross-tab synchronization.",
);
check(
  !destinationHook.includes("email") &&
    !destinationHook.includes("phone") &&
    !destinationHook.includes("name"),
  "Destination preference must not store personally identifying inquiry details.",
);
check(
  destinationFields.includes('type="text"') && destinationFields.includes("<datalist"),
  "Destination port field must allow free text with optional suggestions.",
);
check(
  destinationFields.includes("Suggested locations are only starting points;") &&
    destinationFields.includes("landlocked country"),
  "Destination helper must explain that suggestions are not confirmation and support landlocked destination cities.",
);
check(
  destinationControl.includes(
    "Saving this preference does not confirm an available shipping route or a price.",
  ) &&
    destinationControl.includes("onCountryChange={(nextCountry) => {") &&
    destinationControl.includes('setPort("");'),
  "Header destination selector must avoid route guarantees and clear a stale port when its country changes.",
);
check(
  links.includes("export function quoteRequestHref") && links.includes("countryGuidePathForName"),
  "Shared destination-aware link helpers are missing.",
);

check(
  app.includes('import RequestQuotePage from "@/pages/request-a-quote";') &&
    app.includes('<Route path="/request-a-quote" component={RequestQuotePage} />'),
  "Guided quote page is not registered as a public route.",
);
check(
  seo.includes('"/request-a-quote": {') && seo.includes("Request a Japanese Car Export Quote"),
  "Guided quote route has no dedicated SEO bootstrap metadata.",
);
check(sitemap.includes('"/request-a-quote"'), "Guided quote page is missing from the XML sitemap.");
check(
  quotePage.includes('canonical: "https://www.wazirtradingllc.com/request-a-quote"'),
  "Guided quote page does not declare its clean canonical URL.",
);
check(
  quotePage.includes('from "@/lib/whatsapp-enquiries"') &&
    quotePage.includes("openWhatsAppEnquiry(whatsappMessage)"),
  "Guided quote form must use the WhatsApp-first enquiry hand-off.",
);
check(
  quotePage.includes("const changeCountry = (country: string) => {") &&
    quotePage.includes('setField("port", "");') &&
    quotePage.includes("preference.setDestination({ country: form.country, port: form.port })"),
  "Guided quote flow must retain destination preference and clear a stale port when the country changes.",
);
check(
  quotePage.includes("Destination country:") &&
    quotePage.includes("Preferred port / city:") &&
    quotePage.includes("Target budget (USD):") &&
    quotePage.includes("Requirements:") &&
    quotePage.includes("Vehicle reference:") &&
    quotePage.includes("Vehicle / model:"),
  "WhatsApp quote message must preserve vehicle, destination, budget and requirements.",
);
check(
  quotePage.includes("vehicleRef") &&
    quotePage.includes("vehicleModel") &&
    quotePage.includes('params.get("type")'),
  "Guided quote page does not accept vehicle and request-type prefills.",
);
check(
  quotePage.includes("does not reserve a vehicle") &&
    quotePage.includes("does not reserve a vehicle, confirm route availability") &&
    quotePage.includes("import") &&
    quotePage.includes("permit"),
  "Guided quote page lacks non-binding enquiry and eligibility disclosure.",
);
check(
  quotePage.includes("not currently published for every territory"),
  "Guided quote page does not explain when country-specific guidance is unavailable.",
);

check(
  navbar.includes("DestinationPreferenceControl") && navbar.includes("/request-a-quote"),
  "Header navigation is missing saved destination selection or guided quote CTA.",
);
check(
  footer.includes('href: "/request-a-quote"') &&
    footer.includes('href: "/import-japanese-cars"') &&
    footer.includes('href: "/used-japanese-cars"'),
  "Footer does not connect the main purchase and destination guide hubs.",
);
check(
  home.includes("countryGuidePathForName") &&
    home.includes("quoteRequestHref") &&
    home.includes("Plan an export quote"),
  "Homepage destination and quote actions are not connected to the new journey.",
);
check(
  !/function CantFindCarSection\(\)\s*\{\s*const \[form,/.test(home),
  "Homepage still contains the duplicate custom sourcing form instead of the guided request journey.",
);

check(
  cars.includes("function TotalPriceCalculator") &&
    cars.includes("<DestinationFields") &&
    cars.includes("useDestinationPreference"),
  "Inventory calculator is not connected to free-text destination and saved preference.",
);
check(
  cars.includes("const calculatorId = useId();") &&
    cars.includes("name={`${calculatorId}-calc-inspection`}") &&
    cars.includes("name={`${calculatorId}-calc-insurance`}"),
  "Each responsive calculator instance must have unique radio groups and must not hard-code duplicate destination element IDs.",
);
check(
  !cars.includes('idPrefix="inventory-calculator"'),
  "Responsive calculator instances must use generated unique destination field IDs.",
);
check(
  cars.includes("QUOTE REQUIRED") && /will not substitute a generic freight price/i.test(cars),
  "Inventory calculator must request a quote instead of estimating an unknown route.",
);
check(
  !/useState\(["']Pakistan["']\)/.test(
    cars.slice(
      cars.indexOf("function TotalPriceCalculator"),
      cars.indexOf("function OfferPriceDialog"),
    ),
  ),
  "Inventory calculator still silently defaults the customer to Pakistan.",
);
check(
  vehicleDetail.includes("vehicle-estimate-destination") &&
    vehicleDetail.includes("vehicle-inquiry-destination"),
  "Vehicle detail estimate and inquiry do not share the destination component.",
);
check(
  vehicleDetail.includes("quoteRequestHref") &&
    vehicleDetail.includes("Request a written route quote"),
  "Vehicle detail no-rate result does not continue into a prefilled quote request.",
);
check(
  !vehicleDetail.includes("COUNTRY_PORTS") && !vehicleDetail.includes("DEST_COUNTRIES"),
  "Vehicle detail page still limits destination input to the static route suggestion list.",
);
check(
  contact.includes("DestinationFields") &&
    contact.includes("country={country}") &&
    contact.includes("port={port}") &&
    contact.includes("onCountryChange={(nextCountry) => {") &&
    contact.includes('setPort("");') &&
    contact.includes("destination.setDestination({ country: nextCountry, port: \" \" })") === false &&
    contact.includes('destination.setDestination({ country: nextCountry, port: "" });'),
  "Contact form must capture a free-text location and clear an old port when its country changes.",
);
check(
  countryPages.includes("quoteRequestHref(") &&
    countryPages.includes("country: country.name") &&
    vehiclePages.includes("quoteRequestHref(") &&
    vehiclePages.includes("vehicleModel:"),
  "Country and make/model guides do not hand their context into the quote flow.",
);
check(
  howToBuy.includes('href="/request-a-quote"') && howToBuy.includes("may be separate"),
  "How-to-buy section must offer the quote planner and explain destination cost exclusions.",
);
check(
  !howToBuy.includes("You always know the full cost") &&
    !howToBuy.includes("a full cost estimate") &&
    !howToBuy.includes("Shipping arranged for you"),
  "How-to-buy copy still contains unqualified price or service guarantees.",
);

if (failures.length) {
  console.error("DESTINATION & INQUIRY JOURNEY VALIDATION FAILED");
  for (const failure of failures) console.error(` - ${failure}`);
  process.exit(1);
}

console.log("Destination and inquiry journey validation passed.");
console.log(
  ` - ${new Set(globalCountryNames).size} unique global country/territory options checked`,
);
console.log(" - exact DB route-rate matching and unknown-rate handling checked");
console.log(" - saved destination preference and optional location input checked");
console.log(" - request-a-quote route, SEO metadata, sitemap and prefills checked");
console.log(" - header/footer/home/country/model/vehicle/contact paths checked");
console.log(
  " - no unqualified full-cost or route-availability guarantee found in the how-to-buy flow",
);
