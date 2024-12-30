import Image from "next/image";
import bannerBg from "@/assets/images/banner-bg.png";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative h-72 sm:h-96 lg:h-[550px] rounded-lg overflow-hidden">
      <Image
        src={bannerBg}
        alt="Banner Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0"
      />

      <div className="absolute inset-0 flex items-center justify-start p-6 sm:p-8 lg:p-12 text-white">
        <div className="max-w-md bg-black bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Exclusive Deals on Our Best-Selling Products!
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6">
            Shop the latest products with amazing discounts. Don&apos;t miss
            out!
          </p>
          <Link href="/products">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md text-lg font-semibold">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
