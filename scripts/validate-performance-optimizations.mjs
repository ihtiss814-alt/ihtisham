import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const failures = [];
const pass = (message) => console.log(`PASS ${message}`);
const fail = (message) => failures.push(message);

const home = read("src/pages/home.tsx");
const homepageCache = read("src/lib/homepage-inventory-cache.ts");
const cars = read("src/pages/cars.tsx");
const card = read("src/components/CarCard.tsx");
const gallery = read("src/components/VehiclePhotoGallery.tsx");
const imageDelivery = read("src/lib/image-delivery.ts");
const app = read("src/App.tsx");
const homeRoute = read("src/routes/index.tsx");
const contact = read("src/pages/contact.tsx");
const payment = read("src/pages/payment-information.tsx");
const vercel = read("vercel.json");

if (
  !home.includes("getAvailableStockCount()") ||
  !home.includes("getHomepageInventoryCounts(") ||
  !home.includes('cachedRequest("homepage:featured-vehicles"')
) {
  fail("Homepage must share cached stock/category counts and cache featured inventory.");
} else {
  pass("Homepage shares cached inventory counts and featured inventory reads.");
}

if (
  !home.includes("car_images(image_url,is_primary,display_order)") ||
  home.includes("fetchCarImages(")
) {
  fail("Featured vehicle photos must be loaded in the same query as featured vehicle rows.");
} else {
  pass("Featured vehicle rows and their image relation are loaded together.");
}

if (
  !home.includes("IntersectionObserver") ||
  !home.includes('rootMargin: "500px 0px"') ||
  !homepageCache.includes(".select(\"id\", { count: \"exact\", head: true })")
) {
  fail("Homepage category counts must be deferred near the viewport and remain exact DB counts.");
} else {
  pass("Homepage category counts are deferred and remain exact Supabase counts.");
}

if (
  home.includes("w=2400&q=85") ||
  !home.includes("w=1920&q=80") ||
  !home.includes("loadedSlides.has(index)") ||
  !home.includes("prefers-reduced-motion")
) {
  fail("Hero images must use smaller progressive slide loading and respect reduced motion.");
} else {
  pass("Hero image payload is reduced, slides load progressively, and reduced-motion is respected.");
}

if (
  !homeRoute.includes('rel: "preload"') ||
  !homeRoute.includes("photo-1503376780353-7e6692767b70")
) {
  fail("Homepage must preload its first hero/LCP image.");
} else {
  pass("Homepage preloads the first hero/LCP image.");
}

if (
  !cars.includes("const CARS_LIST_SELECT") ||
  cars.includes('.select("*", { count: "exact" })') ||
  /const CARS_LIST_SELECT\s*=\s*["'][^"']*chassis_number/.test(cars)
) {
  fail("Inventory list must use an explicit public projection without chassis_number.");
} else {
  pass("Inventory list uses explicit public fields and does not fetch chassis_number.");
}

for (const cacheKey of ["cars:filter-options", "cars:tab-counts", "cars:models:"]) {
  if (!cars.includes(cacheKey)) fail(`Inventory query cache is missing: ${cacheKey}.`);
}
if (failures.length === 0) pass("Inventory filter metadata, tab counts, and model options are cached.");

if (
  !card.includes("getResponsiveImageSrcSet") ||
  !card.includes('loading="lazy"') ||
  !card.includes("width={640}") ||
  !gallery.includes("getResponsiveImageSrcSet")
) {
  fail("Vehicle cards and detail gallery must use responsive sources and intrinsic image dimensions.");
} else {
  pass("Vehicle cards and detail gallery use responsive image delivery and intrinsic dimensions.");
}

if (
  !imageDelivery.includes('url.hostname !== CLOUDINARY_HOST') ||
  !imageDelivery.includes("f_auto,q_auto,w_") ||
  !imageDelivery.includes("return imageUrl")
) {
  fail("Responsive image transformations must be restricted to Cloudinary and preserve other providers.");
} else {
  pass("Responsive transformations are restricted to Cloudinary; unknown image URLs are preserved.");
}

if (
  !app.includes("pendingPopRestore") ||
  !app.includes("NavigationPrefetcher") ||
  !app.includes("prefetchVehicleDetail")
) {
  fail("Client navigation must keep scroll restoration and high-intent route prefetching.");
} else {
  pass("Client navigation retains scroll restoration and inventory/vehicle prefetching.");
}

for (const [file, content] of [
  ["contact", contact],
  ["home", home],
  ["payment", payment],
]) {
  if (
    content.includes('<a href="/privacy-policy"') ||
    content.includes('<a href="/buyer-information"') ||
    content.includes('<a href="/terms-and-conditions"')
  ) {
    fail(`${file} page still has a same-site link that forces a document navigation.`);
  }
}
if (failures.length === 0) pass("Internal privacy/payment links stay inside the client router.");

if (
  !vercel.includes("/assets/(.*)") ||
  !vercel.includes("31536000, immutable") ||
  !vercel.includes("/logos/(.*)") ||
  !vercel.includes("/icons/(.*)")
) {
  fail("Static Vite assets, logos, and icons must have browser cache headers.");
} else {
  pass("Static build assets, local logos, and icons have cache headers.");
}

if (failures.length) {
  console.error("\nPerformance optimization validation failed:");
  for (const message of failures) console.error(`- ${message}`);
  process.exitCode = 1;
} else {
  console.log("\nPerformance optimization validation passed.");
}
