// Shared mock data for the R&D Smart Hub
window.HUB_DATA = {
  user: { name: "Sarah Chen", initials: "SC", role: "Senior Flavorist" },

  stats: [
    { label: "RM Library", label_th: "คลังวัตถุดิบ", value: "1,847", delta: "+12 added", delta_th: "+12 รายการใหม่", trend: "up", icon: "flask", color: "teal" },
    { label: "Team Meetings", label_th: "การประชุมทีม", value: "12", delta: "this week", delta_th: "สัปดาห์นี้", trend: "neutral", icon: "calendar", color: "purple" }
  ],

  modules: [
    { id: "meetings", name: "Meeting Schedule", name_th: "ตารางการประชุม", desc: "Coordinate cross-functional meetings with smart scheduling", desc_th: "นัดประชุมข้ามทีมด้วยระบบจัดตารางอัจฉริยะ", icon: "calendar", color: "blue" },
    { id: "rm", name: "RM Database", name_th: "ฐานข้อมูลวัตถุดิบ", desc: "Browse 1,800+ raw materials with full taste & regulatory data", desc_th: "ค้นหาวัตถุดิบกว่า 1,800 รายการ พร้อมโปรไฟล์รสและข้อมูลกำกับ", icon: "flask", color: "teal" },
    { id: "guidelines", name: "Guideline Center", name_th: "ศูนย์รวมเอกสารแนวทาง", desc: "Product dev, assessment & sensory training docs", desc_th: "เอกสารพัฒนาผลิตภัณฑ์ การประเมิน และการฝึกทดสอบทางประสาทสัมผัส", icon: "book", color: "purple" },
    { id: "assistant", name: "AI Assistant", name_th: "ผู้ช่วย AI", desc: "Ask anything across all R&D documents & data", desc_th: "ถามได้ทุกเรื่องเกี่ยวกับเอกสารและข้อมูล R&D", icon: "sparkle", color: "indigo" },
    { id: "sensory", name: "Sensory Panel", name_th: "คณะทดสอบประสาทสัมผัส", desc: "Triangle test guideline + sensory training procedure", desc_th: "Triangle test และขั้นตอนการฝึกประสาทสัมผัส", icon: "tongue", color: "orange", target: "guidelines", search: "sensory" },
    { id: "shelflife", name: "Shelf Life Study", name_th: "การศึกษาอายุการเก็บ", desc: "Shelf life study form & full study guideline", desc_th: "ฟอร์มการศึกษาอายุการเก็บและแนวทางครบชุด", icon: "clock", color: "green", target: "guidelines", search: "shelf life" }
  ],

  rmUpdates: [
    { code: "RM-2418", name: "Bourbon Vanilla Extract — Madagascar", action: "Updated", by: "Marcus Webb", when: "2 hours ago", status: "approved" },
    { code: "RM-2419", name: "Smoked Cherrywood Aroma 4×", action: "Added", by: "Priya Shah", when: "5 hours ago", status: "pending" },
    { code: "RM-1827", name: "Citral 95% (Natural)", action: "Spec revised", by: "Lien Tran", when: "Yesterday", status: "approved" },
    { code: "RM-2401", name: "Yeast Extract — Savoury Base 12", action: "Allergen update", by: "Marcus Webb", when: "Yesterday", status: "review" },
    { code: "RM-2210", name: "Cocoa Distillate (Cacao Premium)", action: "Origin changed", by: "Daniel Okafor", when: "2 days ago", status: "approved" }
  ],

  meetings: [
    { time: "09:30", duration: "30 min", title: "Vanilla 24 — sensory review", who: "Marcus, Priya, Lien" },
    { time: "11:00", duration: "45 min", title: "Q3 Pipeline Sync", who: "Daniel + 6 others" },
    { time: "14:00", duration: "60 min", title: "Beverage Innovation — Concept Gate", who: "Marketing + R&D" },
    { time: "16:30", duration: "30 min", title: "Regulatory Review: EU Naturals", who: "Anna, Sarah" }
  ],

  popularQuestions: [
    { q: "What's the recommended dosage for Bourbon Vanilla in dairy applications?", q_th: "ปริมาณ Bourbon Vanilla ที่แนะนำสำหรับผลิตภัณฑ์นมคือเท่าไร?", count: 28 },
    { q: "Show me all gluten-free RMs added in the last 6 months", q_th: "แสดงวัตถุดิบไร้กลูเตนที่เพิ่มในช่วง 6 เดือนที่ผ่านมา", count: 21 },
    { q: "Summarize the new EU naturalness regulation changes", q_th: "สรุปการเปลี่ยนแปลงกฎหมาย EU เรื่องความเป็นธรรมชาติ", count: 17 },
    { q: "Which projects use Citral 95% as a key component?", q_th: "โครงการใดบ้างที่ใช้ Citral 95% เป็นส่วนประกอบหลัก?", count: 14 },
    { q: "Sensory panel results for Beverage Innovation Q2", q_th: "ผลทดสอบประสาทสัมผัส โครงการ Beverage Innovation ไตรมาส 2", count: 11 }
  ],

  // Data source meta — RM Database links to organization PLM
  dataSource: {
    name: "ACME Group · PLM Master Database",
    name_th: "ACME Group · ฐานข้อมูล PLM หลัก",
    file: "RM_BACKUP_20260522_0914.bak",
    syncedAt: "22 May 2026 · 09:14",
    syncedAt_th: "22 พ.ค. 2569 · 09:14 น.",
    plmBaseUrl: "https://plm.acme-flavors.internal/items/",
    records: 1847
  },

  people: [
    { id: "p1", name: "Marcus Webb", role: "Senior Flavor Chemist", color: "av-blue", initials: "MW", availability: "available" },
    { id: "p2", name: "Priya Shah", role: "Sensory Lead", color: "av-purple", initials: "PS", availability: "busy" },
    { id: "p3", name: "Lien Tran", role: "Application Scientist", color: "av-orange", initials: "LT", availability: "available" },
    { id: "p4", name: "Daniel Okafor", role: "Project Manager", color: "av-teal", initials: "DO", availability: "tentative" },
    { id: "p5", name: "Anna Lindqvist", role: "Regulatory Affairs", color: "av-green", initials: "AL", availability: "available" },
    { id: "p6", name: "Hiro Tanaka", role: "Innovation Lead", color: "av-red", initials: "HT", availability: "busy" },
    { id: "p7", name: "Yusuf Karim", role: "QA Specialist", color: "av-blue", initials: "YK", availability: "available" },
    { id: "p8", name: "Elena Rossi", role: "Marketing Liaison", color: "av-purple", initials: "ER", availability: "available" }
  ],

  rms: [
    { code: "RM-2418", name: "Bourbon Vanilla Extract — Madagascar", category: "Natural Extract", origin: "Madagascar", supplier: "Aust & Hachmann", status: "Approved", allergens: "None", regulatory: "EU Natural, ISO 9235", projects: 7, updated: "2026-05-20",
      group: "Flavor",
      productInUse: ["Premium Dairy Dessert", "Vanilla 24", "Bakery Reformulation Q3"],
      productInUse_th: ["ของหวานนมพรีเมียม", "Vanilla 24", "Bakery รอบไตรมาส 3"],
      fn: "Sweet-creamy top-note enhancer", fn_th: "เสริมท็อปโน้ตหวาน-ครีมมี่",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-2418_BourbonVanilla.xlsx", tiUpdated: "2026-05-19" },
    { code: "RM-2419", name: "Smoked Cherrywood Aroma 4×", category: "Smoke Aroma", origin: "Germany", supplier: "Frutarom", status: "Pending Review", allergens: "None", regulatory: "EU FCM Reg. 1334/2008", projects: 2, updated: "2026-05-19",
      group: "Flavor",
      productInUse: ["BBQ Sauce Premium", "Smoked Snack Line"],
      productInUse_th: ["ซอส BBQ พรีเมียม", "ขนมรมควัน"],
      fn: "Smoky character builder", fn_th: "สร้างคาแรกเตอร์รมควัน",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-2419_Cherrywood.xlsx", tiUpdated: "2026-05-16" },
    { code: "RM-1827", name: "Citral 95% (Natural)", category: "Natural Aroma Chemical", origin: "Brazil", supplier: "Citromax", status: "Approved", allergens: "Citral (skin sens.)", regulatory: "FEMA 2303, IFRA OK", projects: 12, updated: "2026-05-18",
      group: "Flavor",
      productInUse: ["Citrus Sparkling Line", "Vanilla 24", "Beverage Innovation"],
      productInUse_th: ["ไลน์ Citrus Sparkling", "Vanilla 24", "นวัตกรรมเครื่องดื่ม"],
      fn: "Top-note modifier (lemon-grass)", fn_th: "ปรับท็อปโน้ต (ตะไคร้-มะนาว)",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-1827_Citral.xlsx", tiUpdated: "2026-05-17" },
    { code: "RM-2401", name: "Yeast Extract — Savoury Base 12", category: "Process Flavor", origin: "Netherlands", supplier: "DSM", status: "Under Review", allergens: "Contains yeast", regulatory: "EU Reg. 2065/2003", projects: 5, updated: "2026-05-18",
      group: "Food Additive",
      productInUse: ["Savory Snack 7", "Soup Stock Mix"],
      productInUse_th: ["ขนมรสเค็ม 7", "ซุปสำเร็จรูป"],
      fn: "Umami booster", fn_th: "เพิ่มอูมามิ",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-2401_Yeast.xlsx", tiUpdated: "2026-05-15" },
    { code: "RM-2210", name: "Cocoa Distillate (Cacao Premium)", category: "Natural Extract", origin: "Ghana", supplier: "Barry Callebaut", status: "Approved", allergens: "None", regulatory: "EU Natural", projects: 9, updated: "2026-05-17",
      group: "Coffee",
      productInUse: ["Premium Dairy Dessert", "Chocolate Refresh"],
      productInUse_th: ["ของหวานนมพรีเมียม", "Chocolate Refresh"],
      fn: "Cocoa back-note carrier", fn_th: "ตัวพากลิ่นโกโก้พื้นหลัง",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-2210_Cocoa.xlsx", tiUpdated: "2026-05-14" },
    { code: "RM-1502", name: "Ethyl Maltol Crystal", category: "Aroma Chemical", origin: "China", supplier: "Anhui Jinhe", status: "Approved", allergens: "None", regulatory: "FEMA 3487", projects: 22, updated: "2026-05-14",
      group: "Sweet RM",
      productInUse: ["Confectionery line (22 products)"],
      productInUse_th: ["กลุ่มขนม (22 ผลิตภัณฑ์)"],
      fn: "Sweetness amplifier", fn_th: "เพิ่มความหวาน",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-1502_EthylMaltol.xlsx", tiUpdated: "2026-05-13" },
    { code: "RM-2350", name: "Cold-Pressed Lemon Oil — Sicily", category: "Essential Oil", origin: "Italy", supplier: "Capua 1880", status: "Approved", allergens: "Citral, Limonene", regulatory: "ISO 855, IFRA", projects: 14, updated: "2026-05-12",
      group: "Flavor",
      productInUse: ["Citrus Sparkling Line", "Premium Beverage", "Lemon Yogurt"],
      productInUse_th: ["ไลน์ Citrus Sparkling", "เครื่องดื่มพรีเมียม", "โยเกิร์ตเลมอน"],
      fn: "Top-note (fresh lemon)", fn_th: "ท็อปโน้ต (เลมอนสด)",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-2350_LemonOil.xlsx", tiUpdated: "2026-05-10" },
    { code: "RM-2199", name: "Strawberry WONF 8× (Natural)", category: "Natural Flavor", origin: "USA", supplier: "Sensient", status: "Approved", allergens: "None", regulatory: "FEMA, EU Natural", projects: 6, updated: "2026-05-10",
      group: "Flavor",
      productInUse: ["Yogurt Strawberry", "Berry Snack"],
      productInUse_th: ["โยเกิร์ตสตรอเบอร์รี่", "ขนมรสเบอร์รี่"],
      fn: "Fruity middle-note", fn_th: "มิดเดิลโน้ตผลไม้",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-2199_Strawberry.xlsx", tiUpdated: "2026-05-08" },
    { code: "RM-2380", name: "Maillard Beef Flavor Base", category: "Process Flavor", origin: "Switzerland", supplier: "Givaudan", status: "Restricted", allergens: "Soy, Wheat", regulatory: "EU Reg. 2065/2003", projects: 3, updated: "2026-05-08",
      group: "Flavor",
      productInUse: ["Savory Stock", "Beef Snack"],
      productInUse_th: ["น้ำสต๊อกรสเค็ม", "ขนมรสเนื้อ"],
      fn: "Roasted / meaty character", fn_th: "คาแรกเตอร์ย่าง / เนื้อ",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-2380_Beef.xlsx", tiUpdated: "2026-05-06" },
    { code: "RM-2102", name: "Linalool Natural (Ho Wood)", category: "Natural Aroma Chemical", origin: "China", supplier: "Ventos", status: "Approved", allergens: "Linalool", regulatory: "IFRA OK", projects: 18, updated: "2026-05-05",
      group: "Others",
      productInUse: ["Fragrance Line", "Lavender Beverage"],
      productInUse_th: ["ไลน์น้ำหอม", "เครื่องดื่มลาเวนเดอร์"],
      fn: "Floral middle-note", fn_th: "มิดเดิลโน้ตดอกไม้",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-2102_Linalool.xlsx", tiUpdated: "2026-05-03" },

    // Coffee ─────────────────────────────────────
    { code: "RM-3101", name: "Coffee Aroma Concentrate 10×", category: "Natural Extract", origin: "Brazil", supplier: "Comaxa", status: "Approved", allergens: "None", regulatory: "EU Natural, FEMA", projects: 11, updated: "2026-05-16",
      group: "Coffee",
      productInUse: ["Coffee Ice Cream", "Cold Brew Concentrate", "Mocha Beverage"],
      productInUse_th: ["ไอศกรีมกาแฟ", "Cold Brew เข้มข้น", "เครื่องดื่มมอคค่า"],
      fn: "Roasted coffee top-note", fn_th: "ท็อปโน้ตกาแฟคั่ว",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-3101_CoffeeAroma.xlsx", tiUpdated: "2026-05-14" },
    { code: "RM-3102", name: "Arabica Coffee Distillate — Colombia", category: "Natural Distillate", origin: "Colombia", supplier: "Café Royal", status: "Approved", allergens: "None", regulatory: "EU Natural", projects: 8, updated: "2026-05-13",
      group: "Coffee",
      productInUse: ["RTD Coffee Premium", "Coffee Liqueur Base"],
      productInUse_th: ["กาแฟพร้อมดื่มพรีเมียม", "ฐานเหล้ากาแฟ"],
      fn: "Full-body coffee character", fn_th: "คาแรกเตอร์กาแฟเต็มตัว",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-3102_Arabica.xlsx", tiUpdated: "2026-05-11" },

    // Creamer ────────────────────────────────────
    { code: "RM-2702", name: "Non-Dairy Creamer Base 35", category: "Creamer Base", origin: "Malaysia", supplier: "Mewah Group", status: "Approved", allergens: "Milk (trace)", regulatory: "Halal, Kosher", projects: 9, updated: "2026-05-15",
      group: "Creamer",
      productInUse: ["3-in-1 Coffee Mix", "RTD Coffee Latte", "Hot Chocolate Mix"],
      productInUse_th: ["กาแฟ 3 in 1", "RTD Coffee Latte", "ผงโกโก้ร้อน"],
      fn: "Whitening + creamy mouthfeel", fn_th: "ทำให้ขาว + รู้สึกครีมมี่",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-2702_Creamer.xlsx", tiUpdated: "2026-05-12" },
    { code: "RM-2703", name: "Whitening Powder Premium 42", category: "Creamer Base", origin: "Thailand", supplier: "Mitr Phol", status: "Approved", allergens: "None", regulatory: "Halal", projects: 6, updated: "2026-05-09",
      group: "Creamer",
      productInUse: ["Premium 3-in-1 Coffee", "Iced Coffee Mix"],
      productInUse_th: ["กาแฟ 3 in 1 พรีเมียม", "ผงกาแฟเย็น"],
      fn: "High-whitening creamer", fn_th: "ครีมเทียมขาวสูง",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-2703_Whitening.xlsx", tiUpdated: "2026-05-07" },

    // Sweet RM ───────────────────────────────────
    { code: "RM-1604", name: "Sucralose 99%", category: "High-Intensity Sweetener", origin: "USA", supplier: "Tate & Lyle", status: "Approved", allergens: "None", regulatory: "FDA, JECFA, EU E955", projects: 17, updated: "2026-05-11",
      group: "Sweet RM",
      productInUse: ["Sugar-Free Beverage", "Low-Cal Yogurt", "Diet Confectionery"],
      productInUse_th: ["เครื่องดื่มไร้น้ำตาล", "โยเกิร์ตแคลต่ำ", "ขนมไดเอท"],
      fn: "Sugar replacement (600× sweetness)", fn_th: "ทดแทนน้ำตาล (หวาน 600 เท่า)",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-1604_Sucralose.xlsx", tiUpdated: "2026-05-09" },
    { code: "RM-1605", name: "Stevia RebA 95%", category: "High-Intensity Sweetener", origin: "China", supplier: "PureCircle", status: "Approved", allergens: "None", regulatory: "FDA GRAS, EU E960", projects: 13, updated: "2026-05-06",
      group: "Sweet RM",
      productInUse: ["Diet Beverage Line", "Natural Sugar-Reduced Yogurt"],
      productInUse_th: ["เครื่องดื่มไดเอท", "โยเกิร์ตน้ำตาลลด"],
      fn: "Natural sweetener (250× sweetness)", fn_th: "สารให้ความหวานธรรมชาติ (หวาน 250 เท่า)",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-1605_Stevia.xlsx", tiUpdated: "2026-05-04" },

    // Food Additive ─────────────────────────────
    { code: "RM-1801", name: "Citric Acid Anhydrous (Food Grade)", category: "Acidulant", origin: "China", supplier: "Weifang Ensign", status: "Approved", allergens: "None", regulatory: "EU E330, FDA GRAS", projects: 31, updated: "2026-05-15",
      group: "Food Additive",
      productInUse: ["All beverages", "Confectionery", "Sauce line"],
      productInUse_th: ["เครื่องดื่มทุกประเภท", "ขนม", "ไลน์ซอส"],
      fn: "pH adjustment / tartness", fn_th: "ปรับ pH / ความเปรี้ยว",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-1801_CitricAcid.xlsx", tiUpdated: "2026-05-14" },
    { code: "RM-1802", name: "Potassium Sorbate", category: "Preservative", origin: "China", supplier: "Wanglong Tech", status: "Approved", allergens: "None", regulatory: "EU E202, FDA GRAS", projects: 14, updated: "2026-05-10",
      group: "Food Additive",
      productInUse: ["Sauces", "Beverages (PET)", "Bakery fillings"],
      productInUse_th: ["ซอส", "เครื่องดื่ม PET", "ไส้เบเกอรี่"],
      fn: "Preservative (mold/yeast inhibition)", fn_th: "สารกันเสีย (กันเชื้อรา/ยีสต์)",
      tiGraph: "https://acme.sharepoint.com/sites/RD/TI/TI_RM-1802_Sorbate.xlsx", tiUpdated: "2026-05-08" }
  ],

  rmDetail: {
    "RM-2418": {
      tasteProfile: [
        { name: "Sweet", value: 78 },
        { name: "Creamy", value: 65 },
        { name: "Woody", value: 42 },
        { name: "Floral", value: 35 },
        { name: "Smoky", value: 18 },
        { name: "Spicy", value: 12 }
      ],
      relatedProjects: [
        { name: "Premium Dairy Dessert Line", code: "PRJ-2024-118", stage: "Pilot", color: "av-blue" },
        { name: "Vanilla 24 Master Brief", code: "PRJ-2025-041", stage: "Concept", color: "av-purple" },
        { name: "Bakery Reformulation Q3", code: "PRJ-2024-099", stage: "Launch", color: "av-green" }
      ],
      notes: "Vintage 2024 harvest. Excellent vanillin content (2.1%) and balanced rum-like notes. Recommended dosage 0.05–0.15% in dairy applications. Heat stable up to 90°C for 20 min. Pairs particularly well with brown sugar and cocoa derivatives. Approved supplier confirmed for 2026 supply contract — minimum 2× shipments per quarter."
    }
  },

  guidelines: {
    productDev: [
      { id: "g1", title: "New Product Development Stage-Gate Process", desc: "End-to-end framework for moving concepts from ideation to commercial launch.", type: "pdf", tags: ["Process", "Mandatory"], owner: "Daniel Okafor", updated: "2 weeks ago", url: "https://acme.sharepoint.com/sites/RD/Guidelines/NPD_StageGate_2026.pdf" },
      { id: "g2", title: "Flavor Brief Template — 2026 Edition", desc: "Standard template capturing target profile, application, dosage, and constraints.", type: "docx", tags: ["Template"], owner: "Marcus Webb", updated: "1 month ago", url: "https://acme.sharepoint.com/sites/RD/Templates/FlavorBrief_2026.docx" },
      { id: "g3", title: "Cost-in-Use Calculator", desc: "Spreadsheet model for estimating compound cost per kg of finished application.", type: "xlsx", tags: ["Tool"], owner: "Elena Rossi", updated: "3 days ago", url: "https://acme.sharepoint.com/sites/RD/Tools/CostInUse.xlsx" },
      { id: "g4", title: "Encapsulation Technology Overview", desc: "Comparison of spray-drying, coacervation, and liposomal carriers.", type: "pdf", tags: ["Reference"], owner: "Hiro Tanaka", updated: "1 week ago", url: "https://acme.sharepoint.com/sites/RD/Library/Encapsulation.pdf" }
    ],
    assessment: [
      { id: "g5", title: "Regulatory Compliance Checklist — EU", desc: "Per-RM checklist for EU 1334/2008, allergens, and naturalness claims.", type: "pdf", tags: ["Compliance", "EU"], owner: "Anna Lindqvist", updated: "5 days ago", url: "https://acme.sharepoint.com/sites/Regulatory/Checklists/EU_Compliance.pdf" },
      { id: "g6", title: "Allergen Risk Assessment Form", desc: "Standardized form for declaring cross-contamination risks.", type: "docx", tags: ["Form", "Mandatory"], owner: "Yusuf Karim", updated: "2 weeks ago", url: "https://acme.sharepoint.com/sites/QA/Forms/Allergen_Risk.docx" },
      { id: "g7", title: "Shelf Life Study Protocol", desc: "Accelerated and ambient stability testing methods with sampling plan.", type: "pdf", tags: ["Protocol", "Shelf Life"], owner: "Lien Tran", updated: "1 month ago", url: "https://acme.sharepoint.com/sites/QA/Protocols/ShelfLife.pdf" },
      { id: "g7b", title: "Shelf Life Study Form 2026", desc: "Fillable XLSX form for recording batch data, storage conditions, sampling intervals, and pass/fail criteria.", type: "xlsx", tags: ["Form", "Shelf Life", "Mandatory"], owner: "Lien Tran", updated: "1 week ago", url: "https://acme.sharepoint.com/sites/QA/Forms/ShelfLife_Form_2026.xlsx" },
      { id: "g7c", title: "Shelf Life Study Guideline — Full Manual", desc: "Comprehensive guideline covering test design, controls, environmental conditions, microbiological criteria, and reporting.", type: "pdf", tags: ["Reference", "Shelf Life"], owner: "Lien Tran", updated: "2 weeks ago", url: "https://acme.sharepoint.com/sites/QA/Library/ShelfLife_Guideline.pdf" },
      { id: "g8", title: "Sustainability Scorecard 2026", desc: "Internal scoring methodology for environmental impact of new RMs.", type: "xlsx", tags: ["ESG", "Scoring"], owner: "Anna Lindqvist", updated: "3 weeks ago", url: "https://acme.sharepoint.com/sites/Sustain/Scorecard_2026.xlsx" }
    ],
    sensory: [
      { id: "g9", title: "Sensory Training Procedure — SOP 04", desc: "Standard operating procedure for onboarding & calibrating new descriptive sensory panelists.", type: "pdf", tags: ["Training", "Mandatory", "SOP"], owner: "Priya Shah", updated: "1 week ago", url: "https://acme.sharepoint.com/sites/Sensory/SOP/SOP04_SensoryTraining.pdf" },
      { id: "g9b", title: "Triangle Test Guideline", desc: "Methodology, sample preparation, statistical interpretation, and result template for triangle discrimination tests.", type: "pdf", tags: ["Method", "Sensory", "Mandatory"], owner: "Priya Shah", updated: "3 days ago", url: "https://acme.sharepoint.com/sites/Sensory/Methods/TriangleTest.pdf" },
      { id: "g9c", title: "Triangle Test Result Form", desc: "Excel template for entering panelist responses and auto-calculating significance.", type: "xlsx", tags: ["Form", "Sensory"], owner: "Priya Shah", updated: "3 days ago", url: "https://acme.sharepoint.com/sites/Sensory/Forms/TriangleTest_Form.xlsx" },
      { id: "g10", title: "Descriptive Panel Onboarding", desc: "Slide deck used in initial training program for new descriptive sensory panelists.", type: "pptx", tags: ["Training"], owner: "Priya Shah", updated: "1 week ago", url: "https://acme.sharepoint.com/sites/Sensory/Training/Onboarding.pptx" },
      { id: "g11", title: "Basic Tastes Calibration Module", desc: "Video module covering sweet/sour/salty/bitter/umami calibration.", type: "video", tags: ["Training", "Video"], owner: "Priya Shah", updated: "2 months ago", url: "https://stream.acme.com/sensory/basictastes" },
      { id: "g12", title: "Off-Note Identification Workbook", desc: "Workbook with 40+ off-note references and recognition exercises.", type: "pdf", tags: ["Workbook"], owner: "Priya Shah", updated: "6 weeks ago", url: "https://acme.sharepoint.com/sites/Sensory/Library/OffNotes.pdf" },
      { id: "g13", title: "Sensory Lexicon — Dairy & Confectionery", desc: "Reference vocabulary for descriptive panels in dairy/confectionery.", type: "docx", tags: ["Reference"], owner: "Priya Shah", updated: "1 month ago", url: "https://acme.sharepoint.com/sites/Sensory/Lexicons/Dairy_Confec.docx" }
    ]
  },

  aiSuggested: [
    { q: "What's the recommended dosage for Bourbon Vanilla in dairy?", q_th: "ปริมาณ Bourbon Vanilla ที่แนะนำในผลิตภัณฑ์นม", icon: "flask" },
    { q: "Find all gluten-free RMs added since January", q_th: "หา RM ไร้กลูเตนที่เพิ่มตั้งแต่มกราคม", icon: "filter" },
    { q: "Summarize EU naturalness regulation updates", q_th: "สรุปการอัปเดตข้อกำหนด EU เรื่องความเป็นธรรมชาติ", icon: "doc" },
    { q: "Show projects using Citral 95%", q_th: "แสดงโครงการที่ใช้ Citral 95%", icon: "link" }
  ],

  aiInitialMessages: [
    { role: "ai", content: "Hi Sarah — I can answer questions across raw materials, project notes, regulatory documents, and sensory data. What would you like to look up today?", content_th: "สวัสดีคุณซาร่าห์ — ฉันตอบคำถามได้จากข้อมูลวัตถุดิบ บันทึกโครงการ เอกสารกำกับ และข้อมูลประสาทสัมผัส วันนี้อยากค้นหาเรื่องอะไรคะ?" }
  ],

  aiResponses: {
    "What's the recommended dosage for Bourbon Vanilla in dairy?":
      "For **Bourbon Vanilla Extract — Madagascar (RM-2418)** in dairy applications, the recommended dosage is **0.05–0.15%** by weight of the finished product. Key notes:\n\n• Yogurt & cultured products: 0.08–0.12%\n• Ice cream (premium): 0.10–0.15%\n• Custards & puddings: 0.05–0.08%\n\nThe extract is heat-stable up to 90°C for 20 minutes. For ice cream where freezing slightly mutes top-notes, use the upper end of the range. Pairs well with brown-sugar or cocoa-derived bases.",
    "Find all gluten-free RMs added since January":
      "I found **47 gluten-free raw materials** added since January 2026. Top 5 most-used in projects:\n\n1. **RM-2418** Bourbon Vanilla Extract — Madagascar (7 projects)\n2. **RM-2419** Smoked Cherrywood Aroma 4× (2 projects)\n3. **RM-2210** Cocoa Distillate — Ghana (9 projects)\n4. **RM-1827** Citral 95% Natural (12 projects)\n5. **RM-2350** Cold-Pressed Lemon Oil — Sicily (14 projects)\n\nA full filtered view is available in the RM Database — would you like me to open it?",
    "Summarize EU naturalness regulation updates":
      "**EU Reg. 1334/2008 — 2026 update summary:**\n\n• **Article 16 'Natural' definition** — tightened: source material must be ≥95% from the named ingredient (was 90%).\n• **Carrier solvents** — propylene glycol now requires explicit declaration even when below 0.1%.\n• **Smoke flavorings** — new positive list effective Q3 2026; 11 substances no longer authorised.\n• **'WONF' (With Other Natural Flavors)** — clearer labelling rules required on consumer packaging.\n\nAction items: review RM-2380 (Maillard Beef Flavor Base) which lists wheat carriers, and confirm all smoke aroma RMs are on the new positive list.",
    "Show projects using Citral 95%":
      "**RM-1827 Citral 95% (Natural)** is currently used in **12 active projects**. Top usage:\n\n• **PRJ-2025-018** Beverage Innovation — Lemon-Ginger (Concept)\n• **PRJ-2025-041** Vanilla 24 Master Brief (Concept) — top-note modifier\n• **PRJ-2024-118** Premium Dairy Dessert Line (Pilot)\n• **PRJ-2024-076** Confectionery Refresh Q2 (Launch)\n• **PRJ-2025-002** Citrus Sparkling Line (Launch)\n\nNote: 6 of these 12 projects are close to maximum IFRA category 4 limits. I recommend a regulatory cross-check before any reformulation."
  },

  aiResponses_th: {
    "What's the recommended dosage for Bourbon Vanilla in dairy?":
      "สำหรับ **Bourbon Vanilla Extract — Madagascar (RM-2418)** ในผลิตภัณฑ์นม ปริมาณที่แนะนำคือ **0.05–0.15%** โดยน้ำหนักของผลิตภัณฑ์สำเร็จ:\n\n• โยเกิร์ตและผลิตภัณฑ์เพาะเชื้อ: 0.08–0.12%\n• ไอศกรีม (พรีเมียม): 0.10–0.15%\n• คัสตาร์ดและพุดดิ้ง: 0.05–0.08%\n\nสารสกัดทนความร้อนได้ถึง 90°C เป็นเวลา 20 นาที สำหรับไอศกรีมที่การแช่แข็งลดท็อปโน้ตเล็กน้อย ให้ใช้ช่วงสูง เข้ากันดีกับน้ำตาลทรายแดงและฐานโกโก้",
    "Find all gluten-free RMs added since January":
      "พบ **วัตถุดิบไร้กลูเตน 47 รายการ** ที่เพิ่มตั้งแต่ม.ค. 2569 5 อันดับที่ใช้บ่อยที่สุด:\n\n1. **RM-2418** Bourbon Vanilla Extract — Madagascar (7 โครงการ)\n2. **RM-2419** Smoked Cherrywood Aroma 4× (2 โครงการ)\n3. **RM-2210** Cocoa Distillate — Ghana (9 โครงการ)\n4. **RM-1827** Citral 95% Natural (12 โครงการ)\n5. **RM-2350** Cold-Pressed Lemon Oil — Sicily (14 โครงการ)\n\nเปิดในฐานข้อมูล RM ที่กรองแล้วได้ — ต้องการให้เปิดให้ไหมคะ?",
    "Summarize EU naturalness regulation updates":
      "**สรุปการอัปเดต EU Reg. 1334/2008 — ปี 2569:**\n\n• **นิยาม 'Natural' มาตรา 16** — เข้มขึ้น: วัตถุดิบต้องมาจากแหล่งที่ระบุ ≥95% (เดิม 90%)\n• **ตัวทำละลายตัวพา** — propylene glycol ต้องประกาศชัดเจน แม้น้อยกว่า 0.1%\n• **กลิ่นรมควัน** — Positive list ใหม่มีผลไตรมาส 3/2569; 11 สารถูกถอน\n• **'WONF'** — กฎการติดฉลากชัดเจนขึ้นบนบรรจุภัณฑ์ผู้บริโภค\n\nต้องทำ: ตรวจสอบ RM-2380 ที่ใช้ตัวพาจากข้าวสาลี และยืนยันว่ากลิ่นรมควันทั้งหมดอยู่ใน positive list ใหม่",
    "Show projects using Citral 95%":
      "**RM-1827 Citral 95% (Natural)** ใช้อยู่ใน **12 โครงการที่กำลังดำเนินการ** อันดับต้น:\n\n• **PRJ-2025-018** Beverage Innovation — Lemon-Ginger (Concept)\n• **PRJ-2025-041** Vanilla 24 Master Brief (Concept) — ปรับท็อปโน้ต\n• **PRJ-2024-118** Premium Dairy Dessert Line (Pilot)\n• **PRJ-2024-076** Confectionery Refresh Q2 (Launch)\n• **PRJ-2025-002** Citrus Sparkling Line (Launch)\n\nหมายเหตุ: 6 ใน 12 โครงการใกล้ขีด IFRA category 4 แนะนำให้ตรวจสอบกำกับก่อนปรับสูตรใด ๆ"
  }
};
