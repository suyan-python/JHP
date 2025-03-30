import React, { useState, useEffect } from "react";
import { Coffee, ShoppingCart } from "lucide-react";
import { Cart } from "./Cart/Cart.jsx"; // Import the Cart component

export function Navbar({ cart }) {
  const [scrolled, setScrolled] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false); // State to control cart visibility

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible); // Toggle the visibility of the cart
  };

  const closeCart = () => {
    setIsCartVisible(false); // Close the cart when the close button is clicked
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div
          className={`max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col items-center transition-all duration-300 ${
            scrolled ? "text-gray-900" : "text-white"
          }`}
        >
          {/* Logo and Cart Section */}
          <div className="flex items-center justify-between w-full h-16">
            <div className="w-1/3"></div> {/* Empty div for spacing */}
            {/* Centered Logo */}
            <div className="flex items-center">
              <Coffee
                className={`h-7 w-7 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              />
              <span
                className={`ml-2 text-lg font-semibold ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                JHP
              </span>
            </div>
            {/* Cart at Rightmost */}
            <div className="w-1/3 flex justify-end">
              <button
                className="p-2 rounded-full transition"
                onClick={toggleCart} // Toggle the cart visibility when clicked
              >
                <ShoppingCart className={`h-5 w-5`} />
              </button>
            </div>
          </div>

          {/* Navigation Links Below */}
          <div className="flex items-center space-x-28 text-sm my-4">
            {["Home", "Products", "Our Story", "Contact"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="relative group transition-colors"
              >
                {item}
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px]  transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-black" : "bg-white"
                  }`}
                ></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Cart Section - Uses the Cart component */}
      <Cart cart={cart} isCartVisible={isCartVisible} closeCart={closeCart} />
    </>
  );
}
