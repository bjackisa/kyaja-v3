export function ProductGrid() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-100">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="Product image"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2 space-y-1">
              <h3 className="text-sm font-medium truncate">Product Name</h3>
              <p className="text-sm text-gray-500">$99.99</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  