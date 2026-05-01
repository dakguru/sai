import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Factory,
  Filter,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Star,
  Truck,
  Wheat,
  X,
  Zap
} from 'lucide-react';
import './styles.css';

const products = [
  {
    id: 'groundnut-oil',
    name: 'Cold Pressed Groundnut Oil',
    category: 'Edible Oils',
    type: 'Groundnut',
    price: 329,
    size: '1 Litre',
    hero: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=1200&q=85',
    badge: 'Best Seller',
    desc: 'Sun-dried Karur groundnuts, crushed slowly in our mara chekku, settled overnight, and bottled by hand.',
    benefits: ['Rich nutty flavour', 'Ideal for deep frying', 'No added preservatives'],
    usage: 'Use for dosa, stir fry, chutney tempering, snacks and traditional sweets.'
  },
  {
    id: 'sesame-oil',
    name: 'Traditional Sesame Oil',
    category: 'Edible Oils',
    type: 'Sesame',
    price: 389,
    size: '1 Litre',
    hero: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=1200&q=85',
    badge: 'Cold Pressed',
    desc: 'Deep golden gingelly oil with a clean sesame aroma and smooth finish.',
    benefits: ['Traditional cooking staple', 'Naturally antioxidant rich', 'Great for pickles'],
    usage: 'Perfect for kuzhambu, podi rice, pickling and oil bath traditions.'
  },
  {
    id: 'coconut-oil',
    name: 'Virgin Coconut Oil',
    category: 'Edible Oils',
    type: 'Coconut',
    price: 299,
    size: '500 ml',
    hero: 'https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=1200&q=85',
    badge: 'Fresh Batch',
    desc: 'Naturally fragrant coconut oil packed in small batches for freshness.',
    benefits: ['Clean aroma', 'Multipurpose kitchen use', 'Small-batch packed'],
    usage: 'Use in Kerala-style cooking, baking, hair care and daily wellness routines.'
  },
  {
    id: 'premium-peanuts',
    name: 'Raw Karur Peanuts',
    category: 'Peanuts',
    type: 'Raw',
    price: 179,
    size: '1 kg',
    hero: 'https://images.unsplash.com/photo-1567892737950-30c4db37cd89?auto=format&fit=crop&w=1200&q=85',
    badge: 'Farm Grade',
    desc: 'Uniformly sorted peanuts for cooking, roasting, chutney and oil extraction.',
    benefits: ['Bold kernels', 'Clean sorted stock', 'Bulk-ready supply'],
    usage: 'Roast for snacks, grind for chutneys, or use in sweets and savouries.'
  },
  {
    id: 'bulk-groundnut',
    name: 'Groundnut Oil Bulk Tin',
    category: 'Edible Oils',
    type: 'Groundnut',
    price: 2890,
    size: '15 kg',
    hero: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85',
    badge: 'Bulk Buyer',
    desc: 'Manufacturer-direct oil tin for hotels, caterers and retail resellers.',
    benefits: ['Wholesale pricing', 'Batch traceability', 'Reliable dispatch'],
    usage: 'Designed for restaurants, sweet stalls, grocery stores and distributors.'
  },
  {
    id: 'roasted-peanuts',
    name: 'Roasted & Salted Peanuts',
    category: 'Peanuts',
    type: 'Roasted',
    price: 129,
    size: '500 g',
    hero: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?auto=format&fit=crop&w=1200&q=85',
    badge: 'Snack Pack',
    desc: 'Crunchy roasted peanuts with a clean, naturally sweet finish.',
    benefits: ['Protein rich snack', 'Freshly roasted', 'Family pack'],
    usage: 'Serve as tea-time snack, salad topping, chaat mix or travel food.'
  },
  {
    id: 'sunflower-oil',
    name: 'Cold Pressed Sunflower Oil',
    category: 'Edible Oils',
    type: 'Sunflower',
    price: 279,
    size: '1 Litre',
    hero: 'https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?auto=format&fit=crop&w=1200&q=85',
    badge: 'New Harvest',
    desc: 'Light everyday cooking oil pressed from clean sunflower seeds for modern family kitchens.',
    benefits: ['Light cooking profile', 'Good for daily meals', 'Fresh batch packing'],
    usage: 'Use for poriyal, chapati dough, light frying and everyday family cooking.'
  },
  {
    id: 'jaggery-peanuts',
    name: 'Jaggery Coated Peanuts',
    category: 'Peanuts',
    type: 'Jaggery',
    price: 99,
    size: '200 g',
    hero: 'https://images.unsplash.com/photo-1606791405792-1004f1718d0c?auto=format&fit=crop&w=1200&q=85',
    badge: 'Kadalai Mittai',
    desc: 'Crunchy peanuts coated with jaggery for a nostalgic Tamil Nadu snack.',
    benefits: ['Traditional sweet', 'Travel friendly', 'No artificial colour'],
    usage: 'Serve after meals, pack for school snacks, or pair with evening tea.'
  },
  {
    id: 'masala-peanuts',
    name: 'Masala Peanuts',
    category: 'Peanuts',
    type: 'Masala',
    price: 89,
    size: '200 g',
    hero: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=85',
    badge: 'Snack Pack',
    desc: 'Spiced peanut snack with a crisp coating and balanced masala heat.',
    benefits: ['Crisp texture', 'Tea-time favourite', 'Party bowl ready'],
    usage: 'Use as a snack, chaat topping, lunchbox crunch or travel companion.'
  }
];

const testimonials = [
  ['Reliable quality every month. The groundnut oil aroma is exactly what our customers ask for.', 'Ramesh K.', 'Karur Grocery Partner'],
  ['We switched to Sai Agro Foods for our home cooking. The sesame oil tastes traditional and clean.', 'Meena S.', 'Retail Customer'],
  ['Bulk supply, clear communication and consistent packing. A strong manufacturer-direct partner.', 'Arun Caterers', 'Food Service Buyer']
];

const process = [
  ['Raw Material Selection', 'Bold peanuts and oil seeds are checked for freshness and consistency.', Wheat],
  ['Cleaning & Sorting', 'Dust, stones and immature kernels are removed before pressing.', Filter],
  ['Cold Press Extraction', 'Slow extraction protects aroma, texture and natural character.', Factory],
  ['Settling & Filtration', 'Oil is naturally settled and filtered for clean everyday cooking.', ShieldCheck],
  ['Batch Packing', 'Every pack is sealed with care for retail and bulk buyers.', PackageCheck]
];

function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sai-agro-cart') || '[]');
    } catch {
      return [];
    }
  });
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [query, setQuery] = useState('');
  const [quickView, setQuickView] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 650);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('sai-agro-cart', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredProducts = useMemo(() => {
    const list = products
      .filter((product) => category === 'All' || product.category === category)
      .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'low') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  function go(nextPage) {
    setPage(nextPage);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addToCart(product, qty = 1) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) return items.map((item) => (item.id === product.id ? { ...item, qty: item.qty + qty } : item));
      return [...items, { ...product, qty }];
    });
  }

  function updateQty(id, delta) {
    setCart((items) =>
      items
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    );
  }

  return (
    <>
      {!loaded && <Loader />}
      <SkipLink />
      <AnnouncementBar />
      <OilDropCursor />
      <Header page={page} go={go} cartCount={cartCount} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main id="content">
        {page === 'home' && (
          <Home
            go={go}
            addToCart={addToCart}
            setQuickView={setQuickView}
            setSelectedProduct={setSelectedProduct}
          />
        )}
        {page === 'about' && <About />}
        {page === 'products' && (
          <Products
            filteredProducts={filteredProducts}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            query={query}
            setQuery={setQuery}
            addToCart={addToCart}
            setQuickView={setQuickView}
            setSelectedProduct={(product) => {
              setSelectedProduct(product);
              go('details');
            }}
          />
        )}
        {page === 'details' && <Details product={selectedProduct} addToCart={addToCart} go={go} setSelectedProduct={setSelectedProduct} />}
        {page === 'cart' && <Cart cart={cart} subtotal={subtotal} updateQty={updateQty} go={go} />}
        {page === 'checkout' && <CheckoutPage cart={cart} subtotal={subtotal} go={go} />}
        {page === 'process' && <ProcessPage go={go} />}
        {page === 'recipes' && <RecipesPage />}
        {page === 'faq' && <FAQPage />}
        {page === 'thankyou' && <ThankYou go={go} />}
        {page === 'contact' && <Contact />}
        {page === 'blog' && <Blog />}
      </main>
      <Footer go={go} />
      <a className="whatsapp" href="https://wa.me/919876543210?text=Hello%20Sai%20Agro%20Foods" target="_blank" rel="noreferrer" aria-label="WhatsApp Sai Agro Foods">
        <Phone size={22} />
      </a>
      {quickView && <QuickView product={quickView} close={() => setQuickView(null)} addToCart={addToCart} />}
    </>
  );
}

function SkipLink() {
  return <a className="skip-link" href="#content">Skip to content</a>;
}

function AnnouncementBar() {
  return (
    <div className="announcement">
      <span>Free shipping across Tamil Nadu on orders ₹999+</span>
      <span>Cold-pressed weekly</span>
      <span>Made in Karur</span>
    </div>
  );
}

function OilDropCursor() {
  const [pos, setPos] = useState({ x: -40, y: -40 });
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;
    const move = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <span className="oil-cursor" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} />;
}

function WaveDivider() {
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path d="M0 40 C180 88 330 5 520 36 C720 68 780 86 990 42 C1180 1 1280 24 1440 48 V90 H0 Z" />
      </svg>
    </div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <div className="drop-mark"><Leaf size={28} /></div>
      <strong>Sai Agro Foods</strong>
      <span>Purity in Every Drop</span>
    </div>
  );
}

function Header({ page, go, cartCount, mobileOpen, setMobileOpen }) {
  const links = [
    ['home', 'Home'],
    ['about', 'About'],
    ['products', 'Products'],
    ['process', 'Process'],
    ['recipes', 'Recipes'],
    ['faq', 'FAQ'],
    ['contact', 'Contact']
  ];
  return (
    <header className="site-header">
      <button className="brand" onClick={() => go('home')} aria-label="Sai Agro Foods home">
        <span className="logo"><Leaf size={24} /><span /></span>
        <span><strong>Sai Agro Foods</strong><small>Purity in Every Drop</small></span>
      </button>
      <nav className={mobileOpen ? 'open' : ''}>
        {links.map(([id, label]) => (
          <button key={id} className={page === id ? 'active' : ''} onClick={() => go(id)}>{label}</button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={() => go('cart')} aria-label="Open cart">
          <ShoppingBag size={21} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        <button className="icon-button menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Home({ go, addToCart, setQuickView, setSelectedProduct }) {
  const [slide, setSlide] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=1800&q=90',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=90',
    'https://images.unsplash.com/photo-1567892737950-30c4db37cd89?auto=format&fit=crop&w=1800&q=90'
  ];

  useEffect(() => {
    const timer = setInterval(() => setSlide((current) => (current + 1) % heroImages.length), 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(38,27,12,.82), rgba(38,27,12,.46), rgba(38,27,12,.12)), url(${heroImages[slide]})` }}>
        <div className="hero-copy reveal">
          <span className="eyebrow"><Sprout size={16} /> Manufacturer Direct from Karur</span>
          <h1>Pressed slow. Poured pure.</h1>
          <span className="tamil-line">மர செக்கு எண்ணெய்</span>
          <p>Wood-pressed edible oils and hand-sorted peanuts, made in small batches at our family mill in Pasupathipalayam, Karur.</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => go('products')}>Shop the Harvest <ArrowRight size={18} /></button>
            <button className="secondary" onClick={() => go('process')}>Watch Our Process</button>
          </div>
        </div>
        <div className="hero-panel reveal delay">
          <strong>Fresh Batch Dispatch</strong>
          <span>Groundnut oil, sesame oil and bulk tins packed with batch care.</span>
          <div className="metric-row">
            <b>100%</b><small>Pure & Cold Pressed</small>
          </div>
        </div>
      </section>
      <WaveDivider />
      <TrustBand />
      <section className="section">
        <SectionTitle kicker="This Week's Harvest" title="Fresh from the chekku" action="View all" onAction={() => go('products')} />
        <div className="carousel">
          {products.slice(0, 5).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              setQuickView={setQuickView}
              onDetails={() => {
                setSelectedProduct(product);
                go('details');
              }}
            />
          ))}
        </div>
      </section>
      <section className="about-preview parallax">
        <div>
          <span className="eyebrow"><Leaf size={16} /> Our Promise</span>
          <h2>A mill, a family, a promise.</h2>
          <p>For three generations our family has done one thing well: pressed oil the slow way, in a wooden chekku that turns no faster than a bullock can walk. We never blend, never refine, never rush.</p>
          <button className="primary" onClick={() => go('about')}>Our Story <ArrowRight size={18} /></button>
        </div>
      </section>
      <ProcessTeaser go={go} />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function ProcessTeaser({ go }) {
  return (
    <section className="process-story">
      <div className="chekku-visual" aria-label="Rotating wooden chekku illustration">
        <div className="chekku-wheel"><Leaf size={42} /></div>
      </div>
      <div className="process-steps">
        {['Source', 'Cold-press', 'Settle', 'Bottle'].map((step, index) => (
          <article key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step}</h3>
            <p>{process[index + 1]?.[1] || 'Packed fresh and sent from Karur to your kitchen.'}</p>
          </article>
        ))}
        <button className="primary" onClick={() => go('process')}>See the Process <ArrowRight size={18} /></button>
      </div>
    </section>
  );
}

function TrustBand() {
  const items = [
    [ShieldCheck, '100% Pure & Cold Pressed', 'No shortcuts in extraction'],
    [Factory, 'Direct from Manufacturer', 'Better freshness and pricing'],
    [Award, 'Quality Assurance', 'Batch handled with care'],
    [Truck, 'Retail & Bulk Delivery', 'Homes, shops and hotels']
  ];
  return (
    <section className="trust-band">
      {items.map(([Icon, title, copy]) => (
        <div className="trust-item" key={title}>
          <Icon size={25} />
          <div><strong>{title}</strong><span>{copy}</span></div>
        </div>
      ))}
    </section>
  );
}

function SectionTitle({ kicker, title, action, onAction }) {
  return (
    <div className="section-title">
      <div><span className="kicker">{kicker}</span><h2>{title}</h2></div>
      {action && <button className="text-button" onClick={onAction}>{action} <ArrowRight size={17} /></button>}
    </div>
  );
}

function ProductCard({ product, addToCart, setQuickView, onDetails }) {
  return (
    <article className="product-card">
      <button className="product-image" onClick={onDetails} aria-label={`View ${product.name}`}>
        <img src={product.hero} alt={product.name} />
        <span>{product.badge}</span>
      </button>
      <div className="product-body">
        <small>{product.category} / {product.size}</small>
        <h3>{product.name}</h3>
        <p>{product.desc}</p>
        <div className="price-row">
          <strong>₹{product.price}</strong>
          <button className="icon-button" onClick={() => setQuickView(product)} aria-label={`Quick view ${product.name}`}><Search size={18} /></button>
        </div>
        <button className="primary full" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </article>
  );
}

function About() {
  return (
    <>
      <PageHero title="Rooted in Karur. Made for honest kitchens." copy="Sai Agro Foods brings agricultural sourcing, edible oil manufacturing and practical quality systems together at Pasupathipalayam, Karur." image="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=90" />
      <section className="split-section">
        <div>
          <span className="kicker">Our Story</span>
          <h2>From local produce to trusted everyday oil.</h2>
          <p>Our work begins with a simple standard: oils should taste fresh, smell natural and feel trustworthy. Sai Agro Foods focuses on cold pressed edible oils, peanuts and manufacturer-direct supply for households, retailers and food-service buyers.</p>
          <p>Karur’s agricultural trading culture shapes how we work: clear relationships, practical quality checks and consistency that buyers can rely on.</p>
        </div>
        <div className="mission-grid">
          <div><Heart size={24} /><strong>Vision</strong><span>To make pure traditional oils accessible to modern homes and businesses.</span></div>
          <div><Zap size={24} /><strong>Mission</strong><span>Deliver fresh, traceable and fairly priced products with responsive service.</span></div>
        </div>
      </section>
      <section className="section soft">
        <SectionTitle kicker="Manufacturing Process" title="A careful path from seed to sealed bottle" />
        <div className="process-grid">
          {process.map(([title, copy, Icon], index) => (
            <div className="process-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Products(props) {
  const categories = ['All', 'Edible Oils', 'Peanuts'];
  const types = ['Groundnut', 'Sesame', 'Coconut', 'Sunflower', 'Raw', 'Roasted', 'Jaggery', 'Masala'];
  return (
    <>
      <PageHero title="Shop pure oils and premium peanuts" copy="Filter retail packs and bulk-ready products from Sai Agro Foods." image="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=1800&q=90" compact />
      <section className="shop-layout">
        <aside className="filters">
          <label><Search size={17} /> Search</label>
          <input value={props.query} onChange={(event) => props.setQuery(event.target.value)} placeholder="Groundnut, sesame..." />
          <label><Filter size={17} /> Category</label>
          <div className="segmented">
            {categories.map((item) => <button key={item} className={props.category === item ? 'active' : ''} onClick={() => props.setCategory(item)}>{item}</button>)}
          </div>
          <label>Type</label>
          <div className="chip-list">
            {types.map((item) => <span key={item}>{item}</span>)}
          </div>
          <label>Sort</label>
          <select value={props.sort} onChange={(event) => props.setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </aside>
        <div className="product-grid">
          {props.filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={props.addToCart}
              setQuickView={props.setQuickView}
              onDetails={() => props.setSelectedProduct(product)}
            />
          ))}
          {props.filteredProducts.length === 0 && <div className="empty product-empty"><PackageCheck size={36} /><p>No matches yet. Try fewer filters.</p></div>}
        </div>
      </section>
    </>
  );
}

function Details({ product, addToCart, go, setSelectedProduct }) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('Description');
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  return (
    <>
      <section className="details">
        <div className="zoom-image"><img src={product.hero} alt={product.name} /></div>
        <div className="details-copy">
          <span className="badge">{product.badge}</span>
          <h1>{product.name}</h1>
          <p>{product.desc}</p>
          <div className="stars"><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /> <span>4.9 buyer rating</span></div>
          <strong className="detail-price">₹{product.price} <small>/ {product.size}</small></strong>
          <PurityMeter value={100} />
          <h3>Benefits</h3>
          <ul className="check-list">{product.benefits.map((item) => <li key={item}><CheckCircle2 size={18} /> {item}</li>)}</ul>
          <h3>Usage Suggestions</h3>
          <p>{product.usage}</p>
          <div className="quantity">
            <button className="icon-button" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={18} /></button>
            <span>{qty}</span>
            <button className="icon-button" onClick={() => setQty(qty + 1)}><Plus size={18} /></button>
          </div>
          <div className="hero-actions">
            <button className="primary" onClick={() => addToCart(product, qty)}>Add to Cart</button>
            <button className="secondary" onClick={() => { addToCart(product, qty); go('cart'); }}>Buy Now</button>
            <a className="whatsapp-button" href={`https://wa.me/919876543210?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}%20x%20${qty}`} target="_blank" rel="noreferrer">Buy on WhatsApp</a>
          </div>
          <div className="trust-strip">✓ Cold-pressed weekly · ✓ FSSAI ready · ✓ Ships in 48h · ✓ COD in Tamil Nadu</div>
          <div className="tabs">
            {['Description', 'How made', 'Nutrition', 'Reviews'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}
          </div>
          <p className="tab-panel">{tab === 'Description' ? product.desc : tab === 'How made' ? 'Sorted, cleaned, slow pressed, naturally settled and packed with batch care at Sai Agro Foods.' : tab === 'Nutrition' ? 'Naturally rich cooking oil or peanut nutrition. Final lab values can be added before launch.' : 'Customers praise the fresh aroma, clean taste and reliable packing.'}</p>
        </div>
      </section>
      <section className="section">
        <SectionTitle kicker="Related Products" title="More from this category" />
        <div className="product-grid three">
          {related.map((item) => <ProductCard key={item.id} product={item} addToCart={addToCart} setQuickView={() => {}} onDetails={() => setSelectedProduct(item)} />)}
        </div>
      </section>
    </>
  );
}

function PurityMeter({ value }) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="purity-meter" aria-label={`Cold-press purity ${value} percent`}>
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" />
        <circle className="meter-progress" cx="50" cy="50" r="42" style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <div><strong>{value}%</strong><span>Cold-press purity</span></div>
    </div>
  );
}

function Cart({ cart, subtotal, updateQty, go }) {
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 80;
  const total = subtotal + shipping;
  return (
    <section className="cart-page">
      <div className="cart-items">
        <span className="kicker">Cart & Checkout</span>
        <h1>Review your order</h1>
        {cart.length === 0 && <div className="empty"><ShoppingBag size={34} /><p>Your basket is empty. The harvest is waiting.</p><button className="primary" onClick={() => go('products')}>Browse the Harvest</button></div>}
        {cart.map((item) => (
          <div className="cart-row" key={item.id}>
            <img src={item.hero} alt={item.name} />
            <div><strong>{item.name}</strong><span>{item.size}</span><b>₹{item.price * item.qty}</b></div>
            <div className="quantity compact">
              <button className="icon-button" onClick={() => updateQty(item.id, -1)}><Minus size={16} /></button>
              <span>{item.qty}</span>
              <button className="icon-button" onClick={() => updateQty(item.id, 1)}><Plus size={16} /></button>
            </div>
          </div>
        ))}
      </div>
      <aside className="checkout">
        <h2>Order Summary</h2>
        <div className="summary-line"><span>Subtotal</span><b>₹{subtotal}</b></div>
        <div className="summary-line"><span>Shipping</span><b>{shipping ? `₹${shipping}` : 'Free'}</b></div>
        <div className="summary-line total"><span>Total</span><b>₹{total}</b></div>
        <button className="primary full" onClick={() => go('checkout')}>Proceed to Checkout</button>
        <a className="whatsapp-button full" href="https://wa.me/919876543210?text=I%20want%20to%20place%20an%20order%20with%20Sai%20Agro%20Foods" target="_blank" rel="noreferrer">Order on WhatsApp</a>
      </aside>
    </section>
  );
}

function CheckoutPage({ subtotal, go }) {
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 80;
  const total = subtotal + shipping;
  const [done, setDone] = useState(false);
  return (
    <section className="cart-page">
    <form className="checkout checkout-wide" onSubmit={(event) => { event.preventDefault(); setDone(true); setTimeout(() => go('thankyou'), 500); }}>
      <h2>Secure Checkout</h2>
      <input placeholder="Full name" />
      <input placeholder="Phone number" />
      <input placeholder="Email address" />
      <input placeholder="Street address" />
      <input placeholder="City" />
      <input defaultValue="Tamil Nadu" placeholder="State" />
      <input placeholder="Pincode" />
      <textarea placeholder="Delivery address" rows="4" />
      <select defaultValue="upi">
        <option value="upi">UPI on delivery</option>
        <option value="cod">Cash on Delivery</option>
        <option value="wa">WhatsApp confirmation</option>
      </select>
      <textarea placeholder="Order notes" rows="3" />
      <button className="primary full">Place Secure Order</button>
      {done && <p className="success">Order request captured. Redirecting to thank you.</p>}
    </form>
    <aside className="checkout">
      <h2>Summary</h2>
      <div className="summary-line"><span>Subtotal</span><b>₹{subtotal}</b></div>
      <div className="summary-line"><span>Shipping</span><b>{shipping ? `₹${shipping}` : 'Free'}</b></div>
      <div className="summary-line total"><span>Total</span><b>₹{total}</b></div>
    </aside>
    </section>
  );
}

function ProcessPage({ go }) {
  return (
    <>
      <PageHero title="From seed to bottle in 14 hours" copy="Cleaning, sun-drying, mara chekku pressing, cloth filtration and careful bottling at Sai Agro Foods." image="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=90" compact />
      <section className="section">
        <SectionTitle kicker="Our Process" title="Why slow pressing still matters" />
        <div className="process-grid">
          {process.map(([title, copy, Icon], index) => <div className="process-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon size={28} /><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
        <table className="comparison"><thead><tr><th>Method</th><th>Heat</th><th>Aroma</th><th>Everyday Trust</th></tr></thead><tbody><tr><td>Mara chekku</td><td>Low</td><td>Full</td><td>✓</td></tr><tr><td>Refined oil</td><td>High</td><td>Neutralised</td><td>Varies</td></tr><tr><td>Expeller pressed</td><td>Medium</td><td>Moderate</td><td>✓</td></tr></tbody></table>
        <button className="primary" onClick={() => go('products')}>Taste the Difference</button>
      </section>
    </>
  );
}

function RecipesPage() {
  const recipes = ['Karur-style groundnut chutney', 'Tamil sesame rice', 'Jaggery peanut chikki', 'Sundal with cold pressed oil', 'Vatha kuzhambu temper', 'Coconut oil hair mask'];
  return (
    <section className="section blog-page">
      <SectionTitle kicker="Recipes & Uses" title="Cook the way Karur cooks" />
      <div className="chip-list recipe-filters"><span>Groundnut Oil</span><span>Sesame Oil</span><span>Festival</span><span>Daily</span><span>Snack</span></div>
      <div className="blog-grid">{recipes.map((title) => <article key={title}><span className="kicker">Recipe</span><h3>{title}</h3><p>Simple Tamil kitchen notes with ingredients, steps and the matching Sai Agro Foods product CTA.</p><button className="text-button">View recipe <ArrowRight size={16} /></button></article>)}</div>
    </section>
  );
}

function FAQPage() {
  const [q, setQ] = useState('');
  const faqs = ['Do you ship outside Tamil Nadu?', 'Are your oils cold pressed weekly?', 'Do you support wholesale orders?', 'What is the shelf life?', 'Can I pay by COD?', 'How should I store sesame oil?', 'Do you accept returns?', 'Can restaurants get trade pricing?'];
  const visible = faqs.filter((item) => item.toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="section blog-page">
      <SectionTitle kicker="FAQ" title="Questions, answered." />
      <input className="faq-search" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search ordering, products, shipping..." />
      <div className="faq">{visible.map((item) => <details key={item} open><summary>{item}</summary><p>Yes. Sai Agro Foods handles this with clear communication; final policy numbers and contact details can be filled before launch.</p></details>)}</div>
    </section>
  );
}

function ThankYou({ go }) {
  return (
    <section className="thank-you">
      <CheckCircle2 size={72} />
      <h1>Your basket is on its way</h1>
      <p>Order request SAF-{Date.now().toString().slice(-6)} has been captured. Our team will confirm availability and dispatch details on WhatsApp.</p>
      <button className="primary" onClick={() => go('products')}>Continue Shopping</button>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero title="Visit or contact Sai Agro Foods" copy="Pasupathipalayam, Karur, Tamil Nadu, India." image="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1800&q=90" compact />
      <section className="contact-grid">
        <div className="contact-card">
          <h2>Manufacturer Direct Enquiries</h2>
          <p><MapPin size={18} /> Pasupathipalayam, Karur, Tamil Nadu, India</p>
          <p><Phone size={18} /> +91 98765 43210</p>
          <p><Mail size={18} /> sales@saiagrofoods.in</p>
          <p><Truck size={18} /> Mill hours: Mon-Sat, 8 AM-6 PM</p>
          <iframe title="Sai Agro Foods map" src="https://www.google.com/maps?q=Pasupathipalayam%20Karur%20Tamil%20Nadu&output=embed" loading="lazy" />
        </div>
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <h2>Send a Message</h2>
          <input required placeholder="Name" />
          <input required type="email" placeholder="Email" />
          <input required placeholder="Phone" pattern="[0-9+\s-]{8,}" />
          <select defaultValue="retail"><option value="retail">Retail purchase</option><option value="bulk">Bulk enquiry</option><option value="wholesale">Wholesale</option><option value="other">Other</option></select>
          <textarea required rows="5" placeholder="Tell us what you need" />
          <button className="primary full">Submit Enquiry</button>
          {sent && <p className="success">Thanks. Your enquiry is ready for backend email integration.</p>}
        </form>
      </section>
    </>
  );
}

function Blog() {
  const posts = [
    ['Why cold pressed groundnut oil tastes different', 'Slow extraction protects aroma and creates a fuller cooking flavour.'],
    ['Sesame oil in traditional Tamil kitchens', 'A practical guide to gingelly oil in cooking, pickles and wellness routines.'],
    ['How to choose peanuts for roasting and chutney', 'Look for uniform size, clean sorting and a naturally sweet finish.']
  ];
  return (
    <section className="section blog-page">
      <SectionTitle kicker="Journal" title="Helpful buying notes for healthier kitchens" />
      <div className="blog-grid">
        {posts.map(([title, copy]) => <article key={title}><span className="kicker">Health Benefits</span><h3>{title}</h3><p>{copy}</p><button className="text-button">Read note <ArrowRight size={16} /></button></article>)}
      </div>
    </section>
  );
}

function PageHero({ title, copy, image, compact }) {
  return (
    <section className={`page-hero ${compact ? 'compact' : ''}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(39,28,11,.8), rgba(39,28,11,.34)), url(${image})` }}>
      <div><span className="eyebrow"><Leaf size={16} /> Sai Agro Foods</span><h1>{title}</h1><p>{copy}</p></div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section testimonials">
      <SectionTitle kicker="Customer Reviews" title="Trusted by homes, shops and food-service buyers" />
      <div className="testimonial-grid">
        {testimonials.map(([quote, name, role]) => (
          <article key={name}>
            <div className="stars"><Star fill="currentColor" size={17} /><Star fill="currentColor" size={17} /><Star fill="currentColor" size={17} /><Star fill="currentColor" size={17} /><Star fill="currentColor" size={17} /></div>
            <p>"{quote}"</p><strong>{name}</strong><span>{role}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="newsletter">
      <div><span className="kicker">Fresh Batch Alerts</span><h2>Get product updates, bulk offers and seasonal peanut notes.</h2></div>
      <form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Email address" /><button className="primary">Subscribe</button></form>
    </section>
  );
}

function QuickView({ product, close, addToCart }) {
  return (
    <div className="modal-backdrop" onClick={close}>
      <article className="quick-modal" onClick={(event) => event.stopPropagation()}>
        <button className="icon-button close" onClick={close}><X size={20} /></button>
        <img src={product.hero} alt={product.name} />
        <div>
          <span className="badge">{product.badge}</span>
          <h2>{product.name}</h2>
          <p>{product.desc}</p>
          <strong className="detail-price">₹{product.price}</strong>
          <ul className="check-list">{product.benefits.map((item) => <li key={item}><CheckCircle2 size={17} /> {item}</li>)}</ul>
          <button className="primary full" onClick={() => { addToCart(product); close(); }}>Add to Cart</button>
        </div>
      </article>
    </div>
  );
}

function Footer({ go }) {
  return (
    <footer>
      <div>
        <button className="brand footer-brand" onClick={() => go('home')}><span className="logo"><Leaf size={24} /><span /></span><span><strong>Sai Agro Foods</strong><small>Pressed slow. Poured pure.</small></span></button>
        <p>Pure cold pressed oils and agricultural products from Pasupathipalayam, Karur.</p>
        <p>FSSAI: License number placeholder</p>
      </div>
      <div><strong>Shop</strong><button onClick={() => go('products')}>Edible Oils</button><button onClick={() => go('products')}>Peanuts</button><button onClick={() => go('cart')}>Cart</button></div>
      <div><strong>Company</strong><button onClick={() => go('about')}>About</button><button onClick={() => go('process')}>Process</button><button onClick={() => go('recipes')}>Recipes</button><button onClick={() => go('faq')}>FAQ</button><button onClick={() => go('contact')}>Contact</button></div>
      <div><strong>Contact</strong><span>Pasupathipalayam, Karur</span><span>+91 98765 43210</span><span>sales@saiagrofoods.in</span></div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
