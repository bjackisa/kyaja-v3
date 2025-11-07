import SearchPage from '@/components/front-end/search-page';


export default async function Page({
  searchParams,
}: {
  searchParams: { 
    q?: string; 
  }
}) {
  const query = searchParams.q || '';

  return (
    <div>
      <SearchPage query={query}/>
    </div>
  )
}