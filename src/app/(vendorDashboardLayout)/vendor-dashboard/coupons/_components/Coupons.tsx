"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllCoupons } from "@/hooks/coupon.hook";
import { ICoupon, IQueryParam } from "@/types";
import { columns } from "./data-table/columns";
import { CouponDataTable } from "./data-table/data-table";
import { useShop } from "@/context/shop.provider";
import { useState } from "react";

const Coupons = () => {
  const { shop } = useShop();
  const [params] = useState<IQueryParam[]>([
    { name: "shop", value: shop._id },
    { name: "limit", value: 10000 },
  ]);

  const { data, isLoading, isError } = useGetAllCoupons(params);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching coupons.</p>;
  }

  const coupons: ICoupon[] = data?.data || [];

  return (
    <>
      <CouponDataTable data={coupons} columns={columns} />
    </>
  );
};

export default Coupons;
