import type { CountryPriorityContent } from "./country-tier-one-content";

/**
 * Extended, manually curated destination guidance for Tier 2 markets.
 * Search themes are editorial planning data only and are never rendered as
 * hidden keyword text. Verify current authority notices before a quote or
 * shipment-specific recommendation is made.
 */
export const COUNTRY_TIER_TWO_CONTENT: Record<string, CountryPriorityContent> = {
  bangladesh: {
    pageHeading: "Import Japanese Cars to Bangladesh: 2026 Rules and Documents",
    searchThemes: [
      "Japanese used cars in Bangladesh",
      "import Japanese cars to Bangladesh",
      "Bangladesh 2026 vehicle import policy",
      "JAAI certificate Japan car Bangladesh",
      "Bangladesh used car import age and customs",
    ],
    marketOverview:
      "Bangladesh's amended Import Policy Order 2026–2029 is the starting point for any Japanese used-vehicle enquiry. The current order sets a five-year age condition for the covered vehicle headings and gives specific country-of-origin, chassis-age and inspection-certificate rules. Older NBR help pages still reference the 2015–2018 order, so buyers must use the new Ministry of Commerce order and obtain a shipment-date confirmation rather than relying on old FAQ answers.",
    planningSteps: [
      {
        title: "Identify the importer and legal import facility",
        detail:
          "Confirm whether the proposed importer is a commercial importer, a transfer-of-residence applicant or another specifically privileged category. A facility for diplomats or privileged persons is not a general permission for every private buyer.",
      },
      {
        title: "Screen the five-year age and country-of-origin rules",
        detail:
          "The amended 2026–2029 order applies a maximum five-year age condition to covered vehicle headings, calculated from the first day of the year following chassis manufacture. It also requires used vehicles to be sourced from their country of manufacture, subject to the order's narrowly stated evidence conditions.",
      },
      {
        title: "Obtain the Japan-specific JAAI certificate",
        detail:
          "For a vehicle manufactured in Japan, the policy requires a certificate from Japan Auto Appraisal Institute (JAAI) containing the vehicle age, model and chassis number. Check that the certificate and chassis/export documents identify the same vehicle before dispatch.",
      },
      {
        title: "Check technical conditions and customs papers",
        detail:
          "The order includes further conditions such as seat belts, specified transparent glazing and applicable emission-control equipment, and says used electric vehicles cannot be imported. Have the importer or licensed clearing agent confirm the exact current clause, documents and HS classification before purchase.",
      },
    ],
    logisticsSummary:
      "A Bangladesh shipment enquiry should identify the port, importer category and the intended customs-clearing party. The Japanese export certificate, JAAI inspection evidence, invoice, bill of lading and chassis particulars need to agree. Keep the Japan purchase and freight quote separate from Bangladesh customs assessment, port handling and inland delivery; do not book loading until the buyer has confirmed eligibility under the amended order.",
    localChecks: [
      "Use the amended Import Policy Order 2026–2029, not archived 2015–2018 NBR FAQs or old broker articles.",
      "Confirm the five-year age calculation from chassis-manufacture year and the country-of-origin requirement for the selected HS heading.",
      "Obtain a JAAI certificate for Japan-manufactured used vehicles and match its model/chassis information to the export documents.",
      "Confirm the prohibition on used EVs and the relevant safety/emissions/glazing conditions with the competent authority before payment.",
    ],
    costFactors: [
      "Japanese purchase price, auction and appraisal charges, inland delivery and export documentation.",
      "JAAI certificate/inspection, any required technical evidence and Japan-side handling.",
      "Ocean freight, marine insurance and destination port or terminal charges.",
      "Bangladesh customs valuation, applicable duties/taxes, broker fees, registration and inland transport.",
    ],
    faqs: [
      {
        question: "What age limit applies under Bangladesh's 2026–2029 import policy?",
        answer:
          "The amended order states a maximum five-year age condition for the covered vehicle headings. The age is calculated from the first day of the year following chassis manufacture; have the importer confirm the calculation for the exact vehicle.",
      },
      {
        question: "Can a used Japanese car be shipped to Bangladesh through a third country?",
        answer:
          "The amended order generally requires the used vehicle to be imported from its country of manufacture and sets specific evidence conditions. Do not route a Japanese vehicle through another country without written confirmation that the exact case satisfies the policy.",
      },
      {
        question: "Is a JAAI certificate required for a used vehicle from Japan?",
        answer:
          "The current policy specifies a JAAI certificate containing age, model and chassis information for vehicles imported from Japan. Confirm the required original/certified format and timing with the importer and customs authority.",
      },
      {
        question: "Can used electric vehicles be imported under the current order?",
        answer:
          "The amended 2026–2029 order states that used electric vehicles cannot be imported. Confirm the precise vehicle classification with the Ministry of Commerce or Customs before making any commitment.",
      },
    ],
    enquiryNote:
      "For Bangladesh, provide the importer category, chassis-manufacture year, model, chassis number, vehicle type and intended port. Any export quote is conditional on written confirmation that the vehicle meets the amended 2026–2029 policy and required JAAI/technical documents.",
  },

  zambia: {
    pageHeading: "Import Japanese Used Cars to Zambia: Inspection and Duty Guide",
    searchThemes: [
      "Japanese used cars in Zambia",
      "import cars from Japan to Zambia",
      "Zambia ZCSA used vehicle inspection",
      "ZRA used motor vehicle duty rates",
      "ship car from Japan to Zambia",
    ],
    marketOverview:
      "Zambia-bound used vehicles need a pre-shipment roadworthiness check as well as a customs and inland-transit plan. The Zambia Compulsory Standards Agency (ZCSA) publishes the mandatory inspection requirement and appointed-agent information for used vehicles destined for Zambia. Zambia Revenue Authority (ZRA) separately publishes vehicle-specific duty schedules and import valuation guidance, so a freight estimate alone cannot establish the final landed cost.",
    planningSteps: [
      {
        title: "Arrange the ZCSA-appointed inspection in Japan",
        detail:
          "ZCSA lists Japan among the countries where appointed inspection agents operate. Confirm the current approved agency, booking procedure, inspection scope and certificate before the vehicle is loaded; an arrival without the required inspection may trigger a penalty.",
      },
      {
        title: "Confirm the right tariff category and current duty schedule",
        detail:
          "Check the current ZRA used motor vehicle specific-duty schedule for the vehicle type, engine capacity and classification. Passenger cars, commercial vehicles and other categories may have different treatment; do not reuse a prior-year rate sheet.",
      },
      {
        title: "Prepare customs and vehicle registration documents",
        detail:
          "Ask the ZRA clearing agent and Road Transport and Safety Agency (RTSA) to confirm the original invoice, export/deregistration certificate, bill of lading, release order, inspection evidence and any physical vehicle checks needed for clearance and registration.",
      },
      {
        title: "Plan the landlocked transit route",
        detail:
          "Agree the port of discharge, transit corridor, border formalities, transit documents, bond or agent responsibilities and final delivery location. Make sure the quotation states whether it ends at the port, border or the buyer's address in Zambia.",
      },
    ],
    logisticsSummary:
      "Zambia has no seaport, so the buyer needs a combined sea-and-inland route. The proposed port and transit corridor should be confirmed for each shipment, along with who manages customs transit, border handling, ZRA clearance and final delivery. ZCSA inspection in Japan is a separate compliance step and should be completed before dispatch.",
    localChecks: [
      "Use a currently appointed ZCSA inspection provider in Japan and retain the valid certificate with the vehicle/export records.",
      "Check the ZRA specific-duty schedule and customs valuation using the correct engine size, year, vehicle class and tariff code.",
      "Confirm any carbon/emissions-related levy, excise, VAT and other charges from current ZRA rates rather than assuming a single flat duty.",
      "Obtain a route-specific inland quotation that identifies port, transit, border, customs and final-delivery responsibilities.",
    ],
    costFactors: [
      "Vehicle purchase, auction/agent charges, Japanese inspection and movement to the export port.",
      "ZCSA inspection/certificate charges and associated export documentation.",
      "Ocean freight, marine insurance, port handling and transit charges through the selected corridor.",
      "ZRA specific duty, customs value, applicable taxes/levies, broker fees, RTSA checks, registration and inland delivery.",
    ],
    faqs: [
      {
        question: "Does a used car destined for Zambia need inspection in Japan?",
        answer:
          "ZCSA publishes a mandatory pre-shipment inspection programme for used vehicles and lists appointed agents in Japan. Confirm the active agent and certificate requirements before loading.",
      },
      {
        question: "Where can I check Zambia's used-vehicle duty?",
        answer:
          "ZRA publishes used motor vehicle specific-duty rates and applied tax guidance. The exact assessment depends on the vehicle category, engine capacity and current schedule.",
      },
      {
        question: "Does a Japan-to-port shipping quote include delivery to Lusaka?",
        answer:
          "Not necessarily. Zambia is landlocked, so inland transit, border formalities, customs clearance and delivery are separate from ocean freight unless the quotation explicitly includes them.",
      },
      {
        question: "What should I send for a Zambia vehicle quotation?",
        answer:
          "Share the vehicle reference, manufacture year, engine capacity, preferred port/corridor and final town. Include ZCSA inspection status if already arranged.",
      },
    ],
    enquiryNote:
      "For Zambia, tell us the final inland destination and preferred corridor as well as the vehicle details. The export/freight quote should identify whether ZCSA inspection, transit, border charges, ZRA clearance and inland delivery are included.",
  },

  malawi: {
    pageHeading: "Import Japanese Vehicles to Malawi: Registration and Customs",
    searchThemes: [
      "Japanese used cars in Malawi",
      "import cars from Japan to Malawi",
      "Malawi motor vehicle importer certificate",
      "Malawi vehicle customs clearance MRA",
      "car shipping Japan to Blantyre Lilongwe",
    ],
    marketOverview:
      "Malawi's official Trade Information Portal describes a vehicle-import process that can include importer registration through the Ministry of Transport and Public Works, a Motor Vehicle Importer Certificate and customs registration/clearance through the Malawi Revenue Authority (MRA). The process depends on whether the importer is an individual or an organisation. Malawi is landlocked, so the buyer should also plan the port, cross-border transit and final inland movement before accepting a delivered-cost estimate.",
    planningSteps: [
      {
        title: "Confirm whether importer registration applies",
        detail:
          "The Trade Portal describes a Motor Vehicle Importer Certificate issued by the Ministry of Transport and Public Works. It states a 12-month validity period and a limit of no more than five vehicles per year for an individual importing on a non-commercial basis; organisations may face inspection before certification. Confirm current application and exemptions with the Ministry.",
      },
      {
        title: "Complete MRA and customs-agent requirements",
        detail:
          "Confirm the buyer's TPIN/tax registration, customs declaration and ASYCUDA World process. The Trade Portal describes use of a licensed customs clearing agent and supporting commercial invoice, bill of lading, packing list and applicable permits.",
      },
      {
        title: "Check vehicle eligibility and inspection separately",
        detail:
          "The sources reviewed for this guide do not establish one universal vehicle-age limit for every Malawi import. Ask the Ministry, MRA and relevant transport authority to confirm the current rules for the exact vehicle class, inspection and registration before purchase.",
      },
      {
        title: "Obtain police/Interpol clearance before registration",
        detail:
          "Malawi Police Service describes a physical motor-vehicle clearance process and supporting papers such as invoices, bill of lading for overseas shipments and MRA documents. Confirm the required clearance sequence with Police and the licensing office.",
      },
    ],
    logisticsSummary:
      "A Malawi shipment must account for sea freight to a suitable regional port followed by cross-border transit and inland movement. The actual port, transit country, customs procedures and final delivery depend on the carrier and buyer's location. State whether the service is port-to-port only or includes transit, border handling, customs clearance and delivery in Malawi.",
    localChecks: [
      "Ask the Ministry of Transport and Public Works whether a Motor Vehicle Importer Certificate is required for the buyer's category and current transaction.",
      "For non-commercial individual importers, verify the Trade Portal's stated five-vehicle annual limit and the certificate validity with the Ministry.",
      "Confirm MRA TPIN, licensed clearing-agent, ASYCUDA declaration, document and inspection requirements before shipment.",
      "Arrange Malawi Police Service/Interpol vehicle clearance and keep original purchase, export, bill-of-lading and customs documents for registration.",
    ],
    costFactors: [
      "Vehicle purchase, auction/agent charges, Japanese inspection and export paperwork.",
      "Ocean freight, marine insurance and discharge-port/terminal handling.",
      "Cross-border transit, transit documentation, border charges and inland transport to Malawi.",
      "MRA duties/taxes, customs broker, importer certificate or inspection charges where applicable, police clearance and registration.",
    ],
    faqs: [
      {
        question: "Does Malawi require a motor vehicle importer certificate?",
        answer:
          "The Malawi Trade Information Portal describes a Motor Vehicle Importer Certificate through the Ministry of Transport and Public Works. Whether it applies depends on the importer and transaction; confirm the current requirement before purchase.",
      },
      {
        question: "How long is the Malawi importer certificate valid?",
        answer:
          "The Trade Portal procedure states a 12-month validity period. Confirm the current application conditions and renewal process directly with the Ministry.",
      },
      {
        question: "Does a private importer have a yearly vehicle limit?",
        answer:
          "The published Trade Portal procedure states no more than five vehicles per year for an individual importing on a non-commercial basis. Verify this against the live procedure before relying on it.",
      },
      {
        question: "Does a shipping quote include delivery to Lilongwe or Blantyre?",
        answer:
          "Not automatically. Malawi is landlocked, so the buyer should confirm the regional port, transit route, border charges, customs clearance and inland delivery separately.",
      },
    ],
    enquiryNote:
      "For Malawi, identify whether the importer is an individual or organisation, the final town, vehicle details and intended transit route. Ask us to specify whether the quotation ends at the regional port or includes inland transit and Malawi-side handling.",
  },

  mozambique: {
    pageHeading: "Import Japanese Vehicles to Mozambique: Customs Planning",
    searchThemes: [
      "Japanese used cars in Mozambique",
      "import cars from Japan to Mozambique",
      "Mozambique vehicle import customs procedure",
      "Autoridade Tributaria importacao de viaturas",
      "shipping Japanese cars to Maputo Beira Nacala",
    ],
    marketOverview:
      "Mozambique's Autoridade Tributária de Moçambique (AT) publishes a dedicated vehicle-import procedure within its customs-procedure resources, including a procedure document dated 5 August 2026. This is the primary starting point for a current import enquiry. The public procedure must be read for the actual vehicle category and shipment date; this page deliberately does not assume a universal age cap, steering rule, inspection certificate or fixed tax rate without a vehicle-specific authority assessment.",
    planningSteps: [
      {
        title: "Identify the correct port and final location",
        detail:
          "State whether the vehicle is intended for Maputo, Beira, Nacala or another gateway and identify the final delivery town. Port choice affects freight, local handling and any onward transport.",
      },
      {
        title: "Check the current AT vehicle-import procedure",
        detail:
          "Use the Tax Authority's latest 'Importação de Viaturas' procedure and ask a licensed customs agent to confirm the requirements for the vehicle's classification. Do not rely only on a general cargo procedure or old broker article.",
      },
      {
        title: "Confirm documents, valuation and inspection",
        detail:
          "Ask AT or the appointed clearing agent to identify the required invoice, bill of lading, export/registration certificate, vehicle identifiers, valuation evidence and any permit, technical inspection or conformity document applicable to the selected vehicle.",
      },
      {
        title: "Request a current customs and tax assessment",
        detail:
          "Confirm the HS code, customs value, duties, VAT and any other applicable fees using the current tariff and import date. The export quotation should not be presented as a destination-cleared or delivered price unless those services are confirmed.",
      },
    ],
    logisticsSummary:
      "Mozambique has several maritime gateways and a range of inland destinations. The quotation should identify the actual port, discharge and terminal arrangements, customs agent, any inland border transit and final delivery scope. Where documents are prepared in Portuguese or another required format, agree responsibility for certified translation and document handling before the vehicle is shipped.",
    localChecks: [
      "Read the AT vehicle-specific procedure published in August 2026 and check for later notices before committing to a shipment.",
      "Confirm age, steering, vehicle-category, technical inspection and permit conditions for the exact vehicle; this guide does not state unverified blanket limits.",
      "Match chassis/VIN and vehicle particulars across the invoice, Japanese export certificate, bill of lading and any inspection record.",
      "Obtain a current HS-code, customs-value, duty/VAT and port-fee assessment from AT or a licensed clearing agent.",
    ],
    costFactors: [
      "Japanese purchase price, inspection/auction charges, export preparation and inland movement to port.",
      "Ocean freight, marine insurance and destination port/terminal handling.",
      "AT customs valuation, import duties, VAT and any vehicle-category-specific fees or inspections.",
      "Customs broker, document translation/certification if required, storage, registration and inland delivery.",
    ],
    faqs: [
      {
        question: "Where can I find Mozambique's official vehicle import procedure?",
        answer:
          "The Autoridade Tributária de Moçambique publishes customs-procedure resources and a dedicated 'Importação de Viaturas' procedure. Use the latest official version for the intended import date.",
      },
      {
        question: "Is there one verified vehicle-age limit for every import to Mozambique?",
        answer:
          "The public material reviewed for this page does not support a single universal limit across every class. Confirm age and eligibility rules with AT for the exact vehicle and tariff classification.",
      },
      {
        question: "Which Mozambican port should I use?",
        answer:
          "The suitable port depends on the buyer's destination and the carrier's available service. Compare Maputo, Beira, Nacala or another suitable gateway together with onward delivery and customs arrangements.",
      },
      {
        question: "Can Wazir Trading quote a customs-cleared price in Mozambique?",
        answer:
          "An export quotation can identify the vehicle and agreed shipping scope. Customs duty, VAT, port charges and clearance should be confirmed separately by AT or a qualified local agent unless they are explicitly included in a written service proposal.",
      },
    ],
    enquiryNote:
      "For Mozambique, provide the intended port and final town, vehicle specifications and preferred document language. We will distinguish the Japan export and freight scope from AT customs assessment, port handling and local delivery.",
  },

  zimbabwe: {
    pageHeading: "Import Japanese Cars to Zimbabwe: 2026 Age and Customs Rules",
    searchThemes: [
      "Japanese used cars in Zimbabwe",
      "import Japanese cars to Zimbabwe",
      "Zimbabwe 2026 used vehicle age limit",
      "ZIMRA motor vehicle import customs clearance",
      "ship car from Japan to Harare Zimbabwe",
    ],
    marketOverview:
      "Zimbabwe's 2026 rules make manufacture date a critical pre-purchase check. Statutory Instrument 59 of 2026, published on 25 March 2026, restricts importation of specified second-hand motor vehicles that are ten years old or older, measured from manufacture, with defined exceptions. ZIMRA also advises buyers to verify customs-clearance particulars before paying for a second-hand vehicle. An overseas seller's invoice or registration label is not a substitute for checking the current import rule and vehicle papers.",
    planningSteps: [
      {
        title: "Check the manufacture-date age rule",
        detail:
          "For the specified vehicle headings, SI 59 of 2026 states that second-hand vehicles aged ten years and above from manufacture may not be imported. Confirm the correct heading, manufacture date and any specific exemption with ZIMRA before paying.",
      },
      {
        title: "Verify the vehicle's customs-clearance history",
        detail:
          "ZIMRA Public Notice 35 of 2026 advises buyers to confirm customs-clearance particulars before purchase. Obtain and reconcile the sale agreement, registration book, seller/buyer identification, vehicle photographs and customs documents where applicable.",
      },
      {
        title: "Prepare export and transit documents",
        detail:
          "ZIMRA's private-individual guidance lists documents such as invoice or sale agreement, export bill of entry, registration book, freight statement and insurance statement. Confirm the current original-document list and any police clearance requirements for the specific import route.",
      },
      {
        title: "Plan the landlocked route and destination clearance",
        detail:
          "Confirm the port of discharge, transit country, border procedures, clearing agent and final delivery. Keep freight, insurance, ZIMRA assessment, port/terminal fees and inland movement distinct in the quotation.",
      },
    ],
    logisticsSummary:
      "Zimbabwe is landlocked, so a shipment involves a maritime port plus cross-border transit to the final destination. Confirm the carrier and route for the actual shipment and who is responsible for transit documents, customs release at the port, border formalities and inland delivery. Avoid booking freight until ZIMRA eligibility and vehicle identity have been checked.",
    localChecks: [
      "Apply the 10-year restriction by manufacture date for vehicle categories covered by SI 59 of 2026; do not calculate it solely from first registration.",
      "Confirm whether the importer and vehicle fall within a specific statutory exception before assuming an over-age vehicle can be imported.",
      "Use ZIMRA Notice 35 of 2026 to verify customs-clearance and ownership particulars before buying a second-hand vehicle.",
      "Keep the original invoice/sale agreement, export bill of entry, registration book, freight and insurance statements available for customs clearance.",
    ],
    costFactors: [
      "Japanese purchase price, inspection/auction fees, export documents and Japan-side transport.",
      "Ocean freight, marine insurance, port handling and any storage.",
      "Transit-country charges, border handling and inland transport to Zimbabwe.",
      "ZIMRA customs valuation, duty/taxes, broker fees, registration and any required police or vehicle clearance.",
    ],
    faqs: [
      {
        question: "What is Zimbabwe's 2026 used-vehicle age restriction?",
        answer:
          "SI 59 of 2026 restricts specified second-hand motor vehicles that are ten years old or older from manufacture. Check the covered HS heading and any exemption with ZIMRA before purchase.",
      },
      {
        question: "Does the age test use manufacture date or first registration?",
        answer:
          "The 2026 statutory instrument describes the age restriction by reference to manufacture. Verify the documentary manufacture date for the specific chassis and category.",
      },
      {
        question: "Should I check customs records before buying a vehicle?",
        answer:
          "Yes. ZIMRA Public Notice 35 of 2026 advises buyers to verify customs-clearance particulars before purchase and lists supporting vehicle, seller and customs documents.",
      },
      {
        question: "Does shipping to a regional port include delivery to Harare?",
        answer:
          "Not necessarily. Transit, border handling, customs release and inland movement to Harare or another town should be listed separately unless the written quotation explicitly includes them.",
      },
    ],
    enquiryNote:
      "For Zimbabwe, send the manufacture date, vehicle category, registration/export records and intended final town. We will not suggest buying or shipping a vehicle until the SI 59 age rule, any exception and ZIMRA documentary checks have been confirmed.",
  },

  namibia: {
    pageHeading: "Import Japanese Cars to Namibia: Age, Steering and Port Rules",
    searchThemes: [
      "Japanese used cars in Namibia",
      "import cars from Japan to Namibia",
      "Namibia second hand vehicle import permit",
      "NamRA used motor vehicle import age restriction",
      "shipping car Japan to Walvis Bay Namibia",
    ],
    marketOverview:
      "Namibia's Trade Information Portal publishes category-specific second-hand vehicle import measures. The portal describes a left-hand-drive prohibition except for diplomatic cases and an over-12-year restriction for specified vehicle categories listed in Annexure A when imported from outside the common customs area; Annexure B exemptions may apply. It also states that Walvis Bay is the sole port of entry for used vehicles imported from outside the common customs area. Buyers must check the annexes and current notices rather than treating these rules as an identical ban on every vehicle class.",
    planningSteps: [
      {
        title: "Check the vehicle category and manufacture age",
        detail:
          "Read the current second-hand motor vehicle measure and its Annexure A and B. The over-12-year restriction applies to the listed categories and specified origin route; verify the exact HS code and any exemption with NamRA before purchase.",
      },
      {
        title: "Confirm steering configuration",
        detail:
          "The Trade Portal says left-hand-drive vehicles are prohibited except for diplomats. A Japanese right-hand-drive vehicle should still be checked against every other category and technical requirement before it is treated as eligible.",
      },
      {
        title: "Confirm the port and approved transport method",
        detail:
          "The portal identifies Walvis Bay as the port of entry for covered used vehicles from outside the common customs area. It also describes a car-carrier transport requirement introduced in 2023; confirm whether later amendments or shipment-specific exceptions apply.",
      },
      {
        title: "Prepare permit and customs documents",
        detail:
          "Have NamRA and the relevant transport authority confirm the current import permit, invoice, deregistration/export certificate, bill of lading, identity, payment evidence, inspection and registration requirements for the exact vehicle.",
      },
    ],
    logisticsSummary:
      "Do not assume that a quote to any Namibian port or a standard RoRo/container arrangement satisfies the current measure. Confirm the permitted port, car-carrier requirement and the final inland destination with NamRA and the carrier before booking. The service proposal should identify port handling, customs clearance, inspections and inland transport as separate inclusions or exclusions.",
    localChecks: [
      "Confirm that the vehicle is right-hand drive; the published measure says left-hand-drive vehicles are prohibited except for diplomats.",
      "Check Annexure A and Annexure B to determine whether the 12-year restriction applies to the exact vehicle class and route.",
      "Confirm whether Walvis Bay is the required entry point and whether the current car-carrier transport rule applies.",
      "Obtain current NamRA guidance on import permits, customs value, taxes, inspection and local registration before shipment.",
    ],
    costFactors: [
      "Vehicle price, auction/agent charges, Japanese inspection and export documentation.",
      "Ocean freight, insurance, car-carrier/transport arrangements and port handling.",
      "NamRA customs valuation, duties/taxes and any permit or technical-compliance charges.",
      "Clearing agent, storage, inspection, registration and inland transport to the buyer's destination.",
    ],
    faqs: [
      {
        question: "Can I import a left-hand-drive vehicle into Namibia?",
        answer:
          "The Namibia Trade Information Portal states that left-hand-drive vehicles are prohibited except for diplomats. Confirm the current position for the exact importer and vehicle before purchase.",
      },
      {
        question: "Does Namibia ban every used vehicle older than 12 years?",
        answer:
          "The published measure links the over-12-year restriction to specified vehicle categories in Annexure A and an origin route outside the common customs area; Annexure B exemptions are also described. Check the exact heading and annex before relying on the rule.",
      },
      {
        question: "Can a used car enter through any Namibian port?",
        answer:
          "The Trade Portal identifies Walvis Bay as the sole port of entry for used motor vehicles imported from outside the common customs area. Confirm any current amendments and the specific shipment route with NamRA.",
      },
      {
        question: "Does the transport method matter?",
        answer:
          "Yes. The portal describes a car-carrier transport requirement introduced in 2023. Confirm whether that requirement remains applicable to the proposed shipment before booking a carrier.",
      },
    ],
    enquiryNote:
      "For Namibia, provide the manufacture year, vehicle class, steering side, intended port and final delivery location. The enquiry must be checked against the applicable annex, Walvis Bay entry and current car-carrier/permit requirements before a shipment is promised.",
  },

  ghana: {
    pageHeading: "Import Japanese Cars to Ghana: Right-Hand-Drive Rules",
    searchThemes: [
      "Japanese used cars in Ghana",
      "import car from Japan to Ghana",
      "Ghana right hand drive import dispensation",
      "GRA vehicle import duty by chassis number",
      "used Japanese car shipping to Tema Ghana",
    ],
    marketOverview:
      "Ghana requires a particularly careful check before a buyer selects a Japanese-market vehicle. Ghana Revenue Authority (GRA) states that right-hand-steering vehicles are not allowed by default under customs law, while describing a limited policy-dispensation process and subsequent conversion requirements. Because most Japanese-market vehicles are right-hand drive, a Japan-side price or shipping quotation must never be treated as permission to import or register the vehicle in Ghana.",
    planningSteps: [
      {
        title: "Check steering side before any vehicle purchase",
        detail:
          "Identify whether the specific vehicle is right-hand or left-hand drive. GRA's published guidance says RHD vehicles are not permitted by default, so a Japanese-market RHD vehicle should be treated as restricted unless the competent authority confirms the applicable approval route.",
      },
      {
        title: "Obtain written dispensation before shipment",
        detail:
          "GRA describes a policy dispensation for certain RHD cases, with the decision reserved to the Minister responsible for Trade. Confirm the current application, eligibility and written approval for the exact vehicle before committing to purchase or freight.",
      },
      {
        title: "Confirm conversion and road-registration requirements",
        detail:
          "GRA's page describes conversion requirements after the dispensation process, including customs handling of the vehicle pending left-hand refit. Ask the competent authority and licensing office to confirm the current approved conversion and inspection sequence.",
      },
      {
        title: "Calculate customs charges using the vehicle identity",
        detail:
          "GRA provides a vehicle-duty process using the chassis/VIN, model, year and make. Ask a licensed agent to run the current assessment and identify the bill of lading, title/export papers, valuation and terminal documents required.",
      },
    ],
    logisticsSummary:
      "A Japan-to-Ghana freight route should be considered only after steering-side eligibility and any written Ministerial dispensation are resolved. Name the intended port, buyer and customs agent, and specify who manages conversion, inspection and registration. A normal Japanese RHD export must not be marketed as an uncomplicated road-ready import.",
    localChecks: [
      "Treat a Japanese right-hand-drive vehicle as restricted unless GRA/Ministry of Trade confirms a current legal dispensation in writing.",
      "Confirm whether conversion is permitted for the exact vehicle and the authority-approved conversion, inspection and registration sequence.",
      "Use GRA's current vehicle-duty assessment with chassis/VIN, make, model and year rather than generic online rate claims.",
      "Keep steering-side approval, export certificate, invoice, bill of lading and customs/terminal records together.",
    ],
    costFactors: [
      "Japanese vehicle purchase, inspection, auction/agent fees and export handling.",
      "Ocean freight, marine insurance and Tema/other confirmed port charges.",
      "GRA customs value and applicable import duties/taxes, assessed for the exact vehicle.",
      "Any permitted conversion, inspection, broker, registration, storage and local delivery costs.",
    ],
    faqs: [
      {
        question: "Can I freely import a right-hand-drive car from Japan to Ghana?",
        answer:
          "No. GRA says right-hand-steering vehicles are not allowed by default under Customs law. Its guidance describes a limited dispensation process, so obtain written approval before buying or shipping.",
      },
      {
        question: "Who can approve a right-hand-drive vehicle dispensation?",
        answer:
          "GRA's published guidance says the policy dispensation is reserved to the Minister responsible for Trade. Confirm the live application and approval process with GRA and the Ministry.",
      },
      {
        question: "Can the vehicle be converted after arrival?",
        answer:
          "GRA describes conversion requirements for vehicles that receive the relevant dispensation. Do not assume any workshop conversion will be accepted; confirm the authority-approved process before shipment.",
      },
      {
        question: "How can I estimate Ghana import duty?",
        answer:
          "GRA provides a vehicle-duty assessment process using the chassis/VIN, model, year and make. Obtain a current assessment from GRA or a licensed clearing agent for the exact vehicle.",
      },
    ],
    enquiryNote:
      "For Ghana, state the steering side at the start of the enquiry and attach any written dispensation already obtained. We will not represent a Japanese right-hand-drive vehicle as importable until the current GRA/Trade approval and conversion route are confirmed.",
  },

  mauritius: {
    pageHeading: "Import Japanese Cars to Mauritius: 2026 Rules and Valuation",
    searchThemes: [
      "Japanese used cars in Mauritius",
      "import second hand car from Japan Mauritius",
      "Mauritius GN 137 of 2026 used vehicle import permit",
      "Mauritius GN 179 of 2026 second hand motor vehicles",
      "MRA used vehicle valuation Japan",
    ],
    marketOverview:
      "Mauritius changed its used-vehicle import-control framework in 2026. The Ministry of Commerce's legislation register describes GN 137 of 2026 as removing the import permit in respect of a used or second-hand motor vehicle under the Control of Imports regulations. Separately, GN 179 of 2026 amends the Consumer Protection (Importation and Sale of Second-hand Motor Vehicles) regime. Buyers must distinguish the former general import-permit question from any continuing licensing, age, condition, conformity, customs-valuation and registration requirements under the amended second-hand-vehicle rules.",
    planningSteps: [
      {
        title: "Read the current GN 137 and GN 179 amendments together",
        detail:
          "Do not rely on an older Mauritius Customs FAQ or broker article that repeats the former import-permit process. GN 137/2026 changes the Control of Imports permit position, while GN 179/2026 amends the separate second-hand motor-vehicle regime. Ask the Trade Division to confirm the applicable consolidated text and commencement conditions for the exact vehicle.",
      },
      {
        title: "Confirm vehicle age, condition and importer/licence rules",
        detail:
          "Check the current second-hand motor-vehicle regulations and any applicable dealer/importer licensing, vehicle-age, roadworthiness and condition provisions. The exact operative limits should be taken from the 2026 Gazette and written authority guidance, not copied from a superseded FAQ.",
      },
      {
        title: "Check Mauritius Revenue Authority valuation",
        detail:
          "Ask MRA how the Japanese vehicle's customs value is determined under its current valuation method and whether the applicable second-hand vehicle valuation system is used. Keep invoice, Japanese export certificate, chassis details and freight/insurance evidence available.",
      },
      {
        title: "Confirm taxes, inspection and registration",
        detail:
          "Obtain a vehicle-specific assessment of customs duty, excise, VAT, registration, roadworthiness and port charges, and confirm the documents required by the licensing authority before the vehicle is shipped.",
      },
    ],
    logisticsSummary:
      "Provide the intended Mauritius port and delivery location, and confirm who handles MRA customs entry, any inspection, port release and road registration. Do not add a generic import-permit charge based on an old checklist; the 2026 amendments changed that area. The quotation should still separate vehicle export price, freight, customs assessment and any licensing or registration services that apply.",
    localChecks: [
      "Use the Ministry of Commerce's current 2026 legislation register and obtain GN 137/2026 and GN 179/2026, including any consolidated text and commencement details.",
      "Do not repeat the former blanket import-permit requirement without checking GN 137/2026; distinguish import control permits from dealer/vehicle licensing under the second-hand-vehicle regime.",
      "Confirm current age, condition, steering, inspection and registration conditions under the amended GN 179/2026 framework.",
      "Ask MRA for the current vehicle valuation, classification, excise, VAT and any other import charges before accepting a landed-cost estimate.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent charges, export certificate and Japan-side movement.",
      "Ocean freight, insurance, shipping documentation and port/terminal handling.",
      "MRA customs valuation, applicable duty, excise, VAT and any current vehicle-category charge.",
      "Inspection, any required licensing, customs broker, registration and local delivery.",
    ],
    faqs: [
      {
        question: "Does Mauritius still require the old used-car import permit?",
        answer:
          "The Ministry of Commerce lists GN 137 of 2026 with the description that no import permit is required in respect of a used or second-hand motor vehicle under the Control of Imports framework. Buyers must still check the separate amended second-hand-vehicle regulations and any other applicable approvals.",
      },
      {
        question: "What is GN 179 of 2026?",
        answer:
          "It is an amendment to the Consumer Protection (Importation and Sale of Second-hand Motor Vehicles) regulations. Check the current Gazette text for the exact vehicle and importer conditions rather than relying on pre-2026 summaries.",
      },
      {
        question: "Can I use an old Mauritius Customs FAQ to estimate costs?",
        answer:
          "Use caution. Some older official FAQs still describe the former permit position. Confirm the live GN 137/GN 179 requirements and obtain a current MRA vehicle-specific assessment.",
      },
      {
        question: "Can Wazir Trading guarantee registration in Mauritius?",
        answer:
          "No. Registration and roadworthiness are determined by the competent Mauritian authorities. An export quotation should be separate from customs assessment, applicable licensing, inspection and registration.",
      },
    ],
    enquiryNote:
      "For Mauritius, provide the vehicle year, engine capacity, chassis details, importer type and intended port. We will not add an outdated blanket import-permit charge; the applicable GN 137/GN 179 rules and MRA valuation must be confirmed for the transaction date.",
  },

  fiji: {
    pageHeading: "Import Japanese Cars to Fiji: 2026 Age and Euro 4 Rules",
    searchThemes: [
      "Japanese used cars in Fiji",
      "import used cars from Japan to Fiji",
      "Fiji 2026 used vehicle age limit Euro 4",
      "FRCS motor vehicle import licence",
      "Fiji JEVIC inspection used Japanese car",
    ],
    marketOverview:
      "Fiji Revenue and Customs Service (FRCS) publishes category-specific conditions for used and reconditioned vehicles in 2026. The notice distinguishes hybrid passenger vehicles from petrol/diesel vehicles and other vehicle classes, and includes Euro 4 requirements. It also advises importers to obtain the motor-vehicle import licence before loading. A vehicle should therefore be screened by manufacture year, fuel type, category, emissions evidence and any inspection requirement before a buyer commits to it.",
    planningSteps: [
      {
        title: "Classify the vehicle and check its manufacture year",
        detail:
          "The 2026 FRCS notice states a five-year maximum age for specified hybrid passenger vehicles and an eight-year maximum for specified petrol/diesel passenger vehicles, mini vans with 10–15 seats and dual-purpose twin-cab vehicles. Other categories have different conditions; verify the exact row for the selected vehicle.",
      },
      {
        title: "Confirm Euro 4 evidence and vehicle condition",
        detail:
          "Check the applicable Euro 4 requirement and acceptable emissions evidence for the vehicle category. Confirm that the Japanese documentation identifies the same engine, model and chassis as the vehicle being shipped.",
      },
      {
        title: "Obtain the FRCS import licence before loading",
        detail:
          "FRCS publishes a Motor Vehicle Import Licence service and advises importers to obtain the licence before the vehicle is loaded. Confirm the buyer's eligibility, required documents, fees and approval validity before booking shipment.",
      },
      {
        title: "Check inspection, steering and registration requirements",
        detail:
          "Ask FRCS and the Land Transport Authority (LTA) whether JEVIC or another technical inspection certificate is required, and verify the current restrictions for written-off, modified or personal-import vehicles and the final registration process.",
      },
    ],
    logisticsSummary:
      "Name the intended Fijian port and island on the enquiry. Confirm the vessel service, import-licence and inspection sequence, customs clearance, port handling and any inter-island or inland delivery. A Japanese auction grade or freight booking does not establish Euro 4 compliance or approval by FRCS/LTA.",
    localChecks: [
      "Use the FRCS notice for 2026 and check the precise vehicle category; do not apply the hybrid or petrol/diesel age limit to trucks, buses or other classes.",
      "Confirm Euro 4 compliance and the acceptable evidence for the chosen engine/fuel type.",
      "Obtain the FRCS motor-vehicle import licence before loading and retain the approved licence for customs clearance.",
      "Confirm any JEVIC/technical inspection, written-off vehicle, steering-side and LTA registration requirements.",
    ],
    costFactors: [
      "Japanese purchase price, auction/agent fees, inspection and export preparation.",
      "Ocean freight, marine insurance and any inter-island or destination handling.",
      "FRCS import licence, customs valuation, duties/taxes and any emissions or technical inspection costs.",
      "Port/terminal, broker, storage, registration and local delivery.",
    ],
    faqs: [
      {
        question: "What is Fiji's 2026 age limit for used petrol or diesel passenger cars?",
        answer:
          "The FRCS notice lists an eight-year maximum for specified petrol/diesel passenger vehicles, 10–15 seat mini vans and dual-purpose twin-cab vehicles. Check the notice's exact category and manufacture-year calculation before purchase.",
      },
      {
        question: "Are hybrid used cars treated differently in Fiji?",
        answer:
          "Yes. The 2026 notice lists a five-year maximum for specified hybrid passenger vehicles. Other hybrid or commercial categories should be checked against the current FRCS schedule.",
      },
      {
        question: "Do Japanese used cars need Euro 4 compliance?",
        answer:
          "The 2026 FRCS notice includes Euro 4 requirements for several vehicle categories. Confirm the applicable category, emissions evidence and any inspection certificate with FRCS before loading.",
      },
      {
        question: "Should I obtain the Fiji import licence before shipment?",
        answer:
          "Yes. FRCS provides a Motor Vehicle Import Licence process and advises importers to obtain the licence before the vehicle is loaded. Check the current documents and approval conditions.",
      },
    ],
    enquiryNote:
      "For Fiji, include manufacture year, fuel type, hybrid status, seating/cargo class, Euro 4 evidence and intended port/island. A freight estimate is not an FRCS import licence or proof of eligibility.",
  },

  australia: {
    pageHeading: "Import Japanese Cars to Australia: ROVER Approval First",
    searchThemes: [
      "import Japanese used cars to Australia",
      "Australia road vehicle import approval Japan",
      "ROVER vehicle import approval",
      "Australian specialist enthusiast vehicle register Japanese imports",
      "Australia vehicle import biosecurity asbestos customs",
    ],
    marketOverview:
      "Australia requires a road-vehicle import approval before the vehicle is imported. The Department of Infrastructure's ROVER system manages applications, and the correct pathway depends on the vehicle, its intended use and the importer's circumstances. Some vehicles may qualify under specialist and enthusiast, concessional or other defined categories, while an ordinary Japanese-market vehicle is not automatically eligible. A vehicle shipped without the required approval may not be released from Customs control.",
    planningSteps: [
      {
        title: "Find the correct approval pathway",
        detail:
          "Check the Department of Infrastructure's vehicle import guidance and determine the appropriate ROVER pathway. If considering a specialist and enthusiast vehicle, first check the eligibility register and then apply for the applicable concessional RAV entry approval.",
      },
      {
        title: "Obtain approval for the individual vehicle before shipping",
        detail:
          "The approval must match the exact vehicle and importer. Do not rely on a similar make/model being eligible, a broker's general statement or an application receipt; wait for the valid written approval before dispatch.",
      },
      {
        title: "Prepare biosecurity and asbestos checks",
        detail:
          "Arrange the required cleaning and biosecurity preparation, and verify the vehicle and components for asbestos risk. Australian Border Force and biosecurity authorities may require treatment, inspection or evidence before release.",
      },
      {
        title: "Plan Customs, taxes and state registration",
        detail:
          "After approval, prepare the import declaration, customs value and supporting documents. Confirm any applicable duty, GST, luxury car tax, port/storage, compliance/modification and state/territory registration costs for the exact vehicle.",
      },
    ],
    logisticsSummary:
      "A Japanese vehicle should not be loaded for Australia until the buyer holds the required road-vehicle import approval for that specific unit. State the intended Australian port and who will manage biosecurity cleaning, asbestos checks, customs declaration, quarantine release, compliance work and state registration. Approval, customs clearance and road registration are separate stages.",
    localChecks: [
      "Confirm the vehicle's eligibility and the applicable ROVER pathway before payment or shipment.",
      "Obtain the individual vehicle import approval before loading; an application or a different vehicle's approval is not sufficient.",
      "Confirm biosecurity cleaning/treatment and asbestos-related requirements before the vehicle leaves Japan.",
      "Ask ABF or a licensed customs broker to assess duty, GST, LCT if applicable, customs value and port charges; then verify state/territory registration.",
    ],
    costFactors: [
      "Japanese purchase price, export inspection, auction/agent fees and inland movement to port.",
      "Road-vehicle import approval/application costs and any required compliance or modification work.",
      "Ocean freight, insurance, biosecurity cleaning/treatment, asbestos checks and port/quarantine handling.",
      "Customs duty, GST, LCT where applicable, broker/storage fees, registration and local delivery.",
    ],
    faqs: [
      {
        question: "Can I ship a Japanese used car to Australia and apply for approval later?",
        answer:
          "No. The Department of Infrastructure says the road-vehicle import approval must be obtained before import. An unapproved vehicle may not be released from Customs control.",
      },
      {
        question: "Does every Japanese vehicle qualify for the specialist and enthusiast pathway?",
        answer:
          "No. The vehicle must satisfy the eligibility criteria and the importer must obtain the correct concessional RAV entry approval. Check the current eligibility register and approval process for the exact vehicle.",
      },
      {
        question: "Are Australian biosecurity and asbestos checks part of the import?",
        answer:
          "They can be. Vehicle cleanliness, treatment and asbestos compliance must be checked against current Australian Government requirements before shipment and release.",
      },
      {
        question: "Does an import approval guarantee road registration in every Australian state?",
        answer:
          "No. Import approval and Customs release are separate from state or territory registration and any roadworthiness or modification requirements. Confirm all stages before purchase.",
      },
    ],
    enquiryNote:
      "For Australia, provide the exact vehicle details and the ROVER approval category/status, as well as the intended port and state. Wazir Trading's freight estimate is not Australian import approval; do not ship until the buyer has the required written approval.",
  },

  guyana: {
    pageHeading: "Import Japanese Cars to Guyana: Inspection and Tax Guide",
    searchThemes: [
      "Japanese used cars in Guyana",
      "import cars from Japan to Guyana",
      "Guyana GRA used vehicle inspection certificate",
      "Guyana motor vehicle import duty engine capacity",
      "Japan vehicle inspection Guyana customs",
    ],
    marketOverview:
      "Guyana Revenue Authority (GRA) requires inspection evidence for used motor vehicles and publishes motor-vehicle duty and tax guidance. A February 2026 GRA notice confirms that vehicles older than eight years may enter Guyana, reversing the former age restriction, but the current inspection, customs declaration and tariff conditions still apply. The final duty depends on vehicle age, engine capacity, fuel type and the current classification, so generic percentage estimates are unreliable.",
    planningSteps: [
      {
        title: "Confirm the currently authorised inspection provider in Japan",
        detail:
          "Check GRA's live approved-agency list and arrange the required used-vehicle inspection certificate before shipment. Confirm the inspection record includes the correct chassis/VIN and vehicle particulars.",
      },
      {
        title: "Check the current age and tax treatment",
        detail:
          "GRA's 2026 notice says vehicles over eight years old may enter Guyana; do not apply the former blanket eight-year prohibition. However, the GRA motor-vehicle tax guide applies different treatment by age band, engine capacity and fuel type, so obtain a current vehicle-specific assessment.",
      },
      {
        title: "Prepare ASYCUDA and customs documents",
        detail:
          "GRA processes vehicle declarations through ASYCUDA. Confirm the invoice, bill of lading, export/cancellation papers, TIN, inspection certificate and any additional supporting declaration with a licensed Customhouse broker registered in ASYCUDA.",
      },
      {
        title: "Confirm the freight and destination costs",
        detail:
          "Name the intended Guyanese port and delivery location. Separate Japan FOB/export charges and ocean freight from customs duty, excise, VAT, broker, port, registration and local delivery costs.",
      },
    ],
    logisticsSummary:
      "Confirm the intended Guyanese port, any transhipment arrangement and final delivery location before buying the vehicle. The required Japan-side inspection must be completed by an agency accepted by GRA at the time of shipment. The carrier's waybill should accurately state chassis/VIN, engine number, make, model/year, colour and whether the vehicle is new or used.",
    localChecks: [
      "Arrange the GRA-required used-vehicle inspection with a currently authorised provider in Japan and obtain the certificate before shipment.",
      "Do not rely on the former eight-year import ban; GRA's 2026 notice says vehicles older than eight years may enter, but taxes and vehicle rules still apply.",
      "Use GRA's current age/engine/fuel-based duty guide and confirm the exact customs valuation with a licensed broker.",
      "Ensure vehicle identifiers and condition details are correctly shown in the inspection certificate, invoice, bill of lading and ASYCUDA declaration.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent fees, inspection certificate and export handling.",
      "Ocean freight, insurance, transhipment if applicable and port/terminal charges.",
      "GRA customs value, age/engine/fuel-based duty, excise and VAT under the current tariff.",
      "ASYCUDA broker, storage, registration, inspection follow-up and local delivery.",
    ],
    faqs: [
      {
        question: "Can Guyana import vehicles that are more than eight years old?",
        answer:
          "GRA's February 2026 notice says vehicles older than eight years may enter Guyana, reversing the former blanket restriction. Confirm the vehicle's current tax and inspection treatment before purchase.",
      },
      {
        question: "Does a used vehicle from Japan need an inspection certificate?",
        answer:
          "GRA publishes an inspection-certificate requirement for used vehicles and identifies approved inspection agencies. Check the current Japan-approved provider and complete the certificate before shipment.",
      },
      {
        question: "How are Guyana vehicle import taxes calculated?",
        answer:
          "GRA's motor-vehicle guidance differentiates treatment by vehicle age, engine size and fuel type. Use the current official guide or have a licensed ASYCUDA broker assess the exact vehicle.",
      },
      {
        question: "What should the shipping documents show?",
        answer:
          "Ensure the chassis/VIN, engine, make, model/year, colour and new/used status are accurately stated, and retain the inspection certificate, invoice, bill of lading and required customs records.",
      },
    ],
    enquiryNote:
      "For Guyana, include engine capacity, fuel type, manufacture year, inspection certificate status and intended port. Any duty estimate must be checked against the latest GRA guide and the precise vehicle classification.",
  },

  "trinidad-and-tobago": {
    pageHeading: "Import Japanese Cars to Trinidad and Tobago: Licence Rules",
    searchThemes: [
      "Japanese used cars in Trinidad and Tobago",
      "import used cars from Japan Trinidad",
      "Trinidad Trade Licence Unit motor vehicle import",
      "Trinidad used car age limit hybrid gasoline diesel",
      "right hand drive used vehicle import licence Trinidad",
    ],
    marketOverview:
      "Trinidad and Tobago's Ministry of Trade and Industry publishes a Trade Licence Unit (TLU) process for used motor vehicles. The importer's status and the vehicle's propulsion type affect the applicable conditions. The Ministry's guidance describes a one-vehicle limit within a four-year period for individual personal imports and different manufacture-age limits for gasoline/diesel, hybrid and electric vehicles. Buyers should complete the correct licence route before the vehicle is shipped.",
    planningSteps: [
      {
        title: "Identify the importer category",
        detail:
          "Confirm whether the application is for an individual personally ordering a vehicle, a registered dealer or a returning national. The Ministry's TLU requirements are not identical for every buyer type.",
      },
      {
        title: "Check the age limit for fuel and vehicle type",
        detail:
          "The published TLU guidance lists up to eight years from manufacture for gasoline and diesel vehicles, three years for hybrids, and eight years for electric vehicles. Confirm the exact inclusive/exclusive counting rule and any later update for the selected category before purchase.",
      },
      {
        title: "Register and obtain the import licence",
        detail:
          "The Ministry describes individual registration and an online import-licence application, with supporting identity and a signed declaration for a used right-hand-drive motor vehicle. Complete the process and obtain the necessary approval before booking shipment.",
      },
      {
        title: "Prepare origin, inspection and roadworthiness papers",
        detail:
          "Confirm the required cancellation certificate from the country of origin with engine/chassis details, age verification, structural condition and environmental requirements. The vehicle must also satisfy the Transport Commissioner's roadworthiness process before local registration.",
      },
    ],
    logisticsSummary:
      "A Trinidad and Tobago enquiry should specify whether the vehicle is for Trinidad or Tobago, the intended port and the importer's licence category. Confirm the service scope for the port, customs clearance, inspection, any movement between islands and final delivery. Do not arrange loading until the Trade Licence Unit approval and vehicle-age evidence are complete.",
    localChecks: [
      "For individual personal imports, confirm the Ministry's one-vehicle-within-four-years condition and non-transferability requirements.",
      "Check the manufacture-age limit for the correct propulsion type: gasoline/diesel, hybrid or electric.",
      "Complete the current TLU registration and import-licence application before shipping and retain the signed used-RHD declaration if required.",
      "Confirm origin cancellation certificate, engine/chassis age evidence, structural condition, environmental requirements and Transport Commissioner inspection.",
    ],
    costFactors: [
      "Japanese vehicle price, auction/agent costs, export documents and Japan-side movement.",
      "Ocean freight, marine insurance, port and terminal fees to the confirmed island.",
      "Trade licence and any required inspection or document verification.",
      "Customs duty, taxes, clearing agent, roadworthiness/registration and local or inter-island delivery.",
    ],
    faqs: [
      {
        question: "Can an individual import multiple used cars to Trinidad and Tobago?",
        answer:
          "The Ministry's TLU guidance describes a one-vehicle limit within a four-year period for an individual personal import. Confirm the current interpretation and any exceptions with the Ministry before purchase.",
      },
      {
        question: "What is the age limit for Japanese used cars?",
        answer:
          "The published TLU guidance lists eight years for gasoline/diesel vehicles, three years for hybrids and eight years for electric vehicles. Verify the exact manufacture-date calculation and latest notice for the selected vehicle.",
      },
      {
        question: "Do I need an import licence before shipping?",
        answer:
          "Yes. The Ministry describes a TLU registration and online import-licence process. Complete the required application and obtain approval before the vehicle is loaded.",
      },
      {
        question: "Must the vehicle be inspected before local registration?",
        answer:
          "The Ministry's guidance identifies roadworthiness inspection by the Transport Commissioner as part of the process before registration. Confirm the current inspection documents and sequence for the vehicle category.",
      },
    ],
    enquiryNote:
      "For Trinidad and Tobago, state the island, importer category, fuel/hybrid/EV type, manufacture year and TLU licence status. The shipment should not be booked until the correct licence and age/vehicle conditions are confirmed.",
  },

  bahamas: {
    pageHeading: "Import Japanese Cars to The Bahamas: Customs and Island Delivery",
    searchThemes: [
      "Japanese used cars in Bahamas",
      "import cars from Japan to Nassau",
      "Bahamas vehicle import customs duty VAT",
      "Bahamas import licence used vehicles ten years",
      "car shipping Japan to Freeport Bahamas",
    ],
    marketOverview:
      "The Bahamas is an archipelago, so the exact island and port are central to a useful vehicle quotation. Bahamas Trade Info describes the customs declaration, invoice and bill-of-lading process, while Customs' vehicle guidance explains that duty, VAT, processing/environmental fees and local landing costs must be considered. A 2026 U.S. Government trade guide also lists vehicles ten years or older and vehicles with non-rebuildable titles among restricted imports requiring Ministry of Finance approval; confirm the current Bahamian position before purchase.",
    planningSteps: [
      {
        title: "Choose the island and port of entry",
        detail:
          "Identify whether the vehicle is intended for Nassau, Freeport or another island and whether onward inter-island transport is needed. A quote to one port does not automatically include delivery to another island.",
      },
      {
        title: "Check vehicle age, title and any import licence",
        detail:
          "Confirm whether a vehicle aged ten years or more, or one carrying a non-rebuildable title, requires Ministry of Finance approval under the current restricted-import rules. Obtain written confirmation from Bahamas Customs/Ministry before paying or shipping.",
      },
      {
        title: "Prepare customs and vehicle documents",
        detail:
          "Bahamas Trade Info lists commercial invoice, bill of lading and supporting importer identification/business documentation as part of the import process. Confirm the precise vehicle tariff code, customs value and whether an additional permit or inspection applies.",
      },
      {
        title: "Arrange local inspection and registration",
        detail:
          "Ask the Road Traffic Department what customs slip, bill of sale/invoice, insurance and vehicle inspection evidence is needed to register the car on the destination island. Customs release does not itself complete road registration.",
      },
    ],
    logisticsSummary:
      "The carrier and importer should agree the island, discharge port and final handover location in writing. Confirm any local landing fees, wharf handling, customs broker, storage and inter-island vessel or transport. Do not assume a port-to-port Nassau or Freeport rate includes onward island delivery or Road Traffic Department registration.",
    localChecks: [
      "Confirm the exact island and port; identify whether inter-island transport is required after customs release.",
      "Check the current restricted-import position for vehicles ten years or older and non-rebuildable titles with the Ministry of Finance and Bahamas Customs.",
      "Use the live Bahamas Customs tariff finder and confirm vehicle HS code, customs value, duties, VAT and processing/environmental fees.",
      "Prepare invoice, bill of lading, importer ID/business licence, customs entry, insurance and Road Traffic Department inspection/registration papers.",
    ],
    costFactors: [
      "Japanese vehicle purchase, auction/agent fees, export documents and Japan-side delivery.",
      "Ocean freight, marine insurance, transhipment and destination port/landing charges.",
      "Customs duty based on current vehicle classification/value, VAT, processing fee and environmental fee where applicable.",
      "Customs broker, storage, Road Traffic inspection, registration and any inter-island delivery.",
    ],
    faqs: [
      {
        question: "Does the vehicle's destination island affect the shipping price?",
        answer:
          "Yes. Nassau, Freeport and other islands have different port and onward-delivery considerations. Confirm the discharge port and any inter-island transport before accepting a quotation.",
      },
      {
        question: "Do older vehicles need special approval in The Bahamas?",
        answer:
          "A 2026 U.S. Government trade guide lists vehicles ten years or older and non-rebuildable-title vehicles among restricted imports requiring Ministry of Finance approval. Confirm the current rule directly with Bahamian Customs before purchase.",
      },
      {
        question: "What taxes and fees should a buyer budget for?",
        answer:
          "The total can include vehicle customs duty, VAT, processing and environmental fees, broker charges, port/landing costs, inspection, insurance and registration. The actual duty depends on the live tariff code and customs value.",
      },
      {
        question: "Does customs clearance mean the vehicle can be registered immediately?",
        answer:
          "Not necessarily. The Road Traffic Department may require the customs slip, bill of sale/invoice, insurance and vehicle inspection before registration. Confirm the process on the intended island.",
      },
    ],
    enquiryNote:
      "For The Bahamas, specify the island and port, manufacture year, title status, vehicle specifications and any Ministry of Finance approval already obtained. We will separate ocean freight, customs duty/taxes, port landing and inter-island delivery.",
  },
};
