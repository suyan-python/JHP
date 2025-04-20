import React, { useState, useEffect } from "react";
import { Coffee, ShoppingCart, Crown, Menu, X } from "lucide-react";
import { Cart } from "./Cart/Cart.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Navbar() {
  const { cartItems, products } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeNotification = () => setIsNotificationVisible(false);
  const toggleCart = () => setIsCartVisible(!isCartVisible);
  const closeCart = () => setIsCartVisible(false);

  const handleNavClick = (link) => {
    setActiveSection(link.toLowerCase().replace(" ", ""));
    setMobileMenuOpen(false); // Close mobile menu on nav click
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

  const navLinks = [
    { to: "/", label: "Home", id: "home" },
    { to: "/store", label: "JHP Store", id: "products" },
    { to: "/JHP", label: "JHP", id: "ourstory" },
    { to: "/JHCB", label: "JHCB", id: "people" },
    { to: "/inaya", label: "iNaya Cafe", id: "vlogs" },
    { to: "/#contact", label: "Contact", id: "contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        {/* Notification Bar */}
        {isNotificationVisible && (
          <div className="bg-[#E4C16F] py-3 text-center text-brownn text-sm px-4">
            <div className="relative flex items-center justify-center">
              <span className="mx-auto">
                Special offer: Get 10% off your first purchase with code
                <strong> WELCOME10</strong>!
              </span>
              <button
                onClick={closeNotification}
                className="absolute right-0 text-lg font-bold px-4"
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
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 text-brownn">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <NavLink to="/" className="flex items-center space-x-2">
                <Crown />
                <span className="text-lg font-semibold whitespace-nowrap">
                  Jewel Himalayan Products
                </span>
              </NavLink>

              {/* Search */}
              <div className="hidden sm:flex items-center w-full max-w-[200px] relative">
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-black w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search coffee or tea..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-8 pr-2 py-1 text-sm bg-transparent border-b border-black focus:border-bluee focus:outline-none focus:ring-0 w-full placeholder:text-black"
                />
              </div>

              {/* Cart + Hamburger */}
              <div className="flex items-center gap-4">
                <button
                  className="relative p-2 rounded-full"
                  onClick={toggleCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {Object.keys(cartItems || {}).length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-bluee text-white rounded-full text-xs px-1">
                      {Object.keys(cartItems).length}
                    </span>
                  )}
                </button>

                {/* Hamburger for mobile */}
                <button className="sm:hidden" onClick={toggleMobileMenu}>
                  {mobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden sm:flex justify-center space-x-12 py-2 text-sm">
              {navLinks.map(({ to, label, id }) => (
                <NavLink
                  key={id}
                  to={to}
                  onClick={() => handleNavClick(label)}
                  className={`relative group transition-colors ${
                    activeSection === id ? "text-bluee" : ""
                  }`}
                >
                  {label}
                  <span
                    className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                      scrolled ? "bg-black" : "bg-bluee"
                    } ${activeSection === id ? "w-full" : ""}`}
                  ></span>
                </NavLink>
              ))}
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
              <div className="sm:hidden mt-4 space-y-4 text-sm">
                {navLinks.map(({ to, label, id }) => (
                  <NavLink
                    key={id}
                    to={to}
                    onClick={() => handleNavClick(label)}
                    className={`block transition-colors ${
                      activeSection === id ? "text-bluee font-semibold" : ""
                    }`}
                  >
                    {label}
                  </NavLink>
                ))}

                {/* Mobile Search */}
                <div className="flex items-center w-full max-w-[200px] relative mt-2">
                  <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-black w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search coffee or tea..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-8 pr-2 py-1 text-sm bg-transparent border-b border-black focus:border-bluee focus:outline-none focus:ring-0 w-full placeholder:text-black"
                  />
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Search Dropdown */}
      {searchResults.length > 0 && (
        <div className="absolute top-24 left-6 bg-white shadow-lg border rounded-md p-4 w-[250px] z-50">
          <ul className="space-y-2 text-sm">
            {searchResults.map((item) => (
              <li
                key={item.id}
                className="hover:text-bluee cursor-pointer"
                onClick={() => {
                  setSearchInput("");
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
