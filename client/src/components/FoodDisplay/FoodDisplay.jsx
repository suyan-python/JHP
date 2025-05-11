import React, { useState } from "react";
import { useStore } from "../../context/StoreContext.jsx";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    }, 3000);
  };

  const applySorting = (products) => {
    if (sortOrder === "asc") {
      return [...products].sort(
        (a, b) => itemPrices[a._id] - itemPrices[b._id]
      );
    } else if (sortOrder === "desc") {
      return [...products].sort(
        (a, b) => itemPrices[b._id] - itemPrices[a._id]
      );
    }
    return products;
  };

  const renderProductSection = (title, products) => (
    <div className="mb-16">
      <h2 className="text-xl sm:text-2xl font-semibold text-brownn mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-2xl shadow-sm group hover:shadow-lg hover:scale-[1.02] transition duration-300 flex flex-col relative pb-4"
          >
            <Link to={`/store/${product._id}`}>
              <div className="relative h-80 overflow-hidden">
                <img
                  src={itemImages[product._id]}
                  alt={itemNames[product._id]}
                  className="w-full h-full object-cover group-hover:opacity-0 transition duration-300 rounded-t-2xl"
                />
                <img
                  src={product.hoverImage}
                  alt="Hover"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-300 rounded-t-2xl"
                />
              </div>
            </Link>

            {/* Product Info (name, price, description, and select options) */}
            <div className="p-3 text-center bg-white  group-hover:translate-y-[-20px] translate-y-4 transition duration-300 z-10 rounded-t-2xl">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {itemNames[product._id]}
              </h3>
              <p className="text-sm text-bluee font-medium">
                From: {itemPrices[product._id]}
              </p>

              {/* Description and Select Options */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-xs text-gray-500 my-3">
                  {product.description}
                </p>
                <Link to={`/store/${product._id}`}>
                  <button className="w-full text-bluee font-medium text-sm hover:text-blue-600 transition duration-300">
                    SELECT OPTIONS
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const allProducts =
    selectedCategory === "all"
      ? food_list
      : food_list.filter((product) => product.category === selectedCategory);

  const specialEdition = applySorting(
    allProducts.filter((product) => product.type === "special editions")
  );
  const dripBox = applySorting(
    allProducts.filter((product) => product.type === "drip box")
  );
  const washedProcess = applySorting(
    allProducts.filter((product) => product.type === "washed process")
  );

  return (
    <section className="py-12 bg-white my-36" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-brownn text-center mb-10 sm:mb-12">
          Our Products
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4">
          <div className="flex flex-wrap gap-2">
            {["all", "coffee", "tea"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-medium capitalize border transition ${
                  selectedCategory === category
                    ? "bg-bluee text-white border-bluee"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-bluee hover:text-white"
                }`}
              >
                {category === "all" ? "All Products" : category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-700">
              Sort by Price:
            </label>
            <select
              id="sort"
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-2 py-1.5 sm:px-3 sm:py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-bluee"
            >
              <option value="default">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Sections */}
        {selectedCategory === "coffee" ? (
          <>
            {specialEdition.length > 0 &&
              renderProductSection("Special Editions", specialEdition)}
            {dripBox.length > 0 && renderProductSection("Drip Box", dripBox)}
            {washedProcess.length > 0 &&
              renderProductSection("Washed Process", washedProcess)}
          </>
        ) : (
          renderProductSection("Products", applySorting(allProducts))
        )}
      </div>
    </section>
  );
};

export default FoodDisplay;
