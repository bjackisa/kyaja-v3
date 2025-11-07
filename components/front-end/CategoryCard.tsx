import { DEFAULT_BLUR, DEFAULT_IMAGE } from "@/lib/lazyLoading";
import Image from "next/image";
import Link from "next/link";

export function CategoryCard({
  category,
  link,
}: {
  category: any;
  link: string;
}) {
  const imageUrl = category.imageUrl || DEFAULT_IMAGE;

  return (
    <a href={`/${link}/${category.slug}`} className="group block">
      <div className="aspect-square relative overflow-hidden rounded-md transition-transform duration-300">
        <Image
          src={imageUrl}
          alt={category.title}
          fill
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
          {category.title}
        </h3>
      </div>
    </a>
  );
}
