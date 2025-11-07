"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import Link from "next/link"

export function FilterSidebar({ otherCategories:categories }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);
  
  const displayedCategories = showAll 
    ? categories 
    : categories?.slice(0, 3);


  return (
    <div className="w-full md:w-64 md:sticky md:top-4 flex-shrink-0 hidden md:block">
      <div className="p-4 border rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Categories</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full"
            >
              <span className="font-medium">Browse</span>
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {isExpanded && (
              <div className="mt-2 space-y-2">
                {displayedCategories?.map((category) => (
               <Link key={category.slug} href={`/c/${category.slug}`}>
                   <label
                    key={category.id}
                    className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded-md"
                  >
                    <input 
                      type="radio" 
                      name="category" 
                      className="accent-black" 
                    />
                    <span>{category.title}</span>
                
                  </label>
               </Link>
                ))}
                
                {categories?.length > 3 && (
                  <button 
                    className="flex items-center gap-1 text-sm text-gray-500 mt-2 hover:text-gray-700"
                    onClick={() => setShowAll(!showAll)}
                  >
                    <Plus size={16} />
                    <span>{showAll ? 'Show Less' : 'View More'}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}