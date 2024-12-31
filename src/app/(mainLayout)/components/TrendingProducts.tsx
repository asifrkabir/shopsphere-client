"use client";

import ProductCard from "@/components/product/ProductCard";
import ProductCardLoadingSkeleton from "@/components/product/ProductCardLoadingSkeleton";
import { useGetAllProductsForFeed } from "@/hooks/product.hook";

const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const TrendingProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsForFeed([
    { name: "limit", value: 16 },
  ]);

  const products = data?.data || [];
  const randomizedProducts = shuffleArray(products).slice(0, 8);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
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
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {randomizedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;
