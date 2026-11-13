import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(path.resolve(file), "utf8");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const helper = read("src/lib/public-inquiries.ts");
const quote = read("src/pages/request-a-quote.tsx");
const contact = read("src/pages/contact.tsx");
const detail = read("src/pages/car-detail.tsx");

for (const field of ["name", "email", "phone", "country", "destination_port", "message", "inquiry_type"]) {
  check(helper.includes(field), `Shared inquiry contract is missing the ${field} field.`);
}
check(
  helper.includes('supabase.from("inquiries").insert([payload])') &&
    helper.includes("publicInquiryErrorMessage"),
  "Public inquiry writes must share the common insert and actionable error classifier.",
);
check(
  helper.includes("42501") && helper.includes("PGRST204") && helper.includes("PGRST205"),
  "Database permission and schema errors must be diagnosable without exposing customer data.",
);
for (const [name, source, label] of [
  ["quote", quote, "guided quote"],
  ["contact", contact, "contact"],
  ["vehicle", detail, "vehicle detail"],
]) {
  check(
    source.includes("savePublicInquiry("),
    `${label} page must use the shared inquiry submission helper.`,
  );
  check(
    source.includes("submissionInFlight.current") && source.includes("finally"),
    `${label} page must prevent duplicate submissions and release its submission lock.`,
  );
  check(
    source.includes("publicInquiryErrorMessage(error)"),
    `${label} page must show actionable submission failure guidance.`,
  );
}
check(
  quote.includes("form.consent") &&
    quote.includes("form.name.trim()") &&
    quote.includes("form.country.trim()"),
  "Guided quote form must enforce consent and non-empty required values.",
);
check(
  quote.includes("Vehicle reference:") &&
    quote.includes("Requirements:") &&
    quote.includes("Target budget (USD):"),
  "Vehicle, budget and requirement details must remain part of the stored enquiry message.",
);
check(
  !quote.includes("destination_country: form.country") &&
    !quote.includes("car_ref: form.vehicleRef") &&
    !quote.includes("car_name: form.vehicleModel"),
  "The public quote insert must not depend on extra inquiry columns that the live table schema has not been verified to support.",
);

if (failures.length) {
  console.error("Enquiry reliability validation failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("Enquiry reliability validation passed.");
