"use client"

import { cn } from "@/lib/utils"

export function SkeletonBanner() {
  return (
    <div className="container mx-auto flex w-full gap-3 h-[200px] md:h-[280px] lg:h-[310px] mt-10">
      {/* Left Banner - Hidden on mobile */}
      <div className="w-[25%] lg:block hidden">
        <div className="relative h-full w-full animate-pulse bg-gray-200 rounded-lg" />
      </div>

      {/* Center Carousel */}
      <div className="relative lg:w-1/2 w-full">
        <div className="h-full w-full animate-pulse bg-gray-200 rounded-lg" />
        {/* Skeleton Navigation Dots */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="w-3 h-1.5 rounded-full bg-gray-300"
            />
          ))}
        </div>
      </div>

      {/* Right Flash Deals - Hidden on mobile */}
      <div className="rounded-lg lg:block hidden md:w-[25%] animate-pulse">
        <div className="h-5 w-32 bg-gray-200 mb-4 rounded" />
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i} className="aspect-square w-full bg-gray-200 rounded-lg">
              <div className="mt-2 h-8 w-12 bg-gray-300 rounded absolute bottom-2 left-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

