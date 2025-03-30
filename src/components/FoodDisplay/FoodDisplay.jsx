// FoodDisplay.js
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon
import image1 from "../../assets/image1.png";
import hover1 from "../../assets/hover1.png";

const products = [
  {
    id: 1,
    name: "Single Origin Ethiopian",
    description: "Medium roast with fruity undertones",
    price: 15.99,
    category: "coffee",
    image: image1,
    hoverImage: hover1,
  },
  {
    id: 1,
    name: "Single Origin Ethiopian",
    description: "Medium roast with fruity undertones",
    price: 15.99,
    category: "coffee",
    image: image1,
    hoverImage: hover1,
  },
  {
    id: 1,
    name: "Single Origin Ethiopian",
    description: "Medium roast with fruity undertones",
    price: 15.99,
    category: "coffee",
    image: image1,
    hoverImage: hover1,
  },
  {
    id: 1,
    name: "Single Origin Ethiopian",
    description: "Medium roast with fruity undertones",
    price: 15.99,
    category: "coffee",
    image: image1,
    hoverImage: hover1,
  },
  {
    id: 1,
    name: "Single Origin Ethiopian",
    description: "Medium roast with fruity undertones",
    price: 15.99,
    category: "coffee",
    image: image1,
    hoverImage: hover1,
  },
  {
    id: 1,
    name: "Single Origin Ethiopian",
    description: "Medium roast with fruity undertones",
    price: 15.99,
    category: "coffee",
    image: image1,
    hoverImage: hover1,
  },
];

function FoodDisplay({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCartVisible, setIsCartVisible] = useState(false); // State to control visibility of the cart

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible); // Toggle cart visibility on button click
  };

  return (
    <div className="py-12 bg-white rounded-2xl" id="products">
      <div className="max-w-7xl mx-auto relative">
        {/* Conditionally render Cart or Products */}
        {isCartVisible && <Cart cart={addToCart} />}
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
                key={product.id}
                className="p-6 rounded-lg hover:shadow-lg transition-shadow relative group"
              >
                {/* Product Image - Normal Image and Hover Image */}
                <div className="relative w-full h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:opacity-0 group-hover:scale-110"
                  />
                  <img
                    src={product.hoverImage} // Assuming you have a hoverImage in the product data
                    alt={`${product.name} Hover`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-110"
                  />
                </div>

                {/* Product Name and Price - Always visible */}
                <div className="mt-4">
                  <h3 className="text-lg">{product.name}</h3>
                  <p className="text-lg text-amber-600">${product.price}</p>
                </div>

                {/* Description and Add to Cart Button (These will slide up on hover) */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-[-10px] transition-all duration-300">
                  <p className="text-sm mb-4">{product.description}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full mt-4 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDisplay;
