import React from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";

const ProductCard = ({ product, cartItem, handleAddToCart, handleUpdateQuantity }) => {
    if (!product) return null;

  return (
    <div className="group bg-white rounded-xl flex justify-between flex-col shadow-sm hover:shadow-md p-6 transition-all duration-300 relative overflow-hidden border border-brand-50">
      {product.tag && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-brand-500 text-prime rounded-full">
            {product.tag}
          </span>
        </div>
      )}

      <div className="relative mb-6 transform transition duration-500 group-hover:scale-105 group-hover:-translate-y-2">
        <div className="w-full flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
        </div>
      </div>

      <div className="transition-all duration-300 group-hover:translate-y-2">
        <h3 className="text-xl font-serif font-medium text-brand-600 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 min-h-[40px]">{product.description}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xl font-medium text-brand-600">{product.price}</span>
        {cartItem ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleUpdateQuantity(product.id, -1)}
              className="p-2 bg-brand-600 text-prime rounded-md transition-all duration-300 hover:bg-brand-700"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-brand-600 font-medium">{cartItem.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(product.id, 1)}
              className="p-2 bg-brand-600 text-prime rounded-md transition-all duration-300 hover:bg-brand-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className="flex gap-2 items-start ps-4 py-2 bg-brand-600 text-prime text-sm font-medium rounded-md transition-all duration-300 hover:bg-brand-700 hover:shadow-md"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 to-brand-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};

export default ProductCard;
