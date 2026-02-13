
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromoBanner from './components/PromoBanner';
import BrandMarquee from './components/BrandMarquee';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import AdminPanel from './components/AdminPanel';
import UserProfile from './components/UserProfile';
import CheckoutPage from './components/CheckoutPage';
import CartDrawer from './components/CartDrawer';
import EliteMembership from './components/EliteMembership';
import MembershipCheckout from './components/MembershipCheckout';
import Logo from './components/Logo';
import { Product, Order, Category, CartItem, MembershipRequest, Member } from './types';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES as INITIAL_CATEGORIES } from './data';
import { Lock, ShieldCheck, ArrowRight, TrendingUp, Snowflake, Sun, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'details' | 'admin' | 'shop' | 'admin-login' | 'profile' | 'checkout' | 'best-selling' | 'membership' | 'membership-checkout' | 'winter-collection' | 'summer-collection'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [membershipRequests, setMembershipRequests] = useState<MembershipRequest[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [isEliteMember, setIsEliteMember] = useState(false);
  const [userMemberCode, setUserMemberCode] = useState<string | null>(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [siteConfig, setSiteConfig] = useState({
    heroTitle: "Brewing Style Daily",
    heroTagline: "From the softest cotton to the boldest graphics. Every piece is hand-selected and freshly pressed for the culture.",
    heroImageUrl: 'https://images.unsplash.com/photo-1550991152-12a20139121b?q=80&w=2070&auto=format&fit=crop',
    promoBannerUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop',
    promoBannerTitle: 'Limited Drop // 001',
    lookbookImageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop',
    lookbookTitle: 'Winter Collective 25',
    socialLinks: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      whatsapp: ''
    }
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('cloth_cafe_products');
    const savedConfig = localStorage.getItem('cloth_cafe_config');
    const savedOrders = localStorage.getItem('cloth_cafe_orders');
    const savedPoints = localStorage.getItem('cloth_cafe_user_points');
    const savedCategories = localStorage.getItem('cloth_cafe_categories');
    const savedCart = localStorage.getItem('cloth_cafe_cart');
    const savedProfile = localStorage.getItem('cloth_cafe_user_profile');
    const savedRequests = localStorage.getItem('cloth_cafe_membership_requests');
    const savedMembers = localStorage.getItem('cloth_cafe_members');
    
    if (savedProducts) {
      try { setProducts(JSON.parse(savedProducts)); } catch (e) { setProducts(INITIAL_PRODUCTS); }
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('cloth_cafe_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    if (savedCategories) {
      try { setCategories(JSON.parse(savedCategories)); } catch (e) { setCategories(INITIAL_CATEGORIES); }
    } else {
      setCategories(INITIAL_CATEGORIES);
      localStorage.setItem('cloth_cafe_categories', JSON.stringify(INITIAL_CATEGORIES));
    }

    if (savedOrders) {
      try { setOrders(JSON.parse(savedOrders)); } catch (e) { setOrders([]); }
    }

    if (savedRequests) {
      try { setMembershipRequests(JSON.parse(savedRequests)); } catch (e) { setMembershipRequests([]); }
    }

    if (savedMembers) {
      try { setMembers(JSON.parse(savedMembers)); } catch (e) { setMembers([]); }
    }

    if (savedConfig) {
      try { 
        const parsedConfig = JSON.parse(savedConfig);
        setSiteConfig(prev => ({ ...prev, ...parsedConfig })); 
      } catch (e) {}
    }

    if (savedPoints) {
      setUserPoints(parseInt(savedPoints));
    }

    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { setCart([]); }
    }

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setIsEliteMember(!!profile.isElite);
        setUserMemberCode(profile.membershipCode || null);
      } catch (e) {}
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cloth_cafe_cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (product: Product, size: string = 'L') => {
    const cartId = `${product.id}-${size}`;
    const existingIndex = cart.findIndex(item => item.cartId === cartId);
    
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      saveCart(newCart);
    } else {
      const newItem: CartItem = { cartId, product, size, quantity: 1 };
      saveCart([...cart, newItem]);
    }
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, 'L');
  };

  const updateCartQuantity = (cartId: string, delta: number) => {
    const newCart = cart.map(item => {
      if (item.cartId === cartId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    saveCart(newCart);
  };

  const removeFromCart = (cartId: string) => {
    const newCart = cart.filter(item => item.cartId !== cartId);
    saveCart(newCart);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedProduct(null);
    setSearchQuery('');
    setAdminPassword('');
    setAdminError(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopNow = () => {
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWinterCollection = () => {
    setView('winter-collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSummerCollection = () => {
    setView('summer-collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBestSelling = () => {
    setView('best-selling');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProfile = () => {
    setView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMembership = () => {
    setView('membership');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && view !== 'shop') {
      setView('shop');
    }
  };

  const handleStartCheckout = (items: CartItem[]) => {
    setCheckoutItems(items);
    setView('checkout');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAccess = () => {
    setView('admin-login');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === '1234') {
      setView('admin');
      setAdminError(false);
    } else {
      setAdminError(true);
    }
  };

  const handleMembershipRequest = (req: MembershipRequest) => {
    const updatedRequests = [req, ...membershipRequests];
    setMembershipRequests(updatedRequests);
    localStorage.setItem('cloth_cafe_membership_requests', JSON.stringify(updatedRequests));
    alert("Request received. Our baristas will verify your transaction within 24 hours.");
    handleBackToHome();
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    const updatedOrders = orders.map(o => o.id === updatedOrder.id ? updatedOrder : o);
    setOrders(updatedOrders);
    localStorage.setItem('cloth_cafe_orders', JSON.stringify(updatedOrders));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Global Guards for Full Screen Views
  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-brand text-white">
        <AdminPanel 
          products={products} 
          setProducts={(p) => { setProducts(p); localStorage.setItem('cloth_cafe_products', JSON.stringify(p)); }}
          categories={categories}
          setCategories={(c) => { setCategories(c); localStorage.setItem('cloth_cafe_categories', JSON.stringify(c)); }}
          orders={orders}
          setOrders={(o) => { setOrders(o); localStorage.setItem('cloth_cafe_orders', JSON.stringify(o)); }}
          membershipRequests={membershipRequests}
          onApproveMembership={(id, approve) => {
              const reqs = membershipRequests.map(r => r.id === id ? {...r, status: approve ? 'Approved' : 'Rejected'} : r);
              setMembershipRequests(reqs as any);
              localStorage.setItem('cloth_cafe_membership_requests', JSON.stringify(reqs));
          }} 
          members={members}
          onRemoveMember={(id) => {
              const ms = members.filter(m => m.id !== id);
              setMembers(ms);
              localStorage.setItem('cloth_cafe_members', JSON.stringify(ms));
          }} 
          siteConfig={siteConfig}
          setSiteConfig={(conf) => { setSiteConfig(conf); localStorage.setItem('cloth_cafe_config', JSON.stringify(conf)); }}
          onExit={handleBackToHome}
        />
      </div>
    );
  }

  if (view === 'admin-login') {
    return (
      <div className="min-h-screen bg-brand flex items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md w-full bg-zinc-900 border border-white/10 p-10 rounded-sm space-y-8 shadow-2xl relative overflow-hidden text-center">
           <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
           <Logo className="h-28 mx-auto mb-6" />
           <div className="space-y-2">
              <h2 className="font-heading text-3xl font-bold uppercase italic tracking-tighter">Secure <span className="text-accent">Portal</span></h2>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Administrator Credentials Required</p>
           </div>
           
           <form onSubmit={handleAdminLoginSubmit} className="space-y-6 text-left">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Infrastructure Key</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <input 
                      autoFocus
                      type="password" 
                      value={adminPassword}
                      onChange={(e) => { setAdminPassword(e.target.value); setAdminError(false); }}
                      placeholder="ENTER PASSCODE" 
                      className={`w-full bg-black border ${adminError ? 'border-red-500' : 'border-white/10'} p-4 pl-12 text-xs font-bold tracking-[0.3em] outline-none focus:border-accent transition-all text-white`}
                    />
                 </div>
                 {adminError && <p className="text-red-500 text-[8px] font-bold uppercase tracking-widest mt-2">Access Denied: Invalid Infrastructure Key</p>}
              </div>
              <button type="submit" className="w-full bg-white text-black font-heading font-bold py-5 uppercase tracking-[0.2em] hover:bg-accent transition-all">
                 Authorize Access
              </button>
           </form>
           
           <button 
             onClick={handleBackToHome}
             className="w-full text-zinc-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
           >
             Return to Public Gallery
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-black bg-black text-white">
      <Navbar 
        onLogoClick={handleBackToHome} 
        onAdminClick={handleAdminAccess} 
        onShopClick={handleShopNow}
        onProfileClick={handleOpenProfile}
        onCartClick={() => setIsCartOpen(true)}
        onEliteClick={handleOpenMembership}
        onWinterClick={handleWinterCollection}
        onSummerClick={handleSummerCollection}
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={() => handleStartCheckout(cart)}
      />

      <main className="pt-20">
        {view === 'home' && !searchQuery && (
          <>
            <Hero 
              title={siteConfig.heroTitle} 
              tagline={siteConfig.heroTagline} 
              backgroundImage={siteConfig.heroImageUrl}
              onShopNow={handleShopNow} 
            />
            <BrandMarquee />
            <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-6 justify-center">
               <button 
                 onClick={handleWinterCollection}
                 className="flex-1 max-w-sm group relative overflow-hidden h-48 border border-white/10 hover:border-blue-400 transition-all"
               >
                 <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover brightness-[0.3] group-hover:scale-110 transition-transform duration-700" />
                 <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-2">
                    <Snowflake size={32} className="text-blue-400" />
                    <h3 className="font-heading text-3xl font-bold uppercase italic tracking-tighter">Winter Collection</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">View Cold Weather Drops</p>
                 </div>
               </button>
               <button 
                 onClick={handleSummerCollection}
                 className="flex-1 max-w-sm group relative overflow-hidden h-48 border border-white/10 hover:border-orange-400 transition-all"
               >
                 <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover brightness-[0.3] group-hover:scale-110 transition-transform duration-700" />
                 <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-2">
                    <Sun size={32} className="text-orange-400" />
                    <h3 className="font-heading text-3xl font-bold uppercase italic tracking-tighter">Summer Collection</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">View Seasonal Fits</p>
                 </div>
               </button>
            </div>
            <CategoryGrid categories={categories} />
            <FeaturedProducts 
              products={products} 
              onProductSelect={handleProductClick} 
              onQuickAdd={handleQuickAdd}
              onViewAll={handleShopNow}
            />
            <Newsletter />
          </>
        )}

        {view === 'winter-collection' && (
          <div className="animate-fade-in pb-24">
             <section className="bg-black py-16 border-b border-blue-500/20">
                <div className="container mx-auto px-6 flex items-center gap-6">
                  <div className="bg-blue-500/20 p-4 rounded-sm">
                    <Snowflake className="text-blue-400" size={48} />
                  </div>
                  <div>
                    <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase italic tracking-tighter leading-none">
                      Winter <span className="text-blue-400">Drops</span>
                    </h1>
                    <p className="text-zinc-500 uppercase font-bold tracking-[0.3em] text-xs mt-2">Heavyweight fabrics and protective layers for the cold.</p>
                  </div>
                </div>
             </section>
             <FeaturedProducts 
                products={products.filter(p => p.collection === 'Winter')} 
                onProductSelect={handleProductClick} 
                onQuickAdd={handleQuickAdd}
                title="Winter Collection" 
             />
             <Newsletter />
          </div>
        )}

        {view === 'summer-collection' && (
          <div className="animate-fade-in pb-24">
             <section className="bg-black py-16 border-b border-orange-500/20">
                <div className="container mx-auto px-6 flex items-center gap-6">
                  <div className="bg-orange-500/20 p-4 rounded-sm">
                    <Sun className="text-orange-400" size={48} />
                  </div>
                  <div>
                    <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase italic tracking-tighter leading-none">
                      Summer <span className="text-orange-400">Drops</span>
                    </h1>
                    <p className="text-zinc-500 uppercase font-bold tracking-[0.3em] text-xs mt-2">Lightweight cotton and breathable silhouettes for the heat.</p>
                  </div>
                </div>
             </section>
             <FeaturedProducts 
                products={products.filter(p => p.collection === 'Summer')} 
                onProductSelect={handleProductClick} 
                onQuickAdd={handleQuickAdd}
                title="Summer Collection" 
             />
             <Newsletter />
          </div>
        )}

        {view === 'shop' && (
          <FeaturedProducts 
             products={filteredProducts} 
             onProductSelect={handleProductClick} 
             onQuickAdd={handleQuickAdd}
             title={searchQuery ? "Search Results" : "All Drops"} 
          />
        )}

        {view === 'best-selling' && (
          <FeaturedProducts 
             products={products.filter(p => p.isBestSelling)} 
             onProductSelect={handleProductClick} 
             onQuickAdd={handleQuickAdd}
             title="Best Selling" 
          />
        )}

        {view === 'membership' && (
          <EliteMembership 
            isElite={isEliteMember} 
            onJoin={() => setView('membership-checkout')} 
            onBack={handleBackToHome} 
          />
        )}

        {view === 'membership-checkout' && (
          <MembershipCheckout 
            onBack={() => setView('membership')} 
            onSubmit={handleMembershipRequest} 
          />
        )}

        {view === 'profile' && (
          <UserProfile 
            orders={orders} 
            userPoints={userPoints} 
            isElite={isEliteMember} 
            memberCode={userMemberCode}
            onBack={handleBackToHome} 
            onShopNow={handleShopNow}
            onUpdateOrder={handleUpdateOrder}
            onMembershipClick={handleOpenMembership}
          />
        )}

        {view === 'details' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={handleBackToHome} 
            onProceedToCheckout={(size) => handleStartCheckout([{ cartId: 'direct', product: selectedProduct, size, quantity: 1 }])}
          />
        )}

        {view === 'checkout' && checkoutItems.length > 0 && (
          <CheckoutPage 
            items={checkoutItems}
            userPoints={userPoints}
            activeMembers={members}
            onOrderCreated={(o) => {
              const updatedOrders = [o, ...orders];
              setOrders(updatedOrders);
              localStorage.setItem('cloth_cafe_orders', JSON.stringify(updatedOrders));
              // Clear cart if coming from there
              if (checkoutItems.length === cart.length) {
                saveCart([]);
              }
            }}
            onCancel={handleBackToHome}
          />
        )}
      </main>

      <Footer 
        onAdminClick={handleAdminAccess} 
        onBestSellingClick={handleBestSelling} 
        socialLinks={siteConfig.socialLinks} 
      />
    </div>
  );
};

export default App;
