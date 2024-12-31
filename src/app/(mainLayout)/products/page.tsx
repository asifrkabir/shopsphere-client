import Products from "@/components/product/Products";
import { Suspense } from "react";
import { CompareProductsModal } from "./components/CompareProducts/CompareProductsModal";

const ProductsPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold md:text-2xl">All Products</h1>
        <CompareProductsModal />
      </div>
      <Suspense>
        <Products />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
