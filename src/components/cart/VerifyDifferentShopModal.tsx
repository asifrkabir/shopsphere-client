"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

const VerifyDifferentShopModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Yes",
  cancelText = "No",
}: ModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? undefined : onClose())}
    >
      <DialogTrigger asChild>
        {/* <Button variant="outline" className="invisible" /> */}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} className="w-20">
            {cancelText}
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="w-20">
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyDifferentShopModal;
