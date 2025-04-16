import React, { useState, useEffect } from "react";
import { Coffee, ShoppingCart } from "lucide-react";
import { Cart } from "./Cart/Cart.jsx";
import { useStore } from "../context/StoreContext.jsx"; // Ensure correct import

export function Navbar() {
  const { cartItems } = useStore(); // Get cartItems from context
  const [scrolled, setScrolled] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const closeCart = () => {
    setIsCartVisible(false);
  };

  const closeNotification = () => {
    setIsNotificationVisible(false);
  };

  return (
    <>
      {/* Notification Bar */}
      {isNotificationVisible && (
        <div className="fixed top-0 left-0 w-full bg-[#E4C16F] py-2 px-4 z-40 text-center text-brownn">
          <div className="relative flex items-center justify-center">
            {/* Centered Text */}
            <span className="text-sm mx-auto">
              Special offer: Get 10% off your first purchase with code
              WELCOME10!
            </span>

            {/* Close Button on the Right */}
            <button
              onClick={closeNotification}
              className="absolute right-0 text-lg font-semibold px-4"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav
        className={`fixed left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        } ${isNotificationVisible ? "top-10" : "top-0"}`} // Dynamically adjust top value
      >
        <div
          className={`max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col items-center transition-all duration-300 ${
            scrolled ? "text-brownn" : "text-brownn"
          }`}
        >
          {/* Logo and Cart Section */}
          <div className="flex items-center justify-between w-full h-16">
            <div className="w-1/3"></div>
            {/* Centered Logo */}
            <div className="flex items-center">
              <Coffee
                className={`h-7 w-7 ${
                  scrolled ? "text-brownn" : "text-brownn"
                }`}
              />
              <span
                className={`ml-2 text-lg font-semibold ${
                  scrolled ? "text-brownn" : "text-brownn"
                }`}
              >
                JHP Store
              </span>
            </div>
            {/* Cart Icon */}
            <div className="w-1/3 flex justify-end">
              <button
                className="p-2 rounded-full transition"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {/* Display cart count only if cartItems exist */}
                {Object.keys(cartItems || {}).length > 0 && (
                  <span className="ml-1 text-sm font-bold">
                    ({Object.keys(cartItems).length})
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-28 text-sm my-4">
            {["Home", "Products", "Our Story", "Contact"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="relative group transition-colors"
              >
                {item}
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-black" : "bg-white"
                  }`}
                ></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Cart Component */}
      <Cart isCartVisible={isCartVisible} closeCart={closeCart} />
    </>
  );
}
