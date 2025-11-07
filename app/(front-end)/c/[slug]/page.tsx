import CategoryDetailPage from "@/components/front-end/sub-category-page";


export default async function Page({
  params,
}: {
  params: { slug: string }  
}) {

  return (
    <div>
      <CategoryDetailPage slug={params.slug}/>
    </div>
  )
}

