"use client";
import { FALLBACK_IMAGE_URL } from "@/lib/constants";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

const CustomImage = (props: ImageProps) => {
  const { src, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(FALLBACK_IMAGE_URL);
      }}
    />
  );
};

export default CustomImage;
