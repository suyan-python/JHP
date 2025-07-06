import React, { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";
import { NavLink, useLocation } from "react-router-dom";
import JHPstore from "../assets/logo/JHPstore.png";

export function Navbar() {
  const { cartItems } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const location = useLocation();

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeNotification = () => setIsNotificationVisible(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const pathToIdMap = {
      "/": "home",
      "/store": "store",
      "/parent": "Parent",
    };
    setActiveSection(pathToIdMap[location.pathname] || "");
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "ABOUT", id: "home" },
    { to: "/store", label: "STORE", id: "store" },
    { to: "/parent", label: "COMPANY", id: "Parent" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      {/* Notification Bar */}
      {isNotificationVisible && (
        // <div className="bg-[#E4C16F] py-2 px-4 text-center text-brownn text-sm font-medium">
        //   <div className="relative flex items-center justify-center max-w-6xl mx-auto">
        //     <span className="mx-auto leading-tight">
        //       Get Exclusive offers!{" "}
        //       <strong className="font-bold">From Seeds to Cup</strong>
        //     </span>
        //     {/* <button
        //       onClick={closeNotification}
        //       className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl font-bold text-brownn hover:text-red-600 transition-colors"
        //       aria-label="Close notification"
        //     >
        //       &times;
        //     </button> */}
        //   </div>
        // </div>
        <div class="w-full py-2.5 font-medium text-sm text-white text-center bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
          <p>Special Deal: Free Shipping on Orders Above Rs.1500 Purchase</p>
        </div>
      )}

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-10${
          scrolled
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
            : "bg-transparent py-4 md:py-6 "
        }`}
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={JHPstore} alt="JHP Store" className={`h-24`} />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(({ to, label, id }) => (
            <NavLink
              key={id}
              to={to}
              className={`group flex flex-col gap-0.5 transition-colors ${
                activeSection === id
                  ? "text-bluee font-semibold"
                  : scrolled
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              {label}
              <span
                className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                  scrolled ? "bg-gray-700" : "bg-white"
                } ${activeSection === id ? "w-full" : ""}`}
              ></span>
            </NavLink>
          ))}

          {/* Browse Dropdown */}
          <div className="relative group">
            <button
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-white" : "text-gray-700"
              }`}
            >
              Browse
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-40">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <NavLink
                    to="/store#special-editions"
                    className="block px-4 py-2 hover:bg-bluee hover:text-white"
                  >
                    Special Editions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/store#drip-box"
                    className="block px-4 py-2 hover:bg-bluee hover:text-white"
                  >
                    Drip Box
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/store#washed-process"
                    className="block px-4 py-2 hover:bg-bluee hover:text-white"
                  >
                    Washed Process
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/cart" className="relative p-2 rounded-full">
            <ShoppingCart
              className={`h-6 w-6 ${scrolled ? "text-gray-700" : "text-white"}`}
            />
            {Object.keys(cartItems || {}).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-bluee text-white rounded-full text-xs px-1">
                {Object.keys(cartItems).length}
              </span>
            )}
          </NavLink>

          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all ${
              scrolled
                ? "text-black border-gray-700"
                : "text-white border-white"
            }`}
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {mobileMenuOpen ? (
            <X
              onClick={toggleMobileMenu}
              className={`h-6 w-6 cursor-pointer ${
                scrolled ? "invert" : "text-white"
              }`}
            />
          ) : (
            <Menu
              onClick={toggleMobileMenu}
              className={`h-6 w-6 cursor-pointer ${
                scrolled ? "invert" : "text-white"
              }`}
            />
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 z-50 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          {navLinks.map(({ to, label, id }) => (
            <NavLink
              key={id}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={`transition-colors ${
                activeSection === id ? "text-bluee font-semibold" : ""
              }`}
            >
              {label}
            </NavLink>
          ))}

          <div className="mt-4 space-y-2 text-sm">
            <p className="font-semibold text-gray-800">Browse</p>
            <NavLink
              to="/store#special-editions"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4 text-gray-700 hover:text-bluee"
            >
              Special Editions
            </NavLink>
            <NavLink
              to="/store#drip-box"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4 text-gray-700 hover:text-bluee"
            >
              Drip Box
            </NavLink>
            <NavLink
              to="/store#washed-process"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4 text-gray-700 hover:text-bluee"
            >
              Washed Process
            </NavLink>
          </div>

          <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all text-black border-gray-700">
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}
