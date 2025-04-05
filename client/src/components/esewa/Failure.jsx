import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <FaExclamationTriangle
          size={48}
          color="#DC2626"
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-red-600 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          There was an issue with your payment. Please try again later or
          contact support if the issue persists.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-black transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Failure;
