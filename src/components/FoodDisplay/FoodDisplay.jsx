import React, { useState } from "react";
import { useStore } from "../../context/StoreContext.jsx"; // Import Store Context
import { FaShoppingCart } from "react-icons/fa";

const FoodDisplay = () => {
  const { food_list, addToCart, itemNames, itemPrices, itemImages } =
    useStore(); // Get food_list and other necessary values from Store Context
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter the products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? food_list
      : food_list.filter((product) => product.category === selectedCategory);

  return (
    <div className="py-12 bg-white rounded-2xl" id="products">
      <div className="max-w-7xl mx-auto relative">
        <div>
          {/* Filter Section */}
          <div className="flex justify-left space-x-4 mb-6 text-black">
            {["all", "coffee", "tea"].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "text-amber-700 border-b-2 border-amber-700"
                    : "text-gray-700 hover:text-amber-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all"
                  ? "All Products"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Product Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="p-6 rounded-lg hover:shadow-lg transition-shadow relative group"
              >
                {/* Product Image */}
                <div className="relative w-full h-64 overflow-hidden rounded-lg">
                  <img
                    src={itemImages[product._id]} // Fetch image from the context
                    alt={itemNames[product._id]} // Fetch name from the context
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:opacity-0"
                  />
                  <img
                    src={product.hoverImage} // Assuming hoverImage is also in the product object or handled similarly
                    alt={`${product.name} Hover`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
                  />
                </div>

                {/* Product Info */}
                <div className="mt-4">
                  <h3 className="text-lg">{itemNames[product._id]}</h3>{" "}
                  {/* Fetch name from context */}
                  <p className="text-lg text-amber-600">
                    Rs. {itemPrices[product._id]}
                  </p>{" "}
                  {/* Fetch price from context */}
                </div>

                {/* Hidden Info (Initially hidden, shown on hover) */}
                <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-4 transition-all duration-500 ease-in-out">
                  <p className="text-gray-500 mt-2">{product.description}</p>

                  {/* Add to Cart Button */}
                  <div className="mt-4">
                    <button
                      onClick={() => addToCart(product._id)} // Use the _id to add the correct product to the cart
                      className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
