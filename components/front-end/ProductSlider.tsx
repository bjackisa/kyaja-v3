"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { DEFAULT_BLUR, DEFAULT_IMAGE } from "@/lib/lazyLoading";
type ProductSliderProps = {
  data: string[];
};
export default function ProductSlider({ data }: ProductSliderProps) {
  const thumbsSwiper = useRef<any | null>(null); // Moved outside of conditional

  // console.log(data);
  if (!data) {
    return null;
  }

  return (
    <div className="prdt-image">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as any
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper.current }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data.map((image: any, i) => {
          return (
            <SwiperSlide key={i}>
              <Image
                src={image ?? DEFAULT_IMAGE}
                alt={`Product Image`}
                className="object-cover"
                objectFit="cover"
                width={300}
                height={300}
                placeholder="blur"
                blurDataURL={DEFAULT_BLUR}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => (thumbsSwiper.current = swiper) as any}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {data.map((image: any, i) => {
          return (
            <SwiperSlide key={i}>
              <Image
                src={image}
                alt={`Thumbnail Image`}
                className="object-cover"
                objectFit="cover"
                width={300}
                height={300}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
