import React, { useState } from "react";
import { useStore } from "../../context/StoreContext.jsx";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const FoodDisplay = () => {
  const { food_list, addToCart, itemNames, itemPrices, itemImages } =
    useStore();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

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

  const renderOptimizedImage = (src, alt, hoverSrc) => (
    <div className="relative w-full h-full overflow-hidden rounded-t-3xl">
      <img
        loading="lazy"
        fetchpriority="high"
        src={src}
        alt={alt}
        width="600"
        height="600"
        className="w-full h-full object-cover transition-transform duration-300 scale-105 group-hover:scale-110"
      />
      {hoverSrc && (
        <img
          loading="lazy"
          src={hoverSrc}
          alt={`${alt} Hover`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105 group-hover:scale-110 rounded-t-3xl z-10"
        />
      )}
    </div>
  );

  const renderProductSection = (title, products, subtitle) => (
    <div className="fooddisplay mb-20 px-4 sm:px-6 lg:px-16">
      <div className="text-center mb-6 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brownn">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-3xl mx-auto mt-2">
            {subtitle}
          </p>
        )}
        <div className="w-20 sm:w-24 h-1 bg-brownn mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="w-full bg-white border rounded-3xl shadow-lg group hover:shadow-xl hover:scale-[1.015] transition-transform duration-300 flex flex-col overflow-hidden"
          >
            <Link to={`/store/${product._id}`}>
              <div className="relative h-[350px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-t-3xl">
                {renderOptimizedImage(
                  itemImages[product._id],
                  itemNames[product._id],
                  product.hoverImage
                )}
                <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                  {product.type === "espresso"
                    ? "Premium"
                    : product.type === "drip box"
                    ? "Best Seller"
                    : "Classic"}
                </span>
              </div>
            </Link>

            <div className="p-4 sm:p-5 bg-white group-hover:translate-y-[-10px] translate-y-2 transition duration-300 z-10">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                {itemNames[product._id]}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">
                250gm Pack
              </p>

              <div className="flex items-center gap-1 text-yellow-600 text-sm font-medium mb-2">
                <AiFillStar className="text-base sm:text-lg" /> 4.5 · 120
                Reviews
              </div>

              <p className="text-white font-semibold text-center bg-brownn rounded-md py-2 text-sm sm:text-base">
                Starting at Rs. {itemPrices[product._id]}
              </p>

              {product.flavors && (
                <div className="flex flex-wrap gap-2 mt-3">
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

              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                <p className="text-xs sm:text-sm text-gray-500 mb-3">
                  {product.description
                    ? product.description
                    : product.type === "espresso"
                    ? "Intense, syrupy, and made to cut through milk like a true classic."
                    : product.type === "drip box"
                    ? "Convenient brewing meets café-quality flavor – no equipment needed."
                    : "Clarity and brightness in every cup, crafted with meticulous care."}
                </p>
                <Link to={`/store/${product._id}`}>
                  <button className="w-full border border-brownn text-brownn font-semibold text-xs sm:text-sm rounded-md py-2 hover:bg-brownn hover:text-white transition duration-300">
                    Explore Brew Options
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

  const filterRoast = applySorting(
    allProducts.filter((product) => product.type === "cold brew")
  );
  const dripBox = applySorting(
    allProducts.filter((product) => product.type === "drip box")
  );
  const washedProcess = applySorting(
    allProducts.filter((product) => product.type === "filter roasted")
  );

  const categories = [
    { label: "All Brews", value: "all" },
    { label: "Coffee Collection", value: "coffee" },
    { label: "Coming Soon: Tea", value: "tea" },
  ];

  return (
    <section className="pt-10 sm:pt-20 lg:pt-32 mt-8 sm:mt-14" id="products">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brownn leading-tight">
            We provide best Handpicked. Roasted. Loved.
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base mt-2 sm:mt-4">
            Explore our curated selection of premium coffee.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium capitalize border transition ${
                  selectedCategory === category.value
                    ? "bg-brownn text-white border-transparent shadow"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-brownn hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <label htmlFor="sort" className="text-sm text-gray-700 font-medium">
              Refine by Price:
            </label>
            <select
              id="sort"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brownn transition"
            >
              <option value="default">Choose...</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Conditional Rendering */}
        {selectedCategory === "coffee" ? (
          <>
            {filterRoast.length > 0 &&
              renderProductSection(
                "The Espresso Edit – Bold, Rich, Timeless",
                filterRoast,
                "Experience depth in every sip with our signature roast profiles designed for true espresso lovers."
              )}
            {dripBox.length > 0 &&
              renderProductSection(
                "The Drip Collection – Simple. Elegant. Everyday.",
                dripBox,
                "Designed for the modern brew ritual. Easy to pour, hard to forget."
              )}
            {washedProcess.length > 0 &&
              renderProductSection(
                "Roasted Craft – Flavor Unfiltered",
                washedProcess,
                "Grown in the highlands of Illam, our washed-process beans offer floral clarity and smooth finishes."
              )}
          </>
        ) : selectedCategory === "tea" ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brownn mb-2">
              A Steeped Experience is Brewing…
            </h2>
            <p className="text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
              Our Illam tea line is coming soon. Think deep aroma, delicate
              balance, and mindful sourcing. Stay tuned.
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
