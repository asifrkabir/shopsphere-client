import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

const DuplicateProductDropdownItem = React.forwardRef<
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
      Duplicate
    </DropdownMenuItem>
  );
});

DuplicateProductDropdownItem.displayName = "DuplicateProductDropdownItem";

export default DuplicateProductDropdownItem;
