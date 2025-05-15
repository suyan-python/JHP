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
    <>
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        {/* Notification Bar */}
        {isNotificationVisible && (
          <div className="bg-[#E4C16F] py-2 md:py-3 px-4 text-center text-brownn text-sm md:text-base font-medium">
            <div className="relative flex items-center justify-center max-w-6xl mx-auto">
              <span className="mx-auto leading-tight">
                Pay now!{" "}
                <strong className="font-bold">Get Free Delivery</strong>
              </span>
              <button
                onClick={closeNotification}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl font-bold text-brownn hover:text-red-600 transition-colors"
                aria-label="Close notification"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Navbar */}
        <nav
          className={`transition-all duration-300 ${
            scrolled ? "bg-white shadow-md" : "bg-transparent"
          }`}
        >
          <div className="header max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 text-brownn font-bold">
            <div className="relative flex items-center h-28">
              {/* Browse Dropdown - Desktop Only */}
              <div className="hidden sm:block relative group z-10">
                <button className="text-sm font-medium text-brownn hover:text-bluee transition-colors">
                  Browse
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300">
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

              {/* Logo Center */}
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-4">
                <NavLink to="/" className="">
                  <img
                    src={JHPstore}
                    alt="JHP Store"
                    className="h-40 sm:h-40 md:h-48 lg:h-48 xl:h-48 w-auto"
                  />
                </NavLink>
              </div>

              {/* Cart + Hamburger - Right */}
              <div className="ml-auto flex items-center gap-4 z-10">
                <NavLink to="/cart" className="relative p-2 rounded-full">
                  <ShoppingCart className="h-5 w-5" />
                  {Object.keys(cartItems || {}).length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-bluee text-white rounded-full text-xs px-1">
                      {Object.keys(cartItems).length}
                    </span>
                  )}
                </NavLink>

                <button className="sm:hidden" onClick={toggleMobileMenu}>
                  {mobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden sm:flex justify-center space-x-44 py-2 text-sm">
              {navLinks.map(({ to, label, id }) => (
                <NavLink
                  key={id}
                  to={to}
                  className={`relative group transition-colors ${
                    activeSection === id ? "text-bluee font-semibold" : ""
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
              <div className="sm:hidden mt-4 space-y-4 text-sm bg-white text-black shadow-md rounded-md px-4 py-4 z-40 relative">
                {navLinks.map(({ to, label, id }) => (
                  <NavLink
                    key={id}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block transition-colors ${
                      activeSection === id ? "text-bluee font-semibold" : ""
                    }`}
                  >
                    {label}
                  </NavLink>
                ))}

                {/* Mobile Browse */}
                <div className="mt-2 space-y-2 text-sm">
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
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
