import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen, FaClock, FaCheckCircle, FaSyncAlt } from "react-icons/fa";

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

      // Update local orders list
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4 sm:px-6 md:px-12 py-36">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
          <FaBoxOpen className="text-blue-600" /> Admin Dashboard
        </h1>
        <button
          onClick={fetchOrders}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-blue-700 active:scale-95 transition"
        >
          <FaSyncAlt className="animate-spin mr-1" />
          Refresh Orders
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center py-24 text-gray-500 font-medium animate-fade-in">
            No orders found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto animate-fade-in">
              <thead className="bg-blue-600 text-white text-xs sm:text-sm sticky top-0">
                <tr>
                  <th className="px-4 py-4 text-left">Done</th>
                  <th className="px-4 py-4 text-left">Order ID</th>
                  <th className="px-4 py-4 text-left">Customer</th>
                  <th className="px-4 py-4 text-left">Contact</th>
                  <th className="px-4 py-4 text-left">Payment</th>
                  <th className="px-4 py-4 text-left">Total</th>
                  <th className="px-4 py-4 text-left">Items</th>
                  <th className="px-4 py-4 text-left">Time</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-xs sm:text-sm divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={order.completed}
                        onChange={() =>
                          toggleCompleted(order._id, order.completed)
                        }
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        title="Mark as completed"
                      />
                    </td>
                    <td className="px-4 py-4 font-semibold whitespace-nowrap">
                      {order._id.slice(-6)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="font-medium">
                        {order.firstName} {order.lastName}
                      </p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p>{order.phone}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">
                        {order.email}
                      </p>
                    </td>
                    <td className="px-4 py-4 flex items-center gap-2 whitespace-nowrap">
                      {order.paymentMethod}
                      {order.paymentMethod.toLowerCase() === "cash" ? (
                        <FaClock
                          className="text-yellow-500"
                          title="Pending Payment"
                        />
                      ) : (
                        <FaCheckCircle
                          className="text-green-600"
                          title="Paid"
                        />
                      )}
                    </td>
                    <td className="px-4 py-4 font-bold text-blue-700 whitespace-nowrap">
                      NRs.{" "}
                      {parseFloat(order.discountedTotal || order.total).toFixed(
                        2
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <ul className="list-disc ml-4 space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} × {item.quantity} ({item.selectedSize}g)
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="text-xs sm:text-sm text-gray-600 mt-6 text-center">
        Last refreshed:{" "}
        {lastRefreshed ? lastRefreshed.toLocaleTimeString() : "Never"}
      </div>
    </div>
  );
};

export default AdminDashboard;
