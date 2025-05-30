export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  roomNumber: string;
  customerName: string;
  status: 'pending' | 'processing' | 'delivered';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}