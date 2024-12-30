"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import { Button } from "@/components/ui/button";
import { useGetCouponById, useUpdateCoupon } from "@/hooks/coupon.hook";
import { updateCouponValidationSchema } from "@/schemas/coupon.schema";
import { IApiResponse, ICoupon, IUpdateCoupon } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  id: string;
  closeModal: () => void;
}

const UpdateCouponForm = ({ id, closeModal }: IProps) => {
  const { data: couponData, isLoading, isError } = useGetCouponById(id);
  const { mutate: updateCoupon, isPending } = useUpdateCoupon();
  const queryClient = useQueryClient();

  if (isLoading || !couponData) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  if (isError || !couponData.data) {
    return <p>Something went wrong while fetching coupon</p>;
  }

  const coupon = couponData?.data;

  const existingCouponValues = {
    code: coupon.code,
    discountPercentage: coupon.discountPercentage,
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const couponData: IUpdateCoupon = {
      id: coupon._id,
      payload: {
        code: data.code,
        discountPercentage: data.discountPercentage,
      },
    };

    updateCoupon(couponData, {
      onSuccess: (res: IApiResponse<ICoupon>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Coupon updated successfully");

          queryClient.invalidateQueries({
            queryKey: ["COUPONS"],
          });

          queryClient.invalidateQueries({
            queryKey: ["COUPON", id],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to update coupon. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to update coupon. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(updateCouponValidationSchema)}
          defaultValues={existingCouponValues}
        >
          <AppInput
            name="code"
            label="Code"
            type="text"
            placeholder="Enter coupon code"
            required
          />

          <AppInput
            name="discountPercentage"
            label="Discount Percentage"
            type="number"
            placeholder="Enter discount percentage"
            required
            step="any"
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
};

export default UpdateCouponForm;
