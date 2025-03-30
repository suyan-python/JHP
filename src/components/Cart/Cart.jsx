import React from "react";

export function Cart({ cart, isCartVisible, closeCart, removeFromCart }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[50%] bg-white shadow-lg z-50 transition-transform duration-300 ${
        isCartVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={closeCart}
        className="absolute top-4 right-4 text-2xl font-bold text-gray-700"
      >
        &times;
      </button>

      {/* Cart Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in the cart.</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-gray-600">${item.price}</p>
              </div>
              {/* ✅ Remove Button (Now works properly) */}
              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-all duration-300"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
