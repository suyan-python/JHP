import { useState, useEffect } from "react";
import { FaTruck } from "react-icons/fa";
import { useStore } from "../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalPrice, cartItems, clearCart } = useStore();
  const initialTotal = getTotalPrice();

  const [finalTotal, setFinalTotal] = useState(initialTotal);
  const [hasPromo, setHasPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    deliveryTime: "",
    subscribe: false,
    paymentMethod: "Cash",
  });

  const navigate = useNavigate();

  const paymentMethods = [
    "Cash",
    "eSewa",
    "Khalti",
    "IMEPay",
    "Fonepay",
    "NepalPay",
    "Bank Transfer",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      ...formData,
      total: initialTotal,
      discountedTotal: finalTotal,
      shipping: 100,
      items: Object.entries(cartItems)
        .map(([key, item]) => {
          const {
            id,
            name,
            quantity,
            selectedSize,
            image,
            type,
            pricesBySize,
            price,
            shipping,
            process,
          } = item;

          if (!name || !price) return null;
          const size = selectedSize || 250;
          const pricePerUnit =
            type === "filter roasted" ? pricesBySize?.[size] || price : price;
          const totalPrice = (pricePerUnit * quantity).toFixed(2);

          return {
            itemId: id,
            name,
            quantity,
            selectedSize: size,
            price: pricePerUnit,
            totalPrice,
            image,
            shipping: shipping,
            process,
          };
        })
        .filter(Boolean),
    };

    if (orderDetails.items.length === 0) {
      toast.error("No valid items to submit");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://jhp-backend.onrender.com/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
        }
      );

      if (!response.ok) throw new Error("Failed to place order");

      toast.success("Order placed success!");

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        deliveryTime: "",
        subscribe: false,
        paymentMethod: "Cash",
      });
      setHasPromo(false);
      setPromoCode("");
      setPromoApplied(false);
      setFinalTotal(0);
      clearCart();
      navigate("/order-success", { state: { orderDetails } });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "FROMWEB" || code === "BINAYAK") {
      const discounted = initialTotal * 0.9;
      setFinalTotal(discounted.toFixed(2));
      setPromoApplied(true);
      toast.success("You've received 10% discount!", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
    } else {
      setFinalTotal(initialTotal);
      setPromoApplied(false);
      toast.error("Invalid promo code", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (!hasPromo) {
      setPromoCode("");
      setPromoApplied(false);
      setFinalTotal(initialTotal);
    }
  }, [hasPromo, initialTotal]);

  return (
    <div className="bg-white rounded-3xl shadow-xl max-w-7xl mx-auto my-28 p-6 sm:p-8 md:p-16 flex flex-col md:flex-row gap-6 md:gap-12 w-full">
      <ToastContainer />

      {/* LEFT: Form */}
      <div className="flex-1 w-full max-w-lg">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-6 sm:mb-8">
          Place Your Order
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            Please fill in your details so we can call you for delivery
            confirmation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 sm:px-5 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 sm:px-5 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 sm:px-5 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 sm:px-5 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          />

          <label className="block text-gray-700 font-medium mb-2">
            Delivery Time:
          </label>
          <input
            type="datetime-local"
            name="deliveryTime"
            required
            value={formData.deliveryTime}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 sm:px-5 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          />

          {/* Promo Section */}
          <div className="mt-6">
            <label className="flex items-center gap-3 text-gray-700 font-semibold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasPromo}
                onChange={() => setHasPromo(!hasPromo)}
                className="w-5 h-5 sm:w-6 sm:h-6 accent-blue-600 cursor-pointer"
              />
              I have a promo code
            </label>

            {hasPromo && (
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter Promo Code"
                  className="flex-grow rounded-xl border border-gray-300 px-4 py-3 sm:px-5 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  className="px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-semibold text-base hover:bg-blue-700 transition"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <label className="flex items-center gap-3 mt-8 text-gray-700 font-semibold cursor-pointer select-none">
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              className="w-5 h-5 sm:w-6 sm:h-6 accent-blue-600 cursor-pointer"
            />
            Keep me up to date on news and exclusive offers.
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-8 ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-extrabold py-4 sm:py-5 rounded-xl flex items-center justify-center gap-4 text-lg sm:text-xl transition`}
          >
            {loading && (
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            )}

            <FaTruck />
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>

      {/* RIGHT: Order summary & Payment */}
      <div className="flex-1 w-full max-w-md bg-gray-50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg flex flex-col justify-between">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
            Order Summary
          </h3>

          <p className="text-gray-600 mb-3 text-base sm:text-lg">
            Total (Tax included):{" "}
            <span className="font-bold text-lg sm:text-xl text-blue-700">
              NRs. {finalTotal ? parseFloat(finalTotal).toFixed(2) : "0.00"}
            </span>
          </p>
          <p className="mb-8 text-yellow-900 bg-yellow-100 font-semibold px-4 py-2 rounded-xl inline-block text-sm sm:text-base">
            + Rs. 100 shipping fee (applied at checkout)
          </p>

          <p className="mb-3 text-gray-700 font-semibold text-base sm:text-lg">
            Payment Options:
          </p>
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, paymentMethod: method }))
                }
                className={`px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl font-semibold text-sm transition-colors ${
                  formData.paymentMethod === method
                    ? "bg-blue-600 text-white shadow-md"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <p className="text-gray-700 text-base sm:text-lg">
            Selected payment method:
            <span className="font-semibold ml-2 text-blue-700">
              {formData.paymentMethod}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
