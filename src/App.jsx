import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { Story } from "./components/Story";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";
import ExploreMenu from "./components/ExploreMenu/ExploreMenu";
import { Cart } from "./components/Cart/Cart.jsx"; // Import Cart Component

function App() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Properly updating the state
  };

  // ✅ Remove item from cart (Fixed)
  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    );
  };

  // Toggle Cart Visibility
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="min-h-screen">
      <Navbar cart={cart} toggleCart={toggleCart} />
      <main>
        <Hero />
        <FoodDisplay addToCart={addToCart} />
        <Story />
        <Newsletter />
      </main>
      <Footer />

      {/* Cart Component */}
      <Cart
        cart={cart}
        isCartVisible={isCartVisible}
        closeCart={() => setIsCartVisible(false)}
        removeFromCart={removeFromCart} // ✅ Ensure this function is passed correctly
      />
    </div>
  );
}

export default App;
