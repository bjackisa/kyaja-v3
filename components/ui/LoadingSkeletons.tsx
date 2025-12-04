"use client";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200 animate-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-shimmer" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-shimmer" />
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-shimmer" />
          <div className="h-8 bg-gray-200 rounded w-1/4 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-lg animate-shimmer" />
      <div className="mt-2 h-4 bg-gray-200 rounded w-3/4 mx-auto animate-shimmer" />
    </div>
  );
}

export function BannerSkeleton() {
  return (
    <div className="w-full h-64 md:h-96 bg-gray-200 rounded-2xl animate-pulse animate-shimmer" />
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="p-4">
        <div className="w-12 h-12 bg-gray-200 rounded animate-shimmer" />
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-full animate-shimmer" />
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-20 animate-shimmer" />
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-24 animate-shimmer" />
      </td>
    </tr>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {[1, 2, 3, 4].map((i) => (
              <th key={i} className="p-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-shimmer" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-shimmer" />
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-shimmer" />
      </div>
      <div className="h-8 bg-gray-200 rounded w-1/2 animate-shimmer" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-shimmer" />
          <div className="h-10 bg-gray-200 rounded w-full animate-shimmer" />
        </div>
      ))}
      <div className="h-12 bg-gray-200 rounded w-full animate-shimmer" />
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 rounded w-1/3 animate-shimmer" />
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-shimmer" />
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 animate-shimmer" />
        <div className="h-10 bg-gray-200 rounded w-32 animate-shimmer" />
      </div>
      <ProductGridSkeleton count={8} />
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 animate-pulse">
      <div className="w-20 h-20 bg-gray-200 rounded animate-shimmer" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-shimmer" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-shimmer" />
      </div>
      <div className="h-10 bg-gray-200 rounded w-24 animate-shimmer" />
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin border-t-[#ff6a00]" />
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-[#ff4747] opacity-20" />
        </div>
        <p className="text-gray-600 font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

export function ButtonLoader() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      <span>Loading...</span>
    </div>
  );
}
