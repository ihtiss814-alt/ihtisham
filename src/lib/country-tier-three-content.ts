import type { CountryPriorityContent } from "./country-tier-one-content";

/**
 * Curated, country-specific Tier 3 destination guidance.
 * Search themes are editorial planning data only; never render them as hidden
 * keyword blocks. Destination law, permits and service availability must be
 * reconfirmed with the named authority for the exact vehicle and shipment date.
 */
export const COUNTRY_TIER_THREE_CONTENT: Record<string, CountryPriorityContent> = {
  oman: {
    pageHeading: "Import Japanese Cars to Oman: Vehicle Age and Customs Rules",
    searchThemes: [
      "Japanese used cars in Oman",
      "import used cars from Japan to Oman",
      "Oman used vehicle seven year rule",
      "Oman customs vehicle import permit",
      "Japan car shipping to Sohar Muscat Salalah",
    ],
    marketOverview:
      "Oman's Directorate General of Customs publishes a dedicated service for importing used vehicles. It lists private vehicles that are less than seven years old, trucks and buses less than ten years old, and equipment less than fifteen years old. Imported vehicles must comply with the standards in force in the Sultanate. The Customs service also sets out separate conditions for classic vehicles and says the General Traffic Department's approval is required in those cases. Buyers should classify the vehicle correctly and calculate age from the manufacturing details before paying.",
    planningSteps: [
      {
        title: "Confirm the exact vehicle category and age",
        detail:
          "Use the Customs category that matches the vehicle: private car, truck, bus or equipment. The published limits differ (under seven years for private cars, under ten years for trucks and buses, and under fifteen years for equipment). Confirm the applicable manufacture-date calculation and any exception directly with Customs.",
      },
      {
        title: "Confirm personal or commercial import eligibility",
        detail:
          "The Customs service says a personal importer must be at least 18 years old. Commercial importers should check the separate second-hand vehicle permit service, which describes a multiple-import permit valid for one year and requiring lawful handling of prior imports for renewal.",
      },
      {
        title: "Check conformity and technical condition",
        detail:
          "Confirm that the vehicle meets Omani specifications and that its chassis/VIN, engine, steering, safety equipment and export documents are consistent. Classic vehicles follow a separate process and need approval from the General Traffic Department; do not treat a classic-vehicle exception as ordinary road-use approval.",
      },
      {
        title: "Obtain a vehicle-specific customs estimate",
        detail:
          "Ask Oman Customs or a licensed broker to confirm the correct HS classification, customs value, duty, VAT or other applicable charges, port fees and registration requirements. Keep the Japanese purchase price, freight and insurance evidence available.",
      },
    ],
    logisticsSummary:
      "State the intended Omani port and final city—such as Sohar, Muscat or Salalah—before requesting freight. Confirm the actual carrier service, discharge port, customs inspection, clearance and inland delivery scope. A shipment to a port does not automatically include customs release or registration, and any onward movement should be itemised in the written quotation.",
    localChecks: [
      "Check the Customs age limit for the exact category: under seven years for private cars and under ten years for trucks/buses in the published service.",
      "Confirm the importer is eligible and at least 18 for personal import; commercial importers should verify the separate permit route.",
      "Confirm standards conformity, chassis identity and any General Traffic Department approval for a classic vehicle.",
      "Obtain a current Customs valuation and duty assessment before accepting a landed-cost estimate.",
    ],
    costFactors: [
      "Japanese vehicle purchase price, auction/agent fees, export inspection and Japan-side inland movement.",
      "Ocean freight, marine insurance, export documents and destination port/terminal handling.",
      "Oman customs value, duties/taxes, any permit or conformity costs and customs-broker charges.",
      "Inspection, registration, insurance, storage and onward delivery to the final city.",
    ],
    faqs: [
      {
        question: "What is Oman's age limit for importing a used private car?",
        answer:
          "Oman's Directorate General of Customs publishes a limit of less than seven years for private vehicles. The published category differs for trucks, buses and equipment, so confirm the exact classification and age calculation before purchase.",
      },
      {
        question: "Can a commercial importer bring in several used vehicles?",
        answer:
          "Customs publishes a separate permit service allowing a permit for up to 50 vehicles, multiple imports and a one-year validity period. Confirm the current permit conditions and eligibility with the Ministry/Customs before making a commercial shipment.",
      },
      {
        question: "Can I import a classic vehicle to Oman?",
        answer:
          "Customs describes a separate classic-vehicle process, including 30- and 50-year categories, and says all such cases require General Traffic Department approval. Confirm the applicable category and road-use status before buying.",
      },
      {
        question: "Does the Japan freight quotation include Omani registration?",
        answer:
          "Not unless the written quotation expressly says so. Freight, customs clearance, conformity checks, insurance, registration and delivery are separate cost and responsibility items.",
      },
    ],
    enquiryNote:
      "For Oman, provide the vehicle class, manufacture date, engine/chassis details, importer type and intended port/city. The quote remains conditional on the current Customs age, permit and conformity requirements for that exact vehicle.",
  },

  qatar: {
    pageHeading: "Import Japanese Cars to Qatar: Customs and Registration Checks",
    searchThemes: [
      "Japanese used cars in Qatar",
      "import used car from Japan to Qatar",
      "Qatar vehicle customs clearance requirements",
      "Qatar imported car technical inspection Fahes",
      "Japan car shipping to Hamad Port Qatar",
    ],
    marketOverview:
      "Qatar's General Authority of Customs publishes personal-import controls, required shipping documents and electronic customs procedures. Personal imports must be personal in nature and non-commercial, and the importer may be asked to present an ID, passport or residence visa and approvals for restricted goods. The Customs guide also allows authorities to request Arabic translations of foreign invoices and documents. Road-use eligibility and inspection are separate from customs release, so buyers should obtain confirmation from the Traffic Department and the relevant technical-inspection authority for the exact vehicle before shipping.",
    planningSteps: [
      {
        title: "Check the importer's status and transaction type",
        detail:
          "Confirm whether the import is genuinely personal or commercial. Qatar Customs says a personal importer must not be a trader and the consignment must not have commercial quantities or characteristics. Commercial shipments should follow the appropriate importer and customs route rather than being declared as personal.",
      },
      {
        title: "Obtain written vehicle admissibility guidance",
        detail:
          "Before purchase, ask Qatar Customs and the Traffic Department to confirm the current age, steering-side, vehicle specification and registration conditions for the exact Japanese-market model. Do not rely on unofficial age-limit summaries or assume that a vehicle accepted in another GCC state is automatically registrable in Qatar.",
      },
      {
        title: "Prepare the shipping and customs documents",
        detail:
          "Qatar Customs lists a delivery order, bill of lading, cargo manifest and electronic import declaration among the relevant sea/air clearance documents. Keep the original export certificate, invoice, ownership proof and chassis details ready; Customs may request Arabic translations.",
      },
      {
        title: "Plan inspection, insurance and road registration",
        detail:
          "Confirm the technical inspection route, vehicle condition requirements, insurance and registration sequence with the competent Qatari authority. Customs inspection and release do not by themselves certify the vehicle for public-road registration.",
      },
    ],
    logisticsSummary:
      "Identify Hamad Port or the confirmed point of entry and the final destination before booking freight. Confirm whether the service includes port handling, customs brokerage, technical inspection, insurance, registration and local delivery. Do not promise a five-year age rule, left-hand-drive acceptance or registration until the authority has confirmed the exact vehicle specification in writing.",
    localChecks: [
      "Distinguish a personal, non-commercial import from a commercial vehicle shipment and confirm the correct importer status.",
      "Get a current written answer on manufacture/model age, steering side and technical eligibility for the exact Japanese-market vehicle.",
      "Prepare the bill of lading, delivery order, manifest, export certificate, invoice and any Arabic translations requested by Customs.",
      "Confirm technical inspection, insurance and registration independently of customs release.",
    ],
    costFactors: [
      "Japanese vehicle price, inspection/auction charges, export documentation and inland delivery to port.",
      "Ocean freight, marine insurance, shipping documentation and Qatar port/terminal fees.",
      "Customs valuation, applicable customs duty, broker and any required technical approval or inspection.",
      "Insurance, registration, inspection, storage and delivery to the final address.",
    ],
    faqs: [
      {
        question: "Can any individual import a Japanese used car to Qatar as a personal shipment?",
        answer:
          "Qatar Customs says a personal consignment must be personal and non-commercial and the importer must not be a trader. Confirm eligibility and any vehicle-specific restrictions before buying.",
      },
      {
        question: "Does Qatar Customs publish the complete vehicle-age and steering rules?",
        answer:
          "The general importation page explains customs procedures and personal-import controls, but it is not a complete vehicle-registration ruling. Ask Customs and the Traffic Department for written confirmation for the exact make, model, year and steering configuration.",
      },
      {
        question: "Which documents are required for a sea shipment?",
        answer:
          "The Customs guide identifies the delivery order, bill of lading and manifest, together with an electronic import declaration and other supporting documents. Keep the Japanese export certificate, invoice and ownership details available as well.",
      },
      {
        question: "Does customs release mean the car can be driven on Qatari roads?",
        answer:
          "No. Road-use registration, technical inspection and insurance are separate steps. Confirm the vehicle's eligibility and inspection route before shipment.",
      },
    ],
    enquiryNote:
      "For Qatar, provide the importer category, vehicle model/year, steering side, intended port and any written eligibility response already obtained. We will separate freight and customs costs from inspection, insurance and registration.",
  },

  bahrain: {
    pageHeading: "Import Japanese Cars to Bahrain: Registration and Age Rules",
    searchThemes: [
      "Japanese used cars in Bahrain",
      "import used cars from Japan to Bahrain",
      "Bahrain imported used vehicle five year rule",
      "Bahrain traffic imported vehicle registration fee",
      "Japan car shipping to Khalifa Bin Salman Port",
    ],
    marketOverview:
      "Bahrain's traffic legislation sets age-related registration conditions for used vehicles imported from outside the Kingdom. The published rule for private cars and private passenger-transport cars concerns vehicles more than five years old from manufacture; the 2021 amendment provides a file-opening fee route for registration in specified cases and identifies exceptions. A separate ten-year restriction applies to certain private-use transport vehicles, tractors, trailers and semi-trailers, subject to the authority's discretion. Buyers should confirm the consolidated current rule and fee with the General Directorate of Traffic before purchase.",
    planningSteps: [
      {
        title: "Check vehicle type and manufacture year",
        detail:
          "Use the correct traffic category. The rule for private cars and private passenger-transport cars differs from the rule for trucks, tractors, trailers and semi-trailers. Confirm the manufacture year and whether the vehicle falls into an exception before arranging export.",
      },
      {
        title: "Confirm the current registration fee or exception",
        detail:
          "The 2021 amendment states that registration of certain used imported private vehicles over five years may proceed after payment of a BHD 1,000 file-opening fee, subject to listed exceptions. Obtain written confirmation from Traffic about the current consolidated rule, fee and treatment of the exact vehicle.",
      },
      {
        title: "Prepare customs and origin documents",
        detail:
          "Bahrain's government registration service requires a customs-clearance certificate and an export or ownership certificate appropriate to the country of origin. Keep the Japanese deregistration/export certificate, invoice, bill of lading and matching chassis details ready.",
      },
      {
        title: "Arrange inspection, insurance and registration",
        detail:
          "Confirm any technical inspection and relevant authority approvals for the vehicle class, then arrange civil-liability insurance for the registration period. Customs clearance does not itself issue Bahrain ownership documents or registration plates.",
      },
    ],
    logisticsSummary:
      "State Khalifa Bin Salman Port or the confirmed entry point, and the final Bahrain delivery location, on the quote request. The service scope should distinguish port-to-port freight, customs clearance, file-opening/registration fees, inspection, insurance and local delivery. Do not describe the five-year provision as a simple prohibition or quote a fee without confirming the current Traffic Department treatment.",
    localChecks: [
      "Use manufacture date and the correct vehicle class when applying Bahrain's five-year or ten-year provisions.",
      "Confirm with the General Directorate of Traffic whether the BHD 1,000 file-opening fee or an exception applies under the consolidated rule.",
      "Prepare the customs-clearance certificate and the correct Japanese export/ownership document.",
      "Confirm insurance, inspection and any class-specific approvals before assuming the vehicle can be registered.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent fees, export inspection and Japan-side transport.",
      "Ocean freight, marine insurance, shipping documentation and Bahrain terminal handling.",
      "Customs duty/taxes, customs broker, any Traffic file-opening fee and required technical inspection.",
      "Insurance, registration, storage and final local delivery.",
    ],
    faqs: [
      {
        question: "Does Bahrain have a five-year rule for used imported cars?",
        answer:
          "Bahrain's traffic legislation uses a five-year manufacture-age threshold for private cars and private passenger-transport cars. The 2021 amendment provides a fee-based registration route in specified cases, so confirm the current consolidated rule rather than treating it as an unconditional ban.",
      },
      {
        question: "Is the BHD 1,000 fee applicable to every vehicle?",
        answer:
          "No. The amendment concerns file opening for specified imported used vehicles and includes exceptions and separate treatment for other vehicle categories. Obtain a current written fee assessment from Traffic.",
      },
      {
        question: "What documents are needed to register a used imported vehicle?",
        answer:
          "Bahrain's government service lists a customs-clearance certificate and an export certificate or ownership/clearance document depending on origin, together with insurance and other approvals for certain classifications.",
      },
      {
        question: "Does customs clearance guarantee Bahrain registration?",
        answer:
          "No. The Traffic Department's registration, technical and insurance conditions must also be satisfied. Confirm eligibility before committing to shipment.",
      },
    ],
    enquiryNote:
      "For Bahrain, provide the manufacture year, vehicle type, intended port and any Traffic Department decision on the age/fee rule. The export quote is separate from Bahrain customs, registration, inspection and insurance.",
  },

  "saudi-arabia": {
    pageHeading: "Import Japanese Cars to Saudi Arabia: SASO and ZATCA Rules",
    searchThemes: [
      "Japanese used cars in Saudi Arabia",
      "import cars from Japan to Saudi Arabia",
      "Saudi used car five year import rule",
      "SASO Saber vehicle import certificate",
      "ZATCA vehicle import customs energy efficiency",
    ],
    marketOverview:
      "Saudi Arabia's Zakat, Tax and Customs Authority (ZATCA) and Saudi Standards, Metrology and Quality Organization (SASO) publish vehicle-specific import controls. ZATCA states that small vehicles, buses and light transport vehicles up to 3.5 tonnes generally must not exceed five model years, excluding the current year; heavy trucks have a five-year operational-life rule calculated from the year of manufacture. Vehicle energy-efficiency compliance and SASO conformity are separate requirements, and the authority prohibits several categories of damaged, salvage, taxi/police and structurally modified vehicles.",
    planningSteps: [
      {
        title: "Confirm the importer category and annual allowance",
        detail:
          "ZATCA distinguishes citizens, GCC citizens, residents and commercial importers. Its current individual guidance sets different annual quantities and holding rules; confirm the buyer's status and entitlement before treating a vehicle as an individual import.",
      },
      {
        title: "Check the five-year rule and energy efficiency",
        detail:
          "For small vehicles, buses and light transport up to 3.5 tonnes, ZATCA publishes a five-model-year limit excluding the current year. Check the current energy-efficiency certificate and approved vehicle data for the exact model/engine before purchase.",
      },
      {
        title: "Obtain the SASO/Saber consignment certificate",
        detail:
          "SASO's service lets individuals and importers request a Vehicle/Motorcycle Import Shipment Certificate through Saber and an accepted inspection body. Confirm the vehicle's compliance and required inspection evidence before loading; a similar model's certificate is not approval for this chassis.",
      },
      {
        title: "Screen accident history and steering configuration",
        detail:
          "ZATCA prohibits imported vehicles with certain flood, fire, accident or structural damage, taxi/police use and modified steering. Chassis-number tampering and stolen vehicles are also prohibited. Obtain a credible condition/history inspection and ensure the VIN is intact and matches the documents.",
      },
    ],
    logisticsSummary:
      "Identify the intended Saudi port and final city before arranging sea freight. The buyer should hold the required authority approval and Saber conformity evidence before loading. Separate ocean freight and insurance from customs valuation/duty, port charges, any applicable vehicle-import fee, technical inspection, registration and delivery. Residents and individual buyers have different eligibility conditions from commercial importers.",
    localChecks: [
      "Apply the correct five-year model/manufacture rule to the vehicle's weight category and verify the current buyer allowance.",
      "Check SASO fuel-efficiency and Saber conformity for the exact make/model and vehicle identity before shipment.",
      "Do not ship a salvage, flooded, fire-damaged, structurally damaged, taxi/police or steering-converted vehicle.",
      "Confirm current ZATCA customs valuation, vehicle-import fee where applicable, documentation and registration requirements.",
    ],
    costFactors: [
      "Japanese vehicle price, inspection/auction charges, export certificate and inland transport.",
      "Ocean freight, insurance, origin documentation and Saudi port/terminal handling.",
      "SASO/Saber certificate/inspection, customs duty and any applicable vehicle-import fee or taxes.",
      "Customs broker, port storage, local technical inspection, insurance, registration and delivery.",
    ],
    faqs: [
      {
        question: "What is Saudi Arabia's age limit for a used light vehicle?",
        answer:
          "ZATCA publishes a five-model-year limit for small vehicles, buses and light transport up to 3.5 tonnes, excluding the current year. Heavy trucks use a separate five-year rule measured from manufacture. Check the exact category and current date calculation.",
      },
      {
        question: "Does a Japanese car need SASO approval before shipping?",
        answer:
          "SASO offers a vehicle import shipment certificate through the Saber platform and accepted inspection bodies. Confirm the required certificate and conformity for the exact vehicle before loading.",
      },
      {
        question: "Can I import a repaired accident or flood vehicle?",
        answer:
          "ZATCA lists vehicles subject to drowning, fire, collision, rollover or structural damage among prohibited imports. Do not rely on cosmetic repair or an auction grade; confirm the history and condition with a competent inspection provider.",
      },
      {
        question: "Can a right-hand-drive Japanese car be converted for Saudi registration?",
        answer:
          "ZATCA's published guidance prohibits vehicles whose steering system has been modified from right to left. Do not buy a vehicle on the assumption that a steering conversion will make it eligible.",
      },
    ],
    enquiryNote:
      "For Saudi Arabia, provide the buyer's status, vehicle manufacture/model year, weight category, fuel-economy data, chassis number and intended port. We will not treat a freight estimate as ZATCA eligibility or SASO/Saber approval.",
  },

  botswana: {
    pageHeading: "Import Japanese Cars to Botswana: BURS Customs Guide",
    searchThemes: [
      "Japanese used cars in Botswana",
      "import cars from Japan to Botswana",
      "Botswana BURS used motor vehicle import",
      "Botswana vehicle customs clearance SAD 500",
      "ship car from Japan to Gaborone Botswana",
    ],
    marketOverview:
      "Botswana Unified Revenue Service (BURS) states that Botswana currently does not impose a general restriction on importing or exporting motor vehicles. That does not mean a vehicle can enter without customs clearance: vehicles for home consumption are liable for the applicable customs duties and/or VAT and must be cleared within 14 days of entry. BURS lists a SAD 500 customs declaration, police clearance from both the export country and Botswana, export-country customs documents and an invoice or valuation certificate among the supporting documents.",
    planningSteps: [
      {
        title: "Confirm the vehicle can be cleared for home consumption",
        detail:
          "BURS states that there is no general motor-vehicle import restriction, but the vehicle still requires customs clearance and payment of applicable duties/VAT. Confirm the intended use, classification and any other current restrictions with BURS before purchase.",
      },
      {
        title: "Prepare police and export-country evidence",
        detail:
          "BURS lists police clearance certificates from both the export country and Botswana, export-country customs-clearance documents and an invoice or local retail valuation certificate. Arrange the Japanese export and ownership papers early and check whether the local police clearance requires the vehicle's arrival first.",
      },
      {
        title: "File the customs declaration within the stated period",
        detail:
          "BURS says vehicles entering for home consumption should be cleared within 14 days from entry. Coordinate the SAD 500 declaration, customs value, duty/VAT assessment and supporting documents with a Botswana-registered clearing agent before the vehicle arrives.",
      },
      {
        title: "Complete technical inspection and local registration",
        detail:
          "After customs release, confirm the Department of Road Transport and Safety requirements, inspection, insurance and registration. Do not mistake customs clearance for a roadworthiness certificate or a completed registration.",
      },
    ],
    logisticsSummary:
      "Botswana is landlocked, so a Japan shipment needs a confirmed regional seaport and inland corridor. The carrier and clearing agent should identify port handling, transit documentation, border formalities and delivery to Gaborone or another town. The 14-day BURS clearance clock begins at entry; pre-arrange documents and broker responsibilities to avoid storage and deadline problems.",
    localChecks: [
      "Use BURS's current motor-vehicle clearance guidance; the absence of a general import ban does not remove customs duties/VAT or declaration requirements.",
      "Prepare SAD 500, police clearance from Japan and Botswana, export-country customs clearance and invoice/valuation evidence.",
      "Coordinate the 14-day customs clearance period from vehicle entry with a licensed clearing agent.",
      "Confirm inspection, insurance and registration requirements with the Department of Road Transport and Safety after customs clearance.",
    ],
    costFactors: [
      "Japanese purchase price, auction/agent fees, inspection and export documents.",
      "Ocean freight, marine insurance, port and inland transit/terminal charges.",
      "BURS customs valuation, duty, VAT and customs-broker fees.",
      "Police clearance, inspection, registration, storage and final delivery to the buyer.",
    ],
    faqs: [
      {
        question: "Does Botswana have a general age limit for importing cars?",
        answer:
          "BURS states that Botswana currently does not impose a general restriction on motor-vehicle imports. Confirm any vehicle-specific rule or permit with BURS before purchase.",
      },
      {
        question: "How long do I have to clear an imported car in Botswana?",
        answer:
          "BURS says a motor vehicle entering for home consumption should be cleared for customs purposes within 14 days from the date of entry. Arrange documents and a clearing agent before arrival.",
      },
      {
        question: "Which police clearances does BURS require?",
        answer:
          "BURS lists police clearance certificates from both the export country and Botswana, together with export-country customs-clearance documents and an invoice or valuation certificate.",
      },
      {
        question: "Does a vehicle customs clearance complete road registration?",
        answer:
          "No. The buyer must also confirm local roadworthiness inspection, insurance and registration requirements with Botswana's road-transport authority.",
      },
    ],
    enquiryNote:
      "For Botswana, specify the intended regional port, inland corridor and final town, and confirm who will obtain both police clearances and complete SAD 500 within BURS's 14-day period.",
  },

  senegal: {
    pageHeading: "Import Japanese Cars to Senegal: 2025 Age Rules and Customs",
    searchThemes: [
      "Japanese used cars in Senegal",
      "import used cars from Japan to Senegal",
      "Senegal used vehicle ten year import rule",
      "Senegal decree 2025-1752 used vehicle import",
      "vehicle customs clearance Dakar port Senegal",
    ],
    marketOverview:
      "Senegal amended its used-vehicle import rules through Decree No. 2025-1752 of 24 October 2025, published in the Official Journal in November 2025. The amended decree prohibits passenger vehicles and light utility vehicles up to 3.5 tonnes that are over ten years old, people-transport utility vehicles with at least seven seats over ten years old, and goods vehicles over 3.5 tonnes that are over fifteen years old. Senegal's Finance Ministry says vehicle customs clearance is principally handled by Dakar-Port Nord and Dakar-Port Sud.",
    planningSteps: [
      {
        title: "Check manufacture age against the correct class",
        detail:
          "Apply the amended age rule to the exact class: passenger and light utility vehicles up to 3.5 tonnes, plus people-transport utility vehicles with at least seven seats, are restricted over ten years; goods vehicles above 3.5 tonnes have a fifteen-year limit. Confirm the vehicle's manufacture date and technical category before bidding.",
      },
      {
        title: "Confirm technical inspection and age verification",
        detail:
          "The underlying decree provides for technical inspection and age verification by an approved organisation. Confirm the currently authorised inspection provider, certificate and sequence for a vehicle sourced in Japan before loading.",
      },
      {
        title: "Prepare the Senegal customs file",
        detail:
          "The Finance Ministry lists the vehicle registration document, purchase invoice or value evidence, owner identity, bill of lading/transport document and customs declaration. Customs verifies documents and valuation, calculates duties/taxes and issues release documents.",
      },
      {
        title: "Plan the authorised clearance office and delivery",
        detail:
          "Vehicle clearance is principally carried out at Dakar-Port Nord and Dakar-Port Sud. Confirm which office and terminal will handle the shipment and separately plan inland delivery to the buyer's final location.",
      },
    ],
    logisticsSummary:
      "Name Dakar and the intended customs office/terminal on the shipping request. The Senegal Finance Ministry identifies Dakar-Port Nord and Dakar-Port Sud as the primary offices authorised to process vehicle customs clearance; other regional clearance is exceptional. Keep the ocean-freight amount, FOB value, inspection evidence and vehicle class available because customs cost depends on value, freight, taxes and specifications.",
    localChecks: [
      "Apply Decree 2025-1752 (24 October 2025) rather than older online summaries that still show a five- or eight-year limit.",
      "Confirm the vehicle's correct class and manufacture age: generally ten years for passenger/light/people transport categories specified in the decree and fifteen years for heavy goods vehicles over 3.5 tonnes.",
      "Confirm the currently approved technical inspection and age-verification provider before shipment.",
      "Prepare the original registration, invoice/value proof, owner ID, bill of lading and customs declaration for Dakar-Port Nord or Dakar-Port Sud.",
    ],
    costFactors: [
      "Japanese purchase price, auction/agent charges, inspection and export documentation.",
      "Ocean freight, marine insurance and Dakar terminal/port charges.",
      "Senegal customs valuation, applicable duties/taxes and any inspection/age-verification fee.",
      "Customs broker, port storage, registration and delivery from Dakar to the final town.",
    ],
    faqs: [
      {
        question: "What is Senegal's current age limit for used passenger cars?",
        answer:
          "Decree 2025-1752 sets a ten-year limit for passenger vehicles and specified light utility/people-transport categories. Confirm the manufacture-age calculation and vehicle class before purchase.",
      },
      {
        question: "Do heavier goods trucks have the same age limit?",
        answer:
          "No. The amended decree sets a fifteen-year limit for goods-transport utility vehicles above 3.5 tonnes GVW. The vehicle's gross weight and category must be documented.",
      },
      {
        question: "Where are vehicles normally cleared through Senegal Customs?",
        answer:
          "The Finance Ministry identifies Dakar-Port Nord and Dakar-Port Sud as the principal offices authorised for vehicle customs clearance. Regional clearance is exceptional and must be authorised.",
      },
      {
        question: "Which documents are needed for Senegal customs clearance?",
        answer:
          "The Finance Ministry lists the vehicle registration document, purchase invoice or value evidence, owner identity, bill of lading/transport document and customs declaration. Additional documents may be requested by Customs.",
      },
    ],
    enquiryNote:
      "For Senegal, provide manufacture date, gross vehicle weight, passenger/seating category and intended Dakar customs office. We will screen the shipment against Decree 2025-1752 before preparing a vehicle or freight quotation.",
  },

  "the-gambia": {
    pageHeading: "Import Japanese Cars to The Gambia: Age and Customs Guide",
    searchThemes: [
      "Japanese used cars in Gambia",
      "import cars from Japan to Gambia",
      "Gambia eight year used car import limit",
      "GRA vehicle customs clearance ASYCUDA",
      "shipping Japanese cars to Banjul",
    ],
    marketOverview:
      "The Gambia Revenue Authority's Customs FAQ states that second-hand motor vehicles over eight years old are not allowed into The Gambia under the KS 1515:2000 quality standard enforced by GRA. The same FAQ explains that import documentation is processed electronically through the ASYCUDA system by a clearing agent and that duty is assessed according to customs value and the applicable rate. Buyers should confirm the manufacture-year calculation and current tariff for the exact vehicle before purchase.",
    planningSteps: [
      {
        title: "Check the eight-year vehicle-age restriction",
        detail:
          "GRA states that second-hand motor vehicles over eight years old are not allowed. Verify the manufacture year against original Japanese documentation and ask GRA or a licensed agent to confirm the calculation for the planned arrival date.",
      },
      {
        title: "Appoint a recognised customs clearing agent",
        detail:
          "GRA says import documentation is processed electronically through ASYCUDA by a clearing agent. Confirm that the agent is appropriately authorised and agree who will submit the import declaration, valuation papers and supporting vehicle documents.",
      },
      {
        title: "Prepare vehicle and shipping records",
        detail:
          "Keep the Japanese export/deregistration certificate, purchase invoice, vehicle identity and bill of lading together. The chassis number, make/model, manufacture year and declared value should match across the inspection, invoice and shipping records.",
      },
      {
        title: "Obtain a current duty and landing-cost assessment",
        detail:
          "GRA states that customs assesses duty using the value and applicable tariff. Ask for a current vehicle-specific assessment and include freight, insurance, port handling, clearing, registration and inland delivery rather than relying on a generic duty percentage.",
      },
    ],
    logisticsSummary:
      "For a Banjul shipment, confirm the carrier, discharge arrangement and final delivery point before purchase. Make sure the clearing agent has the vehicle documents and can lodge the ASYCUDA declaration promptly. Port storage, customs examination and local delivery should be stated separately from ocean freight.",
    localChecks: [
      "Do not buy a second-hand vehicle over eight years old; GRA states that such vehicles are not allowed under the cited quality standard.",
      "Confirm the manufacture year from original vehicle documents rather than relying solely on the seller's model year.",
      "Use a clearing agent to process the import declaration electronically through ASYCUDA.",
      "Obtain a current GRA duty/valuation assessment and confirm registration and roadworthiness steps after customs release.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent fees and export documents.",
      "Ocean freight, marine insurance and Banjul port/terminal handling.",
      "Customs valuation, applicable import duty/taxes and any inspection or clearance charges.",
      "ASYCUDA broker, port storage, registration, insurance and inland delivery.",
    ],
    faqs: [
      {
        question: "What is the maximum age of a used vehicle allowed into The Gambia?",
        answer:
          "GRA's Customs FAQ says motor vehicles over eight years old are not allowed under the KS 1515:2000 quality standard. Confirm the manufacture-year calculation with GRA before purchase.",
      },
      {
        question: "How are vehicle imports declared in The Gambia?",
        answer:
          "GRA says import documents are processed electronically through ASYCUDA by a clearing agent. Appoint an agent and prepare the invoice, export documents and bill of lading before the vehicle arrives.",
      },
      {
        question: "Can I use a fixed online duty percentage?",
        answer:
          "Do not rely on a generic percentage. GRA says the duty depends on customs value and the applicable tariff; ask for a current vehicle-specific assessment using the exact classification.",
      },
      {
        question: "Does shipping to Banjul include inland delivery?",
        answer:
          "Not automatically. The quote should distinguish ocean freight, port/terminal handling, customs clearance, registration and local delivery.",
      },
    ],
    enquiryNote:
      "For The Gambia, include manufacture year, vehicle category, intended Banjul arrival and the agent handling ASYCUDA clearance. The vehicle must pass GRA's eight-year age check before a shipment is arranged.",
  },

  "sierra-leone": {
    pageHeading: "Import Japanese Cars to Sierra Leone: Customs Checks",
    searchThemes: [
      "Japanese used cars in Sierra Leone",
      "import cars from Japan to Sierra Leone",
      "Sierra Leone vehicle import customs documents",
      "Sierra Leone right hand drive vehicle import approval",
      "shipping used cars to Freetown Sierra Leone",
    ],
    marketOverview:
      "Sierra Leone vehicle import enquiries need early confirmation of steering-side acceptance, vehicle category and current customs requirements. The public authority material readily available for this guide does not establish a single current used-car age limit or a complete Japan-specific approval rule. Because Japanese-market vehicles are commonly right-hand drive, the buyer should obtain written confirmation from the National Revenue Authority and Sierra Leone Road Safety Authority before purchasing. Do not assume a vehicle can be converted or registered after arrival.",
    planningSteps: [
      {
        title: "Obtain written steering-side and vehicle eligibility confirmation",
        detail:
          "Send the exact make, model, year, steering configuration and chassis number to the competent Sierra Leone authorities. Get a written answer on whether the vehicle can be imported, inspected and registered before placing a bid or paying a deposit.",
      },
      {
        title: "Confirm any age, condition and technical restrictions",
        detail:
          "Ask the NRA, SLRSA and relevant standards authority to confirm the current age calculation, roadworthiness, accident/salvage restrictions and any pre-shipment certificate required for the vehicle category. This guide does not invent an unverified blanket age limit.",
      },
      {
        title: "Prepare origin and shipping evidence",
        detail:
          "Prepare the original Japanese export/deregistration certificate, proof of ownership, commercial invoice, bill of lading, insurance/freight evidence and importer Tax Identification Number. Ensure the chassis and engine details match throughout the file.",
      },
      {
        title: "Use a licensed clearing agent and budget the local release",
        detail:
          "Ask a Sierra Leone customs agent to confirm the electronic declaration, any required cargo tracking/advance manifest reference, customs valuation, examination, duties/taxes and port process for Freetown. Customs release and SLRSA road registration are separate steps.",
      },
    ],
    logisticsSummary:
      "Identify Freetown as the proposed discharge location and confirm the actual carrier, terminal, clearing agent and local delivery scope. Obtain the current cargo-tracking/manifest instructions from the shipping line and NRA before dispatch. Port storage and demurrage can accrue if the buyer has not resolved steering eligibility or prepared original documents before the ship arrives.",
    localChecks: [
      "Get written confirmation on Japanese right-hand-drive eligibility before purchase; do not rely on an overseas dealer's statement.",
      "Ask NRA and SLRSA to confirm current age, condition, inspection and registration rules for the exact vehicle.",
      "Prepare the Japanese export certificate, invoice, bill of lading, ownership details and importer TIN with matching chassis/engine numbers.",
      "Confirm cargo manifest/tracking requirements, customs broker, taxes and port clearance before booking freight.",
    ],
    costFactors: [
      "Japanese vehicle purchase, auction/agent fees and export/deregistration documents.",
      "Ocean freight, marine insurance, cargo tracking/documentation and Freetown terminal charges.",
      "Customs value, applicable duties/taxes, examination, broker and any technical inspection costs.",
      "Roadworthiness inspection, insurance, registration, storage and inland delivery.",
    ],
    faqs: [
      {
        question: "Can I import a right-hand-drive Japanese car to Sierra Leone?",
        answer:
          "Do not assume it is admissible. Obtain written confirmation from NRA and SLRSA for the exact vehicle and steering configuration before purchase or shipment.",
      },
      {
        question: "What is Sierra Leone's used-car age limit?",
        answer:
          "The public primary-source material reviewed for this page does not establish a definitive current blanket age limit. Ask NRA and SLRSA to confirm the rule for the selected vehicle category and import date.",
      },
      {
        question: "Which documents should I prepare?",
        answer:
          "Prepare the export/deregistration certificate, proof of ownership, invoice, bill of lading, insurance/freight details and importer TIN. The clearing agent should confirm any additional declaration or cargo-tracking documents.",
      },
      {
        question: "Does customs release mean the vehicle is road-registered?",
        answer:
          "No. Customs release, roadworthiness inspection and SLRSA registration are distinct steps. Confirm each before shipping.",
      },
    ],
    enquiryNote:
      "For Sierra Leone, send the vehicle's steering side, year, chassis number and intended Freetown arrival. We will require written NRA/SLRSA confirmation of eligibility before representing the vehicle as suitable for import.",
  },

  liberia: {
    pageHeading: "Import Japanese Cars to Liberia: Age and Steering Rules",
    searchThemes: [
      "Japanese used cars in Liberia",
      "import used cars from Japan to Liberia",
      "Liberia used car ten year import age limit",
      "Liberia right hand drive vehicle import restriction",
      "Liberia Ministry of Commerce car import documents",
    ],
    marketOverview:
      "Liberia's Ministry of Transport administrative regulation for vehicle dealerships states that a used vehicle imported into the commerce of Liberia must not be older than ten years and says right-hand-drive vehicles should not be imported because traffic operates on the right side of the road. This is a critical eligibility check for Japanese-market vehicles, which are usually right-hand drive. Liberia's Ministry of Commerce also publishes an import process for new and used cars that includes business, invoice, tax-clearance and title documentation.",
    planningSteps: [
      {
        title: "Check manufacture age and steering configuration",
        detail:
          "The Ministry of Transport regulation states a ten-year maximum age and directs dealers not to import right-hand-drive vehicles. Confirm the current application of the regulation with Transport and Customs before any purchase; do not assume a Japanese RHD car can be converted after arrival.",
      },
      {
        title: "Confirm whether the importer is a private buyer or dealer",
        detail:
          "The Ministry of Commerce's published service requires a valid business registration certificate and tax-clearance documentation for its import process, and a Ministry of Transport dealership certificate for businesses selling used or new cars. Confirm which process applies to the buyer.",
      },
      {
        title: "Prepare title, invoice and commercial papers",
        detail:
          "The Ministry's list includes a proforma or final invoice, packing list, tax-clearance certificate, car title certificate, broker/employee identification and completed INF/IPD form. Ask the Ministry or clearing agent to confirm the current submission format.",
      },
      {
        title: "Complete customs, inspection and registration",
        detail:
          "Confirm the customs tariff/valuation, port process, vehicle inspection, insurance and Ministry of Transport registration before shipment. The import approval/service process should be resolved before the vehicle is loaded in Japan.",
      },
    ],
    logisticsSummary:
      "State the intended Liberian port and final city, and confirm who handles customs clearance, document presentation, inspection, Ministry of Transport registration and local delivery. A freight quote does not override the RHD restriction or ten-year rule and must not be presented as proof of import eligibility.",
    localChecks: [
      "Check the ten-year manufacture-age condition stated in the Ministry of Transport regulation before purchase.",
      "Treat a Japanese right-hand-drive vehicle as restricted unless the competent Liberian authorities provide written approval for the exact vehicle.",
      "Confirm whether the Ministry of Commerce business-registration and tax-clearance process applies to the importer.",
      "Prepare the title, invoice, packing list, dealership certificate where applicable and INF/IPD documentation.",
    ],
    costFactors: [
      "Vehicle purchase, auction/agent charges, inspection and Japanese export documents.",
      "Ocean freight, marine insurance and destination port/terminal charges.",
      "Liberia customs valuation, duties/taxes, broker and any Ministry/technical inspection costs.",
      "Transport Ministry dealership/registration processes, insurance, storage and local delivery.",
    ],
    faqs: [
      {
        question: "Can a Japanese right-hand-drive car be imported to Liberia?",
        answer:
          "Liberia's Ministry of Transport administrative regulation says dealers should not import right-hand-drive vehicles because traffic operates on the right. Obtain written confirmation from Transport and Customs before selecting a Japanese vehicle.",
      },
      {
        question: "What is Liberia's used-vehicle age requirement?",
        answer:
          "The Ministry of Transport regulation states that a used vehicle imported into Liberia must not be older than ten years. Confirm the manufacture-year calculation and current application with the authorities.",
      },
      {
        question: "Does a car dealer need a special document?",
        answer:
          "The Ministry of Commerce lists a Ministry of Transport Car Dealership Certificate for businesses engaging in new and used vehicle sales, alongside business registration and tax-clearance documents.",
      },
      {
        question: "Which papers are needed for the Liberia car import process?",
        answer:
          "The Ministry of Commerce lists invoice, packing list, tax-clearance certificate, car title, broker/employee identification and an INF/IPD form. Confirm the latest submission rules for the importer category.",
      },
    ],
    enquiryNote:
      "For Liberia, provide manufacture year, steering side, importer type and intended port. A Japanese RHD vehicle must not be quoted as importable until the Transport Ministry and Customs confirm the legal route in writing.",
  },

  seychelles: {
    pageHeading: "Import Japanese Cars to Seychelles: Permit and RHD Rules",
    searchThemes: [
      "Japanese used cars in Seychelles",
      "import used car from Japan Seychelles",
      "Seychelles vehicle import permit right hand drive",
      "Seychelles SRC used vehicle import taxes",
      "Seychelles vehicle import returning resident age limit",
    ],
    marketOverview:
      "Seychelles Revenue Commission states that all motor vehicles imported into Seychelles must be right-hand drive and require an import permit before arrival. The Trade Portal lists second-hand vehicles and left-hand-drive vehicles among restricted goods requiring approval through the Import and Export Permit Unit. A separate concession for returning graduates or residents has strict conditions, including a three-year vehicle-age limit, passenger-use classification, one vehicle and a six-month import window after taking residency.",
    planningSteps: [
      {
        title: "Confirm right-hand drive and permit approval",
        detail:
          "The SRC states that all imported motor vehicles must be right-hand drive and require an import permit before arrival. Obtain the permit through the Ministry of Finance, Trade and Investment process and confirm that the particular Japanese used vehicle and importer are eligible.",
      },
      {
        title: "Check the buyer's import category",
        detail:
          "Determine whether the buyer is a general importer or applying under the returning graduate/resident provisions. The latter route has specific eligibility and timing conditions; it is not a general waiver of vehicle permits, taxes or registration requirements.",
      },
      {
        title: "Apply the resident concession only if eligible",
        detail:
          "SRC describes a vehicle no older than three years, passenger use under HS 8703, one vehicle for an eligible person aged 18 or older, and import within six months of taking residency. The vehicle must be registered in the importer's name and cannot be sold/transferred for two years. Confirm the live requirements before purchase.",
      },
      {
        title: "Prepare customs valuation and registration records",
        detail:
          "Prepare the Japanese export certificate, original registration, invoice, bill of lading, permit and identity/residence documents. SRC says returning graduate/resident used vehicles are valued on net book value and that applicable duties/levies remain payable; obtain the exact customs assessment.",
      },
    ],
    logisticsSummary:
      "Confirm the destination port and the permit approval before the vehicle arrives. The Seychelles permit is not merely a post-arrival registration document: SRC says it is required prior to arrival. Keep the permit, bill of lading, export certificate, invoice and vehicle identity records together and confirm local inspection, customs and Seychelles Licensing Authority registration.",
    localChecks: [
      "The vehicle must be right-hand drive and an import permit must be obtained before arrival, according to SRC.",
      "Check whether second-hand vehicle approval is required from the Permit Unit and any additional agency decision.",
      "For a returning graduate/resident concession, verify the three-year age limit, six-month window, one-vehicle rule and two-year no-transfer restriction.",
      "Confirm customs net-book valuation, duties and levies, inspection, insurance and local registration separately.",
    ],
    costFactors: [
      "Japanese vehicle price, inspection/auction fees, export certificate and Japan-side transport.",
      "Ocean freight, marine insurance, Seychelles port and handling charges.",
      "Import-permit processing, SRC customs valuation, duties/levies and clearing agent.",
      "Inspection, insurance, registration, storage and local delivery.",
    ],
    faqs: [
      {
        question: "Can I import a left-hand-drive vehicle to Seychelles?",
        answer:
          "SRC states that all motor vehicles imported into Seychelles must be right-hand drive. Do not purchase a left-hand-drive vehicle for ordinary import without a specific written exception.",
      },
      {
        question: "Do I need a permit before the vehicle arrives?",
        answer:
          "Yes. SRC says an import permit is required prior to arrival, and the Trade Portal lists second-hand vehicles among restricted goods handled through the Import and Export Permit Unit.",
      },
      {
        question: "What is the returning-resident vehicle concession?",
        answer:
          "SRC describes a limited route for eligible returning graduates or residents: the vehicle must not be older than three years, must be a passenger-use vehicle, and must be imported within six months of taking residency. One vehicle is allowed and it cannot be transferred for two years.",
      },
      {
        question: "Are returning residents exempt from vehicle taxes?",
        answer:
          "No. SRC says there is no concession on the applicable vehicle duties and levies under this route; it also describes net-book-value customs valuation. Obtain a current written assessment.",
      },
    ],
    enquiryNote:
      "For Seychelles, include importer status, right-hand-drive confirmation, manufacture year, intended port and permit status. Do not book shipment until the Import Permit Unit has approved the specific second-hand vehicle.",
  },

  madagascar: {
    pageHeading: "Import Japanese Cars to Madagascar: CIVIO and Customs",
    searchThemes: [
      "Japanese used cars in Madagascar",
      "import vehicle from Japan to Madagascar",
      "Madagascar CIVIO used car inspection GasyNet",
      "Madagascar customs vehicle BSC certificate",
      "shipping used cars to Toamasina Madagascar",
    ],
    marketOverview:
      "Madagascar's Directorate General of Customs publishes a dedicated procedure for importing used vehicles. For covered used passenger-vehicle categories, the process includes a BSC (Bordereau de Suivi de Cargaison) and a CIVIO identification check managed through GasyNet. Customs lists the original registration document, bill of lading or air waybill, import information form and importer identity/residence evidence among the required papers. The Customs FAQ also says vehicles over eight years old are treated as eight years old for customs valuation; this is a valuation rule, not a statement that older vehicles are automatically prohibited.",
    planningSteps: [
      {
        title: "Confirm the vehicle category and CIVIO requirement",
        detail:
          "Customs says used passenger vehicles in categories B, C, D and E (except diplomatic imports) are subject to the CIVIO process. Confirm the category and whether any additional approval or exemption applies to the specific vehicle before purchase.",
      },
      {
        title: "Obtain the BSC and prepare original documents",
        detail:
          "Arrange the cargo tracking document through the designated BSC system. For a used vehicle, Customs lists the completed import information form, original registration card, bill of lading or air waybill, recent JIRAMA bill and national ID/passport/residence evidence.",
      },
      {
        title: "Complete physical identification through GasyNet",
        detail:
          "Submit the CIVIO identification request to GasyNet with the required papers. Customs says the inspection acceptability report is issued within three days after physical identification of the vehicle. Ensure the chassis and registration details match before the inspection.",
      },
      {
        title: "Obtain the customs valuation and tax assessment",
        detail:
          "Customs states that vehicles over eight years are considered as eight years for customs value determination. This does not remove the need to check import eligibility, technical conditions or other documents. Have the broker confirm HS classification, duty/tax and the GasyNet service charge for the exact vehicle.",
      },
    ],
    logisticsSummary:
      "Identify the Malagasy discharge port and the final inland location before buying. The BSC, bill of lading, original registration and CIVIO appointment must be coordinated with the shipping arrival. Budget for GasyNet physical identification, customs declaration, duties/taxes, port handling, storage and local registration separately from Japanese purchase and freight charges.",
    localChecks: [
      "Confirm whether the used vehicle is in a category subject to CIVIO and whether any diplomatic or other exception applies.",
      "Arrange the BSC and prepare the original Japanese registration card, bill of lading, import form and identity/residence papers.",
      "Book GasyNet physical identification and obtain the inspection acceptability report before customs declaration is completed.",
      "Do not misread the over-eight-year valuation cap as an age-based import permission or ban; confirm admissibility separately.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent fees, export documentation and Japan-side movement.",
      "Ocean freight, insurance, BSC/cargo-tracking and port handling.",
      "GasyNet CIVIO identification service, customs valuation, duties/taxes and broker charges.",
      "Port storage, technical/roadworthiness requirements, registration and inland delivery.",
    ],
    faqs: [
      {
        question: "What is CIVIO for Madagascar vehicle imports?",
        answer:
          "CIVIO is the identification-control process Customs applies to specified used passenger-vehicle categories. The request is made through GasyNet and includes a physical identification inspection before the customs process is completed.",
      },
      {
        question: "Which documents does Madagascar Customs request for a used vehicle?",
        answer:
          "Customs lists an import information form, original registration card, bill of lading or air waybill, recent JIRAMA bill and importer identity/residence documents. It also requires the applicable BSC and CIVIO steps.",
      },
      {
        question: "Does Madagascar ban all cars older than eight years?",
        answer:
          "The Customs FAQ says vehicles over eight years are considered as eight years old for customs valuation. That is not the same as an import-age permission or prohibition; confirm the separate admissibility rules for the vehicle.",
      },
      {
        question: "How long does the CIVIO inspection take?",
        answer:
          "Madagascar Customs says the inspection acceptability report is issued within three days after the vehicle has been physically identified. Appointment availability and port/storage timing should be confirmed with GasyNet.",
      },
    ],
    enquiryNote:
      "For Madagascar, provide the vehicle category, manufacture year, original registration status, intended port and BSC/CIVIO status. The customs valuation note for vehicles over eight years must not be treated as proof of import eligibility.",
  },

  "papua-new-guinea": {
    pageHeading: "Import Japanese Cars to Papua New Guinea: Customs Guide",
    searchThemes: [
      "Japanese used cars in Papua New Guinea",
      "import car from Japan to Papua New Guinea",
      "PNG Customs used vehicle import requirements",
      "Papua New Guinea motor vehicle import quarantine inspection",
      "shipping Japanese cars to Port Moresby Lae",
    ],
    marketOverview:
      "Papua New Guinea's Customs Service explains a detailed used-vehicle import process and warns that duty, taxes and fees can materially increase the original purchase cost. Customs requires a licensed customs broker to lodge the import declaration and classifies vehicles by tariff and detailed tariff specification code, including model, engine size and year. The Road Transport Authority says new and used vehicles can be imported if they meet applicable standards, safety and emissions requirements and have acceptable proof of age and entitlement.",
    planningSteps: [
      {
        title: "Screen the vehicle against road-transport standards",
        detail:
          "PNG's Road Transport Authority says new and used vehicles may be imported if they meet standards, safety and emissions requirements and the importer can provide acceptable proof of age, entitlement and compliance. Confirm the exact model and category with RTA before purchase.",
      },
      {
        title: "Appoint a licensed PNG customs broker",
        detail:
          "PNG Customs says a licensed customs broker is legally required to act for the importer. The broker will prepare the Import Declaration/SAD with accurate importer/TIN, vehicle description, quantity, value and origin details.",
      },
      {
        title: "Confirm tariff specification and assess all costs",
        detail:
          "PNG Customs uses a tariff code and detailed Tariff Specification Code to classify the vehicle. Confirm the correct make/model, engine size, year, customs value and current duty/tax assessment with the broker; do not rely on old online duty percentages.",
      },
      {
        title: "Plan quarantine, safety and registration after release",
        detail:
          "PNG Customs identifies quarantine inspection/clearance, safety inspection and sticker, and Motor Vehicle Insurance Limited registration as post-duty steps. Arrange the correct certificates and transport to the licensing office before the vehicle arrives.",
      },
    ],
    logisticsSummary:
      "Name Port Moresby, Lae or the actual destination port and final delivery location on the enquiry. PNG Customs warns that a vehicle left uncleared at a customs wharf for over 30 days may be forfeited to the State to recover costs. Make sure the broker, quarantine inspection, safety inspection and payment arrangements are in place before arrival; the quote must identify port and inland transport responsibilities.",
    localChecks: [
      "Obtain RTA confirmation of the applicable standards, safety/emissions and proof-of-age requirements for the exact vehicle.",
      "Engage a licensed PNG customs broker before purchase and agree who lodges the SAD/import declaration.",
      "Confirm the current tariff specification code, duties, taxes and fees using the vehicle's exact model, engine and year.",
      "Plan quarantine clearance, safety inspection/sticker and MVIL registration; avoid the 30-day uncleared-wharf forfeiture risk.",
    ],
    costFactors: [
      "Japanese vehicle price, inspection/auction charges, export certificate and Japan-side inland transport.",
      "Ocean freight, marine insurance, destination port handling and storage.",
      "Customs broker, PNG tariff/duty/tax assessment, quarantine inspection and safety compliance.",
      "MVIL insurance/registration, local licensing and delivery to the final province or town.",
    ],
    faqs: [
      {
        question: "Can used Japanese vehicles be imported into Papua New Guinea?",
        answer:
          "PNG's Road Transport Authority says new and used vehicles can be imported if they meet applicable standards, safety and emissions requirements and have acceptable proof of age and entitlement. Confirm the exact vehicle with RTA before purchase.",
      },
      {
        question: "Do I need a customs broker in PNG?",
        answer:
          "Yes. PNG Customs says a licensed customs broker is legally required to prepare and lodge the import declaration on the importer's behalf.",
      },
      {
        question: "How long can a vehicle remain uncleared at a PNG customs wharf?",
        answer:
          "PNG Customs warns that a vehicle left uncleared for over 30 days may be forfeited to the State to recover costs. Arrange the broker, funds and inspection steps before arrival.",
      },
      {
        question: "Which steps follow customs duty payment?",
        answer:
          "PNG Customs lists quarantine inspection and clearance, safety inspection/sticker and MVIL registration among the steps before the vehicle can be put on the road.",
      },
    ],
    enquiryNote:
      "For Papua New Guinea, provide the exact model/engine/year, proof-of-age availability, intended port and final province. A quote should identify the PNG licensed broker, quarantine, safety inspection and MVIL registration responsibilities.",
  },

  "solomon-islands": {
    pageHeading: "Import Japanese Cars to Solomon Islands: Customs and Biosecurity",
    searchThemes: [
      "Japanese used cars Solomon Islands",
      "import used cars from Japan to Honiara",
      "Solomon Islands Customs vehicle import declaration",
      "Solomon Islands biosecurity used vehicle cleaning",
      "Solomon Islands vehicle import duty tariff",
    ],
    marketOverview:
      "Solomon Islands uses a customs declaration and risk-based inspection process administered by the Customs and Excise Division of the Ministry of Finance and Treasury. The Customs service describes vetting of the Single Administrative Document (SAD), document checks, cargo examination and tariff valuation. Biosecurity Solomon Islands specifically includes new and used vehicles in its transport/machinery category and says they will be inspected on arrival for soil, plant material and other biosecurity risk material. The public official material reviewed does not establish a universal vehicle-age limit, so buyers should obtain a vehicle-specific ruling.",
    planningSteps: [
      {
        title: "Check vehicle admissibility and registration before purchase",
        detail:
          "Ask Customs and the transport/licensing authority to confirm the current requirements for the exact make, model, manufacture year, steering configuration and importer. Do not rely on an unofficial general age statement where no current national age schedule is published in the sources reviewed.",
      },
      {
        title: "Clean the vehicle before export",
        detail:
          "Biosecurity Solomon Islands says used and new vehicles are inspected on arrival and must be free of soil, plant material and other biosecurity risk material. Clean the underbody, wheel arches, engine bay, cabin and cargo areas in Japan and retain any accredited cleanliness certificate.",
      },
      {
        title: "Prepare the customs SAD and valuation file",
        detail:
          "The Solomon Islands Customs service says importers lodge a Single Administrative Document, which is vetted and may be subject to document checks or physical examination. Prepare invoice, bill of lading, ownership/export certificate, vehicle specifications and value evidence for tariff classification.",
      },
      {
        title: "Complete biosecurity, customs and local registration",
        detail:
          "After arrival, coordinate Biosecurity inspection, Customs tariff assessment and payment, cargo release and road registration. Do not assume that the biosecurity certificate or customs release alone provides permission to use the vehicle on public roads.",
      },
    ],
    logisticsSummary:
      "Confirm whether Honiara or another port is the actual discharge point and whether inter-island movement is needed. The buyer and carrier should arrange vehicle cleaning before departure, and the importer should be ready for arrival inspection and Customs SAD assessment. A quote must separate sea freight, biosecurity, customs duty/tax, port handling and final island delivery.",
    localChecks: [
      "Obtain current written Customs/transport confirmation of admissibility, steering side, age and registration for the exact vehicle.",
      "Clean the vehicle in Japan so it is free of soil, plant matter and biosecurity risk material; retain cleanliness evidence.",
      "Prepare the SAD declaration, invoice, bill of lading, ownership/export record and accurate vehicle tariff specifications.",
      "Coordinate arrival biosecurity inspection, customs valuation/release and road registration as separate steps.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent charges, export papers and pre-export cleaning.",
      "Ocean freight, marine insurance, port and any inter-island handling.",
      "Customs valuation, applicable tariff duty/taxes, broker fees and biosecurity inspection.",
      "Storage, road inspection/registration, insurance and local delivery.",
    ],
    faqs: [
      {
        question: "Is there a universal age limit for importing used cars to Solomon Islands?",
        answer:
          "The current public official material reviewed for this page does not establish one universal vehicle-age cap. Ask Customs and the responsible transport authority to confirm the rule for the exact vehicle before purchase.",
      },
      {
        question: "Do used cars need biosecurity inspection?",
        answer:
          "Yes. Biosecurity Solomon Islands includes used vehicles in its transport/machinery category and says vehicles are inspected on arrival and must be free of soil, plant material and other biosecurity risk material.",
      },
      {
        question: "What customs document is used for vehicle import?",
        answer:
          "The Customs service describes a Single Administrative Document (SAD) that is vetted, assessed and may be referred for document checks or physical cargo examination. A broker can confirm the current vehicle-specific supporting papers.",
      },
      {
        question: "Does customs release automatically register the vehicle?",
        answer:
          "No. Biosecurity clearance, customs release and road-vehicle inspection/registration are separate. Confirm the local licensing steps after customs release.",
      },
    ],
    enquiryNote:
      "For Solomon Islands, provide intended port/island, vehicle specifications, steering side and manufacture year. We will require current authority confirmation of admissibility and plan the Japan-side cleaning and arrival biosecurity inspection.",
  },

  vanuatu: {
    pageHeading: "Import Japanese Cars to Vanuatu: Steering Permit and Customs",
    searchThemes: [
      "Japanese used cars in Vanuatu",
      "import used car from Japan Vanuatu",
      "Vanuatu right hand drive import permit",
      "Vanuatu Import of Motor Vehicles Control Act",
      "Vanuatu Customs vehicle registration within one month",
    ],
    marketOverview:
      "Vanuatu's Customs (Prohibited Import) Regulations list right-hand-drive motor vehicles as restricted goods under the Import of Motor Vehicles (Control) Act, with a permit or licence required from the responsible authority. The Vanuatu Trade Portal describes a permit process for a right-hand-drive vehicle under the Act, handled through the Ministry of Infrastructure and Public Utilities. Customs also states that imported vehicles must be registered no later than one month after importation. A Japanese RHD vehicle should therefore never be shipped on the assumption that arrival alone makes it admissible.",
    planningSteps: [
      {
        title: "Obtain the right-hand-drive vehicle permit",
        detail:
          "The prohibited-import regulations classify RHD vehicles as restricted and the Trade Portal describes an approval-letter process under the Import of Motor Vehicles (Control) Act 1993. Obtain written approval from the authority responsible for the current procedure before purchase and loading.",
      },
      {
        title: "Confirm the applicable steering and vehicle class",
        detail:
          "Provide the exact make, model, manufacture year, chassis and intended use to the authority. Confirm whether the permit covers this particular vehicle and whether any technical or registration condition applies; do not assume a general enquiry or dealer licence is sufficient.",
      },
      {
        title: "Prepare Customs and ownership documents",
        detail:
          "Keep the original Japanese export/deregistration certificate, purchase invoice, bill of lading, chassis details and import permit ready. Ask Customs for the current tariff classification, valuation, duty/tax and any inspection or quarantine requirements.",
      },
      {
        title: "Register within the one-month period",
        detail:
          "Vanuatu Customs states that all imported vehicles are to be registered no later than one month after importation. Coordinate customs release, first-registration form, release form and any applicable dealer-bond process before the vehicle arrives.",
      },
    ],
    logisticsSummary:
      "State Port Vila or the confirmed discharge port and the final island on the enquiry. The vehicle permit should be approved before loading; after arrival, Customs registration has a one-month deadline. Clarify port handling, customs clearance, inspection, registration, inter-island shipping and local delivery rather than treating a Japan freight quote as a complete landed service.",
    localChecks: [
      "RHD vehicles are listed as restricted goods; obtain the current permit/approval under the Import of Motor Vehicles (Control) Act before shipment.",
      "Confirm the responsible authority and the exact vehicle-specific permit conditions through the current Trade Portal process.",
      "Prepare export certificate, invoice, bill of lading, chassis details and permit for Customs assessment.",
      "Register the imported vehicle no later than one month after importation and complete the prescribed release process.",
    ],
    costFactors: [
      "Japanese vehicle purchase, auction/agent fees, export documents and pre-shipment preparation.",
      "Ocean freight, marine insurance, Port Vila/other port handling and inter-island movement.",
      "RHD permit/approval process, customs valuation, duty/taxes, broker and inspection.",
      "Registration, road tax, insurance, storage and final delivery.",
    ],
    faqs: [
      {
        question: "Can I import a right-hand-drive Japanese vehicle to Vanuatu?",
        answer:
          "RHD motor vehicles are listed as restricted goods under the Import of Motor Vehicles (Control) Act. The Trade Portal describes a permit process, so obtain written approval for the exact vehicle before purchase or shipment.",
      },
      {
        question: "Which authority handles the RHD permit?",
        answer:
          "The current Trade Portal procedure identifies the Ministry of Infrastructure and Public Utilities as the responsible entity for the approval-letter process. Confirm the live application route with the Ministry before loading.",
      },
      {
        question: "How soon must an imported vehicle be registered?",
        answer:
          "Vanuatu Customs states that imported vehicles must be registered no later than one month after the date of importation. Arrange forms and customs release in advance.",
      },
      {
        question: "Does the import permit include customs clearance?",
        answer:
          "No. The vehicle import permit, customs declaration/duty assessment, release from customs control and local registration are separate steps.",
      },
    ],
    enquiryNote:
      "For Vanuatu, provide the steering side, vehicle details, intended port/island and permit status. We will not present an RHD Japanese vehicle as shipment-ready until the competent Ministry has approved the required permit.",
  },

  barbados: {
    pageHeading: "Import Japanese Cars to Barbados: Age and Roadworthiness",
    searchThemes: [
      "Japanese used cars in Barbados",
      "import used car from Japan to Barbados",
      "Barbados used car four year 50000 km import",
      "Barbados used vehicle import licence right hand drive",
      "Barbados Licensing Authority imported vehicle registration",
    ],
    marketOverview:
      "Barbados Government Information Service has published vehicle-import guidance stating that used or reconditioned motor cars must be right-hand drive, no more than four years old and have an odometer reading below 50,000 kilometres to qualify for an import licence. The published notice also requires a roadworthiness certificate from an authorised agent in the country of origin and new tyres for reconditioned vehicles. Because the detailed notice is older, buyers should obtain a current written confirmation from the Department of Commerce and Consumer Affairs before relying on the age, mileage, warranty or licence conditions.",
    planningSteps: [
      {
        title: "Check age, mileage and steering side",
        detail:
          "The Government Information Service's published guidance states that used/reconditioned vehicles should be right-hand drive, no more than four years old and below 50,000 km. Verify the current age calculation and odometer evidence with Commerce before paying for a vehicle.",
      },
      {
        title: "Confirm the current import licence and warranty rules",
        detail:
          "Ask the Department of Commerce and Consumer Affairs to confirm the current licence process, any required warranty for a reconditioned vehicle and the applicable documents. Do not rely on the historic advisory alone if a later order has changed the conditions.",
      },
      {
        title: "Arrange origin-country roadworthiness evidence",
        detail:
          "The published Barbados guidance calls for a roadworthiness certificate from an authorised agent in the country of origin and specifies new tyres for reconditioned vehicles. Confirm the current accepted Japanese inspection provider and certificate format.",
      },
      {
        title: "Complete customs and road registration",
        detail:
          "The Barbados Licensing Authority lists Customs Declaration C63, insurance, weight certificate, examiner's certificate, registration/renewal form and a Good Vehicle Permit among its requirements for vehicle registration. Confirm the exact current requirements for a used import.",
      },
    ],
    logisticsSummary:
      "Confirm the port of entry and final delivery location in Barbados. The buyer should have the import licence and inspection evidence resolved before shipment; after arrival, customs declaration and Licensing Authority examination/registration are separate steps. The quotation should identify ocean freight, port handling, customs duty/taxes, examination, insurance and registration inclusions.",
    localChecks: [
      "Obtain current written confirmation of the published four-year, 50,000-km and RHD criteria before purchase.",
      "Confirm the applicable import licence and any current warranty or condition requirements with the Department of Commerce and Consumer Affairs.",
      "Arrange the accepted origin-country roadworthiness certificate and verify tyre/condition requirements.",
      "Prepare C63 customs declaration, insurance, weight and examiner certificates, registration form and Good Vehicle Permit as currently required.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent fees, inspection certificate, tyres if required and export preparation.",
      "Ocean freight, marine insurance and Barbados port/terminal handling.",
      "Import licence, customs value/duties/taxes, broker and examination/weight certificate.",
      "Insurance, registration, Good Vehicle Permit, storage and local delivery.",
    ],
    faqs: [
      {
        question: "What is Barbados's published age and mileage limit for used/reconditioned cars?",
        answer:
          "A Barbados Government Information Service notice states that used/reconditioned cars should be no more than four years old and below 50,000 km. Confirm the current rule with Commerce before relying on this older published guidance.",
      },
      {
        question: "Can I import a left-hand-drive Japanese vehicle?",
        answer:
          "The published Barbados guidance specifies right-hand-drive vehicles. Confirm the current import licence conditions before considering any other steering configuration.",
      },
      {
        question: "Is an inspection certificate required from Japan?",
        answer:
          "The Barbados government advisory states that used/reconditioned vehicles should be accompanied by a roadworthiness certificate from an authorised agent in the country of origin. Confirm which Japanese inspection agents and certificate formats are currently accepted.",
      },
      {
        question: "What is needed to register an imported vehicle in Barbados?",
        answer:
          "The Barbados Licensing Authority lists C63 customs declaration, insurance, weight certificate, examiner's certificate, registration form and a Good Vehicle Permit among its requirements. Check the live list before arrival.",
      },
    ],
    enquiryNote:
      "For Barbados, include manufacture year, verified odometer reading, steering side, Japanese roadworthiness certificate and import-licence confirmation. We will not proceed on the basis of a historic four-year/50,000-km advisory without current authority confirmation.",
  },

  cameroon: {
    pageHeading: "Import Japanese Cars to Cameroon: 2026 Customs Procedure",
    searchThemes: [
      "Japanese used cars in Cameroon",
      "import used cars from Japan to Cameroon",
      "Cameroon 2026 used car import procedure PIVO CIVIC",
      "Cameroon used vehicle import declaration e-GUCE",
      "Douala Kribi car import customs Cameroon",
    ],
    marketOverview:
      "Cameroon's Single Window for Foreign Trade (GUCE) published a March 2026 notice explaining that the former PIVO procedure for used-vehicle imports has been abolished following Finance Law No. 2024/013 of 23 December 2024. The revised process requires importer registration, a mandate to an Authorised Customs Broker (CDA), a prior Import Declaration (DI) through e-GUCE/e-FORCE, a BESC cargo tracking note from CNCC, vehicle shipping details and CIVIC identification before customs declaration in CAMCIS. This change is important: old guides that still instruct buyers to start with PIVO may be obsolete.",
    planningSteps: [
      {
        title: "Register the importer and appoint an authorised broker",
        detail:
          "The March 2026 GUCE notice describes registration in the importers' file or a special authorisation from the Ministry of Trade as a prerequisite. A mandate to an Authorised Customs Broker is required for the new electronic process; confirm the importer's eligibility before the car is bought.",
      },
      {
        title: "File the Import Declaration before customs clearance",
        detail:
          "GUCE says the Import Declaration (DI) is filed through e-FORCE on e-GUCE and must precede customs-clearance formalities. The older PIVO route is stated to have been abolished; do not follow outdated instructions or start a shipment without the current DI reference.",
      },
      {
        title: "Obtain BESC and complete CIVIC identification steps",
        detail:
          "The current notice describes a BESC from the Conseil National des Chargeurs du Cameroun (CNCC), followed by shipping-form details and a CIVIC vehicle-identification request. Customs declaration is then processed in CAMCIS after the CIVIC is obtained.",
      },
      {
        title: "Assess current vehicle taxes and release costs",
        detail:
          "The GUCE notice states a per-vehicle verification tax and describes 2026 Finance Law excise bands for older vehicles. Confirm the amount, vehicle category, age calculation, applicable duty, port costs and current law with the CDA and Customs before bidding; do not use stale tax calculators.",
      },
    ],
    logisticsSummary:
      "Confirm whether the shipment will be discharged at Douala or Kribi and which CDA will handle the e-GUCE/CAMCIS process. The new sequence requires documents and references to be ready before the customs declaration stage; missing a prior DI can expose an importer to a substantial penalty. Keep BESC, CIVIC, shipping form, invoice, chassis details and broker mandate aligned before the vehicle leaves Japan.",
    localChecks: [
      "Do not use old PIVO instructions; GUCE's March 2026 notice states that the PIVO procedure has been abolished.",
      "Register the importer, appoint an Authorised Customs Broker and obtain the prior DI through e-FORCE/e-GUCE.",
      "Obtain the BESC and complete vehicle shipping-form/CIVIC identification steps before CAMCIS customs declaration.",
      "Confirm current verification tax, age-based excise, customs value and all port/clearance costs with the CDA.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent fees, export certificate and transport to the Japanese port.",
      "Ocean freight, marine insurance, BESC/cargo tracking and Douala/Kribi port handling.",
      "CDA services, import verification/CIVIC charge, customs value, duties and 2026 excise where applicable.",
      "Storage, customs examination, registration and onward delivery to the final city.",
    ],
    faqs: [
      {
        question: "Is the old PIVO process still used for used-car imports to Cameroon?",
        answer:
          "GUCE's March 2026 notice says the PIVO procedure has been abolished. It describes a revised process involving importer registration, an authorised broker, prior DI, BESC, CIVIC and CAMCIS customs declaration.",
      },
      {
        question: "What must happen before the vehicle is shipped?",
        answer:
          "The importer should confirm registration, appoint a CDA and complete the required prior import-declaration and shipping-reference sequence. Ask the broker to confirm the live order of DI, BESC and CIVIC steps for the actual shipment.",
      },
      {
        question: "What is CIVIC in the Cameroon used-vehicle process?",
        answer:
          "CIVIC is the vehicle-identification control request described in GUCE's revised procedure. The shipping form includes the vehicle make/model and chassis details; the customs declaration follows after the CIVIC step.",
      },
      {
        question: "Are older vehicles subject to different taxes?",
        answer:
          "GUCE's March 2026 notice describes progressive excise bands for older vehicles. The exact application depends on age, class and current Finance Law provisions, so obtain a vehicle-specific tax assessment from the CDA and Customs.",
      },
    ],
    enquiryNote:
      "For Cameroon, provide importer registration status, CDA details, vehicle category/year/chassis and intended port (Douala or Kribi). A freight quote is not a customs clearance promise; the revised DI/BESC/CIVIC sequence must be completed under current GUCE instructions.",
  },

  lesotho: {
    pageHeading: "Import Japanese Cars to Lesotho: Import Permit and Customs",
    searchThemes: [
      "Japanese used cars in Lesotho",
      "import cars from Japan to Lesotho",
      "Lesotho vehicle import permit LNSW",
      "Lesotho imported motor vehicle customs VAT clearance",
      "Lesotho vehicle police Interpol clearance registration",
    ],
    marketOverview:
      "Lesotho's Trade Information Portal describes an import permit for vehicles issued by the Ministry of Trade and Industry through the Lesotho National Single Window (LNSW). The listed documents include a proforma invoice, trader/importer registration and an affidavit for used goods; non-Lesotho citizens are also asked for a resident or work permit. The Government of Lesotho separately lists the original export/cancellation certificate, certified bill of lading and bill of entry, state-warehouse customs letter, Interpol/CID clearance and Revenue Services Lesotho VAT/customs-duty clearance for imported motor-vehicle services.",
    planningSteps: [
      {
        title: "Register and apply for the vehicle import permit",
        detail:
          "Use the LNSW procedure administered by the Ministry of Trade and Industry. The Trade Portal lists a proforma invoice, vehicle-importer trader licence/registration and an affidavit for used goods; non-Lesotho citizens are asked for a resident/work permit. Confirm current eligibility and submission requirements before purchase.",
      },
      {
        title: "Confirm import route and vehicle admissibility",
        detail:
          "Lesotho's public service information identifies customs and registration evidence but does not establish a single current used-vehicle age rule in the material reviewed. Ask the Ministry, Revenue Services Lesotho and the transport authority to confirm manufacture age, steering, safety and vehicle category for the exact unit.",
      },
      {
        title: "Prepare customs and border/transit documentation",
        detail:
          "Coordinate the Japanese export certificate, certified bill of lading, customs bill of entry, proforma/final invoice and relevant regional transit records with the clearing agent. Keep chassis/VIN and engine particulars consistent across every document.",
      },
      {
        title: "Complete Lesotho police, tax and registration clearance",
        detail:
          "The Government of Lesotho lists Interpol and CID clearance, a state-warehouse customs letter and RSL VAT/customs-duty clearance among the imported-vehicle requirements. Confirm the sequence and current fees with the relevant offices before delivery.",
      },
    ],
    logisticsSummary:
      "Lesotho is landlocked and the carrier route may involve a South African seaport and a cross-border road movement. Confirm the port, transit documents, border formalities and final delivery town with the carrier and clearing agent. A permit, customs release, police clearance, VAT/duty payment and vehicle registration are distinct stages and should be separately identified in the quotation.",
    localChecks: [
      "Apply through the LNSW vehicle import permit procedure and confirm the Ministry of Trade and Industry's current requirements.",
      "For non-Lesotho citizens, confirm the resident/work permit document requirement and provide the used-goods affidavit where applicable.",
      "Obtain written confirmation of age, steering and technical eligibility for the exact vehicle; do not invent a universal age limit.",
      "Arrange certified export, bill-of-entry, RSL tax/customs, state-warehouse and Interpol/CID clearance documents before registration.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent charges, inspection and export/deregistration documents.",
      "Ocean freight, marine insurance, South African port handling and cross-border transit to Lesotho.",
      "Lesotho vehicle import permit, customs valuation, RSL duties/VAT, broker and border charges.",
      "State-warehouse letter, Interpol/CID clearance, inspection, registration and final inland delivery.",
    ],
    faqs: [
      {
        question: "Does Lesotho require a vehicle import permit?",
        answer:
          "The Lesotho Trade Information Portal describes an import permit for vehicles through the Ministry of Trade and Industry using the Lesotho National Single Window. Confirm current documents and importer eligibility before purchase.",
      },
      {
        question: "What documents are required for a non-Lesotho citizen?",
        answer:
          "The Trade Portal lists a resident or work permit for non-Lesotho citizens importing vehicle(s), along with the proforma invoice, trader/importer registration and used-goods affidavit as applicable.",
      },
      {
        question: "What is Lesotho's used-car age limit?",
        answer:
          "The public official material reviewed for this page does not establish a single current age limit. Ask the Ministry of Trade and Industry and Revenue Services Lesotho for a written vehicle-specific eligibility decision.",
      },
      {
        question: "What is needed after customs clearance?",
        answer:
          "The Government of Lesotho lists an original export/cancellation certificate, certified bill of lading and bill of entry, state-warehouse customs letter, Interpol/CID clearance and RSL VAT/customs-duty clearance for imported-vehicle services. Confirm the live sequence with the authority.",
      },
    ],
    enquiryNote:
      "For Lesotho, provide importer nationality/residence status, LNSW permit status, manufacture year, steering side, intended port and final town. We will keep regional transit, RSL duties/VAT, police clearance and registration distinct from the Japan export quote.",
  },
};
