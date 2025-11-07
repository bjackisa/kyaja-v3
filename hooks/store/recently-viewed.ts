import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/actions/product-server";

interface RecentlyViewedState {
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist<RecentlyViewedState>(
    (set, get) => ({
      recentlyViewed: [],
      addRecentlyViewed: (product) => {
        const current = get().recentlyViewed;

        // Remove the product if it already exists
        const filtered = current.filter((p) => p.id !== product.id);

        // Add the new product to the start of the array
        const updated = [product, ...filtered].slice(0, 5);

        set({ recentlyViewed: updated });
      },
    }),
    {
      name: "recently-viewed-products",
    }
  )
);
