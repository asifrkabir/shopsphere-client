import Products from "@/components/product/Products";
import { IQueryParam } from "@/types";
import { Suspense } from "react";

const SalesProducts = () => {
  const customParams: IQueryParam[] = [{ name: "onSale", value: true }];

  return (
    <Suspense>
      <Products customParams={customParams} />
    </Suspense>
  );
};

export default SalesProducts;
