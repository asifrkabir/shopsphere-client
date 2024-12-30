"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IShop } from "@/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { UpdateShopForm } from "./UpdateShopForm";

interface IProps {
  shop: IShop;
}

export function UpdateShopModal({ shop }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Update Shop</Button>
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg"}>
        <DialogHeader>
          <DialogTitle>Update Shop</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Update Shop Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <UpdateShopForm closeModal={handleClose} shop={shop} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
