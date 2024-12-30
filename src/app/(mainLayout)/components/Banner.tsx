import Image from "next/image";
import bannerBg from "@/assets/images/banner-bg.jpg";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative flex items-center justify-center h-72 sm:h-96 md:h-120 lg:h-160 rounded-lg overflow-hidden">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-[1]"></div>

      <div className="relative z-[2] text-center text-white p-6 sm:p-8 lg:p-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Exclusive Deals on Our Best-Selling Products!
        </h2>
        <p className="text-base sm:text-lg lg:text-xl mb-6">
          Shop the latest products with amazing discounts. Don&apos;t miss out!
        </p>
        <Link href="/products">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md text-lg font-semibold">
            Shop Now
          </button>
        </Link>
      </div>

      <Image
        src={bannerBg}
        alt="Banner Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0"
      />
    </div>
  );
};

export default Banner;
