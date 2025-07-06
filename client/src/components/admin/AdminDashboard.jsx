import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://jhp-backend.onrender.com/api/admin/orders"
      );
      setOrders(response.data);
      setLastRefreshed(new Date());
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Optionally auto-refresh every 60 seconds:
    const interval = setInterval(fetchOrders, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaBoxOpen className="text-blue-600" /> Admin Dashboard
        </h1>
        <button
          onClick={fetchOrders}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          <FaSyncAlt className="animate-spin mr-1" />
          Refresh Orders
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center py-20 text-gray-500">No orders found.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Payment</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Items</th>
                <th className="px-4 py-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-semibold">
                    {order._id.slice(-6)}
                  </td>
                  <td className="px-4 py-4">
                    {order.firstName} {order.lastName}
                  </td>
                  <td className="px-4 py-4">
                    <p>{order.phone}</p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </td>
                  <td className="px-4 py-4 flex items-center gap-2">
                    {order.paymentMethod}
                    {order.paymentMethod.toLowerCase() === "cash" ? (
                      <FaClock
                        className="text-yellow-500"
                        title="Pending Payment"
                      />
                    ) : (
                      <FaCheckCircle className="text-green-600" title="Paid" />
                    )}
                  </td>
                  <td className="px-4 py-4 font-semibold">
                    NRs.{" "}
                    {parseFloat(order.discountedTotal || order.total).toFixed(
                      2
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <ul className="list-disc ml-5 space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} × {item.quantity} ({item.selectedSize}g)
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="text-sm text-gray-500 mt-6 text-center">
        Last refreshed:{" "}
        {lastRefreshed ? lastRefreshed.toLocaleTimeString() : "Never"}
      </div>
    </div>
  );
};

export default AdminDashboard;
