import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(path.resolve(file), "utf8");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const cars = read("src/pages/cars.tsx");
const card = read("src/components/CarCard.tsx");
const catchAllRoute = read("src/routes/$.tsx");

check(
  catchAllRoute.includes('loaderData?.pathname === "/cars"') &&
    catchAllRoute.includes('"Cache-Control": "private, no-store, max-age=0, must-revalidate"'),
  "Live inventory HTML must not be cached after a transient database/bootstrap failure.",
);

check(
  cars.includes("const [inventoryError, setInventoryError] = useState") &&
    cars.includes('setInventoryError("")') &&
    cars.includes("setInventoryError(") &&
    cars.includes("We could not load the live vehicle inventory."),
  "Inventory requests must clear stale errors, record failed requests, and retry cleanly.",
);
check(
  cars.includes("Live inventory could not be loaded") &&
    cars.includes("Retry inventory") &&
    cars.includes('role="alert"'),
  "A failed inventory request must have a visible, accessible retry state.",
);
check(
  cars.includes("fetchCars(filters, activeTab, sortBy, page)"),
  "The retry action must re-run the current search and filters.",
);
check(
  cars.includes("!inventoryError && (") &&
    cars.includes("Your search has not been treated as having zero matches") &&
    cars.includes("<Pagination page={page} total={totalCount} onPage={handlePageChange} />"),
  "An inventory API failure must not be presented as an empty search result or valid pagination.",
);
for (const status of ["Available", "Sold", "Reserved", "Unavailable", "Confirm availability"]) {
  check(card.includes(`"${status}"`), `Vehicle card status mapping is missing ${status}.`);
}
check(
  card.includes("Stock location not listed") && !card.includes('car.stock_location || "Japan"'),
  "Cards must not invent Japan as the stock location when the record has no location.",
);

if (failures.length) {
  console.error("Inventory reliability validation failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("Inventory reliability validation passed.");
