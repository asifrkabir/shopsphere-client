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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import CompareProducts from "./CompareProducts";

export function CompareProductsModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-700">
          Compare Products
        </Button>
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-2xl overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Compare Products</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Compare Products Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CompareProducts />
        </div>
      </DialogContent>
    </Dialog>
  );
}
