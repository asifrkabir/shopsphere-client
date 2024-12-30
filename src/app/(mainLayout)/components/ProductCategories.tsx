"use client";

import { useGetAllProductCategories } from "@/hooks/productCategory.hook";
import { IProductCategory } from "@/types";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import ProductCategoriesLoadingSkeleton from "./ProductCategoriesLoadingSkeleton";

const ProductCategories = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllProductCategories([
    { name: "limit", value: 10 },
    { name: "sort", value: "createdAt" },
  ]);

  if (isLoading) {
    return <ProductCategoriesLoadingSkeleton itemCount={10} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching product categories.</p>;
  }

  const productCategories: IProductCategory[] = data?.data || [];

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`);
  };

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {productCategories.map((category) => (
          <div
            key={category._id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center justify-center"
            onClick={() => handleCategoryClick(category._id)}
          >
            {category.logo ? (
              <Image
                src={category.logo}
                alt={`${category.name} logo`}
                width={40}
                height={40}
                className="mb-2"
              />
            ) : (
              <Sparkles size={32} className="mb-2 text-gray-500" />
            )}
            <p className="text-center font-medium text-sm md:text-base">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
