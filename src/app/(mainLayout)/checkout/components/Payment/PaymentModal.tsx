"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import PaymentForm from "./PaymentForm";
import { ICreatePayment } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface ModalProps {
  open: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  onPaymentSuccess: () => void;
  paymentData: ICreatePayment;
}

const PaymentModal = ({
  open,
  setIsModalOpen,
  onPaymentSuccess,
  paymentData,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline" className="invisible" /> */}
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg"}>
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Payment Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <PaymentForm
            paymentData={paymentData}
            onPaymentSuccess={onPaymentSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
