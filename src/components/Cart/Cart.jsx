import React from "react";
import { useStore } from "../../context/StoreContext";
import { FaTrashAlt } from "react-icons/fa"; // Import trash icon

export function Cart({ isCartVisible, closeCart }) {
  const {
    cartItems,
    removeFromCart,
    addToCart,
    decrementCartItem,
    clearCart, // Ensure clearCart is accessed from the context
    getTotalPrice,
    itemNames,
    itemPrices,
    itemImages,
  } = useStore(); // Use StoreContext

  const cartArray = Object.keys(cartItems || {}).map((id) => ({
    id,
    name: itemNames[id] || "Unknown Item",
    price: itemPrices[id] || 0,
    quantity: cartItems[id],
    image: itemImages[id] || "",
  }));

  const totalPrice = getTotalPrice(); // Get total price using the updated function

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[60%] md:w-[50%] bg-white shadow-xl rounded-l-lg z-50 transition-transform duration-300 ${
        isCartVisible ? "translate-x-0" : "translate-x-full"
      } overflow-y-auto`}
    >
      {/* Close Button */}
      <button
        onClick={closeCart}
        className="absolute top-4 right-4 text-3xl font-bold text-gray-700 focus:outline-none"
      >
        &times;
      </button>

      {/* Cart Content */}
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Your Cart
        </h2>
        {cartArray.length === 0 ? (
          <p className="text-center text-gray-500">No items in the cart.</p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-6">
              {cartArray.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 border rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-1 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-gray-600">
                        Rs. {item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {/* Increment/Decrement buttons */}
                    <button
                      onClick={() => addToCart(item.id)}
                      className=" text-black px-4 py-2 rounded-full text-2xl hover:text-green-500"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className=" text-black px-4 py-2 rounded-full text-2xl hover:text-green-500"
                    >
                      -
                    </button>
                    <button
                      onClick={() => decrementCartItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart and Total Price */}
            <div className="flex justify-between items-center py-6 mt-6 border-t">
              <button
                onClick={clearCart} // Directly call clearCart here
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full"
              >
                Clear Cart
              </button>
              <div className="text-2xl font-semibold text-gray-800">
                Total: <span className="text-purple-600">Rs. {totalPrice}</span>
              </div>
            </div>

            {/* Pay with Khalti Button */}
            <div className="mt-6">
              <button
                onClick={() => initiatePayment()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full"
              >
                Pay with Khalti
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
