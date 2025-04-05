import React from "react";
import axios from "axios";
import { generateUniqueId } from "esewajs";
import { useStore } from "../../context/StoreContext";

const PaymentComponent = () => {
  const { getTotalPrice } = useStore(); // Get total price from context
  const totalAmount = getTotalPrice(); // Call the function to get price

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4500/initiate-payment",
        {
          amount: totalAmount,
          productId: generateUniqueId(),
        }
      );

      // Redirect user to eSewa payment URL
      // window.location.href = response.data.url;
      window.open(response.data.url, "_blank");
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg border border-green-100">
      <div className="text-center mb-6">
        <img
          src="https://esewa.com.np/common/images/esewa_logo.png"
          alt="eSewa Logo"
          className="h-10 mx-auto"
        />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Secure eSewa Payment
        </h1>
        <p className="text-sm text-gray-500">
          Pay safely with your eSewa wallet
        </p>
      </div>

      <form onSubmit={handlePayment} className="space-y-5">
        {/* Display Total Amount */}
        <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md border border-gray-200">
          <label className="text-base font-medium text-gray-700">
            Total Amount
          </label>
          <span className="text-xl font-bold text-green-600">
            Rs. {totalAmount}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md text-lg shadow-sm transition duration-300"
        >
          Pay with eSewa
        </button>
      </form>

      <p className="text-xs text-center text-gray-400 mt-6">
        You will be redirected to eSewa’s secure payment gateway.
      </p>
    </div>
  );
};

export default PaymentComponent;
