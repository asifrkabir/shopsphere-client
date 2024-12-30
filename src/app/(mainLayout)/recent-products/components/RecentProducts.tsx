"use client";

import ProductCard from "@/components/product/ProductCard";
import { useRecentProducts } from "@/context/recentProducts.provider";

const RecentProducts = () => {
  const { recentProducts } = useRecentProducts();

  if (recentProducts.length === 0) {
    return <p>No recent products viewed.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recentProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default RecentProducts;
