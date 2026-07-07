export interface Address {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string; // URL path or SVG text
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productsCount?: number;
}

export interface Specification {
  name: string;
  value: string;
}

export interface ProductVariant {
  type: "color" | "size";
  value: string;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  categoryId: string;
  categorySlug: string;
  brandId: string;
  brandName: string;
  stock: number;
  specifications: Specification[];
  variants: ProductVariant[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isLatest?: boolean;
  isFlashSale?: boolean;
  flashSaleEnd?: string; // ISO string date
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refund_requested" | "refunded";
  date: string;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
}
