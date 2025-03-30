import React from "react";

export function Cart({ cart, isCartVisible, closeCart }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[50%] bg-white shadow-lg z-50 transition-transform duration-300 ${
        isCartVisible ? "transform translate-x-0" : "transform translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={closeCart}
        className="absolute top-4 right-4 text-2xl font-bold text-gray-700"
      >
        &times; {/* "X" Close Button */}
      </button>

      {/* Cart Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="mb-4">
              <p>
                {item.name} - ${item.price}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
