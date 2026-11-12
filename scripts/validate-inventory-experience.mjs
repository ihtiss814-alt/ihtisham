import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(path.resolve(file), "utf8");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const cars = read("src/pages/cars.tsx");
const card = read("src/components/CarCard.tsx");
const styles = read("src/pages/cars.css");

check(
  cars.includes('useState<"grid" | "list">("grid")'),
  "Inventory must default to the accessible grid view.",
);
check(
  cars.includes('variant={viewMode === "grid" ? "catalog" : "row"}'),
  "Inventory must support grid and list card layouts.",
);
check(
  cars.includes('aria-pressed={viewMode === "grid"}') &&
    cars.includes('aria-pressed={viewMode === "list"}'),
  "Grid/list controls must expose the selected view to assistive technology.",
);
check(
  cars.includes('type="search"') &&
    cars.includes('aria-label="Search vehicles by make, model, variant, colour or reference"'),
  "Inventory search needs a clearly labelled search control.",
);
check(
  cars.includes('placeholder="Search manufacturers"') && cars.includes("filteredMakeOptions"),
  "The make facet must support searching manufacturer options.",
);
check(
  cars.includes("aria-pressed={Boolean(active)}"),
  "Facet choices must expose their selected state.",
);
check(
  cars.includes("aria-expanded={open}"),
  "Filter accordion controls must expose their expanded state.",
);
check(
  cars.includes('event.key === "Escape"') &&
    cars.includes('document.body.style.overflow = "hidden"'),
  "The mobile filter sheet must support Escape and prevent background scrolling while open.",
);
check(
  cars.includes("aria-hidden={!mobileFiltersOpen}"),
  "A closed mobile filter sheet must be hidden from assistive technology.",
);
check(
  cars.includes("cars-confidence-strip") && cars.includes("FOB price shown where recorded"),
  "Inventory must explain listing references and displayed price basis.",
);
check(
  card.includes('if (variant === "catalog")') && card.includes("inventory-card-specs"),
  "Catalog cards must show available vehicle facts.",
);
check(
  card.includes("FOB price · USD") && card.includes("Destination costs are quoted separately"),
  "Card pricing must identify the FOB basis and avoid implying a complete destination price.",
);
check(
  card.includes("quoteRequestHref") && card.includes("vehicleRef: car.ref_number"),
  "Each catalog card must offer a vehicle-specific quote route.",
);
check(
  styles.includes(".cars-catalog-grid") && styles.includes("@media (max-width: 600px)"),
  "The catalogue grid must have a responsive mobile layout.",
);
check(
  styles.includes(".cars-filter-search") && styles.includes(".cars-view-switch"),
  "The refreshed filter and view controls need dedicated styling.",
);

if (failures.length) {
  console.error("Inventory experience validation failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}

console.log("Inventory experience validation passed.");
