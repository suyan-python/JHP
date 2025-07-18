import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { Navbar } from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import { Footer } from "./components/Footer.jsx";
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

import AdminLogin from "./components/admin/AdminLogin";
import TermsAndConditions from "./components/TermsAndConditions.jsx";
import PrivacyPolicy from "./components/Policy.jsx";
import CookieConsent from "./components/Consent.jsx";

function AppContent() {
  const location = useLocation();
  const hideNavbarFooter =
    location.pathname === "/order-success" ||
    location.pathname === "/admin9841" ||
    location.pathname === "/admin-login";

  const hidePopup =
    location.pathname === "/admin9841" || location.pathname === "/admin-login";

  return (
    <>
      {!hidePopup && <Popup />}
      <CookieConsent />
      <ScrollToTop />
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        {/* <Route path="/admin9841" element={<AdminDashboard />} /> */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin9841"
          element={
            localStorage.getItem("isAdmin") === "true" ? (
              <AdminDashboard />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route path="/" element={<Hero />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<StoreSection />} />
        <Route path="/store/:id" element={<StoreDetail />} />
        <Route path="/seo" element={<SEOObjective />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
        <ToastContainer />
        <AppContent />
      </Router>
    </StoreContextProvider>
  );
}

export default App;
