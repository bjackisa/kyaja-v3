"use client";

import { DEFAULT_BLUR, DEFAULT_IMAGE } from "@/lib/lazyLoading";
import Image from "next/image";
import Link from "next/link";

export function CategoryNav({ otherCategories }) {
  return (
    <div className="overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex gap-4 min-w-max px-4">
        {otherCategories.map((category) => (
          <Link
            key={category.title}
            href={`/c/${category.slug}`}
            className="flex flex-col items-center gap-2 w-[80px]"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden border">
              <Image
                src={category.imageUrl ?? DEFAULT_IMAGE}
                alt={category.name}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={DEFAULT_BLUR}
              />
            </div>
            <span className="text-xs text-center leading-tight line-clamp-1">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
