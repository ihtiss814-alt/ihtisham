import { SITE_URL, type VehicleSeoCar } from "./vehicle-seo";
import { VEHICLE_TIER_ONE_CONTENT } from "./vehicle-tier-one-content";

export const VEHICLE_LANDING_DIRECTORY_PATH = "/used-japanese-cars";
export const MIN_INDEXABLE_LANDING_STOCK = 5;
export const VEHICLE_LANDING_CAR_LIMIT = 200;
export const VEHICLE_LANDING_CARDS_LIMIT = 8;

export type VehicleLandingKind = "make" | "model" | "body-type";
export type VehicleSeoTier = 1 | 2 | 3;

export interface VehicleLandingFaq {
  question: string;
  answer: string;
}

export interface VehicleLandingPage {
  kind: VehicleLandingKind;
  /** Internal prioritisation; does not bypass inventory indexation checks. */
  seoTier?: VehicleSeoTier;
  slug: string;
  path: string;
  label: string;
  title: string;
  description: string;
  intro: string;
  buyerGuide: string;
  focusPoints: string[];
  faqs: VehicleLandingFaq[];
  make?: string;
  makeSlug?: string;
  model?: string;
  bodyType?: string;
  /** Verified raw database labels that belong to this canonical landing page. */
  makeAliases?: string[];
  modelAliases?: string[];
  bodyTypeAliases?: string[];
  /** Old routes can remain resolvable/noindex without being promoted in the directory. */
  directoryVisible?: boolean;
}

export interface VehicleLandingDirectoryEntry {
  label: string;
  path: string;
  kind: VehicleLandingKind;
}

const makeContent = [
  {
    slug: "toyota",
    seoTier: 1,
    name: "Toyota",
    intro:
      "Browse Japanese Toyota vehicle records in one place and compare the specifications shown on each available listing. The catalogue can include different body styles, model years, engine choices and equipment grades, so use the exact vehicle record rather than the badge alone when deciding whether a car suits your requirements.",
    buyerGuide:
      "Toyota listings can cover compact hatchbacks, sedans, hybrid models, family vehicles, SUVs and commercial vans. Compare the chassis or model code, model year, grade, engine or hybrid system, mileage, transmission, drive configuration and condition details. For hybrid vehicles, request the available battery and diagnostic information; for vans and utility vehicles, confirm seating, cargo configuration and intended use.",
    focusPoints: [
      "Match the exact model, chassis code, year and grade shown in the listing.",
      "Review mileage, auction or condition grades, photographs and the vehicle-specific equipment.",
      "Confirm the powertrain, steering, drivetrain, FOB price and destination import eligibility before payment.",
    ],
  },
  {
    slug: "nissan",
    seoTier: 1,
    name: "Nissan",
    intro:
      "Explore available Nissan vehicles sourced from Japan and compare each record by model, year, trim, powertrain and condition. Nissan inventory may span compact cars, family vans, SUVs and electric vehicles; specifications and equipment vary by model year and individual vehicle.",
    buyerGuide:
      "When comparing Nissan listings, verify the precise model and grade, not only the model name. Check whether a vehicle uses a conventional petrol engine, hybrid or e-POWER system, or a fully electric drivetrain. Review mileage, battery information where applicable, transmission, drivetrain, steering side, images and the documents available for export.",
    focusPoints: [
      "Identify the exact Nissan model, grade and powertrain from the vehicle record.",
      "For electrified vehicles, ask for the battery information and charging specification available for that unit.",
      "Check dimensions, seating, steering, condition and destination rules against your intended use.",
    ],
  },
  {
    slug: "honda",
    seoTier: 1,
    name: "Honda",
    intro:
      "Compare Japanese Honda used-car listings by model, year, grade, engine, transmission and photographed condition. The range represented in stock may include compact hatchbacks, sedans, crossovers and multi-purpose vehicles, with meaningful differences between model generations and trim levels.",
    buyerGuide:
      "Honda model names can cover several body configurations and powertrain combinations over time. Confirm the full model designation, chassis details, grade, engine or hybrid system, transmission, mileage and included equipment. Check the condition report and photographs for the exact unit, and obtain written confirmation of the export price and shipping scope.",
    focusPoints: [
      "Confirm model generation, chassis code, trim and engine or hybrid specification.",
      "Compare the actual condition report, mileage and photographs for each vehicle.",
      "Check seating, safety equipment, steering configuration and import eligibility for the destination.",
    ],
  },
  {
    slug: "suzuki",
    seoTier: 1,
    name: "Suzuki",
    intro:
      "Review available Suzuki vehicles from Japan, including compact cars and other body styles represented in current stock. Compare the specifications and photographs attached to each vehicle because engine size, drivetrain, seating and equipment can differ significantly between variants.",
    buyerGuide:
      "For Suzuki vehicles, confirm the exact model and grade, engine displacement, transmission, drive type and body configuration. For compact and off-road-oriented models, pay particular attention to dimensions, ground-clearance requirements, tyres, underbody condition and the destination market’s vehicle classification rules.",
    focusPoints: [
      "Verify engine displacement, model code, year and selected grade.",
      "Check whether the specific vehicle is 2WD or 4WD and confirm the transmission.",
      "Review photographs, underbody condition, tyres and destination requirements before committing.",
    ],
  },
  {
    slug: "mazda",
    seoTier: 1,
    name: "Mazda",
    intro:
      "Browse current Mazda vehicle records sourced from Japan and compare year, model, trim, engine, transmission and condition. Listings may include compact cars, passenger vehicles and SUVs; always use the individual specification sheet to distinguish different generations and equipment packages.",
    buyerGuide:
      "Mazda model names and naming conventions can vary by market and generation. Confirm the exact model designation, chassis information, grade, engine type, transmission, mileage and safety equipment. For diesel or other specialised powertrains, request any available service and inspection information relevant to the specific vehicle.",
    focusPoints: [
      "Match the full model designation and year to the vehicle identification details.",
      "Check engine type, transmission, mileage and service or inspection information available.",
      "Compare grade-specific equipment, photographs, FOB price and export documentation.",
    ],
  },
  {
    slug: "subaru",
    seoTier: 2,
    name: "Subaru",
    intro:
      "Compare Subaru listings from Japan using the model, year, grade, engine, drivetrain and condition information recorded for each vehicle. Subaru vehicles may have different drivetrain and engine configurations across generations, so do not assume a specification from the nameplate alone.",
    buyerGuide:
      "Check the exact engine, transmission and drivetrain shown on the vehicle record and request clarification when a specification is not listed. Review mileage, maintenance history where available, tyres, underbody photographs and warning indicators. Confirm the precise vehicle configuration is suitable for the destination’s rules and your intended use.",
    focusPoints: [
      "Verify the actual drivetrain, engine and transmission rather than assuming standard equipment.",
      "Request service or inspection evidence relevant to the specific engine and vehicle.",
      "Review tyres, underbody, warning lights, mileage and export documents.",
    ],
  },
  {
    slug: "mitsubishi",
    seoTier: 2,
    name: "Mitsubishi",
    intro:
      "Explore Japanese Mitsubishi used vehicles and compare the available records by model, year, trim, engine, drivetrain and condition. Listings can differ by vehicle category and powertrain, and individual equipment should be confirmed from the published vehicle details.",
    buyerGuide:
      "For Mitsubishi vehicles, establish the exact model, grade, engine and drivetrain. If a listing is a plug-in hybrid or another electrified variant, confirm that precise system, the battery information available and destination charging compatibility. For SUVs and utility vehicles, check dimensions, seating, towing or load requirements as applicable.",
    focusPoints: [
      "Confirm the exact model, grade, engine and drivetrain in the listing.",
      "For electrified variants, request available battery and charging details.",
      "Check dimensions, vehicle condition, equipment and destination import requirements.",
    ],
  },
  {
    slug: "daihatsu",
    seoTier: 2,
    name: "Daihatsu",
    intro:
      "Review available Daihatsu vehicles from Japan with attention to the exact model code, engine size, year, grade and condition. Compact vehicle specifications can be closely tied to local vehicle classifications, so check the destination authority’s rules before selecting a particular unit.",
    buyerGuide:
      "Compare engine displacement, dimensions, seating, transmission and chassis or model code. Where the vehicle is a Japanese kei-class model, independently confirm whether the destination recognises that category and whether its engine size, age or dimensions affect registration, duties or import permission.",
    focusPoints: [
      "Check engine displacement, dimensions, chassis code and model year.",
      "Confirm destination rules for kei or other compact-vehicle classifications.",
      "Review grade, mileage, photographs, condition and the complete quotation.",
    ],
  },
  {
    slug: "lexus",
    seoTier: 1,
    name: "Lexus",
    intro:
      "Compare available Lexus vehicles sourced from Japan by model, year, grade, powertrain and condition. Equipment and specification can vary considerably between trims, option packages and model generations, so verify the exact vehicle record and request clarification about features important to you.",
    buyerGuide:
      "For a Lexus purchase, check the exact model and grade, engine or hybrid specification, mileage, interior and exterior condition, warning indicators and available service history. Confirm that key features, safety systems, multimedia functions and included accessories are documented for the individual car rather than inferred from the model family.",
    focusPoints: [
      "Confirm model generation, grade, engine or hybrid system and equipment package.",
      "Request close-up photographs and available service or inspection information.",
      "Check the quoted condition, FOB scope, shipping terms and destination compliance.",
    ],
  },
  {
    slug: "isuzu",
    seoTier: 2,
    name: "Isuzu",
    intro:
      "Browse Isuzu commercial-vehicle records from Japan and compare the exact model, year, chassis, cab and body configuration. Commercial vehicles require more than a model-name comparison: payload, dimensions, axle configuration and intended operating class must be checked for the individual unit.",
    buyerGuide:
      "Before selecting an Isuzu truck or commercial vehicle, obtain the chassis and model information, gross vehicle weight, payload or rated capacity where documented, axle configuration, cab type, body dimensions and engine details. Confirm the vehicle’s condition and whether the destination can register the same commercial classification.",
    focusPoints: [
      "Verify chassis, cab, body dimensions, weight ratings and payload documentation.",
      "Check engine, transmission, axle layout, tyres, brakes and visible chassis condition.",
      "Confirm destination registration class, permits, duties and shipping constraints.",
    ],
  },
  {
    slug: "audi",
    seoTier: 2,
    name: "Audi",
    intro:
      "Explore the Audi vehicles currently represented in Wazir Trading’s Japan inventory. The available catalogue spans several A- and Q-series designations and includes hatchback, sedan, wagon, SUV and coupe configurations. Because the stock is spread across different models and years, compare the individual vehicle record rather than assuming that equipment or powertrain is shared across the range.",
    buyerGuide:
      "For an Audi listing, confirm the exact model designation, model code, year, engine displacement, fuel type, transmission and grade. Compare the recorded mileage, steering side, photographs, exterior and interior condition information, and any available auction or inspection details. For vehicles with specialised transmissions or electronic equipment, request unit-specific diagnostic and service information where available. Obtain a written FOB quotation and confirm destination import eligibility before payment.",
    focusPoints: [
      "Match the model code, year, engine and trim to the export documents.",
      "Review transmission, steering, mileage, condition grades and photographs for the exact unit.",
      "Confirm equipment, diagnostic information, FOB scope and destination import rules in writing.",
    ],
  },
  {
    slug: "mercedes-benz",
    seoTier: 2,
    name: "Mercedes-Benz",
    intro:
      "Browse the Mercedes-Benz vehicles currently listed from Japan, including several passenger-car and SUV nameplates. The current inventory is distributed across multiple model families and body configurations, so a manufacturer-level guide is more useful than creating a separate thin page for every single vehicle designation. Use each vehicle reference to compare the exact year, grade, engine, fuel and condition.",
    buyerGuide:
      "Check the full model designation, generation, engine and fuel type, transmission, body configuration, mileage and steering side. AMG-labelled variants, station wagons and SUVs can have materially different specifications from standard versions with similar model names. Review the actual photographs, exterior and interior grades, warning indicators and available service or inspection records. Ask for written confirmation of the vehicle-specific equipment, FOB price, export documents and shipping scope.",
    focusPoints: [
      "Distinguish standard, AMG-labelled and body-style variants using the exact vehicle record.",
      "Check engine, transmission, mileage, condition grades, warning indicators and photographs.",
      "Request a written quotation and verify destination eligibility before arranging payment.",
    ],
  },
  {
    slug: "mitsubishi-fuso",
    seoTier: 3,
    name: "Mitsubishi Fuso",
    intro:
      "Explore Mitsubishi Fuso commercial trucks available in Wazir Trading’s Japan inventory. The current records are centred on the Canter family, with additional specialist truck configurations represented by their individual listing descriptions. For commercial vehicles, the chassis, body, cab, axle, rated weight and intended operating use matter as much as the model name.",
    buyerGuide:
      "Before selecting a Mitsubishi Fuso truck, confirm the exact model and chassis code, model year, engine displacement, diesel specification, transmission, cab type, body configuration and steering side. Review photographs of the frame, underbody, tyres, brakes, cargo body and any fitted crane or refrigeration equipment. Request gross vehicle weight and payload documentation when available, and confirm commercial registration, permits, loading limits, shipping dimensions and destination rules with the relevant authorities.",
    focusPoints: [
      "Verify model/chassis code, engine, transmission, cab and body configuration.",
      "Inspect frame, underbody, brakes, tyres and specialist equipment using vehicle-specific evidence.",
      "Confirm documented weights, commercial registration, permits and shipping dimensions.",
    ],
  },
  {
    slug: "hino",
    seoTier: 3,
    name: "Hino",
    intro:
      "Review the Hino commercial vehicles represented in Wazir Trading’s current Japanese inventory. The available stock is spread across several truck designations rather than one high-volume model, so this manufacturer guide groups the relevant commercial listings without creating separate pages for models supported by only one or two vehicles.",
    buyerGuide:
      "For each Hino truck, identify the exact model, chassis and cab designation, year, engine displacement, fuel type, transmission and body configuration. Confirm gross vehicle weight and payload from documentation rather than estimating from photographs. Inspect the frame, underbody, suspension, tyres, brakes, cargo body and visible signs of commercial use. Ask for the available auction or inspection information and confirm destination registration class, import permits and carrier size restrictions.",
    focusPoints: [
      "Confirm the Hino model, chassis, engine, transmission and documented weight rating.",
      "Review frame, suspension, brakes, tyres, cargo body and condition photographs.",
      "Check commercial registration, import permits, duties and shipping restrictions for the destination.",
    ],
  },
] as const;

const modelContent = [
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Prius",
    slug: "prius",
    seoTier: 1,
    intro:
      "Compare Toyota Prius listings by generation, grade, model year and hybrid-system specification. A Prius nameplate alone does not identify the exact battery, equipment or vehicle configuration, so review the individual record and request unit-specific condition information.",
    buyerGuide:
      "For a Prius, confirm the model code and generation, engine and hybrid-system details, mileage, grade and warning-light status. Ask what battery or diagnostic information is available, review service records when supplied, and confirm the vehicle’s year and emissions or import classification meet the destination rules.",
    focusPoints: [
      "Confirm the exact generation, model code, year and grade.",
      "Request available hybrid-battery, diagnostic and service information for that car.",
      "Check warning indicators, mileage, condition photographs and destination eligibility.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Aqua",
    slug: "aqua",
    seoTier: 1,
    intro:
      "Review Toyota Aqua compact hybrid listings from Japan and compare year, grade, mileage, hybrid-system details and condition. Equipment and specifications can change between model updates, so verify the exact vehicle rather than relying on a generic model description.",
    buyerGuide:
      "Check the vehicle’s model code, year and grade, and request the available hybrid battery or diagnostic information. Compare mileage, tyres, body condition, cabin condition and warning indicators. Confirm the engine or hybrid details shown on the documents and check local age, emissions and import requirements.",
    focusPoints: [
      "Match the model code, model year and equipment grade.",
      "Ask for battery or diagnostic information available for the individual vehicle.",
      "Review mileage, condition photographs and the destination’s import limits.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Corolla",
    slug: "corolla",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Explore Toyota Corolla listings from Japan and distinguish each unit by model generation, body style, grade, year and powertrain. Corolla specifications are not identical across markets or generations, so the individual chassis and vehicle record should guide your comparison.",
    buyerGuide:
      "Confirm whether the listed Corolla is a sedan, hatchback or another configuration, then verify its model code, engine, transmission, grade and equipment. Compare mileage, safety features, tyres, photographs and any inspection notes. Check that the exact body style and engine are accepted in the destination market.",
    focusPoints: [
      "Verify body configuration, chassis or model code and generation.",
      "Compare engine, transmission, grade, mileage and the actual equipment list.",
      "Check the destination’s vehicle-age, emissions and import requirements.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Vitz",
    slug: "vitz",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Compare Toyota Vitz compact hatchback listings by model year, grade, engine, transmission and condition. Model naming can differ by market and generation, so confirm the exact chassis and documentation when comparing a Vitz with similarly named Yaris variants.",
    buyerGuide:
      "Check the model code and year, engine displacement, transmission, grade and mileage. Review exterior panels, cabin wear, tyres and photographs, and confirm the name used on the export and registration documents. A destination authority should confirm whether the exact specification and age qualify for import.",
    focusPoints: [
      "Match the exact model code and export-document name.",
      "Compare engine size, transmission, grade, mileage and visible condition.",
      "Check the destination’s age, emissions and compact-car classification rules.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Harrier",
    slug: "harrier",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Review Toyota Harrier SUV listings sourced from Japan and compare generation, grade, engine or hybrid configuration, drivetrain and condition. Features and mechanical specifications vary between versions, so use the listing’s details as the reference for each vehicle.",
    buyerGuide:
      "Confirm the Harrier model code, year, grade, engine or hybrid system and whether the vehicle is 2WD or 4WD. Check the cabin and cargo configuration, safety equipment, tyre condition, underbody photographs and any warning indicators. Confirm vehicle dimensions, duties and import eligibility with the destination authority.",
    focusPoints: [
      "Verify model code, generation, grade and 2WD or 4WD configuration.",
      "Check engine or hybrid system, mileage, tyres and underbody condition.",
      "Compare dimensions, equipment, photographs and destination import rules.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Hiace",
    slug: "hiace",
    seoTier: 1,
    modelAliases: ["Hiace", "Hiace Wagon"],
    directoryVisible: true,
    intro:
      "Compare Toyota Hiace van and commercial-vehicle listings by body length, roof height, seating or cargo layout, year and powertrain. The Hiace name covers different configurations, making dimensions and the exact vehicle use especially important.",
    buyerGuide:
      "Ask for the model or chassis code, body dimensions, roof and wheelbase configuration, seating or cargo layout, engine, transmission and gross vehicle weight where available. Inspect load area, sliding doors, rear doors, underbody and commercial wear. Confirm local commercial registration and import requirements before purchase.",
    focusPoints: [
      "Confirm wheelbase, body length, roof height and passenger or cargo layout.",
      "Review payload or weight information, chassis condition, doors and interior wear.",
      "Check commercial-vehicle registration, import permits and shipping dimensions.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Voxy",
    slug: "voxy",
    seoTier: 1,
    intro:
      "Explore Toyota Voxy minivan listings and compare seating layout, grade, model year, engine, transmission and equipment. Family-oriented features can differ by trim and generation, so verify that the specific vehicle includes the configuration you need.",
    buyerGuide:
      "Check the Voxy model code and generation, seat count and arrangement, engine, transmission, drive type and grade. Confirm sliding-door operation, seat mechanisms, air-conditioning, safety equipment and the condition of all three seating rows. Verify vehicle dimensions and the destination’s rules for passenger vehicles.",
    focusPoints: [
      "Confirm seat count, row layout, model generation and grade.",
      "Check sliding doors, seat mechanisms, air-conditioning and safety equipment.",
      "Verify dimensions, engine, drivetrain and local passenger-vehicle import rules.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Land Cruiser",
    slug: "land-cruiser",
    seoTier: 1,
    modelAliases: ["Land Cruiser", "Land Cruiser Wagon", "Land Cruiser Cygnus"],
    directoryVisible: true,
    intro:
      "Compare Toyota Land Cruiser listings from Japan by series or model code, year, engine, transmission, drivetrain and equipment. The Land Cruiser family includes distinct sizes and generations, so verify the exact version and its physical dimensions before requesting a quotation.",
    buyerGuide:
      "Identify the series and chassis code, engine, transmission, axle and 4WD system, body dimensions and seating arrangement. Review underbody and chassis photographs, tyres, suspension and service information where available. Confirm weight, emissions, vehicle-age and import restrictions in the destination market.",
    focusPoints: [
      "Identify the exact series, chassis code, engine and drivetrain.",
      "Inspect underbody, chassis, tyres, suspension and service information.",
      "Check vehicle dimensions, weight, age and destination import eligibility.",
    ],
  },
  {
    makeSlug: "nissan",
    make: "Nissan",
    model: "Note",
    slug: "note",
    seoTier: 1,
    intro:
      "Review Nissan Note compact-car listings and compare year, grade, engine or e-POWER configuration, transmission and condition. Powertrain details vary, so confirm the exact system fitted to the individual car rather than assuming all Note models are the same.",
    buyerGuide:
      "Verify the model code, generation, grade and exact powertrain. For e-POWER versions, request the available hybrid-system and battery diagnostic information. Check mileage, warning indicators, tyres, cabin condition, equipment and export documents, then confirm the vehicle meets destination requirements.",
    focusPoints: [
      "Check whether the specific vehicle is petrol or e-POWER and verify its model code.",
      "Request available diagnostic and battery information for electrified versions.",
      "Review grade, mileage, warning lights, photographs and import eligibility.",
    ],
  },
  {
    makeSlug: "nissan",
    make: "Nissan",
    model: "X-Trail",
    slug: "x-trail",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Compare Nissan X-Trail SUV records by generation, grade, model year, engine or hybrid system, drivetrain and seating. The model has changed over time, so identify the exact version and do not infer equipment or four-wheel drive from the badge alone.",
    buyerGuide:
      "Check the X-Trail model code, engine, transmission and drivetrain, along with seating and equipment. For hybrid variants, ask for the available battery and diagnostic details. Inspect tyres, suspension, underbody and cargo area, and compare the dimensions and import classification with local rules.",
    focusPoints: [
      "Verify the exact generation, engine, transmission and 2WD or 4WD layout.",
      "Check seating, tyres, suspension, underbody and hybrid-system information if relevant.",
      "Confirm dimensions, equipment, condition and destination eligibility.",
    ],
  },
  {
    makeSlug: "nissan",
    make: "Nissan",
    model: "Serena",
    slug: "serena",
    seoTier: 1,
    intro:
      "Browse Nissan Serena minivan listings and compare seat configuration, model year, grade, engine, transmission and equipment. Seating layouts and driver-assistance features vary by generation and trim, so inspect the exact vehicle details before purchase.",
    buyerGuide:
      "Confirm the Serena model code, generation, seat count and arrangement, engine or e-POWER configuration, transmission and drivetrain. Check powered doors, seat folding, air-conditioning, warning indicators and the condition of every seating row. Verify local import requirements for the intended passenger capacity.",
    focusPoints: [
      "Confirm seating capacity, arrangement, generation and grade.",
      "Check engine or e-POWER details, doors, seat mechanisms and safety equipment.",
      "Verify passenger-vehicle dimensions and destination import rules.",
    ],
  },
  {
    makeSlug: "nissan",
    make: "Nissan",
    model: "Leaf",
    slug: "leaf",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Compare Nissan Leaf electric-vehicle listings from Japan by model year, battery specification, grade, mileage and charging equipment. Battery capacity and usable condition are central to an EV purchase and should be confirmed for the exact vehicle.",
    buyerGuide:
      "Request the battery health or state-of-health information available for the individual Leaf, and confirm the battery capacity, model year, charging connector and included charging accessories. Check warning indicators, range-related documentation, tyres and cabin condition. Verify local charging compatibility, EV import rules and battery-related transport requirements.",
    focusPoints: [
      "Request battery health information and confirm the exact battery specification.",
      "Verify charging connector, included cables and compatibility with local charging infrastructure.",
      "Check EV import, registration, battery transport and destination support requirements.",
    ],
  },
  {
    makeSlug: "honda",
    make: "Honda",
    model: "Fit",
    slug: "fit",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Review Honda Fit compact hatchback listings from Japan and compare generation, grade, engine or hybrid configuration, transmission and mileage. Vehicle equipment and powertrain options vary, so check the full model designation and specification for the exact unit.",
    buyerGuide:
      "Confirm the Fit model code, year, grade, engine and whether the vehicle is petrol or hybrid. Request available hybrid-system information when applicable, then review mileage, transmission, cabin flexibility, safety equipment, tyres and photographs. Ensure the vehicle’s age and specification comply with destination rules.",
    focusPoints: [
      "Identify the generation, model code, grade and exact powertrain.",
      "Check transmission, mileage, cabin condition and safety equipment.",
      "For hybrid versions, request available diagnostic information before purchase.",
    ],
  },
  {
    makeSlug: "honda",
    make: "Honda",
    model: "Vezel",
    slug: "vezel",
    seoTier: 1,
    intro:
      "Compare Honda Vezel compact SUV listings by model year, grade, engine or hybrid system, drivetrain and condition. Specifications can differ across generations and trim packages, so verify the actual equipment and powertrain on the vehicle record.",
    buyerGuide:
      "Check the Vezel model code and generation, petrol or hybrid system, transmission and 2WD or 4WD configuration. Compare safety and driver-assistance equipment, mileage, tyres, interior condition and warning indicators. Confirm dimensions and any local rules for hybrid or other powertrain types.",
    focusPoints: [
      "Confirm generation, grade, engine or hybrid system and drivetrain.",
      "Compare safety equipment, mileage, tyres and condition photographs.",
      "Check local vehicle-age, emissions, hybrid and import rules.",
    ],
  },
  {
    makeSlug: "honda",
    make: "Honda",
    model: "Civic",
    slug: "civic",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Explore Honda Civic listings from Japan and compare the exact body style, generation, model year, grade, engine, transmission and condition. Civic variants differ across years and body configurations, so the vehicle record should determine the comparison.",
    buyerGuide:
      "Identify the chassis and generation, then verify whether the Civic is a sedan, hatchback or another listed configuration. Compare engine, transmission, grade, mileage, wheels, safety equipment and photographs. Request confirmation of any optional equipment and check the destination’s emissions and import requirements.",
    focusPoints: [
      "Verify chassis, generation, body style, engine and transmission.",
      "Check grade, mileage, safety equipment and visible exterior or cabin condition.",
      "Confirm destination eligibility for the specific year and powertrain.",
    ],
  },
  {
    makeSlug: "honda",
    make: "Honda",
    model: "Freed",
    slug: "freed",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Compare Honda Freed compact MPV listings by seat count, seating layout, grade, model year and powertrain. The Freed is offered in different configurations, so confirm the specific passenger arrangement and access features shown for each vehicle.",
    buyerGuide:
      "Check the Freed model code, generation, seat count, row arrangement, engine or hybrid system and transmission. Inspect sliding doors, rear access, seat mechanisms, air-conditioning and child-seat or safety equipment where listed. Confirm the vehicle’s dimensions and registration class with the destination authority.",
    focusPoints: [
      "Confirm seat count, row configuration, model code and grade.",
      "Check sliding doors, seat mechanisms, access and safety equipment.",
      "Verify dimensions, powertrain and destination passenger-vehicle rules.",
    ],
  },
  {
    makeSlug: "suzuki",
    make: "Suzuki",
    model: "Swift",
    slug: "swift",
    seoTier: 1,
    modelAliases: ["Swift", "Swif"],
    directoryVisible: true,
    intro:
      "Review Suzuki Swift hatchback listings from Japan by generation, grade, engine displacement, transmission and mileage. Equipment and drivetrain can differ between versions, so verify the actual configuration before comparing price or condition.",
    buyerGuide:
      "Confirm the Swift model code and year, engine size, transmission, drive type and trim. Inspect tyres, body panels, cabin wear and any condition notes. If the vehicle is a sport or other special variant, confirm the exact factory specification and equipment through the available documents.",
    focusPoints: [
      "Verify model code, generation, engine, transmission and drive type.",
      "Compare grade, mileage, wheels, safety features and photographed condition.",
      "Check vehicle-age and engine-class rules in the destination country.",
    ],
  },
  {
    makeSlug: "suzuki",
    make: "Suzuki",
    model: "Jimny",
    slug: "jimny",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Compare Suzuki Jimny compact off-road vehicle listings by generation, body configuration, engine, transmission and drivetrain. Confirm whether the exact car is a 4WD version and review its chassis and underbody condition before making a purchase decision.",
    buyerGuide:
      "Check the Jimny model code, generation, engine displacement, transmission and transfer or 4WD specification. Review chassis, underbody, suspension, tyres and evidence of off-road use. Confirm seating, dimensions and the destination’s rules for compact or kei-class vehicles where relevant.",
    focusPoints: [
      "Confirm generation, model code, engine and the exact 4WD system.",
      "Inspect chassis, underbody, suspension, tyres and signs of off-road use.",
      "Check vehicle classification, dimensions and destination import eligibility.",
    ],
  },
  {
    makeSlug: "mazda",
    make: "Mazda",
    model: "Demio",
    slug: "demio",
    seoTier: 1,
    intro:
      "Browse Mazda Demio compact hatchback listings sourced from Japan and compare year, grade, engine, transmission and condition. Some markets use the Mazda2 name for related vehicles, so match the actual model and chassis information on the export documents.",
    buyerGuide:
      "Verify the Demio model code, year, engine type, transmission and grade. Compare mileage, tyres, body condition and the equipment listed for the specific car. Check how the model is identified on its export documentation and whether the destination requires particular emissions or vehicle-age evidence.",
    focusPoints: [
      "Match Demio model code, year and the name shown on its documentation.",
      "Compare engine, transmission, grade, mileage and vehicle photographs.",
      "Confirm destination vehicle-age, emissions and registration requirements.",
    ],
  },
  {
    makeSlug: "mazda",
    make: "Mazda",
    model: "CX-5",
    slug: "cx-5",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Compare Mazda CX-5 SUV records by model generation, year, grade, engine, transmission and drivetrain. Petrol and diesel specifications, equipment packages and drive configurations differ, so use the exact listing details when comparing vehicles.",
    buyerGuide:
      "Confirm the CX-5 model code, engine and fuel type, transmission, 2WD or 4WD configuration and grade. For diesel variants, request service and inspection information where available. Review tyres, suspension, underbody, safety equipment, mileage and the destination’s emissions and import rules.",
    focusPoints: [
      "Verify model generation, engine, fuel type and drivetrain.",
      "Check service or inspection information, tyres, suspension and underbody condition.",
      "Compare grade, dimensions, FOB price and destination import eligibility.",
    ],
  },
  {
    makeSlug: "subaru",
    make: "Subaru",
    model: "Forester",
    slug: "forester",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Review Subaru Forester SUV listings by generation, year, engine, transmission, drivetrain and grade. Confirm the exact mechanical layout and equipment, since specifications and safety features vary between model years and individual vehicles.",
    buyerGuide:
      "Check the Forester model code, engine, transmission and drivetrain on the individual record. Review service information where available, warning lights, tyres, suspension, underbody photographs and mileage. Confirm dimensions, engine class, emissions and import eligibility in the destination market.",
    focusPoints: [
      "Confirm model code, engine, transmission and drivetrain from the record.",
      "Review service evidence, tyres, suspension, underbody and warning indicators.",
      "Check dimensions, emissions, vehicle age and local import requirements.",
    ],
  },
  {
    makeSlug: "mitsubishi",
    make: "Mitsubishi",
    model: "Outlander",
    slug: "outlander",
    seoTier: 2,
    modelAliases: ["Outlander", "Outlander PHEV"],
    directoryVisible: true,
    intro:
      "Compare Mitsubishi Outlander SUV listings from Japan by model year, grade, engine or plug-in hybrid specification, drivetrain and condition. Verify whether the exact unit is a conventional or PHEV version and check the documentation for its equipment.",
    buyerGuide:
      "Confirm the Outlander model code, generation, engine, transmission, drive configuration and whether it is a plug-in hybrid. For PHEV vehicles, request available battery condition and charging details. Review seating, cargo space, tyres, underbody, warning indicators and destination EV import requirements.",
    focusPoints: [
      "Verify model generation and whether the powertrain is petrol, diesel or PHEV.",
      "For PHEV versions, request battery and charging information for the specific unit.",
      "Check seating, dimensions, condition and destination EV or vehicle import rules.",
    ],
  },
  {
    makeSlug: "daihatsu",
    make: "Daihatsu",
    model: "Mira",
    slug: "mira",
    seoTier: 2,
    modelAliases: ["Mira", "Mira e:S"],
    directoryVisible: false,
    intro:
      "Review Daihatsu Mira compact-car listings from Japan and compare engine displacement, model code, year, grade and condition. Verify the vehicle’s exact classification because kei specifications and registration treatment may differ in the destination market.",
    buyerGuide:
      "Check the Mira model code, engine displacement, transmission, dimensions, seat count and grade. Request chassis and export-document details where available. Before purchase, confirm whether the destination accepts the vehicle’s engine class, dimensions, age and original Japanese classification.",
    focusPoints: [
      "Confirm model code, engine displacement, year and dimensions.",
      "Check chassis condition, mileage, transmission and vehicle photographs.",
      "Verify local rules for kei-class or compact vehicles before arranging export.",
    ],
  },
  {
    makeSlug: "lexus",
    make: "Lexus",
    model: "RX",
    slug: "rx",
    seoTier: 2,
    directoryVisible: false,
    intro:
      "Compare Lexus RX SUV listings from Japan by generation, grade, engine or hybrid configuration, drivetrain and equipment. The RX family includes different powertrain and trim combinations, so confirm the exact specification, condition and included features for each vehicle.",
    buyerGuide:
      "Identify the RX model code and generation, grade, engine or hybrid system, transmission and drivetrain. Request the available service and diagnostic information, inspect interior and exterior condition, and check warning indicators. Verify safety equipment, multimedia compatibility and destination import requirements before committing.",
    focusPoints: [
      "Verify generation, grade, engine or hybrid system and drivetrain.",
      "Request available service and diagnostic details and inspect cabin equipment.",
      "Confirm the quoted condition, FOB scope and destination compliance.",
    ],
  },
  {
    makeSlug: "isuzu",
    make: "Isuzu",
    model: "Elf",
    slug: "elf",
    seoTier: 2,
    modelAliases: ["Elf", "Elf Truck"],
    directoryVisible: true,
    intro:
      "Explore Isuzu Elf commercial truck records from Japan and compare chassis, cab, body, engine and weight details. Vehicle length, width, payload and axle layout are essential selection criteria and should be verified against the individual truck documentation.",
    buyerGuide:
      "Check the Elf chassis and model code, cab configuration, body type and dimensions, gross vehicle weight and payload rating where available. Inspect frame, underbody, tyres, brakes, suspension and cargo body. Confirm registration class, operating permits, loading limits and shipping measurements with the destination authorities and carrier.",
    focusPoints: [
      "Confirm chassis, cab, body dimensions, gross weight and documented payload.",
      "Inspect frame, underbody, brakes, tyres, suspension and cargo body.",
      "Verify destination commercial-vehicle registration, permits and shipping limits.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Corolla Fielder",
    slug: "corolla-fielder",
    seoTier: 1,
    intro:
      "The Toyota Corolla Fielder is one of the largest individual model groups in the current Wazir Trading inventory. The available records identify it as a wagon and span model years 2006–2023, with multiple grades and both conventional and hybrid-labelled powertrain records. Compare the exact chassis code and grade because the 1.5-litre and 1.8-litre examples are not interchangeable.",
    buyerGuide:
      "When comparing Corolla Fielder listings, check whether the record is a conventional petrol or hybrid version, then verify the engine displacement, grade, transmission, model year and chassis code. The inventory includes grades such as EX, Hybrid EX, EX 4WD and Hybrid G, but equipment must be checked on the individual vehicle. Review mileage, auction or condition grades, photographs, steering side and the exact export documents. For hybrid examples, request available battery or diagnostic information before making a decision.",
    focusPoints: [
      "Compare 1.5-litre and 1.8-litre records, hybrid status, grade and chassis code.",
      "Check wagon cargo layout, transmission, mileage, condition grades and photographs.",
      "Request vehicle-specific hybrid diagnostics where applicable and confirm the written FOB/export scope.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Yaris",
    slug: "yaris",
    seoTier: 1,
    intro:
      "Wazir Trading’s current Toyota Yaris records are hatchbacks spanning model years 2020–2023. The inventory includes 1.0-litre and 1.5-litre examples, with a smaller number of hybrid-labelled records. Grade names such as X, G, Z and RZ appear in the listings, so buyers should compare the exact version rather than treating every Yaris as the same specification.",
    buyerGuide:
      "Check the model year, engine displacement, fuel or hybrid designation, transmission, grade and chassis code for each Yaris. Confirm whether a listing is a conventional petrol or hybrid vehicle and ask for the vehicle-specific diagnostic information available for electrified versions. Compare mileage, body panels, tyres, cabin condition, safety equipment and photographs. Before ordering, verify destination age, emissions, engine-class and registration rules against the exact year and specification.",
    focusPoints: [
      "Distinguish 1.0-litre, 1.5-litre and hybrid records by chassis and grade.",
      "Compare X, G, Z or RZ equipment only against the actual vehicle record.",
      "Check condition, mileage, safety equipment and destination import eligibility.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "RAV4",
    slug: "rav4",
    seoTier: 1,
    intro:
      "The Toyota RAV4 inventory currently includes SUV listings from model years 2019–2026. The available records show both 2.0-litre and 2.5-litre engine specifications and a mix of gasoline and hybrid entries. Grades recorded in stock include G, Adventure, G Z, X and Z, making grade and powertrain verification important when comparing vehicles.",
    buyerGuide:
      "For a RAV4, confirm the generation, chassis code, model year, engine displacement, fuel type, transmission, grade and actual drivetrain shown in the listing. Do not infer 4WD from an Adventure badge or assume every 2.5-litre record is a hybrid. Review tyres, suspension, underbody, boot space, safety equipment, mileage and photographs. For hybrid versions, request available battery and diagnostic information. Confirm vehicle dimensions, emissions and destination import eligibility before payment.",
    focusPoints: [
      "Verify 2.0-litre or 2.5-litre engine, fuel type, model year and grade.",
      "Confirm the recorded drivetrain rather than assuming 2WD or 4WD from the trim name.",
      "Review tyres, underbody, mileage, hybrid diagnostics where relevant and destination rules.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Raize",
    slug: "raize",
    seoTier: 1,
    intro:
      "Toyota Raize listings in the current inventory are compact SUVs from model years 2020–2026. The records include 1.0-litre and 1.2-litre engine entries, gasoline and hybrid-labelled examples, and several grades including Z, X, G and XS. Buyers should compare the precise engine and grade because the model name alone does not establish the powertrain or equipment.",
    buyerGuide:
      "Check each Raize’s year, chassis or model code, engine displacement, fuel type, transmission and grade. Verify whether the listing is a 1.0-litre or 1.2-litre vehicle and whether it is identified as a hybrid. Compare the actual safety and convenience equipment, mileage, tyre condition, body panels, cabin photographs and steering side. Request diagnostic or battery information when available for electrified versions, and check destination engine-size, emissions and vehicle-age rules.",
    focusPoints: [
      "Compare 1.0-litre and 1.2-litre entries and confirm any hybrid designation.",
      "Verify Z, X, G or XS equipment against the vehicle-specific record.",
      "Review condition, safety equipment, photographs and destination import limits.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Premio",
    slug: "premio",
    seoTier: 1,
    intro:
      "The Toyota Premio records in current stock are sedans spanning model years 2003–2021. The inventory includes 1.5-, 1.8- and 2.0-litre gasoline examples and several grade or package names, including 1.5F EX Package and 1.8X L Package. Compare the year and grade closely because the equipment and engine differ across the stock range.",
    buyerGuide:
      "When reviewing a Premio, verify the model year, engine displacement, grade, transmission, model code and export-document designation. The available records span more than one engine size, so confirm the exact specification on the individual car. Check mileage, body and cabin condition, safety equipment, tyres and photographs. Ask for the available auction or inspection information and a written FOB quotation that clearly identifies the vehicle reference and any excluded destination costs.",
    focusPoints: [
      "Compare 1.5-, 1.8- and 2.0-litre records and identify the correct grade/package.",
      "Review sedan body condition, mileage, transmission and photographs.",
      "Match the vehicle reference to the written FOB quotation and destination rules.",
    ],
  },
  {
    makeSlug: "lexus",
    make: "Lexus",
    model: "NX",
    slug: "nx",
    seoTier: 1,
    intro:
      "Lexus NX vehicles in the current inventory are SUVs recorded from model years 2015 onward. The available entries include 2.0-litre gasoline and 2.5-litre hybrid specifications, with F-Sport, Version L and I Package designations. One supplied record carries a 2027 model year and should be verified against its original documentation before that year is repeated in marketing copy.",
    buyerGuide:
      "Confirm the NX generation and chassis code, model year, engine displacement, fuel or hybrid system, transmission and grade. F-Sport, Version L and I Package vehicles can differ in equipment, so check the exact feature list and photographs. For hybrid versions, request the available battery or diagnostic information. Review mileage, interior and exterior condition, safety features and warning indicators. Verify the model year on source documents, then check destination vehicle-age and emissions requirements.",
    focusPoints: [
      "Distinguish 2.0-litre gasoline and 2.5-litre hybrid specifications.",
      "Confirm F-Sport, Version L or I Package equipment from the actual listing.",
      "Verify the 2027-dated record and request hybrid diagnostics where applicable.",
    ],
  },
  {
    makeSlug: "mitsubishi-fuso",
    make: "Mitsubishi Fuso",
    model: "Canter",
    slug: "canter",
    seoTier: 2,
    modelAliases: ["Canter"],
    intro:
      "Mitsubishi Fuso Canter is a commercial-truck model group in the current inventory, separate from Mitsubishi-branded Canter listings. The available Fuso records span model years 1990–2026 and include diesel engine entries around 3.0- and 4.9-litre, manual and automatic transmissions, and specialist bodies such as refrigerator/freezer trucks and car transporters.",
    buyerGuide:
      "Verify the Mitsubishi Fuso manufacturer identity, Canter series, chassis code, year, engine, transmission, cab type, axle layout and body configuration. Refrigerated, transporter, flat-bed and crane-equipped vehicles must be assessed as the exact fitted unit; do not assume equipment from a variant label alone. Review frame, underbody, tyres, brakes, suspension, cargo body and operating condition. Request documented gross weight and payload where available and confirm commercial registration, permits and shipping dimensions with the destination authorities.",
    focusPoints: [
      "Keep Mitsubishi Fuso Canter separate from Mitsubishi Canter in manufacturer classification.",
      "Confirm chassis, engine, transmission, cab, body and fitted specialist equipment.",
      "Check documented weight, payload, commercial permits and carrier dimensions.",
    ],
  },
  {
    makeSlug: "nissan",
    make: "Nissan",
    model: "Cube",
    slug: "cube",
    seoTier: 2,
    intro:
      "The Nissan Cube stock group contains hatchbacks from model years 2009–2019, with 1.2- and 1.5-litre engine records and several trim designations. The model has distinctive cabin and body proportions, but buyers should still compare the precise grade, year and equipment shown for each vehicle rather than relying on general model descriptions.",
    buyerGuide:
      "Check the Cube’s generation, model code, year, 1.2- or 1.5-litre engine, transmission and trim. Confirm the variant name and any special equipment, including welfare or Nismo-labelled examples, from the vehicle record. Inspect sliding or hinged access points as fitted, cabin condition, seat arrangement, visibility, tyres, mileage and photographs. Request the available inspection information and verify local vehicle-age, dimensions and import requirements.",
    focusPoints: [
      "Compare 1.2-litre and 1.5-litre engine records and verify the exact trim.",
      "Check cabin layout, access, mileage, condition photographs and any specialist equipment.",
      "Confirm vehicle dimensions, export documents and destination eligibility.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Prius Alpha",
    slug: "prius-a",
    seoTier: 1,
    modelAliases: ["Prius A", "Prius Alpha"],
    intro:
      "The Toyota Prius A / Prius Alpha is kept as a separate model guide from the standard Prius page because the inventory uses these distinct nameplates and model-year groups. Current records span 2012–2017 and include 1.8-litre hybrid-labelled examples with multiple grades. Verify the exact designation printed on each vehicle’s documentation.",
    buyerGuide:
      "Compare Prius A and Prius Alpha listings by model code, model year, grade, 1.8-litre engine and hybrid-system details. Check the actual seating and cabin configuration, mileage, transmission, battery or diagnostic information available, warning indicators and service evidence supplied for the individual vehicle. Do not assume that a Prius A/Alpha listing has identical equipment to a standard Prius. Confirm the year, body configuration and export documents before requesting a quotation.",
    focusPoints: [
      "Keep Prius A / Prius Alpha distinct from the standard Prius model group.",
      "Request available hybrid battery, diagnostic and service information for each unit.",
      "Verify grade, seating configuration, model year and the exact export-document name.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Yaris Cross",
    slug: "yaris-cross",
    seoTier: 1,
    intro:
      "Toyota Yaris Cross listings in the current inventory span model years 2020–2026 and include 1.5-litre gasoline and hybrid-labelled records. The source data classifies some examples as SUV and others as hatchback, so this guide intentionally groups the model by its nameplate while showing the recorded body classification for each individual vehicle.",
    buyerGuide:
      "Check the exact Yaris Cross model code, year, grade, 1.5-litre engine, fuel or hybrid designation and transmission. Confirm whether the individual record is classified as an SUV or hatchback in the source documentation; do not change that classification based only on the SEO page label. Compare Z, Hybrid Z and G equipment, drivetrain, mileage, tyres, cabin condition and photographs. Request hybrid diagnostics where relevant and confirm destination dimensions and import rules.",
    focusPoints: [
      "Review the SUV/hatchback classification against the actual vehicle documents.",
      "Compare 1.5-litre gasoline and hybrid versions, grades and recorded drivetrain.",
      "Check dimensions, condition, mileage and hybrid diagnostic information where relevant.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Esquire",
    slug: "esquire",
    seoTier: 2,
    intro:
      "Toyota Esquire vehicles in the current inventory are family-oriented minivan/van listings from model years 2015–2021. The records include 1.8- and 2.0-litre gasoline or hybrid-labelled specifications and predominantly Gi grade examples. The source classifies most as minivans and one as a van, which should remain visible as a record-level distinction.",
    buyerGuide:
      "Compare the Esquire model code, year, 1.8- or 2.0-litre engine, fuel or hybrid designation, transmission and exact grade. Confirm seat count and row layout from the individual record, and inspect sliding doors, seat mechanisms, air-conditioning, safety equipment, cargo space and cabin wear. For hybrid examples, ask for the available battery/diagnostic information. Confirm passenger-vehicle classification, dimensions and destination import requirements before purchase.",
    focusPoints: [
      "Verify Gi or other grade, engine size, hybrid designation and seating layout.",
      "Inspect sliding doors, seats, air-conditioning, safety equipment and cabin condition.",
      "Check recorded minivan/van classification, dimensions and destination registration rules.",
    ],
  },
  {
    makeSlug: "daihatsu",
    make: "Daihatsu",
    model: "Tanto",
    slug: "tanto",
    seoTier: 3,
    intro:
      "Daihatsu Tanto is a compact wagon group in the current inventory with records from model years 2013–2026. All supplied examples show a 660 cc engine and CVT transmission, with several regular and Custom grades. The exact grade, model code and equipment should still be checked because doors, cabin features and safety systems vary by generation.",
    buyerGuide:
      "Confirm the Tanto generation, model code, year, 660 cc engine, CVT transmission and grade. Check whether the vehicle is a standard Tanto or a Custom/other trim and review the exact door arrangement, seat configuration, cabin access, safety equipment and dimensions. Because the engine size and body dimensions may affect destination classification, verify the local rules for Japanese kei vehicles before arranging export. Inspect photographs, mileage and condition information for the exact unit.",
    focusPoints: [
      "Verify the 660 cc specification, model code, year and Custom/standard grade.",
      "Compare cabin access, door operation, seats, safety equipment and dimensions.",
      "Confirm destination treatment of kei-class vehicles before requesting a final quotation.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Hilux",
    slug: "hilux",
    seoTier: 1,
    intro:
      "The current Toyota Hilux inventory consists of pickup-truck listings from model years 2021–2023. The supplied records show 2.4-litre diesel specifications and Z-grade examples. Buyers should verify the precise cab, bed, drivetrain and payload documentation for the individual truck rather than assuming all Hilux listings have the same configuration.",
    buyerGuide:
      "Check the Hilux model code, year, 2.4-litre diesel engine, transmission, cab and bed configuration, drivetrain and grade. Verify whether the unit is a single or double cab and ask for gross vehicle weight and payload documentation when available. Inspect chassis, underbody, suspension, tyres, cargo bed and signs of commercial use. Confirm pickup classification, dimensions, commercial or passenger registration, import permits and shipping limits for the destination.",
    focusPoints: [
      "Confirm cab, bed, drivetrain, model code and the recorded 2.4-litre diesel specification.",
      "Review chassis, underbody, suspension, tyres and cargo-bed condition.",
      "Check payload/weight documents, pickup classification and destination registration rules.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Dyna",
    slug: "dyna",
    seoTier: 3,
    modelAliases: ["Dyna", "Dyna Truck"],
    intro:
      "Toyota Dyna and Dyna Truck records are grouped under one commercial-truck guide to avoid splitting the same model family across separate near-duplicate pages. The current inventory includes several model years and engine sizes from approximately 2.0 to 4.9 litres, with diesel and gasoline entries and a range of cargo-body configurations.",
    buyerGuide:
      "For a Dyna, check the model/chassis code, year, engine displacement and fuel type, cab configuration, transmission, axle layout and exact cargo body. Listing descriptions may identify flat-bed, aluminum-body, carrier, power-gate or double-cab configurations; verify every fitted feature from the actual photographs and documents. Inspect frame, underbody, suspension, brakes and tyres. Request documented gross weight and payload information and confirm commercial registration and shipping dimensions.",
    focusPoints: [
      "Treat Dyna and Dyna Truck as one model family but retain each listing’s original designation.",
      "Verify engine, fuel, cab, cargo body, chassis and documented weight ratings.",
      "Inspect frame and running gear and confirm destination commercial-vehicle rules.",
    ],
  },
  {
    makeSlug: "honda",
    make: "Honda",
    model: "ZR-V",
    slug: "zr-v",
    seoTier: 1,
    intro:
      "Honda ZR-V is represented by SUV listings from model years 2022–2025. The current inventory includes 2.0-litre hybrid-labelled and 1.5-litre gasoline entries, with the Z grade recorded for the available examples. The Toyota-tagged ZR-V record is not included in this Honda page until its manufacturer assignment is verified.",
    buyerGuide:
      "Confirm the Honda manufacturer, ZR-V model code, year, 1.5- or 2.0-litre engine, fuel or hybrid system, transmission and Z grade from the individual listing. Compare the actual equipment, safety systems, mileage, tyres, cabin and body condition, and photographs. Request hybrid diagnostics where applicable and make sure the export documents identify the vehicle correctly. Destination age, emissions and SUV import requirements should be checked against the specific model year.",
    focusPoints: [
      "Keep Honda ZR-V records separate from the Toyota-tagged ZR-V data-quality exception.",
      "Verify engine, fuel/hybrid system, Z grade and exact model code.",
      "Review condition, safety equipment, hybrid diagnostics where relevant and destination rules.",
    ],
  },
  {
    makeSlug: "subaru",
    make: "Subaru",
    model: "XV",
    slug: "xv",
    seoTier: 3,
    intro:
      "Subaru XV is represented in the current inventory by SUV records from model years 2013–2019, with 2.0-litre gasoline and hybrid-labelled entries. The source includes several grade and EyeSight designations. A separate Suzuki-tagged XV record is excluded from this page pending manufacturer verification.",
    buyerGuide:
      "Check that the vehicle documentation identifies Subaru XV, then verify model year, 2.0-litre engine, fuel type, transmission, drivetrain and grade. Review EyeSight and other safety equipment against the actual vehicle record, not the model name alone. Inspect tyres, suspension, underbody, mileage and photographs. Ask for available service or inspection information and confirm the exact vehicle-age, emissions and import rules in the destination.",
    focusPoints: [
      "Verify Subaru identity and distinguish these records from the Suzuki-tagged XV exception.",
      "Compare 2.0-litre gasoline/hybrid entries, grade, transmission and recorded equipment.",
      "Inspect underbody, tyres, suspension, mileage and destination eligibility.",
    ],
  },
  {
    makeSlug: "audi",
    make: "Audi",
    model: "TT",
    slug: "tt",
    seoTier: 3,
    modelAliases: ["TT", "TT Coupe"],
    intro:
      "Audi TT and TT Coupe records are grouped under one coupe guide because the supplied inventory uses both labels for the same model family. The current examples span model years 2004–2012 and include petrol engine records around 1.8 and 2.0 litres. Verify the generation, engine and trim for each individual vehicle.",
    buyerGuide:
      "Compare the TT generation, model year, engine displacement, transmission, grade and model code. The inventory uses both TT and TT Coupe labels, but that does not make the underlying cars identical; retain each listing’s original designation and verify its export documents. Inspect roof/body panels, tyres, suspension, cabin electronics, warning indicators and photographs. Request available inspection information and confirm destination emissions, vehicle-age and import requirements.",
    focusPoints: [
      "Use one Audi TT family page while preserving TT/TT Coupe names on the individual records.",
      "Verify generation, 1.8/2.0-litre engine, transmission, grade and condition.",
      "Review body, suspension, electronics and destination vehicle-age rules.",
    ],
  },
  {
    makeSlug: "mercedes-benz",
    make: "Mercedes-Benz",
    model: "C-Class",
    slug: "c-class",
    seoTier: 3,
    modelAliases: [
      "C-Class",
      "C-Class M-AMG",
      "C-Class Station Wagon",
      "C-Class Station Wagon (M-AMG)",
    ],
    intro:
      "Mercedes-Benz C-Class inventory is grouped across sedan and station-wagon records, including AMG-labelled variants. The current group includes different model years and engine/fuel combinations, so this page covers the C-Class family while every vehicle card and enquiry must retain its exact body style, grade and variant designation.",
    buyerGuide:
      "Check whether the C-Class listing is a sedan or station wagon and whether it carries an AMG designation. Verify the exact model code, year, engine displacement, petrol or diesel fuel, transmission, grade and equipment. Inspect mileage, exterior/interior condition grades, photographs, warning indicators and available maintenance records. Do not assume that an AMG-labelled variant has the same engine or equipment as a standard C-Class. Confirm vehicle documentation, FOB price and destination import rules.",
    focusPoints: [
      "Distinguish sedan, station-wagon and AMG-labelled C-Class records.",
      "Verify engine, fuel, year, transmission, grade and vehicle-specific equipment.",
      "Review condition grades, photographs, service evidence and destination requirements.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Alphard",
    slug: "alphard",
    seoTier: 1,
    intro:
      "Toyota Alphard listings in the current inventory span model years 2018–2025 and are classified as MPV or van. The records include 2.5-litre gasoline and hybrid-labelled entries as well as multiple grades. Buyers should compare seating, access and powertrain details from each individual vehicle rather than infer the specification from the Alphard name.",
    buyerGuide:
      "Confirm the Alphard generation, model code, year, engine, fuel/hybrid designation, transmission and grade. Check seat count, row arrangement, sliding-door operation, seat mechanisms, air-conditioning, safety equipment and the exact body classification recorded for the vehicle. For hybrid examples, ask for available battery or diagnostic information. Review dimensions, mileage and cabin condition, and verify destination passenger-vehicle rules before requesting the final quotation.",
    focusPoints: [
      "Compare MPV/van classification, seating layout, engine and hybrid specification.",
      "Inspect powered doors, seat mechanisms, cabin condition and safety features.",
      "Request hybrid diagnostics where applicable and confirm dimensions/import rules.",
    ],
  },
  {
    makeSlug: "toyota",
    make: "Toyota",
    model: "Sienta",
    slug: "sienta",
    seoTier: 1,
    intro:
      "Toyota Sienta inventory currently consists of MPV listings from model years 2015–2024 with 1.5-litre engine records. The available examples include gasoline and hybrid-labelled versions and several grades. Compare the exact seat layout, grade and powertrain because the Sienta’s family-use configuration can vary by generation.",
    buyerGuide:
      "Verify the Sienta model code, generation, 1.5-litre engine, gasoline or hybrid designation, transmission and grade. Confirm the number and arrangement of seats, sliding-door operation, rear-seat folding, luggage space, air-conditioning and safety equipment. Check mileage, tyres, cabin and exterior photographs, and warning indicators. Ask for the available hybrid diagnostic information and confirm passenger-vehicle classification and destination registration requirements.",
    focusPoints: [
      "Confirm 1.5-litre specification, fuel type, grade and model generation.",
      "Check seat count, sliding doors, rear-seat folding and cargo configuration.",
      "Review photographs, mileage, hybrid diagnostics where relevant and import rules.",
    ],
  },
  {
    makeSlug: "nissan",
    make: "Nissan",
    model: "March",
    slug: "march",
    seoTier: 1,
    intro:
      "The Nissan March inventory includes hatchbacks from model years 1997–2021, with 1.2-, 1.3- and 1.5-litre engine records and a broad range of trim designations. The large year span means buyers should compare generation, chassis code and grade rather than assuming that all March listings have the same equipment or safety specification.",
    buyerGuide:
      "Confirm the March generation and model code, year, engine displacement, transmission and exact grade. Compare the vehicle’s mileage, safety equipment, tyres, body condition, cabin wear and photographs. Check that the model year and engine meet destination import and emissions rules, and request written confirmation of the reference, FOB price and export-document details.",
    focusPoints: [
      "Distinguish the March generation, engine size and trim from the exact model code.",
      "Review mileage, safety equipment, tyres, cabin and body condition.",
      "Check destination age and emissions requirements before requesting a final quotation.",
    ],
  },
  {
    makeSlug: "suzuki",
    make: "Suzuki",
    model: "Wagon R",
    slug: "wagon-r",
    seoTier: 1,
    intro:
      "Suzuki Wagon R listings in the current inventory are 660 cc compact wagons from model years 2012–2022. The available records include FX, FZ, T, FA and X grades, with gasoline and hybrid-labelled fuel entries. Because this is a kei-class vehicle, the exact dimensions, engine and destination classification should be confirmed for each listing.",
    buyerGuide:
      "Check the Wagon R model code, year, 660 cc engine, grade, fuel designation and transmission. Compare seat arrangement, access, cabin dimensions, safety equipment, mileage and photographs. For hybrid-labelled examples, ask for the precise system description and any available diagnostics. Confirm whether the destination recognises kei-class vehicles and how engine size, age and dimensions affect import or registration.",
    focusPoints: [
      "Verify the 660 cc specification, year, model code and FX/FZ/T/FA/X grade.",
      "Check seating, cabin condition, safety equipment and hybrid details where applicable.",
      "Confirm destination treatment of kei-class vehicles and their age/dimension limits.",
    ],
  },
  {
    makeSlug: "mitsubishi",
    make: "Mitsubishi",
    model: "Canter",
    slug: "canter",
    seoTier: 3,
    modelAliases: ["Canter", "Canter Guts"],
    intro:
      "Mitsubishi Canter is a light commercial truck represented by a substantial group of Wazir Trading inventory from Japan. The current records span model years 1997–2021 and include diesel examples with different engine sizes, manual and automatic transmission entries, and work bodies such as standard cab, carrier, flat body and refuse-truck configurations. Because a truck body can materially change its use and dimensions, compare the exact vehicle rather than selecting by the Canter name alone.",
    buyerGuide:
      "For each Mitsubishi Canter, confirm the chassis and model code, year, engine displacement, fuel type, transmission, cab arrangement, axle configuration and fitted body. The current records include standard-cab, carrier, flat-body and garbage-truck descriptions, as well as 4WD-labelled examples. One source transmission cluster is recorded as CVT, so verify the transmission from the vehicle documents rather than assuming it is correct. Request gross vehicle weight and payload documentation where available. Inspect frame, underbody, suspension, tyres, brakes, cargo body and signs of commercial wear. Confirm commercial registration, operating permits, vehicle-age rules and shipping dimensions with the destination authority and carrier.",
    focusPoints: [
      "Verify Canter chassis/model code, engine, transmission, cab and body configuration from the documents.",
      "Check recorded CVT entries and 4WD claims against the actual specification; inspect frame, brakes, tyres and cargo body.",
      "Request documented gross weight/payload and confirm destination commercial-vehicle rules and carrier dimensions.",
    ],
  },
  {
    makeSlug: "mitsubishi",
    make: "Mitsubishi",
    model: "Minicab Truck",
    slug: "minicab-truck",
    seoTier: 3,
    intro:
      "The Mitsubishi Minicab Truck inventory consists of Japanese kei-class commercial pickups from model years 1998–2013. The available records use 660 cc engines and include manual and automatic transmission entries, with several 4WD-labelled variants. Confirm the individual cab, bed, drive and equipment details from the listing and documents.",
    buyerGuide:
      "Verify the Minicab model code, 660 cc engine, year, transmission, grade and whether the vehicle is documented as 2WD or 4WD. Inspect the bed, frame, underbody, suspension, tyres, brakes and signs of commercial use. Request gross vehicle weight and payload information where available. Check local rules for kei trucks, commercial registration, vehicle age, dimensions and shipping limits.",
    focusPoints: [
      "Confirm model code, engine, transmission and the actual 2WD/4WD specification.",
      "Inspect frame, bed, suspension, tyres, brakes and underbody photographs.",
      "Verify kei-truck classification, documented weight and destination commercial import rules.",
    ],
  },
  {
    makeSlug: "daihatsu",
    make: "Daihatsu",
    model: "Move Canbus",
    slug: "move-canbus",
    seoTier: 3,
    intro:
      "Daihatsu Move Canbus listings in the current inventory span model years 2017–2025 and use 660 cc gasoline engines with CVT transmissions. The records include several G, Stripes, Theory and Turbo-labelled grades. Check the exact generation and equipment package because the name alone does not confirm the fitted convenience or safety features.",
    buyerGuide:
      "Confirm the Move Canbus model code, year, 660 cc engine, CVT and full grade designation. Compare seating, door operation, cabin access, safety systems, mileage, tyres and condition photographs. Review the exact option list and request clarification about any feature important to you. Verify the destination’s classification, engine-size, age and dimension rules for kei-class vehicles.",
    focusPoints: [
      "Match the 660 cc engine, CVT, year and exact G/Stripes/Theory/Turbo grade.",
      "Check door operation, cabin access, safety features and condition photographs.",
      "Confirm destination classification and kei-vehicle import requirements.",
    ],
  },
  {
    makeSlug: "lexus",
    make: "Lexus",
    model: "LS",
    slug: "ls",
    seoTier: 3,
    intro:
      "Lexus LS inventory includes large sedans from model years 2012–2023, with 3.5-, 4.6- and 5.0-litre engine entries and both gasoline and hybrid-labelled examples. F-Sport, Executive Package, I Package and Version C records appear in the current catalogue, so verify the exact engine and equipment before comparing prices.",
    buyerGuide:
      "Check the LS generation and model code, model year, engine displacement, fuel or hybrid system, transmission and grade. Compare the exact safety, comfort and interior equipment fitted to the car rather than assuming every package includes the same features. Inspect mileage, interior and exterior condition, warning indicators, tyres and photographs. For hybrid versions, request available battery or diagnostic information and verify destination engine-size, emissions and age limits.",
    focusPoints: [
      "Distinguish 3.5-, 4.6- and 5.0-litre records and confirm gasoline/hybrid designation.",
      "Verify F-Sport, Executive Package, I Package or Version C equipment from the listing.",
      "Review condition evidence, hybrid diagnostics where applicable and destination requirements.",
    ],
  },
] as const;

const bodyContent = [
  {
    slug: "suv",
    bodyType: "SUV",
    intro:
      "Browse Japanese SUV listings and compare dimensions, seating, engine, drivetrain and equipment for each available vehicle. SUV is a broad category: a compact crossover and a larger off-road model can have very different operating costs, space and destination import treatment.",
    buyerGuide:
      "Decide the seating and cargo space you need, then compare body dimensions, engine and fuel type, transmission and 2WD or 4WD layout. Inspect tyres, suspension, underbody and any off-road wear. Confirm weight, emissions, age and vehicle classification with the destination authority.",
    focusPoints: [
      "Compare overall dimensions, seat count, boot space and ground clearance.",
      "Verify engine, fuel, transmission and the actual drivetrain.",
      "Inspect tyres, suspension and underbody, then check import and duty rules.",
    ],
  },
  {
    slug: "hatchback",
    bodyType: "Hatchback",
    intro:
      "Compare Japanese hatchback listings by size, number of doors, seating, engine, transmission and cargo layout. Compact hatchbacks vary in cabin space and powertrain, so the model year, grade and specification of the exact vehicle matter more than the body-style label.",
    buyerGuide:
      "Check the number of seats and doors, boot access, rear-seat folding, dimensions, engine and transmission. Compare mileage, safety equipment, tyres and condition photographs. Confirm the destination’s rules for engine size, emissions and vehicle age.",
    focusPoints: [
      "Compare dimensions, seating, door layout and usable cargo space.",
      "Check engine, transmission, mileage, safety features and condition.",
      "Verify vehicle-age, emissions and registration requirements for your destination.",
    ],
  },
  {
    slug: "sedan",
    bodyType: "Sedan",
    intro:
      "Explore Japanese sedan listings and compare cabin layout, boot space, engine, transmission, year and grade. Sedan specifications can vary by market and generation, so confirm the exact model code, powertrain and safety equipment on each vehicle record.",
    buyerGuide:
      "Compare passenger space, boot capacity, length and width with your parking and usage needs. Verify engine displacement, fuel type, transmission, drivetrain and grade. Review tyres, body panels, interior condition and safety equipment, then check the destination’s vehicle-age and emissions rules.",
    focusPoints: [
      "Check passenger capacity, boot space and external dimensions.",
      "Compare engine, fuel type, transmission, grade and safety equipment.",
      "Review mileage, condition photos and destination import limits.",
    ],
  },
  {
    slug: "van",
    bodyType: "Van",
    intro:
      "Review Japanese van listings for passenger or cargo use and compare body dimensions, seating, roof height, doors and powertrain. The word “van” can describe very different configurations, so confirm the exact vehicle class and interior layout before purchase.",
    buyerGuide:
      "Determine whether the van is configured for passengers, cargo or mixed use. Verify wheelbase, length, width, roof height, seat count, load area, payload and gross vehicle weight where documented. Inspect floors, doors, chassis and tyres, and confirm local commercial or passenger registration requirements.",
    focusPoints: [
      "Confirm passenger or cargo use, dimensions, seating and door configuration.",
      "Check payload or weight documentation, floor, chassis and door condition.",
      "Verify destination registration class, permits and carrier size restrictions.",
    ],
  },
  {
    slug: "mini-van",
    bodyType: "Minivan",
    label: "Minivan",
    bodyTypeAliases: ["minivan"],
    intro:
      "Compare Japanese minivan listings with attention to seat count, row arrangement, sliding-door configuration, engine and model grade. Similar-looking vehicles may have different cabin layouts and equipment, so review photographs and the exact specification for each listing.",
    buyerGuide:
      "Check passenger capacity, seat folding and access to each row. Confirm engine, transmission, drivetrain, vehicle dimensions and any powered-door or safety features. Inspect seat mechanisms, air-conditioning, tyres and warning indicators, then confirm the destination’s rules for passenger vehicles.",
    focusPoints: [
      "Compare seat count, row layout, access and cargo flexibility.",
      "Check sliding doors, seat mechanisms, powertrain and safety equipment.",
      "Verify total dimensions, passenger-vehicle registration and import limits.",
    ],
  },
  {
    slug: "truck",
    bodyType: "Truck",
    intro:
      "Browse Japanese truck listings and compare cab type, chassis, body dimensions, payload documentation, engine and axle configuration. Commercial vehicle suitability depends on the exact weight rating and body specification, not just the displayed model name.",
    buyerGuide:
      "Confirm gross vehicle weight, rated payload, chassis and cab code, body length and width, axle layout, engine and transmission from the available documentation. Inspect frame, underbody, tyres, brakes and cargo body. Ask the destination authority about commercial registration, permits, loading rules and duties.",
    focusPoints: [
      "Verify gross weight, payload, chassis, cab and body dimensions.",
      "Inspect frame, brakes, tyres, suspension and cargo body condition.",
      "Confirm commercial registration, import permits and shipping limits.",
    ],
  },
  {
    slug: "mpv",
    bodyType: "MPV",
    intro:
      "Compare Japanese MPV listings for passenger capacity, seating flexibility, cargo access and equipment. MPV is a varied category, so verify the exact number of seats, row arrangement, body dimensions and door configuration before choosing a vehicle.",
    buyerGuide:
      "Check seat count, row layout, seat-folding mechanisms, sliding or hinged doors and boot capacity. Compare engine, transmission, grade, safety features and mileage. Confirm whether local rules classify the vehicle as a passenger car, van or another category.",
    focusPoints: [
      "Confirm seating capacity, row layout and cargo configuration.",
      "Check doors, seat mechanisms, air-conditioning and safety equipment.",
      "Verify vehicle classification, dimensions and destination import rules.",
    ],
  },
  {
    slug: "station-wagon",
    bodyType: "Wagon",
    label: "Station Wagon",
    bodyTypeAliases: ["wagon"],
    intro:
      "Explore Japanese station wagon listings and compare rear cargo capacity, seating, roofline, dimensions and powertrain. Body-style names can overlap in marketplace data, so confirm the photographs and exact body configuration attached to each vehicle.",
    buyerGuide:
      "Compare cargo length and height, rear-seat folding, passenger space and external dimensions. Verify engine, fuel, transmission, grade and drivetrain, then inspect the tailgate, cargo floor, tyres and condition photos. Check the vehicle’s export documents and destination rules.",
    focusPoints: [
      "Review cargo area dimensions, tailgate access and rear-seat folding.",
      "Compare engine, transmission, drivetrain, grade and mileage.",
      "Check body condition, photographs, export documents and import eligibility.",
    ],
  },
  {
    slug: "compact-suv",
    bodyType: "Compact SUV",
    directoryVisible: false,
    intro:
      "Compare compact SUV listings sourced from Japan by dimensions, seating, engine, drivetrain and equipment. Compact SUV labels can cover different vehicle sizes and layouts, so compare the actual measurements and specifications rather than relying on category names.",
    buyerGuide:
      "Check exterior length and width, ground clearance, seat count and cargo space. Verify engine or hybrid system, transmission and drive configuration. Inspect tyres, suspension and underbody, and check destination limits for dimensions, emissions, vehicle age and engine class.",
    focusPoints: [
      "Compare dimensions, seat count, cargo space and ground clearance.",
      "Verify engine, fuel, transmission and whether 2WD or 4WD is fitted.",
      "Review tyres, underbody, mileage and destination import rules.",
    ],
  },
  {
    slug: "off-road-vehicles",
    bodyType: "Off-Road Vehicles",
    directoryVisible: false,
    intro:
      "Review Japanese off-road-oriented vehicle listings and compare the drivetrain, chassis, ground clearance, tyres and condition of each unit. An off-road appearance does not guarantee a particular 4WD system or equipment package, so verify the vehicle’s actual configuration.",
    buyerGuide:
      "Confirm the transfer case or 4WD system, axle configuration, ground clearance, tyres and underbody condition. Ask about modifications and previous use if relevant. Check the chassis, suspension, steering, brakes and corrosion, then confirm dimensions and vehicle class with the destination authority.",
    focusPoints: [
      "Verify the actual 4WD system, axle layout and factory specification.",
      "Inspect chassis, underbody, suspension, steering, brakes and tyres.",
      "Check modifications, dimensions, vehicle class and destination import conditions.",
    ],
  },
  {
    slug: "pickup-truck",
    bodyType: "Pickup Truck",
    intro:
      "Browse Japanese pickup-truck listings and compare cab configuration, cargo bed, engine, drivetrain and recorded weight information. Wazir Trading’s current inventory includes Toyota Hilux examples, but pickup body style alone does not establish payload, commercial classification or four-wheel-drive capability.",
    buyerGuide:
      "Confirm the exact model and chassis code, cab and bed configuration, engine, fuel, transmission and drivetrain. Request gross vehicle weight and payload documentation where available, and inspect the frame, underbody, suspension, tyres, cargo bed and signs of work use. Check destination rules for pickup registration, commercial permits, dimensions, import age and shipping limits before making a purchase decision.",
    focusPoints: [
      "Verify cab, bed, chassis, engine, fuel and drivetrain from the listing.",
      "Request documented gross weight/payload and inspect frame and cargo-bed condition.",
      "Check destination pickup classification, permits, age limits and carrier dimensions.",
    ],
  },
  {
    slug: "coupe",
    bodyType: "Coupe",
    directoryVisible: false,
    intro:
      "Compare Japanese coupe listings by model generation, seating, engine, transmission, body condition and equipment. The current inventory includes a small number of Audi TT coupe records, so this category is intentionally narrower than the high-volume hatchback, SUV and truck categories.",
    buyerGuide:
      "Confirm the exact model designation, year, engine displacement, transmission, grade and model code. Review body-panel alignment, paint, glass, tyres, suspension, cabin wear and all available photographs. Check any warning indicators and request the inspection or auction information available for the vehicle. Verify destination age, emissions, engine-class and registration requirements, then obtain a written quote for the exact reference.",
    focusPoints: [
      "Match the coupe model, generation, year, engine and trim to its documents.",
      "Inspect body panels, tyres, suspension, cabin condition and available inspection evidence.",
      "Confirm vehicle-age, emissions, registration and export costs for the destination.",
    ],
  },
] as const;

function normalizeValue(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en") : "";
}

function aliasMatches(value: unknown, aliases: string[] | undefined, fallback?: string): boolean {
  const target = normalizeValue(value);
  if (!target) return false;
  return (aliases?.length ? aliases : fallback ? [fallback] : []).some(
    (alias) => normalizeValue(alias) === target,
  );
}

export function vehicleLandingModelAliases(make: string, model: string): string[] {
  const page = modelPages.find(
    (item) =>
      normalizeValue(item.make) === normalizeValue(make) &&
      (item.modelAliases ?? [item.model ?? ""]).some(
        (alias) => normalizeValue(alias) === normalizeValue(model),
      ),
  );
  return page?.modelAliases?.length ? page.modelAliases : [model];
}

export function vehicleLandingBodyTypeAliases(bodyType: string): string[] {
  const page = bodyPages.find(
    (item) =>
      (item.bodyTypeAliases ?? [item.bodyType ?? ""]).some(
        (alias) => normalizeValue(alias) === normalizeValue(bodyType),
      ) || normalizeValue(item.label) === normalizeValue(bodyType),
  );
  return page?.bodyTypeAliases?.length ? page.bodyTypeAliases : [bodyType];
}

export function vehicleLandingAliasOrFilter(
  column: "make" | "model" | "body_type",
  aliases: string[],
): string {
  const safeColumn = /^(make|model|body_type)$/.test(column) ? column : "model";
  return aliases
    .filter((value) => value.trim().length > 0)
    .map((value) => `${safeColumn}.ilike."${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`)
    .join(",");
}

export interface VehicleLandingInventorySummary {
  availableCount: number;
  qualifiedCount: number;
  oldestYear: number | null;
  newestYear: number | null;
  bodyStyles: string[];
  engineSizes: number[];
  fuelTypes: string[];
  transmissions: string[];
  variantExamples: string[];
}

export function summarizeVehicleLandingInventory(
  cars: VehicleSeoCar[],
  availableCount: number,
): VehicleLandingInventorySummary {
  const unique = (values: Array<string | null | undefined>) =>
    [
      ...new Set(
        values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)),
      ),
    ].sort((a, b) => a.localeCompare(b));
  const years = cars
    .map((car) => car.year)
    .filter(
      (year): year is number =>
        typeof year === "number" && Number.isFinite(year) && year <= new Date().getFullYear(),
    );
  return {
    availableCount,
    qualifiedCount: cars.length,
    oldestYear: years.length ? Math.min(...years) : null,
    newestYear: years.length ? Math.max(...years) : null,
    bodyStyles: unique(cars.map((car) => car.body_type)),
    engineSizes: [
      ...new Set(
        cars
          .map((car) => car.engine_cc)
          .filter(
            (value): value is number =>
              typeof value === "number" && Number.isFinite(value) && value > 0,
          ),
      ),
    ]
      .sort((a, b) => a - b)
      .slice(0, 8),
    fuelTypes: unique(cars.map((car) => car.fuel_type)),
    transmissions: unique(cars.map((car) => car.transmission)),
    variantExamples: unique(cars.map((car) => car.variant)).slice(0, 8),
  };
}

export function vehicleLandingDirectoryCounts() {
  const visible = ALL_VEHICLE_LANDING_PAGES.filter((page) => page.directoryVisible !== false);
  return {
    makes: visible.filter((page) => page.kind === "make").length,
    models: visible.filter((page) => page.kind === "model").length,
    bodyTypes: visible.filter((page) => page.kind === "body-type").length,
    total: visible.length,
  };
}

function makeFaqs(
  label: string,
  buyerGuide: string,
  inventoryContext: string,
): VehicleLandingFaq[] {
  return [
    {
      question: `What should I compare when choosing ${label} from Japan?`,
      answer: buyerGuide,
    },
    {
      question: `What does the current ${label} inventory represent?`,
      answer: `${inventoryContext} The page shows only matching records that meet the current inventory and vehicle-data checks; availability can change and should be reconfirmed against the reference number.`,
    },
    {
      question: `Does the listed ${label} price include destination charges?`,
      answer:
        "A vehicle listing is not a delivered or landed-cost quotation. Freight, insurance, destination duties, taxes, customs clearance, port charges and local registration are separate unless the written quotation expressly includes them. Ask Wazir Trading to confirm the complete transaction scope in writing.",
    },
  ];
}

const makePages: VehicleLandingPage[] = makeContent.map((item) => ({
  kind: "make",
  seoTier: item.seoTier,
  slug: item.slug,
  path: `${VEHICLE_LANDING_DIRECTORY_PATH}/${item.slug}`,
  label: item.name,
  make: item.name,
  makeAliases: [item.name],
  directoryVisible: "directoryVisible" in item ? item.directoryVisible !== false : true,
  title: VEHICLE_TIER_ONE_CONTENT[`make:${item.slug}`]?.title ?? `${item.name} Used Cars from Japan | Wazir Trading`,
  description: VEHICLE_TIER_ONE_CONTENT[`make:${item.slug}`]?.description ?? `Compare Japanese ${item.name} used-car listings by model, year, grade, mileage and condition. Review available stock and request an export quotation.`,
  intro: VEHICLE_TIER_ONE_CONTENT[`make:${item.slug}`]?.intro ?? item.intro,
  buyerGuide: VEHICLE_TIER_ONE_CONTENT[`make:${item.slug}`]?.buyerGuide ?? item.buyerGuide,
  focusPoints: [...(VEHICLE_TIER_ONE_CONTENT[`make:${item.slug}`]?.focusPoints ?? item.focusPoints)],
  faqs: VEHICLE_TIER_ONE_CONTENT[`make:${item.slug}`]?.faqs ?? makeFaqs(item.name, item.buyerGuide, item.intro),
}));

const modelPages: VehicleLandingPage[] = modelContent.map((item) => ({
  kind: "model",
  seoTier: item.seoTier,
  slug: item.slug,
  path: `${VEHICLE_LANDING_DIRECTORY_PATH}/${item.makeSlug}/${item.slug}`,
  label: `${item.make} ${item.model}`,
  make: item.make,
  makeSlug: item.makeSlug,
  model: item.model,
  modelAliases: [
    ...("modelAliases" in item && item.modelAliases ? item.modelAliases : [item.model]),
  ],
  directoryVisible: "directoryVisible" in item ? item.directoryVisible !== false : true,
  title: VEHICLE_TIER_ONE_CONTENT[`model:${item.makeSlug}/${item.slug}`]?.title ?? `${item.make} ${item.model} from Japan | Wazir Trading`,
  description: VEHICLE_TIER_ONE_CONTENT[`model:${item.makeSlug}/${item.slug}`]?.description ?? `Compare Japanese ${item.make} ${item.model} listings by year, grade, powertrain, mileage and condition. Review stock details and request an export quotation.`,
  intro: VEHICLE_TIER_ONE_CONTENT[`model:${item.makeSlug}/${item.slug}`]?.intro ?? item.intro,
  buyerGuide: VEHICLE_TIER_ONE_CONTENT[`model:${item.makeSlug}/${item.slug}`]?.buyerGuide ?? item.buyerGuide,
  focusPoints: [...(VEHICLE_TIER_ONE_CONTENT[`model:${item.makeSlug}/${item.slug}`]?.focusPoints ?? item.focusPoints)],
  faqs: VEHICLE_TIER_ONE_CONTENT[`model:${item.makeSlug}/${item.slug}`]?.faqs ?? makeFaqs(`${item.make} ${item.model}`, item.buyerGuide, item.intro),
}));

const bodyPages: VehicleLandingPage[] = bodyContent.map((item) => ({
  kind: "body-type",
  slug: item.slug,
  path: `${VEHICLE_LANDING_DIRECTORY_PATH}/body-type/${item.slug}`,
  label: item.bodyType === "Wagon" ? "Station Wagon" : item.bodyType,
  bodyType: item.bodyType,
  bodyTypeAliases: [
    ...("bodyTypeAliases" in item && item.bodyTypeAliases ? item.bodyTypeAliases : [item.bodyType]),
  ],
  directoryVisible: "directoryVisible" in item ? item.directoryVisible !== false : true,
  title: `Japanese ${item.bodyType === "Wagon" ? "Station Wagon" : item.bodyType} Vehicles for Export | Wazir Trading`,
  description: `Browse Japanese ${item.bodyType === "Wagon" ? "station wagon" : item.bodyType.toLowerCase()} listings and compare dimensions, seating, engine, mileage and condition. Review available stock and export details.`,
  intro: item.intro,
  buyerGuide: item.buyerGuide,
  focusPoints: [...item.focusPoints],
  faqs: makeFaqs(`${item.bodyType.toLowerCase()} vehicle`, item.buyerGuide, item.intro),
}));

export const MAKE_LANDING_PAGES = makePages;
export const MODEL_LANDING_PAGES = modelPages;
export const BODY_TYPE_LANDING_PAGES = bodyPages;
export const ALL_VEHICLE_LANDING_PAGES = [...makePages, ...modelPages, ...bodyPages];

export function getVehicleLandingPage(pathValue: string): VehicleLandingPage | null {
  const path = pathValue.length > 1 ? pathValue.replace(/\/+$/, "") : pathValue;
  return ALL_VEHICLE_LANDING_PAGES.find((page) => page.path === path) ?? null;
}

export function vehicleLandingStructuredData(
  page: VehicleLandingPage,
  cars: VehicleSeoCar[],
): Record<string, unknown>[] {
  const pageUrl = `${SITE_URL}${page.path}`;
  const breadcrumbItems = [
    { name: "Home", item: `${SITE_URL}/` },
    { name: "Japanese Used Cars", item: `${SITE_URL}${VEHICLE_LANDING_DIRECTORY_PATH}` },
    { name: page.label, item: pageUrl },
  ];
  const collection: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: page.label,
    url: pageUrl,
    description: page.description,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: Math.min(cars.length, VEHICLE_LANDING_CARDS_LIMIT),
      itemListElement: cars.slice(0, VEHICLE_LANDING_CARDS_LIMIT).map((car, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: [car.make, car.model, car.variant, car.year].filter(Boolean).join(" "),
        url: `${SITE_URL}/cars/${encodeURIComponent(car.ref_number.trim())}`,
      })),
    },
  };
  if (page.kind === "make" && page.make) collection.about = { "@type": "Brand", name: page.make };
  if (page.kind === "model" && page.make && page.model) {
    collection.about = {
      "@type": "Car",
      brand: { "@type": "Brand", name: page.make },
      model: page.model,
    };
  }
  if (page.kind === "body-type" && page.bodyType)
    collection.about = { "@type": "Thing", name: `${page.label} vehicles` };

  return [
    collection,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    },
  ];
}

export function vehicleLandingDirectoryStructuredData(): Record<string, unknown> {
  const entries: VehicleLandingDirectoryEntry[] = ALL_VEHICLE_LANDING_PAGES.filter(
    (page) => page.directoryVisible !== false,
  ).map((page) => ({
    label: page.label,
    path: page.path,
    kind: page.kind,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${VEHICLE_LANDING_DIRECTORY_PATH}#directory`,
    name: "Japanese Used Cars by Make, Model and Body Type",
    url: `${SITE_URL}${VEHICLE_LANDING_DIRECTORY_PATH}`,
    description: "Browse Japanese used vehicle guides by manufacturer, model and body type.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: entries.length,
      itemListElement: entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entry.label,
        url: `${SITE_URL}${entry.path}`,
      })),
    },
  };
}

export function vehicleLandingPagesForVehicle(car: VehicleSeoCar): VehicleLandingPage[] {
  const make = makePages.find((page) => aliasMatches(car.make, page.makeAliases, page.make));
  const model = modelPages.find(
    (page) =>
      page.makeSlug === make?.slug && aliasMatches(car.model, page.modelAliases, page.model),
  );
  const body = bodyPages.find((page) =>
    aliasMatches(car.body_type, page.bodyTypeAliases, page.bodyType),
  );
  return [make, model, body].filter((page): page is VehicleLandingPage => Boolean(page));
}

export function vehicleLandingDirectorySections() {
  return [
    {
      title: "Browse by manufacturer",
      pages: makePages.filter((page) => page.directoryVisible !== false),
    },
    {
      title: "Popular models",
      pages: modelPages.filter((page) => page.directoryVisible !== false),
    },
    {
      title: "Browse by body type",
      pages: bodyPages.filter((page) => page.directoryVisible !== false),
    },
  ];
}

export function getMakeLandingPage(slug: string): VehicleLandingPage | null {
  return makePages.find((page) => page.slug === slug) ?? null;
}

export function getModelLandingPage(
  makeSlug: string,
  modelSlug: string,
): VehicleLandingPage | null {
  return modelPages.find((page) => page.makeSlug === makeSlug && page.slug === modelSlug) ?? null;
}

export function getBodyTypeLandingPage(slug: string): VehicleLandingPage | null {
  return bodyPages.find((page) => page.slug === slug) ?? null;
}

export function vehicleLandingCarsFilterPath(page: VehicleLandingPage): string {
  const params = new URLSearchParams();
  if (page.kind === "make" && page.make) params.set("make", page.make);
  if (page.kind === "model" && page.make && page.model) {
    params.set("make", page.make);
    params.set("advModel", page.model);
  }
  if (page.kind === "body-type" && page.bodyType) params.set("body", page.bodyType);
  return `/cars?${params.toString()}`;
}
