import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(path.resolve(file), "utf8");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const helper = read("src/lib/whatsapp-enquiries.ts");
const quote = read("src/pages/request-a-quote.tsx");
const contact = read("src/pages/contact.tsx");
const detail = read("src/pages/car-detail.tsx");
const card = read("src/components/CarCard.tsx");
const about = read("src/pages/about.tsx");

check(
  helper.includes("https://wa.me/") &&
    helper.includes("DEFAULT_WHATSAPP_NUMBER") &&
    helper.includes("encodeURIComponent(message)") &&
    helper.includes('window.open(href, "_blank")'),
  "WhatsApp helper must create a correctly encoded click-to-chat URL and open it from the user's action.",
);
check(
  helper.includes("window.location.assign(href)") && helper.includes("opened.opener = null"),
  "WhatsApp hand-off must fall back when a new tab is blocked and protect the opener relationship.",
);
const numberFallback = "const number = /^\\d{8,15}$/.test(candidate) ? candidate : DEFAULT_WHATSAPP_NUMBER";
check(
  helper.includes(numberFallback),
  "WhatsApp helper must fall back to the known business number when configuration is malformed.",
);
check(
  quote.includes("openWhatsAppEnquiry(whatsappMessage)") &&
    quote.includes("buildWhatsAppHref(whatsappMessage)") &&
    quote.includes("Continue to WhatsApp"),
  "Guided quote form must use WhatsApp as its primary enquiry destination.",
);
check(
  quote.includes("Destination country:") &&
    quote.includes("Vehicle reference:") &&
    quote.includes("Target budget (USD):") &&
    quote.includes("Requirements:"),
  "Quote hand-off must preserve vehicle, destination, budget and requirements.",
);
check(
  quote.includes("press Send in WhatsApp") &&
    !quote.includes("Your enquiry was recorded") &&
    !quote.includes("await savePublicInquiry"),
  "Quote page must not claim delivery before the customer presses Send in WhatsApp.",
);
check(
  quote.includes("Continue to WhatsApp") &&
    !quote.includes('>"Continue to WhatsApp"</button>'),
  "Quote action must show the WhatsApp label without literal quotation marks.",
);
check(
  contact.includes("openWhatsAppEnquiry(message)") &&
    contact.includes("Enquiry type:") &&
    contact.includes("preparedWhatsAppHref") &&
    contact.includes("press Send in WhatsApp"),
  "Contact form must prepare a WhatsApp message with customer and enquiry details.",
);
check(
  detail.includes("openWhatsAppEnquiry(message)") &&
    detail.includes("Vehicle reference:") &&
    detail.includes("Destination country:") &&
    detail.includes("press Send in WhatsApp"),
  "Vehicle detail enquiry must include listing reference and destination in WhatsApp.",
);
check(
  card.includes("buildWhatsAppHref(") &&
    card.includes("Vehicle listing: https://www.wazirtradingllc.com") &&
    card.includes("Ask on WhatsApp"),
  "Inventory cards must open a vehicle-specific WhatsApp enquiry.",
);
check(
  about.includes("buildWhatsAppHref(") && about.includes("Open address in Maps"),
  "Company information must provide direct contact and an actionable office location.",
);
for (const [label, source] of [
  ["quote", quote],
  ["contact", contact],
  ["vehicle detail", detail],
]) {
  check(
    !source.includes("savePublicInquiry("),
    `${label} form must not depend on a database insert for its primary submission.`,
  );
}

if (failures.length) {
  console.error("WhatsApp-first enquiry validation failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("WhatsApp-first enquiry validation passed.");
