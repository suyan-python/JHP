import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import drip from "../assets/prodc/drip2.JPG";

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  const handleCheckOut = () => {
    closePopup();
    navigate("/store/3");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md md:max-w-3xl rounded-3xl shadow-2xl overflow-hidden bg-white/20 backdrop-blur-2xl border border-white/20 flex flex-col md:flex-row">
        {/* Image */}
        <div className="w-full md:w-1/2 h-48 md:h-auto relative flex-shrink-0">
          <img
            src={drip}
            alt="Promotional"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center p-5 md:p-8 text-center flex-1">
          <button
            onClick={closePopup}
            className="hidden md:block absolute top-4 right-4 bg-white/30 backdrop-blur-md rounded-full p-2.5 hover:bg-white/50 transition"
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L2 13M2 2l11 11"
                stroke="#1F2937"
                strokeOpacity=".7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg leading-tight">
            <span className="text-white/80">Don’t miss out</span> on our
            exclusive discounts
          </h1>
          <p className="mt-3 md:mt-4 text-white/70 text-sm md:text-lg max-w-xs md:max-w-md">
            Get amazing deals—shop now before they're gone!
          </p>
          <button
            onClick={handleCheckOut}
            className="rounded-full bg-white/30 backdrop-blur-md text-white font-semibold text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 mt-5 hover:bg-white/50 hover:text-black transition-all duration-300 shadow"
          >
            Check out the products
          </button>
          <button
            onClick={closePopup}
            className="px-5 py-2 mt-3 text-xs md:text-sm text-white/80 hover:underline"
          >
            No thanks, I don’t want the discounts.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
