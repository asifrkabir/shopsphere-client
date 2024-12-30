import { Suspense } from "react";
import Orders from "./components/Orders";

const OrderPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold md:text-2xl">My Orders</h1>
      </div>
      <Suspense>
        <Orders />
      </Suspense>
    </div>
  );
};

export default OrderPage;
