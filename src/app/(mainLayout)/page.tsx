import Products from "@/components/product/Products";
import { Suspense } from "react";
import Banner from "./components/Banner";
import HotDealsProducts from "./components/HotDealsProducts";
import ProductCategories from "./components/ProductCategories";

export default function HomePage() {
  return (
    <div className="h-full flex-1 flex-col md:flex">
      <div className="mb-20">
        <Banner />
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-lg font-semibold md:text-2xl text-center">
          Featured categories
        </h1>
        <h2 className="text-md text-muted-foreground text-center">
          Browse through today&apos;s featured categories
        </h2>
      </div>
      <ProductCategories />

      <div className="flex items-center justify-center mb-8 mt-20">
        <h1 className="text-lg font-semibold md:text-2xl">Hot Deals 🔥</h1>
      </div>
      <Suspense>
        <HotDealsProducts />
      </Suspense>

      <div className="flex items-center justify-center mb-8 mt-40">
        <h1 className="text-lg font-semibold md:text-2xl">All Products</h1>
      </div>
      <Suspense>
        <Products />
      </Suspense>
    </div>
  );
}
