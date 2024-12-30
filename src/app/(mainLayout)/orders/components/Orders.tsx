"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useUser } from "@/context/user.provider";
import { useGetAllOrders } from "@/hooks/order.hook";
import { IOrder, IQueryParam } from "@/types";
import { useEffect, useState } from "react";
import { columns } from "./data-table/columns";
import { OrderDataTable } from "./data-table/data-table";

const Orders = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const [params, setParams] = useState<IQueryParam[]>([]);

  const { data, isLoading: isOrdersLoading, isError } = useGetAllOrders(params);

  useEffect(() => {
    if (user?.userId) {
      setParams([
        { name: "user", value: user.userId },
        {
          name: "limit",
          value: 10000,
        },
      ]);
    }
  }, [user]);

  if (isUserLoading || !user?.userId || isOrdersLoading) {
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
