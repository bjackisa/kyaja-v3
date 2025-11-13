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
    <div className="relative w-full bg-gradient-to-r from-black via-neutral-900 to-black border-b border-orange-500/20">
      <div className="relative flex items-center px-4 py-2">
        {/* Left Arrow with modern styling */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 z-20 hidden h-8 w-8 items-center justify-center rounded-full bg-black/80 backdrop-blur-sm border border-orange-500/30 text-orange-500 shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-500 hover:text-black hover:scale-110 hover:shadow-orange-500/40 md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Categories Container */}
        {isLoading ? (
          <SkeletonCategories />
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex w-full items-center gap-3 overflow-x-auto scroll-smooth px-12 scrollbar-hide"
          >
            {departments.map((category, i) => (
              <Link
                key={i}
                href={`/d/${category.slug}`}
                className="group relative px-4 py-1.5 text-sm font-medium text-white/90 transition-all hover:text-orange-500 whitespace-nowrap"
              >
                <span className="relative z-10">{category.title}</span>
                {/* Hover background effect */}
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
                {/* Bottom border on hover */}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-all group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </div>
        )}

        {/* Right Arrow with modern styling */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 z-20 hidden h-8 w-8 items-center justify-center rounded-full bg-black/80 backdrop-blur-sm border border-orange-500/30 text-orange-500 shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-500 hover:text-black hover:scale-110 hover:shadow-orange-500/40 md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
    </div>
  )
}
