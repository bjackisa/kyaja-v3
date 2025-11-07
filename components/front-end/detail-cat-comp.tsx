import { DEFAULT_BLUR, DEFAULT_IMAGE } from "@/lib/lazyLoading";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  image: string;
  slug: string;
}

export function CategoryCard({ title, image, slug }: CategoryCardProps) {
  return (
    <Link
      href={`/c/${slug}`}
      className="relative block aspect-[4/3] rounded-lg overflow-hidden group"
    >
      <Image
        src={image || DEFAULT_IMAGE}
        alt={title}
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL={DEFAULT_BLUR}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 backdrop-blur-[1px]" />
      <div className="absolute bottom-4 left-4">
        <h3 className="text-white text-base font-semibold">{title}</h3>
      </div>
    </Link>
  );
}
