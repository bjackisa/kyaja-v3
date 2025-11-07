'use client'

import { useQuery } from '@tanstack/react-query'
import { useDebounce } from './useDebounce'
import { searchItems } from '@/actions/products'


export function useSearch(query: string) {
  const debouncedQuery = useDebounce(query as any, 300)

  const searchQuery = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return { products: [], categories: [] }
      return searchItems(debouncedQuery as any)
    },
    enabled: !!debouncedQuery,
  })

  return {
    results: searchQuery.data,
    isLoading: searchQuery.isPending,
    error: searchQuery.error,
  }
}