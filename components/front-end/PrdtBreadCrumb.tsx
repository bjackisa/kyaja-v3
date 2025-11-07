"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  product?: {
    department: {
      title: string;
      slug: string;
    };
    category?: {
      title: string;
      slug: string;
    };
    subCategory?: {
      title: string;
      slug: string;
    };
    title: string;
    slug: string;
  };
}

export default function PrdtBreadCrumb({ product }: BreadcrumbProps) {
  if (!product) return null;

  const breadcrumbItems = [
    { 
      title: "Home", 
      href: "/" 
    },
    { 
      title: product.department.title, 
      href: `/d/${product.department.slug}` 
    },
    ...(product.category ? [{
      title: product.category.title,
      href: `/c/${product.category.slug}`
    }] : []),
    ...(product.subCategory ? [{
      title: product.subCategory.title,
      href: `/sub/${product.category?.slug}/subcategory/${product.subCategory.slug}`
    }] : []),
    { 
      title: product.title, 
      href: `/p/${product.slug}` 
    }
  ];

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  };

  return (
    <nav className="flex w-full" aria-label="Breadcrumb">
      <ol className="flex items-center w-full min-w-0 gap-1 text-xs sm:text-sm">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isFirst = index === 0;
          
          // Calculate max length based on screen size and position
          const getMaxLength = () => {
            if (isFirst) return 4; // "Home" is always short
            if (isLast) return 25; // Product name gets more space
            return 12; // Middle items get moderate space
          };

          return (
            <li key={item.href} className="flex items-center min-w-0 flex-shrink">
              {index > 0 && (
                <ChevronRight className="flex-shrink-0 w-3 h-3 text-gray-400 mx-0.5 sm:mx-1" />
              )}
              <Link
                href={item.href}
                className={`
                  truncate capitalize transition-colors duration-200
                  ${isLast 
                    ? 'text-gray-500 dark:text-gray-400 font-medium' 
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white font-normal'
                  }
                `}
                title={item.title} // Show full title on hover
              >
                <span className="block sm:hidden">
                  {truncateText(item.title, Math.floor(getMaxLength() * 0.7))}
                </span>
                <span className="hidden sm:block md:hidden">
                  {truncateText(item.title, getMaxLength())}
                </span>
                <span className="hidden md:block lg:hidden">
                  {truncateText(item.title, Math.floor(getMaxLength() * 1.5))}
                </span>
                <span className="hidden lg:block">
                  {truncateText(item.title, getMaxLength() * 2)}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}