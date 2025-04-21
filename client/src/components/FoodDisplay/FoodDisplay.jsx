import React, { useState } from "react";
import { useStore } from "../../context/StoreContext.jsx";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { Coffee, Hourglass } from "lucide-react";

const FoodDisplay = () => {
  const { food_list, addToCart, itemNames, itemPrices, itemImages } =
    useStore();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [addedItems, setAddedItems] = useState([]);

  const handleAddToCart = (id) => {
    addToCart(id);
    setAddedItems((prev) => [...prev, id]);
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((itemId) => itemId !== id));
    }, 4000);
  };

  // Filter + Sort Logic
  const sortedFilteredProducts = [
    ...(selectedCategory === "all"
      ? food_list
      : food_list.filter((product) => product.category === selectedCategory)),
  ];

  if (sortOrder === "asc") {
    sortedFilteredProducts.sort(
      (a, b) => itemPrices[a._id] - itemPrices[b._id]
    );
  } else if (sortOrder === "desc") {
    sortedFilteredProducts.sort(
      (a, b) => itemPrices[b._id] - itemPrices[a._id]
    );
  }

  return (
    <section className="py-20 bg-white my-36" id="products">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="flex items-center justify-center gap-2 text-3xl font-semibold text-brownn mb-12">
          <span>Our Products</span>
        </div>

        {/* Filter + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {["all", "coffee", "tea"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition duration-300 border ${
                  selectedCategory === category
                    ? "bg-bluee text-white border-bluee"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-bluee hover:text-white"
                }`}
              >
                {category === "all" ? "All Products" : category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by Price:
            </label>
            <select
              id="sort"
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-bluee"
            >
              <option value="default">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"> */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedFilteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
            >
              {/* Image Section */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={itemImages[product._id]}
                  alt={itemNames[product._id]}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={product.hoverImage}
                  alt={`${itemNames[product._id]} Hover`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Info Section */}
              <div className="p-2 text-center">
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {itemNames[product._id]}
                </h3>
                <p className="text-sm text-bluee font-medium mt-1">
                  Rs. {itemPrices[product._id]}
                </p>
                <p className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  {product.description}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className={`mt-4 w-full py-2 rounded-full text-white font-medium text-sm transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                    addedItems.includes(product._id)
                      ? "bg-green-600"
                      : "bg-bluee hover:bg-blue-700"
                  }`}
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
    </section>
  );
};

export default FoodDisplay;

// <section className="bg-gradient-to-br from-[#fffdf8] to-[#f7f4ef] py-24 px-6 text-center text-gray-800 my-36">
//   <div className="max-w-3xl mx-auto">
//     <div className="flex items-center justify-center gap-2 text-3xl font-semibold text-brownn mb-12">
//       <Coffee className="w-7 h-7" />
//       <span>JHP Store</span>
//     </div>
//     <h2 className="text-4xl font-bold text-brownn mb-4">
//       This Section is Under Construction
//     </h2>
//     <p className="text-lg text-gray-600 mb-12">
//       We’re crafting something special for you. Please check back soon as we
//       brew new features and updates for this section.
//     </p>

//     {/* Message Strip */}
//     <div className="inline-flex items-center gap-3 bg-[#f1ece5] text-brownn px-6 py-4 rounded-xl shadow-sm text-base font-medium">
//       <Hourglass className="w-5 h-5 text-bluee animate-pulse" />
//       <span>Thank you for your patience</span>
//     </div>
//   </div>
// </section>
