import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { useDepartmentCategories } from '@/hooks/use-categories';

const DEFAULT_IMAGE = "https://utfs.io/f/aa568418-002c-40a1-b13f-a0fd7eef1353-9w6i5v.svg";
const DEFAULT_BLUR = "https://utfs.io/f/cedbb143-0c78-4714-8b70-cac825d533e0-9jz08y.png";

const DetailedCategories: React.FC<{ departments: any }> = ({ departments }) => {
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDepartmentCategories();

  // Fetch next page when in view
  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten departments from all pages
  const allDepartments = data?.pages.flatMap(page => page) || departments;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {allDepartments.map((department) => (
        <div key={department.id} className="bg-white p-4 rounded shadow-md">
          <h2 className="text-base font-semibold mb-4">{department.title}</h2>
          <div className="grid grid-cols-2 gap-4">
            {department.categories.map((category) => {
              const imageUrl = category.imageUrl || DEFAULT_IMAGE;

              return (
                <Link
                  key={category.id}
                  href={`/c/${category.slug}`}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-full aspect-square mb-2 overflow-hidden rounded">
                    <Image
                      placeholder="blur"
                      blurDataURL={DEFAULT_BLUR}
                      src={imageUrl}
                      alt={category.title}
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                    />
                  </div>
                  <span className="text-xs text-start line-clamp-1">{category.title}</span>
                </Link>
              );
            })}
          </div>
          <Link
            href={`/category-d`}
            className="block mt-4 text-blue-600 hover:underline text-sm"
          >
            Explore more
          </Link>
        </div>
      ))}

      {/* Loading more trigger */}
      <div ref={ref} className="col-span-full flex justify-center py-4">
        {isFetchingNextPage && (
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        )}
      </div>
    </div>
  );
};

export default DetailedCategories;