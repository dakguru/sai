import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
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
  Sprout,
  Star,
  Truck,
  Wheat,
  X,
  Zap
} from 'lucide-react';
import {
  announcementDefaults,
  categoryLabels,
  primaryVariant,
  productPriceRange,
  seedProducts
} from './products.js';
import AboutHero from './components/hero/AboutHero.jsx';
import ContactHero from './components/hero/ContactHero.jsx';
import ProcessHero from './components/hero/ProcessHero.jsx';
import ProductsHero from './components/hero/ProductsHero.jsx';
import { supabase } from './lib/supabase.js';
import './styles.css';

const storage = {
  products: 'sai-agro-v2-products',
  cart: 'sai-agro-cart',
  audit: 'sai-agro-audit-log',
  site: 'sai-agro-site-settings',
  orders: 'sai-agro-orders'
};

const routePaths = {
  home: '/',
  about: '/about',
  proprietor: '/about/proprietor',
  products: '/products',
  process: '/process',
  recipes: '/recipes',
  faq: '/faq',
  contact: '/contact',
  blog: '/blog',
  cart: '/cart',
  checkout: '/checkout',
  thankyou: '/thank-you',
  login: '/login',
  account: '/account',
  orders: '/orders',
  admin: '/admin'
};

function pageFromPath(pathname) {
  if (pathname.startsWith('/admin')) return 'admin';
  const match = Object.entries(routePaths).find(([, path]) => path === pathname);
  return match?.[0] || 'home';
}

const siteDefaults = {
  announcements: announcementDefaults,
  footer: {
    address: 'Pasupathipalayam, Karur, Tamil Nadu',
    phone: '+91 99445 34337',
    whatsapp: '919944534337',
    email: 'sales@saiagrofoods.in',
    hours: 'Mon-Sat, 8 AM-6 PM'
  },
  freeShippingThreshold: 999,
  shippingRate: 80,
  bannerEnabled: false,
  bannerText: 'Festival batches now pressing in Karur'
};

const staffRoles = ['admin', 'developer'];

const process = [
  ['Raw Material Selection', 'Bold nuts and seeds are checked for freshness, aroma, and consistency.', Wheat],
  ['Cleaning & Sorting', 'Dust, stones, and immature kernels are removed before pressing.', Filter],
  ['Cold Press Extraction', 'Slow extraction protects aroma, texture, and natural character.', Factory],
  ['Settling & Filtration', 'Oil rests before cotton-cloth filtration and hand packing.', ShieldCheck],
  ['Batch Packing', 'Every pack is sealed with care for retail and trade buyers.', PackageCheck]
];

const testimonials = [
  ['The groundnut oil aroma is exactly what our customers ask for every month.', 'Ramesh K.', 'Karur Grocery Partner'],
  ['The gingelly oil tastes traditional and clean. We use it for kuzhambu and podi rice.', 'Meena S.', 'Retail Customer'],
  ['Bulk supply, clear communication, and consistent packing from a dependable local mill.', 'Arun Caterers', 'Food Service Buyer']
];

const proprietorContent = {
  name: 'Dr. Saravana Kumar',
  credentials: 'Ph.D.',
  title: 'Proprietor',
  org: 'Sai Agro Foods',
  location: 'Pasupathipalayam, Karur - 639 004',
  photo: '/images/proprietor-md.png',
  teaser: 'A doctorate-trained engineer and second-generation custodian of a respected Karur agri-food legacy, Dr. Saravana Kumar leads Sai Agro Foods with a quiet conviction: that purity, traceability, and tradition are not luxuries - they are the everyday standard.',
  pullQuote: {
    text: "Every drop of oil we produce eventually reaches a mother's kitchen, a child's plate, or an elder's lamp - let us never forget the sanctity of that journey.",
    attribution: 'Dr. Saravana Kumar'
  },
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      body: [
        'Dr. Saravana Kumar, Ph.D., proprietor of Sai Agro Foods, represents a rare blend of academic discipline, practical manufacturing knowledge, and deep respect for the food traditions of Karur. His leadership is rooted in the belief that an edible oil business must serve families with honesty before it serves markets with scale.',
        'At Sai Agro Foods, he guides the company with a steady focus on purity, traceability, and consistency. From sourcing agricultural produce to packing the final bottle, his approach keeps the consumer kitchen at the centre of every decision.'
      ]
    },
    {
      id: 'academic',
      title: 'Academic Distinction and Technical Mastery',
      body: [
        'With doctoral training in engineering, Dr. Saravana Kumar brings a technical mind to every stage of edible oil production. His academic background helps him evaluate machinery, process controls, product consistency, and quality systems with unusual clarity.',
        'This technical foundation allows Sai Agro Foods to combine traditional food values with modernised production discipline, ensuring that heritage methods are strengthened by measurement, hygiene, and repeatable standards.'
      ]
    },
    {
      id: 'legacy',
      title: 'Stewardship of a Family Legacy',
      body: [
        'Sai Agro Foods is more than a commercial enterprise; it is a Karur-rooted family legacy carried forward with responsibility. As a second-generation custodian, Dr. Saravana Kumar honours the trust built by the family while preparing the brand for contemporary consumers.',
        'His stewardship is defined by continuity without complacency. The company remains grounded in local relationships, yet continues to improve its systems, presentation, and reach.'
      ]
    },
    {
      id: 'expertise',
      title: 'Expertise in Edible Oils and Agricultural Foods',
      body: [
        'Dr. Saravana Kumar has developed hands-on expertise across edible oils, wellness oils, pooja essentials, roasted peanuts, and agricultural food products. He understands that each category has its own rhythm of sourcing, processing, shelf life, aroma, and consumer expectation.',
        'That understanding shapes the way Sai Agro Foods selects raw material, handles batches, filters oils, and packs products for households, retailers, and trade buyers.'
      ]
    },
    {
      id: 'quality',
      title: 'Champion of Food Safety and Quality Assurance',
      body: [
        'Food safety is central to his leadership philosophy. For Dr. Saravana Kumar, quality assurance is not a certificate framed on a wall; it is a daily practice visible in cleanliness, batch discipline, packaging care, and transparent communication.',
        'He believes every product must earn its place in a family kitchen through consistency. This attention to detail is what gives Sai Agro Foods its quiet confidence.'
      ]
    },
    {
      id: 'expansion',
      title: 'Expansion Across Tamil Nadu and Neighbouring States',
      body: [
        'Under his guidance, Sai Agro Foods is positioned to serve customers across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Puducherry, and Telangana. The ambition is practical: grow reach without diluting the standard of the product.',
        'This expansion is built on reliable supply, clear trade communication, and a brand promise that remains easy for customers to understand: pressed slow, poured pure.'
      ]
    },
    {
      id: 'global',
      title: 'A Globally Travelled Visionary',
      body: [
        'Dr. Saravana Kumar brings a globally travelled perspective to a deeply local enterprise. Exposure to different markets, production cultures, and consumer expectations has sharpened his understanding of how regional food brands can become more professional without losing their soul.',
        'His outlook encourages Sai Agro Foods to think beyond commodity selling and toward stronger packaging, better systems, and wider trust.'
      ]
    },
    {
      id: 'farmers',
      title: 'Empowering Farmers and Rural Communities',
      body: [
        'The strength of an agri-food business begins with the people who grow, handle, and move agricultural produce. Dr. Saravana Kumar values farmer relationships and rural supply networks as essential partners in the Sai Agro Foods story.',
        'His approach supports fair dealing, dependable procurement, and long-term relationships that allow both producers and consumers to benefit from cleaner food systems.'
      ]
    },
    {
      id: 'sustainability',
      title: 'Sustainability and Ethical Business Practices',
      body: [
        'Sustainability, for Sai Agro Foods, is not a fashionable slogan. It means respecting raw materials, reducing waste where possible, avoiding careless shortcuts, and building an enterprise that can serve customers responsibly for years.',
        'Dr. Saravana Kumar connects ethical practice with business strength: a brand that behaves carefully earns durable trust.'
      ]
    },
    {
      id: 'industry',
      title: 'Industry Engagement and Thought Leadership',
      body: [
        'As proprietor, Dr. Saravana Kumar keeps close watch on the changing expectations of edible oil customers, food safety systems, retail distribution, and agri-food branding. His leadership reflects both industry awareness and practical manufacturing judgement.',
        'He sees Sai Agro Foods as part of a larger movement toward cleaner, traceable, regionally proud Indian food brands.'
      ]
    },
    {
      id: 'philosophy',
      title: 'Personal Philosophy and Leadership Style',
      body: [
        'His personal philosophy is simple and demanding: food is medicine when it is made with respect. This belief informs his calm, detail-oriented leadership style and his insistence that everyday products deserve serious care.',
        'Within the company, he leads with patience, accountability, and a preference for steady improvement over loud promises.'
      ]
    },
    {
      id: 'future',
      title: 'Vision for the Future',
      body: [
        'Dr. Saravana Kumar envisions Sai Agro Foods growing into a trusted South Indian agri-food brand known for purity, traceability, and dependable service. The future he is building includes stronger product lines, wider distribution, and systems that support both household and trade customers.',
        'The goal is not only to sell more bottles, but to make every bottle represent the same care that shaped the company at its source.'
      ]
    },
    {
      id: 'closing',
      title: 'Closing Note',
      body: [
        'Dr. Saravana Kumar stands for a form of leadership that is measured, principled, and rooted in service. His work at Sai Agro Foods carries forward a Karur legacy while preparing it for the expectations of a new generation.',
        'In his hands, the brand remains close to the soil, close to the kitchen, and close to the standard that matters most: honest food, made well.'
      ]
    }
  ]
};

const blankProduct = () => ({
  id: `product-${Date.now()}`,
  slug: '',
  name: '',
  tamil: '',
  subBrand: 'Kani Chekku',
  category: 'edible-oils',
  tagline: '',
  shortDesc: '',
  longDesc: '',
  nutrition: '',
  shelfLife: '',
  badges: [],
  variants: [{ sku: '', size: '1 Litre', price: 0, stock: true, primary: true }],
  images: [],
  featured: false,
  batchNo: `SAF-${String(Date.now()).slice(-4)}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => readJson(key, fallback));
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formatInr(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`;
}

function variantKey(product, variant) {
  return `${product.slug}:${variant.sku}`;
}

function categoryText(category) {
  return categoryLabels[category] || category;
}

function App() {
  const initialRoute = pageFromPath(window.location.pathname);
  const [page, setPage] = useState(initialRoute);
  const [adminPage, setAdminPage] = useState(window.location.pathname.includes('/admin/products') ? 'products' : 'dashboard');
  const [products, setProducts] = useState(seedProducts);
  const [site, setSite] = useStoredState(storage.site, siteDefaults);
  const [cart, setCart] = useStoredState(storage.cart, []);
  const [audit, setAudit] = useStoredState(storage.audit, []);
  const [orders, setOrders] = useStoredState(storage.orders, []);
  const [category, setCategory] = useState('All');
  const [subBrand, setSubBrand] = useState('All');
  const [packSize, setPackSize] = useState('All');
  const [sort, setSort] = useState('featured');
  const [query, setQuery] = useState('');
  const [quickView, setQuickView] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [actorEmail, setActorEmail] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 450);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let active = true;

    async function handleAuthRedirect() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      if (!code) return;

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) console.error('Failed to exchange auth code for session', error);

      url.searchParams.delete('code');
      const next = url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : '') + url.hash;
      window.history.replaceState({}, '', next);
    }

    async function restoreSession() {
      await handleAuthRedirect();
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setAuthLoading(false);
        return;
      }

      if (!active) return;
      setSession(data.session);

      if (data.session?.user) {
        try {
          const nextProfile = await loadUserProfile(data.session.user);
          if (!active) return;
          setUserProfile(nextProfile);
        } catch {
          if (!active) return;
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }

      setAuthLoading(false);
    }

    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);

      if (_event === 'PASSWORD_RECOVERY') {
        setAuthMode('recovery');
        setPage('login');
        window.history.pushState({}, '', routePaths.login);
      }

      if (!nextSession?.user) {
        setUserProfile(null);
        setAuthLoading(false);
        return;
      }

      try {
        const nextProfile = await loadUserProfile(nextSession.user);
        setUserProfile(nextProfile);
      } catch {
        setUserProfile(null);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('data')
        .eq('archived', false);

      if (error) {
        console.error('Failed to load products from Supabase', error);
        return;
      }

      if (!cancelled && data?.length) {
        setProducts(data.map((row) => row.data));
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeProduct = products.find((item) => item.slug === selectedProduct?.slug) || products[0];
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredProducts = useMemo(() => {
    const list = products
      .filter((product) => !product.archived)
      .filter((product) => {
        if (category === 'All') return true;
        if (category === 'Bulk / Trade') return product.variants.some((variant) => variant.tradePack);
        return product.category === category;
      })
      .filter((product) => subBrand === 'All' || product.subBrand === subBrand)
      .filter((product) => packSize === 'All' || product.variants.some((variant) => variant.size.includes(packSize) || (packSize === 'Box' && variant.size.includes('Box'))))
      .filter((product) => `${product.name} ${product.subBrand} ${product.shortDesc}`.toLowerCase().includes(query.toLowerCase()));

    if (sort === 'low') return [...list].sort((a, b) => primaryVariant(a).price - primaryVariant(b).price);
    if (sort === 'high') return [...list].sort((a, b) => primaryVariant(b).price - primaryVariant(a).price);
    if (sort === 'newest') return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [category, packSize, products, query, sort, subBrand]);

  function pushPath(nextPage) {
    const path = routePaths[nextPage] || '/';
    window.history.pushState({}, '', path);
  }

  function go(nextPage) {
    setPage(nextPage);
    setMobileOpen(false);
    pushPath(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openAuth(mode) {
    setAuthMode(mode);
    go('login');
  }

  function log(action, entity, delta) {
    setAudit((items) => [{ at: new Date().toISOString(), email: actorEmail || 'system', action, entity, delta }, ...items].slice(0, 80));
  }

  async function saveProducts(nextProducts, action = 'save', entity = 'product catalog', delta = 'Updated product data') {
    const normalizedProducts = nextProducts.map((product) => ({ ...product, updatedAt: product.updatedAt || new Date().toISOString() }));

    setProducts(normalizedProducts);
    log(action, entity, delta);

    const payload = normalizedProducts.map((product) => ({
      id: product.id,
      slug: product.slug,
      featured: !!product.featured,
      archived: !!product.archived,
      data: product,
      updated_at: product.updatedAt
    }));

    const { error } = await supabase.from('products').upsert(payload);

    if (error) {
      console.error('Failed to save products to Supabase', error);
    }
  }

  function addToCart(product, variant = primaryVariant(product), qty = 1) {
    const itemId = variantKey(product, variant);
    setCart((items) => {
      const existing = items.find((item) => item.id === itemId);
      if (existing) return items.map((item) => (item.id === itemId ? { ...item, qty: item.qty + qty } : item));
      return [...items, {
        id: itemId,
        productSlug: product.slug,
        sku: variant.sku,
        name: product.name,
        size: variant.size,
        price: variant.price,
        image: product.images[0],
        qty
      }];
    });
  }

  function updateQty(id, delta) {
    setCart((items) => items.map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)).filter((item) => item.qty > 0));
  }

  async function captureOrder(customer) {
    const order = {
      id: `SAF-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      userId: session?.user?.id || null,
      customer,
      items: cart,
      total: subtotal + (subtotal > site.freeShippingThreshold || subtotal === 0 ? 0 : site.shippingRate)
    };
    setOrders((items) => [order, ...items]);
    log('create', 'order', `${order.id} captured from checkout`);
    setCart([]);

    const { error } = await supabase.from('orders').insert({
      id: order.id,
      customer: order.customer,
      items: order.items,
      total: order.total,
      status: order.status,
      created_at: order.createdAt
    });

    if (error) {
      console.error('Failed to save order to Supabase', error);
    }

    if (session?.user && userProfile) {
      const nextProfile = {
        ...userProfile,
        full_name: customer.name || userProfile.full_name,
        phone: customer.phone || userProfile.phone,
        address_line1: customer.address || userProfile.address_line1,
        city: customer.city || userProfile.city,
        state: customer.state || userProfile.state,
        pincode: customer.pincode || userProfile.pincode
      };

      setUserProfile(nextProfile);

      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: session.user.id,
          email: session.user.email?.toLowerCase() || userProfile.email,
          full_name: nextProfile.full_name,
          phone: nextProfile.phone,
          address_line1: nextProfile.address_line1,
          address_line2: nextProfile.address_line2 || null,
          city: nextProfile.city,
          state: nextProfile.state,
          pincode: nextProfile.pincode,
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error('Failed to save checkout details to Supabase', profileError);
      }
    }
  }

  return (
    <>
      {!loaded && <Loader />}
      {page !== 'admin' && <SkipLink />}
      {page !== 'admin' && <AnnouncementBar messages={page === 'home' ? announcementDefaults : site.announcements} />}
      {page !== 'admin' && <OilDropCursor />}
      {page !== 'admin' && <Header page={page} go={go} openAuth={openAuth} cartCount={cartCount} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} session={session} profile={userProfile} authLoading={authLoading} />}
      <main id="content">
        {page === 'admin' && (
          <AdminApp
            products={products}
            saveProducts={saveProducts}
            site={site}
            setSite={setSite}
            audit={audit}
            log={log}
            orders={orders}
            setOrders={setOrders}
            adminPage={adminPage}
            setAdminPage={setAdminPage}
            setActorEmail={setActorEmail}
            go={go}
          />
        )}
        {page === 'home' && <Home products={products} go={go} addToCart={addToCart} setQuickView={setQuickView} setSelectedProduct={setSelectedProduct} />}
        {page === 'about' && <About go={go} />}
        {page === 'proprietor' && <ProprietorPage go={go} />}
        {page === 'products' && (
          <Products
            filteredProducts={filteredProducts}
            category={category}
            setCategory={setCategory}
            subBrand={subBrand}
            setSubBrand={setSubBrand}
            packSize={packSize}
            setPackSize={setPackSize}
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
        {page === 'details' && activeProduct && <Details products={products} product={activeProduct} addToCart={addToCart} go={go} setSelectedProduct={setSelectedProduct} />}
        {page === 'cart' && <Cart cart={cart} subtotal={subtotal} updateQty={updateQty} go={go} site={site} />}
        {page === 'checkout' && <CheckoutPage cart={cart} subtotal={subtotal} go={go} site={site} captureOrder={captureOrder} profile={userProfile} />}
        {page === 'process' && <ProcessPage go={go} />}
        {page === 'recipes' && <RecipesPage />}
        {page === 'faq' && <FAQPage />}
        {page === 'thankyou' && <ThankYou go={go} />}
        {page === 'login' && <AuthPage go={go} initialMode={authMode} />}
        {page === 'account' && <AccountPage session={session} profile={userProfile} setProfile={setUserProfile} go={go} openAuth={openAuth} />}
        {page === 'orders' && <OrdersPage session={session} profile={userProfile} localOrders={orders} go={go} openAuth={openAuth} />}
        {page === 'contact' && <Contact site={site} />}
        {page === 'blog' && <Blog />}
      </main>
      {page !== 'admin' && <Footer go={go} site={site} />}
      {page !== 'admin' && (
        <a className="whatsapp" href={`https://wa.me/${site.footer.whatsapp}?text=Hello%20Sai%20Agro%20Foods`} target="_blank" rel="noreferrer" aria-label="WhatsApp Sai Agro Foods">
          <Phone size={22} />
        </a>
      )}
      {quickView && <QuickView product={quickView} close={() => setQuickView(null)} addToCart={addToCart} />}
    </>
  );
}

function SkipLink() {
  return <a className="skip-link" href="#content">Skip to content</a>;
}

function AnnouncementBar({ messages }) {
  return <div className="announcement">{messages.map((message) => <span key={message}>{message}</span>)}</div>;
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

function Loader() {
  return (
    <div className="loader">
      <div className="drop-mark"><Leaf size={28} /></div>
      <strong>Sai Agro Foods</strong>
      <span>Purity in Every Drop</span>
    </div>
  );
}

function Header({ page, go, openAuth, cartCount, mobileOpen, setMobileOpen, session, profile, authLoading }) {
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const links = [['home', 'Home'], ['about', 'About'], ['products', 'Products'], ['process', 'Process'], ['recipes', 'Recipes'], ['faq', 'FAQ'], ['contact', 'Contact']];

  useEffect(() => {
    function closeMenu() {
      setAccountOpen(false);
    }

    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const overHero = page === 'home' && !scrolled;
  const signedIn = !!session?.user && !!profile;
  const name = displayName(profile, session);

  async function logout() {
    await supabase.auth.signOut();
    setAccountOpen(false);
    go('home');
  }

  return (
    <header className={`site-header ${page === 'home' ? 'home-nav' : ''} ${overHero ? 'over-hero' : ''}`}>
      <button className="brand" onClick={() => go('home')} aria-label="Sai Agro Foods home">
        <span className="logo"><Leaf size={24} /><span /></span>
        <span><strong>Sai Agro Foods</strong><small>Purity in Every Drop</small></span>
      </button>
      <nav className={mobileOpen ? 'open' : ''}>
        {links.map(([id, label]) => <button key={id} className={page === id || (page === 'proprietor' && id === 'about') ? 'active' : ''} onClick={() => go(id)}>{label}</button>)}
      </nav>
      <div className="header-actions">
        {!authLoading && !signedIn && <button className="auth-link" onClick={() => openAuth('login')}>Login</button>}
        {!authLoading && !signedIn && <button className="auth-link signup-link" onClick={() => openAuth('signup')}>Sign up</button>}
        {signedIn && (
          <div className="account-menu" onClick={(event) => event.stopPropagation()}>
            <button className="auth-link account-trigger" onClick={() => setAccountOpen((current) => !current)} aria-haspopup="menu" aria-expanded={accountOpen}>
              {name}
            </button>
            {accountOpen && (
              <div className="account-dropdown" role="menu">
                <button type="button" onClick={() => { setAccountOpen(false); go('orders'); }}>My Orders</button>
                <button type="button" onClick={() => { setAccountOpen(false); go('account'); }}>Account</button>
                <button type="button" onClick={logout}>Log Out</button>
              </div>
            )}
          </div>
        )}
        <button className="icon-button basket-icon" onClick={() => go('cart')} aria-label="Open cart">
          <OilBasketIcon />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        <button className="icon-button menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function OilBasketIcon() {
  return (
    <svg viewBox="0 0 48 48" width="23" height="23" aria-hidden="true">
      <path d="M13 21h22l-3 16H16L13 21Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M17 21c1-7 4-10 7-10s6 3 7 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 5c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" fill="currentColor" opacity=".28" />
    </svg>
  );
}

function Home({ products, go, addToCart, setQuickView, setSelectedProduct }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroImages = [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=90',
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=90',
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1800&q=90'
  ];
  const slideAlt = [
    'A wide wheat field in warm natural light',
    'Tamil Nadu farmland glowing in a golden evening field',
    'South Indian spices and ingredients in warm kitchen light'
  ];
  const slideFocal = ['center', 'center 60%', 'center'];
  const nextSlide = () => setSlide((current) => (current + 1) % heroImages.length);
  const prevSlide = () => setSlide((current) => (current - 1 + heroImages.length) % heroImages.length);
  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [heroImages.length, paused, reducedMotion]);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motion.matches);
    const onMotion = (event) => setReducedMotion(event.matches);
    motion.addEventListener?.('change', onMotion);
    return () => motion.removeEventListener?.('change', onMotion);
  }, []);
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') nextSlide();
      if (event.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const featured = products.filter((product) => product.featured).slice(0, 4);
  return (
    <>
      <section className="hero" aria-label="Hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="hero-slides" aria-hidden="true">
          {heroImages.map((image, index) => (
            <img
              key={image}
              className={`hero-slide ${index === slide ? 'active' : ''} ${reducedMotion ? 'reduced' : ''}`}
              src={image}
              alt=""
              style={{ objectPosition: slideFocal[index] }}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
        <div className="hero-scrim" />
        <span className="sr-only" aria-live="polite">{slideAlt[slide]}</span>
        <div className="hero-copy reveal">
          <span className="eyebrow"><Sprout size={16} /> Manufacturer Direct from Karur</span>
          <h1>Pressed slow. Poured pure.</h1>
          <span className="tamil-line">மரசெக்கு எண்ணெய்</span>
          <p>Cold-pressed oils, slow-roasted peanuts, and pooja essentials - pressed and packed by one family in Pasupathipalayam, Karur.</p>
          <div className="hero-actions">
            <button className="primary magnetic" onClick={() => go('products')}>Shop the Press <ArrowRight size={18} /></button>
            <button className="secondary" onClick={() => go('process')}>Watch Our Process</button>
          </div>
        </div>
        <div className="hero-panel reveal delay">
          <strong>Fresh Batch Dispatch</strong>
          <span>Groundnut, gingelly, coconut, castor, lamp oil, peanuts, and Sai Gold trade packs.</span>
          <div className="metric-row"><b>7</b><small>real products live now</small></div>
        </div>
        <div className="hero-controls">
          <div className="hero-dots">
            {heroImages.map((_, index) => (
              <button key={index} className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} aria-label={`Go to slide ${index + 1}`} />
            ))}
          </div>
          <span className="hero-counter">{String(slide + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}</span>
          <span key={slide} className={`hero-progress ${paused || reducedMotion ? 'paused' : ''}`} />
        </div>
        <button className="hero-arrow previous" onClick={prevSlide} aria-label="Previous slide"><ChevronLeft size={22} /></button>
        <button className="hero-arrow next" onClick={nextSlide} aria-label="Next slide"><ChevronRight size={22} /></button>
      </section>
      <SprigDivider />
      <TrustBand />
      <section className="section">
        <SectionTitle kicker="FROM THIS WEEK'S PRESS" title="Fresh from the chekku" action="View all" onAction={() => go('products')} />
        <div className="carousel">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} setQuickView={setQuickView} onDetails={() => { setSelectedProduct(product); go('details'); }} />
          ))}
        </div>
      </section>
      <section className="about-preview parallax">
        <div>
          <span className="eyebrow"><Leaf size={16} /> Our Promise</span>
          <h2>A mill, a family, a promise.</h2>
          <p>For three generations our family has done one thing well: pressed oil the slow way, in a wooden chekku that turns no faster than a bullock can walk. We never blend, never refine, never rush.</p>
          <button className="primary magnetic" onClick={() => go('about')}>Our Story <ArrowRight size={18} /></button>
        </div>
      </section>
      <ProcessTeaser go={go} />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function ValueIcon({ type }) {
  return (
    <svg className="value-icon" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="2" />
      {type === 'press' && <><path d="M20 38c11-2 18-9 22-21 6 10 4 23-7 29-7 3-13 0-15-8Z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M25 42c4-8 9-13 17-17" stroke="#f4b323" strokeWidth="2" /></>}
      {type === 'pure' && <><path d="M32 15c8 10 12 17 12 24a12 12 0 0 1-24 0c0-7 4-14 12-24Z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M24 40h16" stroke="#f4b323" strokeWidth="2" /></>}
      {type === 'family' && <><path d="M18 41c2-8 8-13 14-13s12 5 14 13" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="32" cy="22" r="7" fill="none" stroke="#f4b323" strokeWidth="2" /></>}
      {type === 'karur' && <><path d="M18 18h28v28H18z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M32 20c5 5 7 8 7 12a7 7 0 0 1-14 0c0-4 2-7 7-12Z" fill="none" stroke="#f4b323" strokeWidth="2" /></>}
    </svg>
  );
}

function TrustBand() {
  const items = [
    ['press', 'Cold-pressed weekly', 'WHY KANI CHEKKU'],
    ['pure', 'Zero adulterants', 'WHY KANI CHEKKU'],
    ['family', 'Family-run batches', 'WHY KANI CHEKKU'],
    ['karur', 'Direct from Karur', 'WHY KANI CHEKKU']
  ];
  return (
    <section className="trust-band">
      {items.map(([type, title, copy]) => (
        <div className="trust-item" key={title}>
          <ValueIcon type={type} />
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
  const variant = primaryVariant(product);
  return (
    <article className="product-card">
      <button className="product-image" onClick={onDetails} aria-label={`View ${product.name}`}>
        <img src={product.images[0]} alt={`${product.name} product illustration`} />
        <span>{product.badges[0]}</span>
        <em>View</em>
      </button>
      <div className="product-body">
        <small>{product.subBrand} / {variant.size}</small>
        <h3>{product.name}</h3>
        <span className="tamil-product">{product.tamil}</span>
        <p>{product.shortDesc}</p>
        <div className="price-row">
          <strong>{formatInr(variant.price)}</strong>
          <button className="icon-button" onClick={() => setQuickView(product)} aria-label={`Quick view ${product.name}`}><Search size={18} /></button>
        </div>
        <button className="primary full magnetic" onClick={() => addToCart(product, variant)}>Add {variant.size}</button>
      </div>
    </article>
  );
}

function Products(props) {
  const categories = [
    ['All', 'All'],
    ['edible-oils', 'Cooking Oils'],
    ['wellness-oils', 'Wellness Oils'],
    ['pooja-essentials', 'Pooja Essentials'],
    ['snacks', 'Snacks'],
    ['Bulk / Trade', 'Bulk / Trade']
  ];
  const subBrands = ['All', 'Kani Chekku', 'Kani Brand', 'Sai', 'Sai Gold'];
  const packSizes = ['All', '200 ml', '500 ml', '1 Litre', '5 Litre', '15 kg Tin', '1 kg Pouch', 'Box'];
  return (
    <>
      <ProductsHero />
      <section className="shop-layout">
        <aside className="filters">
          <label><Search size={17} /> Search</label>
          <input value={props.query} onChange={(event) => props.setQuery(event.target.value)} placeholder="Groundnut, lamp oil..." />
          <label><Filter size={17} /> Category</label>
          <div className="segmented">{categories.map(([value, label]) => <button key={value} className={props.category === value ? 'active' : ''} onClick={() => props.setCategory(value)}>{label}</button>)}</div>
          <label>Sub-brand</label>
          <div className="chip-list selectable">{subBrands.map((item) => <button key={item} className={props.subBrand === item ? 'active' : ''} onClick={() => props.setSubBrand(item)}>{item}</button>)}</div>
          <label>Pack size</label>
          <div className="chip-list selectable">{packSizes.map((item) => <button key={item} className={props.packSize === item ? 'active' : ''} onClick={() => props.setPackSize(item)}>{item}</button>)}</div>
          <label>Sort</label>
          <select value={props.sort} onChange={(event) => props.setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price ↑</option>
            <option value="high">Price ↓</option>
            <option value="newest">Newest</option>
          </select>
        </aside>
        <div className="product-grid">
          {props.filteredProducts.map((product) => <ProductCard key={product.id} product={product} addToCart={props.addToCart} setQuickView={props.setQuickView} onDetails={() => props.setSelectedProduct(product)} />)}
          {props.filteredProducts.length === 0 && <div className="empty product-empty"><PackageCheck size={36} /><p>No matches yet. Try fewer filters.</p></div>}
        </div>
      </section>
    </>
  );
}

function Details({ products, product, addToCart, go, setSelectedProduct }) {
  const defaultVariant = primaryVariant(product);
  const [selectedSku, setSelectedSku] = useState(defaultVariant.sku);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('Description');
  const selectedVariant = product.variants.find((variant) => variant.sku === selectedSku) || defaultVariant;
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  useEffect(() => setSelectedSku(defaultVariant.sku), [defaultVariant.sku, product.slug]);

  return (
    <>
      <section className="details">
        <div className="zoom-image"><img src={product.images[0]} alt={`${product.name} hero pack`} /></div>
        <div className="details-copy">
          <span className="badge">{product.badges.join(' · ')}</span>
          <h1>{product.name}</h1>
          <span className="tamil-line pdp">{product.tamil}</span>
          <p>{product.tagline}</p>
          <div className="stars"><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /> <span>4.9 buyer rating</span></div>
          <strong className="detail-price">{formatInr(selectedVariant.price)} <small>/ {selectedVariant.size}</small></strong>
          <VariantSelector product={product} selectedSku={selectedSku} setSelectedSku={setSelectedSku} />
          <PurityMeter value={product.category === 'edible-oils' || product.category === 'wellness-oils' ? 100 : 96} />
          <div className="pour-count">Pressed batch #{product.batchNo} · 14-hour settling</div>
          <h3>About this product</h3>
          <p>{product.shortDesc}</p>
          <div className="quantity">
            <button className="icon-button" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={18} /></button>
            <span>{qty}</span>
            <button className="icon-button" onClick={() => setQty(qty + 1)}><Plus size={18} /></button>
          </div>
          <div className="hero-actions">
            <button className="primary magnetic" disabled={!selectedVariant.stock} onClick={() => addToCart(product, selectedVariant, qty)}>Add to Cart</button>
            <button className="secondary" onClick={() => { addToCart(product, selectedVariant, qty); go('cart'); }}>Buy Now</button>
            <a className="whatsapp-button" href={`https://wa.me/919944534337?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}%20${encodeURIComponent(selectedVariant.size)}%20x%20${qty}`} target="_blank" rel="noreferrer">Buy on WhatsApp</a>
          </div>
          <ProvenanceCard today={today} />
          <div className="trust-strip">Cold-pressed weekly · FSSAI ready · Ships in 48h · COD in Tamil Nadu</div>
          <div className="tabs">
            {['Description', 'How made', 'Nutrition', 'Shelf life'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}
          </div>
          <p className="tab-panel">{tab === 'Description' ? product.longDesc : tab === 'How made' ? 'Sorted, cleaned, slow pressed, naturally settled, filtered through cloth, and packed with batch care at Sai Agro Foods.' : tab === 'Nutrition' ? (product.nutrition || 'Nutrition details are not required for this product category.') : product.shelfLife}</p>
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

function VariantSelector({ product, selectedSku, setSelectedSku }) {
  return (
    <div className="variant-selector" aria-label="Choose pack size">
      {product.variants.map((variant) => (
        <button key={variant.sku} className={selectedSku === variant.sku ? 'active' : ''} onClick={() => setSelectedSku(variant.sku)}>
          <strong>{variant.size}</strong>
          <span>{variant.sku} · {formatInr(variant.price)}</span>
          {variant.tradePack && <em>Trade</em>}
        </button>
      ))}
    </div>
  );
}

function ProvenanceCard({ today }) {
  return (
    <div className="provenance-card">
      <svg viewBox="0 0 220 120" aria-hidden="true">
        <path d="M36 74c20-38 71-55 107-35 28 15 38 43 27 61-19 31-104 24-134-26Z" fill="rgba(47,125,60,.12)" stroke="currentColor" />
        <circle cx="105" cy="66" r="6" fill="currentColor" />
        <path d="M105 66c7 6 11 11 11 17" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
      <div><strong>Pressed in Pasupathipalayam, Karur</strong><span>Mon, {today}</span></div>
    </div>
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
      <div><strong>{value}%</strong><span>Purity meter</span></div>
    </div>
  );
}

function Cart({ cart, subtotal, updateQty, go, site }) {
  const shipping = subtotal > site.freeShippingThreshold || subtotal === 0 ? 0 : site.shippingRate;
  const total = subtotal + shipping;
  return (
    <section className="cart-page">
      <div className="cart-items">
        <span className="kicker">Cart & Checkout</span>
        <h1>Review your order</h1>
        {cart.length === 0 && <div className="empty"><OilBasketIcon /><p>Your basket is empty. The press is running →</p><button className="primary" onClick={() => go('products')}>Browse the Press</button></div>}
        {cart.map((item) => (
          <div className="cart-row" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div><strong>{item.name}</strong><span>{item.size} · {item.sku}</span><b>{formatInr(item.price * item.qty)}</b></div>
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
        <div className="summary-line"><span>Subtotal</span><b>{formatInr(subtotal)}</b></div>
        <div className="summary-line"><span>Shipping</span><b>{shipping ? formatInr(shipping) : 'Free'}</b></div>
        <div className="summary-line total"><span>Total</span><b>{formatInr(total)}</b></div>
        <button className="primary full" onClick={() => go('checkout')}>Proceed to Checkout</button>
        <a className="whatsapp-button full" href="https://wa.me/919944534337?text=I%20want%20to%20place%20an%20order%20with%20Sai%20Agro%20Foods" target="_blank" rel="noreferrer">Order on WhatsApp</a>
      </aside>
    </section>
  );
}

function CheckoutPage({ cart, subtotal, go, site, captureOrder, profile }) {
  const shipping = subtotal > site.freeShippingThreshold || subtotal === 0 ? 0 : site.shippingRate;
  const total = subtotal + shipping;
  const [done, setDone] = useState(false);
  const [customer, setCustomer] = useState({
    name: profile?.full_name || '',
    phone: profile?.phone || '',
    email: profile?.email || '',
    address: profile?.address_line1 || '',
    city: profile?.city || '',
    state: profile?.state || 'Tamil Nadu',
    pincode: profile?.pincode || '',
    notes: ''
  });

  useEffect(() => {
    setCustomer((current) => ({
      ...current,
      name: profile?.full_name || current.name,
      phone: profile?.phone || current.phone,
      email: profile?.email || current.email,
      address: profile?.address_line1 || current.address,
      city: profile?.city || current.city,
      state: profile?.state || current.state,
      pincode: profile?.pincode || current.pincode
    }));
  }, [profile]);

  function update(field, value) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }
  return (
    <section className="cart-page">
      <form className="checkout checkout-wide" onSubmit={(event) => { event.preventDefault(); captureOrder(customer); setDone(true); setTimeout(() => go('thankyou'), 500); }}>
        <h2>Secure Checkout</h2>
        <input required placeholder="Full name" value={customer.name} onChange={(event) => update('name', event.target.value)} />
        <input required placeholder="Phone number" value={customer.phone} onChange={(event) => update('phone', event.target.value)} />
        <input type="email" placeholder="Email address" value={customer.email} onChange={(event) => update('email', event.target.value)} />
        <input required placeholder="Street address" value={customer.address} onChange={(event) => update('address', event.target.value)} />
        <input required placeholder="City" value={customer.city} onChange={(event) => update('city', event.target.value)} />
        <input value={customer.state} placeholder="State" onChange={(event) => update('state', event.target.value)} />
        <input required placeholder="Pincode" value={customer.pincode} onChange={(event) => update('pincode', event.target.value)} />
        <select defaultValue="cod"><option value="upi">UPI on delivery</option><option value="cod">Cash on Delivery</option><option value="wa">WhatsApp confirmation</option></select>
        <textarea placeholder="Order notes" rows="3" value={customer.notes} onChange={(event) => update('notes', event.target.value)} />
        <button className="primary full" disabled={cart.length === 0}>Place Secure Order</button>
        {done && <p className="success">Order request captured. Redirecting to thank you.</p>}
      </form>
      <aside className="checkout why-buy">
        <h2>Summary</h2>
        <div className="summary-line"><span>Subtotal</span><b>{formatInr(subtotal)}</b></div>
        <div className="summary-line"><span>Shipping</span><b>{shipping ? formatInr(shipping) : 'Free'}</b></div>
        <div className="summary-line total"><span>Total</span><b>{formatInr(total)}</b></div>
        {['Pressed weekly, never stocked', 'We ship in 48 hours', `COD across Tamil Nadu - free above ${formatInr(site.freeShippingThreshold)}`].map((item) => <div className="mini-card" key={item}><CheckCircle2 size={18} /> {item}</div>)}
      </aside>
    </section>
  );
}

function About({ go }) {
  return (
    <>
      <AboutHero />
      <section className="split-section">
        <div className="founder-note">
          <span className="kicker">Our Story</span>
          <h2>From local produce to trusted everyday oil.</h2>
          <p>Our work begins with a simple standard: oils should taste fresh, smell natural, and feel trustworthy. Sai Agro Foods focuses on small-batch pressing, careful filtration, and direct relationships with kitchens that care about what goes into the kadai.</p>
        </div>
        <div className="mission-grid">
          <div><Leaf size={26} /><strong>Vision</strong><span>Build a Karur brand known for purity, patience, and honest everyday food.</span></div>
          <div><Heart size={26} /><strong>Mission</strong><span>Deliver fresh, traceable, fairly priced products with responsive service.</span></div>
        </div>
      </section>
      <section className="section soft">
        <SectionTitle kicker="Manufacturing Process" title="A careful path from seed to sealed bottle" />
        <div className="process-grid">{process.map(([title, copy, Icon], index) => <div className="process-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon size={28} /><h3>{title}</h3><p>{copy}</p></div>)}</div>
      </section>
      <ProprietorCard go={go} />
    </>
  );
}

function ProprietorFrame({ eager = false, hero = false }) {
  return (
    <figure className={`proprietor-frame ${hero ? 'hero-frame' : ''}`}>
      <span className="frame-sprig" aria-hidden="true"><Leaf size={32} /></span>
      <span className="frame-drop" aria-hidden="true" />
      <div className="proprietor-inner-frame">
        <img
          src={proprietorContent.photo}
          alt="Dr. Saravana Kumar, Proprietor of Sai Agro Foods, in his office at Pasupathipalayam, Karur."
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
      <span className="frame-rule" aria-hidden="true" />
      <figcaption>Dr. Saravana Kumar at the Sai Agro Foods office, Pasupathipalayam, Karur.</figcaption>
    </figure>
  );
}

function ProprietorCard({ go }) {
  return (
    <section className="proprietor-card-section">
      <div className="proprietor-card-shell">
        <div className="proprietor-card-heading">
          <span className="kicker">Leadership</span>
          <h2>Meet Our Proprietor</h2>
          <p>A focused introduction to the leadership guiding Sai Agro Foods from Karur to everyday kitchens across South India.</p>
        </div>
        <div className="proprietor-card-grid">
          <ProprietorFrame />
          <div className="proprietor-card-copy">
            <span className="kicker">Proprietor</span>
            <h3>Dr. Saravana Kumar, Ph.D.</h3>
            <strong>Proprietor - Sai Agro Foods</strong>
            <p>{proprietorContent.teaser}</p>
            <button className="proprietor-cta" onClick={() => go('proprietor')}>
              Read Full Profile <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function setMetaTag(selector, attributes) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => tag.setAttribute(key, value));
}

function ProprietorPage({ go }) {
  useEffect(() => {
    document.title = 'About the Proprietor - Dr. Saravana Kumar, Ph.D. | Sai Agro Foods';
    setMetaTag('meta[name="description"]', {
      name: 'description',
      content: 'Meet Dr. Saravana Kumar, Ph.D., proprietor of Sai Agro Foods, Karur - engineer, second-generation custodian, and champion of pure, traceable edible oils across South India.'
    });
    setMetaTag('meta[property="og:title"]', { property: 'og:title', content: 'About the Proprietor - Dr. Saravana Kumar, Ph.D. | Sai Agro Foods' });
    setMetaTag('meta[property="og:description"]', { property: 'og:description', content: 'Engineer, second-generation custodian, and champion of pure, traceable edible oils across South India.' });
    setMetaTag('meta[property="og:image"]', { property: 'og:image', content: `${window.location.origin}${proprietorContent.photo}` });
    setMetaTag('meta[property="og:type"]', { property: 'og:type', content: 'profile' });
    const schema = document.getElementById('proprietor-person-schema') || document.createElement('script');
    schema.id = 'proprietor-person-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: `${proprietorContent.name}, ${proprietorContent.credentials}`,
      jobTitle: proprietorContent.title,
      worksFor: { '@type': 'Organization', name: proprietorContent.org },
      image: `${window.location.origin}${proprietorContent.photo}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Pasupathipalayam',
        addressLocality: 'Karur',
        postalCode: '639004',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN'
      }
    });
    document.head.appendChild(schema);
  }, []);

  const facts = [
    ['Doctorate', 'Ph.D. in Engineering', Star],
    ['Heritage', 'Second-generation custodian', Leaf],
    ['Reach', 'TN, KL, KA, AP, PY, TS', Truck],
    ['Philosophy', 'Food is medicine', Heart]
  ];

  return (
    <>
      <section className="proprietor-hero">
        <div className="proprietor-hero-copy">
          <span className="kicker">Sai Agro Foods - Leadership</span>
          <h1>The man behind the brand.</h1>
          <p>Dr. Saravana Kumar, Ph.D. - Proprietor.</p>
        </div>
        <ProprietorFrame eager hero />
        <svg className="proprietor-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0 58c118 36 237 48 356 36 116-12 193-58 318-58 128 0 209 60 348 66 142 7 269-36 418-76v94H0Z" />
        </svg>
      </section>

      <div className="profile-breadcrumb" role="navigation" aria-label="Breadcrumb">
        <button onClick={() => go('home')}>Home</button><span>/</span>
        <button onClick={() => go('about')}>About</button><span>/</span>
        <span>About the Proprietor</span>
      </div>

      <section className="quick-facts" aria-label="Quick facts">
        {facts.map(([label, value, Icon]) => (
          <article key={label}>
            <Icon size={24} />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <div className="profile-longform">
        {proprietorContent.sections.map((section, index) => (
          <React.Fragment key={section.id}>
            {index === 11 && <ProprietorQuote />}
            <ProfileSection section={section} index={index} />
          </React.Fragment>
        ))}
      </div>

      <section className="profile-closing-cta">
        <h3>Taste the standard he stands for.</h3>
        <p>Explore Sai Agro Foods products - pressed, packed, and delivered with the same care.</p>
        <div>
          <button className="primary" onClick={() => go('products')}>View Products</button>
          <button className="secondary" onClick={() => go('contact')}>Contact Us</button>
        </div>
      </section>

      <div className="profile-back-link">
        <button onClick={() => go('about')}><ChevronLeft size={16} /> Back to About</button>
      </div>
    </>
  );
}

function ProfileSection({ section, index }) {
  return (
    <section className={`profile-section ${index === 0 ? 'profile-intro' : ''}`}>
      <div>
        <span className="kicker">Section {String(index + 1).padStart(2, '0')}</span>
        <h2>{section.title}</h2>
      </div>
      <div>
        {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}

function ProprietorQuote() {
  return (
    <section className="proprietor-quote">
      <blockquote>
        <span aria-hidden="true">"</span>
        <p>{proprietorContent.pullQuote.text}</p>
        <cite>- {proprietorContent.pullQuote.attribution}</cite>
      </blockquote>
    </section>
  );
}

function ProcessTeaser({ go }) {
  return (
    <section className="process-story">
      <div className="chekku-visual" aria-label="Rotating wooden chekku illustration"><div className="chekku-wheel"><Leaf size={42} /></div></div>
      <div className="process-steps">
        {['Source', 'Cold-press', 'Settle', 'Bottle'].map((step, index) => <article key={step}><span>{String(index + 1).padStart(2, '0')}</span><h3>{step}</h3><p>{process[index + 1]?.[1] || 'Packed fresh and sent from Karur to your kitchen.'}</p></article>)}
        <button className="primary" onClick={() => go('process')}>See the Process <ArrowRight size={18} /></button>
      </div>
    </section>
  );
}

function ProcessPage({ go }) {
  return (
    <>
      <ProcessHero />
      <section className="section">
        <SectionTitle kicker="Our Process" title="Why slow pressing still matters" />
        <div className="process-grid">{process.map(([title, copy, Icon], index) => <div className="process-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon size={28} /><h3>{title}</h3><p>{copy}</p></div>)}</div>
        <table className="comparison"><thead><tr><th>Method</th><th>Heat</th><th>Aroma</th><th>Everyday Trust</th></tr></thead><tbody><tr><td>Mara chekku</td><td>Low</td><td>Full</td><td>Yes</td></tr><tr><td>Refined oil</td><td>High</td><td>Neutralised</td><td>Varies</td></tr><tr><td>Expeller pressed</td><td>Medium</td><td>Moderate</td><td>Yes</td></tr></tbody></table>
        <button className="primary" onClick={() => go('products')}>Taste the Difference</button>
      </section>
    </>
  );
}

function RecipesPage() {
  const recipes = ['Karur-style groundnut chutney', 'Tamil sesame rice', 'Roasted peanut podi', 'Sundal with cold pressed oil', 'Vatha kuzhambu temper', 'Coconut oil hair mask'];
  return <section className="section blog-page"><SectionTitle kicker="Recipes & Uses" title="Cook the way Karur cooks" /><div className="chip-list recipe-filters"><span>Groundnut Oil</span><span>Gingelly Oil</span><span>Festival</span><span>Snack</span></div><div className="blog-grid">{recipes.map((title) => <article key={title}><span className="kicker">Recipe</span><h3>{title}</h3><p>Simple Tamil kitchen notes with ingredients, steps, and the matching Sai Agro Foods product CTA.</p><button className="text-button">View recipe <ArrowRight size={16} /></button></article>)}</div></section>;
}

function FAQPage() {
  const [q, setQ] = useState('');
  const faqs = ['Do you ship outside Tamil Nadu?', 'Are your oils cold pressed weekly?', 'Do you support wholesale orders?', 'What is the shelf life?', 'Can I pay by COD?', 'How should I store gingelly oil?', 'Do you accept returns?', 'Can restaurants get trade pricing?'];
  const visible = faqs.filter((item) => item.toLowerCase().includes(q.toLowerCase()));
  return <section className="section blog-page"><SectionTitle kicker="FAQ" title="Questions, answered." /><input className="faq-search" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search ordering, products, shipping..." /><div className="faq">{visible.map((item) => <details key={item} open><summary>{item}</summary><p>Yes. Sai Agro Foods handles this with clear communication; final policy numbers and contact details can be filled before launch.</p></details>)}</div></section>;
}

function ThankYou({ go }) {
  return <section className="thank-you"><CheckCircle2 size={72} /><h1>Your basket is on its way</h1><p>Order request captured. Our team will confirm availability and dispatch details on WhatsApp.</p><button className="primary" onClick={() => go('products')}>Continue Shopping</button></section>;
}

function Contact({ site }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <ContactHero copy={site.footer.address} />
      <section className="contact-grid">
        <div className="contact-card">
          <h2>Manufacturer Direct Enquiries</h2>
          <p><Heart size={18} /> Mr. Saravanakumar Selvaraj</p>
          <p><MapPin size={18} /> {site.footer.address}</p>
          <p><Phone size={18} /> {site.footer.phone}</p>
          <p><Mail size={18} /> {site.footer.email}</p>
          <p><Truck size={18} /> Mill hours: {site.footer.hours}</p>
          <iframe title="Sai Agro Foods map" src="https://www.google.com/maps?q=Pasupathipalayam%20Karur%20Tamil%20Nadu&output=embed" loading="lazy" />
        </div>
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <h2>Send a Message</h2>
          <input required placeholder="Name" /><input required type="email" placeholder="Email" /><input required placeholder="Phone" pattern="[0-9+\s-]{8,}" />
          <select defaultValue="retail"><option value="retail">Retail purchase</option><option value="bulk">Bulk enquiry</option><option value="wholesale">Wholesale</option><option value="other">Other</option></select>
          <textarea required rows="5" placeholder="Tell us what you need" /><button className="primary full">Submit Enquiry</button>{sent && <p className="success">Thanks. Your enquiry is ready for backend email integration.</p>}
        </form>
      </section>
    </>
  );
}

function Blog() {
  const posts = [['Why cold pressed groundnut oil tastes different', 'Slow extraction protects aroma and creates a fuller cooking flavour.'], ['Gingelly oil in traditional Tamil kitchens', 'A practical guide to nallennai in cooking, pickles, and wellness routines.'], ['How to choose peanuts for roasting and chutney', 'Look for uniform size, clean sorting, and a naturally sweet finish.']];
  return <section className="section blog-page"><SectionTitle kicker="Journal" title="Helpful buying notes for healthier kitchens" /><div className="blog-grid">{posts.map(([title, copy]) => <article key={title}><span className="kicker">Health Benefits</span><h3>{title}</h3><p>{copy}</p><button className="text-button">Read note <ArrowRight size={16} /></button></article>)}</div></section>;
}

function PageHero({ title, copy, image, compact }) {
  return <section className={`page-hero ${compact ? 'compact' : ''}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(39,28,11,.8), rgba(39,28,11,.34)), url(${image})` }}><div><span className="eyebrow"><Leaf size={16} /> Sai Agro Foods</span><h1>{title}</h1><p>{copy}</p></div></section>;
}

function Testimonials() {
  return <section className="section testimonials"><SectionTitle kicker="Customer Reviews" title="Trusted by homes, shops, and food-service buyers" /><div className="testimonial-grid">{testimonials.map(([quote, name, role]) => <article key={name}><div className="stars"><Star fill="currentColor" size={17} /><Star fill="currentColor" size={17} /><Star fill="currentColor" size={17} /><Star fill="currentColor" size={17} /><Star fill="currentColor" size={17} /></div><p>"{quote}"</p><strong>{name}</strong><span>{role}</span></article>)}</div></section>;
}

function Newsletter() {
  return <section className="newsletter"><div><span className="kicker">Fresh Batch Alerts</span><h2>Get product updates, trade offers, and seasonal peanut notes.</h2></div><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Email address" /><button className="primary">Subscribe</button></form></section>;
}

function SprigDivider() {
  return <div className="sprig-divider" aria-hidden="true"><svg viewBox="0 0 160 32"><path d="M12 18c38-18 70-18 136 0" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M54 13c-8-8-18-8-27-3 7 8 17 8 27 3Zm40 0c8-8 18-8 27-3-7 8-17 8-27 3Z" fill="currentColor" /></svg></div>;
}

function QuickView({ product, close, addToCart }) {
  const variant = primaryVariant(product);
  return (
    <div className="modal-backdrop" onClick={close}>
      <article className="quick-modal" onClick={(event) => event.stopPropagation()}>
        <button className="icon-button close" onClick={close}><X size={20} /></button>
        <img src={product.images[1] || product.images[0]} alt={product.name} />
        <div>
          <span className="badge">{product.badges.join(' · ')}</span>
          <h2>{product.name}</h2>
          <p>{product.shortDesc}</p>
          <strong className="detail-price">{formatInr(variant.price)} <small>/ {variant.size}</small></strong>
          <ul className="check-list"><li><CheckCircle2 size={17} /> {product.subBrand}</li><li><CheckCircle2 size={17} /> {product.shelfLife}</li><li><CheckCircle2 size={17} /> {variant.sku}</li></ul>
          <button className="primary full" onClick={() => { addToCart(product, variant); close(); }}>Add to Cart</button>
        </div>
      </article>
    </div>
  );
}

function Footer({ go, site }) {
  return (
    <footer>
      <div className="footer-trust"><span>FSSAI No. ___</span><span>GSTIN ___</span><span>100% family-run since [year].</span></div>
      <div className="trust-logos"><span>FSSAI</span><span>AGMARK</span><span>Made in India</span><span>Family Owned</span></div>
      <div>
        <button className="brand footer-brand" onClick={() => go('home')}><span className="logo"><Leaf size={24} /><span /></span><span><strong>Sai Agro Foods</strong><small>Pressed slow. Poured pure.</small></span></button>
        <p>Pure cold pressed oils and agricultural products from Pasupathipalayam, Karur.</p>
      </div>
      <div><strong>Shop</strong><button onClick={() => go('products')}>Cooking Oils</button><button onClick={() => go('products')}>Pooja Essentials</button><button onClick={() => go('cart')}>Cart</button></div>
      <div><strong>Company</strong><button onClick={() => go('about')}>About</button><button onClick={() => go('process')}>Process</button><button onClick={() => go('recipes')}>Recipes</button><button onClick={() => go('faq')}>FAQ</button><button onClick={() => go('contact')}>Contact</button></div>
      <div><strong>Contact</strong><span>Mr. Saravanakumar Selvaraj</span><span>{site.footer.address}</span><span>{site.footer.phone}</span><span>{site.footer.email}</span></div>
      <div className="developer-credit">Website & App Developed and Maintained by DG InfoTech, India</div>
    </footer>
  );
}

async function loadUserProfile(user) {
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_profiles')
    .select('id, email, full_name, phone, address_line1, address_line2, city, state, pincode, role')
    .eq('id', user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

function AccountPrompt({ title, copy, actionLabel, onAction }) {
  return (
    <section className="account-page">
      <div className="account-shell">
        <div className="account-card">
          <span className="kicker">Sai Agro Foods Account</span>
          <h1>{title}</h1>
          <p>{copy}</p>
          <button className="primary" type="button" onClick={onAction}>{actionLabel}</button>
        </div>
      </div>
    </section>
  );
}

function OrdersPage({ session, profile, localOrders, go, openAuth }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadOrders() {
      if (!session?.user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const localMatches = localOrders.filter((order) => order.userId === session.user.id || order.customer.email?.toLowerCase() === session.user.email?.toLowerCase());

      const { data, error } = await supabase
        .from('orders')
        .select('id, customer, items, total, status, created_at')
        .order('created_at', { ascending: false });

      if (!active) return;

      if (error) {
        setOrders(localMatches);
        setLoading(false);
        return;
      }

      const remoteMatches = (data || []).filter((order) => order.customer?.email?.toLowerCase() === session.user.email?.toLowerCase());
      const merged = [...remoteMatches.map((order) => ({
        id: order.id,
        customer: order.customer,
        items: order.items,
        total: order.total,
        status: order.status,
        createdAt: order.created_at
      }))];

      for (const order of localMatches) {
        if (!merged.some((item) => item.id === order.id)) merged.push(order);
      }

      merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(merged);
      setLoading(false);
    }

    loadOrders();
    return () => {
      active = false;
    };
  }, [localOrders, session]);

  if (!session?.user || !profile) return <AccountPrompt title="Sign in to view orders" copy="Your recent Sai Agro Foods orders will appear here once you log in." actionLabel="Login" onAction={() => openAuth('login')} />;

  return (
    <section className="account-page">
      <div className="account-shell">
        <div className="account-header">
          <span className="kicker">Sai Agro Foods Account</span>
          <h1>My Orders</h1>
          <p>Track your recent orders, delivery details, and ordered items.</p>
        </div>
        <div className="account-card">
          {loading && <p>Loading your orders...</p>}
          {!loading && orders.length === 0 && <p>No orders yet. Your next bottle is waiting.</p>}
          {!loading && orders.length > 0 && (
            <div className="user-order-list">
              {orders.map((order) => (
                <article className="user-order-card" key={order.id}>
                  <div className="user-order-top">
                    <div>
                      <strong>{order.id}</strong>
                      <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <span className="order-status">{order.status}</span>
                  </div>
                  <p>{order.items.map((item) => `${item.name} ${item.size} x${item.qty}`).join(', ')}</p>
                  <div className="user-order-bottom">
                    <span>Deliver to {order.customer.name}</span>
                    <strong>{formatInr(order.total)}</strong>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="account-inline-actions">
            <button className="secondary" type="button" onClick={() => go('products')}>Continue shopping</button>
            <button className="text-button auth-text-button" type="button" onClick={() => go('account')}>Edit account details</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccountPage({ session, profile, setProfile, go, openAuth }) {
  const [draft, setDraft] = useState({
    full_name: '',
    phone: '',
    email: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setDraft({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      email: profile?.email || session?.user?.email || '',
      address_line1: profile?.address_line1 || '',
      address_line2: profile?.address_line2 || '',
      city: profile?.city || '',
      state: profile?.state || 'Tamil Nadu',
      pincode: profile?.pincode || ''
    });
  }, [profile, session]);

  if (!session?.user || !profile) return <AccountPrompt title="Sign in to manage your profile" copy="Keep your address and contact details ready for faster checkout." actionLabel="Login" onAction={() => openAuth('login')} />;

  async function saveAccount(event) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    const payload = {
      id: session.user.id,
      email: (draft.email || session.user.email || '').trim().toLowerCase(),
      full_name: draft.full_name.trim(),
      phone: draft.phone.trim(),
      address_line1: draft.address_line1.trim(),
      address_line2: draft.address_line2.trim(),
      city: draft.city.trim(),
      state: draft.state.trim(),
      pincode: draft.pincode.trim(),
      updated_at: new Date().toISOString()
    };

    const { data, error: saveError } = await supabase
      .from('user_profiles')
      .upsert(payload)
      .select('id, email, full_name, phone, address_line1, address_line2, city, state, pincode, role')
      .single();

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setProfile(data);
    setMessage('Your account details have been updated.');
  }

  return (
    <section className="account-page">
      <div className="account-shell">
        <div className="account-header">
          <span className="kicker">Sai Agro Foods Account</span>
          <h1>Account</h1>
          <p>Update your delivery address, phone number, and profile details for a smoother checkout.</p>
        </div>
        <form className="account-card form-grid account-form" onSubmit={saveAccount}>
          <div className="account-grid">
            <input required placeholder="Full name" value={draft.full_name} onChange={(event) => setDraft((current) => ({ ...current, full_name: event.target.value }))} />
            <input required placeholder="Phone number" value={draft.phone} onChange={(event) => setDraft((current) => ({ ...current, phone: event.target.value }))} />
            <input required type="email" placeholder="Email address" value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} />
            <input required placeholder="Street address" value={draft.address_line1} onChange={(event) => setDraft((current) => ({ ...current, address_line1: event.target.value }))} />
            <input placeholder="Landmark / Apartment" value={draft.address_line2} onChange={(event) => setDraft((current) => ({ ...current, address_line2: event.target.value }))} />
            <input required placeholder="City" value={draft.city} onChange={(event) => setDraft((current) => ({ ...current, city: event.target.value }))} />
            <input required placeholder="State" value={draft.state} onChange={(event) => setDraft((current) => ({ ...current, state: event.target.value }))} />
            <input required placeholder="Pincode" value={draft.pincode} onChange={(event) => setDraft((current) => ({ ...current, pincode: event.target.value }))} />
          </div>
          <div className="account-inline-actions">
            <button className="primary" disabled={saving}>{saving ? 'Saving...' : 'Save details'}</button>
            <button className="secondary" type="button" onClick={() => go('orders')}>View my orders</button>
          </div>
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
        </form>
      </div>
    </section>
  );
}

function displayName(profile, session) {
  return profile?.full_name?.trim() || session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || 'Account';
}

function AuthPage({ go, initialMode }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setAuthError(error.message);
        setAuthLoading(false);
        return;
      }

      if (!active) return;
      setSession(data.session);

      if (data.session?.user) {
        try {
          const nextProfile = await loadUserProfile(data.session.user);
          if (!active) return;
          setProfile(nextProfile);
        } catch (profileError) {
          if (!active) return;
          setAuthError(profileError.message);
        }
      }

      setAuthLoading(false);
    }

    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);

      if (!nextSession?.user) {
        setProfile(null);
        setAuthLoading(false);
        return;
      }

      try {
        const nextProfile = await loadUserProfile(nextSession.user);
        setProfile(nextProfile);
      } catch (profileError) {
        setAuthError(profileError.message);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  }

  if (authLoading) return <section className="admin-login"><div className="auth-card"><span className="kicker">Sai Agro Foods Account</span><h1>Checking access</h1></div></section>;

  if (session && profile) {
    const isStaff = staffRoles.includes(profile.role);
    return (
      <section className="admin-login account-login">
        <div className="auth-card">
          <span className="kicker">Sai Agro Foods Account</span>
          <h1>Account</h1>
          <p><strong>{profile.email}</strong><br />Role: {profile.role}</p>
          <div className="auth-actions">
            {isStaff && <button className="primary full" type="button" onClick={() => go('admin')}>Open admin dashboard</button>}
            <button className={isStaff ? 'secondary full' : 'primary full'} type="button" onClick={() => go('products')}>Continue shopping</button>
            <button className="text-button auth-text-button" type="button" onClick={logout}>Sign out</button>
          </div>
        </div>
      </section>
    );
  }

  return <AdminLogin authError={authError} profile={profile} setAuthError={setAuthError} initialMode={initialMode} />;
}

function AdminApp({ products, saveProducts, site, setSite, audit, log, orders, setOrders, adminPage, setAdminPage, setActorEmail, go }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setAuthError(error.message);
        setAuthLoading(false);
        return;
      }

      if (!active) return;
      setSession(data.session);

      if (data.session?.user) {
        try {
          const nextProfile = await loadUserProfile(data.session.user);
          if (!active) return;
          setProfile(nextProfile);
          setActorEmail(nextProfile?.email || data.session.user.email || '');
        } catch (profileError) {
          if (!active) return;
          setAuthError(profileError.message);
        }
      }

      setAuthLoading(false);
    }

    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);

      if (!nextSession?.user) {
        setProfile(null);
        setActorEmail('');
        setAuthLoading(false);
        return;
      }

      try {
        const nextProfile = await loadUserProfile(nextSession.user);
        setProfile(nextProfile);
        setActorEmail(nextProfile?.email || nextSession.user.email || '');
      } catch (profileError) {
        setAuthError(profileError.message);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [setActorEmail]);

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    setActorEmail('');
  }

  if (authLoading) return <section className="admin-login"><div className="auth-card"><span className="kicker">Sai Agro Foods Admin</span><h1>Checking access</h1></div></section>;
  if (!session || !profile || !staffRoles.includes(profile.role)) return <AdminLogin authError={authError} profile={profile} setAuthError={setAuthError} />;

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <button className="brand admin-brand" onClick={() => setAdminPage('dashboard')}><span className="logo"><Leaf size={22} /><span /></span><span><strong>Sai Admin</strong><small>{profile.email} - {profile.role}</small></span></button>
        {['dashboard', 'products', 'orders', 'site', 'settings'].map((item) => <button key={item} className={adminPage === item ? 'active' : ''} onClick={() => setAdminPage(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}
        <button onClick={() => go('home')}>View site</button>
        <button onClick={logout}>Logout</button>
      </aside>
      <div className="admin-main">
        {adminPage === 'dashboard' && <AdminDashboard products={products} audit={audit} setAdminPage={setAdminPage} />}
        {adminPage === 'products' && <AdminProducts products={products} saveProducts={saveProducts} />}
        {adminPage === 'orders' && <AdminOrders orders={orders} setOrders={setOrders} log={log} />}
        {adminPage === 'site' && <AdminSite site={site} setSite={setSite} log={log} />}
        {adminPage === 'settings' && <AdminSettings products={products} orders={orders} site={site} profile={profile} log={log} />}
      </div>
    </section>
  );
}

function AdminLogin({ authError, profile, setAuthError, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nextPassword, setNextPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const hasNonStaffProfile = profile && !staffRoles.includes(profile.role);
  const recoveryMode = initialMode === 'recovery';

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  async function logout() {
    setBusy(true);
    setError('');
    setMessage('');
    setAuthError('');
    await supabase.auth.signOut();
    setBusy(false);
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    setAuthError('');

    if (recoveryMode) {
      if (!nextPassword || nextPassword.length < 6) {
        setBusy(false);
        setError('Use a password with at least 6 characters.');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({ password: nextPassword });
      setBusy(false);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage('Password updated. You can log in with the new password.');
      setMode('login');
      setNextPassword('');
      return;
    }

    const credentials = {
      email: email.trim().toLowerCase(),
      password
    };

    const response = mode === 'login'
      ? await supabase.auth.signInWithPassword(credentials)
      : await supabase.auth.signUp({
        ...credentials,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

    setBusy(false);

    if (response.error) {
      setError(response.error.message);
      return;
    }

    if (mode === 'signup' && !response.data.session) {
      setMessage('Account created. Please confirm the email, then return here to log in.');
    }
  }

  async function sendPasswordReset() {
    const resetEmail = email.trim().toLowerCase();
    setError('');
    setMessage('');
    setAuthError('');

    if (!resetEmail) {
      setError('Enter your email address first.');
      return;
    }

    setBusy(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/login`
    });
    setBusy(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setMessage('Password reset email sent. Check your inbox to continue.');
  }

  if (hasNonStaffProfile) {
    return (
      <section className="admin-login">
        <div className="auth-card">
          <span className="kicker">Sai Agro Foods Admin</span>
          <h1>Access pending</h1>
          <p className="error">Your account is active as {profile.role}, but admin access requires an Admin or Developer ID.</p>
          <p className="admin-hint">Add this email in Supabase `authorized_users` with role `admin` or `developer`, then refresh this page. If the ID was added after signup, rerun the latest `supabase/schema.sql` once to sync existing profiles.</p>
          <button className="primary full" type="button" disabled={busy} onClick={logout}>{busy ? 'Please wait...' : 'Sign out'}</button>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-login">
      <form onSubmit={submit} className="auth-card">
        <span className="kicker">Sai Agro Foods Admin</span>
        <h1>{recoveryMode ? 'Set new password' : mode === 'login' ? 'Login' : 'Sign up'}</h1>
        {!recoveryMode && (
          <div className="auth-tabs">
            <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
            <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Sign up</button>
          </div>
        )}
        {recoveryMode ? (
          <input required minLength="6" type="password" value={nextPassword} onChange={(event) => setNextPassword(event.target.value)} placeholder="New password" />
        ) : (
          <>
            {mode === 'signup' && <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" />}
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" />
            <input required minLength="6" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
          </>
        )}
        <button className="primary full" disabled={busy}>{busy ? 'Please wait...' : recoveryMode ? 'Update password' : mode === 'login' ? 'Login' : 'Create account'}</button>
        {!recoveryMode && mode === 'login' && <button className="text-button forgot-password" type="button" disabled={busy} onClick={sendPasswordReset}>Forgot password?</button>}
        {(error || authError) && <p className="error">{error || authError}</p>}
        {message && <p className="success">{message}</p>}
      </form>
    </section>
  );
}

function AdminDashboard({ products, audit, setAdminPage }) {
  const variants = products.flatMap((product) => product.variants);
  const stats = [
    ['Total products', products.length],
    ['Total variants', variants.length],
    ['Out-of-stock count', variants.filter((variant) => !variant.stock).length],
    ['Trade-pack count', variants.filter((variant) => variant.tradePack).length]
  ];
  return (
    <>
      <AdminTitle title="Dashboard" action="Manage products" onAction={() => setAdminPage('products')} />
      <div className="admin-stats">{stats.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>
      <div className="admin-card">
        <h2>Recent activity</h2>
        {audit.slice(0, 10).map((item) => <p key={`${item.at}-${item.delta}`}><strong>{new Date(item.at).toLocaleString()}</strong> · {item.action} · {item.entity} · {item.delta}</p>)}
        {audit.length === 0 && <p>No edits recorded yet.</p>}
      </div>
      <div className="admin-actions"><button onClick={() => setAdminPage('products')}>Add product</button><button onClick={() => setAdminPage('products')}>Manage products</button><a href="/">View site</a></div>
    </>
  );
}

function AdminTitle({ title, action, onAction }) {
  return <div className="admin-title"><div><span className="kicker">Admin</span><h1>{title}</h1></div>{action && <button className="primary" onClick={onAction}>{action}</button>}</div>;
}

function AdminProducts({ products, saveProducts }) {
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const filtered = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  function upsert(product) {
    const saved = { ...product, slug: product.slug || slugify(product.name), id: product.id || slugify(product.name), updatedAt: new Date().toISOString(), images: product.images?.length ? product.images : [`/images/products/${product.slug || slugify(product.name)}/01-hero.svg`] };
    const exists = products.some((item) => item.id === saved.id);
    saveProducts(exists ? products.map((item) => (item.id === saved.id ? saved : item)) : [...products, saved], exists ? 'update' : 'create', saved.name, 'Saved product fields and variants');
    setEditing(null);
  }
  function remove(product) {
    if (confirm(`Delete ${product.name}?`)) saveProducts(products.filter((item) => item.id !== product.id), 'delete', product.name, 'Deleted product');
  }
  function toggleFeatured(product) {
    saveProducts(products.map((item) => (item.id === product.id ? { ...item, featured: !item.featured, updatedAt: new Date().toISOString() } : item)), 'update', product.name, 'Toggled featured');
  }
  function toggleStock(product) {
    saveProducts(products.map((item) => (item.id === product.id ? { ...item, variants: item.variants.map((variant) => ({ ...variant, stock: !item.variants.every((v) => v.stock) })), updatedAt: new Date().toISOString() } : item)), 'update', product.name, 'Toggled stock across variants');
  }
  if (editing) return <ProductForm product={editing === 'new' ? blankProduct() : editing} onCancel={() => setEditing(null)} onSave={upsert} />;
  return (
    <>
      <AdminTitle title="Products" action="Add product" onAction={() => setEditing('new')} />
      <div className="admin-card">
        <div className="admin-toolbar"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" /><button onClick={() => saveProducts(products.map((product) => ({ ...product, featured: true })), 'bulk', 'products', 'Marked all featured')}>Mark featured</button><button onClick={() => saveProducts(products.map((product) => ({ ...product, archived: true })), 'bulk', 'products', 'Archived all products')}>Archive</button></div>
        <table className="admin-table"><thead><tr><th>Image</th><th>Name</th><th>Sub-brand</th><th>Category</th><th>Variants</th><th>Price range</th><th>Stock</th><th>Actions</th></tr></thead><tbody>
          {filtered.map((product) => <tr key={product.id}><td><img src={product.images[0]} alt="" /></td><td><strong>{product.name}</strong><button className="link-button" onClick={() => toggleFeatured(product)}>{product.featured ? 'Featured' : 'Not featured'}</button></td><td>{product.subBrand}</td><td>{categoryText(product.category)}</td><td>{product.variants.length}</td><td>{productPriceRange(product)}</td><td><button className="stock-pill" onClick={() => toggleStock(product)}>{product.variants.some((variant) => variant.stock) ? 'In stock' : 'Out'}</button></td><td><button onClick={() => setEditing(product)}>Edit</button><button className="danger" onClick={() => remove(product)}>Delete</button></td></tr>)}
        </tbody></table>
      </div>
    </>
  );
}

function ProductForm({ product, onSave, onCancel }) {
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(product)));
  const [tab, setTab] = useState('Basics');
  const tabs = ['Basics', 'Descriptions', 'Variants', 'Images', 'SEO', 'Status'];
  function update(field, value) {
    setDraft((current) => ({ ...current, [field]: value, ...(field === 'name' && !current.slug ? { slug: slugify(value) } : {}) }));
  }
  function updateVariant(index, field, value) {
    setDraft((current) => ({ ...current, variants: current.variants.map((variant, i) => (i === index ? { ...variant, [field]: value } : field === 'primary' && value ? { ...variant, primary: false } : variant)) }));
  }
  function addVariant() {
    setDraft((current) => ({ ...current, variants: [...current.variants, { sku: '', size: '1 Litre', price: 0, stock: true }] }));
  }
  function removeVariant(index) {
    setDraft((current) => ({ ...current, variants: current.variants.filter((_, i) => i !== index) }));
  }
  function addImage(event) {
    const files = [...event.target.files].slice(0, 6 - draft.images.length);
    const allowed = files.filter((file) => /image\/(jpeg|png|webp|svg\+xml)/.test(file.type) && file.size <= 5 * 1024 * 1024);
    Promise.all(allowed.map((file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    }))).then((items) => setDraft((current) => ({ ...current, images: [...current.images, ...items].slice(0, 6) })));
  }
  return (
    <div>
      <div className="admin-title sticky-save"><div><button className="text-button" onClick={onCancel}><ChevronLeft size={16} /> Products</button><h1>{draft.name || 'New product'}</h1><span className="unsaved">Unsaved changes</span></div><button className="primary" onClick={() => onSave(draft)}>Save product</button></div>
      <div className="editor-layout">
        <div className="admin-card product-editor">
          <div className="tabs">{tabs.map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>
          {tab === 'Basics' && <div className="form-grid"><input value={draft.name} onChange={(e) => update('name', e.target.value)} placeholder="Name" /><input value={draft.slug} onChange={(e) => update('slug', slugify(e.target.value))} placeholder="Slug" /><select value={draft.subBrand} onChange={(e) => update('subBrand', e.target.value)}><option>Kani Chekku</option><option>Kani Brand</option><option>Sai</option><option>Sai Gold</option></select><select value={draft.category} onChange={(e) => update('category', e.target.value)}><option value="edible-oils">Cooking Oils</option><option value="wellness-oils">Wellness Oils</option><option value="pooja-essentials">Pooja Essentials</option><option value="snacks">Snacks</option></select><textarea value={draft.tagline} onChange={(e) => update('tagline', e.target.value)} placeholder="Tagline" /></div>}
          {tab === 'Descriptions' && <div className="form-grid"><textarea rows="3" value={draft.shortDesc} onChange={(e) => update('shortDesc', e.target.value)} placeholder="Short description" /><textarea rows="6" value={draft.longDesc} onChange={(e) => update('longDesc', e.target.value)} placeholder="Long description" /><textarea value={draft.nutrition || ''} onChange={(e) => update('nutrition', e.target.value)} placeholder="Nutrition" /><input value={draft.shelfLife} onChange={(e) => update('shelfLife', e.target.value)} placeholder="Shelf life" /></div>}
          {tab === 'Variants' && <div className="variant-admin">{draft.variants.map((variant, index) => <div className="variant-row" key={`${variant.sku}-${index}`}><input value={variant.sku} onChange={(e) => updateVariant(index, 'sku', e.target.value)} placeholder="SKU" /><input value={variant.size} onChange={(e) => updateVariant(index, 'size', e.target.value)} placeholder="Size" /><input type="number" value={variant.price} onChange={(e) => updateVariant(index, 'price', Number(e.target.value))} placeholder="Price" /><label><input type="checkbox" checked={variant.stock} onChange={(e) => updateVariant(index, 'stock', e.target.checked)} /> Stock</label><label><input type="radio" checked={!!variant.primary} onChange={() => updateVariant(index, 'primary', true)} /> Primary</label><label><input type="checkbox" checked={!!variant.tradePack} onChange={(e) => updateVariant(index, 'tradePack', e.target.checked)} /> Trade</label><button className="danger" onClick={() => removeVariant(index)}>Remove</button></div>)}<button onClick={addVariant}>Add variant</button></div>}
          {tab === 'Images' && <div className="form-grid"><input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" multiple onChange={addImage} /><div className="image-admin">{draft.images.map((image, index) => <div key={`${image}-${index}`}><img src={image} alt="" /><input value={image} onChange={(e) => setDraft((current) => ({ ...current, images: current.images.map((item, i) => (i === index ? e.target.value : item)) }))} /><button className="danger" onClick={() => setDraft((current) => ({ ...current, images: current.images.filter((_, i) => i !== index) }))}>Delete</button></div>)}</div></div>}
          {tab === 'SEO' && <div className="form-grid"><input value={draft.metaTitle || ''} onChange={(e) => update('metaTitle', e.target.value)} placeholder="Meta title" /><textarea value={draft.metaDescription || ''} onChange={(e) => update('metaDescription', e.target.value)} placeholder="Meta description" /><input value={draft.ogImage || ''} onChange={(e) => update('ogImage', e.target.value)} placeholder="OG image override" /></div>}
          {tab === 'Status' && <div className="form-grid"><input value={draft.badges.join(', ')} onChange={(e) => update('badges', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))} placeholder="Badges" /><input value={draft.tamil || ''} onChange={(e) => update('tamil', e.target.value)} placeholder="Tamil tagline" /><label><input type="checkbox" checked={!!draft.featured} onChange={(e) => update('featured', e.target.checked)} /> Featured</label><label><input type="checkbox" checked={!!draft.archived} onChange={(e) => update('archived', e.target.checked)} /> Archived</label></div>}
        </div>
        <div className="live-preview"><ProductCard product={draft} addToCart={() => {}} setQuickView={() => {}} onDetails={() => {}} /></div>
      </div>
    </div>
  );
}

function AdminOrders({ orders, setOrders, log }) {
  function fulfil(order) {
    setOrders(orders.map((item) => (item.id === order.id ? { ...item, status: 'fulfilled' } : item)));
    log('update', 'order', `${order.id} marked fulfilled`);
  }
  return <><AdminTitle title="Orders" /><div className="admin-card"><table className="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td>{order.id}</td><td>{order.customer.name}<br />{order.customer.phone}</td><td>{order.items.map((item) => `${item.name} ${item.size} x${item.qty}`).join(', ')}</td><td>{formatInr(order.total)}</td><td>{order.status}</td><td><button onClick={() => fulfil(order)}>Mark fulfilled</button></td></tr>)}</tbody></table>{orders.length === 0 && <p>No checkout orders captured yet.</p>}</div></>;
}

function AdminSite({ site, setSite, log }) {
  const [draft, setDraft] = useState(site);
  function save() {
    setSite(draft);
    log('update', 'site', 'Updated announcements, footer, and shipping settings');
  }
  return <><AdminTitle title="Site settings" action="Save site" onAction={save} /><div className="admin-card form-grid"><textarea rows="4" value={draft.announcements.join('\n')} onChange={(e) => setDraft({ ...draft, announcements: e.target.value.split('\n').filter(Boolean) })} /><input value={draft.footer.address} onChange={(e) => setDraft({ ...draft, footer: { ...draft.footer, address: e.target.value } })} placeholder="Address" /><input value={draft.footer.phone} onChange={(e) => setDraft({ ...draft, footer: { ...draft.footer, phone: e.target.value } })} placeholder="Phone" /><input value={draft.footer.whatsapp} onChange={(e) => setDraft({ ...draft, footer: { ...draft.footer, whatsapp: e.target.value } })} placeholder="WhatsApp" /><input value={draft.footer.email} onChange={(e) => setDraft({ ...draft, footer: { ...draft.footer, email: e.target.value } })} placeholder="Email" /><input value={draft.footer.hours} onChange={(e) => setDraft({ ...draft, footer: { ...draft.footer, hours: e.target.value } })} placeholder="Hours" /><input type="number" value={draft.freeShippingThreshold} onChange={(e) => setDraft({ ...draft, freeShippingThreshold: Number(e.target.value) })} /><input type="number" value={draft.shippingRate} onChange={(e) => setDraft({ ...draft, shippingRate: Number(e.target.value) })} /><label><input type="checkbox" checked={draft.bannerEnabled} onChange={(e) => setDraft({ ...draft, bannerEnabled: e.target.checked })} /> Site banner enabled</label><input value={draft.bannerText} onChange={(e) => setDraft({ ...draft, bannerText: e.target.value })} placeholder="Banner text" /></div></>;
}

function AdminSettings({ products, orders, site, profile, log }) {
  const [message, setMessage] = useState('');
  async function sendPasswordReset() {
    const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
      redirectTo: `${window.location.origin}/admin`
    });
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage('Password reset email sent.');
    log('update', 'settings', 'Password reset requested');
  }
  function backup() {
    const blob = new Blob([JSON.stringify({ products, orders, site }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sai-agro-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    log('backup', 'settings', 'Downloaded JSON backup');
  }
  return <><AdminTitle title="Settings" /><div className="admin-card form-grid"><p><strong>{profile.email}</strong><br />Role: {profile.role}</p><button onClick={sendPasswordReset}>Send password reset email</button><button onClick={backup}>Download data backup</button>{message && <p>{message}</p>}<p className="admin-hint">Manage staff access in the Supabase `authorized_users` table. Only `admin` and `developer` roles can open this dashboard.</p></div></>;
}

createRoot(document.getElementById('root')).render(<App />);
