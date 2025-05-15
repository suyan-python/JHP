import React from "react";
import { useStore } from "../../context/StoreContext";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleRemoveItem = (cartKey) => {
    const newCart = { ...cartItems };
    delete newCart[cartKey];

    clearCart();
    Object.entries(newCart).forEach(([itemId, { quantity, selectedSize }]) => {
      const [realId] = itemId.split("-");
      addToCart(realId, quantity, selectedSize);
    });
  };

  if (cartEntries.length === 0) {
    return (
      <div className="text-center py-24 my-36 px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-600">
          Your cart is empty
        </h2>
      </div>
    );
  }

  // Animation variants for each cart item
  const itemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 my-36">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
        Your Cart
      </h2>

      <AnimatePresence>
        <div className="space-y-6">
          {cartEntries.map(([cartKey, { quantity, selectedSize }]) => {
            const [id] = cartKey.split("-");
            const name = itemNames[id];
            const image = itemImages[id];
            const type = itemTypes[id];

            const pricePerUnit =
              type === "washed process"
                ? itemPricesBySize[id]?.[selectedSize] || itemPrices[id]
                : itemPrices[id];

            const totalPrice = pricePerUnit * quantity;

            return (
              <motion.div
                key={cartKey}
                className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-5 rounded-2xl shadow-md"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <img
                    src={image}
                    alt={name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Size: {selectedSize}g
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-gray-600">Quantity:</span>
                      <button
                        onClick={() => removeFromCart(id, selectedSize)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                      >
                        <FaMinus className="text-sm" />
                      </button>
                      <span className="text-base font-medium">{quantity}</span>
                      <button
                        onClick={() => addToCart(id, 1, selectedSize)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                      >
                        <FaPlus className="text-sm" />
                      </button>
                    </div>
                    <p className="text-sm mt-2 text-gray-700">
                      <span className="font-medium">Rs. {pricePerUnit}</span>{" "}
                      each
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      Total: Rs. {totalPrice}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveItem(cartKey)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove item"
                >
                  <FaTrashAlt className="text-xl" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {/* Cart Summary */}
      <div className="mt-10 border-t pt-6 text-right">
        <p className="text-xl font-semibold text-gray-800">
          Total: Rs. {getTotalPrice()}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-6">
          <button
            onClick={clearCart}
            className="px-5 py-2 border border-red-400 text-red-500 font-medium rounded-md hover:bg-red-50 transition duration-200"
          >
            Clear Cart
          </button>

          <NavLink to="/payment" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition duration-200">
              Proceed to Payment
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
