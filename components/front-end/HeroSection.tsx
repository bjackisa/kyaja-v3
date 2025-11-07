import Image from "next/image"

export function HeroSection({image}:{image:string}) {
  return (
    <div className="relative w-full h-[40vh] bg-white rounded-lg overflow-hidden">
      <Image
        src={image}
        fill
        className="object-cover"
        alt=""
      />
    </div>
  )
}

