import type { VehicleLandingFaq, VehicleLandingKind } from "./vehicle-landing-pages";

/**
 * Curated Tier 3 make/model content. Search themes are editorial planning
 * data only and are never rendered as keyword lists or hidden text.
 */
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

export const VEHICLE_TIER_THREE_CONTENT: Record<string, VehicleTierThreeContent> = {
  "make:mitsubishi-fuso": {
    "kind": "make",
    "seoTier": 3,
    "title": "Mitsubishi Fuso Trucks from Japan | Wazir Trading",
    "description": "Explore Japanese Mitsubishi Fuso trucks by Canter series, chassis, cab, body, rated weights, condition and export requirements.",
    "intro": "Explore Mitsubishi Fuso commercial vehicles sourced from Japan, with the current catalogue focused on truck listings such as the Canter family. Commercial suitability depends on the exact chassis, cab, wheelbase, axle layout, body and documented weight ratings. Compare each vehicle's records and photographs rather than assuming capacity or equipment from its model name.",
    "buyerGuide": "Confirm the full Mitsubishi Fuso model/chassis code, manufacture year, engine, transmission, cab style, wheelbase, axle arrangement and body configuration. Verify gross vehicle weight, payload and specialist-body ratings from the manufacturer plate or vehicle papers; do not estimate them from appearance. Inspect frame rails, underbody, suspension, tyres, brakes, cab, cargo body and fitted equipment. Confirm the destination's commercial registration category, road-weight and dimension limits, emissions, permits and carrier restrictions.",
    "focusPoints": [
      "Identify the exact Mitsubishi Fuso model, chassis code, cab, wheelbase and body configuration.",
      "Verify gross vehicle weight and payload using the vehicle plate or official documents.",
      "Inspect chassis, underbody, suspension, tyres, brakes, cab and specialist equipment.",
      "Check destination commercial registration, permits, emissions, road limits and shipping dimensions."
    ],
    "searchThemes": [
      "Mitsubishi Fuso trucks from Japan",
      "Japanese Fuso Canter export",
      "Mitsubishi Fuso commercial vehicle inventory",
      "Fuso truck chassis and payload documentation"
    ],
    "faqs": [
      {
        "question": "Is Mitsubishi Fuso the same manufacturer record as Mitsubishi?",
        "answer": "No. Wazir Trading maintains Mitsubishi Fuso and Mitsubishi as separate manufacturer records. Use the exact make and chassis shown on the selected truck's documents."
      },
      {
        "question": "How do I confirm a Mitsubishi Fuso truck's payload?",
        "answer": "Use the vehicle manufacturer's plate and official vehicle papers for that chassis and body. Do not estimate payload from the model name or photographs."
      },
      {
        "question": "Which details matter when comparing Fuso Canter trucks?",
        "answer": "Compare chassis series, year, cab, wheelbase, axle layout, engine, transmission, body dimensions and documented weight ratings."
      },
      {
        "question": "Can a Fuso truck be imported for commercial use in every country?",
        "answer": "No. Commercial registration, permits, vehicle age, emissions, road-weight limits and dimensions differ by destination. Confirm the exact vehicle category before shipment."
      }
    ]
  },
  "make:hino": {
    "kind": "make",
    "seoTier": 3,
    "title": "Hino Trucks from Japan | Commercial Vehicle Export | Wazir Trading",
    "description": "Compare Japanese Hino commercial trucks by model, chassis, cab, engine, rated weights, condition and destination import rules.",
    "intro": "Browse Hino commercial vehicles represented in Wazir Trading's Japanese inventory and compare each truck by model designation, chassis, cab and body configuration. This manufacturer-level guide groups the Hino records currently represented in the catalogue without creating thin pages for every low-volume model name. Use the vehicle-specific papers and condition evidence to evaluate each truck.",
    "buyerGuide": "Confirm the exact Hino model and chassis code, manufacture year, cab type, engine and fuel specification, transmission, axle layout, wheelbase and body. Obtain gross vehicle weight and payload from the manufacturer plate or official papers. Inspect frame rails, underbody, suspension, tyres, brakes, cab, cargo body and evidence of commercial wear or modifications. Check destination vehicle class, commercial permits, emissions, road limits, shipping dimensions and local registration requirements.",
    "focusPoints": [
      "Match the Hino model/chassis code, year, cab, wheelbase and body to the export documents.",
      "Verify gross vehicle weight and payload from official vehicle ratings, not estimates.",
      "Review frame, underbody, suspension, brakes, tyres, cab and cargo body condition.",
      "Confirm destination commercial-vehicle age, permits, emissions, loading limits and registration."
    ],
    "searchThemes": [
      "Hino trucks from Japan",
      "Japanese Hino commercial vehicle export",
      "Hino truck chassis and cab comparison",
      "Hino used truck inventory Japan"
    ],
    "faqs": [
      {
        "question": "Does the Hino manufacturer page show every Hino model?",
        "answer": "It covers the Hino model records registered in Wazir Trading's current catalogue. Stock and model coverage can change, so use the matching inventory and confirm the specific reference."
      },
      {
        "question": "How can I verify a Hino truck's rated payload?",
        "answer": "Request the manufacturer plate and official vehicle papers for the exact chassis and body. Do not infer payload from photographs or a broad model designation."
      },
      {
        "question": "What should I inspect on a used Hino commercial truck?",
        "answer": "Review chassis rails, corrosion, underbody, suspension, tyres, brakes, cab, cargo body, warning indicators and any available service or inspection evidence."
      },
      {
        "question": "What import checks apply to Japanese Hino trucks?",
        "answer": "Check destination commercial classification, age, emissions, gross weight, axle limits, dimensions, permits, taxes and registration with the relevant authority."
      }
    ]
  },
  "model:daihatsu/tanto": {
    "kind": "model",
    "seoTier": 3,
    "title": "Daihatsu Tanto from Japan | Kei Car Export | Wazir Trading",
    "description": "Compare Japanese Daihatsu Tanto compact cars by chassis, engine size, seating, sliding doors, grade and condition.",
    "intro": "Explore Daihatsu Tanto tall-body compact vehicles sourced from Japan and compare the exact model code, year, grade, engine and cabin configuration. Tanto versions can differ in door equipment, seat layout and safety features. Confirm the actual vehicle class and dimensions from its documents, especially where the destination applies different rules to Japanese kei vehicles.",
    "buyerGuide": "Verify the Tanto chassis/model code, manufacture year, engine displacement, transmission and grade. Confirm the documented seat count, rear-seat movement, door arrangement and any powered-door equipment fitted to the selected unit. Review tyres, suspension, underbody, corrosion, cabin wear, warning indicators and condition photographs. Ask the destination authority whether the exact engine size, dimensions, age and safety specification qualify for local import and registration.",
    "focusPoints": [
      "Match Tanto model code, generation, manufacture year and grade.",
      "Verify engine capacity, dimensions and registered seat count for local classification.",
      "Inspect rear-seat movement, sliding-door operation, tyres, underbody and cabin condition.",
      "Confirm destination kei/compact-car age, emissions, safety and registration rules."
    ],
    "searchThemes": [
      "Daihatsu Tanto from Japan",
      "used Daihatsu Tanto kei car export",
      "Japanese Tanto compact tall wagon",
      "Daihatsu Tanto sliding door and grade"
    ],
    "faqs": [
      {
        "question": "Is every Daihatsu Tanto classified as a kei car overseas?",
        "answer": "No. Destination classification is based on its own rules and the exact vehicle's engine, dimensions and documents. Confirm eligibility with the local authority."
      },
      {
        "question": "What should I check about Tanto doors and seating?",
        "answer": "Verify which doors are fitted, their operation, seat count, rear-seat movement and cabin access using the actual vehicle and photographs."
      },
      {
        "question": "Does a Tanto grade guarantee powered sliding doors?",
        "answer": "No. Door equipment and convenience features vary by year, grade and options. Confirm the equipment recorded for the selected unit."
      },
      {
        "question": "Can I import a Japanese Tanto to any country?",
        "answer": "No. Vehicle age, engine capacity, emissions, dimensions, safety rules and kei/compact classification vary by destination. Obtain confirmation before purchase."
      }
    ]
  },
  "model:toyota/dyna": {
    "kind": "model",
    "seoTier": 3,
    "title": "Toyota Dyna from Japan | Light Truck Export | Wazir Trading",
    "description": "Compare Japanese Toyota Dyna trucks by chassis, cab, wheelbase, body, engine, rated weights and condition evidence.",
    "intro": "Explore Toyota Dyna light commercial trucks sourced from Japan and compare the exact chassis series, cab, wheelbase, engine and body configuration. Dyna vehicles can be configured for different delivery, cargo and specialist uses. Verify dimensions and official weight ratings for the selected truck rather than inferring payload or capacity from its model designation.",
    "buyerGuide": "Confirm the Dyna model/chassis code, manufacture year, engine, transmission, cab style, wheelbase, axle arrangement and cargo body. Obtain gross vehicle weight and payload from the manufacturer plate or official vehicle documents. Inspect frame rails, underbody, suspension, brakes, tyres, cab, cargo bed and fitted equipment; request additional close-ups where the frame or body condition is unclear. Check destination commercial registration, permits, emissions, road weight and dimensions before arranging shipment.",
    "focusPoints": [
      "Verify Dyna chassis, cab, wheelbase, axle layout and body dimensions.",
      "Confirm gross vehicle weight and payload from the manufacturer's plate or official papers.",
      "Inspect frame, underbody, suspension, tyres, brakes, cab, cargo body and modifications.",
      "Check destination truck class, loading limits, emissions, permits and shipping dimensions."
    ],
    "searchThemes": [
      "Toyota Dyna from Japan",
      "used Toyota Dyna truck export",
      "Japanese Dyna commercial truck stock",
      "Toyota Dyna chassis and payload"
    ],
    "faqs": [
      {
        "question": "How do I find the payload of a Toyota Dyna?",
        "answer": "Use the rated values on the vehicle manufacturer's plate and official papers for the exact chassis/body. Do not estimate capacity from the Dyna name or photos."
      },
      {
        "question": "Which Toyota Dyna body configuration is listed?",
        "answer": "Check the individual vehicle details and photographs for cab, wheelbase, flatbed, box or specialist body layout and verify the dimensions against documents."
      },
      {
        "question": "What condition areas matter most on a used Dyna?",
        "answer": "Inspect the frame, underbody, suspension, brakes, tyres, cab, cargo body and signs of corrosion, heavy loading, repairs or modifications."
      },
      {
        "question": "Are Toyota Dyna trucks subject to passenger-car import rules?",
        "answer": "Not necessarily. Commercial classification, weight, age, emissions and permits can change the rules. Confirm the exact truck class in the destination market."
      }
    ]
  },
  "model:subaru/xv": {
    "kind": "model",
    "seoTier": 3,
    "title": "Subaru XV from Japan | Crossover & AWD Export | Wazir Trading",
    "description": "Compare Japanese Subaru XV crossovers by generation, engine, drivetrain, grade, ground clearance and condition.",
    "intro": "Browse Subaru XV crossover vehicles sourced from Japan and compare the generation, chassis/model code, engine, transmission and drivetrain shown in each record. The XV name is associated with Subaru's compact crossover range, but trim, model-year equipment and mechanical configuration can differ. Verify the specific vehicle rather than relying on a broad description.",
    "buyerGuide": "Confirm the XV model code, manufacture year, engine, transmission, grade and documented drivetrain. Check ground clearance and tyre specification from the vehicle details, and inspect underbody, suspension, wheels, brakes and signs of off-road contact or modifications. Review mileage, warning indicators, condition photographs and service evidence where available. If comparing with a Subaru Crosstrek listing, verify the exact model code and export-document identity before treating two records as the same vehicle.",
    "focusPoints": [
      "Identify the XV generation, chassis/model code, manufacture year and grade.",
      "Verify engine, transmission and documented drivetrain for the exact unit.",
      "Review tyres, wheels, suspension, underbody and any signs of impact or modifications.",
      "Check available service evidence, emissions, vehicle age and destination registration rules."
    ],
    "searchThemes": [
      "Subaru XV from Japan",
      "used Subaru XV crossover export",
      "Japanese Subaru XV AWD stock",
      "Subaru XV generation and model code"
    ],
    "faqs": [
      {
        "question": "Is the Subaru XV identical to every Crosstrek listing?",
        "answer": "Naming varies by market and model year. Confirm the chassis/model code and export documents for the actual vehicle before combining specifications or records."
      },
      {
        "question": "How can I confirm the XV's drivetrain?",
        "answer": "Check the exact model code and drivetrain specification in the individual listing and vehicle papers. Do not infer equipment from the crossover name alone."
      },
      {
        "question": "What should I inspect on a used Subaru XV?",
        "answer": "Review tyres, wheels, suspension, underbody, brakes, warning indicators, cabin wear and signs of impact or off-road use."
      },
      {
        "question": "Can the Subaru XV be imported to every destination?",
        "answer": "No. Age, emissions, steering and registration conditions vary by destination. Confirm the exact model year and specification with the local authority."
      }
    ]
  },
  "model:audi/tt": {
    "kind": "model",
    "seoTier": 3,
    "title": "Audi TT from Japan | Coupe & Roadster Export | Wazir Trading",
    "description": "Explore Japanese Audi TT coupes and roadsters by generation, engine, transmission, grade, options and condition.",
    "intro": "Explore Audi TT vehicles sourced from Japan and distinguish the exact generation, body style, engine, transmission and grade of each listing. Coupe and Roadster body styles and equipment can differ, and model updates may change the engine and options. Confirm the individual car's identity and condition from its record and photographs.",
    "buyerGuide": "Verify the TT chassis/model code, generation, manufacture year, body style, engine and fuel type, transmission, drivetrain and trim. Check roof operation and seals on Roadster versions and inspect wheels, tyres, brakes, body panels, underbody and cabin wear. Request available service and diagnostic evidence for the selected engine/transmission and any warning indicators. Confirm original specification and any modifications from documents, then check destination age, emissions and registration requirements.",
    "focusPoints": [
      "Confirm TT generation, chassis/model code, manufacture year and Coupe/Roadster body style.",
      "Verify engine, transmission, drivetrain and actual equipment package.",
      "Inspect roof operation where applicable, tyres, wheels, brakes, body, cabin and underbody.",
      "Review available service/diagnostic evidence and confirm local age, emissions and registration rules."
    ],
    "searchThemes": [
      "Audi TT from Japan",
      "used Audi TT coupe export",
      "Japanese Audi TT Roadster",
      "Audi TT generation and engine comparison"
    ],
    "faqs": [
      {
        "question": "Does the Audi TT listing refer to a Coupe or Roadster?",
        "answer": "Check the body style shown in the exact vehicle record and photographs. Do not infer the roof configuration from the model name."
      },
      {
        "question": "What should I check on an Audi TT Roadster?",
        "answer": "Inspect roof operation, seals, water ingress signs, warning indicators and any roof-system service information available for that car."
      },
      {
        "question": "How do I compare Audi TT generations?",
        "answer": "Use chassis/model code and year, then compare engine, transmission, drivetrain, body style, grade and fitted options."
      },
      {
        "question": "Are aftermarket TT modifications included in the factory specification?",
        "answer": "No. Ask for a list of modifications and verify them against the original vehicle documents. Confirm local roadworthiness and registration treatment before purchase."
      }
    ]
  },
  "model:mercedes-benz/c-class": {
    "kind": "model",
    "seoTier": 3,
    "title": "Mercedes C-Class from Japan | Sedan & Estate Export",
    "description": "Compare Japanese Mercedes-Benz C-Class vehicles by generation, body style, engine, trim, options and service evidence.",
    "intro": "Browse Mercedes-Benz C-Class vehicles represented in the Japanese catalogue and compare the exact generation, chassis code, body style, engine, transmission and trim. C-Class specifications span multiple model updates and body configurations, so use the specific vehicle documents and equipment record rather than assuming every version shares the same features.",
    "buyerGuide": "Confirm chassis/model code, manufacture year, sedan or estate body, engine and fuel type, transmission, drivetrain and trim. Verify AMG-Line or other option-package details from documentation, not exterior styling alone. Review safety equipment, warning indicators, service/diagnostic evidence, mileage, tyres, body panels, cabin and condition photographs. Confirm destination age, emissions, steering, engine capacity and local registration rules.",
    "focusPoints": [
      "Match C-Class generation, chassis code, body style, year and exact trim.",
      "Verify engine, fuel, transmission and AMG/option-package details from documents.",
      "Review actual safety equipment, mileage, warning indicators and available service records.",
      "Check destination age, emissions, steering, engine/tax class and import eligibility."
    ],
    "searchThemes": [
      "Mercedes-Benz C-Class from Japan",
      "used Mercedes C-Class export",
      "Japanese C-Class sedan and estate",
      "Mercedes C-Class generation and trim"
    ],
    "faqs": [
      {
        "question": "Is every Japanese C-Class a sedan?",
        "answer": "No. Body styles can include different configurations by generation and listing. Confirm the exact body from the vehicle record and export documents."
      },
      {
        "question": "How can I tell an original AMG version from an AMG-Line package?",
        "answer": "Check the full model designation and supporting vehicle documentation. Exterior styling alone does not prove an original AMG model or a particular package."
      },
      {
        "question": "What service information should I request for a used C-Class?",
        "answer": "Ask what maintenance, inspection and diagnostic records are available for the exact vehicle. Review warning indicators, mileage and the condition evidence."
      },
      {
        "question": "Does the C-Class page confirm destination tax or import eligibility?",
        "answer": "No. Destination rules can depend on age, engine, value, emissions and vehicle class. Obtain a current, vehicle-specific assessment before purchase."
      }
    ]
  },
  "model:mitsubishi/canter": {
    "kind": "model",
    "seoTier": 3,
    "title": "Mitsubishi Canter from Japan | Truck Export | Wazir Trading",
    "description": "Compare Japanese Mitsubishi Canter trucks by chassis, cab, wheelbase, engine, body and commercial vehicle condition.",
    "intro": "Explore Mitsubishi Canter commercial truck listings as a distinct Mitsubishi make/model record in Wazir Trading's catalogue. Do not confuse this route with Mitsubishi Fuso Canter: verify the manufacturer and chassis shown on the individual vehicle papers. Compare cab, wheelbase, body, engine and documented weight ratings before matching a truck to its intended work.",
    "buyerGuide": "Confirm the exact make as recorded in the vehicle data, model/chassis code, manufacture year, cab, wheelbase, axle layout, engine, transmission and cargo body. Verify gross vehicle weight and payload from the manufacturer plate or official papers. Inspect frame, underbody, suspension, tyres, brakes, cab, body and specialist equipment. Check destination commercial classification, loading and axle limits, emissions, permits, registration and shipping dimensions before payment.",
    "focusPoints": [
      "Verify that the selected unit is Mitsubishi Canter and not Mitsubishi Fuso Canter.",
      "Match chassis, cab, wheelbase, axle layout, engine and body to the vehicle documents.",
      "Confirm gross vehicle weight and payload from official ratings; inspect frame and underbody condition.",
      "Check commercial registration, permits, road limits, emissions and carrier dimensions."
    ],
    "searchThemes": [
      "Mitsubishi Canter from Japan",
      "used Mitsubishi Canter truck export",
      "Japanese Mitsubishi Canter chassis",
      "Mitsubishi Canter and Fuso Canter comparison"
    ],
    "faqs": [
      {
        "question": "Is Mitsubishi Canter the same page as Mitsubishi Fuso Canter?",
        "answer": "No. This catalogue keeps Mitsubishi Canter and Mitsubishi Fuso Canter as separate canonical model records. Verify the make on the selected vehicle's documents."
      },
      {
        "question": "How do I confirm a Mitsubishi Canter's payload?",
        "answer": "Use the official weight ratings on the truck's manufacturer plate and papers. Do not infer payload from the model name or body appearance."
      },
      {
        "question": "What should I inspect on a used Canter truck?",
        "answer": "Review frame rails, underbody, suspension, tyres, brakes, cab, cargo body, corrosion and any specialist equipment or modifications."
      },
      {
        "question": "Can Mitsubishi Canter be imported under passenger vehicle rules?",
        "answer": "Its classification may be commercial based on vehicle papers, weight and body. Confirm the exact category, permits, age and emissions requirements with the destination authority."
      }
    ]
  },
  "model:mitsubishi/minicab-truck": {
    "kind": "model",
    "seoTier": 3,
    "title": "Mitsubishi Minicab Truck from Japan | Kei Truck Export",
    "description": "Compare Japanese Mitsubishi Minicab Truck models by chassis, engine size, cab, bed, 4WD and destination kei-truck rules.",
    "intro": "Explore Mitsubishi Minicab Truck compact commercial vehicles sourced from Japan and compare the exact chassis code, engine displacement, year, grade, cab and bed configuration. Many versions are designed around Japan's kei truck class, but destinations may apply different rules to dimensions, engine capacity, safety, commercial registration and payload. Verify the specific vehicle documents before deciding.",
    "buyerGuide": "Confirm the Minicab Truck model/chassis code, manufacture year, engine capacity, transmission, drivetrain, cab configuration and cargo-bed dimensions. Check whether the selected unit is 2WD or 4WD from its documented specification. Verify gross vehicle weight and payload from official papers, and inspect chassis, bed floor, underbody, suspension, tyres, brakes, corrosion and modifications. Obtain destination confirmation for kei/commercial classification, age, emissions, loading and registration rules.",
    "focusPoints": [
      "Match Minicab Truck chassis code, engine size, year and cab/bed configuration.",
      "Verify 2WD/4WD, transmission, dimensions and official weight ratings.",
      "Inspect chassis, bed, underbody, suspension, tyres, brakes, corrosion and modifications.",
      "Confirm destination kei-truck, commercial registration, age, emissions and payload rules."
    ],
    "searchThemes": [
      "Mitsubishi Minicab Truck from Japan",
      "used Minicab kei truck export",
      "Japanese Mitsubishi mini truck 4WD",
      "Minicab Truck chassis and bed configuration"
    ],
    "faqs": [
      {
        "question": "Is every Mitsubishi Minicab Truck a 4WD?",
        "answer": "No. Drivetrain varies by version. Check the exact model code and vehicle documents for the selected unit."
      },
      {
        "question": "Is Minicab Truck automatically classed as a kei truck outside Japan?",
        "answer": "No. Destination rules may use different engine, dimensions, weight and commercial classifications. Confirm the vehicle's papers with the local authority."
      },
      {
        "question": "How do I assess the bed and payload?",
        "answer": "Inspect bed dimensions and condition, and use official gross-weight and payload ratings from the vehicle plate or papers. Do not estimate capacity visually."
      },
      {
        "question": "What should I check before shipping a used mini truck?",
        "answer": "Review chassis, corrosion, tyres, brakes, suspension, bed, drivetrain, documents and destination rules for age, emissions, payload and commercial use."
      }
    ]
  },
  "model:daihatsu/move-canbus": {
    "kind": "model",
    "seoTier": 3,
    "title": "Daihatsu Move Canbus from Japan | Compact Car Export",
    "description": "Explore Japanese Daihatsu Move Canbus cars by chassis, engine, grade, sliding doors, safety equipment and condition.",
    "intro": "Browse Daihatsu Move Canbus compact tall-wagon vehicles sourced from Japan and compare the exact model code, year, grade, powertrain and cabin features. Door equipment, safety technology and trim can vary by model update and options. Verify the actual vehicle specification and destination classification before making a purchase decision.",
    "buyerGuide": "Confirm chassis/model code, manufacture year, engine displacement, transmission, grade and seat count. Check rear sliding-door configuration, whether any powered-door functions are actually fitted, cabin and cargo layout, and the safety features documented for the selected vehicle. Review tyres, brakes, underbody, suspension, corrosion, mileage and condition photos. Confirm whether the destination recognises the exact engine size and dimensions under its kei/compact-car rules.",
    "focusPoints": [
      "Verify Move Canbus chassis/model code, model year and equipment grade.",
      "Confirm engine size, seating, sliding-door arrangement and powered features from the listing.",
      "Review safety equipment, tyres, brakes, underbody, corrosion and cabin condition.",
      "Check destination age, emissions, dimensions, kei/compact classification and registration."
    ],
    "searchThemes": [
      "Daihatsu Move Canbus from Japan",
      "used Move Canbus compact car export",
      "Japanese Daihatsu Move Canbus stock",
      "Move Canbus grade and sliding door features"
    ],
    "faqs": [
      {
        "question": "Does every Move Canbus have powered sliding doors?",
        "answer": "Do not assume so. Verify the exact door equipment and options listed for the selected vehicle and ask for confirmation where needed."
      },
      {
        "question": "Is Move Canbus classified as a kei car in my destination?",
        "answer": "That depends on destination law and the vehicle's documented engine and dimensions. Confirm its classification with the relevant local authority."
      },
      {
        "question": "What should I compare between Move Canbus grades?",
        "answer": "Compare the exact safety equipment, door functions, trim, multimedia, comfort features and options recorded for each model year and vehicle."
      },
      {
        "question": "What condition checks matter on a tall compact wagon?",
        "answer": "Review sliding doors, cabin, seats, tyres, brakes, suspension, underbody, corrosion, warning lights and any available inspection evidence."
      }
    ]
  },
  "model:lexus/ls": {
    "kind": "model",
    "seoTier": 3,
    "title": "Lexus LS from Japan | Luxury Sedan Export | Wazir Trading",
    "description": "Compare Japanese Lexus LS luxury sedans by generation, engine or hybrid system, grade, cabin equipment and condition.",
    "intro": "Explore Lexus LS luxury sedans sourced from Japan and compare the exact generation, chassis code, engine or hybrid system, grade and cabin configuration. LS equipment and powertrains can differ across model years and trim packages. Evaluate the individual vehicle's documented features and condition rather than assuming that all LS models share the same specification.",
    "buyerGuide": "Confirm LS generation, chassis/model code, manufacture year, grade, engine or hybrid designation, transmission and drivetrain. Review the actual safety, driver-assistance, rear-seat, comfort and multimedia features recorded for the selected car. Inspect cabin leather and trim, seat mechanisms, electronics, warning indicators, paint, wheels, tyres and mileage. For hybrid versions, request available system/battery diagnostics. Check destination vehicle age, engine capacity, value-related taxes, emissions and luxury-car registration treatment.",
    "focusPoints": [
      "Identify LS generation, chassis/model code, year, grade and exact powertrain.",
      "Verify rear-seat, safety, comfort and multimedia equipment on the selected vehicle.",
      "Inspect cabin trim, seats, electronics, warning indicators, body, wheels and condition evidence.",
      "Request available hybrid diagnostics and confirm destination age, engine, tax and import rules."
    ],
    "searchThemes": [
      "Lexus LS from Japan",
      "used Lexus LS luxury sedan export",
      "Japanese Lexus LS hybrid stock",
      "Lexus LS generation and grade comparison"
    ],
    "faqs": [
      {
        "question": "Are all Lexus LS vehicles hybrid?",
        "answer": "No. Powertrain availability varies by generation and market. Confirm the exact engine or hybrid configuration from the vehicle documents."
      },
      {
        "question": "How do I compare Lexus LS rear-seat equipment?",
        "answer": "Check the vehicle-specific grade and option record, then request clear photographs of seat controls, comfort functions and rear-cabin features."
      },
      {
        "question": "What should I request for a used LS hybrid?",
        "answer": "Ask for any battery/system diagnostic, inspection and service information available for that individual vehicle. General model data cannot certify its battery condition."
      },
      {
        "question": "Are luxury-car import taxes the same as ordinary sedan duties?",
        "answer": "Not necessarily. Destination charges may depend on value, engine capacity, age, hybrid status and local luxury-vehicle rules. Get a vehicle-specific assessment."
      }
    ]
  }
};
