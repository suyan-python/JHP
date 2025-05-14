import Lottie from "lottie-react";
import riderAnimation from "../../assets/rider-animation.json";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-white px-4 py-8 text-center">
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

        <button
          onClick={() => navigate("/store")}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-xl w-full sm:w-auto"
        >
          Back to Store
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
