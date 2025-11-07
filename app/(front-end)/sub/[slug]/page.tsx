import SubPage from "@/components/front-end/sub-page";


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div>
      <SubPage slug={slug}/>
    </div>
  )
}

