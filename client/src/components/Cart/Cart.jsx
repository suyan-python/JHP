import React from "react";
import { useStore } from "../../context/StoreContext";
import { FaTrashAlt } from "react-icons/fa";
import PaymentComponent from "../esewa/Payment";
import { FaShoppingBag } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Cart({ isCartVisible, closeCart }) {
  const {
    cartItems,
    removeFromCart,
    addToCart,
    decrementCartItem,
    clearCart,
    getTotalPrice,
    itemNames,
    itemPrices,
    itemImages,
  } = useStore();

  const cartArray = Object.keys(cartItems || {}).map((id) => ({
    id,
    name: itemNames[id] || "Unknown Item",
    price: itemPrices[id] || 0,
    quantity: cartItems[id],
    image: itemImages[id] || "",
  }));

  const totalPrice = getTotalPrice();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[60%] md:w-[45%] bg-white shadow-2xl z-50 transition-transform duration-300 ${
        isCartVisible ? "translate-x-0" : "translate-x-full"
      } overflow-y-auto rounded-l-xl`}
    >
      {/* Close Button */}
      <button
        onClick={closeCart}
        className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-gray-800"
      >
        &times;
      </button>

      {/* Cart Content */}
      <div className="p-6 pt-14">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          My Cart
        </h2>

        {cartArray.length === 0 ? (
          <p className="text-center text-red-500 text-lg">
            Your cart is currently empty.
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-5">
              {cartArray.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Rs. {item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(item.id)}
                      className="px-2 py-1 text-lg font-semibold text-green-600 hover:text-green-700"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-1 text-lg font-semibold text-yellow-600 hover:text-yellow-700"
                    >
                      -
                    </button>
                    <button
                      onClick={() => decrementCartItem(item.id)}
                      className="text-red-500 hover:text-red-600 text-lg"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Clear */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 border-t pt-6">
              <div className="text-xl text-gray-800">
                <p className="text-sm font-medium">Subtotal:</p>
                <p className="text-black font-semibold text-lg">
                  Rs. {totalPrice}
                </p>
              </div>
              <button
                onClick={clearCart}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md text-sm"
              >
                Clear Cart
              </button>
            </div>

            {/* Payment Section */}
            <div className="mt-8 flex justify-center">
              <NavLink to={"/payment"}>
                <button className="flex items-center gap-2 bg-bluee hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-all">
                  <FaShoppingBag />
                  <span>Place Order</span>
                </button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
