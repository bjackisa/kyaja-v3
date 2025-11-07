import { getTopDeals } from "@/actions/top-deals";
import TopDeals from "@/components/front-end/TopDeals";

export default async function TopDealsPage() {
  const initialData = await getTopDeals(null, 10);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <TopDeals initialData={initialData} />
    </div>
  );
}
