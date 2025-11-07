"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function CatDetailedSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="space-y-6">
            {/* Department Title */}
            <Skeleton className="h-8 w-3/4" />
            
            {/* Categories */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              {/* Category items */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-6" />
                </div>
              ))}
              <Skeleton className="h-6 w-24 mt-2" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-24" />
          </div>

          {/* Categories Scroll */}
          <div className="w-full overflow-x-auto mb-8 no-scrollbar">
            <div className="flex items-center gap-6 pb-4 min-w-max">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-4"
                  style={{
                    width: `${Math.floor(Math.random() * (120 - 80) + 80)}px`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

