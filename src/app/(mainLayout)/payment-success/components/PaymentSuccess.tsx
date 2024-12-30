"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const orderPageUrl = orderId ? `/orders/${orderId}` : `/orders`;

  return (
    <div className="flex flex-col justify-center items-center p-6 mt-40 text-center">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold text-emerald-600">
          Payment Successful!
        </h1>
        <p>
          Thank you for your purchase! We hope you to see you again soon.
        </p>
      </div>

      <div className="flex space-x-4">
        <Link href="/products">
          <Button variant="outline" className="gap-2">
            View More Products <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>

        <Link href={orderPageUrl}>
          <Button className="bg-emerald-500 hover:bg-emerald-700 gap-2 text-white">
            Leave a review <Star className="w-4 h-4" />
          </Button>
        </Link>

        <Link href="/">
          <Button className="bg-emerald-500 hover:bg-emerald-700 gap-2 text-white">
            Go to Homepage <Home className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
