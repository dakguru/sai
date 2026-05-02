export const ADMIN_EMAIL = 'admin@saiagrofoods.com';
export const ADMIN_PASSWORD = 'admin123';

export const categoryLabels = {
  'edible-oils': 'Cooking Oils',
  'wellness-oils': 'Wellness Oils',
  'pooja-essentials': 'Pooja Essentials',
  snacks: 'Snacks'
};

export const announcementDefaults = [
  'Free shipping across Tamil Nadu on orders ₹999+',
  'Cold-pressed weekly · Wood chekku · Made in Karur'
];

export const seedProducts = [
  {
    id: 'kani-chekku-groundnut-oil',
    slug: 'kani-chekku-groundnut-oil',
    name: 'Kani Chekku Groundnut Oil',
    tamil: 'மரசெக்கு கடலை எண்ணெய்',
    subBrand: 'Kani Chekku',
    category: 'edible-oils',
    tagline: 'The signature pour. Wood-pressed Karur groundnuts, nothing else.',
    shortDesc: 'Sun-dried Karur groundnuts crushed slowly in our mara chekku. Naturally cholesterol-free, rich in MUFA, and unmistakably the oil your grandmother cooked with.',
    longDesc: 'Our flagship oil. We source Andhra-Tamil Nadu border groundnuts from farmers we know by name, sun-dry them for two days, then press them in a wooden chekku turning at less than 12 RPM. The oil settles overnight, is filtered through cotton cloth, and bottled by hand - no solvents, no bleaching, no deodorising. Use it for everyday cooking, deep-frying murukku and vadai, or tempering kuzhambu.',
    nutrition: 'per 100g - Energy 900 kcal · Total fat 100g · Saturated 18g · MUFA 49g · PUFA 33g · Trans fat 0g · Cholesterol 0mg',
    shelfLife: '9 months from manufacture, in a cool dark place',
    badges: ['Bestseller', 'Cold-pressed'],
    variants: [
      { sku: 'KCG-500', size: '500 ml', price: 185, stock: true },
      { sku: 'KCG-1000', size: '1 Litre', price: 349, stock: true, primary: true },
      { sku: 'KCG-5000', size: '5 Litre', price: 1649, stock: true },
      { sku: 'KCG-15000', size: '15 kg Tin', price: 4799, stock: true, tradePack: true }
    ],
    images: ['/images/products/kani-chekku-groundnut-oil/01-hero.svg', '/images/products/kani-chekku-groundnut-oil/02-detail-label.svg', '/images/products/kani-chekku-groundnut-oil/03-pour.svg', '/images/products/kani-chekku-groundnut-oil/04-ingredients.svg', '/images/products/kani-chekku-groundnut-oil/05-context.svg'],
    featured: true,
    batchNo: 'KCG-2605',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z'
  },
  {
    id: 'kani-chekku-gingelly-oil',
    slug: 'kani-chekku-gingelly-oil',
    name: 'Kani Chekku Gingelly Oil',
    tamil: 'நல்லெண்ணெய் — அம்மா செய்ததுபோல',
    subBrand: 'Kani Chekku',
    category: 'edible-oils',
    tagline: 'The Tamil pantry essential - pressed the slow way.',
    shortDesc: 'Cold-pressed til seeds in their richest, darkest form. Indispensable for kuzhambu, idli podi, and the first pour over hot rice.',
    longDesc: 'Gingelly oil - known across Tamil Nadu as nallennai - is the heart of a Tamil kitchen. We press cleaned, sun-dried sesame seeds in our mara chekku and let the oil settle for two nights before bottling. The result is a deep amber oil with the unmistakable nutty aroma of fresh til. Best raw on rice, in kuzhambu vadagam, and for tempering.',
    nutrition: 'per 100g - Energy 900 kcal · Total fat 100g · Saturated 14g · MUFA 40g · PUFA 42g · Trans fat 0g · Cholesterol 0mg',
    shelfLife: '9 months from manufacture',
    badges: ['Wood-pressed', 'Tamil signature'],
    variants: [
      { sku: 'KCN-200', size: '200 ml', price: 119, stock: true },
      { sku: 'KCN-500', size: '500 ml', price: 249, stock: true },
      { sku: 'KCN-1000', size: '1 Litre', price: 479, stock: true, primary: true },
      { sku: 'KCN-5000', size: '5 Litre', price: 2299, stock: true },
      { sku: 'KCN-15000', size: '15 kg Tin', price: 6599, stock: true, tradePack: true }
    ],
    images: ['/images/products/kani-chekku-gingelly-oil/01-hero.svg', '/images/products/kani-chekku-gingelly-oil/02-detail-label.svg', '/images/products/kani-chekku-gingelly-oil/03-pour.svg', '/images/products/kani-chekku-gingelly-oil/04-ingredients.svg', '/images/products/kani-chekku-gingelly-oil/05-context.svg'],
    featured: true,
    batchNo: 'KCN-2605',
    createdAt: '2026-05-01T00:01:00.000Z',
    updatedAt: '2026-05-01T00:01:00.000Z'
  },
  {
    id: 'kani-brand-coconut-oil',
    slug: 'kani-brand-coconut-oil',
    name: 'Kani Brand Coconut Oil',
    tamil: 'தேங்காய் எண்ணெய் — தினசரி பயன்பாட்டிற்கு',
    subBrand: 'Kani Brand',
    category: 'edible-oils',
    tagline: 'Karur copra, Karur kitchen.',
    shortDesc: 'Cold-pressed coconut oil with the unmistakable aroma of fresh-grated copra. For cooking, hair, and the first prayer of the morning.',
    longDesc: 'Sun-dried copra from Tamil Nadu coconut belt, milled at low temperature so the oil keeps its sweet, nutty character. Solid below 24C, liquid above. Use it for thuvayal, poriyal, and every traditional South Indian dish that asks for ennai. Also loved as a daily hair and skin oil.',
    nutrition: 'per 100g - Energy 900 kcal · Total fat 100g · Saturated 87g · MUFA 6g · PUFA 2g · MCT-rich · Trans fat 0g · Cholesterol 0mg',
    shelfLife: '12 months from manufacture',
    badges: ['Cold-pressed', 'Multi-use'],
    variants: [
      { sku: 'KBC-200', size: '200 ml', price: 79, stock: true },
      { sku: 'KBC-500', size: '500 ml', price: 179, stock: true },
      { sku: 'KBC-1000', size: '1 Litre', price: 329, stock: true, primary: true },
      { sku: 'KBC-5000', size: '5 Litre', price: 1549, stock: true },
      { sku: 'KBC-15000', size: '15 kg Tin', price: 4499, stock: true, tradePack: true }
    ],
    images: ['/images/products/kani-brand-coconut-oil/01-hero.svg', '/images/products/kani-brand-coconut-oil/02-detail-label.svg', '/images/products/kani-brand-coconut-oil/03-pour.svg', '/images/products/kani-brand-coconut-oil/04-ingredients.svg', '/images/products/kani-brand-coconut-oil/05-context.svg'],
    featured: true,
    batchNo: 'KBC-2605',
    createdAt: '2026-05-01T00:02:00.000Z',
    updatedAt: '2026-05-01T00:02:00.000Z'
  },
  {
    id: 'kani-chekku-castor-oil',
    slug: 'kani-chekku-castor-oil',
    name: 'Kani Chekku Castor Oil',
    tamil: 'ஆமணக்கு எண்ணெய் — பாரம்பரிய பராமரிப்பு',
    subBrand: 'Kani Chekku',
    category: 'wellness-oils',
    tagline: 'Cold-pressed castor - for hair, skin, and grandmother remedies.',
    shortDesc: '100% cold-pressed castor oil from sun-dried beans. Pure, hexane-free, and undiluted.',
    longDesc: 'Castor seeds are a Tamil household staple - for oil baths, hair treatments, and the occasional medicinal sip. We cold-press them in our chekku and filter them by cloth, never with chemicals. The result is a thick, pale-amber oil that holds its potency.',
    shelfLife: '24 months from manufacture',
    badges: ['Hexane-free', 'Cosmetic-grade'],
    variants: [
      { sku: 'KCC-200', size: '200 ml', price: 95, stock: true },
      { sku: 'KCC-500', size: '500 ml', price: 219, stock: true },
      { sku: 'KCC-1000', size: '1 Litre', price: 399, stock: true, primary: true },
      { sku: 'KCC-5000', size: '5 Litre', price: 1899, stock: true },
      { sku: 'KCC-15000', size: '15 kg Tin', price: 5499, stock: true, tradePack: true }
    ],
    images: ['/images/products/kani-chekku-castor-oil/01-hero.svg', '/images/products/kani-chekku-castor-oil/02-detail-label.svg', '/images/products/kani-chekku-castor-oil/03-pour.svg', '/images/products/kani-chekku-castor-oil/04-ingredients.svg', '/images/products/kani-chekku-castor-oil/05-context.svg'],
    featured: false,
    batchNo: 'KCC-2605',
    createdAt: '2026-05-01T00:03:00.000Z',
    updatedAt: '2026-05-01T00:03:00.000Z'
  },
  {
    id: 'kani-brand-lamp-oil',
    slug: 'kani-brand-lamp-oil',
    name: 'Kani Brand Lamp Oil',
    tamil: 'விளக்கெண்ணெய் — தூய தீபம்',
    subBrand: 'Kani Brand',
    category: 'pooja-essentials',
    tagline: 'A clean, steady flame for every threshold.',
    shortDesc: 'Pure lamp oil for daily pooja - burns cleanly, smells faintly floral, and leaves no soot on your kuthuvilakku.',
    longDesc: 'A specially refined oil blended for traditional Tamil lamps. It burns with a steady golden flame, produces no harsh smoke, and keeps wicks soft. Designed for daily kuthuvilakku, agalvilakku, and festival lighting. Not for cooking.',
    shelfLife: '24 months from manufacture',
    badges: ['Soot-free', 'Long burn'],
    variants: [
      { sku: 'KBL-200', size: '200 ml', price: 65, stock: true },
      { sku: 'KBL-500', size: '500 ml', price: 149, stock: true },
      { sku: 'KBL-1000', size: '1 Litre', price: 279, stock: true, primary: true },
      { sku: 'KBL-5000', size: '5 Litre', price: 1299, stock: true },
      { sku: 'KBL-15000', size: '15 kg Tin', price: 3799, stock: true, tradePack: true }
    ],
    images: ['/images/products/kani-brand-lamp-oil/01-hero.svg', '/images/products/kani-brand-lamp-oil/02-detail-label.svg', '/images/products/kani-brand-lamp-oil/03-pour.svg', '/images/products/kani-brand-lamp-oil/04-ingredients.svg', '/images/products/kani-brand-lamp-oil/05-context.svg'],
    featured: false,
    batchNo: 'KBL-2605',
    createdAt: '2026-05-01T00:04:00.000Z',
    updatedAt: '2026-05-01T00:04:00.000Z'
  },
  {
    id: 'sai-roasted-peanuts',
    slug: 'sai-roasted-peanuts',
    name: 'Sai Roasted Peanuts',
    tamil: 'வறுத்த நிலக்கடலை — மிருதுவான மொறுமொறுப்பு',
    subBrand: 'Sai',
    category: 'snacks',
    tagline: "Karur's groundnuts. Slow-roasted in their own oil.",
    shortDesc: 'Hand-sorted Karur groundnuts dry-roasted with a whisper of salt. Crunchy, sweet, never oily.',
    longDesc: "We use the same groundnuts we press for oil - sized, sorted, and slow-roasted in shallow iron kadais so every nut keeps its skin-on snap. Lightly salted. Sealed in a foil-lined pouch the day they're roasted. Eat them by the handful, throw them on upma, or grind them into chutney.",
    nutrition: 'per 100g - Energy 567 kcal · Protein 26g · Fat 49g · Fibre 8g',
    shelfLife: '4 months from manufacture',
    badges: ['Hand-sorted', 'Slow-roasted'],
    variants: [{ sku: 'SRP-1000', size: '1 kg Pouch', price: 329, stock: true, primary: true }],
    images: ['/images/products/sai-roasted-peanuts/01-hero.svg', '/images/products/sai-roasted-peanuts/02-detail-label.svg', '/images/products/sai-roasted-peanuts/03-pour.svg', '/images/products/sai-roasted-peanuts/04-ingredients.svg', '/images/products/sai-roasted-peanuts/05-context.svg'],
    featured: true,
    batchNo: 'SRP-2605',
    createdAt: '2026-05-01T00:05:00.000Z',
    updatedAt: '2026-05-01T00:05:00.000Z'
  },
  {
    id: 'sai-gold-palm-oil',
    slug: 'sai-gold-palm-oil',
    name: 'Sai Gold Palm Oil Box',
    tamil: 'சாய் கோல்ட் — சமையல் ஆதாரம்',
    subBrand: 'Sai Gold',
    category: 'edible-oils',
    tagline: 'Refined palm oil - clean, neutral, dependable.',
    shortDesc: 'RBD palmolein in our tamper-proof Sai Gold box. Made for kitchens that fry every day.',
    longDesc: 'Refined, bleached, and deodorised palmolein - the everyday oil of caterers, snack makers, and busy kitchens. High smoke point, long shelf life, and a clean neutral taste that lets your spices do the talking. Packaged in our signature corrugated Sai Gold box for easy storage and transport.',
    shelfLife: '12 months from manufacture',
    badges: ['Bulk', 'Trade pack'],
    variants: [{ sku: 'SGP-15000', size: 'Standard Box (~15 kg)', price: 2199, stock: true, primary: true, tradePack: true }],
    images: ['/images/products/sai-gold-palm-oil/01-hero.svg', '/images/products/sai-gold-palm-oil/02-detail-label.svg', '/images/products/sai-gold-palm-oil/03-pour.svg', '/images/products/sai-gold-palm-oil/04-ingredients.svg', '/images/products/sai-gold-palm-oil/05-context.svg'],
    featured: false,
    batchNo: 'SGP-2605',
    createdAt: '2026-05-01T00:06:00.000Z',
    updatedAt: '2026-05-01T00:06:00.000Z'
  }
];

export function primaryVariant(product) {
  return product.variants.find((variant) => variant.primary) || product.variants[0];
}

export function productPriceRange(product) {
  const prices = product.variants.map((variant) => variant.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `₹${min.toLocaleString('en-IN')}` : `₹${min.toLocaleString('en-IN')} - ₹${max.toLocaleString('en-IN')}`;
}
