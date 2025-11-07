import DetailedPage from "@/components/front-end/detailed-page";

export default async function Page({
  params,
}: {
  params: { slug: string }  
}) {

  return (
    <div>
      <DetailedPage slug={params.slug} />
    </div>
  );
}
