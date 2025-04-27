import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import axios from "axios";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  const decoded = base64Decode(token);

  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/payment-status",
        {
          product_id: decoded.transaction_uuid,
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);

  // eSewa Green
  const primaryGreen = "#6ABF4B";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gray-50">
      {isLoading && !isSuccess && (
        <div className="text-gray-600 text-lg">Verifying your payment...</div>
      )}

      {!isLoading && isSuccess && (
        <div className="bg-white rounded-xl p-8 shadow-md max-w-md w-full">
          <FaCheckCircle
            size={48}
            color={primaryGreen}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Payment Successful
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your transaction has been confirmed
            successfully.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#6ABF4B] text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
          >
            Go to Homepage
          </button>
        </div>
      )}

      {!isLoading && !isSuccess && (
        <div className="bg-white rounded-xl p-8 shadow-md max-w-md w-full">
          <FaExclamationCircle
            size={48}
            color="#DC2626"
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            Payment Verification Failed
          </h1>
          <p className="text-gray-600 mb-6">
            Oops! Something went wrong while confirming your payment. We’re
            working on it.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-black transition"
          >
            Go to Homepage
          </button>
        </div>
      )}
    </div>
  );
};

export default Success;
