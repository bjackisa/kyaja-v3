'use client'
import { Department } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SkeletonCategories } from './front-end/SkeletonCategories'

export default function CategoryNav({ departments , isLoading}:{departments:Department[] , isLoading:boolean}) {
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
      // Initial check
      checkScroll()
      
      return () => scrollContainer.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 200
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
    <div className="relative flex h-10 w-full items-center md:bg-[#232f3e] bg-[#131921] px-4 py-5 z-[-10]">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 hidden h-12 w-12 items-center justify-center bg-gradient-to-r from-[#f8f8f8] to-transparent hover:from-[#e3e3e3] md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
 
     
     {
      isLoading ?(
        <SkeletonCategories />
      ):(
<div
        ref={scrollContainerRef}
        className="flex w-full items-center gap-6 overflow-x-auto scroll-smooth whitespace-nowrap px-2 scrollbar-hide"
      >
        {departments.map((category , i) => (
          <Link
            key={i}
            href={`/d/${category.slug}`}
            className="text-sm text-gray-200 hover:text-gray-400"
          >
            {category.title}
          </Link>
        ))}
      </div>
      )
     }
      {/* Categories */}
      

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 hidden h-12 w-12 items-center justify-center bg-gradient-to-l from-[#f8f8f8] to-transparent hover:from-[#e3e3e3] md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}

