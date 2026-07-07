import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Review } from "../types";
import { mockReviews } from "../mock/data";

interface ReviewState {
  reviews: Record<string, Review[]>;
  addReview: (productId: string, review: Review) => void;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      reviews: mockReviews,

      addReview: (productId, review) => {
        set((state) => {
          const currentReviews = state.reviews[productId] ? [...state.reviews[productId]] : [];
          return {
            reviews: {
              ...state.reviews,
              [productId]: [review, ...currentReviews],
            },
          };
        });
      },
    }),
    {
      name: "fisto-reviews-storage",
    }
  )
);
