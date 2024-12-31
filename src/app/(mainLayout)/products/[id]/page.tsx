"use client";

import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import { useGetProductById } from "@/hooks/product.hook";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import ProductDetails from "./components/ProductDetails";
import RelatedProducts from "./components/RelatedProducts";
import Reviews from "./components/Review/Reviews";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const {
    data: productData,
    error,
    isLoading,
  } = useGetProductById(id as string);

  if (isLoading) return <LoadingSpinner />;
  if (error || !productData?.data)
    return (
      <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            No product found
          </h3>
        </div>
      </div>
    );

  const product = productData?.data;

  return (
    <div className="h-full flex-1 flex-col p-8 md:flex">
      <Suspense>
        <ProductDetails product={product} />
      </Suspense>

      <div className="mb-10 mt-32">
        <h2 className="text-xl font-semibold mt-4">Suggested Products</h2>
      </div>

      <Suspense>
        <RelatedProducts categoryId={product.category._id} />
      </Suspense>

      <div className="mb-10 mt-32">
        <h2 className="text-xl font-semibold mt-4">Customer Reviews</h2>
      </div>

      <Suspense>
        <Reviews productId={id as string} />
      </Suspense>
    </div>
  );
};

export default ProductDetailsPage;
