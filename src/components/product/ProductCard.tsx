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
import { AlertTriangle, Check, Eye, UserCheck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
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

  const {
    name,
    price,
    discountedPrice,
    inventoryCount,
    imageUrls,
    onSale,
    shop,
    isFollowed,
    rating,
    numOfRatings,
  } = product;

  const handleViewDetails = () => {
    addProduct(product);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={`h-4 w-4 ${
              index < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-gray-500 ml-1">{`(${numOfRatings || 0})`}</span>
      </div>
    );
  };

  return (
    <Card className="relative flex flex-col rounded-lg border w-full h-full transition-shadow hover:shadow-md">
      <CardHeader className="flex-grow flex flex-col p-4 pb-0">
        <div className="grid grid-cols-4 justify-end">
          <div className="col-span-3">
            <Link
              href={`/products/${product._id}`}
              className="hover:text-emerald-500"
            >
              <h2 className="text-md font-bold">{name}</h2>
            </Link>
            <TooltipProvider>
              <Link
                href={`/shops/${shop._id}`}
                className="flex items-center max-w-max"
              >
                by
                <span className="text-emerald-500 ml-1">
                  <h3 className="text-sm">{shop.name}</h3>
                </span>
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
            <TooltipProvider>
              {inventoryCount <= 0 ? (
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="bg-gray-400 text-white p-1">
                      <X className="w-4 h-4" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Out of Stock</TooltipContent>
                </Tooltip>
              ) : inventoryCount <= 5 ? (
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="bg-yellow-500 text-white p-1">
                      <AlertTriangle className="w-4 h-4" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Limited Stock</TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="bg-emerald-500 text-white p-1">
                      <Check className="w-4 h-4" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>In Stock</TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
        </div>

        {rating !== undefined ? (
          <div className="flex items-center gap-1 mt-2">
            {renderStars(rating)}{" "}
          </div>
        ) : (
          <span className="text-sm text-gray-500 mt-2">No ratings yet</span>
        )}
      </CardHeader>

      <CardContent className="p-4 pb-0">
        {imageUrls && imageUrls.length > 0 ? (
          <div className="w-full gap-2 mb-4">
            <Image
              src={imageUrls[0]}
              alt={`Product image`}
              width={300}
              height={150}
              className="object-cover transition duration-300 rounded-sm w-full"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 mb-4">
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

        <div className="text-lg font-semibold my-4">
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
      </CardContent>

      <CardFooter className="mt-auto p-4 pt-0 flex flex-wrap justify-between items-center">
        <Link href={`/products/${product._id}`} onClick={handleViewDetails}>
          <Button variant="outline" size="sm">
            <Eye />
          </Button>
        </Link>
        <AddToCart product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
