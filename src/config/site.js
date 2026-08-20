// src/config/site.js
// Single source of truth for Nicotine Free Vapes Australia

export const SITE = {
  name: 'Nicotine Free Vapes Australia',
  tagline: 'Premium Zero-Nicotine Vaporizers & Botanical Flavor Experiences in Australia',
  domain: 'DOMAIN.com',           // Single source of truth for domain
  locale: 'en-AU',
  currency: 'AUD',
  target: 'vercel',
  primaryColor: '#059669',        // Luxury Emerald Gold accent
  gscVerification: 'pending',
  indexNowKey: 'nicotinefreevapes-indexnow-auth',
  cartKey: 'mm-cart',
}

export const CONTACT = {
  email: 'support&#64;DOMAIN.com',
  rawEmail: 'support@DOMAIN.com',
  phone: '+61 2 8000 0000',
  whatsapp: '+61 400 000 000',
  address: 'Level 14, 100 Barangaroo Avenue, Barangaroo',
  hq: 'Sydney, NSW, Australia',
  country: 'Australia',
}

export const SHOP = {
  minOrder: 200,                  // Min order amount in AUD
  freeShippingThreshold: 0,       // Free express shipping on all orders
  shippingFee: 0,
  cryptoDiscount: 10,             // 10% discount on crypto settlement
  paymentMethods: ['bank-transfer', 'crypto-BTC', 'crypto-USDT', 'payid', 'gift-cards'],
  paymentLabels: {
    'bank-transfer': 'Australian Direct Bank Transfer (EFT)',
    'crypto-BTC': 'Bitcoin (BTC) — Extra 10% OFF',
    'crypto-USDT': 'Tether (USDT TRC20/ERC20) — Extra 10% OFF',
    'payid': 'PayID / Osko Instant Transfer',
    'gift-cards': 'Verified Digital Gift Cards',
  }
}

export const FORMS = {
  provider: 'web3forms',          // 'web3forms' | 'resend'
  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
  resendFrom: '',
  turnstileSiteKey: '',
}

export const CHAT = {
  channels: [
    { type: 'whatsapp', label: 'WhatsApp Concierge', value: '+61400000000', href: 'https://wa.me/61400000000' },
    { type: 'telegram', label: 'Telegram Support', value: 'NicotineFreeVapesAU', href: 'https://t.me/NicotineFreeVapesAU' },
    { type: 'email', label: 'Email Desk', value: 'support&#64;DOMAIN.com', href: 'mailto:support@DOMAIN.com' },
    { type: 'phone', label: 'Phone Concierge', value: '+61 2 8000 0000', href: 'tel:+61280000000' },
  ]
}

export const BRAND = {
  foundingYear: '2023',
  foundingLocation: 'Sydney, Australia',
  description: 'Nicotine Free Vapes Australia is the premier dedicated Australian boutique supplying lab-verified 0mg zero-nicotine disposable vaporizers, authentic Uwell and refillable pod devices, replacement coils, and pure botanical e-liquids with swift express dispatch across all states.',
  milestones: [
    { year: '2023', event: 'Established in Sydney to pioneer 100% verified 0mg zero-nicotine lifestyle vaporizers and hardware.' },
    { year: '2024', event: 'Curated over 50 authentic hardware models, sub-ohm coils, and organic botanical e-liquid blends.' },
    { year: '2025', event: 'Launched automated crypto settlement offering 10% instant discount with nationwide express fulfillment.' }
  ],
  differentiation: [
    'Guaranteed 100% Zero-Nicotine (0mg) certified purity across every e-liquid and disposable unit',
    'Direct factory-authentic hardware sourced from trusted global masters including Uwell & Vaporesso',
    'Same-day priority dispatch from our climate-controlled Sydney hub with tracking on all parcels',
    'Seamless multi-channel settlement with PayID, EFT bank transfer, and 10% cryptocurrency discounts'
  ],
  sameAs: [],
  awards: [],
  areaServed: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Australia'],
}

export const CATEGORIES = [
  {
    slug: 'disposable-vapes',
    name: '0mg Disposable Vapes',
    shortName: 'Disposables',
    description: 'Pre-filled, zero-nicotine disposable vaporizers delivering pure botanical flavors, smooth clouds, and up to 10,000 puffs.',
    subcategories: [
      { slug: '0mg-disposables', name: 'Standard 0mg Disposables' },
      { slug: 'high-puff-bars', name: 'High-Puff Botanical Bars' }
    ],
    image: 'disposable-vapes-category.webp'
  },
  {
    slug: 'refillable-pod-systems',
    name: 'Refillable Pod Systems',
    shortName: 'Pod Kits',
    description: 'Ultra-portable and refillable pod kits from industry-leading brands like Uwell, optimized for smooth 0mg nicotine-free vaping.',
    subcategories: [
      { slug: 'pod-starter-kits', name: 'Pod Starter Kits' },
      { slug: 'replacement-pods', name: 'Replacement Pod Cartridges' }
    ],
    image: 'refillable-pod-systems-category.webp'
  },
  {
    slug: 'vape-coils-accessories',
    name: 'Vape Coils & Hardware',
    shortName: 'Coils & Hardware',
    description: 'Authentic replacement mesh coils, high-drain vape batteries, and customizable mods for tailored vapor density and flavor.',
    subcategories: [
      { slug: 'replacement-coils', name: 'Replacement Coils' },
      { slug: 'vape-batteries', name: 'Vape Batteries & Chargers' },
      { slug: 'vape-mods', name: 'Vape Mods & Starter Kits' }
    ],
    image: 'vape-coils-accessories-category.webp'
  },
  {
    slug: 'botanical-e-liquids',
    name: '0mg E-Liquids & Juices',
    shortName: '0mg E-Liquids',
    description: 'Artisan crafted 0mg zero-nicotine vape juices and natural botanical formulations with authentic fruit, mint, and dessert profiles.',
    subcategories: [
      { slug: 'fruity-blends', name: 'Fruity Blends' },
      { slug: 'menthol-ice', name: 'Menthol & Sub-Zero Ice' },
      { slug: 'dessert-botanicals', name: 'Artisan Botanicals' }
    ],
    image: 'botanical-e-liquids-category.webp'
  }
]

export const PRODUCTS = [
  {
    slug: 'uwell-caliburn-g3-zero-kit',
    name: 'Uwell Caliburn G3 Pro Pod System (0mg Edition)',
    price: 64.95,
    category: 'refillable-pod-systems',
    subcategory: 'pod-starter-kits',
    badge: 'Best Seller',
    featured: true,
    shortDescription: 'The pinnacle of flavor reproduction featuring OLED display, 900mAh battery, and integrated dual-airflow 0mg pods.',
    description: 'The Uwell Caliburn G3 Pro delivers unmatched flavor clarity for 0mg nicotine-free vaping enthusiasts across Australia. Equipped with a vivid full-screen OLED user interface, customizable wattage up to 25W, and Uwell Pro-FOCS 3.0 flavor technology. Comes with 0.6ohm and 0.9ohm integrated mesh cartridges engineered for ultrasonic leak resistance.',
    specs: {
      'Battery Capacity': '900mAh Fast USB-C Charging',
      'Max Output': '25W Adjustable',
      'Pod Capacity': '2.5ml Top-Fill',
      'Coil Compatibility': 'Integrated Caliburn G3 Mesh 0.6Ω / 0.9Ω',
      'Nicotine Strength': '0mg (Nicotine Free)'
    },
    images: ['uwell-caliburn-g3-zero-kit.webp', 'uwell-caliburn-g3-zero-kit-2.webp']
  },
  {
    slug: 'aurora-pure-0mg-disposable-8000',
    name: 'Aurora Pure 0mg Botanical Bar (8,000 Puffs)',
    price: 38.50,
    category: 'disposable-vapes',
    subcategory: 'high-puff-bars',
    badge: 'Popular',
    featured: true,
    shortDescription: 'Long-lasting 8,000 puff zero-nicotine disposable with digital e-liquid indicator and rechargeable Type-C battery.',
    description: 'Engineered for smooth botanical vapor, the Aurora Pure 0mg bar offers a rich sensory journey without any nicotine or harsh throat hits. Boasting dual-mesh coil heating, a smart LED display showing remaining battery and fluid levels, and pure food-grade fruit terpenes for pure satisfaction throughout its 8,000 puff lifespan.',
    specs: {
      'Puff Count': 'Approx. 8,000 Puffs',
      'Nicotine Content': '0% (0mg / Nicotine-Free)',
      'E-Liquid Volume': '14ml Pre-filled',
      'Rechargeable': 'USB Type-C (650mAh)',
      'Coil': '1.0Ω Dual Mesh Core'
    },
    images: ['aurora-pure-0mg-disposable-8000.webp', 'aurora-pure-0mg-disposable-8000-2.webp']
  },
  {
    slug: 'uwell-caliburn-g3-replacement-pods-4pack',
    name: 'Uwell Caliburn G3 Replacement Pods (4-Pack)',
    price: 24.95,
    category: 'refillable-pod-systems',
    subcategory: 'replacement-pods',
    badge: 'Essential',
    featured: true,
    shortDescription: 'Official authentic 4-pack replacement pods for Caliburn G3 with Pro-FOCS mesh and U2 ultrasonic leak-prevention.',
    description: 'Keep your zero-nicotine vaping crisp and pure with authentic Uwell Caliburn G3 replacement cartridges. Featuring ultrasonic welding to eliminate condensation, easy side/top refill mechanisms, and calibrated mesh resistance tuned specifically for 0mg botanical vape juices.',
    specs: {
      'Pack Size': '4 Pods Per Box',
      'Resistance Options': '0.6Ω RDL / 0.9Ω MTL',
      'Pod Capacity': '2.5ml',
      'Authenticity': '100% Genuine Uwell with Scratch Verification Code'
    },
    images: ['uwell-caliburn-g3-replacement-pods-4pack.webp']
  },
  {
    slug: 'vaporesso-xros-4-nano-zero-kit',
    name: 'Vaporesso XROS 4 Nano Pod Kit (0mg Ready)',
    price: 59.95,
    category: 'refillable-pod-systems',
    subcategory: 'pod-starter-kits',
    badge: 'New Arrival',
    featured: true,
    shortDescription: 'Compact square form factor with 1350mAh high-density battery and 2A ultra-fast charging for all-day 0mg vaping.',
    description: 'The Vaporesso XROS 4 Nano delivers maximum battery life in an ultra-compact pocket-friendly aluminum chassis. COREX 2.0 aroma reproduction heating technology ensures 30% longer coil longevity and intense botanical flavor expression. Perfect for Australian daily commuters seeking a clean zero-nicotine experience.',
    specs: {
      'Battery': '1350mAh High Density Cell',
      'Charging': '2A Type-C Quick Charge (80% in 20 mins)',
      'Display': '1.3-inch TFT Color Screen',
      'Airflow': 'Precision Slide Airflow Control'
    },
    images: ['vaporesso-xros-4-nano-zero-kit.webp']
  },
  {
    slug: 'uwell-valyrian-3-mesh-coils-2pack',
    name: 'Uwell Valyrian 3 Sub-Ohm Mesh Coils (2-Pack)',
    price: 19.95,
    category: 'vape-coils-accessories',
    subcategory: 'replacement-coils',
    badge: 'Performance',
    featured: false,
    shortDescription: 'Authentic Uwell high-wattage mesh coils delivering dense, rich clouds with 0mg VG-heavy botanical e-liquids.',
    description: 'Designed for sub-ohm cloud chasers, these genuine Uwell Valyrian 3 mesh coils use self-cleaning coil technology to minimize juice condensation and extend coil life. Outstanding thermal conductivity ensures every nuance of your zero-nicotine liquid is vaporized cleanly.',
    specs: {
      'Resistance': 'UN2 0.32Ω (80-85W) / UN2-2 0.14Ω (80-90W)',
      'Pack Qty': '2 Coils',
      'Wicking': '100% Organic Japanese Cotton'
    },
    images: ['uwell-valyrian-3-mesh-coils-2pack.webp']
  },
  {
    slug: 'molicel-p28a-18650-battery-pair',
    name: 'Molicel P28A 18650 High-Drain Vape Batteries (Pair)',
    price: 29.95,
    category: 'vape-coils-accessories',
    subcategory: 'vape-batteries',
    badge: 'Authentic',
    featured: false,
    shortDescription: 'Grade-A authentic 2800mAh 35A high-drain 18650 batteries in a protective battery storage case.',
    description: 'Molicel is globally renowned as the gold standard for regulated vape mods. This matched pair of P28A 18650 cells provides continuous 25A / 35A burst discharge rates, steady thermal stability, and maximum cycle longevity for high-performance vape mods in Australia.',
    specs: {
      'Capacity': '2800mAh Nominal',
      'Continuous Discharge': '25A Rated / 35A Max Burst',
      'Chemistry': 'INR Li-ion',
      'Packaging': 'Includes dual-slot silicone protector case'
    },
    images: ['molicel-p28a-18650-battery-pair.webp']
  },
  {
    slug: 'vaporesso-gen-200-mod-kit',
    name: 'Vaporesso Gen 200 Dual-18650 Vape Mod (0mg Ready)',
    price: 89.95,
    category: 'vape-coils-accessories',
    subcategory: 'vape-mods',
    badge: 'Pro Tier',
    featured: true,
    shortDescription: 'Ultra-lightweight 220W dual-battery mod powered by AXON chip with Pulse Mode and F(t) flavor enhancement.',
    description: 'Weighing 40% less than standard dual-battery box mods, the Vaporesso Gen 200 features a comfortable 4-layer rubberized coating and the advanced AXON chipset. Seamlessly power any sub-ohm tank or rebuildable atomizer for pure, dense zero-nicotine vapor production.',
    specs: {
      'Max Output': '220 Watts',
      'Battery': 'Dual 18650 (Sold Separately)',
      'Chipset': 'AXON with F(t), Pulse, and DIY modes',
      'Thread': '510 Stainless Steel Connection'
    },
    images: ['vaporesso-gen-200-mod-kit.webp']
  },
  {
    slug: 'artisan-sydney-summer-mango-ice-0mg-60ml',
    name: 'Sydney Summer Mango Ice 0mg Botanical E-Liquid (60ml)',
    price: 26.50,
    category: 'botanical-e-liquids',
    subcategory: 'fruity-blends',
    badge: 'Customer Choice',
    featured: true,
    shortDescription: 'Sun-ripened Kensington Pride mango infused with crushed glacier ice and pure botanical extracts (0mg).',
    description: 'Capture the essence of an Australian beach summer with Sydney Summer Mango Ice. Formulated with authentic Australian mango flavor essences, cooling menthol crystals, and a smooth 70/30 VG/PG base. Zero nicotine, zero harshness, and clean wicking that keeps coils lasting longer.',
    specs: {
      'Bottle Size': '60ml Chubby Gorilla Bottle with child-lock',
      'Nicotine Level': '0mg (100% Nicotine-Free)',
      'VG / PG Ratio': '70% VG / 30% PG',
      'Origin': 'Compounded with Premium USP/BP Grade Ingredients'
    },
    images: ['artisan-sydney-summer-mango-ice-0mg-60ml.webp']
  },
  {
    slug: 'alpine-crisp-apple-mint-0mg-60ml',
    name: 'Alpine Crisp Green Apple Mint 0mg E-Liquid (60ml)',
    price: 26.50,
    category: 'botanical-e-liquids',
    subcategory: 'menthol-ice',
    badge: 'Refreshing',
    featured: false,
    shortDescription: 'Tart Granny Smith apple blended with natural peppermint botanical oil for an invigorating clean vape.',
    description: 'Crisp, refreshing, and invigorating. Alpine Crisp combines tart Granny Smith apples with soothing garden peppermint. Free from artificial sweeteners that gunk up coils, delivering a crisp, uplifting vape experience for health-conscious Australian vapers.',
    specs: {
      'Volume': '60ml',
      'Nicotine Strength': '0mg / Zero Nicotine',
      'Ratio': '70VG / 30PG',
      'Flavor Profile': 'Tart Green Apple, Garden Peppermint, Sub-Zero Refreshment'
    },
    images: ['alpine-crisp-apple-mint-0mg-60ml.webp']
  },
  {
    slug: 'zen-botanical-lavender-vanilla-0mg-60ml',
    name: 'Zen Botanical Lavender Bean 0mg Vape Elixir (60ml)',
    price: 28.00,
    category: 'botanical-e-liquids',
    subcategory: 'dessert-botanicals',
    badge: 'Artisan',
    featured: false,
    shortDescription: 'Calming French lavender blossoms paired with rich Madagascar vanilla bean for an evening relaxation vape.',
    description: 'An artisan dessert and herbal masterwork. Crafted with natural French culinary lavender extracts and rich bourbon vanilla bean, this 0mg zero-nicotine elixir is designed for mindful, peaceful evening sessions after a busy workday.',
    specs: {
      'Volume': '60ml',
      'Nicotine Content': '0mg (Zero Nicotine)',
      'Base': 'Max VG Smooth Blend',
      'Terpenes': 'Linalool & Natural Botanical Terpenes'
    },
    images: ['zen-botanical-lavender-vanilla-0mg-60ml.webp']
  },
  {
    slug: 'crystal-bar-pro-0mg-6000-disposable',
    name: 'Crystal Bar Pro 0mg Zero-Nicotine Vape (6,000 Puffs)',
    price: 32.00,
    category: 'disposable-vapes',
    subcategory: '0mg-disposables',
    badge: 'Best Value',
    featured: true,
    shortDescription: 'Crystal clear acrylic design with LED luminescence and mesh coil technology for rich zero-nicotine flavor.',
    description: 'The Crystal Bar Pro showcases a faceted diamond exterior with whisper-quiet airflow. Pre-loaded with 12ml of premium 0mg botanical liquid, the built-in 1.2ohm mesh coil ensures dense, flavorful vapor clouds without any nicotine dependency.',
    specs: {
      'Puffs': 'Up to 6,000 Puffs',
      'Nicotine': '0mg / Nicotine Free',
      'Battery': '550mAh Rechargeable via Type-C',
      'Draw Activation': 'Instant Auto-Draw Response'
    },
    images: ['crystal-bar-pro-0mg-6000-disposable.webp']
  },
  {
    slug: 'geekvape-aegis-boost-3-zero-pod-kit',
    name: 'GeekVape Aegis Boost 3 Pod Mod (0mg Ready)',
    price: 74.95,
    category: 'refillable-pod-systems',
    subcategory: 'pod-starter-kits',
    badge: 'Rugged IP68',
    featured: false,
    shortDescription: 'Tri-proof IP68 water, dust, and shock-resistant 60W pod system with smart biometric lock.',
    description: 'Built for the rugged Australian outdoors, the Aegis Boost 3 combines military-grade durability with GeekVape B-Series coil flavor reproduction. Features top-airflow leak-proof engineering and AS Chip 4.0 for instantaneous firing.',
    specs: {
      'Durability': 'IP68 Water, Dust & Shock Proof',
      'Battery': 'Integrated 3000mAh',
      'Max Power': '60W Firing Output',
      'Pod Capacity': '5.0ml Massive Tank'
    },
    images: ['geekvape-aegis-boost-3-zero-pod-kit.webp']
  }
]

export const POSTS = [
  {
    slug: 'complete-guide-to-0mg-nicotine-free-vaping-australia',
    title: 'The Complete Guide to 0mg Nicotine-Free Vaping in Australia (2025 & Beyond)',
    excerpt: 'Explore the benefits of zero-nicotine vaping in Australia, from sensory relaxation and flavor exploration to understanding Australian product standards.',
    category: 'Guides',
    date: '2025-01-15',
    readTime: '6 min read',
    image: 'blog-guide-0mg-vaping-australia.webp',
    content: `Nicotine-free vaping has grown exponentially across Australia as adults seek mindful flavor rituals, sensory enjoyment, and the tactile habit of vaping without any addictive stimulants. In this comprehensive guide, we dissect everything you need to know about 0mg vapes, legal frameworks, device compatibility, and flavor science.

### Why Choose 0mg Zero-Nicotine Vaporizers?
Unlike traditional tobacco or nicotine-containing products, 0mg vaporizers contain zero nicotine alkaloids. They are compounded purely from high-purity Vegetable Glycerin (VG), Propylene Glycol (PG), natural botanical extracts, and food-grade flavorings.

1. **Zero Chemical Dependency:** Enjoy the tactile motion, deep breathing, and rich aroma without physiological cravings or sleep disruption.
2. **Superior Flavor Clarity:** Nicotine naturally imparts a peppery, slightly bitter throat feel. In 0mg formulations, fruit notes like Queensland Mango and Alpine Mint shine with unprecedented sweetness and crispness.
3. **Smooth, Non-Harsh Inhalation:** Ideal for users who want smooth vapor without throat scratchiness.

### Understanding Device Types in Australia
- **Pre-filled 0mg Disposables:** Convenient, no setup needed. Modern high-puff devices feature rechargeable USB-C batteries and dual mesh coils for sustained performance.
- **Refillable Pod Kits (e.g. Uwell Caliburn):** Highly economical and eco-conscious. Refill with your favorite Australian 0mg juices and replace pods every 2-3 weeks.
- **Sub-Ohm Box Mods:** For cloud enthusiasts who enjoy dense, warm vapor and full control over wattage and airflow.

### Compliance & Dispatch from Sydney
At Nicotine Free Vapes Australia, every batch is verified to ensure 100.0% zero-nicotine compliance. We dispatch directly from Sydney with discreet packaging and express tracking across all Australian states.`
  },
  {
    slug: 'uwell-caliburn-g3-vs-xros-4-comparison',
    title: 'Uwell Caliburn G3 Pro vs Vaporesso XROS 4: Which Pod System Reigns Supreme for 0mg?',
    excerpt: 'A head-to-head comparison of Australia’s two most popular refillable pod systems evaluated for 0mg flavor clarity, coil life, and leak resistance.',
    category: 'Reviews',
    date: '2025-02-02',
    readTime: '5 min read',
    image: 'blog-caliburn-vs-xros.webp',
    content: `When choosing an open pod system for 0mg nicotine-free vaping, two titans dominate the Australian market: the **Uwell Caliburn G3 Pro** and the **Vaporesso XROS 4 Nano**. Both promise exceptional coil longevity, leak prevention, and ergonomic design. Let us compare them across real-world metrics.

### Flavor Reproduction & Mesh Technology
- **Uwell Caliburn G3 Pro:** Utilizes Uwell's Pro-FOCS 3.0 flavor technology. It accentuates bright fruit notes and subtle bakery undertones. The 0.6ohm mesh pod provides a warm, saturated vapor with wide airflow.
- **Vaporesso XROS 4 Nano:** Powered by COREX 2.0 with morph-mesh heating. It delivers a slightly drier, ultra-crisp throat hit that pairs beautifully with menthol and botanical blends.

### Battery Life & Daily Ergonomics
The XROS 4 Nano features a 1350mAh cell, offering nearly 2 full days of moderate use, while the Caliburn G3 Pro includes a 900mAh battery with an intuitive full-color display screen and variable wattage control up to 25W.

### Verdict
- Choose the **Caliburn G3 Pro** if you love fine-tuning wattage and want maximum flavor warmth.
- Choose the **XROS 4 Nano** if you prioritize compact pocketability, battery endurance, and instant drag response.`
  },
  {
    slug: 'how-to-make-vape-coils-last-longer',
    title: 'How to Make Your Vape Coils Last 3x Longer: Pro Tips from Sydney Specialists',
    excerpt: 'Learn the exact priming steps, wattage management, and botanical juice selections that keep your vape coils fresh and prevent burnt hits.',
    category: 'Maintenance',
    date: '2025-02-18',
    readTime: '4 min read',
    image: 'blog-coil-maintenance.webp',
    content: `Vape coils are the heart of your vapor experience. Burnt coils not only ruin the exquisite flavor of your 0mg e-liquid but also cost unnecessary money. Follow these battle-tested steps from our Sydney technicians to triple the lifespan of your replacement coils.

### 1. Always Prime Your Coil Before First Use
Never fire a dry coil. When inserting a new pod or coil, place 3-4 drops of liquid directly onto the exposed cotton wick. After filling the pod, let it rest upright for at least 10 minutes to allow the cotton fibers to saturate completely.

### 2. Avoid Heavy Artificial Sweeteners
Dark e-liquids packed with synthetic sucralose caramelize on coil wires when heated, forming a black crust commonly known as "coil gunk". Clean, transparent botanical 0mg formulations keep cotton white and porous for weeks.

### 3. Keep Your Tank at Least 30% Full
Vaping on a nearly empty pod starves the wick of liquid, leading to dry hits. Top up your tank when the liquid reaches the minimum indicator line.

### 4. Respect the Recommended Wattage Window
Every coil has a rated wattage (e.g., Uwell 0.6ohm is rated 25W). Start at the lower end (18W) and gradually increase power until you hit your sweet spot.`
  }
]

export const FAQ = [
  {
    question: 'Are all products on Nicotine Free Vapes 100% zero nicotine (0mg)?',
    answer: 'Yes. Every disposable vape, pod cartridge, and bottled e-liquid in our Sydney store contains 0.0% nicotine. Our products are formulated purely with USP-grade Vegetable Glycerin, Propylene Glycol, and food-grade botanical flavors for a pure sensory experience.'
  },
  {
    question: 'What is the minimum order amount and shipping policy in Australia?',
    answer: 'Our minimum order amount is $200 AUD. All orders qualify for 100% free express courier delivery across Australia, dispatched with discreet, tamper-evident packaging and live tracking from our Sydney fulfillment hub.'
  },
  {
    question: 'What payment methods do you accept, and how does the crypto discount work?',
    answer: 'We accept Australian Direct Bank Transfer (EFT), PayID/Osko instant transfer, verified digital gift cards, and cryptocurrency (Bitcoin BTC and Tether USDT). Choosing cryptocurrency automatically applies an extra 10% discount at checkout.'
  },
  {
    question: 'How do I place an order via WhatsApp or the online order form?',
    answer: 'Simply add your items to the shopping cart. When ready, click Checkout to generate a prefilled order draft. You can send your order draft instantly to our WhatsApp concierge or submit the secure online order form for instant EFT/PayID payment instructions.'
  },
  {
    question: 'Are your Uwell and hardware products 100% authentic?',
    answer: 'Yes. All Uwell, Vaporesso, GeekVape devices, coils, and Molicel batteries are 100% authentic, sourced from authorized distributors. Every hardware box includes the manufacturer security scratch-off code for online authenticity verification.'
  },
  {
    question: 'Do you offer wholesale and bulk pricing for Australian retailers and lounges?',
    answer: 'Yes. We provide tiered wholesale pricing for Australian retailers, convenience partners, and wellness lounges. Apply through our dedicated Wholesale page or connect directly with our B2B team on WhatsApp for volume catalog rates.'
  }
]

export const PAGES = {
  about: true,
  faq: true,
  blog: true,
  wholesale: true,
  tracking: false,
  compare: false,
  search: true,   // required for SearchAction schema
}

export const COMPLIANCE = {
  bannedTerms: [
    'nicotine salt',
    'high nicotine',
    'tobacco cigarette',
    'cure addiction',
    'therapeutic cure',
    'health remedy'
  ],
  requiredFramings: [
    'All products sold contain 0mg (zero) nicotine',
    'Intended for adult sensory and lifestyle relaxation'
  ],
  prohibitedClaims: [
    'Medical claims or cessation guarantees',
    'Therapeutic benefits without TGA registration'
  ],
  ageGate: false,
  ageMinimum: null,
  gdpr: true,
  disclaimer: 'All vaporizers, pod systems, and e-liquids sold on this platform are 100% nicotine-free (0mg). Products are intended for adult recreational and sensory botanical use. Always store out of reach of children and pets.',
}
