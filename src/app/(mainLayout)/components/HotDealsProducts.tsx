"use client";

import ProductCard from "@/components/product/ProductCard";
import ProductCardLoadingSkeleton from "@/components/product/ProductCardLoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useGetAllProductsForFeed } from "@/hooks/product.hook";
import Link from "next/link";

const HotDealsProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsForFeed([
    { name: "limit", value: 6 },
    { name: "onSale", value: true },
  ]);

  const products = data?.data || [];

  return (
    <div className="w-full">
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
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/sale">
              <Button className="bg-emerald-500 hover:bg-emerald-700">
                View More
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HotDealsProducts;
