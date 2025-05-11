import React from "react";
import { useStore } from "../../context/StoreContext";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Cart() {
  const {
    cartItems,
    itemNames,
    itemImages,
    itemPrices,
    itemPricesBySize,
    itemTypes,
    getTotalPrice,
    addToCart,
    removeFromCart,
    clearCart,
  } = useStore();

  const cartEntries = Object.entries(cartItems);

  const handleRemoveItem = (id) => {
    const newCart = { ...cartItems };
    delete newCart[id];
    // Use setCartItems if you expose it, or call clearCart/addToCart accordingly
    clearCart();
    Object.entries(newCart).forEach(([itemId, { quantity, selectedSize }]) => {
      addToCart(itemId, quantity, selectedSize);
    });
  };

  if (cartEntries.length === 0) {
    return (
      <div className="text-center py-20 my-36">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 my-36">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h2>
      <div className="space-y-6">
        {cartEntries.map(([id, { quantity, selectedSize }]) => {
          const name = itemNames[id];
          const image = itemImages[id];
          const type = itemTypes[id];

          const pricePerUnit =
            type === "washed process"
              ? itemPricesBySize[id]?.[selectedSize] || itemPrices[id]
              : itemPrices[id];

          const totalPrice = pricePerUnit * quantity;

          return (
            <div
              key={id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-600">Size: {selectedSize}g</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    Quantity:
                    <button
                      onClick={() => removeFromCart(id)}
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => addToCart(id, 1, selectedSize)}
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    Rs. {pricePerUnit} each
                  </p>
                  <p className="text-sm text-gray-900 font-semibold">
                    Total: Rs. {totalPrice}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(id)}
                className="text-red-500 hover:text-red-700"
                title="Remove item"
              >
                <FaTrashAlt className="text-xl" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-8 text-right space-y-4">
        <p className="text-xl font-semibold text-gray-800">
          Total: Rs. {getTotalPrice()}
        </p>

        <button
          onClick={clearCart}
          className="px-6 py-2 border border-red-400 text-gray-800 font-medium rounded-md hover:bg-gray-100 transition duration-200"
        >
          Clear Cart
        </button>

        <div>
          <NavLink to="/payment">
            <button className="px-6 py-2 border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition duration-200">
              Proceed to Payment
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
