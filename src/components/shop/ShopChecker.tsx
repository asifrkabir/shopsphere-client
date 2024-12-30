"use client";

import { ShopProvider } from "@/context/shop.provider";
import { useGetShopByOwnerId } from "@/hooks/shop.hook";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import { AddShopModal } from "./AddShop/AddShopModal";

const ShopChecker = ({ children }: { children: React.ReactNode }) => {
  const { data: shopData, isLoading, isError } = useGetShopByOwnerId();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>Failed to load shop information. Please try again later.</p>;
  }

  const shop = shopData?.data;

  if (!shop) {
    return (
      <div className="flex flex-col items-center gap-1 text-center my-40">
        <h3 className="text-2xl font-bold tracking-tight">
          Add your shop details to get started
        </h3>
        <AddShopModal />
      </div>
    );
  }

  if (shop?.isBlacklisted) {
    return (
      <div className="flex flex-col items-center gap-1 text-center my-40">
        <h3 className="text-2xl font-bold max-w-lg">
          Your shop is currently blacklisted. Please contact with your
          designated account manager for next actions.
        </h3>
      </div>
    );
  }

  return (
    <ShopProvider value={{ shop, isLoading, isError }}>{children}</ShopProvider>
  );
};

export default ShopChecker;
