"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { Banner } from "@/types";
type HomeCarouselProps = {
  slides: Banner[];
};

export default function HomeCarousel({ slides }: HomeCarouselProps) {
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 768) {
        setSlidesData(slides);
      } else {
        setSlidesData(slides);
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);

    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return (
    <Swiper
      dir='rtl'
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      centeredSlides={true}
      navigation={false}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination, Autoplay]}
      className='mySwiper'
    >
      {slidesData?.map((slide, index) => (
        <SwiperSlide key={index}>
          <Link href={`/banner/${slide.id}`}>
            <Image
              src={
                slide?.imageUrl?.trim() !== ""
                  ? slide.imageUrl
                  : "https://utfs.io/f/e281906b-2730-4413-bb75-8689452b8340-fvhgwx.svg"
              }
              className='w-full h-full object-contain rounded-md'
              width={1090}
              height={1090}
              alt='Kyaja all your desired online shopping store around kampala'
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
