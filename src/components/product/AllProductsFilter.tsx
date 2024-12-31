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
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface AllProductsFilterProps {
  setParams: React.Dispatch<React.SetStateAction<IQueryParam[]>>;
  initialCategory?: string;
  initialSearchTerm?: string;
}

interface FormValues {
  searchTerm: string | undefined;
  category: string;
  priceMin: number | undefined;
  priceMax: number | undefined;
  priceRange: string;
}

const AllProductsFilter: React.FC<AllProductsFilterProps> = ({
  setParams,
  initialCategory,
  initialSearchTerm,
}) => {
  const { register, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      searchTerm: initialSearchTerm,
      category: initialCategory || "all",
      priceMin: undefined,
      priceMax: undefined,
      priceRange: "",
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

  const handlePriceRangeChange = (priceRange: string) => {
    if (priceRange) {
      switch (priceRange) {
        case "all":
          setValue("priceMin", undefined);
          setValue("priceMax", undefined);
          break;
        case "below_100":
          setValue("priceMin", undefined);
          setValue("priceMax", 100);
          break;
        case "100_500":
          setValue("priceMin", 100);
          setValue("priceMax", 500);
          break;
        case "500_1000":
          setValue("priceMin", 500);
          setValue("priceMax", 1000);
          break;
        case "above_1000":
          setValue("priceMin", 1000);
          setValue("priceMax", undefined);
          break;
        default:
          setValue("priceMin", undefined);
          setValue("priceMax", undefined);
          break;
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Search Product</h4>

        <Input
          type="text"
          {...register("searchTerm")}
          placeholder="Search products..."
          className="w-full"
        />
      </div>

      <div>
        <h4 className="font-medium mb-2">Search Category</h4>

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
      </div>

      <div>
        <h4 className="font-medium mb-2">Price Ranges</h4>

        <RadioGroup
          value={undefined}
          onValueChange={(value) => handlePriceRangeChange(value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="any" />
            <Label htmlFor="any">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="below_100" id="below_100" />
            <Label htmlFor="below_100">Below $100</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100_500" id="100_500" />
            <Label htmlFor="100_500">$100 - $500</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="500_1000" id="500_1000" />
            <Label htmlFor="500_1000">$500 - $1000</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="above_1000" id="above_1000" />
            <Label htmlFor="above_1000">Above $1000</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default AllProductsFilter;
