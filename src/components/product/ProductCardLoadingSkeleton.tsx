"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardLoadingSkeleton = () => {
  return (
    <Card className="relative flex flex-col rounded-lg border w-full h-auto transition-shadow">
      {/* Header Skeleton */}
      <CardHeader className="flex flex-col p-4">
        <div className="mt-2 flex justify-between">
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
        </div>
      </CardHeader>

      {/* Image Skeleton */}
      <CardContent className="p-4">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-2 mb-8">
          {[1, 2].map((_, index) => (
            <Skeleton
              key={index}
              className="h-40 w-full rounded-sm object-cover"
            />
          ))}
        </div>
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter className="p-4 flex justify-between items-center">
        <Skeleton className="h-8 w-1/3" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardLoadingSkeleton;
