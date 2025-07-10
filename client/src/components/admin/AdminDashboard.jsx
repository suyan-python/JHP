import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaSyncAlt,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";

import logo from "../../assets/logo/JHPstore.png";

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
    const interval = setInterval(fetchOrders, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleCompleted = async (orderId, currentStatus) => {
    try {
      const response = await axios.patch(
        `https://jhp-backend.onrender.com/api/admin/orders/${orderId}/completed`,
        { completed: !currentStatus }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, completed: response.data.completed }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order completion:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(
        `https://jhp-backend.onrender.com/api/admin/orders/${orderId}`
      );

      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Top Branded Navbar */}
      <div className="bg-white shadow-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-3">
            <FaBoxOpen className="text-blue-600" /> Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <FaSyncAlt className="animate-spin text-white" />
            Refresh
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              window.location.href = "/";
            }}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-black transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 sm:p-10">
        <div className="bg-white shadow-2xl rounded-3xl p-4 sm:p-6 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : orders.length === 0 ? (
            <p className="text-center py-24 text-gray-500 font-medium animate-fade-in">
              No orders found.
            </p>
          ) : (
            <table className="min-w-full table-auto text-sm text-left animate-fade-in">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-4">Done</th>
                  <th className="px-4 py-4">Order ID</th>
                  <th className="px-4 py-4">Customer</th>
                  <th className="px-4 py-4">Contact</th>
                  <th className="px-4 py-4">Payment</th>
                  <th className="px-4 py-4">Total</th>
                  <th className="px-4 py-4">Items</th>
                  <th className="px-4 py-4">Delivery</th>
                  <th className="px-4 py-4">Time</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={order.completed}
                        onChange={() =>
                          toggleCompleted(order._id, order.completed)
                        }
                        className="w-5 h-5 text-blue-600 rounded"
                        title="Mark as completed"
                      />
                    </td>
                    <td className="px-4 py-4 font-semibold">
                      {order._id.slice(-6)}
                    </td>
                    <td className="px-4 py-4">
                      {order.firstName} {order.lastName}
                    </td>
                    <td className="px-4 py-4 text-xs">
                      <p>{order.phone}</p>
                      <p className="text-gray-500">{order.email}</p>
                    </td>
                    <td className="px-4 py-4 flex items-center gap-1">
                      {order.paymentMethod}
                      {order.paymentMethod.toLowerCase() === "cash" ? (
                        <FaClock className="text-yellow-500" />
                      ) : (
                        <FaCheckCircle className="text-green-600" />
                      )}
                    </td>
                    <td className="px-4 py-4 font-bold text-blue-700">
                      NRs.{" "}
                      {(
                        parseFloat(order.discountedTotal || order.total) +
                        (order.shipping || 0)
                      ).toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      <ul className="list-disc ml-4">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} × {item.quantity} ({item.selectedSize}g)
                            {item.process && (
                              <span className="text-gray-500 text-xs ml-2">
                                [Process: {item.process}]
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-600">
                      {order.deliveryTime || "-"}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition"
                      >
                        <FaTrash className="inline-block mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="text-xs text-gray-600 mt-6 text-center">
          Last refreshed:{" "}
          {lastRefreshed ? lastRefreshed.toLocaleTimeString() : "Never"}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
