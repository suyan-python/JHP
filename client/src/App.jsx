import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./components/Hero.jsx";
import { Footer } from "./components/Footer.jsx";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";
import Success from "./components/esewa/Success.jsx";
import Failure from "./components/esewa/Failure.jsx";
import Payment from "./components/esewa/Payment.jsx";
import PopupOffer from "./popup.jsx";
import PlaceOrder from "./components/Cart/PlaceOrder.jsx";
import JHPHome from "./components/JHP/jhpHome.jsx";
import JHP from "./components/JHP/jhp.jsx";

function App() {
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <StoreContextProvider>
      <Router>
        {/* Popup Offer */}
        <PopupOffer />

        {/* Navbar */}
        <Navbar />

        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/store"
            element={<FoodDisplay addToCart={addToCart} />}
          />

          <Route path="/JHP" element={<JHP />} />
          <Route path="/JHCB" element={<PlaceOrder />} />
          <Route path="/inaya" element={<PlaceOrder />} />

          <Route path="/payment" element={<PlaceOrder />} />
          <Route path="/payment-success" element={<Success />} />
          <Route path="/payment-failure" element={<Failure />} />
          <Route path="/payment-form" element={<Payment />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </Router>
    </StoreContextProvider>
  );
}

export default App;
