import { useState, useEffect } from "react";
import { FaTruck } from "react-icons/fa";
import PaymentComponent from "../esewa/Payment";
import { useStore } from "../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import { generatePDFReceipt } from "../utils/generatePDFReceipt";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalPrice, cartItems, clearCart } = useStore();
  const initialTotal = getTotalPrice(); // Get the initial total from the StoreContext

  const [finalTotal, setFinalTotal] = useState(initialTotal);
  const [hasPromo, setHasPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [onlinePaymentOption, setOnlinePaymentOption] = useState("");

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

    // Gather form data from state (since you're using controlled components)
    const orderDetails = {
      firstName: formData.firstName, // Accessing formData state
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      deliveryTime: formData.deliveryTime,
      subscribe: formData.subscribe,
      paymentMethod: formData.paymentMethod,
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
          } = item;

          // Ensure that name and price are included in the item object
          if (!name || !price) {
            console.error(`Missing name or price for item: ${item.id}`);
            return null; // Or handle this error as per your requirements
          }

          const size = selectedSize || 250;

          const pricePerUnit =
            type === "washed process" ? pricesBySize?.[size] || price : price;

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
          };
        })
        .filter(Boolean), // Remove null values if any items are missing required fields
    };

    // Ensure items have the required fields before sending
    if (orderDetails.items.length === 0) {
      toast.error("No valid items to submit");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) throw new Error("Failed to place order");

      toast.success("Order placed and saved to database!");
      try {
        console.log("Generating PDF with:", orderDetails);
        generatePDFReceipt(orderDetails);
      } catch (err) {
        console.error("PDF generation failed:", err);
        toast.error("Failed to generate PDF receipt.");
      }

      // Clear form and cart
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
      setOnlinePaymentOption("");
      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Try again.");
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
    <div className="bg-white rounded-xl shadow-lg max-w-md mx-auto my-44 p-6 md:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold text-red-600">
          Total (Tax included):
        </p>
        <h2 className="text-3xl font-extrabold text-blue-600 mt-1">
          NRs. {finalTotal ? parseFloat(finalTotal).toFixed(2) : "0.00"}
        </h2>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Payment selection */}
      <section className="mb-8">
        <p className="text-gray-700 font-semibold mb-2">
          Payment for bill of NRs.{" "}
          {finalTotal ? parseFloat(finalTotal).toFixed(2) : "0.00"}
        </p>
        <p className="text-gray-500 font-medium mb-3">
          On Delivery Payment Options:
        </p>
        <div className="flex flex-wrap gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, paymentMethod: method }))
              }
              className={`px-5 py-2 rounded-md font-semibold text-sm transition-colors 
            ${
              formData.paymentMethod === method
                ? "bg-blue-600 text-white shadow-md"
                : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
            >
              {method}
            </button>
          ))}
        </div>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <p className="text-gray-600 text-sm mb-4">
          Please fill in your details so we can call you for delivery
          confirmation.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center gap-3">
          <label className="font-medium text-gray-600 text-sm">
            Delivery Time:
          </label>
          <input
            type="datetime-local"
            name="deliveryTime"
            required
            value={formData.deliveryTime}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Promo Section */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasPromo}
              onChange={() => setHasPromo(!hasPromo)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
            I have a promo code
          </label>

          {hasPromo && (
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Enter Promo Code"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={applyPromo}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
            className="w-5 h-5 accent-blue-600 cursor-pointer"
          />
          Keep me up to date on news and exclusive offers.
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-3 text-lg transition"
        >
          <FaTruck size={20} />
          Place Order
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default PlaceOrder;
