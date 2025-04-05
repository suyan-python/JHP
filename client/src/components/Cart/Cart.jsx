import React from "react";
import { useStore } from "../../context/StoreContext";
import { FaTrashAlt } from "react-icons/fa";
import PaymentComponent from "../esewa/Payment";

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
        <h2 className="text-3xl  text-gray-800 text-center mb-6">My Cart</h2>

        {cartArray.length === 0 ? (
          <p className="text-center text-red-500 text-lg">
            No items in the cart.
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-5">
              {cartArray.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-base">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Rs. {item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(item.id)}
                      className="px-3 py-1 text-xl font-bold text-green-600 hover:text-green-700"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-1 text-xl font-bold text-yellow-600 hover:text-yellow-700"
                    >
                      -
                    </button>
                    <button
                      onClick={() => decrementCartItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Clear */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 border-t pt-6">
              <button
                onClick={clearCart}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm"
              >
                Clear Cart
              </button>
              <div className="text-xl  text-gray-700">
                Total: <span className="text-black">Rs. {totalPrice}</span>
              </div>
            </div>

            {/* Payment Section */}
            <div className="mt-8">
              <PaymentComponent />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
