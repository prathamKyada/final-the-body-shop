import React from "react";
import ProductCard from "./ProductCard";


const ProductList = ({ products, cartItems = [], handleAddToCart, handleUpdateQuantity }) => {
    if (!products || products.length === 0) {
      return <p>No products available.</p>;
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              cartItem={cartItem}
              handleAddToCart={handleAddToCart}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          );
        })}
      </div>
    );
  };
  

export default ProductList;
