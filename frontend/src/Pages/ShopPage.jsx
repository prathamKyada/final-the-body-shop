import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import face from "../components/productsFace";
import Fragrance from "../components/productFragrance";
import Mackup from "../components/productMackup";
import Hair from "../components/productHair";
import bodyLotions from "../components/productsBodyLotion";

const ShopPage = ({ cartCount, setCartCount }) => {
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
    <section className="relative z-10 py-16">
      <div className="container mx-auto max-w-[1320px]">
        <div className="text-center mb-16">
          <h2 className="md:text-4xl text-3xl font-serif font-semibold text-brand-600 mb-4">
            Our Product Collection
          </h2>
          <p className="text-lg text-brand-600/80 max-w-2xl mx-auto mt-6">
            Discover our handcrafted collection of premium body care products.
          </p>
        </div>

                {/* 🧴 Body Lotions Section */}
                <section className="container mx-auto max-w-[1320px] mb-12">
          <h3 className="text-2xl font-semibold text-brand-600 mb-6">Body Lotions</h3>
          <ProductList 
            products={bodyLotions}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </section>

        {/* 🛀 Soaps Section */}
        <section className="container mx-auto max-w-[1320px] mb-12">
          <h3 className="text-2xl font-semibold text-brand-600 mb-6">Faces</h3>
          <ProductList 
            products={face}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </section>

        {/* 💄 Lip Balms Section */}
        <section className="container mx-auto max-w-[1320px] mb-12">
          <h3 className="text-2xl font-semibold text-brand-600 mb-6">Fragrance</h3>
          <ProductList 
            products={Fragrance}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </section>
        <section className="container mx-auto max-w-[1320px] mb-12">
          <h3 className="text-2xl font-semibold text-brand-600 mb-6">Hair</h3>
          <ProductList 
            products={Hair}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </section>
        <section className="container mx-auto max-w-[1320px] mb-12">
          <h3 className="text-2xl font-semibold text-brand-600 mb-6">Mackup</h3>
          <ProductList 
            products={Mackup}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </section>



      </div>
    </section>
  </div>

  );
};

export default ShopPage;
