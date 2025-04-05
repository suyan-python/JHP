import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./components/Hero.jsx";
import { Story } from "./components/Story.jsx";
import { Newsletter } from "./components/Newsletter.jsx";
import { Footer } from "./components/Footer.jsx";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay.jsx";
import { Cart } from "./components/Cart/Cart.jsx"; // Import Cart Component
import StoreContextProvider from "./context/StoreContext.jsx";
import Success from "./components/esewa/Success.jsx";
import Failure from "./components/esewa/Failure.jsx";
import Payment from "./components/esewa/Payment.jsx";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    );
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="min-h-screen">
      <StoreContextProvider>
        <Router>
          <Navbar cart={cart} toggleCart={toggleCart} />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/payment-success" element={<Success />} />
            <Route path="/payment-failure" element={<Failure />} />
            <Route path="/payment-form" element={<Payment />} />
          </Routes>
          <Footer />
        </Router>
      </StoreContextProvider>
    </div>
  );
}
export default App;
