/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
} from "@/services/ProductCategoryService";
import { IApiResponse, IQueryParam } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";
import {
  IProductCategory,
  IUpdateProductCategoryFormData,
} from "./../types/productCategory.type";

export const getAllProductCategoriesQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PRODUCT_CATEGORIES", params],
  queryFn: async () => await getAllProductCategories(params),
});

export const useGetAllProductCategories = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllProductCategoriesQuery(params),
  });
};

export const getProductCategoryByIdQuery = (id: string) => ({
  queryKey: ["PRODUCT_CATEGORY", id],
  queryFn: async () => await getProductCategoryById(id),
});

export const useGetProductCategoryById = (id: string) => {
  return useQuery({
    ...getProductCategoryByIdQuery(id),
  });
};

export const useCreateProductCategory = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: createProductCategory,
  });
};

export const useUpdateProductCategory = () => {
  return useMutation<any, Error, IUpdateProductCategoryFormData>({
    mutationFn: updateProductCategory,
  });
};

export const useDeleteProductCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteProductCategory,
    onSuccess: (res: IApiResponse<IProductCategory>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Product category deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["PRODUCT_CATEGORIES"],
        });
      } else {
        console.error(res);
        toast.error(
          res.message || "Failed to delete product category. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.message || "Failed to delete product category. Please try again."
      );
    },
  });
};
