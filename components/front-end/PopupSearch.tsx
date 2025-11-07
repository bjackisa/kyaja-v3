"use client";

import React, { useState, useEffect, useRef } from "react";
import { Category, Product } from "@prisma/client";
import { Search, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductCard from "./ProductCard";

type PopupSearchProps = {
  products: any;
  categories: Category[];
};

export default function PopupSearch({
  products,
  categories,
}: PopupSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySuggestions, setCategorySuggestions] = useState<Category[]>(
    []
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      const filteredCategories = categories.filter((category) =>
        category.title.toLowerCase().includes(value.toLowerCase())
      );
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setCategorySuggestions(filteredCategories.slice(0, 4));
      setFilteredProducts(filtered);
    } else {
      setCategorySuggestions([]);
      setFilteredProducts([]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center relative w-full max-w-3xl"
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 mr-2 text-gray-500" />
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search Products, Categories, Sub-Category..."
            readOnly
          />
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div
            ref={searchRef}
            className="fixed inset-0 bg-white dark:bg-gray-900 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center lg:p-4 p-2 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className="flex-1 lg:ml-4 relative">
                  <input
                    type="text"
                    id="voice-search"
                    onChange={handleSearch}
                    value={searchTerm}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-[80%] md:w-[80%] w-full pl-10 p-2.5 mx-auto"
                    placeholder="Search Products, Categories, Sub-Category..."
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ScrollArea className="flex-1 lg:px-[6rem] px-2 lg:py-8 py-4">
                {categorySuggestions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categorySuggestions.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="block p-2 bg-muted rounded-md hover:bg-muted/80"
                          onClick={() => setIsOpen(false)}
                        >
                          {category.icon && (
                            <span className="mr-2">{category.icon}</span>
                          )}
                          <span>{category.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {filteredProducts.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Searches from {searchTerm}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onClick={() => setIsOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  searchTerm.length > 1 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No products or categories found for {searchTerm}
                      </p>
                    </div>
                  )
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
