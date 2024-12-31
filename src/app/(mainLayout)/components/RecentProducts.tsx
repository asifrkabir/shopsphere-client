"use client";

import ProductCard from "@/components/product/ProductCard";
import ProductCardLoadingSkeleton from "@/components/product/ProductCardLoadingSkeleton";
import { useGetAllProductsForFeed } from "@/hooks/product.hook";
import { Sparkles } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const RecentProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsForFeed([
    { name: "limit", value: 5 },
  ]);

  const products = data?.data || [];

  return (
    <div className="w-full p-6 rounded-lg border border-gray-300 bg-white">
      <h3 className="text-xl font-semibold leading-tight mb-4 text-center flex items-center">
        New Arrivals <Sparkles className="size-5 ml-2 text-yellow-500" />
      </h3>
      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        <div className="w-full">
          {isLoading ? (
            <div className="grid gap-4 grid-cols-1">
              {Array.from({ length: 1 }).map((_, idx) => (
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
                slidesPerView={1}
                breakpoints={{
                  100: { slidesPerView: 1 }, // For small screens
                  640: { slidesPerView: 1 }, // For small screens
                  768: { slidesPerView: 1 }, // For medium screens
                  1024: { slidesPerView: 1 }, // For larger screens
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

export default RecentProducts;
