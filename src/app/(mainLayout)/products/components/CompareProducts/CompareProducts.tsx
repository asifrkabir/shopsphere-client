"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProductsForFeedQuery } from "@/hooks/product.hook";
import { useGetAllProductCategories } from "@/hooks/productCategory.hook";
import { getAllReviewsQuery } from "@/hooks/review.hook";
import { IProduct, IProductCategory, IReview } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";

const CompareProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<(IProduct | null)[]>(
    [null, null, null]
  );

  const { data: productCategoriesData, isLoading: isProductCategoriesLoading } =
    useGetAllProductCategories([{ name: "limit", value: "10000" }]);

  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    ...getAllProductsForFeedQuery([
      { name: "limit", value: "10000" },
      { name: "category", value: selectedCategory },
    ]),
    enabled: !!selectedCategory,
  });

  const reviewsQuery0 = useQuery({
    ...getAllReviewsQuery([
      { name: "limit", value: "10000" },
      { name: "product", value: selectedProducts[0]?._id || "" },
    ]),
    enabled: !!selectedProducts[0],
  });

  const reviewsQuery1 = useQuery({
    ...getAllReviewsQuery([
      { name: "limit", value: "10000" },
      { name: "product", value: selectedProducts[1]?._id || "" },
    ]),
    enabled: !!selectedProducts[1],
  });

  const reviewsQuery2 = useQuery({
    ...getAllReviewsQuery([
      { name: "limit", value: "10000" },
      { name: "product", value: selectedProducts[2]?._id || "" },
    ]),
    enabled: !!selectedProducts[2],
  });

  const productCategories: IProductCategory[] =
    productCategoriesData?.data || [];
  const products: IProduct[] = productsData?.data || [];

  const handleProductChange = (index: number, productId: string) => {
    const selectedProduct =
      products.find((product) => product._id === productId) || null;
    setSelectedProducts((prev) => {
      const updated = [...prev];
      updated[index] = selectedProduct;
      return updated;
    });
  };

  const handleReset = () => {
    setSelectedProducts([null, null, null]);
    setSelectedCategory("");
  };

  const getRatingForProduct = (productIndex: number): number | null => {
    const query =
      productIndex === 0
        ? reviewsQuery0
        : productIndex === 1
        ? reviewsQuery1
        : reviewsQuery2;

    if (query?.data?.data) {
      const productReviews = query.data.data.filter(
        (review: IReview) =>
          review.product._id === selectedProducts[productIndex]?._id
      );
      if (productReviews.length === 0) return null;

      const averageRating =
        productReviews.reduce((acc, review) => acc + review.rating, 0) /
        productReviews.length;
      return averageRating;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        {isProductCategoriesLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <>
            <p className="text-sm mb-2">
              Select category (you can compare products from one category at a
              time)
            </p>
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                handleReset();
                setSelectedCategory(value);
              }}
            >
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>

      {isProductsLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        selectedCategory && (
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableCell className="font-medium">Details</TableCell>
                  {selectedProducts.map((_, index) => (
                    <TableCell key={index}>
                      <Select
                        onValueChange={(value) =>
                          handleProductChange(index, value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`Select Product ${index + 1}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product._id} value={product._id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  {selectedProducts.map((product, index) => (
                    <TableCell key={index}>
                      {product ? product.name : "-"}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Shop</TableCell>
                  {selectedProducts.map((product, index) => (
                    <TableCell key={index}>
                      {product ? product.shop?.name : "-"}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Price</TableCell>
                  {selectedProducts.map((product, index) => (
                    <TableCell key={index}>
                      {product ? `$${product.price}` : "-"}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rating</TableCell>
                  {selectedProducts.map((product, index) => (
                    <TableCell key={index}>
                      {product ? (
                        getRatingForProduct(index) !== null ? (
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, idx) => (
                              <Star
                                key={idx}
                                className={`h-6 w-6 cursor-pointer transition ${
                                  idx < getRatingForProduct(index)!
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        ) : (
                          "-"
                        )
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )
      )}

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          className="px-4 py-2 rounded-md"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default CompareProducts;
