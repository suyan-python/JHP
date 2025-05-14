import React, { useState } from "react";
import { useStore } from "../../context/StoreContext.jsx";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

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
    <div className="fooddisplay mb-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-brownn">{title}</h2>
        <div className="w-20 h-1 bg-brownn mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-2xl shadow-md group hover:shadow-lg hover:scale-[1.02] transition duration-300 flex flex-col relative overflow-hidden"
          >
            <Link to={`/store/${product._id}`}>
              <div className="relative h-72 sm:h-80 overflow-hidden">
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

                {/* Tag badge */}
                <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {product.type === "special editions"
                    ? "Premium"
                    : product.type === "drip box"
                    ? "Best Seller"
                    : "Classic"}
                </span>
              </div>
            </Link>

            <div className="p-4 text-left bg-white group-hover:translate-y-[-20px] translate-y-4 transition duration-300 z-10">
              <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
                {itemNames[product._id]}
              </h3>

              <p className="text-xs text-gray-500 mb-2">250gm Pack</p>

              {/* Review Section */}
              <div className="flex items-center gap-1 text-sm text-yellow-600 font-medium mb-2">
                <AiFillStar className="text-base" /> 4.5 · 120 Reviews
              </div>

              <p className="text-white font-semibold text-center bg-brownn rounded-md py-2 text-sm">
                From: Rs. {itemPrices[product._id]}
              </p>

              {/* Optional Flavor Tags */}
              {product.flavors && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.flavors.map((flavor, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              )}

              {/* Description and Options */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 mt-4">
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  {product.description}
                </p>
                <Link to={`/store/${product._id}`}>
                  <button className="w-full border border-brownn text-brownn font-medium text-sm rounded-md py-1.5 hover:bg-brownn hover:text-white transition duration-300">
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
    <section className="py-40" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-brownn text-center mb-16">
          Discover Our Finest Products
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div className="flex flex-wrap gap-3">
            {["all", "coffee", "tea"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize border transition ${
                  selectedCategory === category
                    ? "bg-brownn text-white border-transparent"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-brownn hover:text-white"
                }`}
              >
                {category === "all" ? "All Products" : category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm text-gray-700">
              Sort by Price:
            </label>
            <select
              id="sort"
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brownn"
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
        ) : selectedCategory === "tea" ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            {/* <img
              src="/images/launching-soon.png" // Optional image path
              alt="Launching Soon"
              className="w-60 h-auto mb-6"
            /> */}
            <h2 className="text-2xl sm:text-3xl font-bold text-brownn mb-2">
              Tea Collection Launching Soon
            </h2>
            <p className="text-gray-600 max-w-md text-sm sm:text-base">
              We're brewing up something special for our tea lovers. Stay tuned
              for a fresh and flavorful tea experience!
            </p>
          </div>
        ) : (
          renderProductSection("Products", applySorting(allProducts))
        )}
      </div>
    </section>
  );
};

export default FoodDisplay;
