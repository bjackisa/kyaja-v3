import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 p-8 animate-in fade-in-50">
      <Skeleton className="h-9 w-[200px]" />

      {/* Order Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-6 rounded-lg border bg-card">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-6 w-[60px]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Trending Products */}
        <div className="col-span-3 rounded-xl border bg-card">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-[140px]" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="col-span-4 rounded-xl border bg-card">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-[180px]" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-4">
        <Skeleton className="h-7 w-[150px]" />
        <div className="rounded-md border">
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[100px] ml-auto" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

