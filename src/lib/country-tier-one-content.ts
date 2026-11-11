/**
 * Additional, manually curated content for Wazir Trading's first-priority
 * destination pages. Search themes are editorial planning data and are not
 * rendered as hidden keyword text. Regulatory summaries link to primary
 * authorities and must be rechecked before any vehicle-specific commitment.
 */
export interface CountryTierOneStep {
  title: string;
  detail: string;
}

export interface CountryTierOneFaq {
  question: string;
  answer: string;
}

export interface CountryPriorityContent {
  pageHeading: string;
  /** Search-intent themes for editorial planning; never emit as keyword lists in HTML. */
  searchThemes: string[];
  marketOverview: string;
  planningSteps: CountryTierOneStep[];
  logisticsSummary: string;
  localChecks: string[];
  costFactors: string[];
  faqs: CountryTierOneFaq[];
  enquiryNote: string;
}

export type CountryTierOneContent = CountryPriorityContent;

export const COUNTRY_TIER_ONE_CONTENT: Record<string, CountryTierOneContent> = {
  kenya: {
    pageHeading: "Import Japanese Used Cars to Kenya: Rules and Checklist",
    searchThemes: [
      "Japanese used cars in Kenya",
      "import cars from Japan to Kenya",
      "Japan car import requirements Kenya",
      "used car shipping to Mombasa",
      "Kenya vehicle import age and inspection rules",
    ],
    marketOverview:
      "Kenya-bound used vehicles need an eligibility check before a buyer pays for a car. Kenya Revenue Authority guidance ties the age test to the year of first registration, requires right-hand drive and calls for roadworthiness inspection by a KEBS-appointed inspection agent in the country of export. These are practical go/no-go checks, not paperwork to leave until the vehicle reaches the port.",
    planningSteps: [
      {
        title: "Confirm the importer and intended destination",
        detail:
          "Identify the importer of record, the vehicle category, the intended port and the final delivery town. Ask a licensed clearing agent to confirm the current requirements for that buyer and vehicle class.",
      },
      {
        title: "Check first-registration age and steering position",
        detail:
          "KRA states that the vehicle must be less than eight years old from its year of first registration and must be right-hand drive. Compare the Japanese export and registration records with the vehicle details; do not calculate eligibility from a model-year label alone.",
      },
      {
        title: "Arrange the required export-country inspection",
        detail:
          "Confirm the KEBS-appointed inspection route and required roadworthiness evidence before loading. Make sure the chassis/VIN and vehicle particulars on the inspection record match the export certificate, invoice and shipping documents.",
      },
      {
        title: "Obtain a vehicle-specific landed-cost assessment",
        detail:
          "Have the clearing agent assess the correct customs value and current duties, taxes, levies and fees. Keep the Japan purchase/export amount, ocean freight and insurance separate from Kenya-side charges.",
      },
    ],
    logisticsSummary:
      "Mombasa is the principal seaport commonly used for Kenya-bound sea cargo, but the actual shipping service, discharge port, transit arrangement and inland delivery must be confirmed for each order. A port-to-port quotation is not the same as customs clearance or delivery to Nairobi or another inland destination. Ask the exporter to state exactly where its responsibility ends.",
    localChecks: [
      "Use the year of first registration for the KRA age test and verify the documentary evidence before bidding.",
      "Confirm right-hand drive and vehicle-category eligibility before purchase; do not assume a steering conversion or exception will be accepted.",
      "Confirm the live KEBS inspection and conformity procedure for the shipment date and preserve the original certificate and matching vehicle records.",
      "Ask the clearing agent to verify customs valuation and the applicable tax calculation using the current KRA method.",
    ],
    costFactors: [
      "Japanese auction or dealer price, auction/agent fees and inland movement to the export port.",
      "Ocean freight, marine insurance and any carrier or documentation charges.",
      "Kenya customs value and the duties, excise, VAT, levies or other charges applicable to the vehicle's classification.",
      "KEBS inspection/conformity costs, port handling, storage, customs broker, registration and inland transport.",
    ],
    faqs: [
      {
        question: "How is the vehicle-age requirement checked in Kenya?",
        answer:
          "KRA describes the limit as less than eight years from the year of first registration. Verify the original registration/export documents for the selected vehicle and ask the clearing agent to confirm the calculation before purchase.",
      },
      {
        question: "Can I import a left-hand-drive vehicle into Kenya?",
        answer:
          "KRA's published motor-vehicle procedure states that imported vehicles must be right-hand drive. Do not buy a left-hand-drive vehicle on the assumption that it can be converted or exempted.",
      },
      {
        question: "Does a Japanese vehicle need inspection before shipment?",
        answer:
          "KRA says the vehicle is subject to roadworthiness inspection by a KEBS-appointed inspection agent in the country of export. Confirm the current agent, booking and certificate process before loading.",
      },
      {
        question: "Can Wazir Trading quote a final delivered price to Kenya?",
        answer:
          "A useful quotation needs the vehicle, importer, destination and service scope. Customs valuation, local taxes, inspection, port charges and inland delivery should be itemised or clearly identified as excluded until confirmed.",
      },
    ],
    enquiryNote:
      "For a Kenya enquiry, include the first-registration date, right-hand-drive confirmation, vehicle reference, intended port and final delivery town. A quote remains subject to current KEBS and KRA requirements.",
  },

  tanzania: {
    pageHeading: "Import Japanese Used Cars to Tanzania: TBS and Customs Guide",
    searchThemes: [
      "Japanese used cars in Tanzania",
      "import cars from Japan to Tanzania",
      "Tanzania TBS used vehicle inspection",
      "Tanzania car import customs clearance",
      "used car shipping to Dar es Salaam",
    ],
    marketOverview:
      "Tanzania's used-vehicle process places particular importance on the Tanzania Bureau of Standards (TBS) roadworthiness and conformity process. TBS publishes a 2026 destination-inspection procedure for imported used motor vehicles, while the Tanzania Trade Portal describes the roadworthiness-certificate workflow and supporting paperwork. Buyers should establish which inspection route applies to the specific consignment rather than assuming an older PVoC process is still the only route.",
    planningSteps: [
      {
        title: "Identify the vehicle and importer category",
        detail:
          "Record the vehicle type, year, chassis number, engine details, intended port and final destination. Use the exact category when asking TBS, TRA or a licensed clearing agent about the current process.",
      },
      {
        title: "Confirm the TBS inspection pathway",
        detail:
          "Ask whether the shipment must arrive with a valid Certificate of Conformity under PVoC or whether destination inspection applies. TBS's published 2026 procedure specifically addresses destination inspection for used motor vehicles.",
      },
      {
        title: "Prepare matching inspection and shipping documents",
        detail:
          "The Trade Portal lists documents including the bill of lading, commercial invoice, certificate of roadworthiness, vehicle inspection report and export certificate. Confirm the current list and online verification steps with TBS before dispatch.",
      },
      {
        title: "Obtain a current TRA cost assessment",
        detail:
          "Ask a clearing agent to check the tariff classification, customs value, applicable duties and taxes, registration and port charges for the selected vehicle. Do not reuse a past importer's assessment as a current quote.",
      },
    ],
    logisticsSummary:
      "State the intended Tanzanian port and final delivery location on the enquiry. Ocean freight to a port does not by itself include TBS clearance, customs release, port storage or onward delivery. Confirm the inspection location and sequence early enough to avoid arrival-related delays.",
    localChecks: [
      "TBS's 2026 page explains when destination inspection applies, including consignments that arrive without a Certificate of Conformity under PVoC.",
      "The Tanzania Trade Portal describes the TBS roadworthiness-certificate process; check the live required-document list and online steps.",
      "Ensure the chassis number and vehicle particulars match across the export certificate, invoice, inspection record and bill of lading.",
      "Ask TRA or a licensed clearing agent to confirm the current age-related charges, customs valuation and tax treatment for the vehicle category; do not assume a universal age cap.",
    ],
    costFactors: [
      "Vehicle purchase price, Japan-side auction/agent charges and delivery to the export port.",
      "Ocean freight, insurance and shipping documentation.",
      "TBS conformity, PVoC or destination-inspection charges that apply to the actual inspection pathway.",
      "TRA customs duties and taxes, port/terminal fees, clearing-agent services, registration and onward transport.",
    ],
    faqs: [
      {
        question: "Does every used vehicle follow the same TBS inspection route?",
        answer:
          "No. TBS distinguishes PVoC conformity and destination inspection, and its published 2026 procedure addresses used-vehicle destination inspection. Confirm the route for the specific shipment and whether a valid Certificate of Conformity will accompany it.",
      },
      {
        question: "Which documents should a Tanzania vehicle importer prepare?",
        answer:
          "The Tanzania Trade Portal lists items such as the bill of lading, commercial invoice, certificate of roadworthiness, inspection report and vehicle export certificate. Ask TBS to confirm the current requirements and verification method.",
      },
      {
        question: "Is there one universal vehicle-age limit for Tanzania?",
        answer:
          "Do not rely on an unsourced single age limit. Ask TBS and TRA to confirm current rules and any age-related charges for the exact vehicle category and import date.",
      },
      {
        question: "Does a shipping quote include delivery inside Tanzania?",
        answer:
          "Not necessarily. Ask whether the price ends at the seaport or includes customs clearance, TBS inspection, port charges and onward transport to the final town.",
      },
    ],
    enquiryNote:
      "For Tanzania, provide the vehicle details, intended port and final destination, and state whether TBS has confirmed the inspection route. Any export quotation must distinguish freight from destination inspection and customs costs.",
  },

  "united-arab-emirates": {
    pageHeading: "Japanese Used Cars for the UAE: Import and Registration Guide",
    searchThemes: [
      "Japanese used cars UAE",
      "import used cars from Japan to UAE",
      "Japanese car export to Dubai",
      "used vehicle registration UAE MOIAT product status",
      "Japan car shipping to Abu Dhabi",
    ],
    marketOverview:
      "In the United Arab Emirates, customs release and road-registration eligibility are separate questions. The Ministry of Industry and Advanced Technology (MOIAT) offers a Product Status Statement service for imported used vehicles to confirm whether a vehicle is eligible for registration in the UAE traffic system. The relevant emirate, vehicle identity and condition should be considered before the buyer commits to a shipment.",
    planningSteps: [
      {
        title: "Choose the emirate and intended registration route",
        detail:
          "Ask the buyer to identify the emirate where the vehicle is expected to be registered and the intended port or point of entry. Do not assume that a process or quotation for one emirate automatically covers another.",
      },
      {
        title: "Review vehicle identity and condition",
        detail:
          "Check the unified vehicle identification number, chassis/VIN, export certificate, invoice, ownership history and condition report. Resolve any mismatch before booking freight.",
      },
      {
        title: "Check MOIAT product status and local authority requirements",
        detail:
          "MOIAT's published Product Status Statement service is specifically for imported used vehicles and confirms eligibility for registration in the traffic system. Its listed requirements include a UAE ID and the vehicle's unified identification number. Confirm the buyer's ability to complete the process and any emirate-specific requirements.",
      },
      {
        title: "Separate import, registration and delivery costs",
        detail:
          "Obtain a current customs assessment and separately identify conformity/product-status, inspection, registration, port, insurance and local delivery charges. A customs release should not be presented as a registration guarantee.",
      },
    ],
    logisticsSummary:
      "The UAE enquiry should name the intended emirate, port and final registration location. Confirm whether the proposed service covers port-to-port freight only, customs support, vehicle-status documentation or local delivery. Wazir Trading should not promise a carrier route or registration outcome before those details are verified.",
    localChecks: [
      "Confirm the intended emirate and the authority responsible for the buyer's registration process.",
      "Check that the unified vehicle identification number and export documents are available and consistent.",
      "Review accident, flood, salvage, structural-modification and steering history with the competent authority before purchase.",
      "Confirm that the buyer can provide the documents required for the MOIAT Product Status Statement; do not equate a customs release with traffic-system registration.",
    ],
    costFactors: [
      "Vehicle purchase, Japan-side inspection/auction fees and export preparation.",
      "Freight, marine insurance and shipping documentation to the confirmed UAE destination.",
      "Customs valuation, duty, VAT and any other charges assessed for the vehicle and importer.",
      "MOIAT product-status, inspection, registration, port handling, broker and local delivery charges where applicable.",
    ],
    faqs: [
      {
        question: "Does UAE customs clearance mean the used vehicle can be registered?",
        answer:
          "Not automatically. MOIAT provides a Product Status Statement service to confirm whether an imported used vehicle is eligible for registration in the UAE traffic system. Confirm both customs and registration requirements.",
      },
      {
        question: "What information is needed for the MOIAT Product Status Statement?",
        answer:
          "MOIAT's service page lists a UAE ID and the vehicle's unified identification number among the requirements. The buyer should confirm the current service requirements and ability to apply before shipment.",
      },
      {
        question: "Should I choose the port before requesting a Japanese vehicle quote?",
        answer:
          "Yes. Provide the intended port and emirate, because freight, destination handling, customs and the registration pathway are not interchangeable between locations.",
      },
      {
        question: "Can Wazir Trading guarantee registration in the UAE?",
        answer:
          "No. Registration eligibility is determined by the competent UAE authorities. Wazir Trading can review the vehicle information for an export enquiry, but buyers must confirm product status and registration requirements with the authorities.",
      },
    ],
    enquiryNote:
      "For a UAE enquiry, specify the emirate, intended port, registration destination and vehicle unified identification number where available. Any export quote is separate from MOIAT product status, customs, registration and local delivery.",
  },

  "new-zealand": {
    pageHeading: "Import a Japanese Used Vehicle to New Zealand",
    searchThemes: [
      "import Japanese used cars to New Zealand",
      "Japanese imports New Zealand compliance",
      "NZTA used vehicle entry certification Japan",
      "MPI Japanese vehicle cleaning import",
      "used car shipping Japan to New Zealand",
    ],
    marketOverview:
      "New Zealand has a multi-agency import process. NZ Transport Agency Waka Kotahi (NZTA) assesses vehicle standards and entry certification; the Ministry for Primary Industries (MPI) manages biosecurity; and New Zealand Customs Service manages customs entry and applicable charges. A vehicle should be screened against compliance requirements before purchase because an overseas registration or Japanese export certificate does not automatically establish New Zealand road-registration eligibility.",
    planningSteps: [
      {
        title: "Ask an entry certifier to screen the exact vehicle",
        detail:
          "Provide the make, model code, manufacture details, chassis/VIN and Japanese documentation. NZTA requires evidence for applicable ownership, emissions, frontal-impact, fuel-consumption, overall and braking/ESC standards. Confirm compliance before paying for the vehicle.",
      },
      {
        title: "Secure the Japanese ownership and export records",
        detail:
          "Keep the original documentation that proves ownership and the vehicle's registration/deregistration history. NZTA explains that evidence requirements vary by vehicle and standard; a missing emissions code or compliance detail may require additional evidence.",
      },
      {
        title: "Arrange MPI-approved cleaning in Japan",
        detail:
          "MPI states that used passenger vehicles, trucks, buses, campervans and caravans imported from Japan must have cleaning carried out by an MPI-approved system in Japan. Confirm the approved provider, treatment record and current biosecurity conditions before loading.",
      },
      {
        title: "Plan border inspection and entry certification",
        detail:
          "Budget for MPI arrival checks, NZTA border inspection and entry certification, any required repairs or modifications, customs clearance and final registration. Do not assume that passing one agency's checks completes the others.",
      },
    ],
    logisticsSummary:
      "State the intended New Zealand port and who will arrange MPI-approved cleaning, biosecurity documentation, border handling and onward movement. Confirm whether freight is containerised or RoRo and whether the quotation includes port or transitional-facility charges. Treatment, inspection, storage and transport costs may be separate.",
    localChecks: [
      "Obtain a vehicle-specific standards assessment from a suitable NZTA entry certifier before purchase.",
      "Verify the Japanese export and prior-registration records; keep originals where NZTA or the certifier requires them.",
      "Use an MPI-approved cleaning system in Japan and retain the treatment/cleaning evidence.",
      "Check odometer integrity and the current Customs import rules as well as NZTA and MPI requirements.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent charges, inspection and inland delivery to the export port.",
      "Ocean freight, insurance and any shipping-document or destination handling costs.",
      "MPI approved-system cleaning/treatment, arrival biosecurity inspection and any re-cleaning or storage.",
      "Customs duty/GST where applicable, NZTA entry certification, compliance work, registration and local delivery.",
    ],
    faqs: [
      {
        question: "Can any Japanese used car be registered in New Zealand?",
        answer:
          "No. The exact vehicle must meet applicable NZTA standards and pass the required border and entry-certification process. Ask an entry certifier to assess the vehicle before purchase.",
      },
      {
        question: "What standards does NZTA ask importers to prove?",
        answer:
          "Depending on the vehicle, NZTA lists proof of ownership, emissions, frontal-impact, fuel-consumption, overall standards and braking requirements such as electronic stability control. Requirements vary by vehicle class and date.",
      },
      {
        question: "Does a used vehicle from Japan need MPI cleaning?",
        answer:
          "MPI states that used passenger vehicles and several other vehicle classes from Japan must be cleaned by an MPI-approved system in Japan. Confirm the applicable system and treatment evidence for the planned shipment.",
      },
      {
        question: "Does paying customs duty guarantee road registration?",
        answer:
          "No. Customs clearance, MPI biosecurity clearance and NZTA vehicle entry certification are distinct processes. All applicable steps must be completed before road use.",
      },
    ],
    enquiryNote:
      "Include the exact model code, year, chassis/VIN, Japanese ownership/export documents and intended port. A quote should identify whether MPI cleaning, border charges, entry certification and compliance work are included or excluded.",
  },

  "south-africa": {
    pageHeading: "South Africa: Check Used-Vehicle Import Eligibility First",
    searchThemes: [
      "import used car from Japan to South Africa permit",
      "South Africa ITAC used vehicle import permit",
      "NRCS letter of authority imported vehicle",
      "returning resident vehicle import South Africa",
      "South Africa used passenger vehicle import rules",
    ],
    marketOverview:
      "South Africa is not an open market for ordinary used-vehicle imports. The South African Government states that a second-hand vehicle may only be imported with a permit, and permits are limited to specifically defined circumstances. ITAC's published guidelines state that permits are not issued for ordinary commercial or resale imports outside those defined exceptions. This page is designed to help a buyer identify eligibility before paying for a vehicle, not to suggest that a Japanese used car can be imported freely for retail sale.",
    planningSteps: [
      {
        title: "Establish whether the importer fits a permitted category",
        detail:
          "The government describes defined circumstances that include qualifying returning South African nationals and immigrants. Other exceptions may apply to specified specialist, vintage, inherited or specially designed vehicles. The buyer must establish the actual legal basis with ITAC.",
      },
      {
        title: "Obtain ITAC guidance and the correct import permit",
        detail:
          "Use ITAC's current import-control guidance and application forms, including IE462 where applicable. Do not purchase or ship a vehicle on the assumption that an application will be approved.",
      },
      {
        title: "Confirm the NRCS Letter of Authority",
        detail:
          "The South African Government and NRCS state that a Letter of Authority is required for vehicle imports. Confirm the vehicle's conformity requirements and obtain the necessary written clearance before shipment.",
      },
      {
        title: "Only then request an export quotation",
        detail:
          "Provide the permit/approval status, vehicle category, intended port and importer details. The export quotation must remain conditional on the applicable permits and standards approvals being valid for that vehicle.",
      },
    ],
    logisticsSummary:
      "Do not book a vehicle or sea freight for South Africa until the importer has written confirmation that the relevant ITAC permit and NRCS Letter of Authority can be obtained for the exact vehicle. Wazir Trading should not describe an ordinary used-car shipment as an available retail route or promise customs clearance.",
    localChecks: [
      "Confirm the importer's eligibility with ITAC before selecting or paying for a vehicle.",
      "Check whether the specific case falls within a defined personal, immigrant, returning-resident, vintage or specialist exception.",
      "Confirm the IE462 or other applicable ITAC permit and the NRCS Letter of Authority for the exact vehicle.",
      "Do not assume that an ordinary commercial/resale shipment is permitted; ITAC's guidelines restrict permits to defined circumstances.",
    ],
    costFactors: [
      "ITAC permit, NRCS Letter of Authority and any specialist compliance work that applies to the permitted case.",
      "Vehicle price, export documentation, inspection and Japan-side handling.",
      "Freight, marine insurance, destination port handling and any storage caused by incomplete approvals.",
      "SARS customs duty, taxes, clearing-agent fees, registration and local delivery only after eligibility is confirmed.",
    ],
    faqs: [
      {
        question: "Can a South African buyer freely import a used car from Japan?",
        answer:
          "No. The South African Government says a second-hand vehicle may only be imported with a permit, and permits are issued in defined circumstances. The buyer should obtain ITAC guidance before purchasing.",
      },
      {
        question: "Can a dealer import Japanese used cars for ordinary resale?",
        answer:
          "Do not assume so. ITAC's used-vehicle guidelines state that permits are not issued for commercial/resale imports outside the defined circumstances. Confirm the current rule directly with ITAC.",
      },
      {
        question: "Is an NRCS Letter of Authority also required?",
        answer:
          "The South African Government and NRCS publish a Letter of Authority requirement for imported vehicles. Confirm the exact application and conformity path before shipment.",
      },
      {
        question: "When should I ask Wazir Trading for a quotation?",
        answer:
          "First establish that the importer and vehicle qualify and confirm the required approvals with ITAC and NRCS. A vehicle export quote must not be mistaken for import permission.",
      },
    ],
    enquiryNote:
      "Before requesting a vehicle quotation for South Africa, first confirm the importer's eligibility and the applicable ITAC permit and NRCS Letter of Authority. We cannot represent a general used-car resale import as permitted.",
  },

  "sri-lanka": {
    pageHeading: "Import Japanese Vehicles to Sri Lanka: Eligibility and Customs",
    searchThemes: [
      "import Japanese used cars to Sri Lanka",
      "Sri Lanka vehicle import permit Japan",
      "Sri Lanka motor vehicle import regulations",
      "Japanese car import inspection Sri Lanka",
      "Sri Lanka used vehicle customs clearance",
    ],
    marketOverview:
      "Sri Lanka's vehicle-import controls have been amended through Gazette regulations and operational instructions. The correct route depends on the vehicle category, importer, date and permit conditions. Buyers should confirm the live position with the Department of Import and Export Control and Sri Lanka Customs before selecting a vehicle. A general guide, earlier permit or old duty calculator is not an import authorization.",
    planningSteps: [
      {
        title: "Identify the permitted vehicle category and importer",
        detail:
          "Confirm the buyer's status, vehicle class, age/manufacture conditions and applicable permit or licence route with the Department of Import and Export Control. Do this before bidding or paying a deposit.",
      },
      {
        title: "Check the latest Gazette and operational instructions",
        detail:
          "Use the latest vehicle-import regulations and notices, not an old summary. Ask the authority to confirm which Gazette conditions apply to the planned purchase and the intended date of import.",
      },
      {
        title: "Confirm export inspection and document verification",
        detail:
          "Establish which pre-export inspection certificate is required for the selected category and how the export documentation will be verified for Customs release. Ensure all vehicle identifiers match.",
      },
      {
        title: "Obtain a vehicle-specific Customs assessment",
        detail:
          "Ask Sri Lanka Customs or a licensed clearing agent to determine the current HS classification, customs value, duties, taxes, fees and registration requirements for the exact vehicle.",
      },
    ],
    logisticsSummary:
      "Provide the intended Sri Lankan port and whether the vehicle will be collected there or moved inland. Confirm that any required permit and inspection documentation will be ready before the vehicle is loaded; port storage and additional handling may arise if the document set is incomplete.",
    localChecks: [
      "Check the latest permit/licence eligibility for the buyer and exact vehicle category with the Department of Import and Export Control.",
      "Review current Gazette regulations and operational instructions; do not reuse a historical import window or tax table.",
      "Confirm the applicable pre-export inspection certificate and verification workflow for a vehicle sourced in Japan.",
      "Ask Customs or a licensed clearing agent to validate classification, valuation and all destination-side charges before agreeing a landed-cost figure.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent fees, inspection and inland movement to the export port.",
      "Ocean freight, insurance, port handling and shipping documentation.",
      "Current customs valuation and the duties, taxes, levies or other charges applicable to the approved vehicle category.",
      "Pre-export inspection, document verification, customs broker, terminal, registration and onward transport.",
    ],
    faqs: [
      {
        question: "Can anyone import any used vehicle into Sri Lanka?",
        answer:
          "No. The applicable permit route and vehicle conditions depend on current regulations and the buyer's category. Confirm eligibility with the Department of Import and Export Control before purchase.",
      },
      {
        question: "Are older Sri Lanka vehicle-import guides still reliable?",
        answer:
          "Not necessarily. Vehicle-import regulations and operational instructions have changed. Check the latest Gazette and official notices for the shipment date rather than relying on old articles or tax tables.",
      },
      {
        question: "Is a Japan-side inspection certificate required?",
        answer:
          "The applicable inspection and document-verification process depends on the vehicle category and current instructions. Confirm the required certificate and approved inspection route before shipping.",
      },
      {
        question: "Can Wazir Trading include Sri Lankan duties in a quote?",
        answer:
          "The export quotation can identify Japan-side costs and freight. Sri Lanka duties and taxes should be calculated separately by Customs or a qualified local clearing agent using the approved vehicle's current classification and value.",
      },
    ],
    enquiryNote:
      "For Sri Lanka, include the buyer/importer category, intended port, vehicle class and any permit or inspection approval already obtained. A quotation is subject to the current import-control route.",
  },

  pakistan: {
    pageHeading: "Import Japanese Vehicles to Pakistan: 2026 Rules and Costs",
    searchThemes: [
      "import Japanese used cars to Pakistan",
      "Pakistan commercial used car import 2026",
      "Japan car import duties Pakistan",
      "Pakistan transfer of residence vehicle import",
      "Japanese car export to Karachi Pakistan",
    ],
    marketOverview:
      "Pakistan's used-vehicle rules distinguish commercial imports from the schemes available to eligible overseas Pakistanis. The policy changed during 2025 and 2026: the personal-baggage scheme was removed in January 2026, commercial used-vehicle imports were addressed by SRO 1895(I)/2025, and a 30% regulatory duty for covered commercial imports was notified in June 2026. Because these controls are shipment-date sensitive, a buyer must confirm the current operative policy and standards before committing funds.",
    planningSteps: [
      {
        title: "Identify the legal import route",
        detail:
          "Establish whether the enquiry is a commercial import or an eligible gift/transfer-of-residence case. SRO 61(I)/2026 removed the personal-baggage scheme and amended the remaining overseas-Pakistani procedures. Do not use old pages that still describe three unchanged schemes.",
      },
      {
        title: "Check current age and vehicle-standard conditions",
        detail:
          "SRO 1895(I)/2025 stated a less-than-five-year condition for covered commercial used vehicles through 30 June 2026, after which the vehicle-age limit may be removed, subject to environmental, safety and quality standards, testing and certification prescribed by the relevant authorities. Obtain written shipment-date confirmation of the operational requirements.",
      },
      {
        title: "Confirm regulatory duty and the full tariff calculation",
        detail:
          "SRO 1065(I)/2026 dated 30 June 2026 sets a 30% regulatory duty on covered commercial used-vehicle imports in addition to the regulatory duty under SRO 1064(I)/2026. Ask a licensed customs professional to assess the exact PCT heading, customs value and every applicable charge; do not add rates from an outdated calculator.",
      },
      {
        title: "Prepare the correct overseas-scheme documents if applicable",
        detail:
          "For a gift or transfer-of-residence route, verify the importer's eligibility, residence evidence, prior-import timing and vehicle ownership documents under the amended Appendix-E procedure. The retained schemes have specific non-transferability and timing conditions.",
      },
    ],
    logisticsSummary:
      "The enquiry must identify the importer category and intended Pakistani port. Keep the Japan export price and freight separate from Pakistan regulatory duty, customs duty, taxes, port charges and inland delivery. Do not present an indicative export quote as a confirmed landed price until the current FBR/Commerce route and tariff have been checked.",
    localChecks: [
      "Do not rely on legacy references to the personal-baggage scheme; SRO 61(I)/2026 removed it and amended the retained gift and transfer-of-residence procedures.",
      "For covered commercial imports, check the current operational status of the post-30 June 2026 age provision and the environmental, safety and quality testing/certification requirements.",
      "Check the 30% regulatory duty notified by SRO 1065(I)/2026 together with the additional regulatory duty under SRO 1064(I)/2026 and other applicable duties; do not assume 30% is the total tax.",
      "Ask a licensed customs professional to confirm the exact PCT classification, customs value, importer eligibility and current SROs on the planned import date.",
    ],
    costFactors: [
      "Japanese vehicle purchase price, auction/agent charges, export handling and inland transport in Japan.",
      "Freight and marine insurance to the confirmed Pakistani port.",
      "Commercial regulatory duties, customs duty, sales tax, income tax and any other applicable charges under the current tariff and SROs.",
      "Required testing/certification, port/terminal, customs broker, registration and local delivery costs.",
    ],
    faqs: [
      {
        question: "Is the personal-baggage scheme still available in Pakistan?",
        answer:
          "SRO 61(I)/2026 dated 15 January 2026 removed the personal-baggage scheme and amended the procedures for the retained gift and transfer-of-residence schemes. Confirm the current procedure with the Ministry of Commerce and FBR.",
      },
      {
        question: "Was the age limit for commercial used vehicles removed after June 2026?",
        answer:
          "SRO 1895(I)/2025 says the age limit may be removed after 30 June 2026, but commercial imports remain subject to prescribed environmental, safety and quality standards, testing and certification. Confirm the operative implementation before buying or shipping.",
      },
      {
        question: "Is the 30% regulatory duty the full tax on a commercial used car?",
        answer:
          "No. SRO 1065(I)/2026 describes a 30% regulatory duty in addition to the regulatory duty under SRO 1064(I)/2026. Customs duty, taxes and other charges may also apply. Obtain a vehicle-specific assessment.",
      },
      {
        question: "Can Wazir Trading confirm the final landed price in Pakistan?",
        answer:
          "Wazir Trading can prepare an export-side quotation based on the vehicle and shipping scope. The importer should separately confirm the current eligibility and complete tax assessment with FBR or a licensed customs professional.",
      },
    ],
    enquiryNote:
      "For Pakistan, identify the legal import route (commercial, gift or transfer of residence), importer eligibility, vehicle details and intended port. We will keep Japan export/freight costs separate from destination taxes and duties pending current customs confirmation.",
  },

  uganda: {
    pageHeading: "Japanese Used Cars for Uganda: Import and Tax Checklist",
    searchThemes: [
      "Japanese used cars in Uganda",
      "import cars from Japan to Uganda",
      "Uganda used vehicle import taxes",
      "URA used motor vehicle valuation database",
      "car shipping from Japan to Kampala",
    ],
    marketOverview:
      "Uganda's vehicle-import cost planning depends on the vehicle's classification, age and the Uganda Revenue Authority's valuation method. URA states that its used-motor-vehicle valuation database is used as the basis for customs valuation rather than relying only on the seller's invoice. Its published environmental-levy table also distinguishes passenger vehicles by age band, so the age of the exact vehicle can materially change whether an import is viable and what it costs.",
    planningSteps: [
      {
        title: "Check age and vehicle classification first",
        detail:
          "For passenger/saloon vehicles, URA's published table lists a 50% environmental levy for vehicles aged 9–15 years and states that vehicles over 15 years are not allowed. Goods vehicles are treated differently by weight category. Confirm the exact classification and age calculation with URA before purchase.",
      },
      {
        title: "Check the current URA valuation database",
        detail:
          "URA explains that it uses a used-motor-vehicle valuation database as the basis for customs value. Retrieve the current database for the relevant period and ask a clearing agent to assess the exact make, model, engine and year.",
      },
      {
        title: "Plan the transit route to the final destination",
        detail:
          "Uganda is landlocked. Specify the final town and have the logistics provider confirm the port, transit corridor, border procedures, transit documentation and inland delivery charges in writing.",
      },
      {
        title: "Separate customs, environmental levy and local costs",
        detail:
          "Request a vehicle-specific assessment covering customs duty, taxes, environmental levy, inspection, transit, port, clearing and registration. Do not use a prior vehicle's valuation as a substitute for a current calculation.",
      },
    ],
    logisticsSummary:
      "For Uganda, a seaport quotation is only one part of the route. Ask whether the shipping proposal covers transit through the selected corridor, customs transit bonds or documentation, border handling and inland delivery to the buyer's town. Every transit leg and excluded destination charge should be clear before payment.",
    localChecks: [
      "For passenger/saloon vehicles, check URA's published 9–15 year levy band and the stated restriction for vehicles above 15 years; do not apply those figures blindly to goods vehicles.",
      "Use the latest URA used-motor-vehicle valuation database, not only the Japanese invoice, for the customs estimate.",
      "Confirm gross vehicle weight and the correct vehicle category where a commercial vehicle is involved.",
      "Get the final destination and transit corridor included in writing; Uganda has no seaport and inland delivery is a separate cost.",
    ],
    costFactors: [
      "Japanese vehicle price, inspection/auction charges and inland transport to the export port.",
      "Ocean freight and insurance to the confirmed regional port of entry.",
      "URA customs valuation, import duty, taxes and age/category-dependent environmental levy.",
      "Port and transit charges, customs bond or agent fees where applicable, border handling, registration and inland transport to Uganda.",
    ],
    faqs: [
      {
        question: "Does Uganda charge an age-related environmental levy on used cars?",
        answer:
          "URA's published table lists a 50% environmental levy for passenger/saloon vehicles aged 9–15 years and states that passenger/saloon vehicles above 15 years are not allowed. Other goods-vehicle categories have different treatment, so confirm the classification.",
      },
      {
        question: "Does Uganda Customs use the vehicle invoice as its only valuation?",
        answer:
          "URA says its used-motor-vehicle valuation database is the basis for customs valuation, rather than the invoice price alone. Check the database for the current period and the exact vehicle details.",
      },
      {
        question: "Does a quote to the seaport include delivery to Kampala?",
        answer:
          "Not necessarily. Uganda is landlocked, so port-to-port freight, transit handling, border costs and inland delivery should be identified separately in the written quotation.",
      },
      {
        question: "Can I estimate tax from another Japanese car with the same make?",
        answer:
          "Use the exact model, year, engine, category and current URA valuation data. A similar make or seller invoice is not enough to establish the customs value or total tax.",
      },
    ],
    enquiryNote:
      "For Uganda, include the final town, vehicle category, year, engine size and intended delivery scope. State clearly whether you need port-to-port freight or a quote that also covers transit and inland movement.",
  },

  nigeria: {
    pageHeading: "Import Japanese Used Cars to Nigeria: Customs and Cost Guide",
    searchThemes: [
      "Japanese used cars in Nigeria",
      "import cars from Japan to Nigeria",
      "Nigeria used car import age limit",
      "Nigeria 2026 vehicle import duty green tax",
      "Japan car shipping to Lagos Nigeria",
    ],
    marketOverview:
      "A Nigerian vehicle-import quotation should be based on the exact tariff classification and current fiscal measures, not a generic percentage copied from an old article. The National Trade Information Portal describes an automobile import procedure and states an age restriction for vehicles based on year of manufacture. Nigeria's 2026 fiscal-policy measures also introduced a green-tax surcharge for motor vehicles with engine capacity of 2,000cc and above, alongside revisions to import-adjustment-tax treatment.",
    planningSteps: [
      {
        title: "Check vehicle age and import eligibility",
        detail:
          "The National Trade Information Portal states that vehicles over 15 years from the year of manufacture are prohibited from import. Verify the manufacture year and the applicable interpretation for the vehicle category with Nigeria Customs before purchase.",
      },
      {
        title: "Confirm the HS code and current fiscal measures",
        detail:
          "Identify whether the vehicle falls under the relevant passenger car, bus or goods-vehicle heading. Check the current Nigeria Customs tariff, import-adjustment taxes and whether the 2026 green-tax surcharge applies, including the 2,000cc threshold stated by the government.",
      },
      {
        title: "Complete the import documentation process",
        detail:
          "Confirm importer registration, any applicable Form M/banking documentation, invoice, bill of lading, valuation evidence and supporting certificates under the current Nigeria Trade Information Portal and Customs process.",
      },
      {
        title: "Get a customs-based estimate before shipment",
        detail:
          "Ask a licensed customs agent to assess the exact year, engine capacity, value, vehicle type and tariff version. Treat any online estimate as provisional until Nigeria Customs assesses the declaration.",
      },
    ],
    logisticsSummary:
      "Name the intended Nigerian seaport and final delivery location. Confirm the carrier, port handling, customs broker, inspection process and inland transport separately. Do not promise a fixed transit time or duty amount until the selected service and live tariff have been checked.",
    localChecks: [
      "The National Trade Information Portal states an age restriction for vehicles over 15 years from manufacture; verify the precise age calculation for the selected category.",
      "Check the 2026 green-tax surcharge for vehicles with engine capacity of 2,000cc and above and the current import-adjustment-tax schedule.",
      "Confirm the HS code, importer and bank/import documentation before the vehicle is shipped.",
      "Do not assume one duty percentage applies to all passenger cars, buses, trucks, engine sizes or model years.",
    ],
    costFactors: [
      "Japanese purchase price, auction/agent charges, export preparation and local movement in Japan.",
      "Ocean freight, marine insurance, shipping documents and destination port costs.",
      "Nigeria Customs valuation, applicable import duty, import-adjustment tax and the 2026 green-tax surcharge where applicable.",
      "Licensed customs broker, examination, terminal/storage, registration and delivery to the final location.",
    ],
    faqs: [
      {
        question: "What is the used-vehicle age restriction stated by Nigeria's trade portal?",
        answer:
          "The National Trade Information Portal states that vehicles over 15 years from the year of manufacture are prohibited from import. Confirm the current rule and calculation with Nigeria Customs for the exact vehicle category.",
      },
      {
        question: "Does Nigeria's 2026 green-tax surcharge affect every Japanese car?",
        answer:
          "The Federal Ministry of Information says the 2026 measure includes a green-tax surcharge for motor vehicles with engine capacities of 2,000cc and above. Check the current tariff and vehicle classification to establish whether it applies.",
      },
      {
        question: "Can I rely on a fixed online import-duty percentage?",
        answer:
          "No. The amount depends on the HS code, vehicle type, engine capacity, valuation and current fiscal measures. Obtain a current assessment from a licensed customs agent and Nigeria Customs.",
      },
      {
        question: "Which documents should be confirmed before shipping?",
        answer:
          "Confirm the current importer/banking process and the required invoice, bill of lading, valuation and supporting certificates through the Nigeria Trade Information Portal and Customs. Requirements can differ by importer and vehicle class.",
      },
    ],
    enquiryNote:
      "For Nigeria, provide the manufacture year, engine capacity, vehicle type, intended port and final delivery location. Any duty or green-tax estimate must be checked against the current Nigeria Customs tariff.",
  },

  jamaica: {
    pageHeading: "Import Japanese Used Cars to Jamaica: Licence and Inspection",
    searchThemes: [
      "Japanese used cars in Jamaica",
      "import used cars from Japan to Jamaica",
      "Jamaica Trade Board vehicle import licence",
      "Japan vehicle pre-shipment inspection Jamaica",
      "Jamaica used car age limit and import duty",
    ],
    marketOverview:
      "Jamaica requires buyers to arrange the appropriate Trade Board licence and vehicle documentation before shipment. For Japan-origin used vehicles, the Trade Board's notice effective 1 June 2026 confirms that pre-shipment inspection is mandatory. The vehicle-age limit depends on the type and class of vehicle, so a single age figure should not be applied to every car, van, bus or truck.",
    planningSteps: [
      {
        title: "Check the correct vehicle-age category",
        detail:
          "Use the Trade Board's current age-limit table for the exact vehicle class and seating/weight category. Returning residents and certain vehicle types may have different treatment, so do not rely on a general six-year rule for every vehicle.",
      },
      {
        title: "Obtain the Trade Board import licence before shipping",
        detail:
          "Jamaica Customs says the required import licence must be obtained from the Trade Board before shipping arrangements are made. Confirm the permit status before the vehicle is loaded in Japan.",
      },
      {
        title: "Arrange mandatory Japan-origin pre-shipment inspection",
        detail:
          "The Trade Board's notice effective 1 June 2026 lists Japan among the designated PSI countries for used vehicles. Obtain the required certificate and ensure the vehicle's identity and ownership details match the export records.",
      },
      {
        title: "Prepare customs and clearance paperwork",
        detail:
          "Jamaica Customs lists documents including the import licence, title/export certificate, bill of lading, supplier invoice, tax-compliance evidence and a broker-prepared declaration. Confirm the current requirements for the importer before dispatch.",
      },
    ],
    logisticsSummary:
      "Identify the intended Jamaican port and the party responsible for import licensing, inspection, customs brokerage and local collection. Make sure the PSI certificate is completed in Japan before shipment; a later verification process is not a substitute for compliance and can create additional expense and delay.",
    localChecks: [
      "Check the current Trade Board age limit for the vehicle's exact category rather than using one age limit for all vehicle types.",
      "Obtain the Trade Board import licence before making shipping arrangements.",
      "Complete Japan-origin PSI and retain the certificate. The June 2026 notice describes a USD 500 verification fee where a required certificate is missing; that fee is a non-compliance consequence, not a standard import charge.",
      "Do not import a damaged or salvaged vehicle without written confirmation; Jamaica Customs states that vehicles considered damaged or salvaged are prohibited.",
    ],
    costFactors: [
      "Japanese vehicle purchase, inspection, auction/agent charges and export preparation.",
      "Ocean freight, insurance, shipping documents and port/terminal handling.",
      "Trade Board licensing and required Japan-origin pre-shipment inspection.",
      "Customs valuation, duties/taxes, licensed broker, inspection/verification where applicable, registration and local delivery.",
    ],
    faqs: [
      {
        question: "Do I need a Jamaica Trade Board licence before the vehicle ships?",
        answer:
          "Jamaica Customs says the required import licence must be obtained before shipping arrangements are made. Confirm the licence for the exact vehicle and importer before booking freight.",
      },
      {
        question: "Is pre-shipment inspection required for used vehicles from Japan?",
        answer:
          "Yes. The Trade Board notice effective 1 June 2026 lists Japan as a designated country for mandatory pre-shipment inspection of used vehicles. Keep the required certificate with the export documents.",
      },
      {
        question: "What happens if a required PSI certificate is missing?",
        answer:
          "The Trade Board notice describes a vehicle-history verification process and a USD 500 fee for non-compliance. This is a consequence for missing documentation, not an ordinary fee that every importer should pay.",
      },
      {
        question: "Is the age limit always six years?",
        answer:
          "No. Jamaica's age-limit table varies by vehicle category and class, and returning residents may have separate provisions. Check the current Trade Board table for the exact vehicle before purchase.",
      },
    ],
    enquiryNote:
      "For Jamaica, include the Trade Board licence status, Japan PSI certificate status, vehicle category, year and intended port. Do not arrange shipment until the applicable licence and pre-shipment inspection documents are complete.",
  },
};
