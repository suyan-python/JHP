import React, { useState } from "react";
import { ShoppingCart, User } from "lucide-react";
import FoodDisplay from "./FoodDisplay/FoodDisplay";
import { Story } from "./Story";
import { Newsletter } from "./Newsletter";

export function Hero() {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <>
      <div className="relative mt-48 mb-12">
        {/* Background Image */}
        <div className="absolute inset-0 h-[55vh] bg-cover bg-center rounded-[70px] brightness-75 bg-coverr"></div>

        {/* Hero Content */}
        <div
          className="relative h-[55vh] flex items-center justify-center text-center text-white z-10 px-6"
          id="home"
        >
          <div className="max-w-4xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Discover the Art of Fine Coffee
            </h1>
            <p className="text-xl mb-8 drop-shadow ">
              Jewel Himalayan Products (JHP) delivers 100% premium organic
              Arabica beans while empowering local farmers with expert support
              in cultivation and processing
            </p>
            <a
              href="#products"
              className="bg-bluee hover:bg-white text-white hover:text-black px-8 py-3 rounded-2xl text-lg font-semibold transition-colors"
            >
              Order Coffee Beans
            </a>
          </div>
        </div>
      </div>
      <FoodDisplay addToCart={addToCart} />
      <Story />
      {/* <Newsletter /> */}
    </>
  );
}
