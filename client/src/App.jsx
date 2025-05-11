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
import JHCB from "./components/JHCB/JHCB.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Inaya from "./components/iNaya/Inaya.jsx";
import Parent from "./components/Parent/Parent.jsx";
import StoreDetail from "./components/FoodDisplay/StoreDetail.jsx";
import { Cart } from "./components/Cart/Cart.jsx";

function App() {
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <StoreContextProvider>
      <Router>
        {/* <PopupOffer /> */}
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/store"
            element={<FoodDisplay addToCart={addToCart} />}
          />
          <Route path="/store/:id" element={<StoreDetail />} />

          {/* <Route path="/JHP" element={<JHP />} />
          <Route path="/JHCB" element={<JHCB />} />
          <Route path="/inaya" element={<Inaya />} /> */}

          <Route path="/parent" element={<Parent />} />

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
