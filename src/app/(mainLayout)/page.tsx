import { Suspense } from "react";
import Banner from "./components/Banner";
import CompareProducts from "./components/CompareProducts";
import HotDealsProducts from "./components/HotDealsProducts";
import ProductCategories from "./components/ProductCategories";
import RecentProducts from "./components/RecentProducts";
import TrendingProducts from "./components/TrendingProducts";

export default function HomePage() {
  return (
    <div className="h-full flex-1 flex-col md:flex">
      <div className="grid grid-cols-4 gap-4 mb-20">
        <div className="col-span-full xl:col-span-3">
          <Banner />
        </div>
        <div className="col-span-full xl:col-span-1">
          <div>
            <RecentProducts />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-lg font-semibold md:text-2xl text-center">
            Featured categories
          </h1>
          <h2 className="text-md text-muted-foreground text-center">
            Browse through today&apos;s featured categories
          </h2>
        </div>
        <ProductCategories />
      </div>

      <div className="flex items-center justify-center mb-8 mt-20" />
      <Suspense>
        <HotDealsProducts />
      </Suspense>

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-center mb-8 mt-10" />
        <Suspense>
          <CompareProducts />
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto w-full mb-20">
        <div className="flex flex-col mb-8 mt-20">
          <h1 className="text-lg font-semibold md:text-2xl">
            Trending Products
          </h1>
          <h2 className="text-md text-muted-foreground">
            Today's top picks for you
          </h2>
        </div>
        <Suspense>
          <TrendingProducts />
        </Suspense>
      </div>
    </div>
  );
}
