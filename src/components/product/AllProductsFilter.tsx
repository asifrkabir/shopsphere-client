/* eslint-disable @typescript-eslint/no-explicit-any */
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
}

const AllProductsFilter: React.FC<AllProductsFilterProps> = ({
  setParams,
  initialCategory,
}) => {
  const { register, setValue, watch } = useForm({
    defaultValues: {
      searchTerm: undefined,
      category: initialCategory || "all",
      isDiscounted: undefined,
      priceMin: undefined,
      priceMax: undefined,
    },
  });

  const searchTerm = useDebounce(watch("searchTerm"));
  const category = watch("category");
  const isDiscounted = watch("isDiscounted");
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
    if (isDiscounted !== undefined && isDiscounted !== "on") {
      if (isDiscounted) {
        updateParams("onSale", true);
      } else {
        setParams((prev) => prev.filter((param) => param.name !== "onSale"));
      }
    }
  }, [isDiscounted, setParams, updateParams]);

  useEffect(() => {
    if (priceMin !== undefined && priceMin !== "") {
      updateParams("priceMin", priceMin);
    } else {
      setParams((prev) => prev.filter((param) => param.name !== "priceMin"));
    }
  }, [priceMin, setParams, updateParams]);

  useEffect(() => {
    if (priceMax !== undefined && priceMax !== "") {
      updateParams("priceMax", priceMax);
    } else {
      setParams((prev) => prev.filter((param) => param.name !== "priceMax"));
    }
  }, [priceMax, setParams, updateParams]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <Input
        type="text"
        {...register("searchTerm")}
        placeholder="Search products..."
        className="max-w-xs"
      />

      <Select
        value={category}
        onValueChange={(value) => setValue("category", value)}
      >
        <SelectTrigger className="max-w-xs">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
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
        className="max-w-xs"
      />

      <Input
        type="number"
        {...register("priceMax")}
        placeholder="Max price"
        className="max-w-xs"
      />

      {/* <div className="flex items-center gap-2">
        <Switch
          {...register("isDiscounted")}
          onCheckedChange={(checked) => setValue("isDiscounted", checked)}
        />
        <label className="text-sm">Show only discounted</label>
      </div> */}
    </div>
  );
};

export default AllProductsFilter;
