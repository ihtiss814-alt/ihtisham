import type { VehicleLandingFaq, VehicleLandingKind } from "./vehicle-landing-pages";

/** Curated Tier 3 content for the remaining inventory-supported make/model pages. */
export interface VehicleTierThreeContent {
  kind: Extract<VehicleLandingKind, "make" | "model">;
  seoTier: 3;
  title: string;
  description: string;
  intro: string;
  buyerGuide: string;
  focusPoints: string[];
  searchThemes: string[];
  faqs: VehicleLandingFaq[];
}

function page(
  kind: Extract<VehicleLandingKind, "make" | "model">,
  title: string,
  description: string,
  intro: string,
  buyerGuide: string,
  focusPoints: string[],
  searchThemes: string[],
  faqs: VehicleLandingFaq[],
): VehicleTierThreeContent {
  return { kind, seoTier: 3, title, description, intro, buyerGuide, focusPoints, searchThemes, faqs };
}

export const VEHICLE_TIER_THREE_CONTENT: Record<string, VehicleTierThreeContent> = {
  "make:mitsubishi-fuso": page(
    "make",
    "Mitsubishi Fuso Trucks from Japan | Wazir Trading",
    "Compare Japanese Mitsubishi Fuso trucks by Canter model, chassis, cab, body, weight rating and condition. Review matching stock and export details.",
    "Explore Mitsubishi Fuso commercial vehicles sourced from Japan, with the Canter family represented in the current catalogue. A truck's suitability depends on its chassis, cab, wheelbase, axle layout, engine, body and documented weight ratings. Use this manufacturer guide to compare those details on the individual listing rather than treating every Canter as the same specification.",
    "Start with the full model and chassis designation, then confirm year, engine, transmission, cab, wheelbase, axle configuration and fitted body. Request manufacturer or vehicle-plate evidence for gross vehicle weight and payload; do not estimate capacity from photographs. Inspect frame rails, underbody, suspension, brakes, tyres, cab and any specialist equipment. Check destination commercial registration, permits, road-weight limits, emissions, dimensions and carrier restrictions before purchase.",
    [
      "Distinguish Mitsubishi Fuso from Mitsubishi-branded passenger and commercial vehicles in the catalogue.",
      "Match the Canter chassis, cab, wheelbase, axle layout and body to the intended work.",
      "Verify gross vehicle weight and payload from the vehicle plate or official documents.",
      "Inspect frame, underbody, suspension, brakes, tyres and fitted equipment.",
    ],
    ["Mitsubishi Fuso trucks from Japan", "used Fuso Canter export", "Japanese Fuso commercial vehicles", "Fuso truck chassis and payload checks"],
    [
      { question: "Is Mitsubishi Fuso the same make as Mitsubishi?", answer: "The catalogue keeps Mitsubishi Fuso as a separate manufacturer record. Select the correct make and verify the actual manufacturer and chassis details in the vehicle documents." },
      { question: "How do I choose a Fuso Canter for work?", answer: "Compare chassis, wheelbase, cab, axle layout, body dimensions and documented weight ratings against the job. A flatbed, carrier or specialist body can change dimensions and operating suitability." },
      { question: "Can I estimate a Canter's payload from its model name?", answer: "No. Use the manufacturer's plate and official vehicle documents for the exact chassis and body. Gross weight and payload must not be inferred from appearance or a broad model family." },
      { question: "What should I check before importing a Fuso truck?", answer: "Confirm commercial registration class, age and emissions rules, permits, axle and road-weight limits, dimensions, duties and shipping restrictions with the destination authority and carrier." },
    ],
  ),
  "make:hino": page(
    "make",
    "Hino Trucks from Japan | Wazir Trading",
    "Browse Japanese Hino commercial vehicles and compare exact truck designation, chassis, engine, cab, body, weight documentation and condition.",
    "Review Hino commercial vehicles represented in Wazir Trading's Japanese inventory. The catalogue includes different truck designations rather than one uniform configuration, so this manufacturer guide helps buyers compare chassis and cab details, engine, body, rated weights and condition without assuming that vehicles sharing a badge are interchangeable.",
    "Identify the exact Hino model and chassis/cab designation before comparing price. Confirm model year, engine and fuel type, transmission, axle layout, wheelbase, body dimensions and documented gross vehicle weight or payload. Inspect frame, underbody, suspension, brakes, tyres, cargo body and signs of previous commercial use. Request available inspection information and confirm destination registration class, commercial permits, emissions, road limits and carrier dimensions.",
    [
      "Record the full Hino model, chassis and cab designation from the vehicle documents.",
      "Verify engine, transmission, axle layout, wheelbase and body dimensions for the unit.",
      "Use documented weight ratings; do not estimate payload from photographs.",
      "Inspect frame, suspension, brakes, tyres, cargo body and visible commercial wear.",
    ],
    ["Hino trucks from Japan", "Japanese Hino commercial vehicle export", "used Hino truck chassis details", "Hino truck weight and body comparison"],
    [
      { question: "Which Hino truck should I choose?", answer: "Choose by the documented chassis, cab, wheelbase, axle layout, body and weight rating required for the intended work, not by the Hino badge alone." },
      { question: "Where can I confirm a Hino truck's payload?", answer: "Request the manufacturer's plate and official vehicle documents for the exact chassis/body combination. Payload varies with vehicle configuration and fitted equipment." },
      { question: "What condition checks matter on a used Hino?", answer: "Review frame and underbody corrosion, suspension, brakes, tyres, cab, cargo body, warning indicators and available service or inspection evidence." },
      { question: "What import rules apply to Hino commercial vehicles?", answer: "Check destination commercial-vehicle classification, age and emissions limits, permits, axle and road-weight rules, dimensions, duties and registration with the relevant authorities." },
    ],
  ),
  "model:daihatsu/tanto": page(
    "model",
    "Daihatsu Tanto from Japan | Wazir Trading",
    "Compare Japanese Daihatsu Tanto kei cars by generation, 660cc engine, grade, CVT, cabin layout and condition. Review matching stock and export details.",
    "The Daihatsu Tanto is a compact Japanese kei-class passenger vehicle represented in the current inventory across multiple model years and grades. Standard and Custom versions can differ in styling, cabin equipment and safety features. Compare the exact model code and vehicle specification, because the Tanto name alone does not identify its generation or fitted equipment.",
    "Confirm model code, generation, manufacture year, 660 cc engine, CVT and full grade designation. Establish whether the car is a standard Tanto or Custom version and verify door operation, seating, cabin access, safety equipment and dimensions from the listing. Inspect mileage, tyres, body panels, interior and condition photographs. Before export, ask the destination authority whether kei-class engine size, dimensions, age or vehicle category affect import permission, duties or registration.",
    [
      "Match the generation, model code, year and standard/Custom grade.",
      "Verify the 660 cc engine and CVT from the vehicle record and documents.",
      "Check sliding-door operation, seating, cabin access and safety equipment.",
      "Confirm destination treatment of kei-class vehicles before arranging export.",
    ],
    ["Daihatsu Tanto from Japan", "used Daihatsu Tanto kei car export", "Tanto Custom 660cc Japan", "Japanese Tanto grade and model-code comparison"],
    [
      { question: "What is the difference between Tanto and Tanto Custom?", answer: "The grade and generation determine styling and equipment. Confirm the exact model code and listed features for the individual vehicle instead of assuming all Custom versions share identical options." },
      { question: "What engine does the listed Tanto use?", answer: "The current catalogue describes 660 cc examples, but confirm engine and model code against the exact vehicle record and export documents." },
      { question: "What should I inspect on a Tanto?", answer: "Check door mechanisms, cabin access, seats, safety equipment, tyres, body condition, mileage and the photographs for the selected unit." },
      { question: "Can every country register a Japanese kei car?", answer: "No universal eligibility should be assumed. Ask the destination authority to confirm engine-size, dimension, age, classification and registration rules for the exact vehicle." },
    ],
  ),
  "model:toyota/dyna": page(
    "model",
    "Toyota Dyna Trucks from Japan | Wazir Trading",
    "Compare Japanese Toyota Dyna trucks by chassis, engine, cab, cargo body, weight rating and condition. Review available stock and export requirements.",
    "Toyota Dyna and Dyna Truck inventory labels are grouped into one model-family guide to avoid creating duplicate pages for the same commercial range. Individual records can describe different years, engine sizes, fuel types, cab arrangements and work bodies. Compare the exact chassis and body configuration before deciding whether a truck suits its intended load and operating environment.",
    "Check the chassis/model code, year, engine displacement and fuel, cab, transmission, axle layout and cargo body. Listings may describe flatbed, aluminium body, carrier, power-gate or double-cab configurations; verify each feature from the vehicle photographs and documents. Inspect frame, underbody, suspension, brakes and tyres. Request gross vehicle weight and payload documentation and confirm commercial registration, road limits, permits and shipping dimensions with the destination authority and carrier.",
    [
      "Treat Dyna and Dyna Truck as one model family while retaining each vehicle's original designation.",
      "Verify engine, fuel, transmission, chassis, cab and axle configuration.",
      "Confirm the fitted body, dimensions, gross weight and payload from documentation.",
      "Inspect frame, underbody, suspension, brakes, tyres and cargo equipment.",
    ],
    ["Toyota Dyna trucks from Japan", "used Toyota Dyna Truck export", "Japanese Dyna flatbed and carrier", "Toyota Dyna chassis and payload"],
    [
      { question: "Are Toyota Dyna and Dyna Truck separate model pages?", answer: "They are grouped under one canonical model-family page because the catalogue uses both labels for Dyna-family records. The original listing designation remains important and should be checked." },
      { question: "Which Dyna body types are available?", answer: "The inventory descriptions may include different work bodies. Check the current matching listings and photographs; the page does not guarantee that a particular body is in stock." },
      { question: "How do I confirm a Dyna's load capacity?", answer: "Use the vehicle plate and official papers for the exact chassis and body. Confirm gross vehicle weight and rated payload rather than estimating from model name or appearance." },
      { question: "What should I check before importing a Dyna?", answer: "Verify commercial registration, weight and dimension limits, permits, age and emissions rules, duties and carrier restrictions for the destination." },
    ],
  ),
  "model:subaru/xv": page(
    "model",
    "Subaru XV from Japan | Wazir Trading",
    "Compare Japanese Subaru XV crossovers by model year, engine, drivetrain, grade, EyeSight equipment and condition before requesting an export quote.",
    "The Subaru XV model page groups the Subaru-tagged XV records in the current catalogue. Model year, engine, fuel designation, transmission, drivetrain and grade can vary, and the presence of an EyeSight label should be confirmed against the specific vehicle. Check manufacturer identity and source documents carefully where marketplace labels are inconsistent.",
    "Confirm that the vehicle documents identify Subaru XV, then match model year, chassis code, engine, fuel type, transmission, drivetrain and grade. Review EyeSight and other safety equipment against the actual listing and photographs. Inspect tyres, suspension, underbody, mileage and warning indicators, and request service or inspection evidence where available. Confirm destination vehicle-age, emissions, steering and registration rules for the exact unit.",
    [
      "Verify Subaru manufacturer identity and the XV model/chassis code.",
      "Compare engine, fuel designation, transmission, drivetrain and grade by year.",
      "Confirm EyeSight and other safety equipment from the vehicle-specific record.",
      "Inspect tyres, suspension, underbody, warning indicators and available service evidence.",
    ],
    ["Subaru XV from Japan", "used Subaru XV export", "Japanese Subaru XV AWD specification", "Subaru XV EyeSight grade comparison"],
    [
      { question: "Are all Subaru XV vehicles equipped with identical AWD systems?", answer: "Do not assume so. Confirm the drivetrain and specification from the selected vehicle's year, model code and documentation." },
      { question: "How can I verify EyeSight equipment?", answer: "Check the exact grade and vehicle equipment record, then request photographs or documentation if the feature is important. Model-family descriptions are not proof that a specific unit has it." },
      { question: "What should I inspect on a used XV?", answer: "Review tyres, suspension, underbody, warning indicators, mileage, condition photographs and service or inspection information available for that vehicle." },
      { question: "Can I import a Subaru XV into my country?", answer: "Eligibility depends on the destination and exact vehicle. Confirm age, emissions, steering, safety and registration requirements with the relevant local authority." },
    ],
  ),
  "model:audi/tt": page(
    "model",
    "Audi TT Coupe from Japan | Wazir Trading",
    "Compare Japanese Audi TT and TT Coupe listings by generation, engine, transmission, grade and condition. Check the exact vehicle before export.",
    "Audi TT and TT Coupe labels are consolidated under one model-family page because the current catalogue uses both descriptions for this coupe range. Records can span different generations, years and petrol engine specifications. Use the exact model code, engine and grade shown for each car; the shared TT name does not mean that two listings have the same specification.",
    "Identify the TT generation and model year, then verify engine displacement, fuel type, transmission, grade and chassis details. Retain the original TT or TT Coupe description in the vehicle record and confirm the export documents match the car. Inspect body panels, roof, wheels, tyres, suspension, cabin electronics and warning indicators. Request available inspection information and check destination age, emissions, safety and import rules.",
    [
      "Keep TT and TT Coupe under one canonical family page without merging individual vehicle identities.",
      "Confirm generation, year, engine, transmission, grade and chassis details.",
      "Inspect body and roof panels, tyres, suspension, cabin electronics and warning lights.",
      "Verify destination age, emissions, safety and registration requirements.",
    ],
    ["Audi TT from Japan", "used Audi TT Coupe export", "Japanese Audi TT generation comparison", "Audi TT engine and grade checks"],
    [
      { question: "Are Audi TT and TT Coupe different pages?", answer: "The catalogue groups both labels on one canonical TT family page to avoid near-duplicate URLs. Check the original listing label and vehicle documents for the exact car." },
      { question: "Which Audi TT generation should I choose?", answer: "Compare model year, generation, engine, transmission, equipment and condition against your requirements. The page does not imply that every generation is currently available." },
      { question: "What should I inspect on a used TT?", answer: "Review body and roof panels, wheels and tyres, suspension, interior electronics, warning indicators, mileage and the available condition or inspection evidence." },
      { question: "Does the TT price include import and delivery costs?", answer: "Not unless a written quotation says so. Ask for separate vehicle, export, freight, insurance, duty, tax, clearance, port and registration costs." },
    ],
  ),
  "model:mercedes-benz/c-class": page(
    "model",
    "Mercedes-Benz C-Class from Japan | Wazir Trading",
    "Compare Japanese Mercedes-Benz C-Class saloons and estates by generation, engine, AMG-line trim, body style and condition before export.",
    "The Mercedes-Benz C-Class page brings together the C-Class designations represented in the current Japanese inventory, including saloon and station-wagon labels and AMG-related trim descriptions. Body style, generation, engine and equipment vary. Confirm the exact derivative and factory specification for the individual vehicle rather than treating every C-Class listing as equivalent.",
    "Start with the generation, chassis series, year and body style, then identify engine, fuel type, transmission, drivetrain and exact grade. Distinguish AMG Line styling or trim from a separate high-performance model designation using the vehicle documents. For station wagons, inspect the tailgate and cargo area; for all versions, review electronics, warning indicators, tyres, suspension, service evidence and condition photographs. Confirm destination emissions, age and registration requirements.",
    [
      "Verify generation, chassis series, model year and saloon/estate body style.",
      "Identify the exact engine, transmission, drivetrain and factory grade.",
      "Distinguish AMG Line equipment from other AMG model designations.",
      "Inspect electronics, suspension, tyres, cargo area where applicable and service evidence.",
    ],
    ["Mercedes-Benz C-Class from Japan", "used C-Class estate export", "Japanese Mercedes C-Class AMG Line", "C-Class generation and engine comparison"],
    [
      { question: "Does every C-Class listing represent an AMG model?", answer: "No. AMG Line may describe styling or equipment, while performance models are different derivatives. Verify the exact designation and factory specification in the vehicle documents." },
      { question: "Are saloon and station-wagon C-Class listings grouped?", answer: "Yes, they share the C-Class model-family page, but body style remains a vehicle-specific attribute and should be checked in each listing." },
      { question: "What should I check on a used C-Class?", answer: "Confirm engine and transmission, inspect electronics and warning indicators, review tyres and suspension, check body/interior condition and request available service evidence." },
      { question: "What determines C-Class import eligibility?", answer: "Destination rules for vehicle age, emissions, steering, safety and registration apply to the exact derivative. Obtain confirmation from the relevant authority before purchase." },
    ],
  ),
  "model:mitsubishi/canter": page(
    "model",
    "Mitsubishi Canter Trucks from Japan | Wazir Trading",
    "Compare Japanese Mitsubishi Canter trucks by chassis, engine, cab, drivetrain, cargo body and weight documentation. Review stock and export checks.",
    "Mitsubishi Canter is a light commercial truck family represented by multiple Japanese inventory records. Available descriptions cover different years, engine sizes, fuel and transmission entries, drive layouts and work bodies. A Canter fitted as a flatbed, carrier or refuse truck may have different dimensions and operating suitability, so compare the exact unit rather than the model name alone.",
    "Confirm the Canter chassis/model code, year, engine, fuel, transmission, cab, axle layout and fitted body. Some source records may use unusual transmission or drivetrain labels; verify these against the vehicle plate and export documents before relying on them. Request gross vehicle weight and payload documentation where available. Inspect frame, underbody, suspension, brakes, tyres and cargo equipment, then check commercial registration, permits, age rules and shipping dimensions.",
    [
      "Verify Canter chassis/model code, year, engine, transmission and cab from documents.",
      "Confirm the actual axle/drive layout and fitted cargo or specialist body.",
      "Request documented gross weight and payload; do not infer them from model name.",
      "Inspect frame, underbody, suspension, brakes, tyres and signs of commercial wear.",
    ],
    ["Mitsubishi Canter from Japan", "used Mitsubishi Canter truck export", "Japanese Canter flatbed and carrier", "Mitsubishi Canter chassis and payload"],
    [
      { question: "Is Mitsubishi Canter the same as Mitsubishi Fuso Canter?", answer: "The catalogue keeps Mitsubishi Canter and Mitsubishi Fuso Canter under separate make records. Select the correct manufacturer record and verify the exact vehicle identity from its documents." },
      { question: "Which Canter body configurations can I compare?", answer: "Current listing descriptions may include standard cab, carrier, flat body and specialist work bodies. Confirm actual availability and fitted equipment from the matching vehicle record and photographs." },
      { question: "Can I rely on the transmission label in every listing?", answer: "If a specification looks unusual or conflicts with the documents, ask for written verification from the vehicle record or source paperwork before making a purchase decision." },
      { question: "What import checks apply to a Canter?", answer: "Confirm commercial registration class, vehicle age, emissions, permits, weight and dimension limits, duties and carrier restrictions with the destination authority." },
    ],
  ),
  "model:mitsubishi/minicab-truck": page(
    "model",
    "Mitsubishi Minicab Trucks from Japan | Wazir Trading",
    "Compare Japanese Mitsubishi Minicab kei trucks by 660cc engine, 2WD or 4WD, cab, bed, transmission and condition before export.",
    "Mitsubishi Minicab Truck listings represent compact Japanese kei-class commercial pickups. The current catalogue includes different years, 660 cc engine records, transmission descriptions and 2WD/4WD-labelled variants. Confirm the exact model code and drivetrain from the documents, and assess the bed and chassis condition for the intended light-duty use.",
    "Check the Minicab model/chassis code, year, 660 cc engine, transmission, grade and documented 2WD or 4WD configuration. Inspect the bed floor, frame, underbody, suspension, tyres, brakes and evidence of loading or corrosion. Request rated weight and payload details where available; do not estimate from appearance. Confirm the destination's rules for kei trucks, commercial registration, engine size, vehicle age, dimensions and carrier restrictions.",
    [
      "Verify model code, year, 660 cc engine and the documented transmission.",
      "Confirm 2WD/4WD from the vehicle documents rather than badge or appearance.",
      "Inspect bed, frame, underbody, suspension, tyres, brakes and corrosion.",
      "Check destination kei-vehicle classification, commercial permits and registration rules.",
    ],
    ["Mitsubishi Minicab Truck from Japan", "used Minicab kei truck export", "Japanese 660cc Minicab pickup", "Mitsubishi Minicab 4WD truck checks"],
    [
      { question: "Are all Minicab Truck listings 4WD?", answer: "No. The catalogue contains different drive descriptions. Confirm the actual 2WD or 4WD configuration from the selected vehicle's model code and documents." },
      { question: "What is important about the 660 cc engine?", answer: "It identifies the kei-class engine specification in the current inventory descriptions. Confirm the exact engine and ask the destination authority how its vehicle classification treats that unit." },
      { question: "What should I inspect on a used Minicab?", answer: "Check bed and frame condition, underbody corrosion, suspension, tyres, brakes, loading wear, mileage and the vehicle photographs." },
      { question: "Can a Minicab Truck be registered as a commercial vehicle overseas?", answer: "Rules differ by destination. Confirm kei classification, dimensions, age, engine-size, commercial registration and permit requirements with the local authority." },
    ],
  ),
  "model:daihatsu/move-canbus": page(
    "model",
    "Daihatsu Move Canbus from Japan | Wazir Trading",
    "Compare Japanese Daihatsu Move Canbus kei cars by 660cc engine, CVT, Stripes or Theory grade, year, equipment and condition.",
    "Daihatsu Move Canbus records in the current catalogue include 660 cc petrol engines and CVT transmissions, with grade descriptions such as G, Stripes, Theory and Turbo. The grade name is only a starting point: model year, generation and option package determine the actual convenience and safety equipment fitted to each car.",
    "Match the model code and year, 660 cc engine, CVT and full grade designation. Compare standard, Stripes, Theory and Turbo descriptions carefully and verify equipment from the individual record. Check door operation, seating, cabin access, safety systems, mileage, tyres and condition photographs. Confirm the destination's rules for kei-class engine size, age, dimensions and registration before arranging export.",
    [
      "Confirm model code, generation, year, 660 cc engine and CVT.",
      "Verify the complete G, Stripes, Theory or Turbo grade and fitted options.",
      "Inspect door mechanisms, cabin access, seating, safety equipment and condition.",
      "Check destination classification, engine-size, age and dimension requirements.",
    ],
    ["Daihatsu Move Canbus from Japan", "used Move Canbus kei car export", "Move Canbus Stripes and Theory grades", "Japanese 660cc Move Canbus CVT"],
    [
      { question: "What do Stripes and Theory mean on a Move Canbus listing?", answer: "They are grade/designation details used in the catalogue. Confirm the exact model code and equipment package for the selected year; do not assume all examples have the same options." },
      { question: "Are Move Canbus vehicles listed with a CVT?", answer: "The current inventory description identifies CVT examples, but the exact transmission should always be verified against the individual vehicle record and documents." },
      { question: "What features should I inspect?", answer: "Check sliding-door operation, cabin access, seating, safety systems, tyres, mileage and condition photographs, then confirm any option that matters to you." },
      { question: "Are kei-class Move Canbus cars accepted in every destination?", answer: "No universal rule applies. Confirm vehicle class, engine size, dimensions, age, import permission and registration with the destination authority." },
    ],
  ),
  "model:lexus/ls": page(
    "model",
    "Lexus LS from Japan | Wazir Trading",
    "Compare Japanese Lexus LS sedans by generation, 3.5L, 4.6L or 5.0L engine, hybrid system, grade, equipment and condition before export.",
    "Lexus LS inventory includes large luxury sedans from several model years and engine families. The catalogue contains gasoline and hybrid-labelled records and grades such as F Sport, Executive Package, I Package and Version C. Verify the exact generation, powertrain and fitted options because trim names and equipment can vary across years.",
    "Identify the LS generation and chassis/model code, then confirm year, engine displacement, fuel or hybrid system, transmission and full grade. Check the actual safety, comfort, multimedia and interior equipment recorded for the vehicle rather than assuming a package includes every feature. Inspect mileage, body and cabin condition, tyres and warning indicators. For hybrid examples, request available battery/diagnostic evidence and confirm destination engine-size, emissions and age rules.",
    [
      "Distinguish 3.5L, 4.6L and 5.0L records and verify gasoline/hybrid designation.",
      "Confirm F Sport, Executive Package, I Package or Version C equipment by vehicle.",
      "Review service evidence, mileage, interior, bodywork, tyres and warning indicators.",
      "For hybrid models, request available battery diagnostics and check destination rules.",
    ],
    ["Lexus LS from Japan", "used Lexus LS hybrid export", "Japanese Lexus LS F Sport", "Lexus LS engine and grade comparison"],
    [
      { question: "Are all Lexus LS listings hybrids?", answer: "No. The inventory includes different engine and fuel-system descriptions. Confirm the exact displacement and gasoline or hybrid designation from the vehicle documents." },
      { question: "How do I compare LS grades?", answer: "Check the generation, year and exact grade, then verify safety, comfort, interior and multimedia equipment on the individual vehicle. Package contents can vary." },
      { question: "What should I request for a Lexus LS hybrid?", answer: "Ask for the battery and hybrid-system diagnostic information available for that unit, along with service or inspection evidence and any warning status." },
      { question: "Does an LS listing include overseas taxes and delivery?", answer: "Not automatically. Obtain a written breakdown for vehicle price, export costs, freight, insurance, duties, taxes, clearance, port charges and local registration." },
    ],
  ),
};
