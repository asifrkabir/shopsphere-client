"use client";

import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetShopById } from "@/hooks/shop.hook";
import { Store } from "lucide-react";
import Image from "next/image";
import FollowShopToggle from "./FollowShopToggle";
import { useUser } from "@/context/user.provider";

interface IProps {
  id: string;
}

const Shop = ({ id }: IProps) => {
  const { data, isLoading, isError } = useGetShopById(id);
  const { user } = useUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data?.data) {
    return <p>Something went wrong while fetching shop</p>;
  }

  const shop = data.data;

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
        {user && <FollowShopToggle shopId={id} />}
      </CardContent>
    </Card>
  );
};

export default Shop;
