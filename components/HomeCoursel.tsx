"use client"
import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import "swiper/css/effect-fade"
import Link from "next/link"
import Image from "next/image"
import { Banner } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"

type HomeCarouselProps = {
  slides: Banner[]
}

export default function HomeCarousel({ slides }: HomeCarouselProps) {
  const [slidesData, setSlidesData] = useState<Banner[]>([])

  useEffect(() => {
    const updateSlides = () => {
      setSlidesData(slides)
    }
    updateSlides()
    window.addEventListener("resize", updateSlides)
    return () => window.removeEventListener("resize", updateSlides)
  }, [slides])

  return (
    <div className="relative w-full group">
      {/* Carousel Container with gradient overlay */}
      <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 shadow-2xl shadow-orange-500/10">
        <Swiper
          dir="ltr"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={800}
          loop={true}
          centeredSlides={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
            bulletClass: "swiper-pagination-bullet-custom",
            bulletActiveClass: "swiper-pagination-bullet-active-custom",
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="hero-swiper"
        >
          {slidesData?.map((slide, index) => (
            <SwiperSlide key={index}>
              <Link href={`/banner/${slide.id}`} className="block relative">
                {/* Image with overlay gradient */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-neutral-900 to-black">
                  <Image
                    src={
                      slide?.imageUrl?.trim() !== ""
                        ? slide.imageUrl
                        : "https://utfs.io/f/e281906b-2730-4413-bb75-8689452b8340-fvhgwx.svg"
                    }
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    alt="Kyaja - Your desired online shopping destination"
                    priority={index === 0}
                  />
                  {/* Subtle gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-orange-500/30 text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-orange-500/30 text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2" />
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .hero-swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-pagination-bullet-custom {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(249, 115, 22, 0.3);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-custom:hover {
          background: rgba(249, 115, 22, 0.5);
          transform: scale(1.2);
        }

        .swiper-pagination-bullet-active-custom {
          width: 32px;
          background: linear-gradient(90deg, #f97316, #ea580c);
          border-color: #f97316;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </div>
  )
}
