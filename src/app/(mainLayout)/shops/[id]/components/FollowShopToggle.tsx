"use client";

import { Button } from "@/components/ui/button";
import {
  useCheckIfUserFollowsShop,
  useFollow,
  useUnfollow,
} from "@/hooks/follow.hook";
import { IApiResponse, ICreateFollow, ICreateUnfollow, IFollow } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface IProps {
  shopId: string;
}

const FollowShopToggle = ({ shopId }: IProps) => {
  const { data, isLoading, isError } = useCheckIfUserFollowsShop(shopId);
  const { mutate: follow, isPending: isFollowPending } = useFollow();
  const { mutate: unfollow, isPending: isUnfollowPending } = useUnfollow();
  const [isFollow, setIsFollow] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.data) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [data]);

  if (isLoading) {
    return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
  }

  if (isError) {
    return <p>Something went wrong while checking follow status.</p>;
  }

  const handleButtonClick = () => {
    if (isFollow) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleFollow = () => {
    const followData: ICreateFollow = {
      shop: shopId,
    };

    follow(followData, {
      onSuccess: (res: IApiResponse<IFollow>) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Followed successfully");

          queryClient.invalidateQueries({
            queryKey: ["FOLLOW"],
          });

          queryClient.invalidateQueries({
            queryKey: ["SHOP", shopId],
          });

          setIsFollow(true);
        } else {
          console.error(res);
          toast.error(res.message || "Failed to follow. Please try again.");
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.message || "Failed to follow. Please try again.");
      },
    });
  };

  const handleUnfollow = () => {
    const unfollowData: ICreateUnfollow = {
      shop: shopId,
    };

    unfollow(unfollowData, {
      onSuccess: (res: IApiResponse<IFollow>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Unfollowed successfully");

          queryClient.invalidateQueries({
            queryKey: ["FOLLOW"],
          });

          queryClient.invalidateQueries({
            queryKey: ["SHOP", shopId],
          });

          setIsFollow(false);
        } else {
          console.error(res);
          toast.error(res.message || "Failed to unfollow. Please try again.");
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.message || "Failed to unfollow. Please try again.");
      },
    });
  };

  return (
    <div>
      <Button
        onClick={handleButtonClick}
        className="bg-emerald-500 hover:bg-emerald-700 w-full text-center"
        disabled={isFollowPending || isUnfollowPending}
      >
        {isFollowPending || isUnfollowPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isFollow ? (
          "Unfollow"
        ) : (
          "Follow"
        )}
      </Button>
    </div>
  );
};

export default FollowShopToggle;
