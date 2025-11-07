"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function CatSkeleton() {
  // Array of sections to generate skeletons for
  const sections = [
    { title: "Most-loved travel essentials", items: 4 },
    { title: "Level up your beauty routine", items: 4 },
    { title: "Home & Kitchen essentials", items: 4 },
    { title: "Explore more in Sports", items: 4 }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-8">    

      {/* Product sections grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            {/* Section title skeleton */}
            <Skeleton className="h-6 w-3/4 bg-muted/50" />
            
            {/* Product grid */}
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: section.items }).map((_, i) => (
                <div key={i} className="space-y-3">
                  {/* Product image skeleton */}
                  <Skeleton className="aspect-square rounded-lg bg-muted/50" />
                  {/* Product title skeleton */}
                  <Skeleton className="h-4 w-2/3 bg-muted/50" />
                </div>
              ))}
            </div>
            
            {/* CTA link skeleton */}
            <Skeleton className="h-4 w-24 bg-muted/50" />
          </div>
        ))}
      </div>
    </div>
  )
}

