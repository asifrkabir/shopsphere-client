"use client";

import { Suspense, useEffect, useState } from "react";
import CheckoutForm from "./components/Checkout/CheckoutForm";

const CheckoutPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold md:text-2xl">Cart Details</h1>
      </div>
      <Suspense>{isClient && <CheckoutForm />}</Suspense>
    </div>
  );
};

export default CheckoutPage;
