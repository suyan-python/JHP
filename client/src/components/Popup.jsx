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
      <div className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row bg-white/20 backdrop-blur-2xl border border-white/20">
        {/* Image visible on all devices */}
        <img
          src={drip}
          alt="promotional"
          className="w-full md:w-1/2 object-cover"
        />

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center p-6 md:px-10 text-center flex-1">
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 bg-white/30 backdrop-blur-md rounded-full p-2.5 hover:bg-white/50 transition"
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
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
            <span className="text-white/80">Don’t miss out</span> on our
            exclusive discounts
          </h1>
          <p className="mt-4 text-white/70 text-base md:text-lg max-w-md">
            Get amazing deals—shop now before they're gone!
          </p>
          <button
            onClick={handleCheckOut}
            className="rounded-full bg-white/30 backdrop-blur-md text-white font-semibold text-sm px-8 py-3 mt-6 hover:bg-white/50 hover:text-black transition-all duration-300 shadow"
          >
            Check out the products
          </button>
          <button
            onClick={closePopup}
            className="px-6 py-2 mt-4 text-sm text-white/80 hover:underline"
          >
            No thanks, I don’t want the discounts.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
