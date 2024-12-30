/* eslint-disable @next/next/no-img-element */
"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import { Button } from "@/components/ui/button";
import { useCreateProductCategory } from "@/hooks/productCategory.hook";
import { createProductCategoryValidationSchema } from "@/schemas/productCategory.schema";
import {
  IApiResponse,
  ICreateProductCategory,
  IProductCategory,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
}

const AddProductCategoryForm = ({ closeModal }: IProps) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { mutate: createProductCategory, isPending } =
    useCreateProductCategory();
  const queryClient = useQueryClient();

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
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const productCategoryData: ICreateProductCategory = {
      name: data.name,
    };

    formData.append("data", JSON.stringify(productCategoryData));

    for (const image of imageFiles) {
      formData.append("logos", image);
    }

    createProductCategory(formData, {
      onSuccess: (res: IApiResponse<IProductCategory>) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Product Category created successfully");

          queryClient.invalidateQueries({
            queryKey: ["PRODUCT_CATEGORIES"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to add product category. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to add product category. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(createProductCategoryValidationSchema)}
        >
          <AppInput
            name="name"
            label="Name"
            type="text"
            placeholder="Enter product category name"
            required
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
};

export default AddProductCategoryForm;
