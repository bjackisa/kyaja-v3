import Link from "next/link"
import { CategoryCard } from "./CategoryCard"
type SubCategory ={
   title:string,
   slug:string,
   id:string
}
export default function SubCatPage({subcat}:{subcat:SubCategory[]}) {
  
  return (
    <section className="py-2  bg-white md:px-5 px-1">
      <div className="mx-auto max-w-7xl">
     
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:grid-cols-5 md:gap-y-8">
          {subcat?.map((category) => (
            <CategoryCard key={category.title} category={category} link="sub"/>
          ))}
        </div>
       <Link href="/category-d">
       <p className="text-sm text-blue-600 group-hover:underline block md:hidden mt-5">
          See more
        </p></Link>
      </div>
    </section>
  )
}

