"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCat() {
  return (
    <div className="w-full space-y-6 py-6 px-4 md:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Category Card */}
            <div className="relative">
              {/* Image Skeleton with diagonal overlay */}
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Skeleton className="absolute inset-0" />
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-10"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 50%)"
                  }}
                />
              </div>
              
              {/* Category Title */}
              <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Categories Strip */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 min-w-max py-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton 
                className="h-4" 
                style={{
                  width: `${Math.floor(Math.random() * (100 - 60) + 60)}px`
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

