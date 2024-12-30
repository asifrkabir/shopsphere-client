"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRecentProducts } from "@/context/recentProducts.provider";
import { IProduct } from "@/types";
import { Eye, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../cart/AddToCart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { addProduct } = useRecentProducts();

  const maxImagesToShow = 1;

  const {
    name,
    price,
    discountedPrice,
    inventoryCount,
    imageUrls,
    onSale,
    shop,
    isFollowed,
  } = product;

  const handleViewDetails = () => {
    addProduct(product);
  };

  return (
    <Card className="relative flex flex-col rounded-lg border w-full h-full transition-shadow hover:shadow-md">
      <CardHeader className="flex-grow flex flex-col p-4">
        <div className="mt-2 grid grid-cols-4 justify-end">
          <div className="col-span-3">
            <Link
              href={`/products/${product._id}`}
              className="hover:text-emerald-500"
            >
              <h2 className="text-xl font-bold">{name}</h2>
            </Link>
            <TooltipProvider>
              <Link
                href={`/shops/${shop._id}`}
                className="hover:text-emerald-500 flex items-center gap-2 mb-4 mt-2 max-w-max"
              >
                <h3 className="text-md">{shop.name}</h3>

                {isFollowed === 1 && (
                  <Tooltip>
                    <TooltipTrigger>
                      <UserCheck className="w-5 h-5 text-emerald-600" />
                    </TooltipTrigger>
                    <TooltipContent>You are following this shop</TooltipContent>
                  </Tooltip>
                )}
              </Link>
            </TooltipProvider>
          </div>
          <div className="col-span-1 ml-auto">
            {inventoryCount <= 0 ? (
              <Badge className="bg-gray-400 text-white">Out of Stock</Badge>
            ) : inventoryCount <= 5 ? (
              <Badge className="bg-yellow-500 text-white">Limited Stock</Badge>
            ) : (
              <Badge className="bg-emerald-500 text-white text-center">
                In Stock
              </Badge>
            )}
          </div>
        </div>
        <div className="text-lg font-semibold">
          {onSale ? (
            <>
              <span className="text-gray-500 line-through">${price}</span>{" "}
              <span className="text-emerald-600">${discountedPrice}</span>{" "}
              <span className="text-red-500 text-sm font-bold">
                ({Math.round(((price - (discountedPrice || 0)) / price) * 100)}%
                OFF)
              </span>
            </>
          ) : (
            <span>${price}</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 pb-0">
        {imageUrls && imageUrls.length > 0 ? (
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-2 mb-8">
            {imageUrls.slice(0, maxImagesToShow).map((imageUrl, index) => (
              <div key={index} className="relative overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`Product image ${index + 1}`}
                  width={300}
                  height={150}
                  className="object-cover transition duration-300 rounded-sm w-full"
                />
                {index === maxImagesToShow - 1 &&
                  imageUrls!.length > maxImagesToShow && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold">
                      +{imageUrls!.length - maxImagesToShow}
                    </div>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 mb-8">
            {Array.from({ length: 1 }).map((_, index) => (
              <div key={index} className="relative overflow-hidden">
                <Image
                  src={`https://placehold.co/300x150/cccccc/ffffff?text=No+Image`}
                  alt={`Placeholder image ${index + 1}`}
                  width={300}
                  height={150}
                  className="object-cover rounded-md transition-all duration-300 w-full"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto p-4 pt-0 flex flex-wrap justify-between items-center">
        <Link href={`/products/${product._id}`} onClick={handleViewDetails}>
          <Button variant="outline" size="sm">
            <Eye className="mr-2" /> View Details
          </Button>
        </Link>
        <AddToCart product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
