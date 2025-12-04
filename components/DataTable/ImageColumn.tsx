import { DEFAULT_BLUR, DEFAULT_IMAGE } from "@/lib/lazyLoading";
import React from "react";
import CustomImage from "../ui/CustomImage";

export default function ImageColumn({
  row,
  accessorKey,
}: {
  row: any;
  accessorKey: any;
}) {
  const imageUrl = row.getValue(`${accessorKey}`);
  // const thum = row.getValue(`${accessorKey}`);
  // console.log(imageUrl);
  return (
    <div className="shrink-0">
      <CustomImage
        alt={`${accessorKey}`}
        className="aspect-square rounded-md object-cover"
        height="50"
        src={imageUrl ?? DEFAULT_IMAGE}
        width="50"
        placeholder="blur"
        blurDataURL={DEFAULT_BLUR}
      />
    </div>
  );
}
