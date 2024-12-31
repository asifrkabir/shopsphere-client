"use client";

import { useGetAllProductsForFeed } from "@/hooks/product.hook";
import { IQueryParam } from "@/types";
import { useState } from "react";
import AllProductsFilter from "./AllProductsFilter";
import ProductCard from "./ProductCard";
import ProductCardLoadingSkeleton from "./ProductCardLoadingSkeleton";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

interface IProps {
  customParams?: IQueryParam[];
}

const Products = ({ customParams }: IProps) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const searchTerm = searchParams.get("search");

  const [params, setParams] = useState<IQueryParam[]>(() => {
    const defaultParams: IQueryParam[] = [
      { name: "limit", value: 16 },
      { name: "page", value: 1 },
    ];

    if (categoryId) {
      defaultParams.push({ name: "category", value: categoryId });
    }

    if (searchTerm) {
      defaultParams.push({ name: "searchTerm", value: searchTerm });
    }

    return customParams ? [...defaultParams, ...customParams] : defaultParams;
  });

  const { data, isLoading, isError } = useGetAllProductsForFeed(params);

  const products = data?.data || [];
  const meta = data?.meta;

  const handlePageChange = (newPage: number) => {
    setParams((prev) =>
      prev.map((param) =>
        param.name === "page" ? { ...param, value: newPage } : param
      )
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Filters */}
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-24">
          <AllProductsFilter
            setParams={setParams}
            initialCategory={(categoryId as string) || undefined}
            initialSearchTerm={(searchTerm as string) || undefined}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="lg:col-span-3">
        {isLoading ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 16 }).map((_, idx) => (
              <ProductCardLoadingSkeleton key={idx} />
            ))}
          </div>
        ) : isError ? (
          <p>Something went wrong while fetching products.</p>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center gap-1 text-center my-40">
            <h3 className="text-2xl font-bold tracking-tight">
              No related products are available right now
            </h3>
            <p className="text-sm text-muted-foreground">
              Please check back later.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {meta && (
              <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
