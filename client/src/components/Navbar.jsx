import React, { useState, useEffect } from "react";
import { Coffee, ShoppingCart, Crown } from "lucide-react";
import { Cart } from "./Cart/Cart.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Navbar() {
  const { cartItems, products } = useStore(); // Assumes you have products array in context
  const [scrolled, setScrolled] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  const closeNotification = () => setIsNotificationVisible(false);
  const toggleCart = () => setIsCartVisible(!isCartVisible);
  const closeCart = () => setIsCartVisible(false);

  const handleNavClick = (link) => {
    setActiveSection(link.toLowerCase().replace(" ", ""));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!Array.isArray(products) || searchInput.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = products.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchResults(results);
  }, [searchInput, products]);

  return (
    <>
      {/* Header Wrapper to control both notification + navbar */}
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        {/* Notification Bar */}
        {isNotificationVisible && (
          <div className="bg-[#E4C16F] py-4 px-4 text-center text-brownn">
            <div className="relative flex items-center justify-center">
              <span className="text-sm mx-auto">
                Special offer: Get 10% off your first purchase with code
                WELCOME10!
              </span>
              <button
                onClick={closeNotification}
                className="absolute right-0 text-lg font-semibold px-4"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Navbar */}
        <nav
          className={`transition-all duration-300 ${
            isNotificationVisible ? "top-0" : "top-0"
          } ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
        >
          <div
            className={`max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col items-center transition-all duration-300 text-brownn`}
          >
            {/* Top section */}
            <div className="flex items-center justify-between w-full h-16">
              {/* Search Bar */}
              <div className="w-1/3 flex items-center">
                <div className="relative w-full max-w-[200px]">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-black">
                    <FaSearch className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search coffee or tea..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-8 pr-2 py-1 text-sm bg-transparent border-b border-black focus:border-bluee focus:outline-none focus:ring-0 w-full transition-all placeholder:text-black"
                  />
                </div>
              </div>

              {/* Logo */}
              <NavLink to={"/"}>
                <div className="flex items-center">
                  {/* <Coffee className="h-7 w-7 text-brownn" /> */}
                  <Crown />
                  <span className="ml-2 text-lg font-semibold">
                    Jewel Himalayan Products
                  </span>
                </div>
              </NavLink>

              {/* Cart Button */}
              <div className="w-1/3 flex justify-end">
                <button
                  className="p-2 rounded-full transition"
                  onClick={toggleCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {Object.keys(cartItems || {}).length > 0 && (
                    <span className="ml-1 text-sm font-bold">
                      ({Object.keys(cartItems).length})
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Navigation Links */}

            <div className="flex items-center space-x-28 text-sm my-4">
              <NavLink
                to="/"
                onClick={() => setActiveSection("home")}
                className={`relative group transition-colors ${
                  activeSection === "home" ? "text-bluee" : ""
                }`}
              >
                Home
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-black" : "bg-bluee"
                  } ${activeSection === "home" ? "w-full" : ""}`}
                ></span>
              </NavLink>

              <NavLink
                to="/store"
                onClick={() => setActiveSection("products")}
                className={`relative group transition-colors ${
                  activeSection === "products" ? "text-bluee" : ""
                }`}
              >
                JHP Store
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-black" : "bg-bluee"
                  } ${activeSection === "products" ? "w-full" : ""}`}
                ></span>
              </NavLink>

              <NavLink
                to="/JHP"
                onClick={() => setActiveSection("ourstory")}
                className={`relative group transition-colors ${
                  activeSection === "ourstory" ? "text-bluee" : ""
                }`}
              >
                JHP
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-black" : "bg-bluee"
                  } ${activeSection === "ourstory" ? "w-full" : ""}`}
                ></span>
              </NavLink>

              <NavLink
                to="/JHCB"
                onClick={() => setActiveSection("people")}
                className={`relative group transition-colors ${
                  activeSection === "people" ? "text-bluee" : ""
                }`}
              >
                JHCB
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-black" : "bg-bluee"
                  } ${activeSection === "people" ? "w-full" : ""}`}
                ></span>
              </NavLink>

              <NavLink
                to="/inaya"
                onClick={() => setActiveSection("vlogs")}
                className={`relative group transition-colors ${
                  activeSection === "vlogs" ? "text-bluee" : ""
                }`}
              >
                iNaya Cafe
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-black" : "bg-bluee"
                  } ${activeSection === "vlogs" ? "w-full" : ""}`}
                ></span>
              </NavLink>

              <NavLink
                to="/#contact"
                onClick={() => setActiveSection("contact")}
                className={`relative group transition-colors ${
                  activeSection === "contact" ? "text-bluee" : ""
                }`}
              >
                Contact
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-black" : "bg-bluee"
                  } ${activeSection === "contact" ? "w-full" : ""}`}
                ></span>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

      {/* Search Results Dropdown */}
      {searchResults.length > 0 && (
        <div className="absolute top-24 left-6 bg-white shadow-lg border rounded-md p-4 w-[250px] z-50">
          <ul className="space-y-2 text-sm">
            {searchResults.map((item) => (
              <li
                key={item.id}
                className="hover:text-bluee cursor-pointer"
                onClick={() => {
                  // Optionally do something when clicked (e.g. navigate or scroll)
                  setSearchInput(""); // Clear input
                  setSearchResults([]);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cart Component */}
      <Cart isCartVisible={isCartVisible} closeCart={closeCart} />
    </>
  );
}
