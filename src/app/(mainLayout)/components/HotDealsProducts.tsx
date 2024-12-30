"use client";

import ProductCard from "@/components/product/ProductCard";
import ProductCardLoadingSkeleton from "@/components/product/ProductCardLoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useGetAllProductsForFeed } from "@/hooks/product.hook";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HotDealsProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsForFeed([
    { name: "limit", value: 6 },
    { name: "onSale", value: true },
  ]);

  const products = data?.data || [];

  const [timeLeft, setTimeLeft] = useState<number>(86400); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-gradient-to-br from-emerald-400 to-emerald-600 p-8 rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        {/* Left Section: Timer and Banner */}
        <div className="lg:w-1/4 flex flex-col items-center text-white p-6">
          <h2 className="text-3xl font-bold mb-4">Hot Deals! 🔥</h2>
          <p className="text-sm mb-4 text-center">
            Hurry up! These deals are valid for a limited time only.
          </p>
          <div className="text-4xl font-bold tracking-wide">
            {formatTime(timeLeft)}
          </div>
          <Link href="/sale">
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 mt-6">
              Explore All Deals
            </Button>
          </Link>
        </div>

        {/* Right Section: Products Slider */}
        <div className="lg:w-3/4">
          {isLoading ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <ProductCardLoadingSkeleton key={idx} />
              ))}
            </div>
          ) : isError ? (
            <p>Something went wrong while fetching products.</p>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center gap-1 text-center my-40">
              <h3 className="text-2xl font-bold tracking-tight">
                No products are available right now
              </h3>
              <p className="text-sm text-muted-foreground">
                Please check back later.
              </p>
            </div>
          ) : (
            <>
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                breakpoints={{
                  100: { slidesPerView: 1 }, // For small screens
                  640: { slidesPerView: 1 }, // For small screens
                  768: { slidesPerView: 2 }, // For medium screens
                  1024: { slidesPerView: 3 }, // For larger screens
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop={true}
              >
                {products.map((product) => (
                  <SwiperSlide key={product._id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotDealsProducts;
