import React, { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";
import { NavLink, useLocation } from "react-router-dom";
import JHPstore from "../assets/logo/JHPstore.png";

export function Navbar() {
  const { cartItems } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const location = useLocation();

  const handleScroll = () => setScrolled(window.scrollY > 10);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
    <div className="fixed top-0 left-0 w-full z-20 transition-all duration-500">
      {/* Notification Bar */}
      <div className="w-full py-2.5 font-medium text-xs sm:text-sm text-white text-center bg-gradient-to-r from-[#5A3825] via-[#7A4B35] to-[#A66548] shadow">
        Special Deal: Free Shipping on Orders Above Rs.2500 Purchase
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 transition-all duration-500 z-10 ${
          scrolled
            ? "bg-[#fdfaf6] shadow-md text-[#4b2e1a]"
            : "bg-transparent py-7"
        }`}
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={JHPstore}
            alt="JHP Store"
            className={`${scrolled ? "h-16 p-2" : "h-20 md:h-20 py-4"}`}
          />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 font-semibold text-sm">
          {navLinks.map(({ to, label, id }) => (
            <NavLink
              key={id}
              to={to}
              className={`group relative transition-colors duration-300 ${
                activeSection === id
                  ? "text-[#8B4513]"
                  : scrolled
                  ? "text-[#4b2e1a]"
                  : "text-white"
              } hover:text-[#A66548]`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                  activeSection === id ? "w-full bg-[#A66548]" : "bg-[#A66548]"
                }`}
              ></span>
            </NavLink>
          ))}

          {/* Browse Dropdown */}
          <div className="relative group">
            <button
              className={`text-sm font-semibold transition-colors ${
                scrolled ? "text-[#4b2e1a]" : "text-white"
              } hover:text-[#A66548]`}
            >
              Browse
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-[#fdfaf6] rounded-md shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-40">
              <ul className="py-2 text-sm text-[#4b2e1a]">
                <li>
                  <NavLink
                    to="/store#special-editions"
                    className="block px-4 py-2 hover:bg-[#A66548] hover:text-white rounded"
                  >
                    Special Editions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/store#drip-box"
                    className="block px-4 py-2 hover:bg-[#A66548] hover:text-white rounded"
                  >
                    Drip Box
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/store#washed-process"
                    className="block px-4 py-2 hover:bg-[#A66548] hover:text-white rounded"
                  >
                    Washed Process
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cart Icon for Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/cart" className="relative p-2 rounded-full">
            <ShoppingCart
              className={`h-6 w-6 ${
                scrolled ? "text-[#4b2e1a]" : "text-white"
              }`}
            />
            {Object.keys(cartItems || {}).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#A66548] text-white rounded-full text-xs px-1">
                {Object.keys(cartItems).length}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {mobileMenuOpen ? (
            <X
              onClick={toggleMobileMenu}
              className={`h-6 w-6 cursor-pointer ${
                scrolled ? "text-[#4b2e1a]" : "text-white"
              }`}
            />
          ) : (
            <Menu
              onClick={toggleMobileMenu}
              className={`h-6 w-6 cursor-pointer ${
                scrolled ? "text-[#4b2e1a]" : "text-white"
              }`}
            />
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#fdfaf6] text-base flex flex-col md:hidden items-center justify-center gap-8 font-semibold text-[#4b2e1a] transition-all duration-500 z-50 ${
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
              className={`text-lg transition-colors hover:text-[#A66548] ${
                activeSection === id ? "text-[#A66548]" : ""
              }`}
            >
              {label}
            </NavLink>
          ))}

          <div className="space-y-3 text-base">
            <p className="font-bold text-[#4b2e1a]">Browse</p>
            <NavLink
              to="/store#special-editions"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#4b2e1a] hover:text-[#A66548]"
            >
              Special Editions
            </NavLink>
            <NavLink
              to="/store#drip-box"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#4b2e1a] hover:text-[#A66548]"
            >
              Drip Box
            </NavLink>
            <NavLink
              to="/store#washed-process"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#4b2e1a] hover:text-[#A66548]"
            >
              Washed Process
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Floating Cart Icon for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <NavLink
          to="/cart"
          className="relative bg-[#A66548] shadow-lg hover:scale-105 transition transform"
          aria-label="Cart"
        >
          <ShoppingCart className="w-12 h-12 text-soft bg-brownn p-2 rounded-2xl" />
          {Object.keys(cartItems || {}).length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
              {Object.keys(cartItems).length}
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
}
