"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/context/cart.provider";

interface CheckoutCartProps {
  subTotal: number;
  discount: number;
  total: number;
}

const CheckoutCart = ({ subTotal, discount, total }: CheckoutCartProps) => {
  const { cart } = useCart();

  return (
    <div className="border rounded-md shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableCell className="col-span-2">Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell className="col-span-2">
                  <p className="font-medium">{product.name}</p>
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  ${(product.price * product.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t bg-gray-50 dark:bg-neutral-900">
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-500">Subtotal:</p>
            <p className="font-medium">${subTotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-500">Discount (from coupon):</p>
            <p className="font-medium text-emerald-500">
              -${discount.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between border-t pt-2 mt-2">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
