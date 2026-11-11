import type { VehicleLandingFaq, VehicleLandingKind } from "./vehicle-landing-pages";

/**
 * Curated Tier 2 make/model content. Search themes are editorial planning
 * data only and are never rendered as keyword lists or hidden text.
 */
export interface VehicleTierTwoContent {
  kind: Extract<VehicleLandingKind, "make" | "model">;
  seoTier: 2;
  title: string;
  description: string;
  intro: string;
  buyerGuide: string;
  focusPoints: string[];
  searchThemes: string[];
  faqs: VehicleLandingFaq[];
}

export const VEHICLE_TIER_TWO_CONTENT: Record<string, VehicleTierTwoContent> = {
  "make:subaru": {
    title: "Subaru Used Cars from Japan | Wazir Trading",
    description:
      "Compare Japanese Subaru SUVs and passenger cars by model, year, AWD specification, engine, grade and condition before export.",
    intro:
      "Explore Subaru vehicles sourced from Japan and compare the exact model, generation, engine, drivetrain and grade shown in each available listing. The catalogue can include passenger cars and crossovers, and model-year changes matter: verify the chassis code, safety equipment and condition of the specific vehicle before choosing.",
    buyerGuide:
      "Confirm the Subaru model code, manufacture year, engine, transmission, grade and documented drivetrain. Do not infer equipment or a particular AWD system from the badge alone; check the vehicle record and export documents. Review tyres for matched size and wear, underbody and suspension photographs, warning indicators and available maintenance records. For boxer-engine or CVT-equipped vehicles, request service evidence relevant to the exact unit where available, and check destination emissions, age and steering requirements.",
    focusPoints: [
      "Match model generation, chassis code, model year and grade to the vehicle documents.",
      "Verify engine, transmission and exact drivetrain specification for the individual car.",
      "Review tyre condition, underbody, suspension, warning indicators and available service evidence.",
      "Confirm destination age, emissions, steering and registration requirements before payment.",
    ],
    searchThemes: [
      "Subaru used cars from Japan",
      "Japanese Subaru Forester export",
      "Subaru AWD cars from Japan",
      "Subaru SUV and passenger-car inventory",
    ],
    faqs: [
      {
        question: "Are all Subaru listings equipped with the same AWD system?",
        answer:
          "No. Confirm the drivetrain and specification on the selected vehicle. Model, year and market can affect the configuration; do not rely on a general brand description.",
      },
      {
        question: "What should I check on a used Subaru before export?",
        answer:
          "Review the chassis/model code, engine and transmission details, maintenance records where available, tyres, underbody, suspension, warning indicators and condition photographs.",
      },
      {
        question: "How do I compare Subaru grades?",
        answer:
          "Use the exact year and grade, then confirm the safety, comfort and driver-assistance equipment actually recorded for the unit. Equipment can vary between updates.",
      },
      {
        question: "Does the Japanese Subaru price include destination taxes?",
        answer:
          "Not automatically. Ask for a written cost breakdown separating vehicle price and Japan export charges from freight, insurance, customs duties, clearance, port charges and registration.",
      },
    ],
    kind: "make",
    seoTier: 2,
  },
  "make:mitsubishi": {
    title: "Mitsubishi Used Cars from Japan | Wazir Trading",
    description:
      "Browse Japanese Mitsubishi SUVs and passenger vehicles by model, generation, petrol or PHEV system, grade and condition.",
    intro:
      "Compare Mitsubishi vehicles sourced from Japan using the exact model, generation, year, grade and powertrain recorded for each available unit. Mitsubishi model families can include passenger cars and SUVs with materially different petrol, hybrid or plug-in hybrid systems, so establish the precise configuration before comparing suitability or export costs.",
    buyerGuide:
      "Check the chassis/model code, manufacture year, grade, engine, transmission and drivetrain. For plug-in hybrid versions, confirm the exact PHEV designation, charging equipment, battery and diagnostic information available for that vehicle, and whether charging standards suit the destination. For SUVs, review seating, cargo space, tyres, underbody and any four-wheel-drive details. Request unit-specific service or inspection evidence where available and confirm import eligibility before payment.",
    focusPoints: [
      "Confirm exact model, generation, chassis code and grade from the listing and documents.",
      "Distinguish petrol, hybrid and plug-in hybrid powertrains using the specific vehicle record.",
      "For PHEVs, request available battery/charging diagnostics and check destination charging compatibility.",
      "Review drivetrain, mileage, condition photographs, FOB scope and local import requirements.",
    ],
    searchThemes: [
      "Mitsubishi used cars from Japan",
      "Japanese Mitsubishi Outlander export",
      "Mitsubishi PHEV vehicles Japan",
      "Mitsubishi SUV inventory from Japan",
    ],
    faqs: [
      {
        question: "Are all Mitsubishi SUVs plug-in hybrids?",
        answer:
          "No. Powertrains differ by model and year. Verify whether the selected vehicle is petrol, hybrid or plug-in hybrid from its chassis/model code and vehicle documents.",
      },
      {
        question: "What should I request for a Mitsubishi PHEV?",
        answer:
          "Ask for the battery and system diagnostic information available for that unit, charging connector/specification, included charging equipment and service evidence. Confirm destination charging compatibility.",
      },
      {
        question: "How do I verify Mitsubishi four-wheel drive?",
        answer:
          "Check the precise drivetrain and model code shown in the vehicle-specific record. Do not assume a particular system from the SUV badge or model family.",
      },
      {
        question: "Does the stock price cover shipping and local registration?",
        answer:
          "Only the written quotation can define the included scope. Request separate vehicle, freight, insurance, customs, port, clearance and local registration amounts.",
      },
    ],
    kind: "make",
    seoTier: 2,
  },
  "make:daihatsu": {
    title: "Daihatsu Used Cars from Japan | Wazir Trading",
    description:
      "Explore Japanese Daihatsu compact cars and kei vehicles by model code, engine size, dimensions, grade and local import class.",
    intro:
      "Explore Daihatsu compact vehicles sourced from Japan and compare exact model code, engine displacement, manufacture year, grade and condition. Some Daihatsu vehicles are built around Japan's kei-car dimensions and classification, but the destination country may use different definitions, taxes and registration rules. Confirm the actual vehicle measurements and papers rather than relying on a model name.",
    buyerGuide:
      "Identify the exact chassis/model code, engine displacement, dimensions, manufacture year, transmission and seating. Check whether the selected unit is a kei-class version and ask the destination authority how it will be classified for import, duties, safety and registration. Review cabin and cargo layout, tyre size, underbody, suspension, corrosion and condition photographs. Verify that the vehicle's age, emissions and steering configuration meet local requirements before arranging payment or shipment.",
    focusPoints: [
      "Verify the exact chassis/model code, engine capacity, dimensions, seating and manufacture year.",
      "Confirm whether the destination recognises the vehicle's kei or compact-car classification.",
      "Review underbody, suspension, tyres, cabin, corrosion and condition photographs.",
      "Check import age, emissions, safety, duties and local registration before purchase.",
    ],
    searchThemes: [
      "Daihatsu used cars from Japan",
      "Japanese Daihatsu Mira export",
      "Daihatsu kei cars for export",
      "Daihatsu compact vehicles Japan",
    ],
    faqs: [
      {
        question: "Is every Japanese Daihatsu a kei car?",
        answer:
          "No. Classification depends on the exact engine capacity, dimensions and vehicle specification. Check the vehicle documents and local destination rules.",
      },
      {
        question: "Can a Daihatsu kei car be registered in my country?",
        answer:
          "There is no universal answer. Destination rules may define vehicle size, engine class, safety, age and emissions differently. Obtain confirmation from the local authority before purchase.",
      },
      {
        question: "What details should I compare on Daihatsu vehicles?",
        answer:
          "Start with model code, engine displacement, dimensions, seat count, grade and transmission. Then review condition photographs, mileage, tyres and available inspection records.",
      },
      {
        question: "Are customs charges included in a Daihatsu listing price?",
        answer:
          "Do not assume they are. Ask for a written quote that separates the vehicle and Japan export costs from freight, insurance, customs duty, taxes, clearance and local registration.",
      },
    ],
    kind: "make",
    seoTier: 2,
  },
  "make:isuzu": {
    title: "Isuzu Trucks from Japan | Commercial Vehicle Export | Wazir Trading",
    description:
      "Compare Japanese Isuzu trucks by chassis, cab, body, engine, weight ratings, condition and destination commercial-vehicle rules.",
    intro:
      "Browse Isuzu commercial vehicles sourced from Japan and compare the exact truck designation, chassis, cab and body configuration shown in each listing. Commercial suitability depends on documented weight ratings, dimensions, axle arrangement and intended use—not just the model name—so verify the individual vehicle and supporting papers before requesting a final export quotation.",
    buyerGuide:
      "Confirm chassis/model code, manufacture year, cab style, engine and fuel type, transmission, axle layout, wheelbase and body configuration. Obtain gross vehicle weight and payload or rated-capacity documentation from the manufacturer plate or vehicle papers; never estimate capacity from photographs. Inspect frame rails, underbody, suspension, tyres, brakes, cab, cargo body and any fitted equipment. Check destination commercial registration, permits, weight/axle limits, emissions, road dimensions and shipping restrictions.",
    focusPoints: [
      "Match chassis/model code, cab, wheelbase, axle configuration and body to the export documents.",
      "Verify gross vehicle weight and payload from official vehicle documentation.",
      "Inspect frame, underbody, suspension, tyres, brakes, cargo body and specialist equipment.",
      "Confirm commercial registration class, permits, weight limits, emissions and carrier dimensions.",
    ],
    searchThemes: [
      "Isuzu trucks from Japan",
      "used Isuzu Elf export",
      "Japanese Isuzu commercial vehicles",
      "Isuzu truck chassis and body configuration",
    ],
    faqs: [
      {
        question: "How do I confirm an Isuzu truck's payload?",
        answer:
          "Use the manufacturer's plate and official vehicle documents for the exact chassis. Do not estimate payload from the model name, body size or photographs.",
      },
      {
        question: "Which Isuzu truck details matter most for import?",
        answer:
          "Check chassis, cab, wheelbase, axle layout, gross vehicle weight, documented payload, engine, body dimensions and local commercial registration category.",
      },
      {
        question: "What should I inspect on a used Isuzu truck?",
        answer:
          "Review frame rails, underbody, suspension, tyres, brakes, cab condition, cargo body, corrosion, warning indicators and available inspection evidence.",
      },
      {
        question: "Can commercial truck rules differ from passenger-car import rules?",
        answer:
          "Yes. Weight, axle arrangement, body type and commercial use can change permit, tax, age and road-registration requirements. Confirm the exact class with the destination authority.",
      },
    ],
    kind: "make",
    seoTier: 2,
  },
  "make:audi": {
    title: "Audi Used Cars from Japan | Wazir Trading",
    description:
      "Explore Japanese Audi vehicles by model, generation, engine, transmission, grade, service evidence and individual condition.",
    intro:
      "Explore Audi vehicles represented in Wazir Trading's Japanese catalogue and compare the exact model designation, generation, engine, transmission, grade and condition of each unit. Audi model names can cover different body styles and powertrain combinations, while equipment packages vary by year and options. Use the individual listing and export documents as the source of truth.",
    buyerGuide:
      "Verify the complete model designation, chassis/model code, manufacture year, engine and fuel type, transmission, drivetrain and grade. Confirm the actual equipment and driver-assistance features on the selected vehicle, then review mileage, warning indicators, tyres, body panels, interior and available service or inspection records. For vehicles with specialised transmissions or complex electronic equipment, request diagnostic/service evidence where available. Obtain a written FOB and shipping-scope quotation and verify destination age, emissions and registration requirements.",
    focusPoints: [
      "Confirm Audi model, generation, chassis code, engine, transmission and grade.",
      "Check the actual options and safety equipment instead of assuming all trims are alike.",
      "Review warning indicators, mileage, condition photographs and available service/diagnostic records.",
      "Confirm FOB scope, export documents, destination emissions, age and registration eligibility.",
    ],
    searchThemes: [
      "Audi used cars from Japan",
      "Japanese Audi TT export",
      "Audi cars for export Japan",
      "Audi model and grade comparison",
    ],
    faqs: [
      {
        question: "Does an Audi model name identify every fitted option?",
        answer:
          "No. Equipment and packages vary by model year, grade and original options. Verify each feature on the individual vehicle record or through supporting documentation.",
      },
      {
        question: "What service information should I request for an Audi?",
        answer:
          "Ask what service, inspection and diagnostic records are available for the specific unit. Pay attention to the exact engine, transmission and warning information recorded.",
      },
      {
        question: "Can I compare Audi prices using model name alone?",
        answer:
          "No. Compare generation, engine, transmission, grade, options, mileage and condition. Similar model names can describe significantly different vehicles.",
      },
      {
        question: "Does Wazir Trading's Audi listing include all import costs?",
        answer:
          "Not by default. Request a written quotation that separates vehicle and export charges from freight, insurance, destination duties, clearance, port fees and registration.",
      },
    ],
    kind: "make",
    seoTier: 2,
  },
  "make:mercedes-benz": {
    title: "Mercedes-Benz Used Cars from Japan | Wazir Trading",
    description:
      "Compare Japanese Mercedes-Benz cars and SUVs by generation, engine, trim, body style, equipment and condition.",
    intro:
      "Explore Mercedes-Benz vehicles represented in Wazir Trading's Japanese inventory and compare the precise model family, generation, body style, engine and trim recorded for each listing. A badge or model designation does not establish the exact equipment or powertrain; check the individual vehicle's specification and condition before deciding.",
    buyerGuide:
      "Confirm the complete model and chassis designation, manufacture year, engine, fuel, transmission, drivetrain, body style and trim. Distinguish standard and AMG-labelled versions using the vehicle documentation rather than appearance alone. Compare the actual safety and comfort options, mileage, warning indicators, tyres, interior and exterior condition, and any available service or diagnostic information. Request a written FOB quotation and confirm destination emissions, vehicle-age, steering and registration rules.",
    focusPoints: [
      "Match model/chassis designation, generation, body style, manufacture year and trim.",
      "Verify engine, fuel, transmission and drivetrain from the individual record.",
      "Confirm AMG or option-package details and actual safety equipment from documentation.",
      "Review service/diagnostic evidence, condition photographs, export scope and destination eligibility.",
    ],
    searchThemes: [
      "Mercedes-Benz used cars from Japan",
      "Japanese Mercedes-Benz C-Class export",
      "Mercedes-Benz cars for export Japan",
      "Mercedes-Benz AMG and trim comparison",
    ],
    faqs: [
      {
        question: "Are all Mercedes-Benz vehicles with the same model badge identical?",
        answer:
          "No. Engine, body style, trim, options and equipment can vary by model year and original specification. Verify the chassis details and equipment for the selected unit.",
      },
      {
        question: "How can I confirm an AMG version?",
        answer:
          "Check the full model designation and supporting vehicle documents. Appearance or aftermarket styling alone does not confirm an original AMG model or package.",
      },
      {
        question: "What should I request before purchasing a used Mercedes-Benz?",
        answer:
          "Ask for the available service and diagnostic information, warning-light status, condition report, clear photographs, exact equipment and written export quotation.",
      },
      {
        question: "Are shipping and destination taxes included in the vehicle price?",
        answer:
          "Not automatically. The written quote should specify vehicle/FOB amount, freight, insurance, destination duties, taxes, port costs, clearance and registration inclusions or exclusions.",
      },
    ],
    kind: "make",
    seoTier: 2,
  },
  "model:toyota/corolla": {
    title: "Toyota Corolla from Japan | Sedan & Hatchback Export | Wazir Trading",
    description:
      "Compare Japanese Toyota Corolla generations, body styles, engine options, grades, safety equipment and vehicle condition.",
    intro:
      "Explore Toyota Corolla vehicles sourced from Japan and compare the exact generation, body style, chassis code, grade and powertrain. Corolla naming covers different sedan, hatchback and related configurations across markets and years, so establish the actual body and model identity from the selected vehicle's record rather than assuming all Corollas share the same specification.",
    buyerGuide:
      "Confirm whether the listing is a sedan, hatchback or another Corolla configuration, then match its chassis/model code, year, engine or hybrid system, transmission and grade to the export papers. Compare the fitted safety equipment and cabin options for that particular trim. Review mileage, tyres, body panels, interior wear, warning indicators and available inspection notes. Check destination age, emissions, steering and body-category rules before buying.",
    focusPoints: [
      "Verify Corolla body style, generation, chassis/model code and manufacture year.",
      "Confirm engine/hybrid system, transmission, grade and drivetrain from the exact listing.",
      "Compare documented safety features, mileage, tyres and condition evidence.",
      "Check the destination's age, emissions, steering and passenger-car registration requirements.",
    ],
    searchThemes: [
      "Toyota Corolla from Japan",
      "used Japanese Toyota Corolla export",
      "Toyota Corolla sedan and hatchback Japan",
      "Toyota Corolla hybrid and petrol stock",
    ],
    faqs: [
      {
        question: "Is every Toyota Corolla listing a sedan?",
        answer:
          "No. Body style can differ by model and market. Confirm the exact body configuration, model code and export-document name for the selected unit.",
      },
      {
        question: "How do I compare Corolla generations?",
        answer:
          "Use the chassis/model code and manufacture year, then compare body style, powertrain, grade and equipment recorded for each vehicle.",
      },
      {
        question: "Are all Corolla safety features standard across grades?",
        answer:
          "No. Check the vehicle-specific options and safety-equipment record. Equipment can change between generations, model updates and grades.",
      },
      {
        question: "Does the Corolla page confirm import eligibility?",
        answer:
          "No. Confirm the selected car's age, emissions, steering and exact classification with the destination authority before arranging payment or shipment.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:toyota/vitz": {
    title: "Toyota Vitz from Japan | Compact Hatchback Export | Wazir Trading",
    description:
      "Browse Japanese Toyota Vitz hatchbacks by chassis, generation, engine size, grade, transmission and condition before export.",
    intro:
      "Compare Toyota Vitz compact hatchbacks sourced from Japan using the exact chassis code, generation, engine, grade and manufacture year. Vitz and Yaris naming can vary between markets and generations, so do not assume two vehicles with similar badges are identical. Verify the Japanese model identity and the name shown on the export documents.",
    buyerGuide:
      "Confirm the Vitz chassis/model code, year, engine displacement, transmission, grade and steering side. Compare equipment and safety features on the exact trim, then review mileage, tyres, brakes, body panels, cabin wear and any inspection or auction information available. If comparing a Vitz with a Yaris listing, check the actual chassis and export-document name. Verify destination age, emissions, engine and compact-car classification requirements.",
    focusPoints: [
      "Match Vitz chassis/model code, generation, year and export-document identity.",
      "Check engine size, transmission, grade and steering configuration.",
      "Review safety equipment, mileage, tyres, brakes, cabin and body condition evidence.",
      "Confirm compact-car age, emissions and registration rules in the destination country.",
    ],
    searchThemes: [
      "Toyota Vitz from Japan",
      "used Toyota Vitz hatchback export",
      "Japanese Toyota Vitz model code",
      "Toyota Vitz and Yaris import comparison",
    ],
    faqs: [
      {
        question: "Is Toyota Vitz the same as Toyota Yaris?",
        answer:
          "The names are related but usage varies by market and generation. Confirm chassis/model code and export documents for the actual vehicle rather than assuming a direct one-to-one match.",
      },
      {
        question: "Which Toyota Vitz engine is in the listing?",
        answer:
          "Check engine displacement and model code in the selected vehicle record and export papers. Do not infer it from appearance or a broad model label.",
      },
      {
        question: "What should I inspect on a compact Vitz?",
        answer:
          "Review tyres, brakes, suspension, underbody, body panels, cabin wear, warning indicators and available condition/inspection evidence.",
      },
      {
        question: "Can I import a Vitz to any destination?",
        answer:
          "No. Age, emissions, steering and local compact-car requirements differ. Confirm eligibility for the exact year and engine with the destination authority.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:toyota/harrier": {
    title: "Toyota Harrier from Japan | SUV & Hybrid Export | Wazir Trading",
    description:
      "Compare Japanese Toyota Harrier SUVs by generation, petrol or hybrid system, grade, drivetrain and condition. Browse stock.",
    intro:
      "Explore Toyota Harrier SUVs sourced from Japan and compare generation, model code, grade, powertrain and the equipment fitted to each vehicle. Harrier specifications have changed between model generations, including engine and hybrid options, so verify the exact chassis and individual listing before comparing features or import eligibility.",
    buyerGuide:
      "Identify the Harrier chassis/model code, manufacture year and grade, then confirm engine or hybrid system, transmission and 2WD/4WD configuration. For hybrid vehicles, request available diagnostic or battery evidence for that specific car. Compare safety features, cabin trim, multimedia, wheels and options as actually listed. Inspect tyres, underbody, body panels, warning indicators, mileage and available service information. Check destination age, emissions, engine and hybrid requirements before purchase.",
    focusPoints: [
      "Confirm Harrier generation, chassis/model code, manufacture year and grade.",
      "Verify petrol or hybrid powertrain and the documented drivetrain.",
      "Check actual safety, comfort and multimedia equipment for the selected trim.",
      "Review condition, mileage, available service/diagnostic evidence and destination rules.",
    ],
    searchThemes: [
      "Toyota Harrier from Japan",
      "used Toyota Harrier SUV export",
      "Japanese Harrier hybrid stock",
      "Toyota Harrier grade and model generation",
    ],
    faqs: [
      {
        question: "Are all Toyota Harrier vehicles hybrid?",
        answer:
          "No. Powertrain options vary by generation and grade. Confirm the exact engine or hybrid specification from the selected vehicle's documents.",
      },
      {
        question: "How do I verify the Harrier's drivetrain?",
        answer:
          "Check the vehicle-specific model code and documented 2WD/4WD configuration. Do not infer drivetrain from the SUV badge.",
      },
      {
        question: "What should I request for a Harrier hybrid?",
        answer:
          "Ask for available battery, hybrid-system diagnostic and service information for the exact unit. A model description cannot certify the condition of an individual battery.",
      },
      {
        question: "Does a Harrier listing include local import taxes?",
        answer:
          "Not automatically. Duties and taxes depend on destination law, vehicle age, engine, value and classification. Request a written export quote and local assessment.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:toyota/esquire": {
    title: "Toyota Esquire from Japan | Family Minivan Export | Wazir Trading",
    description:
      "Compare Japanese Toyota Esquire minivans by year, grade, seating, petrol or hybrid system and cabin condition.",
    intro:
      "Browse Toyota Esquire family minivans sourced from Japan and compare the generation, model code, grade, cabin layout and powertrain shown for each vehicle. The Esquire name describes a specific model family, but seating, comfort equipment and hybrid availability can differ between versions. Confirm the individual unit before planning passenger use.",
    buyerGuide:
      "Verify chassis/model code, manufacture year, grade, engine or hybrid specification and transmission. Confirm the registered seat count and actual seat arrangement from vehicle documents and clear cabin photographs. Inspect sliding-door operation, seat rails, belts, upholstery, cargo access, warning indicators and body condition. For hybrids, request available system diagnostics. Check destination passenger-capacity, age, emissions and registration rules.",
    focusPoints: [
      "Match Esquire model code, generation, manufacture year and grade.",
      "Confirm documented seat count, seat arrangement and sliding-door operation.",
      "Verify petrol/hybrid system, transmission and available diagnostic evidence.",
      "Review cabin condition, mileage, body photographs and destination passenger-vehicle rules.",
    ],
    searchThemes: [
      "Toyota Esquire from Japan",
      "used Toyota Esquire minivan export",
      "Japanese Esquire hybrid stock",
      "Toyota Esquire seating layout",
    ],
    faqs: [
      {
        question: "How many seats does a Toyota Esquire have?",
        answer:
          "Confirm the registered capacity and seating arrangement on the selected vehicle's documents and cabin photographs; do not assume all grades are the same.",
      },
      {
        question: "Is every Esquire a hybrid?",
        answer:
          "No. Verify the exact powertrain and chassis/model code from the listing and export paperwork.",
      },
      {
        question: "What should I inspect on a used Esquire?",
        answer:
          "Check sliding doors, seat mechanisms, seat belts, upholstery, floor condition, dashboard warning indicators and any available service or inspection notes.",
      },
      {
        question: "Can the Esquire be imported for passenger transport?",
        answer:
          "That depends on local age, passenger-capacity, safety and registration rules. Confirm the exact vehicle category with the destination authority before shipment.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:nissan/x-trail": {
    title: "Nissan X-Trail from Japan | SUV & Hybrid Export | Wazir Trading",
    description:
      "Compare Japanese Nissan X-Trail SUVs by generation, engine, hybrid or e-POWER system, drivetrain and condition.",
    intro:
      "Explore Nissan X-Trail SUVs sourced from Japan and distinguish the generation, model code, powertrain and drivetrain of each unit. The X-Trail range has changed across model updates and can include different petrol and electrified configurations, so check the precise vehicle specification instead of assuming that one generation's equipment applies to another.",
    buyerGuide:
      "Confirm model code, manufacture year, grade, engine or hybrid/e-POWER designation, transmission and 2WD/4WD configuration. Identify the exact powertrain architecture from the vehicle documents; do not use 'hybrid' and 'e-POWER' interchangeably without confirmation. Review seat count, cargo layout, safety features, tyres, underbody, mileage and condition photographs. For electrified versions, request available diagnostics. Verify destination age, emissions, fuel/powertrain and steering rules.",
    focusPoints: [
      "Identify X-Trail generation, chassis/model code, year and grade.",
      "Confirm the exact petrol, hybrid or e-POWER system and transmission.",
      "Verify 2WD/4WD configuration, seating and the safety equipment fitted to that unit.",
      "Request available diagnostics and check mileage, condition and destination import rules.",
    ],
    searchThemes: [
      "Nissan X-Trail from Japan",
      "used Nissan X-Trail SUV export",
      "Japanese X-Trail e-POWER and hybrid",
      "Nissan X-Trail 4WD stock",
    ],
    faqs: [
      {
        question: "Are all Nissan X-Trail models e-POWER?",
        answer:
          "No. Powertrains differ across generations and versions. Confirm the exact system, engine and model code from the selected vehicle's records.",
      },
      {
        question: "Is e-POWER the same as a plug-in hybrid?",
        answer:
          "Do not assume so. Check the manufacturer's specification and the vehicle documents for the actual powertrain architecture and charging requirements.",
      },
      {
        question: "How do I check if an X-Trail is 4WD?",
        answer:
          "Use the model code and drivetrain details recorded for the exact vehicle. Ask for clarification if the listing does not state the configuration.",
      },
      {
        question: "What should I review before importing an X-Trail?",
        answer:
          "Check generation, engine/powertrain, emissions, age, drivetrain, seating, condition and destination rules. Request vehicle-specific diagnostic evidence for electrified variants.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:nissan/leaf": {
    title: "Nissan Leaf from Japan | Electric Car Export | Wazir Trading",
    description:
      "Explore Japanese Nissan Leaf EVs by generation, battery capacity evidence, charging specification, grade and condition.",
    intro:
      "Explore Nissan Leaf battery-electric vehicles sourced from Japan and compare the exact generation, battery specification, model year, grade and condition recorded for each car. Battery capacity and charging equipment can differ between versions and individual vehicles, so request evidence for the selected unit rather than assuming battery health from age, range claims or the model badge.",
    buyerGuide:
      "Confirm the Leaf generation and model code, manufacture year, battery capacity version, grade and charging connector specification. Request any battery-health report, diagnostic data or inspection evidence available for the exact vehicle, including warning status where supplied. Check charging compatibility at the destination, included cables or accessories, service information, mileage, tyres and body condition. Confirm battery-related registration, age, emissions classification, shipping and high-voltage handling requirements with the relevant parties before purchase.",
    focusPoints: [
      "Verify Leaf generation, chassis/model code, year and documented battery-capacity version.",
      "Request unit-specific battery-health/diagnostic evidence and warning status where available.",
      "Confirm charging connector, voltage/charging compatibility and included accessories for the destination.",
      "Review mileage, condition, service evidence, EV shipping arrangements and local import requirements.",
    ],
    searchThemes: [
      "Nissan Leaf from Japan",
      "used Nissan Leaf electric car export",
      "Japanese Nissan Leaf battery health",
      "Nissan Leaf charging compatibility Japan",
    ],
    faqs: [
      {
        question: "Can the Nissan Leaf battery condition be guaranteed from the listing?",
        answer:
          "No. Battery condition must be assessed using evidence for the individual vehicle, such as available diagnostic or inspection information. Request the report for the exact reference number.",
      },
      {
        question: "Which Nissan Leaf battery capacity is in the selected car?",
        answer:
          "Confirm the documented version and battery specification from the model code and vehicle papers. Do not infer capacity from the registration year alone.",
      },
      {
        question: "Will a Japanese Nissan Leaf charge in my country?",
        answer:
          "Check the vehicle's connector and charging specification against local chargers and electrical standards. Confirm any adapters, cables or equipment included with that unit.",
      },
      {
        question: "Are EV shipping and battery rules the same in every destination?",
        answer:
          "No. Carrier acceptance, high-voltage handling, battery declarations and local import rules can differ. Confirm the selected vehicle's shipping and destination requirements before payment.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:nissan/cube": {
    title: "Nissan Cube from Japan | Compact Car Export | Wazir Trading",
    description:
      "Compare Japanese Nissan Cube compact cars by generation, engine, grade, cabin layout, dimensions and vehicle condition.",
    intro:
      "Browse Nissan Cube compact cars sourced from Japan and compare the generation, model code, grade, engine, transmission and cabin configuration of each vehicle. Its distinctive box-shaped body makes visibility, access and interior layout important buying checks, but equipment and condition still need to be confirmed from the individual listing.",
    buyerGuide:
      "Verify the Cube chassis/model code, manufacture year, engine displacement, transmission and grade. Check door operation and access, seat arrangement, cabin flexibility, cargo area, visibility and any panoramic or glass-roof equipment only where recorded. Inspect tyres, body panels, cabin wear, warning indicators and underbody photographs. Confirm destination age, emissions, dimensions, steering and vehicle-category rules before export.",
    focusPoints: [
      "Confirm Cube generation, chassis/model code, manufacture year and grade.",
      "Check engine, transmission, dimensions and the documented seat/cargo layout.",
      "Inspect door operation, cabin trim, glass areas, tyres, body and underbody condition.",
      "Verify destination age, emissions, steering, dimensions and registration eligibility.",
    ],
    searchThemes: [
      "Nissan Cube from Japan",
      "used Nissan Cube compact car export",
      "Japanese Nissan Cube stock",
      "Nissan Cube model generation and grade",
    ],
    faqs: [
      {
        question: "Which Nissan Cube generation is listed?",
        answer:
          "Use the chassis/model code and manufacture year from the selected vehicle record and export documents to identify its generation.",
      },
      {
        question: "What should I check about the Cube's doors and cabin?",
        answer:
          "Inspect door operation, seals, seat movement, cabin trim, glass areas and cargo layout on the actual vehicle. Request additional photographs where needed.",
      },
      {
        question: "Does a Nissan Cube listing guarantee a particular engine or transmission?",
        answer:
          "No. Confirm displacement, fuel type and transmission for the exact unit because these can differ by year and version.",
      },
      {
        question: "Can the Cube be imported as a compact passenger car?",
        answer:
          "Destination rules depend on vehicle age, emissions, dimensions, steering and local category definitions. Confirm the exact vehicle with the relevant authority.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:honda/fit": {
    title: "Honda Fit from Japan | Hatchback & Hybrid Export | Wazir Trading",
    description:
      "Compare Japanese Honda Fit hatchbacks by generation, petrol or hybrid system, grade, cabin flexibility and condition.",
    intro:
      "Explore Honda Fit compact hatchbacks sourced from Japan and compare model generation, chassis code, grade and powertrain. The Fit's cabin and rear-seat flexibility can be useful for different passenger and cargo needs, but the actual seat configuration, hybrid system and fitted equipment should be verified on the selected vehicle.",
    buyerGuide:
      "Confirm the model code, manufacture year, grade, engine or hybrid system and transmission. Check the exact rear-seat folding and cargo configuration, seat belts, cabin condition and hatch operation. Compare safety equipment, mileage, tyres, body panels and any available inspection notes. For hybrid versions, request system and battery diagnostics available for that unit. Check destination vehicle age, emissions and compact-car classification before purchase.",
    focusPoints: [
      "Match Fit generation, chassis/model code, year and grade to the vehicle papers.",
      "Confirm petrol/hybrid powertrain and transmission for the exact version.",
      "Inspect rear-seat movement, cargo layout, seat belts, hatch, tyres and cabin condition.",
      "Request available hybrid diagnostics and confirm destination age and emissions rules.",
    ],
    searchThemes: [
      "Honda Fit from Japan",
      "used Honda Fit hybrid export",
      "Japanese Honda Fit hatchback stock",
      "Honda Fit model code and grade",
    ],
    faqs: [
      {
        question: "Are all Honda Fit vehicles hybrid?",
        answer:
          "No. Engine and hybrid configurations differ by generation and grade. Check the selected vehicle's model code and powertrain documents.",
      },
      {
        question: "What should I inspect in the Fit's cabin?",
        answer:
          "Check seat movement and folding, seat belts, cargo layout, upholstery, hatch operation and any signs of heavy use. Confirm that the layout suits your needs.",
      },
      {
        question: "What battery evidence can I request for a Fit hybrid?",
        answer:
          "Ask what diagnostic, inspection or service evidence is available for that individual unit. General model data cannot confirm the condition of its battery.",
      },
      {
        question: "Does the Honda Fit price include destination taxes?",
        answer:
          "Not automatically. Ask for a written breakdown of the vehicle/FOB price, freight, insurance, customs, clearance, port fees and registration.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:honda/civic": {
    title: "Honda Civic from Japan | Sedan & Hatchback Export | Wazir Trading",
    description:
      "Explore Japanese Honda Civic models by generation, body style, engine, hybrid option, grade and documented condition.",
    intro:
      "Compare Honda Civic vehicles sourced from Japan and identify the exact generation, body style, chassis code and powertrain of each unit. Civic specifications can differ substantially between sedan, hatchback and other versions, while engine and hybrid availability vary by generation and market. Check the vehicle-specific record rather than generalising from the nameplate.",
    buyerGuide:
      "Verify Civic model/chassis code, manufacture year, body configuration, grade, engine or hybrid designation, transmission and drivetrain. Confirm actual safety and driver-assistance options for the selected trim. Review mileage, tyres, brakes, body panels, cabin, warning indicators and available inspection/service records. For performance-labelled or modified vehicles, confirm the original specification and declared modifications from documents. Check destination age, emissions, engine and registration rules.",
    focusPoints: [
      "Identify Civic generation, body style, chassis code, year and grade.",
      "Verify engine or hybrid system, transmission and drivetrain from the exact vehicle record.",
      "Check safety equipment, options, tyres, brakes, mileage and condition photographs.",
      "Review modification/service evidence and confirm destination age, emissions and registration rules.",
    ],
    searchThemes: [
      "Honda Civic from Japan",
      "used Honda Civic sedan and hatchback export",
      "Japanese Honda Civic hybrid",
      "Honda Civic generation and grade comparison",
    ],
    faqs: [
      {
        question: "Is the Japanese Honda Civic always a sedan?",
        answer:
          "No. Body style and specification vary by generation and version. Confirm the selected vehicle's body, model code and export documents.",
      },
      {
        question: "How can I confirm a Civic hybrid?",
        answer:
          "Check the powertrain and model code in the individual vehicle record. Ask for any available hybrid-system diagnostic information before purchase.",
      },
      {
        question: "Do all Civic grades have the same safety technology?",
        answer:
          "No. Equipment varies by year, grade and optional packages. Confirm the actual equipment fitted to the selected unit.",
      },
      {
        question: "What should I know about an imported Civic with modifications?",
        answer:
          "Ask for a clear list of modifications and supporting documents. Check whether local inspection, roadworthiness, emissions or registration rules permit those changes.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:honda/freed": {
    title: "Honda Freed from Japan | Compact MPV Export | Wazir Trading",
    description:
      "Compare Japanese Honda Freed MPVs by generation, seating layout, hybrid or petrol system, grade and cabin condition.",
    intro:
      "Explore Honda Freed compact MPVs sourced from Japan and compare the exact generation, model code, seat count, grade and powertrain. Freed versions may differ in seating arrangement and cabin configuration, so verify passenger capacity and seat layout from the vehicle documents and photographs before planning family or passenger use.",
    buyerGuide:
      "Confirm chassis/model code, manufacture year, grade, engine or hybrid system and transmission. Check the registered seat count, individual seat layout, sliding-door operation, access, seat belts and cargo flexibility. Review cabin wear, floor and door condition, tyres, mileage and warning indicators. For hybrid vehicles, request available system diagnostics. Verify destination rules for passenger capacity, vehicle age, emissions and registration class.",
    focusPoints: [
      "Verify Freed generation, model code, year, grade and documented seat capacity.",
      "Inspect seat layout, seat belts, sliding doors, step-in access and cargo configuration.",
      "Confirm petrol/hybrid powertrain, transmission and any available diagnostics.",
      "Check cabin condition, mileage and destination passenger/age/emissions requirements.",
    ],
    searchThemes: [
      "Honda Freed from Japan",
      "used Honda Freed MPV export",
      "Japanese Honda Freed hybrid stock",
      "Honda Freed seat configuration",
    ],
    faqs: [
      {
        question: "How many seats are fitted to the selected Honda Freed?",
        answer:
          "Confirm the registered capacity and actual layout in the selected vehicle's documents and cabin photographs; versions can differ.",
      },
      {
        question: "Are all Honda Freed models hybrid?",
        answer:
          "No. Verify the exact powertrain and model code for the individual unit rather than assuming it from the nameplate.",
      },
      {
        question: "What should I check on a Freed used as a family vehicle?",
        answer:
          "Inspect sliding doors, seat rails, seat belts, access, cabin wear, rear-seat condition and cargo space. Ask for extra images of any unclear areas.",
      },
      {
        question: "Can the Honda Freed be imported for passenger transport?",
        answer:
          "Local passenger capacity, vehicle-age, safety and registration rules determine eligibility. Confirm the exact configuration with the destination authority.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:suzuki/jimny": {
    title: "Suzuki Jimny from Japan | 4WD Compact SUV Export | Wazir Trading",
    description:
      "Compare Japanese Suzuki Jimny 4WD vehicles by generation, chassis, engine, transmission, grade and underbody condition.",
    intro:
      "Explore Suzuki Jimny compact 4WD vehicles sourced from Japan and compare generation, chassis code, engine, transmission and equipment. The Jimny is designed around a compact off-road-oriented format, but individual specifications, gearing, body style and condition vary. Verify the actual drivetrain and inspect the underside before making a purchase decision.",
    buyerGuide:
      "Confirm the Jimny model/chassis code, manufacture year, engine displacement, transmission, grade and documented drivetrain. Check the transfer case or 4WD controls from the vehicle specification and ask for clarification if the configuration is not listed. Inspect frame and underbody, suspension, axles, tyres, corrosion, modifications and evidence of off-road use. Confirm dimensions, engine class, emissions, age and local registration rules, particularly where kei classification affects import treatment.",
    focusPoints: [
      "Match Jimny generation, chassis/model code, year and grade.",
      "Verify engine size, transmission and documented 4WD/transfer-system specification.",
      "Inspect frame, underbody, suspension, axles, tyres, corrosion and modifications.",
      "Confirm destination age, emissions, dimensions, engine class and compact-4WD registration rules.",
    ],
    searchThemes: [
      "Suzuki Jimny from Japan",
      "used Suzuki Jimny 4WD export",
      "Japanese Jimny kei and Sierra models",
      "Suzuki Jimny chassis and off-road condition",
    ],
    faqs: [
      {
        question: "Are all Suzuki Jimny versions classified as kei cars?",
        answer:
          "No. Engine size and dimensions vary by model and market. Check the exact chassis and specifications, then confirm local vehicle classification.",
      },
      {
        question: "How do I verify a Jimny's 4WD system?",
        answer:
          "Use the exact model code, vehicle specification and relevant controls/equipment information. Ask for confirmation if the transfer case or drivetrain is not documented.",
      },
      {
        question: "What condition checks are important for a Jimny?",
        answer:
          "Pay close attention to frame and underbody corrosion, suspension, axles, tyres, leaks, modifications and signs of demanding off-road use.",
      },
      {
        question: "Can I import a Jimny into any destination?",
        answer:
          "No. Age, emissions, steering, dimensions, engine displacement and vehicle class can affect eligibility. Obtain destination-specific confirmation before purchase.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:mazda/cx-5": {
    title: "Mazda CX-5 from Japan | SUV Export & Stock | Wazir Trading",
    description:
      "Compare Japanese Mazda CX-5 SUVs by generation, petrol or diesel engine, grade, drivetrain and condition evidence.",
    intro:
      "Explore Mazda CX-5 SUVs sourced from Japan and compare the generation, engine, transmission, grade and drivetrain listed for each unit. CX-5 specifications can vary between model updates and petrol or diesel versions, so verify the precise vehicle and its service evidence before evaluating suitability or export cost.",
    buyerGuide:
      "Confirm the CX-5 chassis/model code, manufacture year, engine and fuel type, transmission, grade and 2WD/4WD configuration. Compare fitted safety features and options on the individual trim. Review mileage, service information where available, dashboard warnings, tyres, underbody, brakes, cabin and body photographs. For diesel versions, request service/inspection information specific to that engine and vehicle. Check destination emissions, age and fuel-category rules.",
    focusPoints: [
      "Identify CX-5 generation, chassis/model code, year and grade.",
      "Verify petrol or diesel engine, transmission and drivetrain from vehicle documents.",
      "Review service/inspection evidence, warning indicators, tyres, brakes and underbody condition.",
      "Confirm destination age, emissions, fuel and registration requirements.",
    ],
    searchThemes: [
      "Mazda CX-5 from Japan",
      "used Mazda CX-5 SUV export",
      "Japanese CX-5 petrol and diesel stock",
      "Mazda CX-5 model year and grade",
    ],
    faqs: [
      {
        question: "Are all Mazda CX-5 listings diesel?",
        answer:
          "No. Engine and fuel options vary by year and market. Check the exact engine designation and vehicle documents for the selected unit.",
      },
      {
        question: "What should I request for a used CX-5 diesel?",
        answer:
          "Ask for available service, inspection and diagnostic evidence specific to the individual vehicle. Review warning indicators, mileage and condition photographs.",
      },
      {
        question: "How do I confirm whether a CX-5 is 4WD?",
        answer:
          "Check the model code and documented drivetrain specification. Do not infer 4WD from the SUV body style.",
      },
      {
        question: "Does the CX-5 price include import duties?",
        answer:
          "Not by default. The quote should identify the vehicle and export scope separately from freight, insurance, customs, port handling, clearance and local registration.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:subaru/forester": {
    title: "Subaru Forester from Japan | SUV & AWD Export | Wazir Trading",
    description:
      "Compare Japanese Subaru Forester SUVs by generation, engine, drivetrain, grade, service evidence and condition.",
    intro:
      "Browse Subaru Forester SUVs sourced from Japan and compare generation, chassis/model code, engine, transmission, trim and drivetrain shown for each vehicle. Forester specification and equipment change between model updates, so verify the individual vehicle's exact configuration and condition rather than relying on a generic model description.",
    buyerGuide:
      "Confirm the Forester model code, year, grade, engine, transmission and documented drivetrain. Check the actual safety and driver-assistance equipment, and review tyres for matching size and wear, underbody, suspension, brakes, warning indicators and any available service history. Request unit-specific diagnostic or service information when relevant to the fitted engine and transmission. Verify destination age, emissions, steering and registration rules before export.",
    focusPoints: [
      "Verify Forester generation, chassis/model code, manufacture year and grade.",
      "Confirm engine, transmission and documented AWD specification for the selected unit.",
      "Inspect tyres, underbody, suspension, brakes, warning indicators and service evidence.",
      "Check destination vehicle-age, emissions, steering and registration requirements.",
    ],
    searchThemes: [
      "Subaru Forester from Japan",
      "used Subaru Forester AWD export",
      "Japanese Forester SUV stock",
      "Subaru Forester generation and engine",
    ],
    faqs: [
      {
        question: "Does every Subaru Forester have the same AWD specification?",
        answer:
          "Do not assume identical equipment across generations or markets. Confirm the drivetrain and model code for the selected car.",
      },
      {
        question: "What should I inspect on a used Forester?",
        answer:
          "Review tyre condition and matching, underbody, suspension, brakes, fluid leaks, warning indicators, cabin wear and available service/inspection information.",
      },
      {
        question: "How do I compare Forester grades?",
        answer:
          "Check the actual year-specific equipment, safety features, trim and options recorded for the unit. Similar grade names can change between generations.",
      },
      {
        question: "Can I import a Forester to any country?",
        answer:
          "No. Vehicle age, emissions, steering and registration conditions differ by destination. Confirm the selected vehicle with the local authority before purchase.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:mitsubishi/outlander": {
    title: "Mitsubishi Outlander from Japan | SUV & PHEV Export | Wazir Trading",
    description:
      "Compare Japanese Mitsubishi Outlander SUVs by generation, petrol or PHEV system, drivetrain, grade and condition.",
    intro:
      "Explore Mitsubishi Outlander SUVs sourced from Japan and compare generation, model code, seating, grade and powertrain. Outlander listings can represent different petrol and plug-in hybrid configurations, so confirm the exact system, drivetrain and vehicle equipment before evaluating the car or its charging suitability.",
    buyerGuide:
      "Verify chassis/model code, year, grade, engine or PHEV designation, transmission and drivetrain. For plug-in hybrids, request the battery/system diagnostic information available for that vehicle, charging connector details and any supplied charging equipment; confirm destination compatibility. Check seat count and cabin layout, tyres, underbody, mileage, warning lights and service records. Confirm destination vehicle age, emissions, battery transport, charging and registration rules.",
    focusPoints: [
      "Confirm Outlander generation, model code, manufacture year and exact grade.",
      "Distinguish petrol and plug-in hybrid versions using vehicle documentation.",
      "For PHEVs, request available battery/charging diagnostics and check destination compatibility.",
      "Review seating, drivetrain, condition photographs and destination import requirements.",
    ],
    searchThemes: [
      "Mitsubishi Outlander from Japan",
      "used Outlander PHEV export",
      "Japanese Mitsubishi Outlander SUV",
      "Mitsubishi Outlander hybrid battery check",
    ],
    faqs: [
      {
        question: "Are all Mitsubishi Outlander vehicles plug-in hybrids?",
        answer:
          "No. Powertrain options vary by generation and market. Confirm the exact petrol or PHEV specification from the selected vehicle documents.",
      },
      {
        question: "What should I request for an Outlander PHEV?",
        answer:
          "Ask for available battery and system diagnostics, charging connector and equipment details, and any service evidence for that vehicle. Confirm local charging compatibility.",
      },
      {
        question: "How can I verify the Outlander's drivetrain?",
        answer:
          "Check the model code and documented 2WD/4WD specification. Do not infer the configuration from the model name.",
      },
      {
        question: "Are PHEV import and shipping requirements the same as petrol SUVs?",
        answer:
          "Not necessarily. Battery declaration, carrier acceptance, charging compatibility, age and registration rules can differ. Confirm the exact destination requirements before shipment.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:daihatsu/mira": {
    title: "Daihatsu Mira from Japan | Kei Car Export & Stock | Wazir Trading",
    description:
      "Browse Japanese Daihatsu Mira compact cars by chassis, engine capacity, dimensions, grade and destination kei-class rules.",
    intro:
      "Explore Daihatsu Mira compact cars sourced from Japan and compare the exact chassis code, engine capacity, year, grade and condition. Many Mira versions are associated with Japan's kei-car class, but the specific vehicle's engine and dimensions—and the destination country's own definition—determine its local classification and eligibility.",
    buyerGuide:
      "Confirm chassis/model code, manufacture year, engine displacement, dimensions, transmission and seat count from the individual vehicle documents. Check whether the destination recognises the vehicle as a kei or other compact category, and obtain local guidance on age, safety, duties and registration. Inspect tyres, underbody, suspension, corrosion, cabin and cargo layout, mileage and available condition evidence before selecting a unit.",
    focusPoints: [
      "Verify Mira chassis/model code, year, engine capacity, dimensions and seat count.",
      "Confirm the vehicle's exact local class and import eligibility with the destination authority.",
      "Review underbody, suspension, tyres, corrosion, mileage, cabin and condition photos.",
      "Obtain a written quote that separates export expenses from destination taxes and registration.",
    ],
    searchThemes: [
      "Daihatsu Mira from Japan",
      "used Daihatsu Mira kei car export",
      "Japanese Mira compact car stock",
      "Daihatsu Mira engine size and chassis",
    ],
    faqs: [
      {
        question: "Is every Daihatsu Mira legally a kei car in my country?",
        answer:
          "Not automatically. Classification depends on the exact engine, dimensions and destination law. Have the local authority or licensed agent review the vehicle documents.",
      },
      {
        question: "What Mira specifications should I check first?",
        answer:
          "Start with chassis/model code, engine displacement, dimensions, year, seat count, grade and transmission. These may affect both suitability and local category.",
      },
      {
        question: "What condition checks are important on a compact Mira?",
        answer:
          "Inspect the underside, suspension, tyres, corrosion, body panels, cabin wear, mileage and any available auction or inspection notes.",
      },
      {
        question: "Does a Japanese Mira price include local registration?",
        answer:
          "No assumption should be made. Request a written quotation separating vehicle and export costs from freight, insurance, customs, clearance and local registration.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:lexus/rx": {
    title: "Lexus RX from Japan | Luxury SUV & Hybrid Export | Wazir Trading",
    description:
      "Explore Japanese Lexus RX SUVs by generation, petrol or hybrid system, grade, equipment and documented condition.",
    intro:
      "Explore Lexus RX luxury SUVs sourced from Japan and compare generation, chassis/model code, grade, engine or hybrid system and cabin specification. RX equipment and powertrains vary between model years and grades, so verify the features and condition of the individual vehicle before assessing its suitability or destination costs.",
    buyerGuide:
      "Confirm RX generation, chassis/model code, manufacture year, grade and powertrain. For hybrid versions, request available battery/system diagnostics and service information for that vehicle. Verify the actual safety, driver-assistance, multimedia, interior and comfort equipment listed; do not assume a feature is fitted from the grade name alone. Inspect body panels, wheels, tyres, cabin wear, warning indicators and photographs. Check destination luxury/engine tax treatment, age, emissions and registration.",
    focusPoints: [
      "Match RX generation, chassis/model code, year, grade and powertrain.",
      "Request vehicle-specific hybrid battery/diagnostic evidence where applicable.",
      "Confirm actual safety, driver-assistance, multimedia and comfort features.",
      "Review condition, mileage and destination luxury/engine taxes, emissions and import eligibility.",
    ],
    searchThemes: [
      "Lexus RX from Japan",
      "used Lexus RX hybrid export",
      "Japanese Lexus RX luxury SUV",
      "Lexus RX grade and model year comparison",
    ],
    faqs: [
      {
        question: "Are all Lexus RX vehicles hybrids?",
        answer:
          "No. Engine options differ by generation and market. Confirm the exact powertrain and model code from the selected vehicle's records.",
      },
      {
        question: "How should I check a Lexus RX hybrid battery?",
        answer:
          "Request any diagnostic, inspection or service information available for that particular unit. General model information cannot certify an individual battery's condition.",
      },
      {
        question: "Do all RX grades include the same luxury and safety equipment?",
        answer:
          "No. Options and features vary by year, grade and package. Verify the actual equipment list for the selected vehicle.",
      },
      {
        question: "Can import taxes be estimated from the Lexus RX model name?",
        answer:
          "No. Destination charges may depend on manufacture year, engine, value, hybrid status and local vehicle class. Obtain a vehicle-specific assessment.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:isuzu/elf": {
    title: "Isuzu Elf from Japan | Light Truck Export & Stock | Wazir Trading",
    description:
      "Compare Japanese Isuzu Elf trucks by chassis, cab, body, engine, weight ratings, condition and commercial import rules.",
    intro:
      "Explore Isuzu Elf light trucks sourced from Japan and compare the exact chassis series, cab type, wheelbase, body and engine recorded for each unit. Elf trucks can be configured for different commercial tasks, so match the truck's documented ratings and dimensions to the intended use instead of assuming payload or capacity from the model name.",
    buyerGuide:
      "Verify chassis/model code, manufacture year, cab configuration, engine, transmission, axle layout, wheelbase and body type. Obtain gross vehicle weight and payload from the manufacturer plate or official vehicle papers. Inspect frame rails, underbody, suspension, tyres, brakes, cab, cargo body and any fitted equipment. Confirm destination commercial-vehicle class, road-weight limits, permits, emissions, registration, shipping dimensions and carrier restrictions.",
    focusPoints: [
      "Match Elf chassis, cab, wheelbase, axle configuration and cargo body to the documents.",
      "Verify gross vehicle weight and payload using official vehicle ratings.",
      "Inspect frame, underbody, suspension, brakes, tyres, cab, body and specialist equipment.",
      "Check local commercial registration, permits, emissions, loading limits and shipping dimensions.",
    ],
    searchThemes: [
      "Isuzu Elf from Japan",
      "used Isuzu Elf truck export",
      "Japanese Isuzu Elf chassis and cab",
      "Isuzu Elf commercial vehicle stock",
    ],
    faqs: [
      {
        question: "What Isuzu Elf payload is available?",
        answer:
          "Use the rated payload documented for the exact chassis and body. Ask for the manufacturer's plate or vehicle papers rather than estimating by model or photographs.",
      },
      {
        question: "How do I compare Elf cab and body configurations?",
        answer:
          "Confirm cab type, wheelbase, axle layout, bed or specialist body, external dimensions and registered seating from the individual vehicle record.",
      },
      {
        question: "What should I inspect before buying a used Elf?",
        answer:
          "Review chassis rails, underbody, suspension, tyres, brakes, cargo body, cab, corrosion, warning indicators and available inspection evidence.",
      },
      {
        question: "Can the Elf be registered as a light commercial truck in every destination?",
        answer:
          "No. Weight, dimensions, emissions, age, axle layout and intended use affect local classification. Obtain destination-specific confirmation before shipment.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
  "model:mitsubishi-fuso/canter": {
    title: "Mitsubishi Fuso Canter from Japan | Truck Export | Wazir Trading",
    description:
      "Compare Fuso Canter trucks from Japan by chassis, cab, wheelbase, engine, rated weights, body and condition. Review stock.",
    intro:
      "Browse Mitsubishi Fuso Canter commercial trucks sourced from Japan and compare chassis series, cab, wheelbase, engine, body configuration and documented ratings. A Canter's practical capacity and local registration category depend on the exact chassis and body, so verify the manufacturer's data and vehicle papers before matching it to a delivery, cargo or specialist use.",
    buyerGuide:
      "Confirm the full Fuso Canter model/chassis code, year, cab style, engine, transmission, axle layout, wheelbase and body. Verify gross vehicle weight, payload and any special-body ratings from official documents or the vehicle plate; never infer them from appearance. Inspect chassis rails, underbody, suspension, tyres, brakes, cab, cargo body and fitted equipment. Check destination commercial licensing, road-weight and dimension limits, emissions, permits, duties and carrier restrictions.",
    focusPoints: [
      "Verify Canter model/chassis code, cab, wheelbase, axle layout and body type.",
      "Confirm documented gross vehicle weight, payload and specialist-body ratings.",
      "Inspect chassis, underbody, suspension, tyres, brakes, cab and cargo equipment.",
      "Check destination commercial-vehicle registration, permits, emissions, road limits and shipping dimensions.",
    ],
    searchThemes: [
      "Mitsubishi Fuso Canter from Japan",
      "used Fuso Canter truck export",
      "Japanese Canter commercial truck",
      "Fuso Canter chassis and payload",
    ],
    faqs: [
      {
        question: "How do I confirm the Canter's rated payload?",
        answer:
          "Use the manufacturer's plate and official papers for the selected chassis and body. Do not calculate a payload from the model name or visual size.",
      },
      {
        question: "Is Mitsubishi Fuso Canter the same as Mitsubishi Canter?",
        answer:
          "They are separate manufacturer/model records in this catalogue. Use the correct make and canonical model page, then verify the individual chassis and documents.",
      },
      {
        question: "What should I inspect on a Canter truck?",
        answer:
          "Check frame and underbody condition, suspension, brakes, tyres, cab, cargo body, corrosion, warning indicators and any fitted crane or specialist equipment.",
      },
      {
        question: "What import checks apply to a Fuso Canter?",
        answer:
          "Confirm local commercial vehicle classification, age, emissions, weight, axle/road limits, permits, dimensions and registration rules for the exact truck.",
      },
    ],
    kind: "model",
    seoTier: 2,
  },
};
