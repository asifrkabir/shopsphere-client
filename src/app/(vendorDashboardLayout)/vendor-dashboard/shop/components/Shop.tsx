"use client";

import { DeleteShopModal } from "@/app/(adminDashboardLayout)/admin-dashboard/shops/components/DeleteShop/DeleteShopModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useShop } from "@/context/shop.provider";
import { Store } from "lucide-react";
import Image from "next/image";
import { UpdateShopModal } from "./UpdateShop/UpdateShopModal";

const Shop = () => {
  const { shop } = useShop();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center">
        <div className="mb-4">
          {shop.logoUrl ? (
            <Image
              src={shop.logoUrl}
              alt={shop.name || "Shop Logo"}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-emerald-500"
            />
          ) : (
            <Store className="w-24 h-24 text-gray-400" />
          )}
        </div>

        <CardTitle className="text-lg font-semibold text-center">
          {shop.name || "Unknown Shop"}
        </CardTitle>

        {shop.description && (
          <CardDescription className="text-sm mb-4 text-center">
            {shop.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex flex-col justify-center items-center gap-2">
        <h4>Followers: {shop.followerCount}</h4>
        <UpdateShopModal shop={shop!} />
        <DeleteShopModal id={shop._id} renderType={"button"} />
      </CardContent>
    </Card>
  );
};

export default Shop;
