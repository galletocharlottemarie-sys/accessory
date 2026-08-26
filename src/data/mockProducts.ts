import { Product, Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Sophia Martinez',
    rating: 5,
    date: '2026-08-14',
    comment: 'The 18k solid gold lustre and baroque pearl shape are breathtaking. Paid seamlessly through PayMongo GCash and received it in 2 days in Manila!',
    verifiedPurchase: true,
    gcashVerified: true,
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userName: 'Christian Bautista',
    rating: 5,
    date: '2026-08-02',
    comment: 'Bought this as an anniversary gift for my fiancé. Impeccable craftsmanship and heavy premium weight.',
    verifiedPurchase: true,
    gcashVerified: true,
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    userName: 'Katrina Sy',
    rating: 4,
    date: '2026-07-28',
    comment: 'Minimalist watch with a stunning obsidian dial. The rose gold bezel has excellent contrast. Highly recommended seller!',
    verifiedPurchase: true,
    gcashVerified: false,
  },
  {
    id: 'rev-4',
    productId: 'prod-3',
    userName: 'Marco De Leon',
    rating: 5,
    date: '2026-08-10',
    comment: 'The Italian Saffiano leather texture is genuine and rich. Fits all my cards and iPhone comfortably.',
    verifiedPurchase: true,
    gcashVerified: true,
  },
  {
    id: 'rev-5',
    productId: 'prod-4',
    userName: 'Elena Rostova',
    rating: 5,
    date: '2026-08-18',
    comment: 'Crystal clarity on the polarized lenses. Lightweight titanium frame that does not slip. Worth every peso.',
    verifiedPurchase: true,
    gcashVerified: true,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Aethelgard 18k Baroque Pearl Pendant',
    subtitle: 'Hand-selected South Sea Pearl with 18K Solid Gold Choker Chain',
    price: 18500,
    originalPrice: 22000,
    category: 'Jewelry',
    rating: 4.9,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475103-4fa1b7765a7e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Each Baroque Pearl is organically unique, harvested sustainably from Palawan deep waters and cradled in a sculptural 18-karat solid yellow gold prong setting. Designed to elevate both evening gala attire and relaxed silk blouses.',
    material: '18K Solid Yellow Gold, Natural Baroque South Sea Pearl (12-14mm)',
    specs: {
      'Chain Length': '45cm + 5cm adjustable extender',
      'Pearl Grade': 'AAA Lustre Natural Baroque',
      'Clasp Type': 'Signature Lobster Lock with Hallmarking',
      'Origin': 'Handcrafted in Cebu & Palawan, Philippines'
    },
    inStock: true,
    stockCount: 8,
    tags: ['Gold', 'Pearl', 'Handmade', 'Fine Jewelry', 'Bestseller'],
    featured: true,
    seller: {
      id: 'sel-1',
      name: 'Aethelgard High Jewelry',
      gcashNumber: '0917-884-2190',
      rating: 4.95,
      verified: true,
      location: 'Makati City, Metro Manila'
    },
    createdAt: '2026-07-01'
  },
  {
    id: 'prod-2',
    title: 'Chronos Obsidian Automatic Timepiece',
    subtitle: 'Swiss Movement with Rose Gold Bezel & Sapphire Glass',
    price: 34900,
    originalPrice: 42000,
    category: 'Watches',
    rating: 4.8,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A masterclass in contrast: deep sunburst obsidian dial encased in brushed 316L surgical-grade stainless steel with 18k rose gold plating. Features a scratch-resistant anti-reflective sapphire crystal and exhibition caseback.',
    material: '316L Stainless Steel, 18K Rose Gold PVD, Sapphire Crystal, Alligator-Grain Leather',
    specs: {
      'Case Diameter': '40mm',
      'Water Resistance': '10 ATM (100 meters)',
      'Movement': 'Automatic Calibre 28,800 vph (42-hr reserve)',
      'Warranty': '3-Year International Manufacturer Warranty'
    },
    inStock: true,
    stockCount: 5,
    tags: ['Automatic', 'Rose Gold', 'Luxury Watch', 'Sapphire'],
    featured: true,
    seller: {
      id: 'sel-2',
      name: 'Vanguard Horology PH',
      gcashNumber: '0918-922-3401',
      rating: 4.9,
      verified: true,
      location: 'Bonifacio Global City, Taguig'
    },
    createdAt: '2026-07-15'
  },
  {
    id: 'prod-3',
    title: 'Florence Saffiano Leather Crossbody Mini',
    subtitle: 'Hand-burnished Full Grain Tuscan Leather with Brass Hardware',
    price: 14200,
    originalPrice: 16500,
    category: 'Bags',
    rating: 5.0,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sculptural and structured, the Florence Mini is crafted from scratch-resistant Italian Saffiano leather. Designed with a custom magnetic envelope closure, reinforced edges, and champagne gold brushed brass accents.',
    material: '100% Certified Saffiano Full Grain Cowhide, Solid Brushed Brass',
    specs: {
      'Dimensions': '21cm x 14cm x 7cm',
      'Strap Drop': '52cm - 58cm Adjustable Crossbody',
      'Interior': 'Suede-lined dual compartment with RFID-blocking card slot',
      'Weight': '420g Ultra-lightweight'
    },
    inStock: true,
    stockCount: 12,
    tags: ['Leather', 'Crossbody', 'Handbag', 'Tuscan Leather'],
    featured: true,
    seller: {
      id: 'sel-3',
      name: 'Atelier Marikina & Milan',
      gcashNumber: '0920-551-7890',
      rating: 4.88,
      verified: true,
      location: 'Marikina City, Metro Manila'
    },
    createdAt: '2026-07-20'
  },
  {
    id: 'prod-4',
    title: 'Solstice Titanium Hexagonal Sunglasses',
    subtitle: 'Japanese Titanium Frames with 100% UV400 Polarized Green Lenses',
    price: 9800,
    originalPrice: 11500,
    category: 'Eyewear',
    rating: 4.7,
    reviewsCount: 15,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Engineered with ultra-lightweight aerospace-grade Japanese beta-titanium, Solstice features an architectural hexagonal geometry that effortlessly flatters all facial structures.',
    material: 'Pure Grade-5 Beta Titanium, CR-39 Polarized Lenses',
    specs: {
      'Lens Width': '52mm',
      'Bridge Width': '20mm',
      'Temple Length': '145mm',
      'Lens Coating': 'Anti-reflective, Hydrophobic, 100% UVA/UVB Protection'
    },
    inStock: true,
    stockCount: 14,
    tags: ['Titanium', 'Polarized', 'Eyewear', 'Sunglasses'],
    featured: false,
    seller: {
      id: 'sel-1',
      name: 'Aethelgard High Jewelry & Eyewear',
      gcashNumber: '0917-884-2190',
      rating: 4.95,
      verified: true,
      location: 'Makati City, Metro Manila'
    },
    createdAt: '2026-08-01'
  },
  {
    id: 'prod-5',
    title: 'Verona Emerald Solitaire Signet Ring',
    subtitle: 'Lab-Grown Colombian Emerald Set in Sterling Silver 925 & 14k Vermeil',
    price: 12900,
    originalPrice: 15000,
    category: 'Jewelry',
    rating: 4.9,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A bold statement signet ring featuring a deep forest emerald-cut stone. Polished to a mirror finish with beveled shoulders and comfortable tapered band.',
    material: '925 Sterling Silver with 2.5 Micron 14K Gold Vermeil, Lab Colombian Emerald (2.4 ct)',
    specs: {
      'Stone Dimensions': '9mm x 7mm Octagon Emerald Cut',
      'Band Width': '4mm - 11mm Tapered',
      'Finishing': 'High Polish Mirror Vermeil',
      'Certification': 'Gemological Authenticity Card Included'
    },
    inStock: true,
    stockCount: 7,
    tags: ['Ring', 'Emerald', 'Vermeil', 'Signet'],
    featured: true,
    seller: {
      id: 'sel-4',
      name: 'Lumina Gemworks',
      gcashNumber: '0919-443-8120',
      rating: 4.92,
      verified: true,
      location: 'Cebu City, Central Visayas'
    },
    createdAt: '2026-08-05'
  },
  {
    id: 'prod-6',
    title: 'Heritage Full-Grain Bridle Leather Belt',
    subtitle: 'Solid Antique Brass Buckle with Hand-stitched Saddle Thread',
    price: 4950,
    originalPrice: 5800,
    category: 'Belts & Leather',
    rating: 4.8,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Vegetable-tanned English Bridle leather that patinas richly over decades. Hand-beveled and edge-waxed using natural beeswax, with a durable solid brass prong buckle.',
    material: '10-12oz Heavy Vegetable-Tanned Full Grain Leather, Solid Sandcast Brass',
    specs: {
      'Width': '35mm (1.38 inches)',
      'Buckle': 'Solid Antique Cast Brass',
      'Edge Finish': 'Hand-Burnished Japanese Tokonole & Beeswax',
      'Guarantee': 'Lifetime Stitching Guarantee'
    },
    inStock: true,
    stockCount: 20,
    tags: ['Belt', 'Bridle Leather', 'Menswear', 'Accessories'],
    featured: false,
    seller: {
      id: 'sel-3',
      name: 'Atelier Marikina & Milan',
      gcashNumber: '0920-551-7890',
      rating: 4.88,
      verified: true,
      location: 'Marikina City, Metro Manila'
    },
    createdAt: '2026-08-08'
  },
  {
    id: 'prod-7',
    title: 'Florentine Botanica Mulberry Silk Twill Scarf',
    subtitle: 'Hand-Rolled Edges with Renaissance Floral Tapestry Print',
    price: 6800,
    originalPrice: 8200,
    category: 'Scarves & Hats',
    rating: 4.9,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Woven from 100% 16mm Mulberry Silk Twill, this 90x90cm carré showcases archival Italian botanical sketches in rich terracotta, deep emerald, and gold borders. Drapes fluidly around the neck, hair, or handbag handle.',
    material: '100% Grade 6A Mulberry Silk Twill (16 Momme)',
    specs: {
      'Dimensions': '90cm x 90cm (35.4" x 35.4")',
      'Hemming': 'Hand-rolled & hand-sewn roulotté edges',
      'Care': 'Dry clean or gentle cold water silk wash'
    },
    inStock: true,
    stockCount: 15,
    tags: ['Silk', 'Scarf', 'Luxury', 'Florentine'],
    featured: false,
    seller: {
      id: 'sel-4',
      name: 'Lumina Gemworks & Textiles',
      gcashNumber: '0919-443-8120',
      rating: 4.92,
      verified: true,
      location: 'Cebu City, Central Visayas'
    },
    createdAt: '2026-08-11'
  },
  {
    id: 'prod-8',
    title: 'Luminary Pavé Diamond Bangle Bracelet',
    subtitle: 'Conflict-free Lab Diamonds in 14K White Gold Clasp Setting',
    price: 26500,
    originalPrice: 31000,
    category: 'Jewelry',
    rating: 5.0,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Dazzling row of 42 micro-pavé set round brilliant lab diamonds (VVS1 clarity, E-F color) integrated into a sleek hinged oval bangle. Secure double-locking safety latch.',
    material: '14K Solid White Gold, 1.25 Total Carat Weight Lab Diamonds',
    specs: {
      'Diamond Specs': '42 Round Brilliant Cuts, VVS1-VS1, Color E/F',
      'Inner Diameter': '58mm x 50mm (Standard Medium Wrist)',
      'Locking': 'Concealed box clasp with double figure-8 safety latches'
    },
    inStock: true,
    stockCount: 4,
    tags: ['Diamonds', 'Bangle', 'White Gold', 'Fine Jewelry'],
    featured: true,
    seller: {
      id: 'sel-1',
      name: 'Aethelgard High Jewelry',
      gcashNumber: '0917-884-2190',
      rating: 4.95,
      verified: true,
      location: 'Makati City, Metro Manila'
    },
    createdAt: '2026-08-15'
  }
];
