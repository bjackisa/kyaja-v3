import React, { Suspense } from 'react'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowLeft, Search, Sparkles } from 'lucide-react'

export default function SearchPage({query}:{query:string}) {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero Search Header */}
      <div className="relative bg-gradient-to-r from-[#ff6a00] via-[#ff4747] to-[#ff6a00] overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              asChild 
              variant="ghost" 
              className="text-white hover:bg-white/20 hover:text-white group"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Search className="w-8 h-8 text-white animate-pulse" />
              <h1 className="text-4xl font-extrabold text-white">Search Results</h1>
              <Sparkles className="w-6 h-6 text-white animate-bounce-subtle" />
            </div>
            {query && (
              <p className="text-white/90 text-lg">
                Showing results for <span className="font-bold">"{query}"</span>
              </p>
            )}
          </div>
          
          <div className="max-w-3xl mx-auto">
            <SearchInput defaultValue={query} />
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<SearchResults.Skeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}
