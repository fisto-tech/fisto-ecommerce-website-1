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
];

export const mockBrands: Brand[] = [
  { id: "brand-1", name: "Aura", slug: "aura", logo: "AURA", description: "Acoustic precision and ergonomic audio accessories." },
  { id: "brand-2", name: "Velo", slug: "velo", logo: "VELO", description: "Design-forward wearables built for peak performance." },
  { id: "brand-3", name: "Kore", slug: "kore", logo: "KORE", description: "Minimalist desktop peripherals and hardware accessories." },
  { id: "brand-4", name: "Nox", slug: "nox", logo: "NOX", description: "Protective cases and travel organizers with clean aesthetics." },
  { id: "brand-5", name: "Sol", slug: "sol", logo: "SOL", description: "Sustainable lifestyle accessories and organic apparel." },
];

export const mockProducts: Product[] = [
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
      { name: "Active Noise Cancellation", value: "Hybrid ANC (up to 42dB)" },
      { name: "Battery Life", value: "40 hours (ANC on), 50 hours (ANC off)" },
      { name: "Connectivity", value: "Bluetooth 5.3 & 3.5mm Aux" },
      { name: "Charging", value: "USB-C Quick Charge (10 mins = 5 hours)" },
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
    id: "prod-2",
    name: "Velo Fit Chronos Smartwatch",
    slug: "velo-fit-chronos-smartwatch",
    description: "An elegant smartwatch featuring comprehensive health tracking, customizable watch faces, and water resistance.",
    longDescription: "The Velo Fit Chronos blends time-honored circular watch aesthetics with cutting-edge biosensors. Keep track of sleep quality, heart rate, blood oxygen levels, and over 80 specific workouts. Encased in a surgical-grade stainless steel frame with an optimized AMOLED always-on display, this watch looks exceptional whether you are at a boardroom meeting or on a running track. Features an ultra-thin 10.5mm profile and a 9-day battery life.",
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
      { name: "Materials", value: "Stainless Steel Case, Fluororubber Strap" },
      { name: "Battery Life", value: "Up to 9 days typical use" },
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
    id: "prod-3",
    name: "Kore MagSafe Wireless Charger",
    slug: "kore-magsafe-wireless-charger",
    description: "A solid aluminum MagSafe charging stand that charges your phone, watch, and earbuds simultaneously.",
    longDescription: "Declutter your bedside or desk setup with the Kore MagSafe 3-in-1 Charging Stand. Milled from a single block of aerospace-grade aluminum, this charger features a weighted base to ensure stability. Dedicated charging spots supply up to 15W of fast wireless power to your phone, alongside customized sections for smartwatches and wireless earbuds. Features an elegant matte black finish that blends in with any modern aesthetic.",
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
      { name: "Input", value: "USB-C (PD 3.0, 30W min recommended)" },
      { name: "MagSafe Charger", value: "15W Fast Charge" },
      { name: "Earbud Charger", value: "5W Charge" },
      { name: "Watch Charger", value: "5W Charge" },
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
    id: "prod-4",
    name: "Kore Mechanical-K8 Core Keyboard",
    slug: "kore-mechanical-k8-core-keyboard",
    description: "Compact 75% mechanical keyboard with hot-swappable tactile switches and dynamic white backlighting.",
    longDescription: "Designed for developers and minimalist workspaces, the Kore K8 mechanical keyboard features a space-saving 75% form factor. Pre-installed with custom-tuned pre-lubed silent brown tactile switches, it offers a deeply satisfying writing experience without disturbing others. Includes a hot-swappable PCB so you can easily install keycaps and switches of your choice. Supports seamless switching between macOS and Windows layouts via toggle.",
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
      { name: "Battery Capacity", value: "4000mAh (Up to 200 hours backlight off)" },
      { name: "Connection Mode", value: "2.4Ghz Wireless / Bluetooth 5.1 / USB-C wired" }
    ],
    variants: [
      { type: "color", value: "Charcoal Slate", sku: "KO-KB-K8-CHR" },
      { type: "color", value: "Frost Ash", sku: "KO-KB-K8-FRS" }
    ],
    isLatest: true,
    isFeatured: true,
  },
  {
    id: "prod-5",
    name: "Aura Pods Comfort Noise Earbuds",
    slug: "aura-pods-comfort-noise-earbuds",
    description: "Ultra-lightweight true wireless earbuds with deep noise isolation and crystal-clear voice clarity.",
    longDescription: "The Aura Pods Comfort deliver massive audio output in an incredibly tiny footprint. At just 4.2g per earbud, you will barely feel them. Yet, they pack custom 11mm graphene drivers for robust acoustics and adaptive active noise cancellation that continuously analyzes surrounding sound levels to optimize performance. Microphones utilize beamforming technology with AI-driven voice isolation to deliver clear phone calls.",
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
      { name: "Weight", value: "4.2g per earbud, 38g charging case" },
      { name: "Driver Type", value: "11mm Graphene Driver" },
      { name: "Battery Life", value: "7 hours single charge (28 hours total with case)" },
      { name: "Waterproof Level", value: "IPX5 (sweat and rain resistant)" }
    ],
    variants: [
      { type: "color", value: "Sandstone White", sku: "AU-EP-POD-WHT" },
      { type: "color", value: "Slate Black", sku: "AU-EP-POD-BLK" }
    ],
    isBestSeller: true,
  },
  {
    id: "prod-6",
    name: "Sol Eco-Canvas Commuter Tote",
    slug: "sol-eco-canvas-commuter-tote",
    description: "Spacious everyday tote bag made from water-repellent organic cotton canvas and vegan leather trims.",
    longDescription: "Carry your everyday essentials in sustainable comfort. Meticulously handcrafted from heavy-duty 14oz organic cotton canvas, this tote bag is layered with a plant-based water-repellent finish. The inside features a padded sleeve fitting laptops up to 16\", dual pocket dividers for water bottles, and zipped quick-access pockets. Handles are reinforced with durable vegan leather wraps for comfortable hand or shoulder carry.",
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
      { name: "Laptop Slot", value: "Padded sleeve fits up to 16\" MacBook" },
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
    name: "Velo Horizon Sunglasses",
    slug: "velo-horizon-sunglasses",
    description: "Polarized modern sunglasses featuring ultra-durable acetate frames and complete UV400 protection.",
    longDescription: "A stylish companion for urban commutes and beachside weekends. The Velo Horizon sunglasses are carved from premium plant-based cellulose acetate and reinforced with triple-barrel hinges. Polarized TAC lenses eliminate blinding reflections and enhance natural contrast, while ensuring 100% defense against UVA/UVB rays. Comes with a recycled leather carrying pouch and microfiber cloth.",
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
      { name: "UV Rating", value: "UV400 (100% UVA/UVB protection)" },
      { name: "Lens Type", value: "Polarized Triacetate Cellulose (TAC)" },
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
    id: "prod-8",
    name: "Nox Stealth Leather Phone Case",
    slug: "nox-stealth-leather-phone-case",
    description: "Slim defensive case made from premium full-grain Horween leather with MagSafe support.",
    longDescription: "A gorgeous layer of defense for your phone. Meticulously wrapped in premium full-grain Horween leather, this case develops a beautiful dark patina over time. Underneath, a tough polycarbonate shell and internal shock-absorbing bumpers protect against drops up to 10 feet. Tactile buttons are built from machined aluminum to keep button presses crisp and feedback snappy.",
    price: 4099,
    rating: 4.7,
    reviewsCount: 73,
    images: [
      "https://images.unsplash.com/photo-1601597111158-2fceff270190?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop"
    ],
    categoryId: "cat-4",
    categorySlug: "desk-accessories",
    brandId: "brand-4",
    brandName: "Nox",
    stock: 19,
    specifications: [
      { name: "Compatibility", value: "iPhone 15 / 15 Pro / 15 Pro Max" },
      { name: "Leather Source", value: "Horween Leather Company (Chicago, USA)" },
      { name: "Drop Protection", value: "Certified up to 10ft (3m)" },
      { name: "MagSafe Support", value: "Built-in N52 neodymium magnets" }
    ],
    variants: [
      { type: "color", value: "Chestnut Brown", sku: "NO-PC-STL-BRN" },
      { type: "color", value: "Obsidian Black", sku: "NO-PC-STL-BLK" }
    ],
    isLatest: true,
  }
];

export const mockReviews: Record<string, Review[]> = {
  "prod-1": [
    { id: "rev-1", productId: "prod-1", userName: "Marcus Vance", rating: 5, comment: "Absolutely incredible noise cancellation! I wear these on my daily flight commutes and they cancel out engine roar perfectly.", date: "2026-05-12", verifiedPurchase: true },
    { id: "rev-2", productId: "prod-1", userName: "Sophia Kim", rating: 4, comment: "Sound quality is extremely detailed. The bass is deep but not muddy. Took away one star because the headband felt slightly tight on my head during the first few days.", date: "2026-06-02", verifiedPurchase: true },
    { id: "rev-3", productId: "prod-1", userName: "Julian F.", rating: 5, comment: "Charging speed is blazing fast. Battery lasts forever. Strongly recommended if you value sound definition.", date: "2026-06-25", verifiedPurchase: false }
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
    quote: "FISTO represents the pinnacle of modern shopping design. The keyboard I ordered is a work of art, and checkout took seconds. Truly a world-class checkout flow."
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Software Architect",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop",
    quote: "The headphones are easily the best purchase I've made this year. High frequency clarity is staggering, and customer support was incredibly helpful when updating my address."
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
