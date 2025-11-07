import Link from "next/link"
import { CategoryCard } from "./CategoryCard"
import { SimpleDepartment } from "@/hooks/use-home-hook";


export default function HomeCategories({title  , departments}:{title:string , departments:SimpleDepartment[]}) {
    // const categories: Category[] = [
    //     {
    //       id: "desktops",
    //       title: "Desktops",
    //       image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/NYNY/Fuji_New_year_now_you_Dashboard_card_1X_EN._SY304_CB538057220_.jpg",
    //       href: "/categories/desktops",
    //       backgroundColor: "bg-[#e6f4f7]"
    //     },
    //     {
    //       id: "desktops",
    //       title: "Desktops",
    //       image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/NYNY/Fuji_New_year_now_you_Dashboard_card_1X_EN._SY304_CB538057220_.jpg",
    //       href: "/categories/desktops",
    //       backgroundColor: "bg-[#e6f4f7]"
    //     },
    //     {
    //       id: "laptops",
    //       title: "Laptops", 
    //       image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_laptop._SY116_CB558654384_.jpg",
    //       href: "/categories/laptops",
    //       backgroundColor: "bg-[#e6f4f7]"
    //     },
    //     {
    //       id: "hard-drives",
    //       title: "Hard Drives",
    //       image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/Stores-Gaming/FinalGraphics/Fuji_Gaming_store_Dashboard_card_1x_EN._SY304_CB564799420_.jpg", 
    //       href: "/categories/hard-drives",
    //       backgroundColor: "bg-[#e8f7e8]"
    //     },
    //     {
    //       id: "desktops",
    //       title: "Desktops",
    //       image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/NYNY/Fuji_New_year_now_you_Dashboard_card_1X_EN._SY304_CB538057220_.jpg",
    //       href: "/categories/desktops",
    //       backgroundColor: "bg-[#e6f4f7]"
    //     },
    //     {
    //       id: "laptops",
    //       title: "Laptops", 
    //       image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_laptop._SY116_CB558654384_.jpg",
    //       href: "/categories/laptops",
    //       backgroundColor: "bg-[#e6f4f7]"
    //     },
    //     {
    //       id: "hard-drives",
    //       title: "Hard Drives",
    //       image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/Stores-Gaming/FinalGraphics/Fuji_Gaming_store_Dashboard_card_1x_EN._SY304_CB564799420_.jpg", 
    //       href: "/categories/hard-drives",
    //       backgroundColor: "bg-[#e8f7e8]"
    //     },
    //     {
    //       id: "hard-drives",
    //       title: "Hard Drives",
    //       image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/Stores-Gaming/FinalGraphics/Fuji_Gaming_store_Dashboard_card_1x_EN._SY304_CB564799420_.jpg", 
    //       href: "/categories/hard-drives",
    //       backgroundColor: "bg-[#e8f7e8]"
    //     },
    //     {
    //       id: "accessories",
    //       title: "PC Accessories",
    //       image: "https://m.media-amazon.com/images/I/71W5GcQ8-JL._AC_SY200_.jpg",
    //       href: "/categories/accessories", 
    //       backgroundColor: "bg-[#e8f7e8]"
    //     },
    //     {
    //       id: "accessories",
    //       title: "PC Accessories",
    //       image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Smart_home._SY116_CB558654384_.jpg",
    //       href: "/categories/accessories", 
    //       backgroundColor: "bg-[#e8f7e8]"
    //     }
    //   ]
  return (
    <section className="py-2 bg-white md:px-5 px-3">
      <div className="mx-auto max-w-7xl">
      <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold tracking-tight text-gray-800 mb-8">
      {title}
        </h2>
        <Link href="/department-d">
        <p className="text-sm text-blue-600 group-hover:underline md:block hidden">
          See more
        </p>
        </Link>
   
      </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:grid-cols-5 md:gap-y-8">
          {departments?.map((category) => (
            <CategoryCard key={category.id} category={category} link="d"/>
          ))}
        </div>
       <Link href="/department-d">
       <p className="text-sm text-blue-600 group-hover:underline block md:hidden mt-5">
          See more
        </p></Link>
      </div>
    </section>
  )
}

