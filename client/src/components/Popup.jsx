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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
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
            className="absolute top-4 right-4 bg-gray-200 rounded-full p-2.5 hover:bg-gray-300 transition"
            aria-label="Close"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2 2 13M2 2l11 11"
                stroke="#1F2937"
                strokeOpacity=".7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-brownn">Don’t miss out</span> on our
            discounted products.
          </h1>
          <p className="mt-4 text-gray-500 text-sm md:text-base">
            Don't miss out on amazing discounts—shop now before they're gone!
          </p>
          <button
            onClick={handleCheckOut}
            className="rounded-lg bg-brownn text-sm px-8 py-3 mt-4 text-white hover:bg-soft hover:text-brownn transition"
          >
            Check out the products
          </button>
          <button
            onClick={closePopup}
            className="px-6 py-2 mt-4 text-sm text-gray-800 hover:underline"
          >
            No thanks, I don’t want the discounts.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
