import type { VehicleLandingFaq, VehicleLandingKind } from "./vehicle-landing-pages";

/**
 * Curated Tier 1 make/model SEO content. Search themes are editorial planning
 * data only and are not emitted as hidden keyword blocks in rendered HTML.
 */
export interface VehicleTierOneContent {
  kind: Extract<VehicleLandingKind, "make" | "model">;
  seoTier: 1;
  title: string;
  description: string;
  intro: string;
  buyerGuide: string;
  focusPoints: string[];
  searchThemes: string[];
  faqs: VehicleLandingFaq[];
}

export const VEHICLE_TIER_ONE_CONTENT: Record<string, VehicleTierOneContent> = {
  "make:toyota": {
    "title": "Toyota Used Cars from Japan | Wazir Trading",
    "description": "Compare Japanese Toyota cars, hybrids, SUVs and vans by model, year, grade and condition. Browse matching available stock and request an export quote.",
    "intro": "Explore Toyota vehicles sourced from Japan, from compact hybrids and everyday passenger cars to family MPVs, SUVs, pickups and vans. Wazir Trading's Toyota guide connects the manufacturer catalogue to live matching vehicle records, so compare the exact model, chassis, year, grade and condition shown on each listing rather than relying on a nameplate alone.",
    "buyerGuide": "Toyota covers several very different buying needs. Compare compact cars and hybrids by model code, powertrain evidence, battery or diagnostic information where available, mileage and grade. For MPVs and vans, verify seating layout, doors, cargo configuration and intended use. For SUVs and pickups, check drivetrain, tyres, underbody photographs, payload or towing documentation where relevant. Confirm every detail against the individual vehicle record and export documents.",
    "focusPoints": [
      "Select the exact Toyota model and generation; similar names may describe different body styles or powertrains.",
      "Match chassis/model code, manufacture year, grade, engine, transmission and drivetrain to the export papers.",
      "For hybrids, request available battery/diagnostic information; for commercial vehicles, confirm seating, weight and body configuration.",
      "Review mileage, auction/condition evidence, photographs, FOB scope and destination import eligibility before payment."
    ],
    "searchThemes": [
      "Toyota used cars from Japan",
      "Japanese Toyota cars for export",
      "Toyota hybrid cars from Japan",
      "Toyota SUV and van export inventory"
    ],
    "faqs": [
      {
        "question": "Which Toyota models can I browse?",
        "answer": "Use the Toyota manufacturer guide to open the model pages represented in the catalogue, then compare the individual available vehicle records. The exact selection changes as stock is added or sold."
      },
      {
        "question": "How should I compare Toyota hybrid vehicles?",
        "answer": "Confirm the model code, generation, powertrain and grade, then ask what battery, diagnostic and service information is available for the exact vehicle. Do not infer battery health from the model name or mileage alone."
      },
      {
        "question": "Can Toyota vehicle specifications vary between model years?",
        "answer": "Yes. Body style, powertrain, safety equipment and trim can change by generation and grade. Use the chassis/model code and vehicle-specific listing, not a generic model description."
      },
      {
        "question": "Does a Toyota listing include delivery and import taxes?",
        "answer": "A listing is not a landed-cost quotation. Freight, insurance, customs duties, taxes, port charges, clearance and local registration are separate unless the written quote expressly includes them."
      }
    ],
    "kind": "make",
    "seoTier": 1
  },
  "make:nissan": {
    "title": "Nissan Used Cars from Japan | Wazir Trading",
    "description": "Explore Japanese Nissan cars, e-POWER models, vans, SUVs and EVs. Compare exact model, year, grade, battery details and available export stock.",
    "intro": "Browse Nissan vehicles sourced from Japan across compact passenger cars, family vans, crossovers, SUVs and electrified models. The manufacturer's name alone does not identify the drivetrain or equipment: compare the specific model, model code, grade, year and vehicle condition displayed in each live listing before deciding.",
    "buyerGuide": "Nissan model families can include conventional petrol, hybrid, e-POWER and battery-electric configurations. Confirm the exact system from the vehicle documentation and listing; do not treat e-POWER and a plug-in or battery-electric vehicle as interchangeable. For EVs, request available battery-health and charging information. For vans and SUVs, check seating, cargo layout, drivetrain, safety equipment, mileage and the actual condition report.",
    "focusPoints": [
      "Confirm the exact Nissan model, generation, model code and grade.",
      "Distinguish petrol, hybrid, e-POWER and fully electric powertrains using vehicle-specific documentation.",
      "For electrified vehicles, request available battery, charging and diagnostic information for that unit.",
      "Check condition photographs, mileage, steering side, export papers and destination eligibility."
    ],
    "searchThemes": [
      "Nissan used cars from Japan",
      "Japanese Nissan Note and Serena export",
      "Nissan e-POWER used cars Japan",
      "Nissan SUV and EV export stock"
    ],
    "faqs": [
      {
        "question": "Are all Nissan electrified vehicles fully electric?",
        "answer": "No. Nissan uses different powertrain architectures, including hybrids, e-POWER and battery-electric vehicles. Confirm the exact system and charging requirements from the selected vehicle's records."
      },
      {
        "question": "What should I check on a Nissan EV?",
        "answer": "Ask for the available battery-health or diagnostic evidence, charging specification, warning status and vehicle history. Confirm that the destination has compatible charging access and accepts the vehicle."
      },
      {
        "question": "How do I compare Nissan Serena and Note listings?",
        "answer": "They serve different body-style and passenger-use needs. Compare seating, doors, cargo space, generation, grade, powertrain and the exact condition of each available unit."
      },
      {
        "question": "Are shipping and local duties included in the advertised Nissan price?",
        "answer": "Not by default. Ask for a written quote that separates the vehicle/FOB price, freight, insurance, destination customs charges, clearance, port fees and registration."
      }
    ],
    "kind": "make",
    "seoTier": 1
  },
  "make:honda": {
    "title": "Honda Used Cars from Japan | Wazir Trading",
    "description": "Compare Japanese Honda hatchbacks, crossovers, sedans and MPVs by generation, grade, engine, hybrid system and photographed condition.",
    "intro": "Explore Honda vehicles from Japan, including compact passenger cars, crossovers and family-oriented MPVs represented in Wazir Trading's catalogue. Honda model names cover multiple generations and powertrain options, so use the precise model code, year, grade and vehicle record when comparing available stock.",
    "buyerGuide": "For each Honda listing, establish its model generation, chassis/model code, engine or hybrid system, transmission and grade. Compare the actual safety equipment and options shown for that unit; do not assume a feature is standard across all trims. For crossovers, check drivetrain and tyre condition. For MPVs, confirm seat count and configuration. Review photographs, mileage, condition notes and any available service or diagnostic evidence.",
    "focusPoints": [
      "Match the model generation, chassis/model code, year and grade to the vehicle documents.",
      "Verify engine, transmission and hybrid-system details from the exact listing.",
      "For crossovers and MPVs, confirm drivetrain, seating, cargo layout and safety equipment.",
      "Review mileage, condition evidence, photos, FOB terms and import rules for the destination."
    ],
    "searchThemes": [
      "Honda used cars from Japan",
      "Japanese Honda Vezel and Fit export",
      "Honda hybrid cars from Japan",
      "Honda family MPV export stock"
    ],
    "faqs": [
      {
        "question": "What should I compare between Honda grades?",
        "answer": "Compare the actual equipment list, safety features, interior specification, powertrain and options recorded for each vehicle. Grade names can vary by generation and market."
      },
      {
        "question": "How can I verify a Honda hybrid?",
        "answer": "Check the model code and powertrain documentation, then request any available battery or diagnostic information for the individual car. Do not assume all vehicles carrying a similar model badge use the same system."
      },
      {
        "question": "What details matter when importing a Honda Vezel or ZR-V?",
        "answer": "Confirm generation, drivetrain, engine/hybrid specification, grade, seating and safety equipment. Then check the destination's vehicle age, emissions, steering and import requirements for that exact version."
      },
      {
        "question": "Does the online Honda inventory guarantee a vehicle is still available?",
        "answer": "No. Stock changes as vehicles are sold or added. Confirm the reference number, current status, specification and final quotation with Wazir Trading before payment."
      }
    ],
    "kind": "make",
    "seoTier": 1
  },
  "make:suzuki": {
    "title": "Suzuki Used Cars from Japan | Wazir Trading",
    "description": "Browse Japanese Suzuki hatchbacks, compact cars and 4WD models. Compare engine size, grade, drivetrain, dimensions and current stock.",
    "intro": "Review Suzuki vehicles sourced from Japan, with an emphasis on matching the right compact-car, hatchback or 4WD configuration to the buyer's use. Japanese model grades and specifications can differ by year, so check the exact model code, engine size, transmission and vehicle equipment in each listing.",
    "buyerGuide": "Start with the vehicle's model code, engine displacement, year and grade. Verify whether it is two-wheel drive or four-wheel drive, and compare transmission, seating and dimensions. For compact or kei-class vehicles, ask the destination authority whether the engine capacity and vehicle classification are accepted and how that affects taxes or registration. Review tyre, underbody and body-condition photographs before committing.",
    "focusPoints": [
      "Confirm the model code, manufacture year, grade and engine displacement.",
      "Check 2WD/4WD configuration and transmission from the vehicle record.",
      "For kei or compact categories, confirm destination registration and import classification before purchase.",
      "Review tyres, underbody, mileage, photos, export scope and vehicle-specific documents."
    ],
    "searchThemes": [
      "Suzuki used cars from Japan",
      "Suzuki Swift and Wagon R export",
      "Japanese Suzuki 4WD vehicles",
      "Suzuki compact car imports"
    ],
    "faqs": [
      {
        "question": "How do I confirm a Suzuki's 4WD specification?",
        "answer": "Check the exact model code and drivetrain details in the vehicle listing and export documentation. Do not infer 4WD from the model name or appearance."
      },
      {
        "question": "Can every Suzuki kei car be registered in my country?",
        "answer": "No universal answer applies. Engine displacement, dimensions, age, safety rules and local vehicle classes differ by destination. Confirm eligibility with the destination authority before purchase."
      },
      {
        "question": "What should I inspect on a compact Suzuki?",
        "answer": "Review underbody and suspension photographs, tyres, cabin wear, warning indicators, mileage and the vehicle's grade. Ask for additional close-ups where an important area is unclear."
      },
      {
        "question": "Can Wazir Trading quote a delivered Suzuki price?",
        "answer": "A complete estimate needs the destination and service scope. The written quote should separate the vehicle price and Japan export costs from freight, insurance, local duties, clearance and registration."
      }
    ],
    "kind": "make",
    "seoTier": 1
  },
  "make:mazda": {
    "title": "Mazda Used Cars from Japan | Wazir Trading",
    "description": "Compare Japanese Mazda cars and SUVs by model generation, engine, grade, transmission, mileage and condition before requesting export pricing.",
    "intro": "Browse Mazda vehicles represented in Wazir Trading's Japanese inventory, from compact passenger cars to crossovers and SUVs. Mazda model names and grades cover different generations and powertrain combinations, so compare the complete vehicle designation and the specifications attached to each available unit.",
    "buyerGuide": "Verify the full model name, chassis/model code, model year, grade, engine and transmission. Where a listing has a diesel or other specialised powertrain, request available service and inspection evidence rather than assuming condition from mileage alone. For SUVs, check drivetrain, tyres, underbody and cargo/seating configuration. Use photographs and the individual equipment record to compare trims accurately.",
    "focusPoints": [
      "Confirm the exact model generation, chassis code, year and grade.",
      "Check engine/fuel type, transmission and drivetrain from the vehicle documents.",
      "Request service or diagnostic evidence where relevant to the selected powertrain.",
      "Compare mileage, condition photographs, equipment, FOB quote and destination requirements."
    ],
    "searchThemes": [
      "Mazda used cars from Japan",
      "Mazda Demio and CX-5 export",
      "Japanese Mazda cars for sale",
      "Mazda SUV import from Japan"
    ],
    "faqs": [
      {
        "question": "How should I compare Mazda model generations?",
        "answer": "Use the chassis/model code, manufacture year, body style and grade. Similar model names can cover different engines, transmissions and equipment between generations."
      },
      {
        "question": "What should I check on a Mazda diesel vehicle?",
        "answer": "Request any available service, inspection or diagnostic records for the individual vehicle. Review warning indicators, mileage, photographs and the condition information supplied by the seller."
      },
      {
        "question": "Does a Mazda grade guarantee a particular safety feature?",
        "answer": "No. Equipment can differ by year, market and package. Ask Wazir Trading to confirm the actual features recorded for the exact vehicle rather than relying on a generic grade summary."
      },
      {
        "question": "Can I use the Mazda page as a final vehicle quotation?",
        "answer": "No. The page is a browsing guide. Confirm the vehicle reference, current availability, export price, freight scope and destination costs in a written quotation."
      }
    ],
    "kind": "make",
    "seoTier": 1
  },
  "make:lexus": {
    "title": "Lexus Used Cars from Japan | Wazir Trading",
    "description": "Explore Japanese Lexus SUVs and luxury cars by model, generation, grade, powertrain and condition. Compare available stock and export details.",
    "intro": "Explore Lexus vehicles sourced from Japan, including premium SUVs and passenger cars represented in Wazir Trading's catalogue. Model generations, powertrains and equipment packages can differ significantly, so the individual vehicle specification and condition record should guide every comparison.",
    "buyerGuide": "Confirm the exact Lexus model, generation, grade, engine or hybrid system and equipment package. Review interior and exterior condition, mileage, warning indicators, safety and driver-assistance features, multimedia options and service information where available. For hybrid versions, request available battery or diagnostic evidence. Ensure the chosen trim and equipment are documented for the actual vehicle rather than inferred from the model family.",
    "focusPoints": [
      "Verify model generation, chassis/model code, grade and engine or hybrid system.",
      "Compare the actual safety, comfort and multimedia equipment documented for the unit.",
      "Request close-up interior/exterior photographs and any available service or diagnostic evidence.",
      "Confirm condition, FOB terms, export papers and destination import eligibility before payment."
    ],
    "searchThemes": [
      "Lexus used cars from Japan",
      "Japanese Lexus RX and NX export",
      "Lexus hybrid SUVs Japan",
      "Lexus luxury cars for export"
    ],
    "faqs": [
      {
        "question": "How do I compare Lexus trim levels?",
        "answer": "Check the exact grade and options shown in the individual listing, including safety, interior, multimedia and comfort equipment. Features can vary within the same model generation."
      },
      {
        "question": "What extra information should I request for a Lexus hybrid?",
        "answer": "Ask what battery-health, diagnostic and service evidence is available for that specific vehicle. No model-level description can certify the condition of an individual hybrid battery."
      },
      {
        "question": "Should I rely on a Lexus model's standard equipment list?",
        "answer": "Use it only as a starting point. Confirm the market, model year, grade, option package and actual vehicle record before assuming a feature is fitted."
      },
      {
        "question": "Are destination taxes included in a Lexus export price?",
        "answer": "Not automatically. Confirm whether freight, insurance, customs duties, taxes, port charges, clearance and registration are included or excluded in the written quotation."
      }
    ],
    "kind": "make",
    "seoTier": 1
  },
  "model:toyota/prius": {
    "title": "Toyota Prius from Japan | Hybrid Stock & Export | Wazir Trading",
    "description": "Compare Japanese Toyota Prius generations, hybrid systems, grades and condition. Review available cars, battery information and export details.",
    "intro": "Explore Toyota Prius vehicles sourced from Japan and compare the generation, model code, grade, hybrid-system specification and condition of each available car. Prius nameplates span multiple generations and equipment packages; use the exact vehicle record rather than assuming battery, safety or comfort features are identical.",
    "buyerGuide": "For a Prius, verify the chassis/model code, generation, manufacture year, grade and hybrid-system details. Request the battery or diagnostic information actually available for the individual vehicle, and review warning lights, mileage, service evidence and condition photographs. Confirm the transmission and equipment from the listing, then check that the vehicle's age, emissions and hybrid classification are accepted in the destination country.",
    "focusPoints": [
      "Identify the Prius generation and chassis/model code, not only the badge.",
      "Request available hybrid-battery, diagnostic and service records for the exact car.",
      "Check mileage, warning indicators, grade, equipment and body/cabin condition.",
      "Confirm destination age, emissions, hybrid and steering requirements before payment."
    ],
    "searchThemes": [
      "Toyota Prius for export from Japan",
      "used Toyota Prius Japan hybrid",
      "Japanese Prius auction stock",
      "Toyota Prius battery condition export"
    ],
    "faqs": [
      {
        "question": "Which Prius generation is shown in the listing?",
        "answer": "Check the model code and manufacture year on the individual vehicle record and export certificate. The name Prius alone does not identify its generation or exact powertrain."
      },
      {
        "question": "Can Wazir Trading guarantee the hybrid battery condition?",
        "answer": "No. Battery condition must be assessed from vehicle-specific diagnostic or inspection evidence where available. Request the evidence for the selected reference number before purchase."
      },
      {
        "question": "What should I compare between Prius grades?",
        "answer": "Compare safety equipment, cabin features, wheels, multimedia, mileage, condition and the actual options recorded for each car. Do not assume every grade includes the same features."
      },
      {
        "question": "Can I import a Prius to any of the 40 destination countries?",
        "answer": "Eligibility varies by destination, age, emissions, powertrain and permit rules. Check the exact vehicle against the destination's current regulations before arranging shipment."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/aqua": {
    "title": "Toyota Aqua from Japan | Hybrid Cars & Export | Wazir Trading",
    "description": "Browse Japanese Toyota Aqua hybrid cars by model year, grade, mileage and battery evidence. Compare matching stock and request export pricing.",
    "intro": "The Toyota Aqua is a compact hybrid model represented in Wazir Trading's Japanese vehicle catalogue. Compare each available Aqua by model code, year, grade, mileage and documented condition; the same model name can cover different updates and equipment, so review the actual vehicle details.",
    "buyerGuide": "Confirm the exact Aqua model code and generation, engine/hybrid specification, grade and manufacture date. Ask for any battery or diagnostic information available for that unit, and inspect warning indicators, mileage, tyres, cabin and body photographs. For export, confirm the destination's vehicle-age and hybrid requirements and request a written quote that separates the vehicle price from freight and destination charges.",
    "focusPoints": [
      "Match the Aqua model code, year and grade to the export certificate.",
      "Request available battery/diagnostic information; do not assume battery health from mileage.",
      "Compare tyres, body panels, interior, warning lights and condition records.",
      "Check destination hybrid eligibility, age limits, emissions rules and landed costs."
    ],
    "searchThemes": [
      "Toyota Aqua for sale from Japan",
      "used Toyota Aqua hybrid export",
      "Japanese Aqua hybrid stock",
      "Toyota Aqua battery check Japan"
    ],
    "faqs": [
      {
        "question": "Is every Toyota Aqua listing the same specification?",
        "answer": "No. Model update, chassis code, grade, equipment and condition can differ. Compare the complete details for each reference number."
      },
      {
        "question": "What battery information can I request?",
        "answer": "Ask Wazir Trading what diagnostic, inspection or service evidence is available for the selected unit. Do not treat general model information as a battery-health report."
      },
      {
        "question": "What destination checks matter for a Toyota Aqua?",
        "answer": "Confirm age, hybrid/electrical classification, emissions, steering and any local vehicle-category rules with the destination authority before purchase."
      },
      {
        "question": "Does the page show only cars currently available?",
        "answer": "The live matching-stock section is based on current inventory and qualifying vehicle records. Availability changes, so reconfirm the chosen reference before sending payment."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/sienta": {
    "title": "Toyota Sienta from Japan | Family MPV Export | Wazir Trading",
    "description": "Compare Japanese Toyota Sienta MPVs by generation, seats, grade, powertrain and condition. Browse matching stock and export information.",
    "intro": "Explore Toyota Sienta vehicles from Japan for buyers comparing compact family and multi-purpose vehicle layouts. Review each vehicle's generation, model code, seat configuration, grade and condition; seating and equipment should be verified on the actual unit rather than assumed from the Sienta name.",
    "buyerGuide": "Start with the exact model code, year and grade, then confirm the number and arrangement of seats, access doors and cargo space from the vehicle record and photographs. Check engine or hybrid specification, transmission, mileage and safety equipment. If passenger use is important, ask for clear cabin photographs and verify local rules for seat belts, passenger capacity and registration category.",
    "focusPoints": [
      "Confirm model generation, chassis code, year and grade.",
      "Verify seat count, seat layout, door operation and cargo configuration on the exact unit.",
      "Check engine/hybrid details, transmission, mileage and safety equipment.",
      "Confirm the destination's passenger-vehicle age, seating and registration rules."
    ],
    "searchThemes": [
      "Toyota Sienta used cars Japan",
      "Japanese Toyota Sienta MPV export",
      "Toyota Sienta family car from Japan",
      "Toyota Sienta seating configuration"
    ],
    "faqs": [
      {
        "question": "How many seats does the listed Sienta have?",
        "answer": "Use the individual vehicle specification and cabin photographs. Seating configuration may vary by grade and market; confirm the exact registered capacity before purchase."
      },
      {
        "question": "Is every Sienta a hybrid?",
        "answer": "No. Confirm the powertrain and model code from the vehicle-specific record rather than assuming a hybrid system based on the nameplate."
      },
      {
        "question": "What should I inspect on a family Sienta?",
        "answer": "Check sliding-door operation, seat condition, seat belts, cabin wear, cargo layout, warning indicators and body photographs. Ask for additional images if any detail is unclear."
      },
      {
        "question": "Does Wazir Trading arrange delivery to my country?",
        "answer": "Shipping options depend on destination and carrier availability. Request a written quotation stating port, freight method, insurance, destination charges and whether local delivery is included."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/voxy": {
    "title": "Toyota Voxy from Japan | Family Minivan Export | Wazir Trading",
    "description": "Compare Japanese Toyota Voxy minivans by generation, seating layout, hybrid or petrol specification, grade and condition.",
    "intro": "Browse Toyota Voxy minivans sourced from Japan and compare the cabin layout, model generation, grade and powertrain recorded for each available vehicle. A Voxy listing should be assessed as an individual family or passenger-use vehicle, with seating, access and condition checked before a purchase decision.",
    "buyerGuide": "Verify the model/chassis code, year and grade, then confirm seating capacity and layout, door configuration and cargo flexibility from the actual car. Check whether the vehicle is petrol or hybrid, and request relevant diagnostic information where applicable. Review tyres, suspension, cabin condition, warning indicators and photographs. Confirm local passenger registration, seat-belt and vehicle-age rules before export.",
    "focusPoints": [
      "Verify model code, generation, year and trim.",
      "Confirm seat capacity, layout, sliding-door operation and cargo space.",
      "Check the specific petrol/hybrid powertrain, transmission and any diagnostic evidence available.",
      "Review condition, mileage, photographs, destination regulations and written shipping terms."
    ],
    "searchThemes": [
      "Toyota Voxy from Japan",
      "used Toyota Voxy minivan export",
      "Japanese Voxy hybrid stock",
      "Toyota Voxy family vehicle"
    ],
    "faqs": [
      {
        "question": "What seating layout is fitted to this Voxy?",
        "answer": "Confirm the seat count and arrangement from the listing, registration/export papers and cabin photographs; do not infer it from another Voxy grade."
      },
      {
        "question": "How do petrol and hybrid Voxy versions differ?",
        "answer": "The powertrain and model code must be checked on each vehicle. Ask for the exact engine/hybrid specification and any diagnostic evidence available."
      },
      {
        "question": "What should I check before importing a Voxy for passenger use?",
        "answer": "Verify the destination's vehicle age, passenger capacity, seat-belt, safety and registration requirements, then compare the exact vehicle's documents and cabin condition."
      },
      {
        "question": "Are port charges included in the Voxy stock price?",
        "answer": "The stock price is not necessarily a delivered price. Ask for a written breakdown of FOB, freight, insurance, port handling, customs, clearance and local delivery."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/alphard": {
    "title": "Toyota Alphard from Japan | Premium MPV Export | Wazir Trading",
    "description": "Explore Japanese Toyota Alphard MPVs by generation, grade, seating, powertrain and cabin condition. Check matching export stock.",
    "intro": "Explore Toyota Alphard vehicles sourced from Japan, a premium multi-purpose vehicle range with several generations and interior configurations. Compare the exact model code, grade, seat arrangement and condition of each car; luxury equipment, powertrain and cabin features should be confirmed from the selected vehicle's records.",
    "buyerGuide": "For an Alphard, inspect the interior as carefully as the exterior. Confirm seat count and configuration, upholstery, powered doors or seats where listed, multimedia and safety equipment. Check model year, chassis code, engine or hybrid specification, mileage and warning indicators. Request close-up photographs of seats, trim, door mechanisms and dashboard. Confirm the destination's vehicle age, engine-capacity, passenger and luxury-vehicle tax treatment.",
    "focusPoints": [
      "Identify the exact Alphard generation, chassis code, year and grade.",
      "Confirm the cabin layout, seat condition and each powered/convenience feature from the unit's details.",
      "Verify engine/hybrid specification, mileage, warning lights and service information available.",
      "Check destination vehicle-age, passenger-use, engine and tax classification before payment."
    ],
    "searchThemes": [
      "Toyota Alphard from Japan",
      "used Toyota Alphard hybrid export",
      "Japanese Alphard premium minivan",
      "Toyota Alphard auction stock"
    ],
    "faqs": [
      {
        "question": "Are all Alphard vehicles equipped with the same seating and luxury features?",
        "answer": "No. Cabin layouts, grades and options vary. Confirm the actual seating configuration and equipment in the selected vehicle record and photographs."
      },
      {
        "question": "What should I inspect inside a used Alphard?",
        "answer": "Review seat upholstery, rails and adjustment, powered doors, dashboard warning lights, multimedia, headlining, trim and evidence of heavy passenger use."
      },
      {
        "question": "How can I confirm an Alphard hybrid?",
        "answer": "Check the vehicle's model/chassis code and powertrain details, and request available diagnostic or battery evidence for that unit."
      },
      {
        "question": "Can Wazir Trading calculate all destination taxes for an Alphard?",
        "answer": "A destination-specific assessment is needed because age, engine, value and passenger/luxury classification can affect charges. The export quote should clearly state which local costs are excluded."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/land-cruiser": {
    "title": "Toyota Land Cruiser from Japan | 4x4 Export | Wazir Trading",
    "description": "Compare Japanese Toyota Land Cruiser 4x4s by series, chassis, drivetrain, engine, grade and underbody condition before export.",
    "intro": "Browse Toyota Land Cruiser vehicles from Japan for buyers who need to compare large SUVs and four-wheel-drive configurations. The Land Cruiser name spans multiple series and equipment levels, so confirm the exact chassis, generation, drivetrain and condition of each available unit rather than assuming all models share the same capability or dimensions.",
    "buyerGuide": "Confirm the series/chassis code, year, engine, transmission, drivetrain and grade. Check whether the specific vehicle has the intended 4WD configuration and equipment, then examine underbody, frame, suspension, tyres, spare wheel, cooling system evidence and signs of off-road or towing use. Verify seating, dimensions and any modifications from photographs and documents. For export, check weight, emissions, age, steering and destination requirements.",
    "focusPoints": [
      "Identify the exact Land Cruiser series/chassis and model year.",
      "Verify the 4WD system, engine, transmission and equipment recorded for that unit.",
      "Inspect frame, underbody, suspension, tyres and signs of demanding use or modification.",
      "Confirm vehicle dimensions, weight, emissions, age and import approval for the destination."
    ],
    "searchThemes": [
      "Toyota Land Cruiser from Japan",
      "used Land Cruiser 4x4 export",
      "Japanese Land Cruiser SUV stock",
      "Toyota Land Cruiser chassis series"
    ],
    "faqs": [
      {
        "question": "Are all Land Cruiser models the same size and specification?",
        "answer": "No. The name covers different series, body sizes, chassis and equipment. Confirm the exact model code and specification for the selected unit."
      },
      {
        "question": "What is most important when inspecting a used Land Cruiser?",
        "answer": "Review underbody and frame photographs, suspension, tyres, leaks, warning indicators and evidence of off-road or towing use. Request additional inspection information when available."
      },
      {
        "question": "Can I assume a Land Cruiser is four-wheel drive?",
        "answer": "Do not rely on the badge alone. Verify the exact drivetrain and transfer-system details from the vehicle record and export documentation."
      },
      {
        "question": "What should I check before shipping a Land Cruiser overseas?",
        "answer": "Confirm manufacture age, emissions, dimensions/weight, steering side and destination vehicle category with local authorities before paying or arranging shipment."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/yaris": {
    "title": "Toyota Yaris from Japan | Hatchback & Export Stock | Wazir Trading",
    "description": "Compare Toyota Yaris vehicles from Japan by generation, body style, grade, engine and condition. Browse matching cars and export terms.",
    "intro": "Explore Toyota Yaris vehicles from Japan and distinguish the exact generation, body configuration and specification before comparing price. Yaris naming can cover different model and powertrain versions across markets; the chassis/model code and export documents should determine which vehicle is being offered.",
    "buyerGuide": "Confirm whether the vehicle is the hatchback or another Yaris-branded configuration, then check the model code, year, grade, engine or hybrid system, transmission and drivetrain. Review the safety equipment and cabin features fitted to the exact trim. Compare mileage, tyres, panels, interior wear and condition photographs, and check that the destination accepts the vehicle's manufacture age, engine and emissions specification.",
    "focusPoints": [
      "Match Yaris model code, body configuration, generation and manufacture year.",
      "Verify engine/hybrid system, transmission, drivetrain and grade.",
      "Compare safety equipment, mileage, cabin/body condition and available inspection records.",
      "Check destination age, emissions, steering and compact-car classification requirements."
    ],
    "searchThemes": [
      "Toyota Yaris used cars Japan",
      "Toyota Yaris hatchback export",
      "Japanese Yaris hybrid and petrol cars",
      "Toyota Yaris auction vehicles"
    ],
    "faqs": [
      {
        "question": "Is every Toyota Yaris the same body style?",
        "answer": "No. Yaris naming and body configurations can differ by market and generation. Confirm the exact vehicle body and model code from the listing and export papers."
      },
      {
        "question": "How do I identify a Yaris hybrid?",
        "answer": "Check the model code and powertrain specification for the selected car. Ask for any available diagnostic evidence rather than inferring the system from its badge."
      },
      {
        "question": "Which features should I compare between Yaris grades?",
        "answer": "Check safety equipment, multimedia, interior trim, wheels, transmission and options as actually listed for each unit."
      },
      {
        "question": "Can I import any Yaris to my country?",
        "answer": "No. Destination rules may depend on manufacture age, engine, emissions, steering and body classification. Verify the exact vehicle before purchase."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/raize": {
    "title": "Toyota Raize from Japan | Compact SUV Export | Wazir Trading",
    "description": "Browse Toyota Raize compact SUVs from Japan by model code, grade, engine, drivetrain and condition. Compare matching stock.",
    "intro": "Compare Toyota Raize compact SUVs sourced from Japan using the exact year, model code, grade and powertrain recorded for each vehicle. Model updates and equipment can differ, so check the individual specification and photographs instead of assuming every Raize has the same engine, drivetrain or safety package.",
    "buyerGuide": "Verify the model code, manufacture year, grade, engine and transmission, and establish whether the selected unit is two-wheel or four-wheel drive. Compare cabin and cargo needs, safety equipment, tyres, underbody, mileage and body condition. Ask for details about any driver-assistance features shown in the listing and confirm the destination's emissions, age and vehicle classification requirements.",
    "focusPoints": [
      "Confirm Raize generation/model code, year and exact grade.",
      "Check engine, transmission and 2WD/4WD configuration.",
      "Verify actual safety features and options from the vehicle record, not a generic brochure.",
      "Review tyres, underbody, condition photos, mileage and local import rules."
    ],
    "searchThemes": [
      "Toyota Raize from Japan",
      "used Toyota Raize compact SUV",
      "Japanese Raize export stock",
      "Toyota Raize model code grade"
    ],
    "faqs": [
      {
        "question": "Is a Toyota Raize always four-wheel drive?",
        "answer": "No. Check the exact drivetrain and model code in the vehicle record; do not infer 4WD from the SUV body style."
      },
      {
        "question": "Do all Raize grades have the same safety equipment?",
        "answer": "No. Equipment can vary by grade, model year and options. Confirm the specific features fitted to the selected vehicle."
      },
      {
        "question": "What should I inspect on a compact SUV?",
        "answer": "Review tyres, wheel/underbody area, suspension, body panels, cabin, mileage and warning indicators. Ask for additional photos if a key area is not visible."
      },
      {
        "question": "Does a Raize stock price include destination registration?",
        "answer": "No assumption should be made. Confirm whether the quotation includes only the vehicle/export scope or also freight, customs, port charges, inspection and local registration."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/rav4": {
    "title": "Toyota RAV4 from Japan | SUV & Hybrid Export | Wazir Trading",
    "description": "Compare Japanese Toyota RAV4 SUVs by generation, hybrid or petrol system, drivetrain, grade and vehicle condition.",
    "intro": "Explore Toyota RAV4 vehicles from Japan and compare the generation, body configuration, engine or hybrid system and drivetrain shown for each unit. The RAV4 name spans multiple updates and grades; use its model code and the actual listing details to distinguish the vehicle before requesting a quote.",
    "buyerGuide": "Confirm model code, year, grade, engine/powertrain and whether the unit is 2WD or 4WD. For hybrid versions, request the available battery or diagnostic information. Review seating and cargo space, safety equipment, tyres, underbody, mileage and condition photos. Check the destination's age, emissions, fuel-economy or hybrid eligibility rules for the exact model year and engine.",
    "focusPoints": [
      "Verify RAV4 generation, model code, year and equipment grade.",
      "Confirm petrol/hybrid powertrain and 2WD/4WD configuration.",
      "For hybrids, request vehicle-specific battery or diagnostic evidence where available.",
      "Review tyres, underbody, safety features, condition and destination regulations."
    ],
    "searchThemes": [
      "Toyota RAV4 from Japan",
      "used Toyota RAV4 SUV export",
      "Toyota RAV4 hybrid Japan",
      "Japanese RAV4 4WD stock"
    ],
    "faqs": [
      {
        "question": "Are all RAV4 listings hybrid?",
        "answer": "No. The powertrain varies by year and configuration. Check the exact vehicle record and documents for the engine/hybrid system."
      },
      {
        "question": "How do I verify a RAV4's 4WD specification?",
        "answer": "Use the model code and drivetrain information documented for the exact unit. Ask for clarification if the listing does not identify the drive configuration."
      },
      {
        "question": "What should I inspect on a used RAV4?",
        "answer": "Check underbody, tyres, suspension, body panels, cabin wear, warning indicators and available service/inspection evidence."
      },
      {
        "question": "What destination requirements matter for RAV4 hybrids?",
        "answer": "Check vehicle age, emissions, hybrid classification, steering and any local registration or battery-related rules with the destination authority."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/hilux": {
    "title": "Toyota Hilux from Japan | Pickup Truck Export | Wazir Trading",
    "description": "Compare Japanese Toyota Hilux pickups by cab, bed, chassis, engine, drivetrain, payload evidence and commercial import rules.",
    "intro": "Browse Toyota Hilux pickups from Japan for buyers comparing utility, commercial and personal-use configurations. Cab type, cargo-bed layout, chassis, engine and drivetrain can vary, so identify the exact vehicle and rated capacities from its documents before comparing suitability or price.",
    "buyerGuide": "Confirm the model/chassis code, manufacture year, cab and bed configuration, engine, transmission, drivetrain and steering side. Request the documented gross vehicle weight and payload or load rating where available rather than estimating from appearance. Inspect chassis rails, bed, underbody, suspension, tyres, brakes and evidence of heavy work or modification. Check the destination's commercial-vehicle age, emissions, weight and registration category.",
    "focusPoints": [
      "Verify Hilux generation, chassis, cab configuration and cargo-bed dimensions.",
      "Check engine, transmission, 2WD/4WD and documented weight/payload data.",
      "Inspect chassis, underbody, suspension, brakes, tyres and bed condition.",
      "Confirm commercial/pickup import rules, weight classification, duties and shipping dimensions."
    ],
    "searchThemes": [
      "Toyota Hilux from Japan",
      "used Toyota Hilux pickup export",
      "Japanese Hilux 4x4 truck",
      "Toyota Hilux cab and chassis Japan"
    ],
    "faqs": [
      {
        "question": "Does the Hilux listing include a payload rating?",
        "answer": "Only rely on a rating documented for the exact vehicle. Ask for the manufacturer plate or vehicle papers and confirm the destination's registration category."
      },
      {
        "question": "How do I compare Hilux cab styles?",
        "answer": "Confirm single, extra or double cab configuration from the vehicle details and photographs, then check seating and cargo-bed dimensions against your intended use."
      },
      {
        "question": "What should I inspect on a used Hilux pickup?",
        "answer": "Pay close attention to chassis rails, underbody, bed, suspension, tyres, brakes and evidence of towing, load use or modifications."
      },
      {
        "question": "Are pickup import rules the same as passenger-car rules?",
        "answer": "Not necessarily. Weight, body style and commercial classification may change age, permit and tax treatment. Verify the exact vehicle category with the destination authority."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/corolla-fielder": {
    "title": "Toyota Corolla Fielder from Japan | Wagon Export | Wazir Trading",
    "description": "Compare Japanese Toyota Corolla Fielder wagons by year, grade, cargo layout, engine and hybrid specification and condition.",
    "intro": "Explore Toyota Corolla Fielder station wagons from Japan and compare the exact generation, chassis code, grade and powertrain. The wagon body and cargo area make dimensions and condition important; verify the vehicle's actual specification and photographs rather than assuming equipment or capacity from the model name.",
    "buyerGuide": "Check model code, year, engine or hybrid specification, transmission and trim. Review rear-seat folding and cargo-area layout, door and tailgate condition, upholstery, floor wear and any signs of commercial use. For hybrid variants, request available diagnostic information. Confirm cargo dimensions where important, and check the destination's age, emissions, steering and vehicle-category rules.",
    "focusPoints": [
      "Confirm generation, chassis/model code, manufacture year and grade.",
      "Verify petrol/hybrid system, transmission and drivetrain from the records.",
      "Inspect cargo floor, rear seats, tailgate, cabin wear and body condition.",
      "Check destination age, emissions and wagon classification requirements."
    ],
    "searchThemes": [
      "Toyota Corolla Fielder from Japan",
      "used Corolla Fielder wagon export",
      "Toyota Fielder hybrid Japan",
      "Japanese Corolla Fielder stock"
    ],
    "faqs": [
      {
        "question": "Is the Corolla Fielder the same as every Corolla wagon?",
        "answer": "Not necessarily. Confirm the exact model name, chassis code, generation and body type on the individual vehicle and export documents."
      },
      {
        "question": "How should I assess the cargo area?",
        "answer": "Check floor condition, rear-seat folding, tailgate operation, interior trim and the actual dimensions if they matter to your load."
      },
      {
        "question": "Are Corolla Fielder hybrids available?",
        "answer": "The catalogue may include differing powertrains. Check the exact engine/hybrid designation and request any available diagnostic evidence for the selected car."
      },
      {
        "question": "Can the Fielder be imported for commercial use?",
        "answer": "That depends on the destination's classification and the vehicle's age, use and specification. Confirm the local rules before purchase."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/prius-a": {
    "title": "Toyota Prius Alpha from Japan | Hybrid Wagon Export | Wazir Trading",
    "description": "Compare Toyota Prius Alpha wagons from Japan by seating, hybrid system, grade, battery evidence and cargo condition.",
    "intro": "Browse Toyota Prius Alpha vehicles sourced from Japan, comparing the wagon-style body, seating configuration, grade and hybrid specification shown for each unit. Confirm whether a selected vehicle has the passenger and cargo arrangement you need, as equipment and seating can differ by version.",
    "buyerGuide": "Check chassis/model code, manufacture year, grade, powertrain and exact seating capacity from registration/export records. Request any available hybrid-battery and diagnostic evidence, then review warning indicators, mileage and service history where supplied. Inspect the rear seats, cargo floor, tailgate, cabin and body photographs. Verify destination rules for hybrid vehicles and passenger capacity.",
    "focusPoints": [
      "Confirm Prius Alpha generation, model code, grade and seating capacity.",
      "Verify hybrid system and request available battery/diagnostic evidence for the vehicle.",
      "Review rear-seat/cargo configuration, mileage, warning lights and condition photos.",
      "Check local hybrid, passenger-capacity, age and emissions rules before export."
    ],
    "searchThemes": [
      "Toyota Prius Alpha from Japan",
      "used Prius Alpha hybrid wagon",
      "Japanese Prius Alpha export",
      "Prius Alpha seven seat specification"
    ],
    "faqs": [
      {
        "question": "How many seats are fitted to a Prius Alpha?",
        "answer": "Confirm the exact seat count on the vehicle record and export documents. Do not assume the same seating arrangement across all versions."
      },
      {
        "question": "What hybrid checks should I request?",
        "answer": "Ask what battery, diagnostic and inspection evidence is available for the selected unit. General model information cannot certify the battery condition."
      },
      {
        "question": "How does the Prius Alpha differ for cargo use?",
        "answer": "Inspect the rear-seat configuration, folded-seat area, cargo floor and tailgate access on the actual vehicle; verify dimensions where load space is important."
      },
      {
        "question": "Do destination countries treat Prius Alpha as a standard passenger car?",
        "answer": "Classification can vary by local rules and seating configuration. Ask the destination authority or licensed agent to confirm its exact category and applicable taxes."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/premio": {
    "title": "Toyota Premio from Japan | Sedan Export & Stock | Wazir Trading",
    "description": "Compare Japanese Toyota Premio sedans by generation, grade, engine, transmission, mileage and documented condition.",
    "intro": "Explore Toyota Premio sedans sourced from Japan and compare the generation, grade, engine, transmission and condition of each vehicle. Similar-looking Premio listings can vary in engine, cabin equipment and model year, so use the full model code and individual vehicle details before deciding.",
    "buyerGuide": "Confirm the chassis/model code, manufacture year, trim, engine displacement, transmission and steering side. Compare safety equipment, interior features, mileage, tyre condition and any auction or inspection notes. Request clear photos of the exterior panels, underside and cabin. Check the destination's age, engine-capacity, emissions and sedan-registration requirements before requesting a final landed-cost estimate.",
    "focusPoints": [
      "Verify Premio generation, chassis code, year and trim.",
      "Check engine capacity, fuel type, transmission and steering side.",
      "Compare safety equipment, mileage, tyres, interior and condition photographs.",
      "Confirm age, engine/emissions and registration rules in the destination."
    ],
    "searchThemes": [
      "Toyota Premio from Japan",
      "used Toyota Premio sedan export",
      "Japanese Premio auction stock",
      "Toyota Premio grade and engine"
    ],
    "faqs": [
      {
        "question": "How do I identify the correct Premio generation?",
        "answer": "Check the model/chassis code and manufacture year in the listing and export documents. Do not rely on appearance alone."
      },
      {
        "question": "Which engine details should I confirm?",
        "answer": "Verify displacement, fuel type and transmission from the individual record because specifications differ between grades and model years."
      },
      {
        "question": "What should I inspect before buying a Premio?",
        "answer": "Review mileage, body panels, underbody, tyres, cabin wear, warning lights and any available auction/inspection report."
      },
      {
        "question": "Is the Premio suitable for every destination?",
        "answer": "Import eligibility varies by age, engine, emissions, steering and local category rules. Confirm the exact vehicle with the destination authority."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:nissan/note": {
    "title": "Nissan Note from Japan | Compact Car & e-POWER Export | Wazir Trading",
    "description": "Browse Japanese Nissan Note cars by generation, petrol or e-POWER system, grade, diagnostics and condition before export.",
    "intro": "Explore Nissan Note compact cars sourced from Japan and compare generation, model code, grade, powertrain and condition. Different Note versions can use different propulsion systems and equipment, so the badge alone is not enough to establish how a particular car operates.",
    "buyerGuide": "Confirm the Note generation and chassis code, then identify whether the vehicle is conventional petrol, hybrid/e-POWER or another documented configuration. Check the engine, transmission, grade, mileage and safety equipment. For electrified versions, request the available diagnostic and battery information. Review cabin, body, tyres and warning indicators, and check destination age, emissions and powertrain rules.",
    "focusPoints": [
      "Match Note model code, generation, year and grade to the documents.",
      "Confirm petrol or e-POWER/hybrid specification; do not confuse powertrain types.",
      "For electrified cars, request available battery/diagnostic evidence and charging/system details where relevant.",
      "Review mileage, safety equipment, condition photographs and destination eligibility."
    ],
    "searchThemes": [
      "Nissan Note from Japan",
      "used Nissan Note e-POWER export",
      "Japanese Nissan Note petrol hybrid",
      "Nissan Note auction stock"
    ],
    "faqs": [
      {
        "question": "Is the Nissan Note e-POWER a fully electric car?",
        "answer": "Do not classify it by the word electric in marketing copy. Confirm the actual powertrain architecture and vehicle specification from the selected car's documents."
      },
      {
        "question": "What should I check on an e-POWER Note?",
        "answer": "Request available powertrain diagnostics, battery information and warning-light status. Confirm the model code and exact system fitted to that unit."
      },
      {
        "question": "Do Note grades have identical safety equipment?",
        "answer": "No. Confirm the actual features and options recorded for the selected year and grade, rather than relying on a general grade description."
      },
      {
        "question": "Can I import a Nissan Note to my country?",
        "answer": "Check manufacture age, emissions, steering, hybrid classification and any local permit requirements for the exact vehicle before purchase."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:nissan/serena": {
    "title": "Nissan Serena from Japan | Family MPV & Export Stock | Wazir Trading",
    "description": "Compare Nissan Serena family MPVs from Japan by generation, seating, e-POWER or petrol system, grade and condition.",
    "intro": "Browse Nissan Serena family MPVs sourced from Japan and compare seating layout, generation, powertrain, grade and condition. The Serena range includes different updates and configurations, so confirm the exact cabin capacity and vehicle specification before choosing a car for family or passenger use.",
    "buyerGuide": "Verify the model/chassis code, year and grade, then confirm the actual seat count and arrangement, door operation and cargo flexibility. Check whether the powertrain is petrol or e-POWER/hybrid and request diagnostics where available. Inspect tyres, suspension, cabin, sliding doors, warning indicators and body photographs. Verify local requirements for passenger capacity, seat belts, age and vehicle registration.",
    "focusPoints": [
      "Confirm Serena model code, generation, grade and exact seat capacity.",
      "Inspect sliding-door operation, seat rails, seat belts, cabin and cargo arrangement.",
      "Verify petrol/e-POWER or hybrid specification and available diagnostic information.",
      "Check destination passenger-vehicle, age, emissions and registration rules."
    ],
    "searchThemes": [
      "Nissan Serena from Japan",
      "used Nissan Serena MPV export",
      "Nissan Serena e-POWER Japan",
      "Japanese Serena family van"
    ],
    "faqs": [
      {
        "question": "How many seats does a Nissan Serena have?",
        "answer": "Confirm the exact capacity and seat arrangement in the selected vehicle's details and documents. Configuration can vary between versions."
      },
      {
        "question": "Are all Serena models e-POWER?",
        "answer": "No. Powertrain options vary by generation and vehicle. Check the model code and engine/system specification for the exact listing."
      },
      {
        "question": "What should I inspect on a used Serena?",
        "answer": "Check sliding doors, seats, seat belts, cabin wear, rear climate equipment where listed, tyres, suspension and warning indicators."
      },
      {
        "question": "Can the Serena be imported as a passenger van?",
        "answer": "That depends on destination rules for seat capacity, vehicle age, emissions and registration category. Obtain confirmation before shipment."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:nissan/march": {
    "title": "Nissan March from Japan | Compact Hatchback Export | Wazir Trading",
    "description": "Browse Japanese Nissan March hatchbacks by year, engine, grade, transmission and condition. Compare available stock and export costs.",
    "intro": "Explore Nissan March compact hatchbacks sourced from Japan and compare each vehicle's generation, model code, grade, engine and condition. A March nameplate does not describe the full specification; use the export certificate and individual vehicle record to verify the exact model.",
    "buyerGuide": "Confirm the chassis/model code, manufacture year, engine capacity, transmission, steering side and grade. Review mileage, tyres, brakes, cabin wear, body panels and the actual equipment list. Ask for close-up photographs of any unclear damage or repairs. Check the destination's age, emissions, engine and compact-car category requirements before paying.",
    "focusPoints": [
      "Verify March generation, chassis code, year and exact grade.",
      "Check engine size, transmission, steering side and documented equipment.",
      "Review mileage, tyres, brakes, cabin and body condition photographs.",
      "Confirm destination age, emissions, customs classification and registration rules."
    ],
    "searchThemes": [
      "Nissan March from Japan",
      "used Nissan March hatchback export",
      "Japanese Nissan March stock",
      "Nissan March model code and grade"
    ],
    "faqs": [
      {
        "question": "Which Nissan March generation is listed?",
        "answer": "Use the model code and manufacture year in the individual listing and export papers to confirm the generation."
      },
      {
        "question": "What should I compare between March grades?",
        "answer": "Check engine, transmission, safety equipment, multimedia, trim and any options actually recorded for each unit."
      },
      {
        "question": "Can I use the odometer alone to judge a March's condition?",
        "answer": "No. Compare mileage with inspection/auction information, service evidence, interior wear, tyres and photographs. Ask for clarification if records do not align."
      },
      {
        "question": "Are destination duties included in the March price?",
        "answer": "Not automatically. Confirm the vehicle/FOB amount separately from freight, insurance, customs charges, clearance, port and registration costs."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:honda/vezel": {
    "title": "Honda Vezel from Japan | SUV & Hybrid Export | Wazir Trading",
    "description": "Compare Japanese Honda Vezel crossovers by generation, petrol or hybrid system, grade, diagnostics and condition.",
    "intro": "Browse Honda Vezel crossovers sourced from Japan and compare generation, model code, body specification, powertrain and grade. The Vezel has different model updates and powertrain configurations; verify the exact vehicle before assessing equipment, condition or import eligibility.",
    "buyerGuide": "Confirm the Vezel model code and generation, year, grade, engine/hybrid system and transmission. Check drivetrain and safety equipment from the selected vehicle record. For hybrid versions, request available battery or diagnostic information. Review tyres, underbody, cabin, warning lights, mileage and service information, and check destination age, emissions and hybrid regulations.",
    "focusPoints": [
      "Identify the Vezel generation, model code, manufacture year and grade.",
      "Verify petrol/hybrid configuration, transmission and drivetrain.",
      "Request available battery/diagnostic evidence for a hybrid vehicle.",
      "Review safety equipment, tyres, underbody, mileage and destination requirements."
    ],
    "searchThemes": [
      "Honda Vezel from Japan",
      "used Honda Vezel hybrid export",
      "Japanese Vezel SUV stock",
      "Honda Vezel model generation grade"
    ],
    "faqs": [
      {
        "question": "Are all Honda Vezel vehicles hybrid?",
        "answer": "No. Confirm the powertrain and model code for the exact unit; the nameplate alone does not identify the system."
      },
      {
        "question": "What battery evidence can I request for a Vezel hybrid?",
        "answer": "Ask what inspection, service or diagnostic information is available for the selected vehicle. Battery condition must not be inferred from model year alone."
      },
      {
        "question": "How do I check the Vezel's grade and safety features?",
        "answer": "Verify the exact trim and feature list from the individual record and ask for clarification if a specific driver-assistance feature is important."
      },
      {
        "question": "Will a Japanese Vezel meet my country's import rules?",
        "answer": "Check manufacture age, emissions, steering, hybrid classification and safety requirements for the exact vehicle with the destination authority."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:honda/zr-v": {
    "title": "Honda ZR-V from Japan | Crossover SUV Export | Wazir Trading",
    "description": "Explore Japanese Honda ZR-V crossovers by model year, grade, powertrain, drivetrain and condition. Review matching export stock.",
    "intro": "Explore Honda ZR-V crossover listings from Japan and compare the exact model year, trim, powertrain and equipment recorded for each vehicle. Model specifications can differ between variants and updates, so use the individual record to confirm drivetrain, safety features and condition.",
    "buyerGuide": "Confirm the model code, year, grade, engine or hybrid specification, transmission and drivetrain. Check which safety and driver-assistance features are actually fitted, rather than assuming they are standard. Review cabin and cargo needs, tyres, underbody photographs, mileage and condition evidence. Confirm destination emissions, steering, vehicle-age and registration conditions before purchase.",
    "focusPoints": [
      "Verify ZR-V model code, year, grade and exact powertrain.",
      "Check transmission, drivetrain and the actual driver-assistance/safety equipment.",
      "Review tyres, underbody, cabin, cargo area and condition evidence.",
      "Confirm destination age, emissions, steering and crossover classification."
    ],
    "searchThemes": [
      "Honda ZR-V from Japan",
      "used Honda ZR-V crossover export",
      "Japanese Honda ZR-V stock",
      "Honda ZR-V grade powertrain"
    ],
    "faqs": [
      {
        "question": "How do I confirm which ZR-V powertrain is listed?",
        "answer": "Check the model code and vehicle documents for the exact engine or hybrid system. Ask for clarification if the listing is incomplete."
      },
      {
        "question": "Are all ZR-V driver-assistance features standard?",
        "answer": "No assumption should be made. Check the exact year, grade and options recorded for the individual vehicle."
      },
      {
        "question": "What should I inspect before importing a ZR-V?",
        "answer": "Review body panels, wheels, tyres, underbody, cabin, warning lights, mileage and available inspection evidence."
      },
      {
        "question": "Can I use the ZR-V page as a registration confirmation?",
        "answer": "No. It is a buying guide. The destination authority decides admissibility, emissions conformity and registration eligibility for the exact vehicle."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:suzuki/swift": {
    "title": "Suzuki Swift from Japan | Hatchback Export & Stock | Wazir Trading",
    "description": "Compare Japanese Suzuki Swift hatchbacks by generation, engine, hybrid option, transmission, grade and condition before export.",
    "intro": "Browse Suzuki Swift compact hatchbacks sourced from Japan and compare generation, model code, grade and condition. The Swift name covers different model updates and powertrain configurations, so verify the precise engine, transmission and drivetrain on each available vehicle.",
    "buyerGuide": "Confirm model code, year, grade, engine displacement, fuel system and transmission. Check whether the vehicle has a mild-hybrid or other electrified system only where documented. Review steering side, tyres, brakes, cabin wear, body panels and mileage. Check the destination's engine-capacity, age, emissions and compact-car classification requirements before arranging shipment.",
    "focusPoints": [
      "Verify Swift generation, chassis/model code, manufacture year and grade.",
      "Confirm engine displacement, transmission, drivetrain and any documented hybrid system.",
      "Review tyres, brakes, body panels, cabin and mileage against available condition evidence.",
      "Check destination age, engine, emissions and registration rules."
    ],
    "searchThemes": [
      "Suzuki Swift from Japan",
      "used Suzuki Swift hatchback export",
      "Japanese Suzuki Swift hybrid",
      "Suzuki Swift auction stock Japan"
    ],
    "faqs": [
      {
        "question": "Are all Suzuki Swift vehicles hybrid?",
        "answer": "No. Powertrain specifications vary. Confirm the exact engine/system and model code in the selected car's documents."
      },
      {
        "question": "What does the listing's Swift grade include?",
        "answer": "Check the actual equipment and options recorded for that year and trim. Similar grade labels may differ between generations."
      },
      {
        "question": "What should I inspect on a compact Swift?",
        "answer": "Review tyres, brakes, suspension, underbody, body panels, cabin wear and warning indicators, along with any available inspection report."
      },
      {
        "question": "Can the Swift be imported as a small car in every destination?",
        "answer": "No. Age, engine displacement, emissions, steering and vehicle-category rules vary by country. Confirm eligibility before purchase."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:suzuki/wagon-r": {
    "title": "Suzuki Wagon R from Japan | Compact Tall Wagon Export | Wazir Trading",
    "description": "Browse Japanese Suzuki Wagon R compact cars by model code, engine, grade, dimensions and condition for export enquiries.",
    "intro": "Explore Suzuki Wagon R compact tall-wagon vehicles sourced from Japan and compare the exact model code, year, grade and specification. Engine size, dimensions, seating, transmission and equipment can vary, and destination authorities may classify compact or kei versions differently.",
    "buyerGuide": "Verify the chassis/model code, manufacture year, engine displacement, transmission and drivetrain. Confirm dimensions and seat count from documents where local classification depends on them. Review sliding/door operation where fitted, cabin and cargo layout, tyres, underbody and condition photographs. Check whether the destination recognises the vehicle class and what age, emissions or registration rules apply.",
    "focusPoints": [
      "Match the Wagon R model code, generation, year and grade.",
      "Confirm engine capacity, dimensions, seating and transmission for local classification.",
      "Inspect cabin/cargo layout, doors, tyres, underbody and vehicle condition.",
      "Obtain destination confirmation for kei/compact category, age, emissions and registration."
    ],
    "searchThemes": [
      "Suzuki Wagon R from Japan",
      "used Wagon R compact car export",
      "Japanese Wagon R kei car stock",
      "Suzuki Wagon R engine size model code"
    ],
    "faqs": [
      {
        "question": "Is the Wagon R always classed as a kei car?",
        "answer": "Confirm the exact engine displacement and dimensions for the selected vehicle and ask the destination authority how it is classified locally."
      },
      {
        "question": "What specifications should I check first?",
        "answer": "Start with model code, engine size, dimensions, seating, transmission, manufacture year and grade. These can affect both suitability and local tax category."
      },
      {
        "question": "Does a Wagon R listing guarantee a particular seat or cargo layout?",
        "answer": "No. Confirm the actual arrangement using the vehicle record and clear cabin photographs."
      },
      {
        "question": "Can Wazir Trading confirm import eligibility for a Wagon R?",
        "answer": "We can help identify the vehicle details for an enquiry, but the destination authority or licensed agent must confirm the current legal age, classification and registration rules."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:mazda/demio": {
    "title": "Mazda Demio from Japan | Compact Hatchback Export | Wazir Trading",
    "description": "Compare Japanese Mazda Demio hatchbacks by generation, engine, grade, transmission, mileage and condition before export.",
    "intro": "Browse Mazda Demio compact hatchbacks from Japan and compare the exact generation, chassis code, grade, engine and condition. The Demio name spans several model updates, so verify the vehicle identification and specification rather than assuming equipment or powertrain from the badge alone.",
    "buyerGuide": "Confirm the chassis/model code, manufacture year, engine and fuel type, transmission, grade and steering side. Review the vehicle's mileage, tyres, brakes, body panels and cabin condition. Check any available service or inspection evidence, particularly where a listing has a specialised engine or powertrain. Verify the destination's age, emissions and engine-category rules before purchase.",
    "focusPoints": [
      "Verify Demio generation, model code, year and grade.",
      "Check fuel/engine, transmission and steering side from the vehicle documents.",
      "Review mileage, tyres, brakes, body panels, cabin wear and available inspection details.",
      "Confirm destination age, emissions, engine and registration requirements."
    ],
    "searchThemes": [
      "Mazda Demio from Japan",
      "used Mazda Demio hatchback export",
      "Japanese Mazda Demio stock",
      "Mazda Demio model generation"
    ],
    "faqs": [
      {
        "question": "Is Mazda Demio the same as every Mazda2 listing?",
        "answer": "Naming differs by market and generation. Use the chassis/model code and Japanese export papers to confirm the exact vehicle identity."
      },
      {
        "question": "Which engine and transmission should I expect?",
        "answer": "Do not infer this from the Demio name. Check the exact engine, fuel type and transmission in the individual listing."
      },
      {
        "question": "What should I review in the condition report?",
        "answer": "Compare mileage, body/cabin wear, tyres, brakes, underbody photographs, warning lights and any available service or inspection evidence."
      },
      {
        "question": "Does the Demio qualify for import to my country?",
        "answer": "Eligibility depends on manufacture age, emissions, engine, steering and local vehicle rules. Confirm the exact specification with the destination authority."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:lexus/nx": {
    "title": "Lexus NX from Japan | Premium SUV & Hybrid Export | Wazir Trading",
    "description": "Compare Japanese Lexus NX SUVs by generation, petrol or hybrid system, grade, equipment and condition. Review stock and export details.",
    "intro": "Explore Lexus NX premium SUVs sourced from Japan and compare generation, grade, powertrain and equipment recorded for each vehicle. NX model updates and trims can differ in safety, cabin and multimedia features, so use the exact vehicle specification and photographs when evaluating a listing.",
    "buyerGuide": "Confirm the chassis/model code, generation, year, grade and engine or hybrid configuration. Review driver-assistance and safety equipment, multimedia, cabin trim, seats, powered features and wheel/tyre specification as documented. For hybrids, request available battery or diagnostic evidence. Inspect body panels, interior wear, warning indicators and service information. Check destination rules for age, emissions, engine capacity, hybrid status and luxury-vehicle taxes.",
    "focusPoints": [
      "Identify NX generation, chassis/model code, manufacture year and grade.",
      "Verify petrol/hybrid powertrain and ask for available hybrid diagnostics where applicable.",
      "Confirm actual safety, driver-assistance, multimedia and comfort equipment.",
      "Review condition, mileage, service records and destination tax/import requirements."
    ],
    "searchThemes": [
      "Lexus NX from Japan",
      "used Lexus NX hybrid export",
      "Japanese Lexus NX SUV stock",
      "Lexus NX grade and model code Japan"
    ],
    "faqs": [
      {
        "question": "Are all Lexus NX listings hybrid?",
        "answer": "No. Confirm the exact engine or hybrid specification from the vehicle record and export documents."
      },
      {
        "question": "How do I verify Lexus NX safety features?",
        "answer": "Check the precise grade and factory/options information for the selected vehicle. Do not assume a feature is fitted based only on the model name."
      },
      {
        "question": "What should I request for an NX hybrid?",
        "answer": "Ask for available hybrid-battery, system diagnostic and service information for that particular car, plus clear photographs of its condition."
      },
      {
        "question": "Can a Lexus NX be imported without additional luxury taxes?",
        "answer": "Tax treatment depends on destination law, engine, value, age and vehicle classification. Obtain a current vehicle-specific assessment from the destination authority or licensed agent."
      }
    ],
    "kind": "model",
    "seoTier": 1
  },
  "model:toyota/hiace": {
    "kind": "model",
    "seoTier": 1,
    "title": "Toyota Hiace from Japan | Van & Commercial Export | Wazir Trading",
    "description": "Compare Japanese Toyota Hiace vans by generation, seating, cargo body, engine, condition and commercial import requirements.",
    "intro": "Explore Toyota Hiace vans and commercial vehicles sourced from Japan, comparing the generation, body style, seating or cargo configuration and vehicle condition shown in each listing. Hiace variants can be passenger, commuter or cargo-oriented, so verify the exact unit's use and specification before arranging export.",
    "buyerGuide": "Confirm the chassis/model code, year, grade, body and roof configuration, engine, transmission and steering side. Establish whether the vehicle is a passenger van, commuter configuration or cargo van, and verify the seat count and layout from documents and photographs. Review sliding doors, cargo floor, roof, underbody, tyres, brakes and evidence of commercial use. Request documented gross vehicle weight and payload where relevant, then check local age, passenger, emissions and commercial-vehicle rules.",
    "focusPoints": [
      "Verify Hiace generation, chassis code, body/roof version and manufacture year.",
      "Confirm passenger seating versus cargo configuration, seat count and interior layout.",
      "Inspect doors, roof, cargo area, underbody, tyres, brakes and commercial-use wear.",
      "Check documented vehicle weight, payload, destination commercial registration, age and emissions rules."
    ],
    "searchThemes": [
      "Toyota Hiace from Japan",
      "used Toyota Hiace van export",
      "Japanese Hiace commuter and cargo van",
      "Toyota Hiace model and chassis code"
    ],
    "faqs": [
      {
        "question": "Is every Toyota Hiace a passenger van?",
        "answer": "No. Hiace listings can represent passenger, commuter or cargo configurations. Confirm the exact body and interior from the vehicle record and photographs."
      },
      {
        "question": "How many seats does this Hiace have?",
        "answer": "Use the individual listing, registration/export papers and cabin photographs to confirm seat count. Do not rely on a generic model description."
      },
      {
        "question": "What should I inspect on a commercial Hiace?",
        "answer": "Review sliding doors, roof, cargo floor, underbody, suspension, tyres, brakes and evidence of heavy use, repairs or modifications."
      },
      {
        "question": "Are commercial-van rules different from passenger-car rules?",
        "answer": "They can be. Weight, seating and intended use may change import age, permit and tax treatment. Confirm the exact class with the destination authority."
      }
    ]
  },
  "model:toyota/yaris-cross": {
    "kind": "model",
    "seoTier": 1,
    "title": "Toyota Yaris Cross from Japan | Compact SUV Export | Wazir Trading",
    "description": "Browse Japanese Toyota Yaris Cross SUVs by generation, grade, hybrid or petrol system, drivetrain and vehicle condition.",
    "intro": "Compare Toyota Yaris Cross compact SUVs sourced from Japan by model code, year, grade, powertrain and drivetrain. Specifications can vary between updates and versions; confirm the exact model and equipment from the individual vehicle record before comparing an export quote.",
    "buyerGuide": "Verify the Yaris Cross chassis/model code, manufacture year, grade, engine or hybrid system, transmission and 2WD/4WD configuration. Check actual safety and driver-assistance equipment rather than assuming it from the grade name. Review tyres, wheels, underbody, cabin, cargo area, mileage and condition photographs. For hybrid versions, request available diagnostics. Confirm destination age, emissions, hybrid and compact-SUV registration requirements.",
    "focusPoints": [
      "Identify the Yaris Cross model code, year, grade and exact generation.",
      "Confirm petrol or hybrid configuration and the vehicle's documented drivetrain.",
      "Check actual safety features, equipment, tyres, underbody and cargo space.",
      "Request available hybrid diagnostics and confirm destination import eligibility."
    ],
    "searchThemes": [
      "Toyota Yaris Cross from Japan",
      "used Toyota Yaris Cross SUV export",
      "Japanese Yaris Cross hybrid stock",
      "Toyota Yaris Cross model code and grade"
    ],
    "faqs": [
      {
        "question": "Is every Yaris Cross a hybrid?",
        "answer": "No. Powertrain options can differ by market and version. Confirm the exact engine or hybrid system from the selected vehicle's documents."
      },
      {
        "question": "How do I confirm whether the Yaris Cross is 4WD?",
        "answer": "Check the documented drivetrain and model code for the individual vehicle. Do not infer 4WD from its crossover body style."
      },
      {
        "question": "Are all safety and driver-assistance features standard?",
        "answer": "No. Equipment varies by model year, grade and options. Ask Wazir Trading to confirm the features actually recorded for the selected unit."
      },
      {
        "question": "What destination checks matter for a Yaris Cross hybrid?",
        "answer": "Verify vehicle age, emissions, hybrid classification, steering and any local battery or registration conditions with the destination authority."
      }
    ]
  }
};
