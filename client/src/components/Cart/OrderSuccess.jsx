import React from "react";
import Lottie from "lottie-react";
import riderAnimation from "../../assets/rider-animation.json";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { generatePDFReceipt } from "../../components/utils/generatePDFReceipt"; // adjust the path as needed

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  const handleDownloadReceipt = () => {
    if (!orderDetails) {
      alert("No order details found.");
      return;
    }
    generatePDFReceipt(orderDetails);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-white px-4 py-8 text-center">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={400}
        recycle={false}
      />

      <div className="max-w-md w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-4">
          Your Order Has Been Placed Successfully!
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
          We're packing your order! <br className="hidden sm:block" />
          Our team will get back to you sooner...
        </p>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-8">
          <Lottie animationData={riderAnimation} loop autoplay />
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => navigate("/store")}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-xl w-full sm:w-auto"
          >
            Back to Store
          </button>

          <button
            onClick={handleDownloadReceipt}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl w-full sm:w-auto"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
