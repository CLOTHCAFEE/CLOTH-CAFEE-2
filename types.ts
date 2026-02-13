
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: 'Hoodies' | 'Hats' | 'Jackets' | 'T-Shirts';
  collection?: 'Winter' | 'Summer'; // Added for seasonal filtering
  stock: number;
  rewardPoints: number;
  isBestSelling?: boolean;
}

export interface CartItem {
  cartId: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  tagline: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'COD' | 'bKash' | 'Nagad' | 'Rocket';

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  altPhone?: string;
  address: string; 
  thana: string;   
  district: string; 
  area: string;     
  instructions?: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  date: string;
  pointsEarned: number;
  pointsUsed?: number;
  discountAmount?: number;
}

export interface MembershipRequest {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  paymentMethod: PaymentMethod;
  transactionId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipCode: string;
  joinedDate: string;
}
