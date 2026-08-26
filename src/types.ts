export interface User {
  id: string;
  name: string;
  email: string;
  gcashNumber: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
  address?: string;
  joinedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  gcashVerified?: boolean;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: 'Jewelry' | 'Watches' | 'Bags' | 'Eyewear' | 'Belts & Leather' | 'Scarves & Hats';
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  description: string;
  material: string;
  specs: { [key: string]: string };
  inStock: boolean;
  stockCount: number;
  tags: string[];
  featured?: boolean;
  seller: {
    id: string;
    name: string;
    gcashNumber: string;
    rating: number;
    verified: boolean;
    location: string;
  };
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  buyerName: string;
  buyerEmail: string;
  buyerGcash: string;
  shippingAddress: string;
  paymentMethod: 'gcash' | 'card' | 'maya' | 'grab_pay';
  status: 'paid' | 'pending' | 'processing' | 'shipped' | 'delivered';
  paymongoPaymentIntentId?: string;
  createdAt: string;
  receiptNumber: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  recommendedProductIds?: string[];
}

export type NavigationTab = 'home' | 'store' | 'about' | 'contacts' | 'seller_dashboard' | 'sitemap' | 'docs';
