import React, { useState } from "react";
import { ShoppingCart, User } from "lucide-react";

export function Hero() {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="relative mt-36 mb-12">
      {/* Background Image */}
      <div
        className="absolute inset-0 h-[55vh] bg-cover bg-center rounded-2xl brightness-75"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80")',
        }}
      ></div>

      {/* Hero Content */}
      <div
        className="relative h-[55vh] flex items-center justify-center text-center text-white z-10 px-6"
        id="home"
      >
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Discover the Art of Fine Coffee
          </h1>
          <p className="text-xl mb-8 drop-shadow">
            Carefully sourced and expertly roasted beans delivered fresh to your
            doorstep.
          </p>
          <a
            href="#products"
            className="bg-amber-700 hover:bg-white text-white hover:text-black px-8 py-3 rounded-2xl text-lg font-semibold transition-colors"
          >
            Order Coffee Beans
          </a>
        </div>
      </div>
    </div>
  );
}
