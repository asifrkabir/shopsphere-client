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
import { useState } from "react";
import AddReviewDropdownItem from "./AddReviewDropdownItem";
import AddReviewForm from "./AddReviewForm";

interface IProps {
  productId: string;
}

export function AddReviewModal({ productId }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddReviewDropdownItem />
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg"}>
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Add Review Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AddReviewForm closeModal={handleClose} productId={productId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
