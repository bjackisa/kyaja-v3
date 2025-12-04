import { DEFAULT_BLUR, DEFAULT_IMAGE } from "@/lib/lazyLoading";
import Link from "next/link";
import CustomImage from "../ui/CustomImage";

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
      <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-all duration-300 group-hover:shadow-md group-hover:border-gray-300">
        <CustomImage
          src={imageUrl}
          alt={category.title}
          fill
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="mt-2.5">
        <h3 className="text-xs font-medium text-gray-700 line-clamp-1 group-hover:text-[#ff6a00] transition-colors">
          {category.title}
        </h3>
      </div>
    </a>
  );
}
