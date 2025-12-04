'use client'
import { Department } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SkeletonCategories } from './front-end/SkeletonCategories'

export default function CategoryNav({ departments, isLoading }: { departments: Department[], isLoading: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll)
      checkScroll()
      return () => scrollContainer.removeEventListener('scroll', checkScroll)
    }
  }, [departments])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 300
    const container = scrollContainerRef.current
    const newScrollPosition = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative w-full bg-white border-b border-gray-200">
      <div className="relative flex items-center px-4 py-0">
        {/* Left Arrow - AliExpress Style */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-1 z-20 hidden h-7 w-7 items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:border-[#ff6a00] hover:text-[#ff6a00] md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Categories Container */}
        {isLoading ? (
          <SkeletonCategories />
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex w-full items-center gap-1 overflow-x-auto scroll-smooth px-10 scrollbar-hide"
          >
            {departments.map((category, i) => (
              <Link
                key={i}
                href={`/d/${category.slug}`}
                className="group relative px-3 py-2.5 text-xs font-medium text-gray-700 transition-all hover:text-[#ff6a00] whitespace-nowrap"
              >
                <span className="relative z-10">{category.title}</span>
                {/* Bottom border on hover */}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff6a00] scale-x-0 transition-transform group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        )}

        {/* Right Arrow - AliExpress Style */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-1 z-20 hidden h-7 w-7 items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:border-[#ff6a00] hover:text-[#ff6a00] md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
