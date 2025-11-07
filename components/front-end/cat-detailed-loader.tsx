import { Skeleton } from "../ui/skeleton";

export const BrandSkeleton = () => {
    return (
      <div className="p-4 border rounded-lg bg-white">
        <Skeleton className="h-32 w-full rounded-md" />
        <Skeleton className="h-4 w-24 mt-3 mx-auto" />
      </div>
    );
  };