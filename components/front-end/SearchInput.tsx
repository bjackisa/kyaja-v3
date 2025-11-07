'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import debounce from 'lodash/debounce'

interface SearchInputProps {
  defaultValue: string
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const handleSearch = useCallback(
    debounce((term: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (term) {
        params.set('q', term)
      } else {
        params.delete('q')
      }
      
      startTransition(() => {
        router.push(`/search?${params.toString()}`)
      })
    }, 300),
    [searchParams, router]
  )

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search for products and categories..."
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 pr-4"
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
        </div>
      )}
    </div>
  )
}