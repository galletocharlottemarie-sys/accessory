import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  HeroCTA 
} from './components/HeroCTA';
import { 
  RuleOfThirdsFeatures 
} from './components/RuleOfThirdsFeatures';
import { 
  StorePage 
} from './components/StorePage';
import { 
  ProductDetailModal 
} from './components/ProductDetailModal';
import { 
  ReviewModal 
} from './components/ReviewModal';
import { 
  SellerDashboard 
} from './components/SellerDashboard';
import { 
  RegisterModal 
} from './components/RegisterModal';
import { 
  PayMongoCheckoutModal 
} from './components/PayMongoCheckoutModal';
import { 
  CartDrawer 
} from './components/CartDrawer';
import { 
  AIChatbotModal 
} from './components/AIChatbotModal';
import { 
  AboutUsPage 
} from './components/AboutUsPage';
import { 
  ContactsPage 
} from './components/ContactsPage';
import { 
  SitemapSection 
} from './components/SitemapSection';
import { 
  Footer 
} from './components/Footer';
import { 
  IntegrationDocsModal 
} from './components/IntegrationDocsModal';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_REVIEWS 
} from './data/mockProducts';
import { 
  NavigationTab, 
  Product, 
  Review, 
  CartItem, 
  User, 
  Order 
} from './types';
import { Sparkles, MessageSquare, ArrowUp } from 'lucide-react';

export default function App() {
  // Navigation State (Home is index.html landing)
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  
  // Data States
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aura_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('aura_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aura_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('aura_favorites');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aura_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // UI / Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reviewingProduct, setReviewingProduct] = useState<Product | null>(null);
  const [directCheckoutProduct, setDirectCheckoutProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [aiContextProduct, setAiContextProduct] = useState<Product | null>(null);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist State to LocalStorage for seamless session durability
  useEffect(() => {
    localStorage.setItem('aura_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aura_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aura_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aura_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('aura_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart Management
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleInstantBuy = (product: Product) => {
    setDirectCheckoutProduct(product);
    setIsCheckoutOpen(true);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Review Submission (Ability #5)
  const handleSubmitReview = (newReview: Review) => {
    setReviews(prev => [newReview, ...prev]);

    // Recalculate product rating
    setProducts(prevProducts =>
      prevProducts.map(p => {
        if (p.id === newReview.productId) {
          const productReviews = [newReview, ...reviews.filter(r => r.productId === p.id)];
          const newAvg = Number((productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1));
          return {
            ...p,
            rating: newAvg,
            reviewsCount: productReviews.length
          };
        }
        return p;
      })
    );
  };

  // User Selling Product Posting (Ability #2)
  const handleAddNewProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Payment Success (Ability #1)
  const handlePaymentSuccess = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    // If regular cart checkout, clear cart
    if (!directCheckoutProduct) {
      setCartItems([]);
    }
    setDirectCheckoutProduct(null);
  };

  // Scroll to Top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F8FAFC] flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Header with Navigational links: Home, About Us, Contacts, Seller Dashboard, Store Page */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartItems={cartItems}
        onOpenAI={() => { setAiContextProduct(null); setIsAIOpen(true); }}
        onOpenDocs={() => setIsDocsOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(p) => setSelectedProduct(p)}
        products={products}
      />

      {/* 2. Main Body & View Routing */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div className="space-y-4">
            {/* Rule of Thirds Hero CTA Section */}
            <HeroCTA
              onExploreStore={() => setCurrentTab('store')}
              onOpenSellerDashboard={() => setCurrentTab('seller_dashboard')}
              onOpenAI={() => { setAiContextProduct(null); setIsAIOpen(true); }}
              featuredProduct={products[0] || INITIAL_PRODUCTS[0]}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* Design Principles & Core Abilities Section */}
            <RuleOfThirdsFeatures
              setCurrentTab={setCurrentTab}
              onOpenAI={() => { setAiContextProduct(null); setIsAIOpen(true); }}
            />

            {/* Featured Curated Accessories Spotlight */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                    Curated Pieces
                  </div>
                  <h2 className="text-3xl font-bold text-slate-100 font-serif-luxury mt-1">
                    Signature High-Jewelry & Leathercraft
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentTab('store')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Full Catalog ({products.length} Pieces)</span>
                  <span>→</span>
                </button>
              </div>

              {/* 3-Column Rule of Thirds Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group relative rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer text-left"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950 relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-sm text-slate-300 text-[10px] font-mono border border-slate-700">
                        {product.category}
                      </div>
                      <div className="absolute bottom-3 left-3 text-xs font-mono text-amber-400 font-bold bg-slate-950/90 px-2.5 py-1 rounded-md border border-slate-800">
                        ₱{product.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="text-xs text-slate-400 flex items-center justify-between">
                        <span>{product.seller.name}</span>
                        <span className="text-amber-400">★ {product.rating}</span>
                      </div>
                      <h3 className="font-bold text-slate-100 font-serif-luxury group-hover:text-amber-300 transition-colors truncate">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-xs font-semibold text-amber-400">
                        <span>PayMongo Ready</span>
                        <span className="group-hover:translate-x-1 transition-transform">Details →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentTab === 'store' && (
          <StorePage
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, e) => {
              e.stopPropagation();
              handleAddToCart(p, 1);
            }}
            onInstantBuy={(p, e) => {
              e.stopPropagation();
              handleInstantBuy(p);
            }}
            favorites={favorites}
            onToggleFavorite={(id, e) => {
              e.stopPropagation();
              handleToggleFavorite(id);
            }}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenSellerDashboard={() => setCurrentTab('seller_dashboard')}
            onOpenAI={() => { setAiContextProduct(null); setIsAIOpen(true); }}
          />
        )}

        {currentTab === 'seller_dashboard' && (
          <SellerDashboard
            products={products}
            currentUser={currentUser}
            onAddNewProduct={handleAddNewProduct}
            onDeleteProduct={handleDeleteProduct}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutUsPage
            setCurrentTab={setCurrentTab}
            onOpenSellerDashboard={() => setCurrentTab('seller_dashboard')}
          />
        )}

        {currentTab === 'contacts' && (
          <ContactsPage
            onOpenAI={() => { setAiContextProduct(null); setIsAIOpen(true); }}
          />
        )}

        {currentTab === 'sitemap' && (
          <SitemapSection
            setCurrentTab={setCurrentTab}
            onOpenDocs={() => setIsDocsOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenAI={() => { setAiContextProduct(null); setIsAIOpen(true); }}
          />
        )}
      </main>

      {/* 3. Global Sitemap & Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAI={() => { setAiContextProduct(null); setIsAIOpen(true); }}
      />

      {/* Floating AI Stylist Concierge Launcher */}
      <button
        id="floating-ai-stylist-launcher"
        onClick={() => { setAiContextProduct(null); setIsAIOpen(!isAIOpen); }}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        aria-label="Open AI Concierge"
      >
        <Sparkles className="w-5 h-5 animate-spin-slow" />
        <span className="hidden md:inline text-xs font-extrabold uppercase tracking-wider">
          Aura Stylist
        </span>
      </button>

      {/* Modals & Drawers */}
      
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        reviews={reviews}
        currentUser={currentUser}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
        onInstantBuy={(p) => handleInstantBuy(p)}
        onOpenReviewModal={(p) => setReviewingProduct(p)}
        onOpenAIStylist={(p) => {
          setAiContextProduct(p);
          setIsAIOpen(true);
        }}
        isFavorite={Boolean(selectedProduct && favorites.includes(selectedProduct.id))}
        onToggleFavorite={(id) => handleToggleFavorite(id)}
      />

      {/* Review Submission Modal (Ability #5: User or buyer can enter reviews & star ratings) */}
      {reviewingProduct && (
        <ReviewModal
          product={reviewingProduct}
          currentUser={currentUser}
          isOpen={Boolean(reviewingProduct)}
          onClose={() => setReviewingProduct(null)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {/* PayMongo Checkout Modal (Ability #1: Receive payment from buyer) */}
      <PayMongoCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setDirectCheckoutProduct(null);
        }}
        cartItems={cartItems}
        directProduct={directCheckoutProduct}
        currentUser={currentUser}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setDirectCheckoutProduct(null);
          setIsCheckoutOpen(true);
        }}
      />

      {/* User Registration Modal (Ability #3: User registers and inputs GCash Number) */}
      <RegisterModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLoginOrRegister={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* AI Chatbot Widget (Ability #4: With AI chatbot, Voiceflow & Gemini) */}
      <AIChatbotModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        products={products}
        initialContextProduct={aiContextProduct}
      />

      {/* Integration Docs Modal (Vercel, Supabase SQL, PayMongo Webhook events, Voiceflow) */}
      <IntegrationDocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

    </div>
  );
}
