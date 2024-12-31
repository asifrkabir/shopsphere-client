"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/debounce.hook";
import { useGetAllProductCategories } from "@/hooks/productCategory.hook";
import { IQueryParam } from "@/types";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

interface AllProductsFilterProps {
  setParams: React.Dispatch<React.SetStateAction<IQueryParam[]>>;
  initialCategory?: string;
  initialSearchTerm?: string;
}

const AllProductsFilter: React.FC<AllProductsFilterProps> = ({
  setParams,
  initialCategory,
  initialSearchTerm,
}) => {
  const { register, setValue, watch } = useForm({
    defaultValues: {
      searchTerm: initialSearchTerm,
      category: initialCategory || "all",
      priceMin: undefined,
      priceMax: undefined,
    },
  });

  const searchTerm = useDebounce(watch("searchTerm"));
  const category = watch("category");
  const priceMin = useDebounce(watch("priceMin"));
  const priceMax = useDebounce(watch("priceMax"));

  const { data: productCategoriesData } = useGetAllProductCategories([
    { name: "limit", value: 10000 },
  ]);

  const productCategories: { label: string; value: string }[] =
    productCategoriesData?.data?.map((category: any) => ({
      label: category.name,
      value: category._id,
    })) || [];

  const updateParams = useCallback(
    (name: string, value: boolean | string | number) => {
      setParams((prev) => {
        const existingIndex = prev.findIndex((param) => param.name === name);

        if (existingIndex > -1) {
          const updatedParams = [...prev];
          updatedParams[existingIndex].value = value;
          return updatedParams;
        } else {
          return [{ name, value }, ...prev];
        }
      });
    },
    [setParams]
  );

  useEffect(() => {
    if (searchTerm !== undefined) {
      updateParams("searchTerm", searchTerm);
    }
  }, [searchTerm, updateParams]);

  useEffect(() => {
    if (category === "all") {
      setParams((prev) => prev.filter((param) => param.name !== "category"));
    } else if (category) {
      updateParams("category", category);
    }
  }, [category, setParams, updateParams]);

  useEffect(() => {
    if (priceMin) {
      updateParams("priceMin", priceMin);
    } else {
      setParams((prev) => prev.filter((param) => param.name !== "priceMin"));
    }
  }, [priceMin, setParams, updateParams]);

  useEffect(() => {
    if (priceMax) {
      updateParams("priceMax", priceMax);
    } else {
      setParams((prev) => prev.filter((param) => param.name !== "priceMax"));
    }
  }, [priceMax, setParams, updateParams]);

  return (
    <div className="space-y-4">
      <Input
        type="text"
        {...register("searchTerm")}
        placeholder="Search products..."
        className="w-full"
      />

      <Select
        value={category}
        onValueChange={(value) => setValue("category", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {productCategories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        {...register("priceMin")}
        placeholder="Min price"
        className="w-full"
      />

      <Input
        type="number"
        {...register("priceMax")}
        placeholder="Max price"
        className="w-full"
      />
    </div>
  );
};

export default AllProductsFilter;
