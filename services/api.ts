import { Product, Category, Brand, Review, Order } from "../types";
import { mockProducts, mockCategories, mockBrands, mockReviews } from "../mock/data";
import { useProductStore } from "../store/product";
import { useReviewStore } from "../store/review";

const LATENCY = 300; // Simulated latency in ms

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class ApiService {
  // --- Products ---
  static async getProducts(filters?: {
    category?: string;
    brand?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    sort?: "price-asc" | "price-desc" | "rating" | "latest";
  }): Promise<Product[]> {
    await delay(LATENCY);
    let products = typeof window !== "undefined" ? useProductStore.getState().products : [...mockProducts];

    if (filters) {
      if (filters.category && filters.category !== "all") {
        products = products.filter(
          (p) => p.categorySlug.toLowerCase() === filters.category?.toLowerCase()
        );
      }
      if (filters.brand && filters.brand !== "all") {
        products = products.filter(
          (p) => p.brandName.toLowerCase() === filters.brand?.toLowerCase()
        );
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        products = products.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
      }
      if (filters.minPrice !== undefined) {
        products = products.filter(
          (p) => (p.discountPrice || p.price) >= (filters.minPrice ?? 0)
        );
      }
      if (filters.maxPrice !== undefined) {
        products = products.filter(
          (p) => (p.discountPrice || p.price) <= (filters.maxPrice ?? Infinity)
        );
      }
      if (filters.rating !== undefined) {
        products = products.filter((p) => p.rating >= (filters.rating ?? 0));
      }
      if (filters.sort) {
        switch (filters.sort) {
          case "price-asc":
            products.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
            break;
          case "price-desc":
            products.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
            break;
          case "rating":
            products.sort((a, b) => b.rating - a.rating);
            break;
          case "latest":
            products.sort((a, b) => (b.isLatest ? 1 : 0) - (a.isLatest ? 1 : 0));
            break;
        }
      }
    }

    return products;
  }

  static async getProductBySlug(slug: string): Promise<Product | undefined> {
    await delay(LATENCY);
    const products = typeof window !== "undefined" ? useProductStore.getState().products : [...mockProducts];
    return products.find((p) => p.slug === slug);
  }

  static async getProductById(id: string): Promise<Product | undefined> {
    await delay(LATENCY);
    const products = typeof window !== "undefined" ? useProductStore.getState().products : [...mockProducts];
    return products.find((p) => p.id === id);
  }

  static async getRelatedProducts(productId: string, categoryId: string, limit: number = 4): Promise<Product[]> {
    await delay(LATENCY);
    const products = typeof window !== "undefined" ? useProductStore.getState().products : [...mockProducts];
    return products
      .filter((p) => p.categoryId === categoryId && p.id !== productId)
      .slice(0, limit);
  }

  // --- Categories & Brands ---
  static async getCategories(): Promise<Category[]> {
    await delay(LATENCY);
    return mockCategories;
  }

  static async getBrands(): Promise<Brand[]> {
    await delay(LATENCY);
    return mockBrands;
  }

  // --- Reviews ---
  static async getReviews(productId: string): Promise<Review[]> {
    await delay(LATENCY);
    return useReviewStore.getState().reviews[productId] || [];
  }

  static async submitReview(
    productId: string,
    reviewData: { userName: string; rating: number; comment: string }
  ): Promise<Review> {
    await delay(LATENCY + 200);
    const newReview: Review = {
      id: "rev-" + Math.random().toString(36).substr(2, 9),
      productId,
      userName: reviewData.userName,
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString().split("T")[0],
      verifiedPurchase: true,
    };

    useReviewStore.getState().addReview(productId, newReview);

    // Calculate dynamic rating and count
    const currentReviews = useReviewStore.getState().reviews[productId] || [];
    const sum = currentReviews.reduce((acc, r) => acc + r.rating, 0);
    const newRating = parseFloat((sum / currentReviews.length).toFixed(1));
    const newReviewsCount = currentReviews.length;

    // Update product rating persistently
    useProductStore.getState().updateProduct(productId, {
      rating: newRating,
      reviewsCount: newReviewsCount,
    });

    return newReview;
  }

  // --- Newsletter & Contact ---
  static async submitNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    await delay(LATENCY + 100);
    console.log("Newsletter subscription:", email);
    return { success: true, message: "Thank you for subscribing to our newsletter!" };
  }

  static async submitContact(data: { name: string; email: string; message: string }): Promise<{ success: boolean; message: string }> {
    await delay(LATENCY + 100);
    console.log("Contact form submission:", data);
    return { success: true, message: "Message sent! We will get back to you shortly." };
  }

  // --- Orders ---
  static async createOrder(orderData: Omit<Order, "id" | "date" | "status">): Promise<Order> {
    await delay(LATENCY + 300);
    const newOrder: Order = {
      ...orderData,
      id: "ord-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      status: "pending",
      trackingNumber: "TRK" + Math.floor(10000000 + Math.random() * 90000000),
    };
    return newOrder;
  }
}
