import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

const UpdateCouponDropdownItem = React.forwardRef<
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
      Edit
    </DropdownMenuItem>
  );
});

UpdateCouponDropdownItem.displayName = "UpdateCouponDropdownItem";

export default UpdateCouponDropdownItem;
