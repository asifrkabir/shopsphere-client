"use client";

import { CircleHelp } from "lucide-react";
import { CompareProductsModal } from "../products/components/CompareProducts/CompareProductsModal";

const CompareProducts = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg flex items-center justify-between border border-gray-300 relative overflow-hidden">
      <div className="max-w-lg relative z-10">
        <h3 className="text-2xl font-semibold leading-tight mb-4">
          Torn between options?
        </h3>
        <p className="text-sm md:text-base">
          Compare the products and choose the best one that suits your needs.
        </p>
      </div>

      <div>
        <CompareProductsModal />
      </div>

      <CircleHelp className="absolute size-40 -left-10 top-1/2 transform -translate-y-1/2 text-neutral-500 opacity-20 text-6xl z-0" />
    </div>
  );
};

export default CompareProducts;
