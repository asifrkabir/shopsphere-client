"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllPayments } from "@/hooks/payment.hook";
import { IPayment, IQueryParam } from "@/types";
import { columns } from "./data-table/columns";
import { PaymentDataTable } from "./data-table/data-table";
import { useShop } from "@/context/shop.provider";
import { useState } from "react";

const Payments = () => {
  const { shop } = useShop();
  const [params] = useState<IQueryParam[]>([
    { name: "shop", value: shop._id },
    { name: "limit", value: 10000 },
  ]);

  const { data, isLoading, isError } = useGetAllPayments(params);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching payments.</p>;
  }

  const payments: IPayment[] = data?.data || [];

  return (
    <>
      <PaymentDataTable data={payments} columns={columns} />
    </>
  );
};

export default Payments;
