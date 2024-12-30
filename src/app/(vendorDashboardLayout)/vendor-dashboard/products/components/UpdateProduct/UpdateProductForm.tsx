"use client";

import AppCheckbox from "@/components/form/AppCheckbox";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppSelect from "@/components/form/AppSelect";
import AppTextarea from "@/components/form/AppTextarea";
import { Button } from "@/components/ui/button";
import { useGetProductById, useUpdateProduct } from "@/hooks/product.hook";
import { useGetAllProductCategories } from "@/hooks/productCategory.hook";
import { updateProductValidationSchema } from "@/schemas/product.schema";
import {
  IApiResponse,
  IDropdownOption,
  IProduct,
  IUpdateProduct
} from "@/types";
import { extractDropdownOptions } from "@/utils/extractDropdownOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
  id: string;
}

export function UpdateProductForm({ closeModal, id }: IProps) {
  const { data: productData, isLoading, isError } = useGetProductById(id);
  const { data: productCategoriesData } = useGetAllProductCategories([
    { name: "limit", value: 10000 },
  ]);

  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const queryClient = useQueryClient();

  const product = productData?.data as IProduct;
  const productCategories: IDropdownOption[] = extractDropdownOptions(
    productCategoriesData?.data || [],
    "name",
    "_id"
  );

  const existingProductValues: Partial<Omit<IProduct, "category">> & {
    category?: string;
  } = {
    name: product?.name,
    description: product?.description,
    price: product?.price,
    category: product?.category?._id,
    inventoryCount: product?.inventoryCount,
    onSale: product?.onSale,
    discountedPrice: product?.discountedPrice,
  };

  useEffect(() => {
    if (product?.imageUrls) {
      setExistingImageUrls(product.imageUrls);
      setImagePreviews(product.imageUrls);
    }
  }, [product]);

  const handleImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const handleImageDelete = (index: number) => {
    if (index < existingImageUrls.length) {
      setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImageUrls.length;
      setImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const productData = {
      ...data,
      imageUrls: existingImageUrls,
    };

    formData.append("data", JSON.stringify(productData));

    for (const image of imageFiles) {
      formData.append("productImages", image);
    }

    const payload: IUpdateProduct = {
      id: product?._id,
      formData,
    };

    updateProduct(payload, {
      onSuccess: (res: IApiResponse<IProduct>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Product updated successfully");

          queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
          queryClient.invalidateQueries({ queryKey: ["PRODUCT", id] });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to update product. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to update product. Please try again."
        );
      },
    });
  };

  if (isLoading) {
    return <Loader2 className="size-5 animate-spin" />;
  }

  if (isError) {
    return <p>Something went wrong while fetching product</p>;
  }

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(updateProductValidationSchema)}
          defaultValues={existingProductValues}
        >
          <AppInput
            name="name"
            label="Name"
            type="text"
            placeholder="Enter product name"
            required
          />

          <AppTextarea
            name="description"
            label="Description"
            type="text"
            placeholder="Enter product description"
            required
          />

          <AppInput
            name="price"
            label="Price ($)"
            type="number"
            placeholder="Enter product price"
            required
            step="any"
          />

          <AppInput
            name="inventoryCount"
            label="Inventory Count"
            type="number"
            placeholder="Enter product inventory count"
            required
          />

          <AppSelect
            name="category"
            label="Category"
            placeholder="Select product category"
            options={productCategories}
            required
          />

          <AppCheckbox name="onSale" label="On Sale?" />

          <AppInput
            name="discountedPrice"
            label="Discounted Price ($)"
            type="number"
            placeholder="Enter discounted price"
            step="any"
          />

          <div className="min-w-fit flex-1">
            <label
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              Upload images
            </label>
            <input
              multiple
              className="hidden"
              id="image"
              type="file"
              onChange={(e) => handleImageAdd(e)}
            />
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 m-8">
              {imagePreviews.length > 0 &&
                imagePreviews.map((imageDataUrl, index) => (
                  <div
                    key={index}
                    className="relative size-32 border-2 border-dashed border-default-300 p-2 group"
                  >
                    <Image
                      className="h-full w-full object-cover object-center"
                      src={imageDataUrl}
                      alt={`Preview ${index + 1}`}
                      width={128}
                      height={128}
                    />

                    <button
                      className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(event) => {
                        event.preventDefault();
                        handleImageDelete(index);
                      }}
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
              "Update"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
}
