// src/components/PopupOffer.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopupOffer = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleBuyNow = () => navigate("/payment-form");

  useEffect(() => {
    // Optional: Add logic to show this only once per session or daily using localStorage/sessionStorage
    // sessionStorage.setItem("hasSeenPopup", true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg text-center relative">
        <button
          className="absolute top-2 right-3 text-gray-600 text-xl"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-brown mb-3">
          🎉 Exclusive Offer!
        </h2>
        <p className="text-sm text-gray-700 mb-5">
          Get a special discount on our premium coffee bundle. Limited time
          only!
        </p>
        <button
          className="bg-brownn hover:bg-[#5d4037] text-white px-4 py-2 rounded transition"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PopupOffer;
