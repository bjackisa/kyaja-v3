import React, { Suspense } from 'react'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function SearchPage({query}:{query:string}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
        <Button asChild>
        <Link href="/">
          Go back</Link>
        </Button>
        </div>
        
        <div className="md:max-w-2xl mx-auto mb-8">
          <SearchInput defaultValue={query} />
        </div>
        
        <Suspense fallback={<SearchResults.Skeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}
