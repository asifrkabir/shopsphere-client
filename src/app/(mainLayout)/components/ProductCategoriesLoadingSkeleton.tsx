"use client";

interface IProps {
  itemCount?: number;
}

const ProductCategoriesLoadingSkeleton = ({ itemCount }: IProps) => {
  const skeletonItems = Array.from({ length: itemCount || 8 });

  return (
    <div className="my-8">
      <div className="flex gap-4 overflow-hidden">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="inline-block mx-4 p-4 border rounded-lg shadow-sm bg-gray-200 animate-pulse h-16 w-32"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoriesLoadingSkeleton;
