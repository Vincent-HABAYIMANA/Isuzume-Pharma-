/**
 * Product catalogue for Isuzume Pharma.
 *
 * In a production system this data would come from a database through a REST
 * API. It is kept here as a local module so the application runs offline and
 * so the marking / demo does not depend on an external server.
 *
 * Prices are in Rwandan Francs (RWF).
 *
 * Fields
 *  id            unique identifier
 *  name          brand or generic name shown to the customer
 *  strength      dose per unit, e.g. "500 mg"
 *  form          dosage form: tablet, capsule, syrup, injection, cream, device
 *  category      catalogue category used by the filter
 *  price         unit price in RWF
 *  packSize      what the customer receives for that price
 *  stock         units currently available
 *  prescription  true when a valid prescription is required by law
 *  description   short, plain-language description
 */

export const CATEGORIES = [
  "Pain and fever",
  "Malaria",
  "Antibiotics",
  "Cold and allergy",
  "Stomach and digestion",
  "Chronic care",
  "Vitamins and supplements",
  "Mother and baby",
  "First aid",
  "Personal protection"
];

const products = [
  {
    id: "isz-001",
    name: "Paracetamol",
    strength: "500 mg",
    form: "tablet",
    category: "Pain and fever",
    price: 1200,
    packSize: "Pack of 20 tablets",
    stock: 84,
    prescription: false,
    description: "Relieves headache, body pain and lowers fever in adults and children over 12."
  },
  {
    id: "isz-002",
    name: "Ibuprofen",
    strength: "400 mg",
    form: "tablet",
    category: "Pain and fever",
    price: 2500,
    packSize: "Pack of 20 tablets",
    stock: 60,
    prescription: false,
    description: "Anti-inflammatory for period pain, toothache, muscle and joint pain. Take after food."
  },
  {
    id: "isz-003",
    name: "Diclofenac gel",
    strength: "1%",
    form: "cream",
    category: "Pain and fever",
    price: 4800,
    packSize: "Tube of 30 g",
    stock: 26,
    prescription: false,
    description: "Rub on the skin to ease back pain, sprains and swollen joints."
  },
  {
    id: "isz-004",
    name: "Artemether / Lumefantrine",
    strength: "20 mg / 120 mg",
    form: "tablet",
    category: "Malaria",
    price: 6500,
    packSize: "Full adult course, 24 tablets",
    stock: 40,
    prescription: true,
    description: "First-line treatment for uncomplicated malaria. Finish the full course."
  },
  {
    id: "isz-005",
    name: "Malaria rapid test",
    strength: "Single use",
    form: "device",
    category: "Malaria",
    price: 3000,
    packSize: "1 test kit",
    stock: 55,
    prescription: false,
    description: "Home test that shows a malaria result from one drop of blood in 15 minutes."
  },
  {
    id: "isz-006",
    name: "Insecticide-treated bed net",
    strength: "Double bed",
    form: "device",
    category: "Malaria",
    price: 9500,
    packSize: "1 net with hanging kit",
    stock: 18,
    prescription: false,
    description: "Long-lasting treated net that protects a family from mosquito bites at night."
  },
  {
    id: "isz-007",
    name: "Amoxicillin",
    strength: "500 mg",
    form: "capsule",
    category: "Antibiotics",
    price: 5200,
    packSize: "Pack of 21 capsules",
    stock: 32,
    prescription: true,
    description: "Treats chest, ear and throat infections. Prescription required."
  },
  {
    id: "isz-008",
    name: "Azithromycin",
    strength: "250 mg",
    form: "tablet",
    category: "Antibiotics",
    price: 7800,
    packSize: "Pack of 6 tablets",
    stock: 21,
    prescription: true,
    description: "Short antibiotic course for respiratory and skin infections. Prescription required."
  },
  {
    id: "isz-009",
    name: "Amoxicillin syrup",
    strength: "125 mg / 5 ml",
    form: "syrup",
    category: "Antibiotics",
    price: 4500,
    packSize: "Bottle of 100 ml",
    stock: 24,
    prescription: true,
    description: "Antibiotic for children. The pharmacist mixes it with water before delivery."
  },
  {
    id: "isz-010",
    name: "Cetirizine",
    strength: "10 mg",
    form: "tablet",
    category: "Cold and allergy",
    price: 2200,
    packSize: "Pack of 10 tablets",
    stock: 70,
    prescription: false,
    description: "Stops sneezing, itchy eyes and skin allergy. One tablet a day."
  },
  {
    id: "isz-011",
    name: "Cough syrup with honey",
    strength: "Adult formula",
    form: "syrup",
    category: "Cold and allergy",
    price: 3800,
    packSize: "Bottle of 120 ml",
    stock: 38,
    prescription: false,
    description: "Soothes a dry, irritating cough and sore throat."
  },
  {
    id: "isz-012",
    name: "Xylometazoline nasal spray",
    strength: "0.1%",
    form: "device",
    category: "Cold and allergy",
    price: 4200,
    packSize: "Spray bottle of 10 ml",
    stock: 29,
    prescription: false,
    description: "Clears a blocked nose. Do not use for more than five days."
  },
  {
    id: "isz-013",
    name: "Oral rehydration salts",
    strength: "WHO formula",
    form: "sachet",
    category: "Stomach and digestion",
    price: 500,
    packSize: "1 sachet, makes 1 litre",
    stock: 200,
    prescription: false,
    description: "Replaces water and salts lost during diarrhoea or vomiting."
  },
  {
    id: "isz-014",
    name: "Omeprazole",
    strength: "20 mg",
    form: "capsule",
    category: "Stomach and digestion",
    price: 3600,
    packSize: "Pack of 14 capsules",
    stock: 44,
    prescription: false,
    description: "Reduces stomach acid, heartburn and ulcer pain. Take before breakfast."
  },
  {
    id: "isz-015",
    name: "Albendazole",
    strength: "400 mg",
    form: "tablet",
    category: "Stomach and digestion",
    price: 900,
    packSize: "1 tablet",
    stock: 120,
    prescription: false,
    description: "Single-dose deworming tablet for adults and children over two years."
  },
  {
    id: "isz-016",
    name: "Metformin",
    strength: "500 mg",
    form: "tablet",
    category: "Chronic care",
    price: 4900,
    packSize: "Pack of 30 tablets",
    stock: 35,
    prescription: true,
    description: "Controls blood sugar in type 2 diabetes. Prescription required."
  },
  {
    id: "isz-017",
    name: "Amlodipine",
    strength: "5 mg",
    form: "tablet",
    category: "Chronic care",
    price: 4300,
    packSize: "Pack of 30 tablets",
    stock: 27,
    prescription: true,
    description: "Lowers high blood pressure. Prescription required."
  },
  {
    id: "isz-018",
    name: "Blood pressure monitor",
    strength: "Upper arm, digital",
    form: "device",
    category: "Chronic care",
    price: 48000,
    packSize: "1 monitor with cuff",
    stock: 7,
    prescription: false,
    description: "Automatic monitor so you can follow your blood pressure at home."
  },
  {
    id: "isz-019",
    name: "Vitamin C",
    strength: "1000 mg",
    form: "tablet",
    category: "Vitamins and supplements",
    price: 5500,
    packSize: "Pack of 30 tablets",
    stock: 52,
    prescription: false,
    description: "Daily supplement that supports the immune system."
  },
  {
    id: "isz-020",
    name: "Ferrous sulphate with folic acid",
    strength: "200 mg / 0.4 mg",
    form: "tablet",
    category: "Vitamins and supplements",
    price: 3200,
    packSize: "Pack of 30 tablets",
    stock: 48,
    prescription: false,
    description: "Iron supplement for anaemia and for women during pregnancy."
  },
  {
    id: "isz-021",
    name: "Infant paracetamol drops",
    strength: "100 mg / ml",
    form: "syrup",
    category: "Mother and baby",
    price: 3400,
    packSize: "Bottle of 15 ml",
    stock: 33,
    prescription: false,
    description: "Fever and pain relief for babies from three months, with a dosing syringe."
  },
  {
    id: "isz-022",
    name: "Zinc sulphate for children",
    strength: "20 mg",
    form: "tablet",
    category: "Mother and baby",
    price: 1500,
    packSize: "Pack of 10 dispersible tablets",
    stock: 64,
    prescription: false,
    description: "Given with rehydration salts to shorten diarrhoea in children."
  },
  {
    id: "isz-023",
    name: "Digital thermometer",
    strength: "10 second reading",
    form: "device",
    category: "First aid",
    price: 8500,
    packSize: "1 thermometer",
    stock: 22,
    prescription: false,
    description: "Measures temperature under the arm or in the mouth."
  },
  {
    id: "isz-024",
    name: "First aid box",
    strength: "Home and office",
    form: "device",
    category: "First aid",
    price: 22000,
    packSize: "1 box, 42 items",
    stock: 11,
    prescription: false,
    description: "Plasters, gauze, tape, scissors, gloves and antiseptic in one case."
  },
  {
    id: "isz-025",
    name: "Povidone iodine solution",
    strength: "10%",
    form: "solution",
    category: "First aid",
    price: 2600,
    packSize: "Bottle of 60 ml",
    stock: 41,
    prescription: false,
    description: "Antiseptic for cleaning cuts, burns and small wounds."
  },
  {
    id: "isz-026",
    name: "Surgical face masks",
    strength: "3 layers",
    form: "device",
    category: "Personal protection",
    price: 4000,
    packSize: "Box of 50 masks",
    stock: 58,
    prescription: false,
    description: "Disposable masks for clinics, offices and public transport."
  },
  {
    id: "isz-027",
    name: "Hand sanitiser",
    strength: "70% alcohol",
    form: "solution",
    category: "Personal protection",
    price: 3500,
    packSize: "Bottle of 500 ml",
    stock: 47,
    prescription: false,
    description: "Kills germs on hands when soap and water are not available."
  },
  {
    id: "isz-028",
    name: "Examination gloves",
    strength: "Latex free, medium",
    form: "device",
    category: "Personal protection",
    price: 12000,
    packSize: "Box of 100 gloves",
    stock: 15,
    prescription: false,
    description: "Single-use gloves for health workers and home care."
  }
];

export default products;
