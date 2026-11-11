import { SITE_URL } from "./vehicle-seo";

/**
 * Country landing-page registry.
 * Add a new country by adding one complete, source-reviewed object here.
 * `serviceAvailability` is intentionally not asserted: route, carrier,
 * destination handling and Wazir Trading's ability to accept the order must
 * be confirmed in a written, vehicle-specific quotation.
 */
export interface CountrySource {
  label: string;
  url: string;
  authority: string;
}

export interface CountryLandingPage {
  slug: string;
  name: string;
  region: string;
  /** Internal prioritisation tier; public country URLs remain unchanged. */
  seoTier: 1 | 2 | 3;
  title: string;
  description: string;
  intro: string;
  buyerContext: string;
  regulatorySnapshot: string;
  checks: string[];
  quoteFocus: string;
  sources: CountrySource[];
  reviewedOn: string;
  indexable: boolean;
}

export const COUNTRY_LANDING_PAGES: CountryLandingPage[] = [
  {
    slug: "pakistan",
    name: "Pakistan",
    region: "South Asia",
    seoTier: 1,
    title: "Import Japanese Cars to Pakistan | Wazir Trading",
    description:
      "Review Pakistan’s 2026 used-vehicle import rules, commercial-import conditions, overseas-scheme changes and regulatory duties before shipment.",
    intro:
      "Planning to buy a Japanese used vehicle for Pakistan? Start with the exact import route that applies to you. Pakistan’s rules distinguish commercial imports from personal schemes, and recent amendments make it especially important to verify the current policy before choosing a vehicle.",
    buyerContext:
      "For a Pakistan enquiry, identify whether the intended import is commercial or under an eligible personal scheme. The vehicle’s year, engine capacity, category, ownership documents and importer eligibility can affect whether the transaction is workable.",
    regulatorySnapshot:
      "Pakistan’s rules distinguish commercial used-vehicle imports from the schemes available to eligible overseas Pakistanis. SRO 61(I)/2026 dated 15 January 2026 removed the personal-baggage scheme and amended the remaining schemes. SRO 1895(I)/2025 provided for commercial imports under specified PCT headings, initially subject to a vehicle-age condition through 30 June 2026 and thereafter stated that the age limit may be removed, subject to prescribed environmental, safety and quality testing and certification. SRO 1065(I)/2026 dated 30 June 2026 levies a 30% regulatory duty on covered commercial used-vehicle imports in addition to the duty under SRO 1064(I)/2026. Confirm the operative requirements with the Ministry of Commerce, FBR or a licensed customs professional before committing funds.",
    checks: [
      "Confirm whether the intended transaction is commercial or an eligible personal import; do not assume the personal-baggage, gift and transfer-of-residence rules are interchangeable.",
      "Check the latest Import Policy Order and operative Customs SROs for the shipment date, including applicable age, safety, environmental and quality conditions.",
      "Ask a licensed customs broker to calculate the current duties and taxes for the exact PCT/HS classification, engine size, year and customs value before paying for a vehicle.",
    ],
    quoteFocus:
      "Send the vehicle reference or full make/model/year/engine details, the intended importer category and the destination port. A quote must distinguish the Japan export price and freight from Pakistan customs duties, taxes, port charges and local delivery.",
    sources: [
      {
        label: "FBR — Vehicles and personal import schemes",
        url: "https://www.fbr.gov.pk/vehicles/51149/131187",
        authority: "Federal Board of Revenue",
      },
      {
        label: "FBR — Active/operative import SROs",
        url: "https://fbr.gov.pk/ActiveSrosImport",
        authority: "Federal Board of Revenue",
      },
      {
        label: "Ministry of Commerce — SROs",
        url: "https://www.commerce.gov.pk/sros/",
        authority: "Ministry of Commerce",
      },
      {
        label: "Pakistan Trade Information Portal — SRO 1065(I)/2026",
        url: "https://tipp.gov.pk/ur-pk/site/display/751",
        authority: "Pakistan Trade Information Portal",
      },
      {
        label: "Ministry of Commerce — SRO 1895(I)/2025 commercial used-vehicle policy",
        url: "https://www.commerce.gov.pk/wp-content/uploads/2025/09/SRO_1895_2025.pdf",
        authority: "Ministry of Commerce, Government of Pakistan",
      },
      {
        label: "Pakistan Trade Information Portal — SRO 1065(I)/2026 regulatory duty",
        url: "https://tipp.gov.pk/ur-pk/site/display/751",
        authority: "Federal Board of Revenue / Pakistan Trade Information Portal",
      },
      {
        label: "Ministry of Commerce — SRO 61(I)/2026 overseas import-scheme amendments",
        url: "https://www.commerce.gov.pk/wp-content/uploads/2026/01/SRO-No.-61.pdf",
        authority: "Ministry of Commerce, Government of Pakistan",
      },
    ],
    reviewedOn: "2026-11-11",
    indexable: true,
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    region: "South Asia",
    seoTier: 1,
    title: "Import Japanese Cars to Sri Lanka | Wazir Trading",
    description:
      "Review Sri Lanka vehicle-import permits, current Gazette conditions, inspection documents and customs checks before buying from Japan.",
    intro:
      "A Japanese vehicle purchase for Sri Lanka should begin with the current import-control route, not only the vehicle price. Confirm that the vehicle category and importer qualify under the rules in force on the intended import date.",
    buyerContext:
      "Sri Lanka’s import-control and customs process has been amended through regulations and operational instructions. A buyer should establish the permit or licence pathway, inspection certificate requirement and document-verification process before arranging shipment.",
    regulatorySnapshot:
      "Sri Lanka’s vehicle-import process is governed by category-specific controls, regulations and operational instructions. The applicable permit route, permitted vehicle category, age or specification conditions and inspection evidence must be checked against the current Gazette and the Department of Import and Export Control before purchase. Customs release and registration requirements should also be confirmed for the exact vehicle; historical permit guides and tax tables may no longer apply.",
    checks: [
      "Ask the Department of Import and Export Control whether the selected vehicle and importer category require a licence, permit or other approval before purchase.",
      "Confirm which pre-export inspection certificate and verification process applies to a vehicle sourced in Japan under the latest Gazette and operational instructions.",
      "Obtain a current duty-and-tax estimate from Sri Lanka Customs or a qualified clearing agent using the vehicle’s correct classification and customs value.",
    ],
    quoteFocus:
      "Include the intended Sri Lankan port, importer category and vehicle details. Confirm inspection booking, export documents, freight, insurance and all excluded destination-side charges in writing.",
    sources: [
      {
        label: "Sri Lanka Trade Information Portal — Vehicle import permit procedure",
        url: "https://www.srilankatradeportal.gov.lk/index.php?id=4&r=searchProcedure%2Fview1",
        authority: "Sri Lanka Trade Information Portal",
      },
      {
        label: "Sri Lanka Gazette — 2025 vehicle import regulations",
        url: "https://documents.gov.lk/view/egz/2025/3/2428-07_E.pdf",
        authority: "Government of Sri Lanka",
      },
      {
        label: "Sri Lanka Customs",
        url: "https://www.customs.gov.lk/",
        authority: "Sri Lanka Customs",
      },
      {
        label: "Department of Import and Export Control — Sri Lanka",
        url: "https://imexport.gov.lk/",
        authority: "Department of Import and Export Control, Sri Lanka",
      },
    ],
    reviewedOn: "2026-11-11",
    indexable: true,
  },
  {
    slug: "bangladesh",
    name: "Bangladesh",
    region: "South Asia",
    seoTier: 2,
    title: "Japanese Car Import Guide for Bangladesh | Wazir Trading",
    description:
      "Prepare a Japanese vehicle enquiry for Bangladesh with official guidance on customs clearance, importer eligibility and vehicle documentation.",
    intro:
      "For Bangladesh, the first question is the legal import category. The National Board of Revenue publishes different procedures for vehicles imported under transfer-of-residence, privileged-person and diplomatic facilities; these should not be treated as a single general route for every buyer.",
    buyerContext:
      "Before selecting a vehicle, establish who the importer will be, whether the import is personal or commercial, and which policy provisions apply. A vehicle that appears suitable in Japan may not qualify under the intended Bangladesh import route.",
    regulatorySnapshot:
      "Bangladesh Customs’ official vehicle-import page describes distinct clearance procedures for transfer-of-residence, privileged persons and diplomats, with the Import Policy Order governing the applicable conditions. Because the page includes historical references, verify the latest Import Policy Order, current notifications and HS tariff before purchase.",
    checks: [
      "Confirm that the buyer is eligible for the particular import facility being considered; a personal or privileged-person facility is not a general commercial-import permission.",
      "Check current vehicle eligibility, age/condition rules, required approvals and any restrictions in the latest Import Policy Order.",
      "Have Bangladesh Customs or a licensed clearing agent verify the HS code, customs valuation method, duties, taxes and documents for the exact vehicle.",
    ],
    quoteFocus:
      "Share the importer’s status, intended port, vehicle reference, engine capacity and year. Request a written breakdown separating Japan-side price and freight from Bangladesh customs and local clearance costs.",
    sources: [
      {
        label: "Bangladesh Customs — Vehicle import procedures",
        url: "https://bangladeshcustoms.gov.bd/relevant/vehicle_import",
        authority: "National Board of Revenue / Bangladesh Customs",
      },
      {
        label: "Bangladesh Customs — Tariff and customs information",
        url: "https://bangladeshcustoms.gov.bd/",
        authority: "National Board of Revenue / Bangladesh Customs",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "united-arab-emirates",
    name: "United Arab Emirates",
    region: "Gulf & Middle East",
    seoTier: 1,
    title: "Import Japanese Used Cars to UAE | Wazir Trading",
    description:
      "Plan a Japanese used-car import to the UAE with customs, vehicle conformity and MOIAT registration-eligibility checks before shipment.",
    intro:
      "A Japanese used vehicle intended for the United Arab Emirates needs both a customs plan and a registration-eligibility check. Do not assume that customs release alone means a vehicle can be registered for road use in the relevant emirate.",
    buyerContext:
      "The UAE is a federation, and practical clearance or registration steps can involve federal and emirate-level authorities. The selected emirate, vehicle history, condition, steering configuration and conformity documentation should be checked before purchase.",
    regulatorySnapshot:
      "MOIAT provides a Product Status Statement for imported used vehicles to confirm whether a vehicle is eligible for registration in the UAE traffic system. Its published service requirements include a UAE ID and the vehicle’s unified identification number. Customs clearance and the vehicle’s registration eligibility are separate checks; confirm the process with the authority for the intended emirate before shipment.",
    checks: [
      "Check whether the vehicle can obtain the required product-status or conformity documentation and can be registered in the intended emirate.",
      "Verify steering configuration, accident history, vehicle condition, export certificate, original invoice and bill-of-lading requirements before shipment.",
      "Ask the relevant customs authority or broker to confirm valuation, duty, VAT, port/terminal charges and any inspection or registration fees.",
    ],
    quoteFocus:
      "State the emirate and intended port, and provide the vehicle’s full specifications and history. The written proposal must confirm the route and export scope separately from UAE customs, conformity, registration and delivery costs.",
    sources: [
      {
        label: "UAE MOIAT — Product Status Statement for used imported vehicles",
        url: "https://moiat.gov.ae/en/services/issue-product-status-statement-for-used-imported-vehicles",
        authority: "Ministry of Industry and Advanced Technology",
      },
      {
        label: "Abu Dhabi Customs — FAQs",
        url: "https://www.adcustoms.gov.ae/FAQs",
        authority: "Abu Dhabi Customs",
      },
      {
        label: "Dubai Customs — Vehicle import information",
        url: "https://www.dubaicustoms.gov.ae/",
        authority: "Dubai Customs",
      },
    ],
    reviewedOn: "2026-11-11",
    indexable: true,
  },
  {
    slug: "oman",
    name: "Oman",
    region: "Gulf & Middle East",
    seoTier: 3,
    title: "Japanese Car Import Guide for Oman | Wazir Trading",
    description:
      "Review official Oman Customs guidance for second-hand vehicles and the checks to complete before buying a Japanese used car for Oman.",
    intro:
      "Oman publishes specific Customs services for second-hand vehicles, including rules that distinguish private vehicles from trucks, buses and equipment. Confirm which vehicle class your intended purchase falls into before paying a deposit.",
    buyerContext:
      "The vehicle’s manufacture date, classification and conformity with Omani standards can be decisive. The importer should obtain the applicable permit or confirmation before the vehicle is loaded in Japan.",
    regulatorySnapshot:
      "Oman Customs’ public guidance states that private vehicles must not be more than seven years from manufacture, while trucks and buses have a different stated limit. The authority also lists a permit service for importing second-hand vehicles. Verify the current interpretation, vehicle category and any later circular directly with Oman Customs.",
    checks: [
      "Confirm the current manufacture-age rule for the vehicle category: private car, truck, bus or equipment.",
      "Ask Oman Customs whether a second-hand vehicle permit or other approval is required before shipping, and verify conformity with applicable standards.",
      "Check steering configuration, inspection requirements, customs value, duties, VAT and local registration costs with the competent authorities.",
    ],
    quoteFocus:
      "Provide the vehicle type, manufacture year, engine details and intended Omani port. Do not ship until eligibility and any required permit have been confirmed in writing.",
    sources: [
      {
        label: "Oman Customs — Import of used vehicles, motorcycles and classic vehicles",
        url: "https://www.customs.gov.om/ar/import-of-used-vehicles-motorcycles-and-classic-vehicles/",
        authority: "Directorate General of Customs",
      },
      {
        label: "Oman Customs — Permit to import second-hand vehicles",
        url: "https://www.customs.gov.om/en/business-services/permit/permit-to-import-second-hand-vehicles",
        authority: "Directorate General of Customs",
      },
      {
        label: "Oman Customs — Business services",
        url: "https://www.customs.gov.om/en/business-services/",
        authority: "Directorate General of Customs",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "qatar",
    name: "Qatar",
    region: "Gulf & Middle East",
    seoTier: 3,
    title: "Japanese Car Import Guide for Qatar | Wazir Trading",
    description:
      "Plan a Japanese vehicle import to Qatar with a checklist for customs declarations, shipping documents, conformity and destination charges.",
    intro:
      "When planning a Japanese used-car import to Qatar, treat customs clearance and vehicle registration as separate checks. Confirm the vehicle’s acceptability and the documents required for its exact category before dispatch.",
    buyerContext:
      "Qatar Customs describes electronic import declarations, supporting shipment documents and assessment under the applicable customs tariff. The importer or authorised broker should confirm whether any vehicle-specific approvals or technical requirements also apply.",
    regulatorySnapshot:
      "The General Authority of Customs’ importation guide lists documents such as the delivery order and bill of lading for sea imports, and explains that declarations are submitted electronically with applicable duties and risk-based inspection. This is a general import procedure, not a complete used-vehicle eligibility ruling.",
    checks: [
      "Confirm the vehicle’s technical and registration eligibility with the relevant Qatari transport authority before purchase.",
      "Confirm the customs declaration process, bill of lading, delivery order, invoice, packing list and any supporting certificates.",
      "Obtain a vehicle-specific estimate of customs duty, taxes, broker, port, inspection, registration and local-delivery costs.",
    ],
    quoteFocus:
      "Specify the intended port and vehicle details. Ask for the exact Japan-side export documents and confirm which Qatar-side documents and charges remain the importer’s responsibility.",
    sources: [
      {
        label: "Qatar General Authority of Customs — Importation procedures",
        url: "https://www.customs.gov.qa/English/Procedures/UnifiedGuide/Pages/Importation.aspx",
        authority: "General Authority of Customs",
      },
      {
        label: "Qatar General Authority of Customs",
        url: "https://www.customs.gov.qa/",
        authority: "General Authority of Customs",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "bahrain",
    name: "Bahrain",
    region: "Gulf & Middle East",
    seoTier: 3,
    title: "Japanese Car Import Guide for Bahrain | Wazir Trading",
    description:
      "Understand the Bahrain checks for customs clearance and initial registration of a used vehicle imported from Japan.",
    intro:
      "For Bahrain, plan the customs entry and initial vehicle registration together. The government service catalogue identifies a registration process for used vehicles imported from abroad and lists supporting documents and conditions.",
    buyerContext:
      "A buyer should confirm that the chosen vehicle class can be registered, that the correct customs and export certificates will be available, and that insurance and any other authority approvals can be obtained.",
    regulatorySnapshot:
      "Bahrain’s Government Services Information portal lists a service for initial registration of used vehicles imported from abroad. The listed conditions include customs-clearance evidence, civil-liability insurance and additional approvals for certain vehicle classifications. Check the live service requirements before purchase.",
    checks: [
      "Confirm the vehicle category can be registered in Bahrain and whether additional authority approval is required.",
      "Verify the form of final export certificate or ownership/clearance documents accepted for the vehicle’s origin and transaction.",
      "Confirm customs clearance, insurance, technical inspection, registration fees and any local handling charges.",
    ],
    quoteFocus:
      "Include the intended port, registration category and vehicle specification. Ask which original documents will be provided in Japan and which approvals must be arranged in Bahrain.",
    sources: [
      {
        label: "Bahrain Government — Initial registration of used vehicles imported from abroad",
        url: "https://www.bahrain.bh/wps/portal/en/BNP/ServicesCatalogue/GSX-UI-PServiceDetails?psID=3192",
        authority: "Bahrain Government Services",
      },
      {
        label: "Bahrain Customs and government services",
        url: "https://www.bahrain.bh/",
        authority: "Bahrain Government",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    region: "Gulf & Middle East",
    seoTier: 3,
    title: "Japanese Car Import Guide for Saudi Arabia | Wazir Trading",
    description:
      "Check Saudi ZATCA vehicle-import controls, vehicle age, conformity and steering requirements before arranging a Japanese used-car shipment.",
    intro:
      "Saudi Arabia has specific vehicle-import controls covering age, conformity and vehicle condition. Confirm that a Japanese vehicle meets the requirements for the importer’s status and intended use before any purchase or shipment.",
    buyerContext:
      "Vehicle eligibility can differ by importer category and vehicle classification. The importer should check the current ZATCA rules and any SASO/SABER conformity or energy-efficiency requirements that apply to the exact model.",
    regulatorySnapshot:
      "ZATCA’s vehicle-import controls state a model-age condition for small vehicles and identify additional requirements relating to conformity and energy efficiency. Its customs instructions also address vehicle condition and steering-system modification. The published rules should be checked against any current exceptions or later circulars.",
    checks: [
      "Check the current model-year eligibility and whether any importer-specific exception or fee applies.",
      "Verify conformity, energy-efficiency, steering-system, accident-history and chassis-identification requirements before buying.",
      "Confirm the customs valuation, duties, VAT, inspection, port handling and registration costs with ZATCA or a licensed broker.",
    ],
    quoteFocus:
      "Share model year, make, model, engine, steering configuration and intended Saudi port. Do not assume a Japanese-market vehicle is eligible simply because it is available for export from Japan.",
    sources: [
      {
        label: "ZATCA — Vehicle import controls",
        url: "https://zatca.gov.sa/en/RulesRegulations/Taxes/Pages/customs-individual/import-vehicles.aspx",
        authority: "Zakat, Tax and Customs Authority",
      },
      {
        label: "ZATCA — Vehicle import for individuals",
        url: "https://www.zatca.gov.sa/en/eServices/Pages/eservices-298.aspx",
        authority: "Zakat, Tax and Customs Authority",
      },
      {
        label: "ZATCA — Assessment of vehicles customs duty",
        url: "https://eservices.zatca.gov.sa/sites/sc/en/CustomsGuideNew/CustomsGuideLandPorts/Pages/Page13.aspx",
        authority: "Zakat, Tax and Customs Authority",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "kenya",
    name: "Kenya",
    region: "East Africa",
    seoTier: 1,
    title: "Import Japanese Cars to Kenya | Wazir Trading",
    description:
      "Check Kenya vehicle-import rules for Japanese used cars, including first-registration age, right-hand drive, KEBS inspection and customs planning.",
    intro:
      "Kenya is a market where vehicle eligibility should be checked before a buyer selects a car. The official KRA guidance identifies both a vehicle-age requirement and right-hand-drive condition, with roadworthiness inspection requirements.",
    buyerContext:
      "For a Kenya enquiry, confirm the first-registration date, steering configuration and required pre-export inspection. A Japanese vehicle’s manufacture year alone may not answer the age test described by KRA.",
    regulatorySnapshot:
      "KRA states that an imported used vehicle must be less than eight years old measured from its year of first registration, must be right-hand drive and must undergo roadworthiness inspection by a KEBS-appointed inspection agent in the country of export. KEBS notices also reiterate the eight-year test. Confirm the applicable first-registration calculation, vehicle category and current inspection procedure before purchase; do not rely on the model year alone.",
    checks: [
      "Calculate the vehicle’s age using the applicable first-registration test, not just the model year shown in a sales listing.",
      "Confirm the vehicle is right-hand drive and that the specific model/category is not subject to a special restriction or waiver process.",
      "Arrange the applicable KEBS conformity/roadworthiness inspection and obtain the required certificate before loading.",
    ],
    quoteFocus:
      "Provide the first-registration date, chassis reference, steering side, intended port and vehicle details. The buyer should confirm inspection eligibility before the vehicle is paid for or shipped.",
    sources: [
      {
        label: "KRA — Procedures for motor vehicle importation",
        url: "https://www.kra.go.ke/individual/importing/learn-about-importation/procedures-for-motor-vehicle",
        authority: "Kenya Revenue Authority",
      },
      {
        label: "KEBS — Vehicle inspection and standards notices",
        url: "https://www.kebs.org/",
        authority: "Kenya Bureau of Standards",
      },
      {
        label: "Government of Kenya — KEBS notice to used-vehicle importers",
        url: "https://www.mygov.go.ke/sites/default/files/2024-11/Notice%20to%20Importers%20of%20Used%20%3ASecondhand%20Motor%20Vehicles.pdf",
        authority: "Government of Kenya / Kenya Bureau of Standards",
      },
    ],
    reviewedOn: "2026-11-11",
    indexable: true,
  },
  {
    slug: "tanzania",
    name: "Tanzania",
    region: "East Africa",
    seoTier: 1,
    title: "Import Japanese Cars to Tanzania | Wazir Trading",
    description:
      "Plan a Japanese used-car import to Tanzania with TBS roadworthiness, pre-shipment or destination-inspection checks and customs guidance.",
    intro:
      "For Tanzania, pre-shipment conformity and destination clearance need to be considered together. Tanzania Bureau of Standards publishes specific procedures and notices for imported used motor vehicles, including a 2026 destination-inspection procedure.",
    buyerContext:
      "Do not rely on an old inspection certificate or a previous shipment’s process. Ask TBS or an authorised inspection provider which route applies to the chosen vehicle, shipment date and Japan origin.",
    regulatorySnapshot:
      "TBS publishes a 2026 destination-inspection procedure for imported used motor vehicles. Tanzania’s Trade Portal also describes the TBS roadworthiness-certificate workflow and supporting paperwork. The applicable route depends on whether the consignment has a valid Certificate of Conformity under PVoC or requires destination inspection. Confirm the current procedure with TBS for the specific vehicle and shipment before loading.",
    checks: [
      "Confirm with TBS whether the vehicle requires PVoC inspection in Japan, destination inspection, authentication or another current procedure.",
      "Check that the inspection certificate and vehicle details match the chassis, invoice and shipping documents.",
      "Ask TRA or a licensed clearing agent for the applicable customs valuation, duty, taxes, registration and port charges.",
    ],
    quoteFocus:
      "Include the vehicle reference, year, engine capacity, chassis details and intended Tanzanian port. Confirm the inspection route and certificate timeline before shipment booking.",
    sources: [
      {
        label: "TBS — Destination Inspection and 2026 used-vehicle procedure",
        url: "https://tbs.go.tz/pages/destination-inspection-di",
        authority: "Tanzania Bureau of Standards",
      },
      {
        label: "TBS — Pre-shipment verification of used vehicles",
        url: "https://www.tbs.go.tz/uploads/files/PVOC_PROCEDURES_FOR_VEHICLES_-_2020.pdf",
        authority: "Tanzania Bureau of Standards",
      },
      {
        label: "Tanzania Revenue Authority",
        url: "https://www.tra.go.tz/",
        authority: "Tanzania Revenue Authority",
      },
      {
        label: "Tanzania Trade Portal — TBS vehicle roadworthiness certificate procedure",
        url: "https://trade.tanzania.go.tz/procedure/449?includeSearch=true&l=en",
        authority: "Tanzania Trade Portal / Tanzania Bureau of Standards",
      },
    ],
    reviewedOn: "2026-11-11",
    indexable: true,
  },
  {
    slug: "uganda",
    name: "Uganda",
    region: "East Africa",
    seoTier: 1,
    title: "Import Japanese Cars to Uganda | Wazir Trading",
    description:
      "Plan a Japanese used-car import to Uganda with URA valuation guidance, age-linked environmental levies and transit-cost checks.",
    intro:
      "Uganda’s customs valuation process is an important part of planning a used-car purchase. Uganda Revenue Authority publishes a used motor vehicle database and value guide that importers should consult before relying on the seller’s invoice alone.",
    buyerContext:
      "Uganda is landlocked, so a buyer should confirm the full transit and inland-delivery plan as well as the final customs and registration process. The route, transit fees and destination handover must be stated in a written quotation.",
    regulatorySnapshot:
      "URA states that its used-motor-vehicle valuation database, rather than the seller’s invoice alone, is used as the basis for customs valuation. Its published environmental-levy table lists a 50% levy for passenger/saloon vehicles aged 9–15 years and states that passenger/saloon vehicles above 15 years are not allowed. The table treats some goods-vehicle categories differently, so buyers must check the exact classification and current URA guidance rather than applying passenger-car rules to every vehicle.",
    checks: [
      "Check the latest URA motor-vehicle valuation database and ask a broker to explain how it applies to the specific vehicle.",
      "Confirm applicable age, environmental levy, roadworthiness, registration and vehicle-category rules with URA and the relevant transport authority.",
      "Identify the transit corridor, border process, inland transport and customs-clearance costs before accepting a delivered-cost estimate.",
    ],
    quoteFocus:
      "Provide the vehicle specifications and intended delivery location, not just the seaport. Confirm whether the quote covers sea freight only or also transit, border charges and inland delivery.",
    sources: [
      {
        label: "URA — Used Motor Vehicle Database (1 August 2026)",
        url: "https://ura.go.ug/en/download/used-motor-vehicle-database-1st-august-2026/",
        authority: "Uganda Revenue Authority",
      },
      {
        label: "URA — Motor vehicle value guide",
        url: "https://ura.go.ug/en/motor-vehicle-value-guide/",
        authority: "Uganda Revenue Authority",
      },
      {
        label: "URA — Import and export FAQs",
        url: "https://ura.go.ug/en/import-export-faqs/",
        authority: "Uganda Revenue Authority",
      },
      {
        label: "URA — Import and export FAQs, used-vehicle valuation and environmental levy",
        url: "https://ura.go.ug/en/import-export-faqs/",
        authority: "Uganda Revenue Authority",
      },
    ],
    reviewedOn: "2026-11-11",
    indexable: true,
  },
  {
    slug: "zambia",
    name: "Zambia",
    region: "Southern Africa",
    seoTier: 2,
    title: "Japanese Car Import Guide for Zambia | Wazir Trading",
    description:
      "Plan a Japanese used-car import to landlocked Zambia with ZRA vehicle-duty resources, customs valuation checks and transit-cost planning.",
    intro:
      "A Japanese vehicle destined for Zambia needs both customs-cost planning and an inland transit plan. Zambia Revenue Authority publishes used motor-vehicle specific duty resources, and the customs value can include the vehicle price, insurance and freight to the point of entry.",
    buyerContext:
      "Because Zambia is landlocked, confirm whether the proposed shipment requires transit through another country and which party handles border formalities, transit bonds, handling and inland delivery.",
    regulatorySnapshot:
      "ZRA publishes used motor vehicle specific duty schedules and general importation guidance. Its import valuation explanation identifies the value-for-duty basis as including price, freight and insurance to the port of entry, with vehicle-specific duties and other taxes to be checked against the current schedule.",
    checks: [
      "Use the current ZRA motor-vehicle specific duty schedule for the vehicle type, engine capacity and classification; do not rely on a prior-year screenshot.",
      "Confirm the customs value, CIF components, excise, VAT, carbon/emissions-related charges and registration costs with ZRA or a licensed broker.",
      "Obtain a route-specific transit and inland-delivery quote, including border handling and any transit documentation.",
    ],
    quoteFocus:
      "Tell us the intended inland destination as well as the preferred entry corridor. A Japan FOB price or ocean-freight quote is not the same as a delivered Zambia price.",
    sources: [
      {
        label: "ZRA — Used motor vehicle specific duty rates",
        url: "https://www.zra.org.zm/download/used-motor-vehicle-specific-duty-rates-2025/",
        authority: "Zambia Revenue Authority",
      },
      {
        label: "ZRA — Importation of goods and customs valuation",
        url: "https://www.zra.org.zm/importation-of-goods/",
        authority: "Zambia Revenue Authority",
      },
      {
        label: "ZRA — Applied rates of duties and taxes",
        url: "https://www.zra.org.zm/applied-rates-of-duties-and-taxes-imposed-in-connection-with-importation-exportation/",
        authority: "Zambia Revenue Authority",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "malawi",
    name: "Malawi",
    region: "Southern Africa",
    seoTier: 2,
    title: "Japanese Car Import Guide for Malawi | Wazir Trading",
    description:
      "Review Malawi’s official vehicle-importer registration process and customs steps before buying a Japanese used vehicle for Malawi.",
    intro:
      "Malawi’s Trade Information Portal describes a vehicle-import process involving the Ministry of Transport and Public Works and Malawi Revenue Authority. Buyers should first confirm whether the relevant importer registration or certificate applies to their intended private or commercial transaction.",
    buyerContext:
      "Malawi is landlocked, so the final route may include an ocean port in another country and inland transit. The nominated destination, transport mode and clearance responsibilities should be agreed before the purchase.",
    regulatorySnapshot:
      "The Malawi Trade Information Portal describes registration as a vehicle importer and a Motor Vehicle Importer Certificate process for organisations, alongside customs registration, declaration and clearance through MRA. The applicable steps differ by importer category; confirm the current requirements with the Ministry and a licensed agent.",
    checks: [
      "Ask the Ministry of Transport and Public Works whether importer registration or a Motor Vehicle Importer Certificate applies to the buyer and transaction type.",
      "Confirm MRA taxpayer registration, customs declaration requirements, permits, inspection and any pre-shipment documentation.",
      "Obtain a full transit and inland quote to the final Malawi location, not only a sea-freight estimate to a neighbouring country.",
    ],
    quoteFocus:
      "State whether the buyer is an individual or business, the vehicle details and final Malawi destination. Identify who arranges customs clearance and cross-border transit.",
    sources: [
      {
        label: "Malawi Trade Information Portal — Import motor vehicles",
        url: "https://portal.trade.gov.mw/en-gb/site/display/302",
        authority: "Malawi Trade Information Portal",
      },
      {
        label: "Malawi — Application for motor vehicle importer",
        url: "https://portal.trade.gov.mw/en-gb/search-procedure/view/117",
        authority: "Ministry of Transport and Public Works",
      },
      {
        label: "Malawi Revenue Authority",
        url: "https://www.mra.mw/",
        authority: "Malawi Revenue Authority",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "mozambique",
    name: "Mozambique",
    region: "Southern Africa",
    seoTier: 2,
    title: "Japanese Car Import Guide for Mozambique | Wazir Trading",
    description:
      "Prepare a Japanese used-car enquiry for Mozambique with the latest Tax Authority vehicle-import procedures and customs document checks.",
    intro:
      "Mozambique’s Tax Authority publishes a dedicated vehicle-import procedure within its customs-procedure resources. Buyers should use the current official procedure for the shipment date and confirm language, document and valuation requirements before arranging export.",
    buyerContext:
      "Mozambique has multiple maritime gateways and inland destinations. A quote should identify the actual discharge port and whether onward transport, border clearance or inland delivery is included.",
    regulatorySnapshot:
      "The Autoridade Tributária de Moçambique lists an “Importação de Viaturas” procedure document updated in August 2026. The authority’s procedural page is the appropriate starting point for the current official workflow; vehicle eligibility, tariff classification and any inspection requirements must be confirmed for the selected unit.",
    checks: [
      "Download and review the current “Importação de Viaturas” procedure from the Tax Authority before selecting a vehicle.",
      "Confirm whether the vehicle requires permit, technical inspection, conformity evidence or additional documents for its category.",
      "Obtain current customs valuation, duties, VAT, port handling, broker and local-delivery estimates from the importer’s clearing agent.",
    ],
    quoteFocus:
      "Specify the intended port or inland destination, buyer’s preferred language for documents and vehicle details. Ask for a written list of export documents and destination-side exclusions.",
    sources: [
      {
        label: "Mozambique Tax Authority — Customs procedures / vehicle import",
        url: "https://www.at.gov.mz/servicos/procedimentos-aduaneiros",
        authority: "Autoridade Tributária de Moçambique",
      },
      {
        label: "Mozambique Tax Authority",
        url: "https://www.at.gov.mz/",
        authority: "Autoridade Tributária de Moçambique",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "zimbabwe",
    name: "Zimbabwe",
    region: "Southern Africa",
    seoTier: 2,
    title: "Japanese Car Import Guide for Zimbabwe | Wazir Trading",
    description:
      "Review ZIMRA’s published second-hand vehicle age restriction, valuation and document guidance before buying a Japanese used car for Zimbabwe.",
    intro:
      "Zimbabwe’s vehicle-import rules include a specific age restriction for second-hand vehicles. A buyer should calculate the vehicle’s age from the manufacture date and confirm the applicable policy on the intended import date.",
    buyerContext:
      "Zimbabwe is landlocked, so the buyer should plan the nominated transit corridor, border clearance and inland transport in addition to the ocean shipment. Customs valuation and complete vehicle papers are important to avoid delays.",
    regulatorySnapshot:
      "ZIMRA’s published guidance for private individuals states that second-hand vehicles aged ten years and above from manufacture are not allowed. It also lists invoice or sale agreement, export bill of entry, registration book, freight statement and insurance statement among documents used for importation, and notes that customs may reassess declared values.",
    checks: [
      "Check the manufacture date against ZIMRA’s current age rule before paying; do not rely only on registration year or a seller’s model-year label.",
      "Confirm the current valuation approach and duties with ZIMRA or a licensed customs clearing agent.",
      "Plan transit, border processes, original export/registration documents, freight and insurance statements before shipment.",
    ],
    quoteFocus:
      "Send the manufacture date, first-registration date, vehicle reference and final Zimbabwe destination. Confirm the land transit corridor and who is responsible for border formalities.",
    sources: [
      {
        label: "ZIMRA — Importation of motor vehicles by private individuals",
        url: "https://zimra.co.zw/customs/importation-of-motor-vehicles-by-private-individuals",
        authority: "Zimbabwe Revenue Authority",
      },
      {
        label: "ZIMRA — Customs information",
        url: "https://www.zimra.co.zw/",
        authority: "Zimbabwe Revenue Authority",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "botswana",
    name: "Botswana",
    region: "Southern Africa",
    seoTier: 3,
    title: "Japanese Car Import Guide for Botswana | Wazir Trading",
    description:
      "Plan a Japanese vehicle import to Botswana with BURS motor-vehicle clearance guidance, customs documents and duty/tax checks.",
    intro:
      "Botswana’s customs authority publishes a specific motor-vehicle clearance page. Even where a vehicle category is not subject to a general import restriction, the importer must still complete the required customs declaration and pay applicable duties and taxes.",
    buyerContext:
      "Botswana is landlocked. The final price and schedule therefore depend on the nominated seaport, transit country, border handling and inland delivery arrangement as well as the vehicle’s customs value.",
    regulatorySnapshot:
      "BURS’ motor-vehicle page states that Botswana currently does not impose a general restriction on importing or exporting motor vehicles, while explaining customs and VAT obligations for vehicles entering for home consumption and listing supporting documents. It also describes a 14-day clearance period after entry for vehicles intended for home consumption; confirm the current rule and any later notice.",
    checks: [
      "Confirm the current BURS treatment of the vehicle and the applicable customs/VAT tariff classification.",
      "Prepare the sale invoice, export/clearance papers, police clearance or valuation evidence where required, and customs declaration documents.",
      "Confirm the sea-port-to-Botswana transit corridor, customs handover point, border charges and inland delivery cost.",
    ],
    quoteFocus:
      "State the preferred port corridor and Botswana delivery location. The quote should separate ocean freight, transit, border costs, customs duties/taxes and domestic delivery.",
    sources: [
      {
        label: "BURS — Clearance of motor vehicles",
        url: "https://burs.org.bw/index.php/customsexcisemain/customs-clearance/clearance-of-motor-vehicles",
        authority: "Botswana Unified Revenue Service",
      },
      {
        label: "BURS — Customs and excise",
        url: "https://www.burs.org.bw/",
        authority: "Botswana Unified Revenue Service",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "namibia",
    name: "Namibia",
    region: "Southern Africa",
    seoTier: 2,
    title: "Japanese Car Import Guide for Namibia | Wazir Trading",
    description:
      "Check Namibia’s official second-hand vehicle import permit requirements, steering restrictions, age and transport rules before buying in Japan.",
    intro:
      "Namibia has vehicle-specific import requirements that should be checked before a Japanese car is purchased. The Namibia Trade Information Portal publishes a guide covering permits, required documents and restrictions, including steering configuration and vehicle age.",
    buyerContext:
      "The buyer should confirm eligibility against the current government guidance and verify the route, carrier and inland handling. A standard Japanese-market vehicle must not be assumed eligible without checking the steering-side and age rules.",
    regulatorySnapshot:
      "The Namibia Trade Information Portal’s second-hand motor vehicle guidance states that left-hand-drive vehicles are prohibited except for diplomats, vehicles more than twelve years old are prohibited, and second-hand vehicles are subject to a specified import-permit/document process. It also describes a car-carrier transport requirement introduced in 2023; verify whether later notices have amended it.",
    checks: [
      "Confirm that the vehicle is right-hand drive and meets the current manufacture-age limit before purchase.",
      "Check permit requirements, invoice, deregistration/export certificate, bill of lading, identity documents and proof of payment.",
      "Verify the current car-carrier transport rule, applicable duties/taxes and registration steps with NamRA and the relevant transport authority.",
    ],
    quoteFocus:
      "Include the manufacture year, steering side, intended port and delivery location. Confirm that the vehicle and proposed transport method satisfy current Namibian requirements before booking.",
    sources: [
      {
        label: "Namibia Trade Information Portal — Second-hand motor vehicle requirements",
        url: "https://namibiatradeportal.gov.na/general-trade-information/exemption-motor-vehicles-imported-abroad",
        authority: "Namibia Trade Information Portal",
      },
      {
        label: "Namibia Trade Information Portal — General import procedures",
        url: "https://namibiatradeportal.gov.na/general-trade-information/general-export-import-and-transit-procedures",
        authority: "Namibia Trade Information Portal",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "south-africa",
    name: "South Africa",
    region: "Southern Africa",
    seoTier: 1,
    title: "South Africa Used-Car Import Eligibility | Wazir Trading",
    description:
      "Check South Africa’s strict used-vehicle import permit rules and NRCS letter-of-authority requirements before considering a Japanese car.",
    intro:
      "South Africa is a particularly important destination to check before purchase because the government restricts the importation of second-hand vehicles. A Japanese used-car listing is not, by itself, evidence that the vehicle is eligible for import or registration.",
    buyerContext:
      "The importer’s circumstances and the vehicle’s category or purpose can determine whether an import permit route is available. Confirm eligibility with ITAC and the National Regulator for Compulsory Specifications before paying for a vehicle or arranging shipping.",
    regulatorySnapshot:
      "The South African Government states that a second-hand vehicle may only be imported with a permit and that permits are issued in specifically defined circumstances, mainly for qualifying returning South African nationals and immigrants. The government guidance also requires an NRCS letter of authority before import. ITAC’s used-vehicle guidelines state that permits are not issued for ordinary commercial resale imports outside the defined exceptions. This is an eligibility guide, not an open-market import route.",
    checks: [
      "Obtain written confirmation from ITAC that the importer and specific vehicle qualify for a permit before purchase.",
      "Confirm whether an NRCS letter of authority, standards approval or other regulatory document is required.",
      "Do not ship a vehicle until the import permit, vehicle eligibility and destination registration pathway have been confirmed.",
    ],
    quoteFocus:
      "A destination enquiry should include the importer’s legal basis for eligibility and any issued permit/approval. Wazir Trading cannot represent a vehicle as importable into South Africa without that confirmation.",
    sources: [
      {
        label: "South African Government — Importing a second-hand or used vehicle",
        url: "https://www.gov.za/services/services-organisations/import/importing-second-hand-or-used-vehicle",
        authority: "South African Government",
      },
      {
        label: "International Trade Administration Commission",
        url: "https://www.itac.org.za/",
        authority: "ITAC",
      },
      {
        label: "National Regulator for Compulsory Specifications",
        url: "https://www.nrcs.org.za/",
        authority: "NRCS",
      },
      {
        label: "ITAC — Application forms for used passenger vehicle permits",
        url: "https://itac.org.za/import-control/application-forms/",
        authority: "International Trade Administration Commission",
      },
      {
        label: "ITAC — Guidelines for importing used or second-hand vehicles",
        url: "https://itac.org.za/wp-content/uploads/amended-guidelines-for-importation-of-used-or-second-hand-vehicles_.pdf",
        authority: "International Trade Administration Commission",
      },
    ],
    reviewedOn: "2026-11-11",
    indexable: true,
  },
  {
    slug: "ghana",
    name: "Ghana",
    region: "West Africa",
    seoTier: 2,
    title: "Japanese Car Import Guide for Ghana | Wazir Trading",
    description:
      "Review Ghana Revenue Authority vehicle-import guidance, especially right-hand-steering restrictions and the approvals required before a Japanese car is shipped.",
    intro:
      "Ghana requires a particularly careful steering-side check for Japanese vehicles. Many vehicles sourced in Japan are right-hand drive; Ghana Revenue Authority’s published vehicle-import guidance says right-hand-steering vehicles are not allowed by default and describes a limited dispensation process.",
    buyerContext:
      "Do not purchase or ship a Japanese right-hand-drive vehicle for Ghana on the assumption that it can be converted or registered after arrival. Obtain written confirmation from the competent Ghanaian authority about the exact vehicle and legal approval pathway first.",
    regulatorySnapshot:
      "GRA’s vehicle-import page states that right-hand-steering vehicles are not allowed under Customs law, while describing a policy dispensation for certain cases and subsequent conversion requirements. The same page provides vehicle-duty calculation guidance and identifies required customs documents. Confirm the live policy and approval route directly with GRA and the Ministry of Trade.",
    checks: [
      "Confirm steering-side legality and obtain any required ministerial dispensation or written approval before the purchase is committed.",
      "Ask whether a conversion is legally permitted for the exact vehicle and what inspection/registration evidence would be required.",
      "Use GRA’s current valuation/duty process and confirm freight, insurance, terminal, agent and registration charges.",
    ],
    quoteFocus:
      "Include the steering side and vehicle specification at the very beginning of the enquiry. A route or price quote must not be interpreted as Ghanaian import approval.",
    sources: [
      {
        label: "GRA — Vehicle importation and clearing",
        url: "https://gra.gov.gh/customs/vehicle-importation/",
        authority: "Ghana Revenue Authority",
      },
      {
        label: "Ghana Standards Authority",
        url: "https://gsa.gov.gh/",
        authority: "Ghana Standards Authority",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "nigeria",
    name: "Nigeria",
    region: "West Africa",
    seoTier: 1,
    title: "Import Japanese Cars to Nigeria | Wazir Trading",
    description:
      "Check Nigeria used-car age rules, 2026 customs tariff measures and vehicle-specific import costs before buying from Japan.",
    intro:
      "A Nigeria vehicle enquiry should start with the current tariff and import procedure for the exact HS code. Nigeria’s official trade portal provides an automobile import process, while the 2026 fiscal policy updates include vehicle-related tariff measures that buyers should account for.",
    buyerContext:
      "The import procedure can involve importer registration, product classification, banking/import documentation, a customs declaration and assessment. Verify the vehicle’s eligibility, current age/condition rules and any taxes or levies that apply to the precise engine size and category.",
    regulatorySnapshot:
      "Nigeria’s National Trade Information Portal describes the automobile import procedure and states an age restriction for vehicles based on year of manufacture. The Federal Ministry of Information’s 2026 fiscal-policy notice confirms a green-tax surcharge for motor vehicles with engine capacity of 2,000cc and above, alongside revised import-adjustment-tax measures. The exact tariff treatment depends on the HS classification, engine capacity and current customs schedule; do not rely on a generic flat-rate estimate or assume every vehicle category follows the same process.",
    checks: [
      "Search the current Nigeria Trade Information Portal for HS 8702, 8703 or 8704 as applicable and confirm the relevant procedure and agency requirements.",
      "Confirm the current 2026 tariff, Import Adjustment Tax, green-tax or other vehicle levies for the exact engine capacity and classification.",
      "Verify importer registration, Form M or other banking/import documentation, customs valuation and port examination requirements before shipment.",
    ],
    quoteFocus:
      "Send the engine capacity, year, vehicle type and intended port. Any duty estimate must identify the tariff version and remain subject to Nigeria Customs assessment.",
    sources: [
      {
        label: "Nigeria Trade Information Portal — Automobiles import procedure",
        url: "https://tip.nsw.gov.ng/procedures/automobiles",
        authority: "Nigeria Trade Information Portal",
      },
      {
        label: "Federal Ministry of Information — 2026 fiscal policy amendments",
        url: "https://fmino.gov.ng/nigeria-customs-service-implements-2026-fiscal-policy-measures-and-tariff-amendments/",
        authority: "Federal Ministry of Information and National Orientation",
      },
      {
        label: "Nigeria Customs Service",
        url: "https://customs.gov.ng/",
        authority: "Nigeria Customs Service",
      },
      {
        label: "Federal Ministry of Information — 2026 Customs fiscal-policy measures",
        url: "https://fmino.gov.ng/nigeria-customs-service-implements-2026-fiscal-policy-measures-and-tariff-amendments/",
        authority: "Federal Ministry of Information and National Orientation",
      },
    ],
    reviewedOn: "2026-11-11",
    indexable: true,
  },
  {
    slug: "senegal",
    name: "Senegal",
    region: "West Africa",
    seoTier: 3,
    title: "Japanese Car Import Guide for Senegal | Wazir Trading",
    description:
      "Prepare a Japanese used-vehicle import to Senegal with official guidance on Dakar vehicle customs clearance, documents and duty valuation.",
    intro:
      "Senegal’s government publishes a vehicle-specific customs-clearance procedure and identifies the Dakar Port Nord and Dakar Port Sud customs offices for the main vehicle-clearance process. Buyers should confirm the nominated port and documentation before shipment.",
    buyerContext:
      "The declared customs value, freight, duties and the vehicle’s category and characteristics can affect the final amount payable. A buyer should ask for the exact document checklist from a Senegalese customs broker before the vehicle leaves Japan.",
    regulatorySnapshot:
      "The Senegal government service page states that vehicle clearance is primarily carried out at Dakar-Port Nord and Dakar-Port Sud and lists documents such as the vehicle registration document, purchase invoice, owner identity document, bill of lading and customs declaration. It explains that cost depends on FOB value, freight, duties and vehicle category.",
    checks: [
      "Confirm which Dakar customs office and port/terminal will handle the vehicle and whether any exceptional regional process applies.",
      "Prepare the original vehicle registration/export papers, invoice, importer ID, bill of lading and customs declaration.",
      "Ask a licensed broker to calculate the current duties and taxes using the vehicle’s declared/assessed value, freight and category.",
    ],
    quoteFocus:
      "Identify the Dakar destination and vehicle details. Separate FOB price, freight and insurance from customs duties, port/terminal handling, broker fees and local registration.",
    sources: [
      {
        label: "Senegal Government — Vehicle customs clearance",
        url: "https://finances.gouv.sn/en/services-demarches/dedouanement-des-vehicules-jd_bOWL4ofeUjKltWr3z3",
        authority: "Government of Senegal / Customs",
      },
      {
        label: "Senegal Customs",
        url: "https://www.douanes.sn/",
        authority: "Direction Générale des Douanes",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "the-gambia",
    name: "The Gambia",
    region: "West Africa",
    seoTier: 3,
    title: "Japanese Car Import Guide for The Gambia | Wazir Trading",
    description:
      "Review Gambia Revenue Authority vehicle-age and customs-clearance guidance before selecting a Japanese used car for The Gambia.",
    intro:
      "The Gambia Revenue Authority publishes used-vehicle import information, including an age rule and the requirement to use a clearing agent for customs processing. Because the public FAQ includes a year-specific example that may be stale, confirm the live manufacturing-year cut-off before choosing a vehicle.",
    buyerContext:
      "A buyer should check the date-of-manufacture rule, current quality standards and customs valuation with GRA and the Gambia Standards Bureau. Use the official sources rather than relying on old dealer lists or social-media posts.",
    regulatorySnapshot:
      "GRA’s customs FAQ states that vehicles over eight years old are not allowed under the referenced KS 1515:2000 standard and describes electronic customs processing through ASYCUDA with a clearing agent. The same page contains an example year that appears time-sensitive, so verify the current year threshold and tax treatment directly with GRA before purchase.",
    checks: [
      "Ask GRA to confirm the latest permitted manufacture year for the actual import year; do not rely on the older example year on the FAQ page.",
      "Confirm vehicle standards, right/left-hand steering acceptance and any required inspection or import permit with the competent standards authority.",
      "Obtain a current CIF-based duty and tax estimate and appoint a licensed clearing agent for the ASYCUDA process.",
    ],
    quoteFocus:
      "Send the exact manufacture year, first-registration date, steering configuration and intended port. We will not present a vehicle as eligible until the current Gambia rule is confirmed.",
    sources: [
      {
        label: "GRA — Customs FAQs and used-vehicle age guidance",
        url: "https://www.gra.gm/custom-faqs",
        authority: "Gambia Revenue Authority",
      },
      {
        label: "Gambia Revenue Authority",
        url: "https://www.gra.gm/",
        authority: "Gambia Revenue Authority",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "sierra-leone",
    name: "Sierra Leone",
    region: "West Africa",
    seoTier: 3,
    title: "Japanese Car Import Guide for Sierra Leone | Wazir Trading",
    description:
      "Plan a Japanese vehicle import to Sierra Leone with a customs-document checklist and links to official revenue and trade authorities.",
    intro:
      "For Sierra Leone, the buyer should confirm the vehicle tariff classification, import documentation and any pre-shipment or standards requirement before purchase. The actual cost is determined by the vehicle’s assessed customs value and current tariff treatment.",
    buyerContext:
      "Use the National Revenue Authority and the relevant trade/standards authorities for current requirements. Confirm the port of discharge, customs entry process and whether a licensed customs agent must submit the declaration.",
    regulatorySnapshot:
      "Sierra Leone’s National Revenue Authority administers customs and revenue processes. The exact rules for a specific used vehicle—including tariff classification, age/condition restrictions, standards, permits and taxes—must be checked against current official notices and the current tariff; this page does not assume a universal eligibility rule.",
    checks: [
      "Ask the NRA or a licensed broker to confirm the HS classification and whether the exact vehicle category is permitted for import.",
      "Check whether pre-shipment inspection, conformity evidence, import permit or other agency approval is required for a Japanese-origin vehicle.",
      "Prepare the invoice, export/registration certificate, bill of lading, insurance/freight evidence and importer identification as required by the current customs process.",
    ],
    quoteFocus:
      "Tell us the vehicle details, intended port and importer category. Request a current local clearance estimate and a written list of original documents before shipment.",
    sources: [
      {
        label: "Sierra Leone National Revenue Authority",
        url: "https://nra.gov.sl/",
        authority: "National Revenue Authority",
      },
      {
        label: "Sierra Leone Trade Information resources",
        url: "https://www.sletradeportal.gov.sl/",
        authority: "Government of Sierra Leone",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "liberia",
    name: "Liberia",
    region: "West Africa",
    seoTier: 3,
    title: "Japanese Car Import Guide for Liberia | Wazir Trading",
    description:
      "Prepare a Japanese used-car import to Liberia with LRA customs documentation, used-vehicle valuation and clearance checks.",
    intro:
      "Liberia’s Revenue Authority publishes customs guidance covering import declarations, supporting documents and used-vehicle valuation. Buyers should obtain current valuation and clearance advice before relying on the purchase invoice as the only basis for import costs.",
    buyerContext:
      "The import declaration may require a tax identification number and supporting commercial/shipping records. Ask a licensed customs broker to confirm any title, valuation or inspection documents required for the exact vehicle.",
    regulatorySnapshot:
      "LRA’s customs fact sheet lists a bill of lading, detailed commercial invoice, packing list and tax clearance among supporting declaration documents, and notes that product-specific certificates or title documents may be required. LRA also publishes a used-vehicles valuation regulation and customs laws/resources.",
    checks: [
      "Confirm the importer TIN, customs declaration process and exact set of supporting documents before shipment.",
      "Check LRA’s current used-vehicle valuation reference and any inspection or title/ownership requirements for the selected vehicle.",
      "Verify duties, user fees, port/terminal costs and broker charges with LRA or an authorised clearing agent.",
    ],
    quoteFocus:
      "Provide the final destination and vehicle details, and request confirmation of the valuation basis, original documents and any pre-shipment inspection requirement.",
    sources: [
      {
        label: "LRA — Customs fact sheet",
        url: "https://revenue.lra.gov.lr/customs-fact-sheet/",
        authority: "Liberia Revenue Authority",
      },
      {
        label: "LRA — Customs laws and used-vehicle valuation resources",
        url: "https://revenue.lra.gov.lr/customs-laws-regulations/",
        authority: "Liberia Revenue Authority",
      },
      {
        label: "LRA — Used vehicle valuation regulation",
        url: "https://revenue.lra.gov.lr/wp-content/uploads/2021/10/USED-Vehicles-Valuation-Administrative-Regulation-min.pdf",
        authority: "Liberia Revenue Authority",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "mauritius",
    name: "Mauritius",
    region: "Indian Ocean",
    seoTier: 2,
    title: "Japanese Car Import Guide for Mauritius | Wazir Trading",
    description:
      "Check Mauritius Revenue Authority and Ministry of Commerce updates on second-hand vehicle permits and customs valuation before buying in Japan.",
    intro:
      "Mauritius is a destination where buyers should verify the latest written rule before shipment. The Ministry of Commerce’s legislation page lists 2026 amendments affecting import permits for second-hand vehicles, while the MRA FAQ still contains an older permit statement.",
    buyerContext:
      "Because official pages may not all be updated at the same time, do not rely on a historic FAQ alone. Obtain written confirmation from the Trade Division/MRA about the operative permit position for the vehicle and importer category.",
    regulatorySnapshot:
      "The Mauritius Revenue Authority FAQ describes an import-permit process for second-hand vehicles and a Japan-specific used-vehicle valuation method. Separately, the Ministry of Commerce legislation list records a 2026 amendment described as “No Import permit in respect of a used or second-hand motor vehicle”. These entries require reconciliation against the actual current Gazette and any conditions; confirm with the Ministry before shipment.",
    checks: [
      "Ask the Ministry of Commerce/Trade Division for the operative 2026 regulation and written confirmation whether a permit is required for the exact transaction.",
      "Confirm the current customs valuation basis for a Japanese used vehicle and whether the MRA second-hand valuation system applies.",
      "Check excise duty, VAT, registration, inspection and port charges using current government guidance, not an old online fee table.",
    ],
    quoteFocus:
      "Include the vehicle year, engine capacity, intended importer category and port. The quote must remain conditional on written confirmation of the current permit and valuation rules.",
    sources: [
      {
        label: "Mauritius Ministry of Commerce — Acts and regulations",
        url: "https://commerce.govmu.org/Pages/Legislations/Acts-and-Regulations.aspx",
        authority: "Ministry of Commerce and Consumer Protection",
      },
      {
        label: "MRA — Customs FAQs and second-hand vehicle conditions",
        url: "https://www.mra.mu/index.php/12-media-centre/100-customs",
        authority: "Mauritius Revenue Authority",
      },
      {
        label: "Mauritius Revenue Authority — Motor vehicles",
        url: "https://www.mra.mu/index.php/customs1/motor-vehicles",
        authority: "Mauritius Revenue Authority",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "seychelles",
    name: "Seychelles",
    region: "Indian Ocean",
    seoTier: 3,
    title: "Japanese Car Import Guide for Seychelles | Wazir Trading",
    description:
      "Review Seychelles Revenue Commission guidance on right-hand-drive vehicles, import permits and vehicle documents before buying from Japan.",
    intro:
      "Seychelles publishes clear vehicle import guidance that buyers should check before selecting a Japanese car. The Seychelles Revenue Commission states that imported motor vehicles must be right-hand drive and require an import permit before arrival.",
    buyerContext:
      "Obtain the approved import permit before shipment and ensure that vehicle details on the invoice, export certificate and bill of lading match. Do not confuse a provisional permit with a final approved permit.",
    regulatorySnapshot:
      "The Seychelles Revenue Commission’s customs guidance says all imported motor vehicles must be right-hand drive and require an import permit before arrival. Its notice to importers lists invoice details, auction/condition information, bill of lading, export certificate, proof of payment, freight invoice and insurance details among relevant documents.",
    checks: [
      "Verify the vehicle is right-hand drive before purchase; a steering-side mismatch can prevent import or registration.",
      "Obtain the approved import permit from the responsible Ministry before the vehicle arrives; do not treat a provisional permit as final.",
      "Prepare invoice, vehicle identification/year/engine details, export certificate, bill of lading, condition/auction record where required, payment evidence and freight/insurance documents.",
    ],
    quoteFocus:
      "Share the permit status, exact vehicle details and intended port. Confirm that the specific vehicle is compatible with the approved permit before loading.",
    sources: [
      {
        label: "Seychelles Revenue Commission — Customs and excises / vehicle importation",
        url: "https://src.gov.sc/customs-and-excises/",
        authority: "Seychelles Revenue Commission",
      },
      {
        label: "SRC — Vehicle import documentation notice",
        url: "https://src.gov.sc/customs-calls-on-importers-to-follow-the-right-documentation-procedure-upon-importation-of-vehicles-for-personal-use/",
        authority: "Seychelles Revenue Commission",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "madagascar",
    name: "Madagascar",
    region: "Indian Ocean",
    seoTier: 3,
    title: "Japanese Car Import Guide for Madagascar | Wazir Trading",
    description:
      "Understand Madagascar Customs’ CIVIO identification process and right-hand-drive restrictions before considering a Japanese used vehicle.",
    intro:
      "Madagascar has a specific identification and customs process for imported used passenger vehicles. The Customs portal describes the CIVIO procedure and lists original vehicle and shipping documents required for identification and clearance.",
    buyerContext:
      "A Japanese right-hand-drive vehicle should not be assumed eligible: Madagascar Customs’ FAQ states that right-hand-drive vehicles are prohibited. Buyers must confirm the vehicle configuration and the applicable category rules before purchase.",
    regulatorySnapshot:
      "Madagascar Customs describes a CIVIO inspection/identification request for certain used passenger vehicle categories, with an original registration card and bill of lading among the documents. Its FAQ states that right-hand-drive vehicles are prohibited and that customs clearance must be carried out by an approved customs broker/transitaire. Vehicle age rules differ by category.",
    checks: [
      "Confirm steering configuration first; the Customs FAQ says right-hand-drive vehicles are prohibited.",
      "Check whether the vehicle falls within a category requiring CIVIO identification and prepare the original registration/ownership document and bill of lading.",
      "Ask an approved Malagasy customs broker to confirm vehicle-category age rules, valuation, duties, taxes and GasyNet charges.",
    ],
    quoteFocus:
      "Provide steering side, category, manufacture year, original vehicle document status and intended port. A Japanese-market RHD vehicle must not be quoted as suitable without explicit official clearance.",
    sources: [
      {
        label: "Madagascar Customs — Importation of equipment and vehicles",
        url: "https://www.douanes.gov.mg/particulier/importation-dengins-et-vehicules/",
        authority: "Direction Générale des Douanes Malagasy",
      },
      {
        label: "Madagascar Customs — Vehicle import FAQ",
        url: "https://www.douanes.gov.mg/faq/",
        authority: "Direction Générale des Douanes Malagasy",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "fiji",
    name: "Fiji",
    region: "Pacific",
    seoTier: 2,
    title: "Japanese Car Import Guide for Fiji | Wazir Trading",
    description:
      "Check Fiji’s 2026 used-vehicle age, Euro 4, import-licence and pre-shipment requirements before buying a Japanese car.",
    intro:
      "Fiji has published specific 2026 criteria for used and reconditioned vehicles. Buyers should confirm the vehicle category, year of manufacture, emissions compliance and import-licence position before arranging shipment from Japan.",
    buyerContext:
      "The Fiji Revenue and Customs Service advises importers to secure the required licence before loading. Requirements differ for hybrids, petrol/diesel passenger vehicles, buses, trucks and other vehicle classes.",
    regulatorySnapshot:
      "FRCS’ notice for 2026 states a maximum age of five years for specified hybrid passenger vehicles and eight years for specified petrol/diesel passenger vehicles, together with Euro 4 requirements. The notice gives minimum admissible model years for 2026 and advises obtaining the import licence before loading. Check the current notice for the exact vehicle category.",
    checks: [
      "Confirm the 2026 age rule for the selected vehicle type; the notice distinguishes hybrids from petrol/diesel vehicles and other classes.",
      "Verify Euro 4 compliance and whether JEVIC inspection or another technical certificate is required for a Japan-origin vehicle.",
      "Obtain the FRCS import licence before shipment and check steering-side, written-off vehicle and personal-import rules with FRCS/LTA.",
    ],
    quoteFocus:
      "Include manufacture year, fuel type, passenger/cargo category, steering side and intended Fijian port. A price or freight estimate is not an import licence or proof of admissibility.",
    sources: [
      {
        label: "FRCS — Importation of used or reconditioned motor vehicles in 2026",
        url: "https://frcs.org.fj/public-notice/importation-of-used-or-reconditioned-motor-vehicles-in-2026/",
        authority: "Fiji Revenue and Customs Service",
      },
      {
        label: "FRCS — Motor vehicle import licence",
        url: "https://frcs.org.fj/our-services/customs/trade-business/customs-license/motor-vehicle-import-licence/",
        authority: "Fiji Revenue and Customs Service",
      },
      {
        label: "Fiji Trade Portal — Used vehicle import licence procedure",
        url: "https://fijitradeportal.gov.fj/en-gb/super-process/step-detail?id=58",
        authority: "Fiji Trade Portal",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "papua-new-guinea",
    name: "Papua New Guinea",
    region: "Pacific",
    seoTier: 3,
    title: "Japanese Car Import Guide for Papua New Guinea | Wazir Trading",
    description:
      "Prepare a Japanese vehicle import to Papua New Guinea with Customs guidance on brokers, classification, quarantine, clearance and wharf deadlines.",
    intro:
      "Papua New Guinea Customs publishes a dedicated used-vehicle import guide. It warns that duties, taxes and fees can materially increase the purchase cost and advises buyers to check vehicle eligibility and engage a licensed customs broker before purchase.",
    buyerContext:
      "The vehicle’s correct tariff classification, model/year/engine details and importer information are important for customs assessment. The importer should also plan promptly for customs clearance and downstream inspection/registration.",
    regulatorySnapshot:
      "PNG Customs states that a licensed customs broker is legally required to act for the importer, and warns that a vehicle left uncleared at a Customs wharf for over 30 days may be forfeited. Its guide also describes customs declaration, duty assessment, quarantine, safety inspection and registration steps.",
    checks: [
      "Confirm the selected make/model is not a prohibited import and obtain an accurate tariff code/specification before purchase.",
      "Engage a licensed customs broker and obtain a written estimate of duties, taxes, port charges and clearance costs.",
      "Prepare the customs declaration and plan quarantine, safety inspection and registration; avoid storage delays after arrival.",
    ],
    quoteFocus:
      "Specify the intended port and final delivery location, plus complete engine, model and year details. Ask who will coordinate the licensed broker and who is responsible for port storage and clearance deadlines.",
    sources: [
      {
        label: "PNG Customs — Importing a used vehicle",
        url: "https://www.customs.gov.pg/trade/importing_used_vehicles",
        authority: "Papua New Guinea Customs Service",
      },
      {
        label: "PNG Customs — Main trade and import guidance",
        url: "https://www.customs.gov.pg/",
        authority: "Papua New Guinea Customs Service",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "solomon-islands",
    name: "Solomon Islands",
    region: "Pacific",
    seoTier: 3,
    title: "Japanese Car Import Guide for Solomon Islands | Wazir Trading",
    description:
      "Plan a Japanese vehicle import to Solomon Islands with official Customs ASYCUDA, vehicle declaration and document resources.",
    intro:
      "Solomon Islands Customs and Excise Division administers import declarations, tariff valuation, assessment and release processes. The authority’s ASYCUDA portal includes a vehicle tab guide and updated customs-user resources.",
    buyerContext:
      "The islands’ geography makes the nominated destination and onward transport especially important. Confirm the final port, island, local handling and any inter-island delivery separately from the Japan export quotation.",
    regulatorySnapshot:
      "The official Customs ASYCUDA portal lists a vehicle-tab guide in the Single Administrative Document workflow and customs/user materials updated in January 2026. The Customs and Excise Division states that declarations are vetted, assessed and may be referred for document verification or physical examination before release.",
    checks: [
      "Confirm the appropriate HS code, vehicle declaration fields and required evidence through the Customs ASYCUDA guidance.",
      "Check for current import restrictions, standards, permits, duty and tax measures that apply to the exact vehicle category.",
      "Confirm the named port and final island delivery arrangement, including local handling and any onward vessel cost.",
    ],
    quoteFocus:
      "Name the final island and delivery location, not only “Solomon Islands”. Confirm the discharge port, any onward movement and who completes Customs declarations and local release.",
    sources: [
      {
        label: "Solomon Islands Customs — ASYCUDAWorld and vehicle-tab guidance",
        url: "https://www.customs.gov.sb/",
        authority: "Solomon Islands Customs and Excise Division",
      },
      {
        label: "Solomon Islands Government — Customs and Excise Division",
        url: "https://solomons.gov.sb/ministry-of-finance-and-treasury/customs-and-excise-division/",
        authority: "Ministry of Finance and Treasury",
      },
      {
        label: "Solomon Islands Trade Portal",
        url: "https://solomon-islands.tradeportal.org/",
        authority: "Solomon Islands Government",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "vanuatu",
    name: "Vanuatu",
    region: "Pacific",
    seoTier: 3,
    title: "Japanese Car Import Guide for Vanuatu | Wazir Trading",
    description:
      "Review Vanuatu Customs and Inland Revenue vehicle-registration steps, customs release documents and destination-fee checks before shipping from Japan.",
    intro:
      "For Vanuatu, plan customs release and vehicle registration as connected but distinct steps. Vanuatu Customs and Inland Revenue explains that imported vehicles must be released from customs control and then registered through the Inland Revenue process.",
    buyerContext:
      "Vanuatu is an island country, so confirm the exact island and final delivery point. A quote to a main port does not automatically include onward transport or local registration costs.",
    regulatorySnapshot:
      "Vanuatu Customs and Inland Revenue states that imported vehicles must be registered no later than one month after importation. Its published process refers to a sales invoice and customs declaration form as supporting documents and explains the Customs Trade, Tariff and Compliance release step.",
    checks: [
      "Confirm current import restrictions, tariff classification and customs duty/tax for the selected vehicle with Customs before shipment.",
      "Check the release process, registration forms, invoice and customs declaration requirements, including the one-month registration timing.",
      "Identify the destination island and confirm port handling, customs release, local transport, registration and road-tax costs.",
    ],
    quoteFocus:
      "Specify the island, port and delivery location, and include full vehicle details. Ask which costs end at customs release and which local registration/road-tax costs are not included.",
    sources: [
      {
        label: "Vanuatu Customs — Information for newly registered vehicles",
        url: "https://customsinlandrevenue.gov.vu/taxes-and-licensing/licensing/vehicle-and-driver-licencing/information-for-newly-registered-vehicles.html",
        authority: "Vanuatu Customs and Inland Revenue",
      },
      {
        label: "Vanuatu Single Window — Customs duty and tax simulation",
        url: "https://singlewindow.gov.vu/services/simulation",
        authority: "Vanuatu Single Window",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    region: "Pacific",
    seoTier: 1,
    title: "Import Japanese Cars to New Zealand | Wazir Trading",
    description:
      "Plan a Japanese used-car import to New Zealand with NZTA vehicle standards, entry certification and MPI biosecurity checks.",
    intro:
      "New Zealand’s used-vehicle import process includes vehicle standards, border inspection, entry certification, biosecurity and Customs. A vehicle’s prior registration overseas does not automatically mean it meets New Zealand requirements.",
    buyerContext:
      "The importer should review the vehicle against NZTA requirements before purchase and plan for the MPI biosecurity process. A Japanese-origin vehicle may require specific cleaning or offshore treatment evidence before it can proceed through the border process.",
    regulatorySnapshot:
      "NZTA requires evidence that a used import meets applicable standards, including ownership, emissions, frontal-impact, fuel-consumption and electronic-stability-control requirements, followed by border inspection and entry certification before road registration. MPI separately requires used passenger vehicles from Japan to be cleaned through an MPI-approved system in Japan and inspected for biosecurity risks on arrival. Customs clearance does not replace NZTA certification or MPI biosecurity clearance.",
    checks: [
      "Check the exact vehicle against NZTA standards and confirm it can obtain entry certification before purchase.",
      "Confirm MPI biosecurity cleaning, treatment and documentation requirements for a vehicle arriving from Japan.",
      "Budget for Customs duty/GST where applicable, border inspection, entry certification, any modifications, registration and local delivery.",
    ],
    quoteFocus:
      "Send the exact model code, year, engine, chassis/VIN and intended New Zealand port. Confirm the NZTA and MPI pathway before shipping and keep the export quotation separate from compliance and registration charges.",
    sources: [
      {
        label: "NZTA — Importing a used vehicle",
        url: "https://www.nzta.govt.nz/vehicles/importing-a-vehicle",
        authority: "NZ Transport Agency Waka Kotahi",
      },
      {
        label: "NZTA — Entry certification",
        url: "https://nzta.govt.nz/vehicles/warrants-and-certificates/entry-certification",
        authority: "NZ Transport Agency Waka Kotahi",
      },
      {
        label: "New Zealand Customs Service",
        url: "https://www.customs.govt.nz/",
        authority: "New Zealand Customs Service",
      },
      {
        label: "MPI — Steps to importing vehicles from Japan",
        url: "https://www.mpi.govt.nz/import/vehicles-machinery-parts/steps-to-importing-vehicles-machinery-or-equipment",
        authority: "Ministry for Primary Industries — Biosecurity New Zealand",
      },
    ],
    reviewedOn: "2026-11-11",
    indexable: true,
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Pacific",
    seoTier: 2,
    title: "Japanese Car Import Guide for Australia | Wazir Trading",
    description:
      "Check Australia’s road-vehicle import approval, ROVER, quarantine, customs and registration requirements before buying a Japanese vehicle.",
    intro:
      "Australia requires buyers to confirm the correct road-vehicle import approval pathway before a vehicle is imported. Do not ship a vehicle first and try to resolve approval afterward: the Department states that a road vehicle imported without approval may not be released from Customs control.",
    buyerContext:
      "The applicable approval route depends on the vehicle, its intended use and the importer’s circumstances. The buyer should check eligibility through the Department’s ROVER process and account for biosecurity, asbestos, customs and registration requirements.",
    regulatorySnapshot:
      "The Department of Infrastructure states that a road-vehicle import approval must be obtained before import under the Road Vehicle Standards Act 2018. Its guidance also identifies quarantine cleaning/treatment, Customs declaration and duties/GST, possible asbestos checks, and registration requirements as parts of the process.",
    checks: [
      "Determine the correct import-approval pathway and obtain approval through ROVER before arranging shipment.",
      "Confirm eligibility for the selected vehicle and any standards, modification, RAV, asbestos or special-purpose conditions.",
      "Plan biosecurity cleaning/treatment, Customs entry, duties/GST, inspection, modifications and state/territory registration.",
    ],
    quoteFocus:
      "Provide the intended approval category and vehicle details. A freight quote is not an Australian import approval; do not load or dispatch until the buyer has the required approval.",
    sources: [
      {
        label: "Australian Department of Infrastructure — Importing a road vehicle",
        url: "https://www.infrastructure.gov.au/infrastructure-transport-vehicles/vehicles/importing-road-vehicle-australia",
        authority: "Australian Government Department of Infrastructure",
      },
      {
        label: "Australian Government — Eight steps to importing a vehicle",
        url: "https://www.infrastructure.gov.au/infrastructure-transport-vehicles/vehicles/importing-road-vehicle-australia/8-steps-importing-vehicle",
        authority: "Australian Government Department of Infrastructure",
      },
      {
        label: "Australian Border Force",
        url: "https://www.abf.gov.au/",
        authority: "Australian Border Force",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "jamaica",
    name: "Jamaica",
    region: "Caribbean",
    seoTier: 1,
    title: "Import Japanese Cars to Jamaica | Wazir Trading",
    description:
      "Check Jamaica import licences, Japan-origin pre-shipment inspection and vehicle-category age limits before buying a used car.",
    intro:
      "Jamaica has vehicle-specific import licensing and pre-shipment inspection requirements. Buyers importing a used vehicle from Japan should verify the current Trade Board process before the vehicle is purchased or shipped.",
    buyerContext:
      "The Jamaica Trade Board’s 2026 notice identifies Japan among countries for which pre-shipment inspection is mandatory for used vehicles. The importer should confirm the approved inspection agency, certificate format and import-licence procedure for the exact vehicle.",
    regulatorySnapshot:
      "Jamaica Customs says the required Trade Board import licence must be obtained before shipping arrangements are made. The Trade Board’s notice effective 1 June 2026 confirms that pre-shipment inspection is mandatory for used vehicles shipped from Japan. If a required PSI certificate is missing, the notice describes a vehicle-history verification process and a USD 500 fee; this is a non-compliance charge, not a standard import fee. Vehicle age limits vary by class and must be checked against the current Trade Board table.",
    checks: [
      "Obtain the required Trade Board import licence before arranging shipment.",
      "Confirm the currently authorised pre-shipment inspection provider for Japan and obtain the valid certificate before loading.",
      "Check vehicle age/type restrictions, customs valuation, duties, taxes, port, terminal, broker and registration costs.",
    ],
    quoteFocus:
      "Include the Trade Board licence status, PSI certificate status, vehicle details and intended Jamaican port. Do not book loading until the required licence and inspection documents are complete.",
    sources: [
      {
        label: "Jamaica Customs — Motor vehicle processing",
        url: "https://jca.gov.jm/business/motor-vehicle-processing/",
        authority: "Jamaica Customs Agency",
      },
      {
        label: "Jamaica Trade Board — 2026 pre-shipment inspection notice",
        url: "https://www.tradeboard.gov.jm/ttbl/NewsArticle.php?no=52",
        authority: "Jamaica Trade Board",
      },
      {
        label: "Jamaica Trade Board",
        url: "https://www.tradeboard.gov.jm/",
        authority: "Jamaica Trade Board",
      },
      {
        label: "Jamaica Trade Board — 2026 mandatory pre-shipment inspection notice",
        url: "https://www.tradeboard.gov.jm/ttbl/NewsArticle.php?no=52",
        authority: "Jamaica Trade Board Limited",
      },
    ],
    reviewedOn: "2026-11-11",
    indexable: true,
  },
  {
    slug: "guyana",
    name: "Guyana",
    region: "Caribbean & South America",
    seoTier: 2,
    title: "Japanese Car Import Guide for Guyana | Wazir Trading",
    description:
      "Plan a Japanese used-car import to Guyana with GRA vehicle inspection, ASYCUDA declaration and engine/age-based duty checks.",
    intro:
      "Guyana publishes specific guidance for vehicle customs declarations and used-vehicle inspection certificates. Buyers should confirm the approved inspection provider in Japan before arranging shipment because the certificate is part of the customs process.",
    buyerContext:
      "Guyana’s duty and tax treatment can vary by vehicle age and engine size. A buyer should obtain a current estimate from the GRA calculator or a licensed broker and confirm the required original documents before dispatch.",
    regulatorySnapshot:
      "The Guyana Revenue Authority’s February 2026 notice states that an inspection certificate is required for used vehicles and identifies the then-authorised Japan inspection agency. GRA also explains that vehicle declarations are processed through ASYCUDA and that duties/excise/VAT depend on age and engine size. Check the current approved-agency list and rate schedule.",
    checks: [
      "Confirm the currently authorised Japanese inspection agency and obtain the required vehicle inspection certificate before shipment.",
      "Check how GRA defines vehicle age and calculate duties/taxes using the current engine-capacity and age rules.",
      "Prepare bill of lading, certified invoice, vehicle/export papers, TIN and any relevant declaration forms for ASYCUDA clearance.",
    ],
    quoteFocus:
      "Provide engine capacity, manufacture year, inspection status and intended port. Keep the Japan FOB/freight figure separate from Guyana duty, excise, VAT, broker and registration charges.",
    sources: [
      {
        label: "GRA — Inspection certificate requirement",
        url: "https://gra.gov.gy/inspection-certificate-requirement/",
        authority: "Guyana Revenue Authority",
      },
      {
        label: "GRA — Motor vehicle duty/tax calculation guide",
        url: "https://gra.gov.gy/business/customs-and-trade/imports/motor-vehicle/",
        authority: "Guyana Revenue Authority",
      },
      {
        label: "Guyana Government — Import of a motor vehicle",
        url: "https://portal.gov.gy/services/import-of-a-motor-vehicle",
        authority: "Government of Guyana",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "trinidad-and-tobago",
    name: "Trinidad and Tobago",
    region: "Caribbean",
    seoTier: 2,
    title: "Japanese Car Import Guide for Trinidad and Tobago | Wazir Trading",
    description:
      "Check Trinidad and Tobago Trade Licence Unit procedures for personally importing used right-hand-drive vehicles from Japan.",
    intro:
      "Trinidad and Tobago’s Ministry of Trade publishes a specific Trade Licence Unit process for importing used vehicles, including a declaration for used right-hand-drive vehicles. Importers should complete the relevant application before a vehicle is shipped.",
    buyerContext:
      "The buyer’s status and whether the import is personally arranged or handled through a registered dealer can affect the process. The Ministry’s guidance also warns individuals about unauthorised third-party dealings.",
    regulatorySnapshot:
      "The Ministry of Trade’s Trade Licence Unit explains that individuals personally ordering a used vehicle must register and submit an online import-licence application, with supporting identification and a signed declaration for a used RHD motor vehicle. Returning-national provisions are distinct and should be checked separately.",
    checks: [
      "Confirm the correct import-licence route for an individual, registered dealer or returning national before purchase.",
      "Use the current Ministry declaration for used RHD vehicles and confirm vehicle class, age and any additional conditions.",
      "Verify customs duty, taxes, port/terminal, inspection, registration and local transport charges using the current official tariff.",
    ],
    quoteFocus:
      "Include the importer category, licence application status, vehicle details and intended port. Confirm the import licence before the vehicle is booked for shipment.",
    sources: [
      {
        label: "Ministry of Trade — Trade Licence Unit",
        url: "https://tradeind.gov.tt/tlu/",
        authority: "Ministry of Trade and Industry",
      },
      {
        label: "Ministry of Trade — Trade Licence Unit requirements",
        url: "https://mtti.gov.tt/documents-resources/trade-licence-unit-requirements/",
        authority: "Ministry of Trade and Industry",
      },
      {
        label: "Trinidad and Tobago Customs",
        url: "https://customs.gov.tt/",
        authority: "Customs and Excise Division",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "barbados",
    name: "Barbados",
    region: "Caribbean",
    seoTier: 3,
    title: "Japanese Car Import Guide for Barbados | Wazir Trading",
    description:
      "Plan a Japanese used-car import to Barbados with official vehicle registration documents and customs clearance checks.",
    intro:
      "For Barbados, the import and registration file should be planned together. The Barbados Licensing Authority lists the documents needed to register new or used imports, including a customs declaration and vehicle examination evidence.",
    buyerContext:
      "The buyer should confirm the current import process with Barbados Revenue Authority and the Licensing Authority, including the right document set, insurance requirements, inspection and vehicle registration category.",
    regulatorySnapshot:
      "The Barbados Licensing Authority’s vehicle-registration page lists Customs Declaration Form C63, insurance certificate or cover note, weight certificate, examiner’s certificate and registration/renewal form among the documentation for new or used imports. Check whether further import permits or customs approvals apply to the vehicle.",
    checks: [
      "Confirm the current import approval and customs declaration process with Barbados Revenue Authority before purchase.",
      "Check required examination, weight, insurance and registration documents for the vehicle class.",
      "Obtain a current duty/tax and port-charge assessment and identify who will arrange local registration and delivery.",
    ],
    quoteFocus:
      "Share the vehicle type, intended port and the buyer’s registration plan. A Japan export quote should distinguish sea freight from customs, examination, insurance and local registration costs.",
    sources: [
      {
        label: "Barbados Licensing Authority — Vehicle registration",
        url: "https://bla.gov.bb/servicedetails/VmVoaWNsZSBSZWdpc3RyYXRpb24%3D",
        authority: "Barbados Licensing Authority",
      },
      {
        label: "Barbados Revenue Authority",
        url: "https://bra.gov.bb/",
        authority: "Barbados Revenue Authority",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "cameroon",
    name: "Cameroon",
    region: "Central Africa",
    seoTier: 3,
    title: "Japanese Car Import Guide for Cameroon | Wazir Trading",
    description:
      "Plan a Japanese used-vehicle enquiry for Cameroon with official customs guidance on import declarations, used-vehicle identification and destination clearance.",
    intro:
      "A Japanese used vehicle intended for Cameroon needs a destination-side compliance plan before purchase. The importer should confirm the current declaration, vehicle-identification and customs-clearance process with Cameroon Customs and the relevant trade single-window authorities.",
    buyerContext:
      "Cameroon’s official customs guidance describes pre-import formalities for goods and has specific steps for used vehicles. Procedures and systems can change, so confirm the current workflow with an authorised customs broker before the vehicle is booked for shipment.",
    regulatorySnapshot:
      "Cameroon Customs publishes prior import formalities, including importer registration and an import declaration process for used vehicles. The Guichet Unique du Commerce Extérieur published a March 2026 notice about changes to the former PIVO process and the current e-GUCE/CAMCIS workflow. Confirm the live procedure and any applicable fees directly with the authorities; do not rely on older third-party summaries.",
    checks: [
      "Confirm importer registration and the current Import Declaration process through the official e-GUCE channel before shipment.",
      "Ask Cameroon Customs or an authorised broker which used-vehicle identification/inspection process and documents apply to the selected vehicle and port.",
      "Obtain a current customs valuation, duty, tax, port and cargo-tracking cost estimate for the exact vehicle before committing to purchase.",
    ],
    quoteFocus:
      "Provide the vehicle reference, make/model/year, engine details and intended port (for example, Douala or Kribi). Ask for Japan-side price and freight to be separated from Cameroon customs, inspection, port and local delivery costs.",
    sources: [
      {
        label: "Cameroon Customs — Prior import formalities",
        url: "https://www.douanes.cm/douanes-cameroun/formalites-prealables/",
        authority: "Directorate General of Customs, Cameroon",
      },
      {
        label: "GUCE — Used vehicle importer procedure update (March 2026)",
        url: "https://www.guichetunique.cm/en/used-vehicle-importers-the-pivo-procedure-has-been-abolished-here-is-what-changes/",
        authority: "Guichet Unique du Commerce Extérieur",
      },
      {
        label: "Cameroon Customs Information System notice",
        url: "https://www.cncc.cm/fr/article/importation-de-vehicules-doccasion-camcis-la-nouvelle-plate-forme-denregistrement-et-de-paiement-655?page=1",
        authority: "Conseil National des Chargeurs du Cameroun",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "lesotho",
    name: "Lesotho",
    region: "Southern Africa",
    seoTier: 3,
    title: "Japanese Car Import Guide for Lesotho | Wazir Trading",
    description:
      "Prepare a Japanese used-car import enquiry for Lesotho with official guidance on vehicle import permits, customs clearance and registration documents.",
    intro:
      "Before selecting a Japanese vehicle for Lesotho, confirm the import-permit route, importer eligibility and the documents required for customs release and registration. Requirements can differ depending on whether the vehicle is imported by a trader or an individual.",
    buyerContext:
      "Lesotho’s government services and trade information portals publish vehicle-related import and registration requirements. The buyer should confirm the permit route and destination-side clearance steps with the responsible authority and a qualified clearing agent before arranging shipment from Japan.",
    regulatorySnapshot:
      "The Government of Lesotho lists documents for imported motor vehicles, while the Lesotho Trade Information Portal describes an import permit procedure for vehicles and identifies the Ministry of Trade and Industry as the responsible agency. Check the current electronic single-window process, permit eligibility, customs valuation and registration requirements for the exact importer and vehicle.",
    checks: [
      "Confirm whether an import permit is required for the buyer’s status and whether registration as a vehicle importer or trader applies.",
      "Verify the required original export/cancellation certificate, bill of lading, invoice, customs entry and any police/vehicle-clearance documents.",
      "Ask Revenue Services Lesotho or a licensed clearing agent to calculate current customs duty, VAT and any other applicable charges for the exact vehicle.",
    ],
    quoteFocus:
      "Share the vehicle reference, year, engine capacity and intended Lesotho entry point. Confirm whether the quote is port-to-port only or includes any onward movement, customs support or local delivery.",
    sources: [
      {
        label: "Government of Lesotho — Imported motor vehicles",
        url: "https://www.gov.ls/eservice/imported-motor-vehicles/",
        authority: "Government of Lesotho",
      },
      {
        label: "Lesotho Trade Information Portal — Vehicle import permit",
        url: "https://www.lesothotradeportal.com/index.php?id=82&r=searchProcedure%2Fview1",
        authority: "Lesotho Trade Information Portal",
      },
      {
        label: "Revenue Services Lesotho",
        url: "https://www.rsl.org.ls/",
        authority: "Revenue Services Lesotho",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
  {
    slug: "bahamas",
    name: "The Bahamas",
    region: "Caribbean",
    seoTier: 2,
    title: "Japanese Car Import Guide for The Bahamas | Wazir Trading",
    description:
      "Prepare a Japanese vehicle import to The Bahamas with official import declaration, shipping-document and customs-duty guidance.",
    intro:
      "The Bahamas’ trade information portal outlines the general import process for cargo arriving by sea or air. A vehicle buyer should confirm the applicable tariff line, customs valuation and any vehicle-specific permit or inspection requirement before the vehicle leaves Japan.",
    buyerContext:
      "The Bahamas is an archipelago, so confirm the exact island and port of entry. A quote to Nassau or Freeport should not be assumed to include onward delivery to another island.",
    regulatorySnapshot:
      "Bahamas Trade Info states that importers collect shipping documents, complete customs declarations, present supporting documents and pay import duties before release. It lists invoices and bills of lading among supporting documents and identifies processing/environmental fees and VAT in its general import guidance; vehicle-specific rates should be checked in the live tariff finder.",
    checks: [
      "Confirm the precise island, port of entry and whether onward inter-island transport is required.",
      "Check the current vehicle HS code, tariff rate, customs value, processing/environmental fees, VAT and any age or steering restrictions.",
      "Prepare the invoice, bill of lading, importer ID/business licence and any vehicle-specific permits or inspection certificates.",
    ],
    quoteFocus:
      "State the island and exact delivery location, plus vehicle specifications. Ask for separate figures for ocean freight, port release, customs duty/tax and onward local movement.",
    sources: [
      {
        label: "Bahamas Trade Info — Import procedures",
        url: "https://www.bahamastradeinfo.gov.bs/trade-facilitation/import-procedures/",
        authority: "Government of The Bahamas",
      },
      {
        label: "Bahamas Customs Department",
        url: "https://www.bahamas.gov.bs/",
        authority: "Government of The Bahamas",
      },
    ],
    reviewedOn: "2026-11-10",
    indexable: true,
  },
];

export function getCountryLandingPage(slug: string): CountryLandingPage | undefined {
  return COUNTRY_LANDING_PAGES.find((country) => country.slug === slug);
}

export function countryLandingPath(country: Pick<CountryLandingPage, "slug">): string {
  return `/import-japanese-cars/${country.slug}`;
}

export function countryPageStructuredData(country: CountryLandingPage): Record<string, unknown>[] {
  const url = `${SITE_URL}${countryLandingPath(country)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: country.title,
      description: country.description,
      inLanguage: "en",
      about: { "@type": "Country", name: country.name },
      isPartOf: { "@id": `${SITE_URL}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Import Japanese Cars by Country",
          item: `${SITE_URL}/import-japanese-cars`,
        },
        { "@type": "ListItem", position: 3, name: country.name, item: url },
      ],
    },
  ];
}

export function countryDirectoryStructuredData(): Record<string, unknown> {
  const url = `${SITE_URL}/import-japanese-cars`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: "Import Japanese Used Cars by Country | Wazir Trading LLC",
    description:
      "Country-specific planning guides for buyers researching Japanese used vehicle imports, official import requirements and export quotation details.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: COUNTRY_LANDING_PAGES.filter((country) => country.indexable).length,
      itemListElement: COUNTRY_LANDING_PAGES.filter((country) => country.indexable).map(
        (country, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: country.name,
          url: `${SITE_URL}${countryLandingPath(country)}`,
        }),
      ),
    },
  };
}
