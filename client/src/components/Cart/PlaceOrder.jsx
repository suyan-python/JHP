import { useState } from "react";
import { FaTruck } from "react-icons/fa";
import PaymentComponent from "../esewa/Payment";
import { useStore } from "../../context/StoreContext";
import Esewa from "../../assets/esewa.jpg";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlaceOrder = ({ cartTotal = 0 }) => {
  const { getTotalPrice } = useStore();
  const totalAmount = getTotalPrice();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    deliveryTime: "",
    subscribe: false,
    paymentMethod: "Cash",
    location: "",
  });

  const [marker, setMarker] = useState({
    lat: 27.7172,
    lng: 85.324,
  });

  const [onlinePaymentOption, setOnlinePaymentOption] = useState("");
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

    const orderDetails = {
      ...formData,
      location: {
        latitude: marker.lat,
        longitude: marker.lng,
      },
    };

    console.log("Placing Order:", orderDetails);

    toast.success("🎉 Order placed successfully!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

    // Optionally reset form
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      deliveryTime: "",
      subscribe: false,
      paymentMethod: "Cash",
      location: "",
    });
  };

  return (
    <div className="bg-white p-4 md:px-6 md:py-5 rounded-lg shadow-xl max-w-md mx-auto my-28">
      <div className="text-left text-sm text-gray-700 font-medium">
        Total (Tax included):
      </div>
      <div className="text-2xl font-bold text-bluee mb-4">
        NRs. {totalAmount ? parseFloat(totalAmount).toFixed(2) : "0.00"}
      </div>

      <hr className="my-4" />

      {/* Payment Section */}
      <div>
        <p className="text-gray-700 mb-1 font-semibold">
          Payment for bill of NRs.{" "}
          {totalAmount ? parseFloat(totalAmount).toFixed(2) : "0.00"}
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
                setFormData({ ...formData, paymentMethod: method })
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

      {/* Online Payment Visual */}
      <div className="mb-6">
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
      </div>

      {/* Delivery Info Form */}
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

        {/* Location Picker */}
        {isLoaded && (
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Pin Delivery Location:
            </label>
            <div className="h-64 w-full rounded-md overflow-hidden border border-gray-300">
              <GoogleMap
                center={marker}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                onClick={(e) =>
                  setMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  })
                }
              >
                <Marker
                  position={marker}
                  draggable
                  onDragEnd={(e) =>
                    setMarker({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    })
                  }
                />
              </GoogleMap>
            </div>
            <input
              type="text"
              name="location"
              value={`${marker.lat.toFixed(5)}, ${marker.lng.toFixed(5)}`}
              readOnly
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Drag or click to pin your location on the map.
            </p>
          </div>
        )}

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

        <p className="text-center text-gray-500 text-sm mt-3">
          Pay now for Free Delivery
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default PlaceOrder;
