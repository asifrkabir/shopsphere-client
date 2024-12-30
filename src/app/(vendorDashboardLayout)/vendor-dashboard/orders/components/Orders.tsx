"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllOrders } from "@/hooks/order.hook";
import { IOrder, IQueryParam } from "@/types";
import { columns } from "./data-table/columns";
import { OrderDataTable } from "./data-table/data-table";
import { useShop } from "@/context/shop.provider";
import { useState } from "react";

const Orders = () => {
  const { shop } = useShop();
  const [params] = useState<IQueryParam[]>([
    { name: "shop", value: shop._id },
    { name: "limit", value: 10000 },
  ]);

  const { data, isLoading, isError } = useGetAllOrders(params);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching orders.</p>;
  }

  const orders: IOrder[] = data?.data || [];

  return (
    <>
      <OrderDataTable data={orders} columns={columns} />
    </>
  );
};

export default Orders;
