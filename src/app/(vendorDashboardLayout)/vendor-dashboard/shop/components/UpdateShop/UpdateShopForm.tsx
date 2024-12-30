/* eslint-disable @next/next/no-img-element */
"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppTextarea from "@/components/form/AppTextarea";
import { Button } from "@/components/ui/button";
import { useUpdateShop } from "@/hooks/shop.hook";
import { updateShopValidationSchema } from "@/schemas/shop.schema";
import { IApiResponse, IShop, IUpdateShop } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
  shop: IShop;
}

export function UpdateShopForm({ closeModal, shop }: IProps) {
  const queryClient = useQueryClient();
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const { mutate: updateShop, isPending } = useUpdateShop();

  const existingShopValues = {
    name: shop.name,
    description: shop?.description,
  };

  useEffect(() => {
    if (shop.logoUrl) {
      setExistingImageUrls([shop.logoUrl]);
      setImagePreviews([shop.logoUrl]);
    }
  }, [shop]);

  const handleImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles([file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setExistingImageUrls([]);
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const shopData = {
      ...data,
      logoUrl: existingImageUrls.length > 0 ? existingImageUrls[0] : null,
    };

    formData.append("data", JSON.stringify(shopData));

    for (const image of imageFiles) {
      formData.append("logoUrls", image);
    }

    const payload: IUpdateShop = {
      id: shop._id,
      formData,
    };

    updateShop(payload, {
      onSuccess: (res: IApiResponse<IShop>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Shop updated successfully");

          queryClient.invalidateQueries({
            queryKey: ["SHOP_BY_OWNER"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to update shop. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to update shop. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(updateShopValidationSchema)}
          defaultValues={existingShopValues}
        >
          <AppInput
            name="name"
            label="Name"
            type="text"
            placeholder="Enter shop name"
            required
          />

          <AppTextarea
            name="description"
            label="Description"
            type="text"
            placeholder="Enter shop description"
          />

          <div className="min-w-fit flex-1">
            <label
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              Upload logo
            </label>
            <input
              className="hidden"
              id="image"
              type="file"
              onChange={(e) => handleImageAdd(e)}
            />
          </div>

          <div>
            <div className="flex justify-center m-8">
              {imagePreviews.length > 0 &&
                imagePreviews.map((imageDataUrl, index) => (
                  <div
                    key={index}
                    className="relative size-48 rounded-full border-2 border-dashed border-default-300 p-2 group"
                  >
                    <img
                      className="h-full w-full object-cover object-center rounded-full"
                      src={imageDataUrl}
                      alt={"Logo"}
                    />

                    <button
                      className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => handleImageDelete()}
                    >
                      <Trash2 className="text-white w-5 h-5" />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
}
