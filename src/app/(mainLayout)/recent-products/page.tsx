"use client";

import { Suspense, useEffect, useState } from "react";
import RecentProducts from "./components/RecentProducts";

const RecentProductsPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold md:text-2xl">
          Recently Viewed Products
        </h1>
      </div>
      <Suspense>
        {isClient && <RecentProducts />}
      </Suspense>
    </div>
  );
};

export default RecentProductsPage;
