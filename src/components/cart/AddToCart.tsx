"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart.provider";
import { IProduct } from "@/types";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { useState } from "react";
import VerifyDifferentShopModal from "./VerifyDifferentShopModal";

interface AddToCartProps {
  product: IProduct;
}

const AddToCart = ({ product }: AddToCartProps) => {
  const {
    cart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    clearCart,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    _id: productId,
    shop,
    discountedPrice,
    price,
    onSale,
    inventoryCount,
  } = product;

  const productInCart = cart.products.find(
    (item) => item.productId === productId
  );
  const quantity = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = async () => {
    if (inventoryCount <= 0) {
      alert("This product is out of stock.");
      return;
    }

    setLoading(true);

    try {
      if (cart.shopId && cart.shopId !== shop._id) {
        setIsModalOpen(true);
      } else {
        addProductToCart(
          shop._id,
          shop.name,
          {
            productId,
            name: product.name,
            price: onSale && discountedPrice ? discountedPrice : price,
          },
          1
        );
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Replace or retain")
      ) {
        setIsModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    if (quantity >= inventoryCount) {
      alert("Cannot exceed available stock.");
      return;
    }

    setLoading(true);
    updateProductQuantity(productId, quantity + 1);
    setLoading(false);
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      handleRemoveFromCart();
      return;
    }

    setLoading(true);
    updateProductQuantity(productId, quantity - 1);
    setLoading(false);
  };

  const handleRemoveFromCart = () => {
    setLoading(true);
    removeProductFromCart(productId);
    setLoading(false);
  };

  const handleReplaceCart = () => {
    clearCart();
    setIsModalOpen(false);
    removeProductFromCart(productId);
    addProductToCart(
      shop._id,
      shop.name,
      {
        productId,
        name: product.name,
        price: onSale && discountedPrice ? discountedPrice : price,
      },
      1
    );
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center space-x-2">
      <div>
        {quantity > 0 ? (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              disabled={loading}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrement}
              disabled={loading || quantity >= inventoryCount}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-700 text-white"
              size="icon"
              onClick={handleRemoveFromCart}
              disabled={loading}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-700"
            onClick={handleAddToCart}
            disabled={loading || product.inventoryCount === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </div>

      <VerifyDifferentShopModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleReplaceCart}
        title="Switch Cart Items?"
        description="Your cart contains items from another vendor. Do you want to replace them with items from this vendor?"
      />
    </div>
  );
};

export default AddToCart;
