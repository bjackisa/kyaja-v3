import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 mt-6">
      {/* Main Product Section */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Image Carousel */}
        <div className="relative col-span-1 md:col-span-1">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <button className="absolute opacity-10 left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg ">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 rounded-full bg-white/80 p-2 shadow-lg">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Product Details */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-start justify-between">
            <Skeleton className="h-8 w-32" />
            <Heart className="opacity-10 h-6 w-6 text-muted-foreground" />
          </div>
          <Skeleton className="mt-4 h-12 w-full" />

          {/* Price */}
          <div className="mt-6 flex items-center gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>

          {/* Stock */}
          <Skeleton className="mt-4 h-6 w-32" />

          {/* Rating */}
          <div className="mt-4 flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-12 w-full sm:w-1/2" />
            <Skeleton className="h-12 w-full sm:w-1/2" />
          </div>
        </div>

        {/* Delivery Info */}
        <div className="col-span-1 space-y-6">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Skeleton className="h-10 w-10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Skeleton className="h-10 w-10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <Skeleton className="mb-8 h-8 w-48" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
