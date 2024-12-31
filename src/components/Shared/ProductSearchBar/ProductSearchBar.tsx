"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-md ml-2 bg-gray-100 rounded-md shadow-sm overflow-hidden"
    >
      <Input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 border-none focus:ring-0 px-4 bg-transparent"
      />

      <Button
        type="submit"
        className="bg-emerald-500 text-white rounded-none px-4 hover:bg-emerald-600"
      >
        <Search />
      </Button>
    </form>
  );
};

export default ProductSearchBar;
