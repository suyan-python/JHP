import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import {
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaSyncAlt,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
                  <th className="px-4 py-4 text-center">Status</th>
                  <th className="px-4 py-4">Total</th>
                  <th className="px-4 py-4">Items</th>
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
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                        }`}
                      >
                        {order.status === "paid" ? "Paid" : "Pending"}
                      </span>
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

                    <td className="px-4 py-4 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowModal(true);
                        }}
                        className="text-sm font-medium text-gray-700 border border-gray-400 rounded-md px-3 py-1 hover:bg-gray-100  transition duration-500"
                      >
                        View Details
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
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Order #{selectedOrder._id.slice(-6)} Details
              </h2>

              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  <strong>Customer:</strong> {selectedOrder.firstName}{" "}
                  {selectedOrder.lastName}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedOrder.phone},{" "}
                  {selectedOrder.email}
                </p>
                <div className="flex items-center gap-4">
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {selectedOrder.paymentMethod}
                  </p>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      selectedOrder.status === "paid"
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                    }`}
                  >
                    {selectedOrder.status === "paid" ? "Paid" : "Pending"}
                  </span>
                </div>

                <p>
                  <strong>Order Date: </strong>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Delivery Time:</strong>{" "}
                  {selectedOrder.deliveryTime || "-"}
                </p>
                <p>
                  <strong>Total:</strong> Rs.{" "}
                  {(
                    parseFloat(
                      selectedOrder.discountedTotal || selectedOrder.total
                    ) + (selectedOrder.shipping || 0)
                  ).toFixed(2)}
                </p>

                <div>
                  <strong>Items:</strong>
                  <ul className="list-disc ml-5 mt-1">
                    {selectedOrder.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity} ({item.selectedSize}g)
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedOrder.location && (
                  <div className="mt-4">
                    <strong>Delivery Map Location:</strong>
                    <p>
                      Lat: {selectedOrder.location.lat.toFixed(5)}, Lng:{" "}
                      {selectedOrder.location.lng.toFixed(5)}
                    </p>
                    <div className="h-64 mt-2 rounded-xl overflow-hidden border border-gray-300">
                      <iframe
                        title="Delivery Location"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${selectedOrder.location.lat},${selectedOrder.location.lng}&z=15&output=embed`}
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
              {/* Admin Actions */}
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 border-t pt-5">
                {/* Toggle Payment Status Button */}
                <button
                  onClick={async () => {
                    const newStatus =
                      selectedOrder.status?.toLowerCase() === "paid"
                        ? "pending"
                        : "paid";
                    try {
                      const res = await fetch(
                        `https://jhp-backend.onrender.com/api/admin/orders/${selectedOrder._id}/status`,
                        {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ status: newStatus }),
                        }
                      );
                      if (res.ok) {
                        setSelectedOrder({
                          ...selectedOrder,
                          status: newStatus,
                        });
                      } else {
                        alert("Failed to update payment status.");
                      }
                    } catch (err) {
                      console.error("Error updating status", err);
                    }
                  }}
                  className={`flex items-center justify-center gap-2 px-5 py-2 rounded-md border text-sm font-medium transition-all ${
                    selectedOrder.status?.toLowerCase() === "paid"
                      ? "text-yellow-700 border-yellow-500 hover:bg-yellow-100"
                      : "text-green-700 border-green-500 hover:bg-green-100"
                  }`}
                >
                  {selectedOrder.status?.toLowerCase() === "paid"
                    ? "Mark as Pending"
                    : "Mark as Paid"}
                </button>

                {/* Delete Order Button */}
                <button
                  onClick={async () => {
                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete this order?"
                    );
                    if (!confirmDelete) return;

                    try {
                      const res = await fetch(
                        `https://jhp-backend.onrender.com/api/admin/orders/${selectedOrder._id}`,
                        { method: "DELETE" }
                      );
                      if (res.ok) {
                        setShowModal(false);
                        setOrders((prev) =>
                          prev.filter(
                            (order) => order._id !== selectedOrder._id
                          )
                        );

                        // ✅ Show toast after successful deletion
                        toast.success(
                          `Order for ${selectedOrder.firstName} ${selectedOrder.lastName} deleted successfully`
                        );
                      } else {
                        toast.error("Failed to delete the order.");
                      }
                    } catch (err) {
                      console.error("Error deleting order", err);
                      toast.error("Error deleting order. Please try again.");
                    }
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-2 rounded-md border border-red-500 text-red-600 hover:bg-red-50 text-sm font-medium transition-all"
                >
                  <FaTrash className="text-sm" />
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
