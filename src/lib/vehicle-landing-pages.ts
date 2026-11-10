import { SITE_URL, type VehicleSeoCar } from './vehicle-seo';

export const VEHICLE_LANDING_DIRECTORY_PATH = '/used-japanese-cars';
export const MIN_INDEXABLE_LANDING_STOCK = 3;
export const VEHICLE_LANDING_CAR_LIMIT = 200;
export const VEHICLE_LANDING_CARDS_LIMIT = 8;

export type VehicleLandingKind = 'make' | 'model' | 'body-type';

export interface VehicleLandingFaq {
  question: string;
  answer: string;
}

export interface VehicleLandingPage {
  kind: VehicleLandingKind;
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
}

export interface VehicleLandingDirectoryEntry {
  label: string;
  path: string;
  kind: VehicleLandingKind;
}

const makeContent = [
  {
    slug: 'toyota', name: 'Toyota',
    intro: 'Browse Japanese Toyota vehicle records in one place and compare the specifications shown on each available listing. The catalogue can include different body styles, model years, engine choices and equipment grades, so use the exact vehicle record rather than the badge alone when deciding whether a car suits your requirements.',
    buyerGuide: 'Toyota listings can cover compact hatchbacks, sedans, hybrid models, family vehicles, SUVs and commercial vans. Compare the chassis or model code, model year, grade, engine or hybrid system, mileage, transmission, drive configuration and condition details. For hybrid vehicles, request the available battery and diagnostic information; for vans and utility vehicles, confirm seating, cargo configuration and intended use.',
    focusPoints: ['Match the exact model, chassis code, year and grade shown in the listing.', 'Review mileage, auction or condition grades, photographs and the vehicle-specific equipment.', 'Confirm the powertrain, steering, drivetrain, FOB price and destination import eligibility before payment.'],
  },
  {
    slug: 'nissan', name: 'Nissan',
    intro: 'Explore available Nissan vehicles sourced from Japan and compare each record by model, year, trim, powertrain and condition. Nissan inventory may span compact cars, family vans, SUVs and electric vehicles; specifications and equipment vary by model year and individual vehicle.',
    buyerGuide: 'When comparing Nissan listings, verify the precise model and grade, not only the model name. Check whether a vehicle uses a conventional petrol engine, hybrid or e-POWER system, or a fully electric drivetrain. Review mileage, battery information where applicable, transmission, drivetrain, steering side, images and the documents available for export.',
    focusPoints: ['Identify the exact Nissan model, grade and powertrain from the vehicle record.', 'For electrified vehicles, ask for the battery information and charging specification available for that unit.', 'Check dimensions, seating, steering, condition and destination rules against your intended use.'],
  },
  {
    slug: 'honda', name: 'Honda',
    intro: 'Compare Japanese Honda used-car listings by model, year, grade, engine, transmission and photographed condition. The range represented in stock may include compact hatchbacks, sedans, crossovers and multi-purpose vehicles, with meaningful differences between model generations and trim levels.',
    buyerGuide: 'Honda model names can cover several body configurations and powertrain combinations over time. Confirm the full model designation, chassis details, grade, engine or hybrid system, transmission, mileage and included equipment. Check the condition report and photographs for the exact unit, and obtain written confirmation of the export price and shipping scope.',
    focusPoints: ['Confirm model generation, chassis code, trim and engine or hybrid specification.', 'Compare the actual condition report, mileage and photographs for each vehicle.', 'Check seating, safety equipment, steering configuration and import eligibility for the destination.'],
  },
  {
    slug: 'suzuki', name: 'Suzuki',
    intro: 'Review available Suzuki vehicles from Japan, including compact cars and other body styles represented in current stock. Compare the specifications and photographs attached to each vehicle because engine size, drivetrain, seating and equipment can differ significantly between variants.',
    buyerGuide: 'For Suzuki vehicles, confirm the exact model and grade, engine displacement, transmission, drive type and body configuration. For compact and off-road-oriented models, pay particular attention to dimensions, ground-clearance requirements, tyres, underbody condition and the destination market’s vehicle classification rules.',
    focusPoints: ['Verify engine displacement, model code, year and selected grade.', 'Check whether the specific vehicle is 2WD or 4WD and confirm the transmission.', 'Review photographs, underbody condition, tyres and destination requirements before committing.'],
  },
  {
    slug: 'mazda', name: 'Mazda',
    intro: 'Browse current Mazda vehicle records sourced from Japan and compare year, model, trim, engine, transmission and condition. Listings may include compact cars, passenger vehicles and SUVs; always use the individual specification sheet to distinguish different generations and equipment packages.',
    buyerGuide: 'Mazda model names and naming conventions can vary by market and generation. Confirm the exact model designation, chassis information, grade, engine type, transmission, mileage and safety equipment. For diesel or other specialised powertrains, request any available service and inspection information relevant to the specific vehicle.',
    focusPoints: ['Match the full model designation and year to the vehicle identification details.', 'Check engine type, transmission, mileage and service or inspection information available.', 'Compare grade-specific equipment, photographs, FOB price and export documentation.'],
  },
  {
    slug: 'subaru', name: 'Subaru',
    intro: 'Compare Subaru listings from Japan using the model, year, grade, engine, drivetrain and condition information recorded for each vehicle. Subaru vehicles may have different drivetrain and engine configurations across generations, so do not assume a specification from the nameplate alone.',
    buyerGuide: 'Check the exact engine, transmission and drivetrain shown on the vehicle record and request clarification when a specification is not listed. Review mileage, maintenance history where available, tyres, underbody photographs and warning indicators. Confirm the precise vehicle configuration is suitable for the destination’s rules and your intended use.',
    focusPoints: ['Verify the actual drivetrain, engine and transmission rather than assuming standard equipment.', 'Request service or inspection evidence relevant to the specific engine and vehicle.', 'Review tyres, underbody, warning lights, mileage and export documents.'],
  },
  {
    slug: 'mitsubishi', name: 'Mitsubishi',
    intro: 'Explore Japanese Mitsubishi used vehicles and compare the available records by model, year, trim, engine, drivetrain and condition. Listings can differ by vehicle category and powertrain, and individual equipment should be confirmed from the published vehicle details.',
    buyerGuide: 'For Mitsubishi vehicles, establish the exact model, grade, engine and drivetrain. If a listing is a plug-in hybrid or another electrified variant, confirm that precise system, the battery information available and destination charging compatibility. For SUVs and utility vehicles, check dimensions, seating, towing or load requirements as applicable.',
    focusPoints: ['Confirm the exact model, grade, engine and drivetrain in the listing.', 'For electrified variants, request available battery and charging details.', 'Check dimensions, vehicle condition, equipment and destination import requirements.'],
  },
  {
    slug: 'daihatsu', name: 'Daihatsu',
    intro: 'Review available Daihatsu vehicles from Japan with attention to the exact model code, engine size, year, grade and condition. Compact vehicle specifications can be closely tied to local vehicle classifications, so check the destination authority’s rules before selecting a particular unit.',
    buyerGuide: 'Compare engine displacement, dimensions, seating, transmission and chassis or model code. Where the vehicle is a Japanese kei-class model, independently confirm whether the destination recognises that category and whether its engine size, age or dimensions affect registration, duties or import permission.',
    focusPoints: ['Check engine displacement, dimensions, chassis code and model year.', 'Confirm destination rules for kei or other compact-vehicle classifications.', 'Review grade, mileage, photographs, condition and the complete quotation.'],
  },
  {
    slug: 'lexus', name: 'Lexus',
    intro: 'Compare available Lexus vehicles sourced from Japan by model, year, grade, powertrain and condition. Equipment and specification can vary considerably between trims, option packages and model generations, so verify the exact vehicle record and request clarification about features important to you.',
    buyerGuide: 'For a Lexus purchase, check the exact model and grade, engine or hybrid specification, mileage, interior and exterior condition, warning indicators and available service history. Confirm that key features, safety systems, multimedia functions and included accessories are documented for the individual car rather than inferred from the model family.',
    focusPoints: ['Confirm model generation, grade, engine or hybrid system and equipment package.', 'Request close-up photographs and available service or inspection information.', 'Check the quoted condition, FOB scope, shipping terms and destination compliance.'],
  },
  {
    slug: 'isuzu', name: 'Isuzu',
    intro: 'Browse Isuzu commercial-vehicle records from Japan and compare the exact model, year, chassis, cab and body configuration. Commercial vehicles require more than a model-name comparison: payload, dimensions, axle configuration and intended operating class must be checked for the individual unit.',
    buyerGuide: 'Before selecting an Isuzu truck or commercial vehicle, obtain the chassis and model information, gross vehicle weight, payload or rated capacity where documented, axle configuration, cab type, body dimensions and engine details. Confirm the vehicle’s condition and whether the destination can register the same commercial classification.',
    focusPoints: ['Verify chassis, cab, body dimensions, weight ratings and payload documentation.', 'Check engine, transmission, axle layout, tyres, brakes and visible chassis condition.', 'Confirm destination registration class, permits, duties and shipping constraints.'],
  },
] as const;

const modelContent = [
  { makeSlug: 'toyota', make: 'Toyota', model: 'Prius', slug: 'prius',
    intro: 'Compare Toyota Prius listings by generation, grade, model year and hybrid-system specification. A Prius nameplate alone does not identify the exact battery, equipment or vehicle configuration, so review the individual record and request unit-specific condition information.',
    buyerGuide: 'For a Prius, confirm the model code and generation, engine and hybrid-system details, mileage, grade and warning-light status. Ask what battery or diagnostic information is available, review service records when supplied, and confirm the vehicle’s year and emissions or import classification meet the destination rules.',
    focusPoints: ['Confirm the exact generation, model code, year and grade.', 'Request available hybrid-battery, diagnostic and service information for that car.', 'Check warning indicators, mileage, condition photographs and destination eligibility.'] },
  { makeSlug: 'toyota', make: 'Toyota', model: 'Aqua', slug: 'aqua',
    intro: 'Review Toyota Aqua compact hybrid listings from Japan and compare year, grade, mileage, hybrid-system details and condition. Equipment and specifications can change between model updates, so verify the exact vehicle rather than relying on a generic model description.',
    buyerGuide: 'Check the vehicle’s model code, year and grade, and request the available hybrid battery or diagnostic information. Compare mileage, tyres, body condition, cabin condition and warning indicators. Confirm the engine or hybrid details shown on the documents and check local age, emissions and import requirements.',
    focusPoints: ['Match the model code, model year and equipment grade.', 'Ask for battery or diagnostic information available for the individual vehicle.', 'Review mileage, condition photographs and the destination’s import limits.'] },
  { makeSlug: 'toyota', make: 'Toyota', model: 'Corolla', slug: 'corolla',
    intro: 'Explore Toyota Corolla listings from Japan and distinguish each unit by model generation, body style, grade, year and powertrain. Corolla specifications are not identical across markets or generations, so the individual chassis and vehicle record should guide your comparison.',
    buyerGuide: 'Confirm whether the listed Corolla is a sedan, hatchback or another configuration, then verify its model code, engine, transmission, grade and equipment. Compare mileage, safety features, tyres, photographs and any inspection notes. Check that the exact body style and engine are accepted in the destination market.',
    focusPoints: ['Verify body configuration, chassis or model code and generation.', 'Compare engine, transmission, grade, mileage and the actual equipment list.', 'Check the destination’s vehicle-age, emissions and import requirements.'] },
  { makeSlug: 'toyota', make: 'Toyota', model: 'Vitz', slug: 'vitz',
    intro: 'Compare Toyota Vitz compact hatchback listings by model year, grade, engine, transmission and condition. Model naming can differ by market and generation, so confirm the exact chassis and documentation when comparing a Vitz with similarly named Yaris variants.',
    buyerGuide: 'Check the model code and year, engine displacement, transmission, grade and mileage. Review exterior panels, cabin wear, tyres and photographs, and confirm the name used on the export and registration documents. A destination authority should confirm whether the exact specification and age qualify for import.',
    focusPoints: ['Match the exact model code and export-document name.', 'Compare engine size, transmission, grade, mileage and visible condition.', 'Check the destination’s age, emissions and compact-car classification rules.'] },
  { makeSlug: 'toyota', make: 'Toyota', model: 'Harrier', slug: 'harrier',
    intro: 'Review Toyota Harrier SUV listings sourced from Japan and compare generation, grade, engine or hybrid configuration, drivetrain and condition. Features and mechanical specifications vary between versions, so use the listing’s details as the reference for each vehicle.',
    buyerGuide: 'Confirm the Harrier model code, year, grade, engine or hybrid system and whether the vehicle is 2WD or 4WD. Check the cabin and cargo configuration, safety equipment, tyre condition, underbody photographs and any warning indicators. Confirm vehicle dimensions, duties and import eligibility with the destination authority.',
    focusPoints: ['Verify model code, generation, grade and 2WD or 4WD configuration.', 'Check engine or hybrid system, mileage, tyres and underbody condition.', 'Compare dimensions, equipment, photographs and destination import rules.'] },
  { makeSlug: 'toyota', make: 'Toyota', model: 'Hiace', slug: 'hiace',
    intro: 'Compare Toyota Hiace van and commercial-vehicle listings by body length, roof height, seating or cargo layout, year and powertrain. The Hiace name covers different configurations, making dimensions and the exact vehicle use especially important.',
    buyerGuide: 'Ask for the model or chassis code, body dimensions, roof and wheelbase configuration, seating or cargo layout, engine, transmission and gross vehicle weight where available. Inspect load area, sliding doors, rear doors, underbody and commercial wear. Confirm local commercial registration and import requirements before purchase.',
    focusPoints: ['Confirm wheelbase, body length, roof height and passenger or cargo layout.', 'Review payload or weight information, chassis condition, doors and interior wear.', 'Check commercial-vehicle registration, import permits and shipping dimensions.'] },
  { makeSlug: 'toyota', make: 'Toyota', model: 'Voxy', slug: 'voxy',
    intro: 'Explore Toyota Voxy minivan listings and compare seating layout, grade, model year, engine, transmission and equipment. Family-oriented features can differ by trim and generation, so verify that the specific vehicle includes the configuration you need.',
    buyerGuide: 'Check the Voxy model code and generation, seat count and arrangement, engine, transmission, drive type and grade. Confirm sliding-door operation, seat mechanisms, air-conditioning, safety equipment and the condition of all three seating rows. Verify vehicle dimensions and the destination’s rules for passenger vehicles.',
    focusPoints: ['Confirm seat count, row layout, model generation and grade.', 'Check sliding doors, seat mechanisms, air-conditioning and safety equipment.', 'Verify dimensions, engine, drivetrain and local passenger-vehicle import rules.'] },
  { makeSlug: 'toyota', make: 'Toyota', model: 'Land Cruiser', slug: 'land-cruiser',
    intro: 'Compare Toyota Land Cruiser listings from Japan by series or model code, year, engine, transmission, drivetrain and equipment. The Land Cruiser family includes distinct sizes and generations, so verify the exact version and its physical dimensions before requesting a quotation.',
    buyerGuide: 'Identify the series and chassis code, engine, transmission, axle and 4WD system, body dimensions and seating arrangement. Review underbody and chassis photographs, tyres, suspension and service information where available. Confirm weight, emissions, vehicle-age and import restrictions in the destination market.',
    focusPoints: ['Identify the exact series, chassis code, engine and drivetrain.', 'Inspect underbody, chassis, tyres, suspension and service information.', 'Check vehicle dimensions, weight, age and destination import eligibility.'] },
  { makeSlug: 'nissan', make: 'Nissan', model: 'Note', slug: 'note',
    intro: 'Review Nissan Note compact-car listings and compare year, grade, engine or e-POWER configuration, transmission and condition. Powertrain details vary, so confirm the exact system fitted to the individual car rather than assuming all Note models are the same.',
    buyerGuide: 'Verify the model code, generation, grade and exact powertrain. For e-POWER versions, request the available hybrid-system and battery diagnostic information. Check mileage, warning indicators, tyres, cabin condition, equipment and export documents, then confirm the vehicle meets destination requirements.',
    focusPoints: ['Check whether the specific vehicle is petrol or e-POWER and verify its model code.', 'Request available diagnostic and battery information for electrified versions.', 'Review grade, mileage, warning lights, photographs and import eligibility.'] },
  { makeSlug: 'nissan', make: 'Nissan', model: 'X-Trail', slug: 'x-trail',
    intro: 'Compare Nissan X-Trail SUV records by generation, grade, model year, engine or hybrid system, drivetrain and seating. The model has changed over time, so identify the exact version and do not infer equipment or four-wheel drive from the badge alone.',
    buyerGuide: 'Check the X-Trail model code, engine, transmission and drivetrain, along with seating and equipment. For hybrid variants, ask for the available battery and diagnostic details. Inspect tyres, suspension, underbody and cargo area, and compare the dimensions and import classification with local rules.',
    focusPoints: ['Verify the exact generation, engine, transmission and 2WD or 4WD layout.', 'Check seating, tyres, suspension, underbody and hybrid-system information if relevant.', 'Confirm dimensions, equipment, condition and destination eligibility.'] },
  { makeSlug: 'nissan', make: 'Nissan', model: 'Serena', slug: 'serena',
    intro: 'Browse Nissan Serena minivan listings and compare seat configuration, model year, grade, engine, transmission and equipment. Seating layouts and driver-assistance features vary by generation and trim, so inspect the exact vehicle details before purchase.',
    buyerGuide: 'Confirm the Serena model code, generation, seat count and arrangement, engine or e-POWER configuration, transmission and drivetrain. Check powered doors, seat folding, air-conditioning, warning indicators and the condition of every seating row. Verify local import requirements for the intended passenger capacity.',
    focusPoints: ['Confirm seating capacity, arrangement, generation and grade.', 'Check engine or e-POWER details, doors, seat mechanisms and safety equipment.', 'Verify passenger-vehicle dimensions and destination import rules.'] },
  { makeSlug: 'nissan', make: 'Nissan', model: 'Leaf', slug: 'leaf',
    intro: 'Compare Nissan Leaf electric-vehicle listings from Japan by model year, battery specification, grade, mileage and charging equipment. Battery capacity and usable condition are central to an EV purchase and should be confirmed for the exact vehicle.',
    buyerGuide: 'Request the battery health or state-of-health information available for the individual Leaf, and confirm the battery capacity, model year, charging connector and included charging accessories. Check warning indicators, range-related documentation, tyres and cabin condition. Verify local charging compatibility, EV import rules and battery-related transport requirements.',
    focusPoints: ['Request battery health information and confirm the exact battery specification.', 'Verify charging connector, included cables and compatibility with local charging infrastructure.', 'Check EV import, registration, battery transport and destination support requirements.'] },
  { makeSlug: 'honda', make: 'Honda', model: 'Fit', slug: 'fit',
    intro: 'Review Honda Fit compact hatchback listings from Japan and compare generation, grade, engine or hybrid configuration, transmission and mileage. Vehicle equipment and powertrain options vary, so check the full model designation and specification for the exact unit.',
    buyerGuide: 'Confirm the Fit model code, year, grade, engine and whether the vehicle is petrol or hybrid. Request available hybrid-system information when applicable, then review mileage, transmission, cabin flexibility, safety equipment, tyres and photographs. Ensure the vehicle’s age and specification comply with destination rules.',
    focusPoints: ['Identify the generation, model code, grade and exact powertrain.', 'Check transmission, mileage, cabin condition and safety equipment.', 'For hybrid versions, request available diagnostic information before purchase.'] },
  { makeSlug: 'honda', make: 'Honda', model: 'Vezel', slug: 'vezel',
    intro: 'Compare Honda Vezel compact SUV listings by model year, grade, engine or hybrid system, drivetrain and condition. Specifications can differ across generations and trim packages, so verify the actual equipment and powertrain on the vehicle record.',
    buyerGuide: 'Check the Vezel model code and generation, petrol or hybrid system, transmission and 2WD or 4WD configuration. Compare safety and driver-assistance equipment, mileage, tyres, interior condition and warning indicators. Confirm dimensions and any local rules for hybrid or other powertrain types.',
    focusPoints: ['Confirm generation, grade, engine or hybrid system and drivetrain.', 'Compare safety equipment, mileage, tyres and condition photographs.', 'Check local vehicle-age, emissions, hybrid and import rules.'] },
  { makeSlug: 'honda', make: 'Honda', model: 'Civic', slug: 'civic',
    intro: 'Explore Honda Civic listings from Japan and compare the exact body style, generation, model year, grade, engine, transmission and condition. Civic variants differ across years and body configurations, so the vehicle record should determine the comparison.',
    buyerGuide: 'Identify the chassis and generation, then verify whether the Civic is a sedan, hatchback or another listed configuration. Compare engine, transmission, grade, mileage, wheels, safety equipment and photographs. Request confirmation of any optional equipment and check the destination’s emissions and import requirements.',
    focusPoints: ['Verify chassis, generation, body style, engine and transmission.', 'Check grade, mileage, safety equipment and visible exterior or cabin condition.', 'Confirm destination eligibility for the specific year and powertrain.'] },
  { makeSlug: 'honda', make: 'Honda', model: 'Freed', slug: 'freed',
    intro: 'Compare Honda Freed compact MPV listings by seat count, seating layout, grade, model year and powertrain. The Freed is offered in different configurations, so confirm the specific passenger arrangement and access features shown for each vehicle.',
    buyerGuide: 'Check the Freed model code, generation, seat count, row arrangement, engine or hybrid system and transmission. Inspect sliding doors, rear access, seat mechanisms, air-conditioning and child-seat or safety equipment where listed. Confirm the vehicle’s dimensions and registration class with the destination authority.',
    focusPoints: ['Confirm seat count, row configuration, model code and grade.', 'Check sliding doors, seat mechanisms, access and safety equipment.', 'Verify dimensions, powertrain and destination passenger-vehicle rules.'] },
  { makeSlug: 'suzuki', make: 'Suzuki', model: 'Swift', slug: 'swift',
    intro: 'Review Suzuki Swift hatchback listings from Japan by generation, grade, engine displacement, transmission and mileage. Equipment and drivetrain can differ between versions, so verify the actual configuration before comparing price or condition.',
    buyerGuide: 'Confirm the Swift model code and year, engine size, transmission, drive type and trim. Inspect tyres, body panels, cabin wear and any condition notes. If the vehicle is a sport or other special variant, confirm the exact factory specification and equipment through the available documents.',
    focusPoints: ['Verify model code, generation, engine, transmission and drive type.', 'Compare grade, mileage, wheels, safety features and photographed condition.', 'Check vehicle-age and engine-class rules in the destination country.'] },
  { makeSlug: 'suzuki', make: 'Suzuki', model: 'Jimny', slug: 'jimny',
    intro: 'Compare Suzuki Jimny compact off-road vehicle listings by generation, body configuration, engine, transmission and drivetrain. Confirm whether the exact car is a 4WD version and review its chassis and underbody condition before making a purchase decision.',
    buyerGuide: 'Check the Jimny model code, generation, engine displacement, transmission and transfer or 4WD specification. Review chassis, underbody, suspension, tyres and evidence of off-road use. Confirm seating, dimensions and the destination’s rules for compact or kei-class vehicles where relevant.',
    focusPoints: ['Confirm generation, model code, engine and the exact 4WD system.', 'Inspect chassis, underbody, suspension, tyres and signs of off-road use.', 'Check vehicle classification, dimensions and destination import eligibility.'] },
  { makeSlug: 'mazda', make: 'Mazda', model: 'Demio', slug: 'demio',
    intro: 'Browse Mazda Demio compact hatchback listings sourced from Japan and compare year, grade, engine, transmission and condition. Some markets use the Mazda2 name for related vehicles, so match the actual model and chassis information on the export documents.',
    buyerGuide: 'Verify the Demio model code, year, engine type, transmission and grade. Compare mileage, tyres, body condition and the equipment listed for the specific car. Check how the model is identified on its export documentation and whether the destination requires particular emissions or vehicle-age evidence.',
    focusPoints: ['Match Demio model code, year and the name shown on its documentation.', 'Compare engine, transmission, grade, mileage and vehicle photographs.', 'Confirm destination vehicle-age, emissions and registration requirements.'] },
  { makeSlug: 'mazda', make: 'Mazda', model: 'CX-5', slug: 'cx-5',
    intro: 'Compare Mazda CX-5 SUV records by model generation, year, grade, engine, transmission and drivetrain. Petrol and diesel specifications, equipment packages and drive configurations differ, so use the exact listing details when comparing vehicles.',
    buyerGuide: 'Confirm the CX-5 model code, engine and fuel type, transmission, 2WD or 4WD configuration and grade. For diesel variants, request service and inspection information where available. Review tyres, suspension, underbody, safety equipment, mileage and the destination’s emissions and import rules.',
    focusPoints: ['Verify model generation, engine, fuel type and drivetrain.', 'Check service or inspection information, tyres, suspension and underbody condition.', 'Compare grade, dimensions, FOB price and destination import eligibility.'] },
  { makeSlug: 'subaru', make: 'Subaru', model: 'Forester', slug: 'forester',
    intro: 'Review Subaru Forester SUV listings by generation, year, engine, transmission, drivetrain and grade. Confirm the exact mechanical layout and equipment, since specifications and safety features vary between model years and individual vehicles.',
    buyerGuide: 'Check the Forester model code, engine, transmission and drivetrain on the individual record. Review service information where available, warning lights, tyres, suspension, underbody photographs and mileage. Confirm dimensions, engine class, emissions and import eligibility in the destination market.',
    focusPoints: ['Confirm model code, engine, transmission and drivetrain from the record.', 'Review service evidence, tyres, suspension, underbody and warning indicators.', 'Check dimensions, emissions, vehicle age and local import requirements.'] },
  { makeSlug: 'mitsubishi', make: 'Mitsubishi', model: 'Outlander', slug: 'outlander',
    intro: 'Compare Mitsubishi Outlander SUV listings from Japan by model year, grade, engine or plug-in hybrid specification, drivetrain and condition. Verify whether the exact unit is a conventional or PHEV version and check the documentation for its equipment.',
    buyerGuide: 'Confirm the Outlander model code, generation, engine, transmission, drive configuration and whether it is a plug-in hybrid. For PHEV vehicles, request available battery condition and charging details. Review seating, cargo space, tyres, underbody, warning indicators and destination EV import requirements.',
    focusPoints: ['Verify model generation and whether the powertrain is petrol, diesel or PHEV.', 'For PHEV versions, request battery and charging information for the specific unit.', 'Check seating, dimensions, condition and destination EV or vehicle import rules.'] },
  { makeSlug: 'daihatsu', make: 'Daihatsu', model: 'Mira', slug: 'mira',
    intro: 'Review Daihatsu Mira compact-car listings from Japan and compare engine displacement, model code, year, grade and condition. Verify the vehicle’s exact classification because kei specifications and registration treatment may differ in the destination market.',
    buyerGuide: 'Check the Mira model code, engine displacement, transmission, dimensions, seat count and grade. Request chassis and export-document details where available. Before purchase, confirm whether the destination accepts the vehicle’s engine class, dimensions, age and original Japanese classification.',
    focusPoints: ['Confirm model code, engine displacement, year and dimensions.', 'Check chassis condition, mileage, transmission and vehicle photographs.', 'Verify local rules for kei-class or compact vehicles before arranging export.'] },
  { makeSlug: 'lexus', make: 'Lexus', model: 'RX', slug: 'rx',
    intro: 'Compare Lexus RX SUV listings from Japan by generation, grade, engine or hybrid configuration, drivetrain and equipment. The RX family includes different powertrain and trim combinations, so confirm the exact specification, condition and included features for each vehicle.',
    buyerGuide: 'Identify the RX model code and generation, grade, engine or hybrid system, transmission and drivetrain. Request the available service and diagnostic information, inspect interior and exterior condition, and check warning indicators. Verify safety equipment, multimedia compatibility and destination import requirements before committing.',
    focusPoints: ['Verify generation, grade, engine or hybrid system and drivetrain.', 'Request available service and diagnostic details and inspect cabin equipment.', 'Confirm the quoted condition, FOB scope and destination compliance.'] },
  { makeSlug: 'isuzu', make: 'Isuzu', model: 'Elf', slug: 'elf',
    intro: 'Explore Isuzu Elf commercial truck records from Japan and compare chassis, cab, body, engine and weight details. Vehicle length, width, payload and axle layout are essential selection criteria and should be verified against the individual truck documentation.',
    buyerGuide: 'Check the Elf chassis and model code, cab configuration, body type and dimensions, gross vehicle weight and payload rating where available. Inspect frame, underbody, tyres, brakes, suspension and cargo body. Confirm registration class, operating permits, loading limits and shipping measurements with the destination authorities and carrier.',
    focusPoints: ['Confirm chassis, cab, body dimensions, gross weight and documented payload.', 'Inspect frame, underbody, brakes, tyres, suspension and cargo body.', 'Verify destination commercial-vehicle registration, permits and shipping limits.'] },
] as const;

const bodyContent = [
  { slug: 'suv', bodyType: 'SUV',
    intro: 'Browse Japanese SUV listings and compare dimensions, seating, engine, drivetrain and equipment for each available vehicle. SUV is a broad category: a compact crossover and a larger off-road model can have very different operating costs, space and destination import treatment.',
    buyerGuide: 'Decide the seating and cargo space you need, then compare body dimensions, engine and fuel type, transmission and 2WD or 4WD layout. Inspect tyres, suspension, underbody and any off-road wear. Confirm weight, emissions, age and vehicle classification with the destination authority.',
    focusPoints: ['Compare overall dimensions, seat count, boot space and ground clearance.', 'Verify engine, fuel, transmission and the actual drivetrain.', 'Inspect tyres, suspension and underbody, then check import and duty rules.'] },
  { slug: 'hatchback', bodyType: 'Hatchback',
    intro: 'Compare Japanese hatchback listings by size, number of doors, seating, engine, transmission and cargo layout. Compact hatchbacks vary in cabin space and powertrain, so the model year, grade and specification of the exact vehicle matter more than the body-style label.',
    buyerGuide: 'Check the number of seats and doors, boot access, rear-seat folding, dimensions, engine and transmission. Compare mileage, safety equipment, tyres and condition photographs. Confirm the destination’s rules for engine size, emissions and vehicle age.',
    focusPoints: ['Compare dimensions, seating, door layout and usable cargo space.', 'Check engine, transmission, mileage, safety features and condition.', 'Verify vehicle-age, emissions and registration requirements for your destination.'] },
  { slug: 'sedan', bodyType: 'Sedan',
    intro: 'Explore Japanese sedan listings and compare cabin layout, boot space, engine, transmission, year and grade. Sedan specifications can vary by market and generation, so confirm the exact model code, powertrain and safety equipment on each vehicle record.',
    buyerGuide: 'Compare passenger space, boot capacity, length and width with your parking and usage needs. Verify engine displacement, fuel type, transmission, drivetrain and grade. Review tyres, body panels, interior condition and safety equipment, then check the destination’s vehicle-age and emissions rules.',
    focusPoints: ['Check passenger capacity, boot space and external dimensions.', 'Compare engine, fuel type, transmission, grade and safety equipment.', 'Review mileage, condition photos and destination import limits.'] },
  { slug: 'van', bodyType: 'Van',
    intro: 'Review Japanese van listings for passenger or cargo use and compare body dimensions, seating, roof height, doors and powertrain. The word “van” can describe very different configurations, so confirm the exact vehicle class and interior layout before purchase.',
    buyerGuide: 'Determine whether the van is configured for passengers, cargo or mixed use. Verify wheelbase, length, width, roof height, seat count, load area, payload and gross vehicle weight where documented. Inspect floors, doors, chassis and tyres, and confirm local commercial or passenger registration requirements.',
    focusPoints: ['Confirm passenger or cargo use, dimensions, seating and door configuration.', 'Check payload or weight documentation, floor, chassis and door condition.', 'Verify destination registration class, permits and carrier size restrictions.'] },
  { slug: 'mini-van', bodyType: 'Mini Van',
    intro: 'Compare Japanese minivan listings with attention to seat count, row arrangement, sliding-door configuration, engine and model grade. Similar-looking vehicles may have different cabin layouts and equipment, so review photographs and the exact specification for each listing.',
    buyerGuide: 'Check passenger capacity, seat folding and access to each row. Confirm engine, transmission, drivetrain, vehicle dimensions and any powered-door or safety features. Inspect seat mechanisms, air-conditioning, tyres and warning indicators, then confirm the destination’s rules for passenger vehicles.',
    focusPoints: ['Compare seat count, row layout, access and cargo flexibility.', 'Check sliding doors, seat mechanisms, powertrain and safety equipment.', 'Verify total dimensions, passenger-vehicle registration and import limits.'] },
  { slug: 'truck', bodyType: 'Truck',
    intro: 'Browse Japanese truck listings and compare cab type, chassis, body dimensions, payload documentation, engine and axle configuration. Commercial vehicle suitability depends on the exact weight rating and body specification, not just the displayed model name.',
    buyerGuide: 'Confirm gross vehicle weight, rated payload, chassis and cab code, body length and width, axle layout, engine and transmission from the available documentation. Inspect frame, underbody, tyres, brakes and cargo body. Ask the destination authority about commercial registration, permits, loading rules and duties.',
    focusPoints: ['Verify gross weight, payload, chassis, cab and body dimensions.', 'Inspect frame, brakes, tyres, suspension and cargo body condition.', 'Confirm commercial registration, import permits and shipping limits.'] },
  { slug: 'mpv', bodyType: 'MPV',
    intro: 'Compare Japanese MPV listings for passenger capacity, seating flexibility, cargo access and equipment. MPV is a varied category, so verify the exact number of seats, row arrangement, body dimensions and door configuration before choosing a vehicle.',
    buyerGuide: 'Check seat count, row layout, seat-folding mechanisms, sliding or hinged doors and boot capacity. Compare engine, transmission, grade, safety features and mileage. Confirm whether local rules classify the vehicle as a passenger car, van or another category.',
    focusPoints: ['Confirm seating capacity, row layout and cargo configuration.', 'Check doors, seat mechanisms, air-conditioning and safety equipment.', 'Verify vehicle classification, dimensions and destination import rules.'] },
  { slug: 'station-wagon', bodyType: 'Station Wagon',
    intro: 'Explore Japanese station wagon listings and compare rear cargo capacity, seating, roofline, dimensions and powertrain. Body-style names can overlap in marketplace data, so confirm the photographs and exact body configuration attached to each vehicle.',
    buyerGuide: 'Compare cargo length and height, rear-seat folding, passenger space and external dimensions. Verify engine, fuel, transmission, grade and drivetrain, then inspect the tailgate, cargo floor, tyres and condition photos. Check the vehicle’s export documents and destination rules.',
    focusPoints: ['Review cargo area dimensions, tailgate access and rear-seat folding.', 'Compare engine, transmission, drivetrain, grade and mileage.', 'Check body condition, photographs, export documents and import eligibility.'] },
  { slug: 'compact-suv', bodyType: 'Compact SUV',
    intro: 'Compare compact SUV listings sourced from Japan by dimensions, seating, engine, drivetrain and equipment. Compact SUV labels can cover different vehicle sizes and layouts, so compare the actual measurements and specifications rather than relying on category names.',
    buyerGuide: 'Check exterior length and width, ground clearance, seat count and cargo space. Verify engine or hybrid system, transmission and drive configuration. Inspect tyres, suspension and underbody, and check destination limits for dimensions, emissions, vehicle age and engine class.',
    focusPoints: ['Compare dimensions, seat count, cargo space and ground clearance.', 'Verify engine, fuel, transmission and whether 2WD or 4WD is fitted.', 'Review tyres, underbody, mileage and destination import rules.'] },
  { slug: 'off-road-vehicles', bodyType: 'Off-Road Vehicles',
    intro: 'Review Japanese off-road-oriented vehicle listings and compare the drivetrain, chassis, ground clearance, tyres and condition of each unit. An off-road appearance does not guarantee a particular 4WD system or equipment package, so verify the vehicle’s actual configuration.',
    buyerGuide: 'Confirm the transfer case or 4WD system, axle configuration, ground clearance, tyres and underbody condition. Ask about modifications and previous use if relevant. Check the chassis, suspension, steering, brakes and corrosion, then confirm dimensions and vehicle class with the destination authority.',
    focusPoints: ['Verify the actual 4WD system, axle layout and factory specification.', 'Inspect chassis, underbody, suspension, steering, brakes and tyres.', 'Check modifications, dimensions, vehicle class and destination import conditions.'] },
] as const;

function normalizeValue(value: unknown): string {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('en') : '';
}

function makeFaqs(label: string, specialAnswer: string): VehicleLandingFaq[] {
  return [
    {
      question: `How do I compare ${label} vehicles from Japan?`,
      answer: `Compare the exact model, model year, grade, engine or powertrain, transmission, mileage, photographs and condition information shown for each ${label} vehicle. Request clarification about any specification that is missing from the listing.`,
    },
    {
      question: `Does a ${label} listing include destination shipping and import charges?`,
      answer: 'The vehicle page shows the listing information available for that unit. Shipping, insurance, destination duties, taxes, port charges and local registration are separate items unless a written quotation expressly includes them. Ask Wazir Trading to confirm the scope in writing.',
    },
    {
      question: `Can I confirm the specification before paying for a ${label} vehicle?`,
      answer: specialAnswer,
    },
  ];
}

const makePages: VehicleLandingPage[] = makeContent.map((item) => ({
  kind: 'make',
  slug: item.slug,
  path: `${VEHICLE_LANDING_DIRECTORY_PATH}/${item.slug}`,
  label: item.name,
  make: item.name,
  title: `${item.name} Used Cars from Japan | Wazir Trading`,
  description: `Compare Japanese ${item.name} used-car listings by model, year, grade, mileage and condition. Review available stock and request an export quotation.`,
  intro: item.intro,
  buyerGuide: item.buyerGuide,
  focusPoints: [...item.focusPoints],
  faqs: makeFaqs(item.name, `Yes. Send the vehicle reference to Wazir Trading and request written confirmation of the specification, available condition information, export price and shipping scope before making payment.`),
}));

const modelPages: VehicleLandingPage[] = modelContent.map((item) => ({
  kind: 'model',
  slug: item.slug,
  path: `${VEHICLE_LANDING_DIRECTORY_PATH}/${item.makeSlug}/${item.slug}`,
  label: `${item.make} ${item.model}`,
  make: item.make,
  makeSlug: item.makeSlug,
  model: item.model,
  title: `${item.make} ${item.model} from Japan | Wazir Trading`,
  description: `Compare Japanese ${item.make} ${item.model} listings by year, grade, powertrain, mileage and condition. Review stock details and request an export quotation.`,
  intro: item.intro,
  buyerGuide: item.buyerGuide,
  focusPoints: [...item.focusPoints],
  faqs: makeFaqs(`${item.make} ${item.model}`, `The listing and vehicle documents should be checked against the chassis or model code. Contact Wazir Trading with the reference number to request clarification and written confirmation of any feature or document important to your purchase.`),
}));

const bodyPages: VehicleLandingPage[] = bodyContent.map((item) => ({
  kind: 'body-type',
  slug: item.slug,
  path: `${VEHICLE_LANDING_DIRECTORY_PATH}/body-type/${item.slug}`,
  label: item.bodyType,
  bodyType: item.bodyType,
  title: `Japanese ${item.bodyType} Cars for Export | Wazir Trading`,
  description: `Browse Japanese ${item.bodyType.toLowerCase()} listings and compare dimensions, seating, engine, mileage and condition. Review available stock and export details.`,
  intro: item.intro,
  buyerGuide: item.buyerGuide,
  focusPoints: [...item.focusPoints],
  faqs: makeFaqs(`${item.bodyType.toLowerCase()} vehicle`, 'Before purchase, request the vehicle-specific specification, photographs, condition information, export documents and a written quotation. Confirm the destination authority accepts the vehicle classification and dimensions.'),
}));

export const MAKE_LANDING_PAGES = makePages;
export const MODEL_LANDING_PAGES = modelPages;
export const BODY_TYPE_LANDING_PAGES = bodyPages;
export const ALL_VEHICLE_LANDING_PAGES = [...makePages, ...modelPages, ...bodyPages];

export function getVehicleLandingPage(pathValue: string): VehicleLandingPage | null {
  const path = pathValue.length > 1 ? pathValue.replace(/\/+$/, '') : pathValue;
  return ALL_VEHICLE_LANDING_PAGES.find((page) => page.path === path) ?? null;
}

export function vehicleLandingStructuredData(
  page: VehicleLandingPage,
  cars: VehicleSeoCar[],
): Record<string, unknown>[] {
  const pageUrl = `${SITE_URL}${page.path}`;
  const breadcrumbItems = [
    { name: 'Home', item: `${SITE_URL}/` },
    { name: 'Japanese Used Cars', item: `${SITE_URL}${VEHICLE_LANDING_DIRECTORY_PATH}` },
    { name: page.label, item: pageUrl },
  ];
  const collection: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    name: page.label,
    url: pageUrl,
    description: page.description,
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: Math.min(cars.length, VEHICLE_LANDING_CARDS_LIMIT),
      itemListElement: cars.slice(0, VEHICLE_LANDING_CARDS_LIMIT).map((car, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: [car.make, car.model, car.variant, car.year].filter(Boolean).join(' '),
        url: `${SITE_URL}/cars/${encodeURIComponent(car.ref_number.trim())}`,
      })),
    },
  };
  if (page.kind === 'make' && page.make) collection.about = { '@type': 'Brand', name: page.make };
  if (page.kind === 'model' && page.make && page.model) {
    collection.about = { '@type': 'Car', brand: { '@type': 'Brand', name: page.make }, model: page.model };
  }
  if (page.kind === 'body-type' && page.bodyType) collection.about = { '@type': 'Thing', name: `${page.bodyType} vehicles` };

  return [
    collection,
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem', position: index + 1, name: item.name, item: item.item,
      })),
    },
  ];
}

export function vehicleLandingDirectoryStructuredData(): Record<string, unknown> {
  const entries: VehicleLandingDirectoryEntry[] = ALL_VEHICLE_LANDING_PAGES.map((page) => ({
    label: page.label, path: page.path, kind: page.kind,
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}${VEHICLE_LANDING_DIRECTORY_PATH}#directory`,
    name: 'Japanese Used Cars by Make, Model and Body Type',
    url: `${SITE_URL}${VEHICLE_LANDING_DIRECTORY_PATH}`,
    description: 'Browse Japanese used vehicle guides by manufacturer, model and body type.',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: entries.length,
      itemListElement: entries.map((entry, index) => ({
        '@type': 'ListItem', position: index + 1, name: entry.label, url: `${SITE_URL}${entry.path}`,
      })),
    },
  };
}

export function vehicleLandingPagesForVehicle(car: VehicleSeoCar): VehicleLandingPage[] {
  const make = makePages.find((page) => normalizeValue(page.make) === normalizeValue(car.make));
  const model = modelPages.find((page) =>
    page.makeSlug === make?.slug && normalizeValue(page.model) === normalizeValue(car.model),
  );
  const body = bodyPages.find((page) => normalizeValue(page.bodyType) === normalizeValue(car.body_type));
  return [make, model, body].filter((page): page is VehicleLandingPage => Boolean(page));
}

export function vehicleLandingDirectorySections() {
  return [
    { title: 'Browse by manufacturer', pages: makePages },
    { title: 'Popular models', pages: modelPages },
    { title: 'Browse by body type', pages: bodyPages },
  ];
}

export function getMakeLandingPage(slug: string): VehicleLandingPage | null {
  return makePages.find((page) => page.slug === slug) ?? null;
}

export function getModelLandingPage(makeSlug: string, modelSlug: string): VehicleLandingPage | null {
  return modelPages.find((page) => page.makeSlug === makeSlug && page.slug === modelSlug) ?? null;
}

export function getBodyTypeLandingPage(slug: string): VehicleLandingPage | null {
  return bodyPages.find((page) => page.slug === slug) ?? null;
}

export function vehicleLandingCarsFilterPath(page: VehicleLandingPage): string {
  const params = new URLSearchParams();
  if (page.kind === 'make' && page.make) params.set('make', page.make);
  if (page.kind === 'model' && page.make && page.model) {
    params.set('make', page.make);
    params.set('advModel', page.model);
  }
  if (page.kind === 'body-type' && page.bodyType) params.set('body', page.bodyType);
  return `/cars?${params.toString()}`;
}
