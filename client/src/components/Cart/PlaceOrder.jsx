import { useState } from "react";
import { FaTruck } from "react-icons/fa";
import PaymentComponent from "../esewa/Payment";

const PlaceOrder = ({ cartTotal }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Placing Order:", formData);
    // handle order logic here
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto my-32">
      {/* Total Section */}
      <div className="text-left text-xs  text-gray-700">
        Total (Tax included):
      </div>
      <div className="text-2xl">NRs. {cartTotal}</div>
      <hr className="my-4" />

      {/* Payment Section */}
      <p className="text-gray-700 mb-2 font-semibold">
        Payment for bill of NRs. {cartTotal}
      </p>

      <p className="text-sm font-semibold text-gray-600 mb-1">
        On Delivery Payment Options:
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {paymentMethods.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => setFormData({ ...formData, paymentMethod: method })}
            className={`px-4 py-1 border rounded-md text-sm font-medium ${
              formData.paymentMethod === method
                ? "bg-bluee text-white"
                : "border-bluee text-bluee"
            }`}
          >
            {method}
          </button>
        ))}
      </div>

      {/* Online Payment Visual */}
      <div>
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-1">
            Online Payment Options:
          </p>
        </div>
        <div>
          <PaymentComponent />
        </div>
      </div>

      {/* Delivery Info Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-gray-600">
          Please fill up the following information so that we can call you for
          your delivery information.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          required
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        <div className="flex items-center gap-2">
          <label className="font-semibold text-sm text-gray-600">
            Delivery Time:
          </label>
          <input
            type="datetime-local"
            name="deliveryTime"
            required
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
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
          className="w-full bg-bluee hover:bg-blue-800 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 text-lg"
        >
          <FaTruck />
          Place Order
        </button>

        <p className="text-center text-gray-500 text-sm">Free Delivery</p>
      </form>
    </div>
  );
};

export default PlaceOrder;
