import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateAdmin } from "../../utils/adminAuth";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [adminID, setAdminID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateAdmin(adminID, password)) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin9841");
      toast.success("Welcome Admin");
    } else {
      console.log("Wrong credentials");
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-sm w-full border border-gray-200">
        {/* Optional: Branding / Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-700">
            Admin Portal
          </h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to manage orders</p>
        </div>

        <form onSubmit={handleLogin}>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Admin ID
          </label>
          <input
            type="text"
            placeholder="Enter your admin ID"
            value={adminID}
            onChange={(e) => setAdminID(e.target.value)}
            className="w-full mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
            required
          />

          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Optional: footer note */}
        <div className="text-center text-xs font-semibold text-red-500 mt-6">
          For authorized use only
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
