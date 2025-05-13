import { useState, useEffect } from "react";
import { FaTruck } from "react-icons/fa";
import PaymentComponent from "../esewa/Payment";
import { useStore } from "../../context/StoreContext";
import Esewa from "../../assets/esewa.jpg";
import { ToastContainer, toast } from "react-toastify";
import { generatePDFReceipt } from "../utils/generatePDFReceipt";
import "react-toastify/dist/ReactToastify.css";

const PlaceOrder = () => {
  const { getTotalPrice, cartItems } = useStore();
  const initialTotal = getTotalPrice();

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

  const paymentMethods = ["Cash", "Khalti", "IMEPay", "Fonepay", "NepalPay"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const orderDetails = {
  //     ...formData,
  //     items: cartItems, // assume you get this from context
  //     total: initialTotal,
  //     discountedTotal: finalTotal,
  //   };

  //   try {
  //     // const response = await fetch("/api/orders", {
  //     //   method: "POST",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify(orderDetails),
  //     // });

  //     // if (!response.ok) throw new Error("Failed to place order");

  //     toast.success("Order placed and saved to database!");

  //     // Generate PDF after successful order
  //     generatePDFReceipt(orderDetails);

  //     // Reset form
  //     setFormData({
  //       firstName: "",
  //       lastName: "",
  //       phone: "",
  //       email: "",
  //       deliveryTime: "",
  //       subscribe: false,
  //       paymentMethod: "Cash",
  //     });
  //     setHasPromo(false);
  //     setPromoCode("");
  //     setPromoApplied(false);
  //     setFinalTotal(initialTotal);
  //     setOnlinePaymentOption("");
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     toast.error("Something went wrong. Try again.");
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const orderDetails = {
  //     ...formData,
  //     items: Array.isArray(cartItems) ? cartItems : [], // ensure it's an array
  //     total: initialTotal,
  //     discountedTotal: finalTotal,
  //   };

  //   try {
  //     generatePDFReceipt(orderDetails);
  //     toast.success("Order placed successfully! Receipt downloaded.");
  //     setFormData({
  //       firstName: "",
  //       lastName: "",
  //       phone: "",
  //       email: "",
  //       deliveryTime: "",
  //       paymentMethod: "",
  //     });
  //     clearCart();
  //   } catch (error) {
  //     console.error("Error generating receipt:", error);
  //     toast.error("Something went wrong. Try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      ...formData,
      items: Object.entries(cartItems).map(([id, data]) => ({
        itemId: parseInt(id),
        quantity: data.quantity,
        selectedSize: data.selectedSize,
      })),
      total: initialTotal,
      discountedTotal: finalTotal,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) throw new Error("Failed to place order");

      toast.success("Order placed and saved to database!");
      generatePDFReceipt(orderDetails);

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
      setFinalTotal(initialTotal);
      setOnlinePaymentOption("");
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "FROMWEB") {
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
    <div className="form bg-white p-4 md:px-6 md:py-5 rounded-lg shadow-xl max-w-md mx-auto my-40">
      <div className="text-left text-sm text-gray-700 font-medium">
        Total (Tax included):
      </div>
      <div className="text-2xl font-bold text-bluee mb-4">
        NRs. {finalTotal ? parseFloat(finalTotal).toFixed(2) : "0.00"}
      </div>

      <hr className="my-4" />

      {/* Payment Selection */}
      <div>
        <p className="text-gray-700 mb-1 font-semibold">
          Payment for bill of NRs.{" "}
          {finalTotal ? parseFloat(finalTotal).toFixed(2) : "0.00"}
        </p>

        <p className="text-sm font-semibold text-gray-600 mb-2">
          On Delivery Payment Options:
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {paymentMethods.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, paymentMethod: method }))
              }
              className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors ${
                formData.paymentMethod === method
                  ? "bg-bluee text-white"
                  : "border-bluee text-bluee hover:bg-bluee hover:text-white"
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>
      {/* <p className="text-center text-red-500 text-sm mt-3 font-semibold">
        *Pay now for Free Delivery*
      </p> */}

      {/* Online Payment Visuals */}
      {/* <div className="mb-6 mt-2">
        <p className="text-sm font-semibold text-gray-600 mb-2">
          Online Payment Options:
        </p>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setOnlinePaymentOption("esewa")}
            className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors ${
              onlinePaymentOption === "esewa"
                ? "bg-bluee text-white"
                : "border-bluee text-bluee hover:bg-bluee hover:text-white"
            }`}
          >
            Pay via eSewa
          </button>
          <button
            type="button"
            onClick={() => setOnlinePaymentOption("qr")}
            className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors ${
              onlinePaymentOption === "qr"
                ? "bg-bluee text-white"
                : "border-bluee text-bluee hover:bg-bluee hover:text-white"
            }`}
          >
            Show QR Code
          </button>
        </div>

        {onlinePaymentOption === "esewa" && (
          <div className="border p-3 rounded-md shadow">
            <PaymentComponent />
          </div>
        )}

        {onlinePaymentOption === "qr" && (
          <div className="flex flex-col items-center border p-4 rounded-md shadow">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Scan to Pay (QR Code linked to 9843822887)
            </p>
            <img src={Esewa} alt="QR Code" className="w-40 h-40" />
          </div>
        )}
      </div> */}

      {/* Delivery Info */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-gray-600">
          Please fill in your details so we can call you for delivery
          confirmation.
        </p>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />

        <div className="flex items-center gap-2">
          <label className="font-medium text-sm text-gray-600">
            Delivery Time:
          </label>
          <input
            type="datetime-local"
            name="deliveryTime"
            required
            value={formData.deliveryTime}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* Promo Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="radio"
              checked={hasPromo}
              onChange={() => setHasPromo(!hasPromo)}
            />
            I have a promo code
          </label>

          {hasPromo && (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter Promo Code"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="px-3 py-2 bg-bluee text-white rounded-md font-semibold text-sm hover:bg-blue-800 transition"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
          />
          Keep me up to date on news and exclusive offers.
        </label>

        <button
          type="submit"
          className="w-full bg-bluee hover:bg-blue-800 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 text-lg transition-all"
        >
          <FaTruck />
          Place Order
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default PlaceOrder;
