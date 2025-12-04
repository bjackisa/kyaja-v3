"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Banner } from "@/types";
import { ITopDealsProduct } from "@/actions/banner";
import { DEFAULT_BLUR, DEFAULT_IMAGE } from "@/lib/lazyLoading";

// Generate attractive headers for flash deals
const getFlashDealsHeader = () => {
  const headers = [
    {
      title: "Flash Deals",
      emoji: "⚡",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Hot Deals",
      emoji: "🔥",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Super Deals",
      emoji: "💥",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Flash Deals",
      emoji: "🏆",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Limited Time",
      emoji: "⏰",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const currentHour = new Date().getHours();
  return headers[currentHour % headers.length];
};

interface HomeBannerProps {
  banners: Banner[];
  topDeals: ITopDealsProduct[];
}

export default function HomeBanner({ banners, topDeals }: HomeBannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dealsEmblaRef, dealsEmblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const flashHeader = getFlashDealsHeader();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Group deals into chunks of 4 for better organization
  const groupedDeals = [];
  for (let i = 0; i < topDeals.length; i += 4) {
    groupedDeals.push(topDeals.slice(i, i + 4));
  }

  return (
    <div className="container mx-auto mt-4 md:px-4">
      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full gap-3 h-[340px]">
        {/* Left Side Banner */}
        <Link href="/category-d" className="w-1/4">
          <div className="relative h-full overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <Image
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR}
              src="https://img.ltwebstatic.com/images3_ccc/2024/08/28/32/1724814607d0aea17ca9b86f4fc4e69c679012a7cd.webp"
              alt="Sale Zone"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </Link>

        {/* Center Carousel */}
        <div className="relative w-1/2 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="relative w-full h-full">
            {banners.map((item, index) => (
              <Link
                href={`/banner/${item.id}`}
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 block ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  placeholder="blur"
                  blurDataURL={DEFAULT_BLUR}
                  src={item.imageUrl ?? DEFAULT_IMAGE}
                  alt={`Slide ${index + 1}`}
                  className="object-cover w-full h-full"
                  width={4000}
                  height={3000}
                  priority={index === currentSlide}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </Link>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center z-20">
            <div className="flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-white w-8" : "bg-white/50 w-2"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 z-20 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 z-20 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Right Flash Deals */}
        <div className="w-1/4 bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
              <span className="text-base">⚡</span>
              Flash Deals
            </h3>
            <a
              href="/deals"
              className="text-xs font-semibold text-[#ff6a00] hover:text-[#ff8534] flex items-center gap-0.5 transition-colors"
            >
              See All <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 h-[280px] overflow-y-auto scrollbar-hide">
            {topDeals?.slice(0, 6).map((deal, index) => (
              <Link
                key={index}
                href={`/p/${deal.slug}`}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <Image
                    src={deal.imageUrl}
                    alt={deal.slug}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-1.5 left-1.5">
                    <span className="bg-[#ff4747] text-white px-1.5 py-0.5 rounded text-[9px] font-bold shadow-sm">
                      -{Math.floor(Math.random() * 50 + 10)}%
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                  <div className="text-white text-[10px] font-bold">
                    Shs{" "}
                    {new Intl.NumberFormat("en-US").format(deal.productPrice)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Layout */}
      <div className="lg:hidden space-y-3">
        {/* Main Banner Carousel */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200 shadow-sm h-[180px] md:h-[220px]">
          <div className="relative w-full h-full">
            {banners.map((item, index) => (
              <Link
                href={`/banner/${item.id}`}
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 block ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  placeholder="blur"
                  blurDataURL={DEFAULT_BLUR}
                  src={item.imageUrl ?? DEFAULT_IMAGE}
                  alt={`Slide ${index + 1}`}
                  className="object-cover w-full h-full"
                  width={4000}
                  height={3000}
                  priority={index === currentSlide}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
              </Link>
            ))}
          </div>

          {/* Mobile Carousel Controls */}
          <div className="absolute inset-x-0 bottom-2 flex justify-center z-20">
            <div className="flex space-x-1.5">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`h-1 rounded-full transition-all ${
                    index === currentSlide ? "bg-white w-4" : "bg-white/50 w-1"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Flash Deals Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
              <span className="text-base">⚡</span>
              Flash Deals
            </h3>
            <a
              href="/deals"
              className="text-xs font-semibold text-[#ff6a00] hover:text-[#ff8534] flex items-center gap-0.5 transition-colors"
            >
              See All <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Horizontal Scrolling Container */}
          <div className="overflow-hidden" ref={dealsEmblaRef}>
            <div className="flex gap-3">
              {groupedDeals.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="flex-none w-[280px] md:w-[320px]"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {group.map((deal, dealIndex) => (
                      <Link
                        key={dealIndex}
                        href={`/p/${deal.slug}`}
                        className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 hover:shadow-md transition-all duration-300"
                      >
                        <div className="aspect-square relative">
                          <Image
                            src={deal.imageUrl}
                            alt={deal.slug}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-1.5 left-1.5">
                            <span className="bg-[#ff4747] text-white px-1.5 py-0.5 rounded text-[9px] font-bold shadow-sm">
                              -{Math.floor(Math.random() * 50 + 10)}%
                            </span>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                          <div className="text-white text-[10px] font-bold">
                            Shs{" "}
                            {new Intl.NumberFormat("en-US").format(
                              deal.productPrice
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
