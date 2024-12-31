"use client";

import AddToCart from "@/components/cart/AddToCart";
import { getAllReviewsQuery } from "@/hooks/review.hook";
import { IProduct, IReview } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";

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

  const swiperRef = useRef(null);

  const toSlide = (num: number) => {
    // @ts-ignore
    swiperRef.current?.swiper.slideTo(num);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Gallery Section */}
        <div className="flex flex-col items-center">
          {imageUrls && imageUrls.length > 0 ? (
            <div className="w-full mb-8">
              {/* Main Image Swiper */}
              <Swiper loop={true} spaceBetween={10} ref={swiperRef}>
                {imageUrls.map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-[500px]">
                      <Image
                        src={imageUrl}
                        alt={`Main product image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4">
                {imageUrls.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative w-16 h-16 cursor-pointer"
                    onClick={() => toSlide(index)}
                  >
                    <Image
                      src={imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md shadow-sm hover:opacity-80 transition-all"
                    />
                  </div>
                ))}
              </div>
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

        {/* Product Information Section */}
        <div className="flex flex-col">
          {/* Product Name */}
          <h1 className="text-3xl font-semibold">{name}</h1>

          {/* Shop Link */}
          <Link href={`/shops/${shop._id}`}>
            <h3 className="text-md mb-4">
              by <span className="text-emerald-500">{shop.name}</span>
            </h3>
          </Link>

          <span className="text-sm font-semibold mb-4">{category.name}</span>

          {/* Price */}
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

          {/* Inventory Status */}
          <div className="mb-6">
            {inventoryCount <= 0 ? (
              <span className="text-red-500 font-semibold">Out of Stock</span>
            ) : (
              <span className="text-emerald-500 font-semibold">In Stock</span>
            )}
          </div>

          {/* Rating Section */}
          <div className="flex items-center gap-2 mb-4">
            {isReviewsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      className={`h-6 w-6 ${
                        index < averageRating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500">{`(${reviewsData?.data?.length})`}</span>
              </>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-4">
            <AddToCart product={product} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mt-4 mb-4">Description</h2>
        {description && <p className="text-sm text-justify">{description}</p>}
      </div>
    </div>
  );
};

export default ProductDetails;
