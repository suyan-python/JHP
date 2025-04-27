import React, { useState } from "react";
import { Story } from "./Story";
import { WhyJHP } from "./Hero2";
import { ExperienceVideo } from "./Hero3";
import background from "../assets/background/1.jpg";

export function Hero() {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <>
      <div className="relative mt-40 mb-5">
        {/* Background Image */}
        <div className="absolute inset-0 h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]  brightness-75">
          <img
            className="rounded-[40px] sm:rounded-[50px] lg:rounded-[70px]"
            src={background}
            alt=""
          />
        </div>

        {/* Hero Content */}
        <div
          className="relative flex items-center justify-center text-center text-white z-10 px-4 sm:px-6 lg:px-12 h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]"
          id="home"
        >
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight">
              Discover the Art of Fine Coffee
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 drop-shadow">
              Jewel Himalayan Products (JHP) delivers 100% premium organic
              Arabica beans while empowering local farmers with expert support
              in cultivation and processing.
            </p>
            <a
              href="#products"
              className="inline-block bg-bluee hover:bg-white text-white hover:text-black px-6 sm:px-8 py-2 sm:py-3 rounded-2xl text-sm sm:text-lg font-semibold transition-all duration-300"
            >
              Order Coffee Beans
            </a>
          </div>
        </div>
      </div>

      <Story />
      <WhyJHP />
      <ExperienceVideo />
    </>
  );
}
