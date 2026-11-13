import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(path.resolve(file), "utf8");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const about = read("src/pages/about.tsx");
const routeGraphic = read("src/components/ShippingRouteCanvas.tsx");
const contact = read("src/pages/contact.tsx");
check(
  about.includes("Heights Mizutani 1C, 158-1 Jizou") &&
    about.includes("Kuwana-City, Mie-Pref, Japan") &&
    about.includes("Office visits are by appointment only"),
  "About page must show the published Japan business address and appointment-only visit note.",
);
check(
  about.includes("Meet Our CEO") && about.includes("Mr. Mumtaz Khan"),
  "About page must preserve the published leadership information.",
);
check(
  about.includes("Illustrative route graphic only") &&
    routeGraphic.includes("not a list of confirmed service ports"),
  "The route graphic must not imply unverified shipping coverage or carrier routes.",
);
check(
  !about.includes("images.unsplash.com"),
  "The company profile must not use an unrelated stock photograph as company evidence.",
);
check(
  about.includes('href="/contact"') || about.includes('href="/request-a-quote"'),
  "About page must provide a direct next step to contact the business.",
);
check(
  contact.includes("wazirtrading-pc@outlook.jp") &&
    contact.includes("050-3740-8980") &&
    contact.includes("050-3588-6588"),
  "Published direct contact details must remain present on the contact page.",
);

if (failures.length) {
  console.error("Business credibility validation failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("Business credibility validation passed.");
