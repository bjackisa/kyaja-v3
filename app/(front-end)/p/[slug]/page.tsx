import ProductDetailPage from "@/components/front-end/prdt-detailed-page";


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div>
      <ProductDetailPage slug={slug}/>
    </div>
  )
}

