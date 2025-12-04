import Link from "next/link"
import CustomImage from "../ui/CustomImage"

interface BrandCardProps {
  title: string
  image: string
  slug:string
}

export function BrandCard({ title, image, slug }: BrandCardProps) {
  return (
    <Link
      href={`/c/${slug}`}
      className="relative block aspect-square bg-black rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
    >
      <CustomImage src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
    </Link>
  )
}

