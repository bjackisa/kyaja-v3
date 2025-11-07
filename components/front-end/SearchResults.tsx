import { Skeleton } from '@/components/ui/skeleton'
import { CategoryCard } from './CategoryCard'
import ProductCard from './ProductCard'
import { searchItems } from '@/actions/products'
import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface SearchResultsProps {
  query: string
}

export async function SearchResults({ query }: SearchResultsProps) {
  const results = await searchItems(query)

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Search className="h-12 w-12 mb-4" />
        <p>Start typing to search products and categories...</p>
      </div>
    )
  }

  if (!results.products.length && !results.categories.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p>No results found for &quot;{query}&quot;</p>
       
        <Button asChild>
        <Link href="/">
          Go back</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {results.categories.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {results.categories.map((category) => (
              <CategoryCard key={category.slug} category={category} link="c" />
            ))}
          </div>
        </section>
      )}

      {results.products.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {results.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
SearchResults.Skeleton = function SearchResultsSkeleton() {
    return (
      <div className="space-y-8">
        <section>
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
  