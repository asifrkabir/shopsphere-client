"use client";

import { CompareProductsModal } from "../products/components/CompareProducts/CompareProductsModal";

const CompareProducts = () => {
  return (
    <div className="rounded-lg p-6 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 border border-gray-300 relative overflow-hidden">
      <div className="max-w-lg">
        <h3 className="text-2xl font-semibold leading-tight mb-4">
          Wondering which option is best for you?
        </h3>
        <p className="text-sm md:text-base">
          Compare the products and choose the best one that suits your needs.
        </p>
      </div>

      <div className="w-full lg:w-auto flex-shrink-0">
        <CompareProductsModal />
      </div>
    </div>
  );
};

export default CompareProducts;
