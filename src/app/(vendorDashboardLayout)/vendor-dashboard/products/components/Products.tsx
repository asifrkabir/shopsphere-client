"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllProducts } from "@/hooks/product.hook";
import { IProduct, IQueryParam } from "@/types";
import { columns } from "./data-table/columns";
import { ProductDataTable } from "./data-table/data-table";
import { useState } from "react";
import { useShop } from "@/context/shop.provider";

const Products = () => {
  const { shop } = useShop();
  const [params] = useState<IQueryParam[]>([
    { name: "shop", value: shop._id },
    { name: "limit", value: 10000 },
  ]);

  const { data, isLoading, isError } = useGetAllProducts(params);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching products.</p>;
  }

  const products: IProduct[] = data?.data || [];

  return (
    <>
      <ProductDataTable data={products} columns={columns} />
    </>
  );
};

export default Products;
