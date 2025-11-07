"use client";

import { useRecentlyViewedStore } from "@/hooks/store/recently-viewed";
import ProductCard from "./ProductCard";

export default function RecentlyViewedProducts() {
  const { recentlyViewed } = useRecentlyViewedStore();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed-products my-8 bg-white rounded-md p-4 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Recently Viewed Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recentlyViewed.map((product) => (
          <ProductCard key={product.id} product={product} showAddToCart={true}/>
        ))}
      </div>
    </div>
  );
}
