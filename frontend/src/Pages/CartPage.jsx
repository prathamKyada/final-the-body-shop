import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
  }, []);

  const handleUpdateQuantity = (productId, change) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;
  
    const phoneNumber = "+919727652436";
    let message = "I want these products:\n\n";
  
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.quantity} x ${item.price}\n`;
    });
  
    message += `\nTotal Items: ${totalItems}\nTotal Price: ₹${totalPrice}`;
  
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
    window.open(whatsappURL, "_blank");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * parseInt(item.price.replace("₹", "")), 0);

  return (
<section className="h-screen bg-gradient-to-r from-[#044236]/90 to-[#044236]/70 flex items-center">

      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Shopping Cart</h2>

        {cartItems.length > 0 ? (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg shadow p-3">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.price} x {item.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-gray-800 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                      className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, -item.quantity)}
                      className="p-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="text-lg font-semibold">Total Items: <span className="text-brand-600">{totalItems}</span></p>
              <p className="text-xl font-bold">Total Price: <span className="text-brand-600">₹{totalPrice}</span></p>
            </div>

            <button   onClick={handleWhatsAppOrder}
 className="lg:flex mt-4 btn items-center justify-center relative px-10 py-3 text-base uppercase text-white bg-gradient-to-b from-[#05674e] to-[#033d2b] rounded-full overflow-hidden group transition duration-300 hover:bg-green-700 border-2 border-[#ffffff33]">
  <span className="relative z-10 group-hover:translate-y-[-30px] transition duration-300">
    Buy Now
  </span>
  <span className="absolute left-0 right-0 text-base text-white opacity-0 group-hover:opacity-100 translate-y-[30px] group-hover:translate-y-[0px] transition duration-300">
    Get in Touch
  </span>
</button>
          </>
        ) : (
          <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
        )}
      </div>
    </section>
  );
};

export default CartPage;
