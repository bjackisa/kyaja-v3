"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";
import { Loader2, Package, Sparkles } from "lucide-react";
import { getTopDeals, TopDealsResponse } from "@/actions/top-deals";
import ProductCard from "./ProductCard";
import { Product } from "@prisma/client";

interface TopDealsProps {
  initialData?: TopDealsResponse;
}

export default function TopDeals({ initialData }: TopDealsProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["topDeals"],
    queryFn: ({ pageParam = null }) => getTopDeals(pageParam, 10),
    getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [null],
        }
      : undefined,
    initialPageParam: null,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Create new observer
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Safely extract products with multiple fallbacks
  const allProducts = data?.pages?.flatMap((page) => page?.data || []) || [];

  if (isLoading) {
    return (
      <div className="w-full">
        <TopDealsHeader />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-[#F68B1E]" />
            <p className="text-gray-600 text-lg">Loading top deals...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <TopDealsHeader />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <Package className="h-16 w-16 text-gray-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Failed to load top deals
              </h3>
              <p className="text-gray-600">
                Something went wrong. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.pages || allProducts.length === 0) {
    return (
      <div className="w-full">
        <TopDealsHeader />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <Package className="h-16 w-16 text-gray-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No top deals available
              </h3>
              <p className="text-gray-600">
                Check back later for amazing deals!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl md:mt-[4%] mt-[20%] mx-auto">
      <TopDealsHeader />

      <div className="px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {allProducts
            .filter((product) => product && product.imageUrl) // Filter out null/undefined products
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product as Product}
                showAddToCart
              />
            ))}
        </div>

        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-[#F68B1E]" />
              <span className="text-gray-600">Loading more deals...</span>
            </div>
          </div>
        )}

        {hasNextPage && !isFetchingNextPage && (
          <div ref={loadMoreRef} className="h-1 w-full" />
        )}

        {!hasNextPage && allProducts.length > 0 && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="h-px bg-gray-200 w-16 mx-auto mb-4"></div>
              <p className="text-gray-500 text-sm">
                You've reached the end of our top deals!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Header Component
function TopDealsHeader() {
  return (
    <div className="bg-gradient-to-r from-[#F68B1E] to-[#FF6B35] text-white py-6 md:py-8 mb-6 md:mb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="h-6 w-6 md:h-8 md:w-8 animate-pulse" />
          <div className="text-center">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">
              Top Deals
            </h1>
            <p className="text-sm md:text-base opacity-90">
              Discover amazing products at unbeatable prices
            </p>
          </div>
          <Sparkles className="h-6 w-6 md:h-8 md:w-8" />
        </div>
      </div>
    </div>
  );
}