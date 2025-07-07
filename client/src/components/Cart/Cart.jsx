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
    <div className="max-w-full mx-auto px-4 md:px-6 py-12 my-36 bg-slate-50 rounded">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
        Your Cart
      </h2>

      <AnimatePresence>
        <div className="space-y-8">
          {cartEntries.map(([cartKey, { quantity, selectedSize }]) => {
            const [id] = cartKey.split("-");
            const name = itemNames[id];
            const image = itemImages[id];
            const type = itemTypes[id];

            const pricePerUnit =
              type === "filter roasted" || type === "cold brew"
                ? itemPricesBySize[id]?.[selectedSize] || itemPrices[id]
                : itemPrices[id];

            const totalPrice = pricePerUnit * quantity;

            return (
              <motion.div
                key={cartKey}
                className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                {/* Product Info Section */}
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 object-cover rounded-xl border border-gray-200 shadow-sm"
                  />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Size: {selectedSize}g
                    </p>
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold">Rs. {pricePerUnit}</span>{" "}
                      each
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      Total: Rs. {totalPrice}
                    </p>
                  </div>
                </div>

                {/* Quantity + Remove */}
                <div className="flex flex-col md:items-end items-center gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg shadow-inner">
                    <button
                      onClick={() => removeFromCart(id, selectedSize)}
                      className="p-2 text-gray-700 hover:text-gray-900 transition"
                      title="Decrease quantity"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-base font-semibold px-3">
                      {quantity}
                    </span>
                    <button
                      onClick={() => addToCart(id, 1, selectedSize)}
                      className="p-2 text-gray-700 hover:text-gray-900 transition"
                      title="Increase quantity"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(cartKey)}
                    className="text-red-600 hover:text-red-700 transition font-semibold"
                    title="Remove item"
                  >
                    <FaTrashAlt className="text-2xl" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {/* Cart Summary */}
      <div className="mt-12 border-t border-gray-200 pt-6  mx-auto sm:mx-0 text-right">
        <p className="text-2xl font-bold text-gray-900 mb-6">
          Total: Rs. {getTotalPrice()}
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
          <button
            onClick={clearCart}
            className="w-full sm:w-40 px-6 py-3 border border-red-400 text-red-600 font-medium rounded-md hover:bg-red-100 transition duration-300"
          >
            Clear Cart
          </button>

          <NavLink to="/payment" className="w-full sm:w-40">
            <button className="w-full px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition duration-300">
              Proceed to Pay
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
