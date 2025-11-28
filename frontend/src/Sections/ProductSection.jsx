import React, { useEffect, useState } from "react";
import leftImage from "../assets/img/but.png";
import ProductList from "../components/ProductList";
import products from "../components/productsSoaps"; // Importing the product data

const ProductSection = ({ cartCount, setCartCount }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
    setCartCount(savedCartItems.length);
  }, [setCartCount]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, { ...product, quantity: 1 }];
      setCartCount(updatedCart.length);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleUpdateQuantity = (productId, change) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0);

      setCartCount(updatedCart.length);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className="relative w-full py-24 bg-gradient-to-b from-[#E3F0FF] to-[#F8FBFF] overflow-hidden">
      <img
        src={leftImage}
        alt="Background"
        className="absolute left-0 top-0 h-auto lg:max-w-[565px] sm:max-w-[162px] max-w-[43px] z-0"
      />
      <section className="relative z-10 ">
        <div className="container mx-auto max-w-[1320px]">
          <div className="text-center mb-16">
            <h2 className="md:text-4xl text-3xl text-prime lg:text-5xl font-serif font-semibold text-brand-600 mb-4 relative inline-block">
              Our Product Collection
            </h2>
            <p className="text-[16px] md:text-lg text-brand-600/80 max-w-2xl mx-auto mt-6">
              Discover our handcrafted collection of premium body care products made with the finest natural ingredients.
            </p>
          </div>

          {/* Product List Component */}
          <ProductList
            products={products}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleUpdateQuantity={handleUpdateQuantity}
          />

          {/* View All Products Button */}
          <div className="text-center mt-16">
            <button   onClick={() => window.location.href = "/shop"} 
 className="inline-flex items-center space-x-2 px-8 py-3 border-2 border-brand-600 text-brand-600 font-medium rounded-md transition-all duration-300 hover:bg-brand-50">
              
              <span>View All Products</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>  
  );
};

export default ProductSection;
