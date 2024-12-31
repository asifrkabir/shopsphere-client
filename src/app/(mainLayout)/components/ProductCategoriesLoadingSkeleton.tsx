"use client";

interface IProps {
  itemCount?: number;
}

const ProductCategoriesLoadingSkeleton = ({ itemCount }: IProps) => {
  const skeletonItems = Array.from({ length: itemCount || 10 });

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm bg-gray-200 animate-pulse h-24 w-60 flex flex-col items-center justify-center"
          >
            <div className="h-10 w-10 bg-gray-300 rounded-full mb-2"></div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoriesLoadingSkeleton;
