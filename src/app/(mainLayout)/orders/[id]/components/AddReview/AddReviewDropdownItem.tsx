import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

const AddReviewDropdownItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  return (
    <DropdownMenuItem
      {...props}
      ref={ref}
      onSelect={(e) => {
        e.preventDefault();
      }}
    >
      Add Review
    </DropdownMenuItem>
  );
});

AddReviewDropdownItem.displayName = "AddReviewDropdownItem";

export default AddReviewDropdownItem;
