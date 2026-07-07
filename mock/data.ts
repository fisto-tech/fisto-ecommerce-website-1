import { Product, Category, Brand, Review } from "../types";

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Audio & Sound",
    slug: "audio-sound",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
    description: "Premium headphones, earbuds, and home audio systems.",
    productsCount: 18,
  },
  {
    id: "cat-2",
    name: "Wearables",
    slug: "wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
    description: "Smartwatches, fitness bands, and tracking devices.",
    productsCount: 12,
  },
  {
    id: "cat-3",
    name: "Computer Gear",
    slug: "computer-gear",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop",
    description: "Ergonomic keyboards, precision mice, and desktop stands.",
    productsCount: 24,
  },
  {
    id: "cat-4",
    name: "Desk Accessories",
    slug: "desk-accessories",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop",
    description: "Wireless chargers, leather desk pads, and cable organizers.",
    productsCount: 15,
  },
  {
    id: "cat-5",
    name: "Lifestyle Apparel",
    slug: "lifestyle-apparel",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop",
    description: "Eco-friendly tote bags, caps, and minimal jackets.",
    productsCount: 9,
  },
  {
    id: "cat-6",
    name: "Smart Home",
    slug: "smart-home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
    description: "Smart speakers, connected lighting, and home automation devices.",
    productsCount: 0,
  },
];

export const mockBrands: Brand[] = [
  { id: "brand-1", name: "Aura", slug: "aura", logo: "AURA", description: "Acoustic precision and ergonomic audio accessories." },
  { id: "brand-2", name: "Velo", slug: "velo", logo: "VELO", description: "Design-forward wearables built for peak performance." },
  { id: "brand-3", name: "Kore", slug: "kore", logo: "KORE", description: "Minimalist desktop peripherals and hardware accessories." },
  { id: "brand-4", name: "Nox", slug: "nox", logo: "NOX", description: "Protective cases and travel organizers with clean aesthetics." },
  { id: "brand-5", name: "Sol", slug: "sol", logo: "SOL", description: "Sustainable lifestyle accessories and organic apparel." },
];

export const mockProducts: Product[] = [
  // ─── cat-1: Audio & Sound (3 products) ───────────────────────────────────────
  {
    id: "prod-1",
    name: "Aura Studio Pro ANC Headphones",
    slug: "aura-studio-pro-anc-headphones",
    description: "Premium wireless noise-canceling headphones with spatial audio and a 40-hour battery life.",
    longDescription: "Engage in complete sensory isolation with the Aura Studio Pro. Engineered with custom-built 40mm dynamic drivers and hybrid active noise cancellation, these headphones filter out external clutter while delivering ultra-crisp highs and resonant bass. Crafted with memory-foam ear cushions and reinforced aluminum sliders, the design guarantees all-day wearability. Complete with USB-C rapid charging, spatial audio tracking, and multi-device Bluetooth pairing.",
    price: 24999,
    discountPrice: 20799,
    rating: 4.8,
    reviewsCount: 142,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-1",
    categorySlug: "audio-sound",
    brandId: "brand-1",
    brandName: "Aura",
    stock: 25,
    specifications: [
      { name: "Driver Size", value: "40mm Dynamic" },
      { name: "ANC", value: "Hybrid ANC (up to 42dB)" },
      { name: "Battery Life", value: "40 hours (ANC on), 50 hours (ANC off)" },
      { name: "Connectivity", value: "Bluetooth 5.3 & 3.5mm Aux" },
      { name: "Charging", value: "USB-C Quick Charge" },
      { name: "Weight", value: "260g" }
    ],
    variants: [
      { type: "color", value: "Slate Black", sku: "AU-HP-PRO-BLK" },
      { type: "color", value: "Sandstone White", sku: "AU-HP-PRO-WHT" },
      { type: "color", value: "Sage Green", sku: "AU-HP-PRO-GRN" }
    ],
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "prod-5",
    name: "Aura Pods Comfort Noise Earbuds",
    slug: "aura-pods-comfort-noise-earbuds",
    description: "Ultra-lightweight true wireless earbuds with deep noise isolation and crystal-clear voice clarity.",
    longDescription: "The Aura Pods Comfort deliver massive audio output in an incredibly tiny footprint. At just 4.2g per earbud, you will barely feel them. Yet, they pack custom 11mm graphene drivers for robust acoustics and adaptive active noise cancellation that continuously analyzes surrounding sound levels to optimize performance.",
    price: 13249,
    discountPrice: 9949,
    rating: 4.7,
    reviewsCount: 215,
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-1",
    categorySlug: "audio-sound",
    brandId: "brand-1",
    brandName: "Aura",
    stock: 6,
    specifications: [
      { name: "Weight", value: "4.2g per earbud" },
      { name: "Driver Type", value: "11mm Graphene Driver" },
      { name: "Battery Life", value: "7 hours (28 total with case)" },
      { name: "Waterproof", value: "IPX5" }
    ],
    variants: [
      { type: "color", value: "Sandstone White", sku: "AU-EP-POD-WHT" },
      { type: "color", value: "Slate Black", sku: "AU-EP-POD-BLK" }
    ],
    isBestSeller: true,
  },
  {
    id: "prod-9",
    name: "Aura Bass Boom Over-Ear Headphones",
    slug: "aura-bass-boom-over-ear-headphones",
    description: "Open-back studio headphones delivering an immersive soundstage for audiophiles and music producers.",
    longDescription: "Built for listeners who refuse to compromise, the Aura Bass Boom offers precision-tuned 50mm drivers with an open-back acoustic design that produces a wide, natural soundstage. Padded with genuine leather and angled ear pads that reduce listening fatigue across long sessions. The detachable 3-meter cable comes in both 3.5mm and 6.35mm adapter formats.",
    price: 18499,
    rating: 4.6,
    reviewsCount: 78,
    images: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-1",
    categorySlug: "audio-sound",
    brandId: "brand-1",
    brandName: "Aura",
    stock: 10,
    specifications: [
      { name: "Driver Size", value: "50mm Open-back" },
      { name: "Frequency Response", value: "10Hz - 40kHz" },
      { name: "Impedance", value: "250 Ohm" },
      { name: "Cable", value: "Detachable 3m (3.5mm + 6.35mm adapter)" },
      { name: "Weight", value: "320g" }
    ],
    variants: [
      { type: "color", value: "Matte Black", sku: "AU-HP-BB-BLK" },
      { type: "color", value: "Brushed Silver", sku: "AU-HP-BB-SLV" }
    ],
    isFeatured: true,
    isLatest: true,
  },

  // ─── cat-2: Wearables (3 products) ────────────────────────────────────────────
  {
    id: "prod-2",
    name: "Velo Fit Chronos Smartwatch",
    slug: "velo-fit-chronos-smartwatch",
    description: "An elegant smartwatch featuring comprehensive health tracking, customizable watch faces, and water resistance.",
    longDescription: "The Velo Fit Chronos blends time-honored circular watch aesthetics with cutting-edge biosensors. Keep track of sleep quality, heart rate, blood oxygen levels, and over 80 specific workouts. Encased in a surgical-grade stainless steel frame with an optimized AMOLED always-on display.",
    price: 16599,
    rating: 4.6,
    reviewsCount: 89,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-2",
    categorySlug: "wearables",
    brandId: "brand-2",
    brandName: "Velo",
    stock: 45,
    specifications: [
      { name: "Display", value: "1.43\" AMOLED (466x466 px)" },
      { name: "Materials", value: "Stainless Steel, Fluororubber Strap" },
      { name: "Battery Life", value: "Up to 9 days" },
      { name: "Sensors", value: "Optical HR, SpO2, Accelerometer, Gyroscope" },
      { name: "Water Resistance", value: "5 ATM (up to 50m)" }
    ],
    variants: [
      { type: "color", value: "Stellar Gray", sku: "VE-SW-CHR-GRY" },
      { type: "color", value: "Silver Oak", sku: "VE-SW-CHR-SLV" }
    ],
    isBestSeller: true,
  },
  {
    id: "prod-10",
    name: "Velo Pulse Smart Fitness Band",
    slug: "velo-pulse-smart-fitness-band",
    description: "Slim and lightweight activity tracker with continuous heart rate monitoring, sleep tracking, and 14-day battery.",
    longDescription: "Track every facet of your health with the Velo Pulse. The ultra-thin silicone band houses precision optical sensors for continuous 24/7 heart rate and SpO2 monitoring. The companion app provides weekly health insights, personalized workout recommendations, and sleep stage analysis. Syncs seamlessly with iOS and Android via Bluetooth 5.2.",
    price: 5499,
    discountPrice: 4299,
    rating: 4.3,
    reviewsCount: 56,
    images: [
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575311373937-040b8058bad0?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-2",
    categorySlug: "wearables",
    brandId: "brand-2",
    brandName: "Velo",
    stock: 30,
    specifications: [
      { name: "Display", value: "0.96\" OLED" },
      { name: "Battery Life", value: "Up to 14 days" },
      { name: "Sensors", value: "Optical HR, SpO2, Pedometer" },
      { name: "Water Resistance", value: "IP68 (50m)" },
      { name: "Connectivity", value: "Bluetooth 5.2" }
    ],
    variants: [
      { type: "color", value: "Midnight Black", sku: "VE-FB-PLS-BLK" },
      { type: "color", value: "Blush Pink", sku: "VE-FB-PLS-PNK" },
      { type: "color", value: "Ocean Teal", sku: "VE-FB-PLS-TEL" }
    ],
    isLatest: true,
    isBestSeller: true,
  },
  {
    id: "prod-11",
    name: "Velo Horizon GPS Running Watch",
    slug: "velo-horizon-gps-running-watch",
    description: "Precision GPS sports watch with turn-by-turn navigation, multi-sport tracking, and 18-day battery life.",
    longDescription: "Designed for triathletes and endurance runners, the Velo Horizon GPS packs dual-frequency GPS for pinpoint accuracy on any terrain. Dynamic performance metrics including VO2 Max, lactate threshold, and running dynamics empower you to train smarter. The robust Corning Gorilla Glass display withstands extreme outdoor conditions while maintaining vivid visibility under direct sunlight.",
    price: 28999,
    discountPrice: 24999,
    rating: 4.8,
    reviewsCount: 44,
    images: [
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-2",
    categorySlug: "wearables",
    brandId: "brand-2",
    brandName: "Velo",
    stock: 15,
    specifications: [
      { name: "Display", value: "1.3\" MIP (260x260 px)" },
      { name: "GPS", value: "Dual-Frequency GPS/GLONASS/Galileo" },
      { name: "Battery Life", value: "18 days (smartwatch mode)" },
      { name: "Water Resistance", value: "10 ATM (100m)" },
      { name: "Sports Modes", value: "120+ activities" }
    ],
    variants: [
      { type: "color", value: "Carbon Black", sku: "VE-SW-GPS-BLK" },
      { type: "color", value: "Alpine Orange", sku: "VE-SW-GPS-ORG" }
    ],
    isFeatured: true,
  },

  // ─── cat-3: Computer Gear (4 products) ────────────────────────────────────────
  {
    id: "prod-4",
    name: "Kore Mechanical-K8 Core Keyboard",
    slug: "kore-mechanical-k8-core-keyboard",
    description: "Compact 75% mechanical keyboard with hot-swappable tactile switches and dynamic white backlighting.",
    longDescription: "Designed for developers and minimalist workspaces, the Kore K8 mechanical keyboard features a space-saving 75% form factor. Pre-installed with custom-tuned pre-lubed silent brown tactile switches, it offers a deeply satisfying writing experience without disturbing others.",
    price: 12449,
    discountPrice: 10799,
    rating: 4.9,
    reviewsCount: 112,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-3",
    categorySlug: "computer-gear",
    brandId: "brand-3",
    brandName: "Kore",
    stock: 18,
    specifications: [
      { name: "Form Factor", value: "75% ANSI layout" },
      { name: "Switches", value: "Pre-lubed Tactile Brown (Hot-swappable)" },
      { name: "Keycaps", value: "Double-shot PBT Cherry profile" },
      { name: "Battery", value: "4000mAh (200 hours backlight off)" },
      { name: "Connection", value: "2.4Ghz / Bluetooth 5.1 / USB-C" }
    ],
    variants: [
      { type: "color", value: "Charcoal Slate", sku: "KO-KB-K8-CHR" },
      { type: "color", value: "Frost Ash", sku: "KO-KB-K8-FRS" }
    ],
    isLatest: true,
    isFeatured: true,
  },
  {
    id: "prod-12",
    name: "Kore Precision Pro Ergonomic Mouse",
    slug: "kore-precision-pro-ergonomic-mouse",
    description: "High-precision wireless ergonomic mouse with adjustable DPI, silent clicks, and 70-day battery life.",
    longDescription: "Eliminate wrist strain with the Kore Precision Pro. Sculpted with a right-handed ergonomic contour and soft-touch side grips, this mouse fits naturally in the palm for fatigue-free all-day use. The Pixart 3395 optical sensor tracks accurately on any surface with precision up to 26,000 DPI. Silent electromagnetic click switches eliminate noise without sacrificing tactile feedback.",
    price: 7999,
    discountPrice: 6499,
    rating: 4.7,
    reviewsCount: 93,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-3",
    categorySlug: "computer-gear",
    brandId: "brand-3",
    brandName: "Kore",
    stock: 35,
    specifications: [
      { name: "Sensor", value: "Pixart 3395 (up to 26,000 DPI)" },
      { name: "Connection", value: "2.4GHz Wireless + Bluetooth + USB-C" },
      { name: "Battery Life", value: "Up to 70 days (2.4GHz mode)" },
      { name: "Buttons", value: "7 programmable silent buttons" },
      { name: "Weight", value: "95g" }
    ],
    variants: [
      { type: "color", value: "Matte Black", sku: "KO-MS-PRO-BLK" },
      { type: "color", value: "Stone White", sku: "KO-MS-PRO-WHT" }
    ],
    isBestSeller: true,
    isLatest: true,
  },
  {
    id: "prod-13",
    name: "Kore AluLift Laptop Stand",
    slug: "kore-alulift-laptop-stand",
    description: "Adjustable multi-angle aluminum laptop stand with cable routing and slip-proof silicone pads.",
    longDescription: "Transform your workspace posture with the Kore AluLift. Precision CNC-machined from a single block of aerospace-grade 6061 aluminum, this stand offers 6 fixed height adjustments from 15° to 90°. The hollow base design allows cables to route cleanly underneath, while wide silicone foot pads grip any desk surface to prevent sliding even during intense typing sessions.",
    price: 4499,
    rating: 4.5,
    reviewsCount: 67,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-3",
    categorySlug: "computer-gear",
    brandId: "brand-3",
    brandName: "Kore",
    stock: 22,
    specifications: [
      { name: "Material", value: "CNC Aluminum 6061" },
      { name: "Adjustable Angles", value: "15°, 25°, 35°, 45°, 60°, 90°" },
      { name: "Max Load", value: "10 kg" },
      { name: "Compatibility", value: "Laptops 10\" to 17\"" },
      { name: "Weight", value: "580g" }
    ],
    variants: [
      { type: "color", value: "Space Gray", sku: "KO-LS-ALU-GRY" },
      { type: "color", value: "Silver", sku: "KO-LS-ALU-SLV" }
    ],
  },
  {
    id: "prod-14",
    name: "Kore NumPad-X Wireless Numpad",
    slug: "kore-numpad-x-wireless-numpad",
    description: "Slim wireless numeric keypad with backlit keys, Mac/Windows layout toggle, and USB receiver.",
    longDescription: "Built for accountants, data analysts, and anyone working with large spreadsheets, the Kore NumPad-X brings full numpad functionality to any setup. The ultra-slim 4mm profile and tenkeyless footprint keep your desk minimal. Wireless connectivity over 2.4GHz ensures zero lag with up to 6-month battery life from 2x AAA batteries.",
    price: 2999,
    discountPrice: 2299,
    rating: 4.4,
    reviewsCount: 38,
    images: [
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-3",
    categorySlug: "computer-gear",
    brandId: "brand-3",
    brandName: "Kore",
    stock: 50,
    specifications: [
      { name: "Keys", value: "19 backlit keys" },
      { name: "Connection", value: "2.4GHz Wireless (USB nano receiver)" },
      { name: "Battery Life", value: "Up to 6 months (2x AAA)" },
      { name: "Compatibility", value: "Mac / Windows" },
      { name: "Dimensions", value: "88mm x 136mm x 4mm" }
    ],
    variants: [
      { type: "color", value: "Matte Black", sku: "KO-NP-X-BLK" },
      { type: "color", value: "Pearl White", sku: "KO-NP-X-WHT" }
    ],
    isLatest: true,
  },

  // ─── cat-4: Desk Accessories (3 products) ─────────────────────────────────────
  {
    id: "prod-3",
    name: "Kore MagSafe 3-in-1 Wireless Charger",
    slug: "kore-magsafe-wireless-charger",
    description: "A solid aluminum MagSafe charging stand that charges your phone, watch, and earbuds simultaneously.",
    longDescription: "Declutter your bedside or desk setup with the Kore MagSafe 3-in-1 Charging Stand. Milled from a single block of aerospace-grade aluminum, this charger features a weighted base to ensure stability. Dedicated charging spots supply up to 15W of fast wireless power.",
    price: 6599,
    discountPrice: 4949,
    rating: 4.5,
    reviewsCount: 56,
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-4",
    categorySlug: "desk-accessories",
    brandId: "brand-3",
    brandName: "Kore",
    stock: 12,
    specifications: [
      { name: "Input", value: "USB-C (PD 3.0, 30W min)" },
      { name: "MagSafe Charger", value: "15W Fast Charge" },
      { name: "Earbud Charger", value: "5W" },
      { name: "Watch Charger", value: "5W" },
      { name: "Materials", value: "Milled Aluminum, Leather Pad" }
    ],
    variants: [
      { type: "color", value: "Matte Black", sku: "KO-WC-3IN1-BLK" },
      { type: "color", value: "Satin Silver", sku: "KO-WC-3IN1-SLV" }
    ],
    isLatest: true,
    isFlashSale: true,
    flashSaleEnd: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "prod-8",
    name: "Nox Stealth Leather Phone Case",
    slug: "nox-stealth-leather-phone-case",
    description: "Slim defensive case made from premium full-grain Horween leather with MagSafe support.",
    longDescription: "A gorgeous layer of defense for your phone. Meticulously wrapped in premium full-grain Horween leather, this case develops a beautiful dark patina over time. Underneath, a tough polycarbonate shell and internal shock-absorbing bumpers protect against drops up to 10 feet.",
    price: 4099,
    rating: 4.7,
    reviewsCount: 73,
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-4",
    categorySlug: "desk-accessories",
    brandId: "brand-4",
    brandName: "Nox",
    stock: 19,
    specifications: [
      { name: "Compatibility", value: "iPhone 15 / 15 Pro / 15 Pro Max" },
      { name: "Leather Source", value: "Horween Leather (Chicago, USA)" },
      { name: "Drop Protection", value: "Certified up to 10ft (3m)" },
      { name: "MagSafe Support", value: "Built-in N52 neodymium magnets" }
    ],
    variants: [
      { type: "color", value: "Chestnut Brown", sku: "NO-PC-STL-BRN" },
      { type: "color", value: "Obsidian Black", sku: "NO-PC-STL-BLK" }
    ],
    isLatest: true,
  },
  {
    id: "prod-15",
    name: "Kore Executive Leather Desk Pad",
    slug: "kore-executive-leather-desk-pad",
    description: "Full-grain leather desk pad with stitched edges and an anti-slip microfiber base for a premium workspace look.",
    longDescription: "Elevate your desk's aesthetic with the Kore Executive Desk Pad. Constructed from top-grain vegetable-tanned leather, it offers a smooth writing surface that improves with age as it develops character. The non-slip suede microfiber base keeps the pad firmly in place. Stitched edges in contrast thread provide durability and a premium finish.",
    price: 3799,
    rating: 4.6,
    reviewsCount: 49,
    images: [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-4",
    categorySlug: "desk-accessories",
    brandId: "brand-3",
    brandName: "Kore",
    stock: 40,
    specifications: [
      { name: "Dimensions", value: "90cm x 40cm x 3mm" },
      { name: "Material", value: "Top-grain Vegetable-tanned Leather" },
      { name: "Base", value: "Non-slip Suede Microfiber" },
      { name: "Edge Finish", value: "Stitched contrast thread" }
    ],
    variants: [
      { type: "color", value: "Cognac Brown", sku: "KO-DP-EXC-BRN" },
      { type: "color", value: "Midnight Black", sku: "KO-DP-EXC-BLK" },
      { type: "color", value: "Forest Green", sku: "KO-DP-EXC-GRN" }
    ],
    isBestSeller: true,
  },

  // ─── cat-5: Lifestyle Apparel (3 products) ────────────────────────────────────
  {
    id: "prod-6",
    name: "Sol Eco-Canvas Commuter Tote",
    slug: "sol-eco-canvas-commuter-tote",
    description: "Spacious everyday tote bag made from water-repellent organic cotton canvas and vegan leather trims.",
    longDescription: "Carry your everyday essentials in sustainable comfort. Meticulously handcrafted from heavy-duty 14oz organic cotton canvas, this tote bag is layered with a plant-based water-repellent finish. The inside features a padded sleeve fitting laptops up to 16\", dual pocket dividers for water bottles, and zipped quick-access pockets.",
    price: 4099,
    discountPrice: 3249,
    rating: 4.4,
    reviewsCount: 31,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-5",
    categorySlug: "lifestyle-apparel",
    brandId: "brand-5",
    brandName: "Sol",
    stock: 50,
    specifications: [
      { name: "Capacity", value: "18 Liters" },
      { name: "Dimensions", value: "16\" x 13\" x 5.5\"" },
      { name: "Laptop Slot", value: "Fits up to 16\" MacBook" },
      { name: "Materials", value: "100% Organic Canvas, Vegan Microfiber Leather" }
    ],
    variants: [
      { type: "color", value: "Natural Tan", sku: "SO-TT-ECO-TAN" },
      { type: "color", value: "Sage Green", sku: "SO-TT-ECO-GRN" }
    ],
    isLatest: true,
  },
  {
    id: "prod-7",
    name: "Velo Horizon Polarized Sunglasses",
    slug: "velo-horizon-sunglasses",
    description: "Polarized modern sunglasses featuring ultra-durable acetate frames and complete UV400 protection.",
    longDescription: "A stylish companion for urban commutes and beachside weekends. The Velo Horizon sunglasses are carved from premium plant-based cellulose acetate and reinforced with triple-barrel hinges. Polarized TAC lenses eliminate blinding reflections and enhance natural contrast.",
    price: 7449,
    rating: 4.5,
    reviewsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-5",
    categorySlug: "lifestyle-apparel",
    brandId: "brand-2",
    brandName: "Velo",
    stock: 14,
    specifications: [
      { name: "UV Rating", value: "UV400 (100% UVA/UVB)" },
      { name: "Lens Type", value: "Polarized TAC" },
      { name: "Frame Material", value: "Bio-acetate (Plant-based)" },
      { name: "Fit Size", value: "Medium (50-21-145 mm)" }
    ],
    variants: [
      { type: "color", value: "Tortoise Amber", sku: "VE-SG-HOR-AMB" },
      { type: "color", value: "Obsidian Black", sku: "VE-SG-HOR-BLK" }
    ],
    isFeatured: true,
  },
  {
    id: "prod-16",
    name: "Sol Organic Cotton Cap",
    slug: "sol-organic-cotton-cap",
    description: "Minimalist 6-panel cap crafted from 100% GOTS-certified organic cotton with a structured front and adjustable strap.",
    longDescription: "Made for those who lead with intention, the Sol Organic Cap is crafted from GOTS-certified 100% organic ring-spun cotton. The structured front panel holds its shape through wear and wash, while the unstructured back provides a comfortable relaxed fit. Features a zinc-alloy adjustable buckle strap and embroidered Sol logotype on the front.",
    price: 1799,
    rating: 4.3,
    reviewsCount: 28,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582791694770-cbdc9dda338f?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-5",
    categorySlug: "lifestyle-apparel",
    brandId: "brand-5",
    brandName: "Sol",
    stock: 60,
    specifications: [
      { name: "Material", value: "100% GOTS Organic Ring-Spun Cotton" },
      { name: "Style", value: "6-panel, structured front" },
      { name: "Closure", value: "Zinc-alloy adjustable buckle" },
      { name: "Profile", value: "Mid-profile curved brim" }
    ],
    variants: [
      { type: "color", value: "Off White", sku: "SO-CP-ORG-WHT" },
      { type: "color", value: "Washed Black", sku: "SO-CP-ORG-BLK" },
      { type: "color", value: "Sand Dune", sku: "SO-CP-ORG-SND" }
    ],
    isLatest: true,
    isBestSeller: true,
  },

  // ─── cat-6: Smart Home ── intentionally EMPTY (shows empty state) ─────────────
];

export const mockReviews: Record<string, Review[]> = {
  "prod-1": [
    { id: "rev-1", productId: "prod-1", userName: "Marcus Vance", rating: 5, comment: "Absolutely incredible noise cancellation! These headphones cancel out engine roar on flights perfectly.", date: "2026-05-12", verifiedPurchase: true },
    { id: "rev-2", productId: "prod-1", userName: "Sophia Kim", rating: 4, comment: "Sound quality is extremely detailed. The bass is deep but not muddy. Took away one star because the headband felt slightly tight initially.", date: "2026-06-02", verifiedPurchase: true },
    { id: "rev-3", productId: "prod-1", userName: "Julian F.", rating: 5, comment: "Charging speed is blazing fast. Battery lasts forever. Strongly recommended.", date: "2026-06-25", verifiedPurchase: false }
  ],
  "prod-2": [
    { id: "rev-4", productId: "prod-2", userName: "Elena Rostova", rating: 4, comment: "Beautiful display and health tracking is super reliable. Fits very comfortably on my wrist.", date: "2026-04-18", verifiedPurchase: true },
    { id: "rev-5", productId: "prod-2", userName: "David G.", rating: 5, comment: "I get around 8.5 days on a single charge. GPS is highly accurate for trail running.", date: "2026-05-30", verifiedPurchase: true }
  ]
};

export const mockTestimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Senior Product Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop",
    quote: "FISTO represents the pinnacle of modern shopping design. The keyboard I ordered is a work of art, and checkout took seconds. Truly a world-class experience."
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Software Architect",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop",
    quote: "The headphones are easily the best purchase I've made this year. High frequency clarity is staggering, and customer support was incredibly helpful."
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop",
    quote: "The design aesthetics of FISTO's website drew me in, but the high-quality packaging and fast shipping turned me into a loyal advocate. Five stars!"
  }
];

export const mockFaqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Shipping is complimentary on all orders exceeding ₹8,000."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 50 countries worldwide. International shipping charges and customs fees are calculated dynamically at checkout based on location."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unused, unopened items in their original packaging. We provide a pre-printed prepaid shipping label for all returns."
  },
  {
    question: "Are your materials sustainable?",
    answer: "Sustainability is core to our company mission. Our bags, apparel, and packaging utilize 100% organic cotton, recycled canvas, and biodegradable cardboards."
  }
];

export const promoCodes = [
  { code: "FISTO10", discount: 0.10, description: "10% off site-wide" },
  { code: "PREMIUM20", discount: 0.20, description: "20% off for new users" },
  { code: "FREESHIP", discount: 0.00, description: "Free shipping on all items" }
];
