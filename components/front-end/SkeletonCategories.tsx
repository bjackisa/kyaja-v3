"use client"

export function SkeletonCategories() {
  return (
    <div className="w-full bg-gray-800/10 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-6 px-4 py-2 min-w-max">
        {/* Generate 12 skeleton items to match the number of categories */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded animate-pulse"
            style={{
              // Vary the widths to make it look more natural
              width: `${Math.floor(Math.random() * (120 - 80) + 80)}px`
            }}
          />
        ))}
      </div>
    </div>
  )
}

