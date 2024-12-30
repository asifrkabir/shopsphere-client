"use client";

import AddToCart from "@/components/cart/AddToCart";
import { getAllReviewsQuery } from "@/hooks/review.hook";
import { IProduct, IReview } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  product: IProduct;
}

const ProductDetails = ({ product }: IProps) => {
  const {
    _id,
    name,
    description,
    price,
    discountedPrice,
    category,
    inventoryCount,
    imageUrls,
    onSale,
    shop,
  } = product;

  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery({
    ...getAllReviewsQuery([
      { name: "limit", value: "10000" },
      { name: "product", value: _id },
    ]),
    enabled: !!_id,
  });

  const getAverageRating = (reviews: IReview[]): number => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = reviewsData?.data
    ? getAverageRating(reviewsData.data)
    : 0;

  const placeholderCount = 1;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          {imageUrls && imageUrls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {imageUrls.map((imageUrl, index) => (
                <div key={index} className="relative overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`Product image ${index + 1}`}
                    width={300}
                    height={150}
                    className="object-cover rounded-md transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 mb-8">
              {Array.from({ length: placeholderCount }).map((_, index) => (
                <div key={index} className="relative overflow-hidden">
                  <Image
                    src={`https://placehold.co/300x150/cccccc/ffffff?text=No+Image`}
                    alt={`Placeholder image ${index + 1}`}
                    width={300}
                    height={150}
                    className="object-cover rounded-md transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">{name}</h1>
          <Link href={`/shops/${shop._id}`} className="hover:text-emerald-500">
            <h3 className="text-md mb-4">{shop.name}</h3>
          </Link>
          <h3 className="text-md mb-4">Category: {category.name}</h3>

          {description && (
            <p className="text-sm text-gray-700 mb-4">{description}</p>
          )}

          <div className="text-lg mb-4">
            {onSale ? (
              <div className="text-emerald-600">
                <span className="line-through">${price}</span>{" "}
                <span className="font-semibold">${discountedPrice}</span>
              </div>
            ) : (
              <div className="font-semibold">${price}</div>
            )}
          </div>

          <div className="mb-6">
            {inventoryCount <= 0 ? (
              <span className="text-red-500 font-semibold">Out of Stock</span>
            ) : (
              <span className="text-emerald-500 font-semibold">In Stock</span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            {isReviewsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`h-6 w-6 ${
                        index < averageRating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  {averageRating.toFixed(1)} / 5
                </span>
              </>
            )}
          </div>

          <div className="flex gap-4">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
