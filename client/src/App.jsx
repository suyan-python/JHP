import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { Navbar } from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import { Footer } from "./components/Footer.jsx";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";
import Success from "./components/esewa/Success.jsx";
import Failure from "./components/esewa/Failure.jsx";
import Payment from "./components/esewa/Payment.jsx";
import PlaceOrder from "./components/Cart/PlaceOrder.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Parent from "./components/Parent/Parent.jsx";
import StoreDetail from "./components/FoodDisplay/StoreDetail.jsx";
import { Cart } from "./components/Cart/Cart.jsx";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";
import Popup from "./components/Popup.jsx";
import SEOObjective from "./components/SEO.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import StoreSection from "./components/StoreSection.jsx";

function AppContent() {
  const location = useLocation();
  const hideNavbarFooter =
    location.pathname === "/order-success" ||
    location.pathname === "/admin9841";

  return (
    <>
      {/* <Popup /> */}
      <ScrollToTop />
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/admin9841" element={<AdminDashboard />} />
        <Route path="/" element={<Hero />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<StoreSection />} />
        <Route path="/store/:id" element={<StoreDetail />} />
        <Route path="/seo" element={<SEOObjective />} />

        <Route path="/parent" element={<Parent />} />
        <Route path="/payment" element={<PlaceOrder />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-failure" element={<Failure />} />
        <Route path="/payment-form" element={<Payment />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <StoreContextProvider>
      <Router>
        <AppContent />
      </Router>
    </StoreContextProvider>
  );
}

export default App;
