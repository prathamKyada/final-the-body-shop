import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Sections/Header";
import Hero from "./Sections/Hero";
import ProductSection from "./Sections/ProductSection";
import Categories from "./Sections/Categories";
import CartPage from "./Pages/CartPage";
import ShopPage from "./Pages/ShopPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import Footer from "./Sections/Footer";
import Login from "./components/Login";
import ScrollToTop from "./components/ScrollToTop";  // ✅ Import ScrollToTop
function App() {
  const [cartCount, setCartCount] = useState(0);



  return (
    <>

      <Header cartCount={cartCount} />
      <ScrollToTop /> {/* ✅ Add this here */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ProductSection cartCount={cartCount} setCartCount={setCartCount} />
              <Categories />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shop" element={<ShopPage cartCount={cartCount} setCartCount={setCartCount} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      

    </>
  );
}

export default App;
