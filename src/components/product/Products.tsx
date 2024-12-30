"use client";

import InfiniteScrollContainer from "@/components/Shared/InfiniteScrollContainer";
import { useGetAllProductsForFeedInfinite } from "@/hooks/product.hook";
import { IQueryParam } from "@/types";
import { useState } from "react";
import AllProductsFilter from "./AllProductsFilter";
import ProductCard from "./ProductCard";
import ProductCardLoadingSkeleton from "./ProductCardLoadingSkeleton";
import { useSearchParams } from "next/navigation";

interface IProps {
  customParams?: IQueryParam[];
}

const Products = ({ customParams }: IProps) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  const [params, setParams] = useState<IQueryParam[]>(() => {
    const defaultParams: IQueryParam[] = [{ name: "limit", value: 9 }];

    if (categoryId) {
      defaultParams.push({ name: "category", value: categoryId });
    }

    return customParams ? [...defaultParams, ...customParams] : defaultParams;
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetAllProductsForFeedInfinite(params);

  const products = data?.pages.flatMap((page) => page.data || []) || [];

  return (
    <div className="w-full">
      <AllProductsFilter
        setParams={setParams}
        initialCategory={(categoryId as string) || undefined}
      />

      {isLoading ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductCardLoadingSkeleton key={idx} />
          ))}
        </div>
      ) : isError ? (
        <p>Something went wrong while fetching products.</p>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center gap-1 text-center my-40">
          <h3 className="text-2xl font-bold tracking-tight">
            No products are available right now
          </h3>
          <p className="text-sm text-muted-foreground">
            Please check back later.
          </p>
        </div>
      ) : (
        <>
          {/* Infinite Scroll Container */}
          <InfiniteScrollContainer
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            onBottomReached={() => hasNextPage && fetchNextPage()}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </InfiniteScrollContainer>

          {/* Next Page Loading Skeleton */}
          {isFetchingNextPage && (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <ProductCardLoadingSkeleton key={idx} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
