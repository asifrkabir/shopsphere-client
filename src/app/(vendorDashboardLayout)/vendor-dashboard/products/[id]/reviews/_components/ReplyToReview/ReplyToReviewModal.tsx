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
import ReplyToReviewForm from "./ReplyToReviewForm";

interface IProps {
  id: string;
}

export function ReplyToReviewModal({ id }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-700">Reply</Button>
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg"}>
        <DialogHeader>
          <DialogTitle>Reply to Review</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Reply to Review Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ReplyToReviewForm closeModal={handleClose} id={id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
