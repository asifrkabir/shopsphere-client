import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop.provider";
import { useCreateCoupon } from "@/hooks/coupon.hook";
import { createCouponValidationSchema } from "@/schemas/coupon.schema";
import { IApiResponse, ICoupon, ICreateCoupon } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
}

const AddCouponForm = ({ closeModal }: IProps) => {
  const { shop } = useShop();
  const { mutate: createCoupon, isPending } = useCreateCoupon();
  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const couponData: ICreateCoupon = {
      code: data.code,
      discountPercentage: data.discountPercentage,
      shop: shop._id,
    };

    createCoupon(couponData, {
      onSuccess: (res: IApiResponse<ICoupon>) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Coupon created successfully");

          queryClient.invalidateQueries({
            queryKey: ["COUPONS"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(res.message || "Failed to add coupon. Please try again.");
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.message || "Failed to add coupon. Please try again.");
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(createCouponValidationSchema)}
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
              "Submit"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
};

export default AddCouponForm;
