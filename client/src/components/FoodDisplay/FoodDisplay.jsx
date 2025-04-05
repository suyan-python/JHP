import React, { useState } from "react";
import { useStore } from "../../context/StoreContext.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const FoodDisplay = () => {
  const { food_list, addToCart, itemNames, itemPrices, itemImages } =
    useStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addedItems, setAddedItems] = useState([]);

  const handleAddToCart = (id) => {
    addToCart(id);

    // Add to the temporary "added" state
    setAddedItems((prev) => [...prev, id]);

    // Remove after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((itemId) => itemId !== id));
    }, 3000);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? food_list
      : food_list.filter((product) => product.category === selectedCategory);

  return (
    <div className="py-10 bg-white rounded-2xl" id="products">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filter Buttons */}
        <div className="flex justify-start space-x-3 mb-8 text-black">
          {["all", "coffee", "tea"].map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                selectedCategory === category
                  ? "text-amber-700 border-b-2 border-amber-700"
                  : "text-gray-600 hover:text-amber-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all"
                ? "All Products"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="max-w-[280px] mx-auto p-3 rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 border group"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                <img
                  src={itemImages[product._id]}
                  alt={itemNames[product._id]}
                  className="w-full h-full object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={product.hoverImage}
                  alt={`${product.name} Hover`}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="mt-3">
                <h3 className="text-md font-semibold text-gray-800 truncate">
                  {itemNames[product._id]}
                </h3>
                <p className="text-sm text-amber-600 font-semibold mt-1">
                  Rs. {itemPrices[product._id]}
                </p>

                <p className="text-xs text-gray-500 mt-1 group-hover:opacity-100 opacity-0 group-hover:translate-y-0 -translate-y-1 transition-all duration-300">
                  {product.description}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className={`mt-3 w-full ${
                    addedItems.includes(product._id)
                      ? "bg-green-600"
                      : "bg-amber-600 hover:bg-amber-700"
                  } text-white font-medium py-2 rounded-full flex items-center justify-center gap-2 text-sm transition-transform duration-300 hover:scale-105`}
                  disabled={addedItems.includes(product._id)}
                >
                  {addedItems.includes(product._id) ? (
                    <>
                      <FaCheckCircle />
                      Added
                    </>
                  ) : (
                    <>
                      <FaShoppingCart />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
