"use client";

import AppForm from "@/components/form/AppForm";
import AppTextarea from "@/components/form/AppTextarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import envConfig from "@/config/envConfig";
import { useCart } from "@/context/cart.provider";
import { getCouponByCodeAndShopQuery } from "@/hooks/coupon.hook";
import { useCreateOrder } from "@/hooks/order.hook";
import { createOrderValidationSchema } from "@/schemas/order.schema";
import { IApiResponse, ICoupon, ICreateOrder, IOrder } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PaymentModal from "../Payment/PaymentModal";
import CheckoutCart from "./CheckoutCart";

const stripePromise = loadStripe(envConfig.stripePublishableKey as string);

const CheckoutForm = () => {
  const { mutate: createOrder, isPending } = useCreateOrder();
  const queryClient = useQueryClient();
  const { cart, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();
  const {
    data: couponData,
    isLoading: isCouponLoading,
    isError: isCouponError,
  } = useQuery({
    ...getCouponByCodeAndShopQuery({
      code: couponCode,
      shopId: cart.shopId!,
    }),
    enabled: !!couponCode,
  });

  const subTotal = cart.totalPrice;
  const totalPrice = Math.round((subTotal - discount) * 100) / 100;

  const onPaymentSuccess = () => {
    setIsModalOpen(false);
    clearCart();
    const successPageUrl = `/payment-success?orderId=${orderId}`;
    router.push(successPageUrl);
  };

  const handleCouponValidation = () => {
    if (isCouponLoading) {
      setDialogMessage("Validating coupon... Please wait.");
    } else if (isCouponError || !couponData) {
      setDiscount(0);
      setDialogMessage("An error occurred while validating the coupon.");
      setCouponCode("");
    } else if (couponData?.statusCode === httpStatus.OK) {
      const coupon: ICoupon = couponData.data!;
      const discountAmount =
        Math.round(((subTotal * coupon.discountPercentage) / 100) * 100) / 100;
      setDiscount(discountAmount);
      setDialogMessage(
        `Coupon applied! You received a $${discountAmount} discount.`
      );
    } else {
      setDiscount(0);
      setDialogMessage("Invalid coupon code");
      setCouponCode("");
    }

    setIsDialogOpen(true);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const orderData: ICreateOrder = {
      shop: cart.shopId!,
      products: cart.products.map((cartProduct) => ({
        product: cartProduct.productId,
        price: cartProduct.price,
        quantity: cartProduct.quantity,
      })),
      totalPrice: totalPrice,
      discount: discount,
      deliveryAddress: data.deliveryAddress,
      status: "pending",
    };

    createOrder(orderData, {
      onSuccess: (res: IApiResponse<IOrder>) => {
        if (res.statusCode === httpStatus.CREATED) {
          queryClient.invalidateQueries({
            queryKey: ["ORDERS"],
          });

          setOrderId(res.data!._id!);
          setIsModalOpen(true);
        } else {
          console.error(res);
          toast.error(res.message || "Failed to add order. Please try again.");
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.message || "Failed to add order. Please try again.");
      },
    });
  };

  return (
    <>
      {cart.products.length > 0 ? (
        <div>
          <CheckoutCart
            subTotal={subTotal}
            discount={discount}
            total={totalPrice}
          />

          <div className="mt-20 mb-8">
            <h1 className="text-lg font-semibold md:text-2xl">Checkout</h1>
          </div>
          <div className="grid gap-4">
            <AppForm
              onSubmit={handleSubmit}
              resolver={zodResolver(createOrderValidationSchema)}
            >
              <AppTextarea
                name="deliveryAddress"
                label="Delivery Address"
                type="text"
                placeholder="Enter delivery address"
                required
              />

              <div className="flex items-center gap-2 mb-4">
                <Input
                  name="couponCode"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code (if any)"
                />
                <Button
                  type="button"
                  onClick={handleCouponValidation}
                  className="bg-blue-500 hover:bg-blue-700"
                >
                  Apply
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-700"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </AppForm>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}

      {orderId !== "" && (
        <Elements stripe={stripePromise}>
          <PaymentModal
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onPaymentSuccess={onPaymentSuccess}
            paymentData={{
              order: orderId,
              shop: cart.shopId!,
              amount: totalPrice,
            }}
          />
        </Elements>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMessage}</DialogTitle>
            <VisuallyHidden>
              <DialogDescription>{dialogMessage}</DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutForm;
