import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { Star } from "lucide-react";
import notfound from "../../assets/notfound.svg";
import { AiFillStar } from "react-icons/ai";

function StoreDetail()
{
  const { id } = useParams();
  const {
    addToCart,
    cartItems,
    itemPrices,
    itemNames,
    itemImages,
    itemDescriptions,
    itemFlavors,
    itemTypes,
    itemPricesBySize,
    food_list,
  } = useStore();

  const productName = itemNames[id];
  const productImage = itemImages[id];
  const productDescription = itemDescriptions[id];
  const productFlavors = itemFlavors[id];
  const productType = itemTypes[id];
  const productPrice = itemPrices[id] || 0;

  const [selectedSize, setSelectedSize] = useState(250);
  const [selectedProcess, setSelectedProcess] = useState(
    productFlavors?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const flavorDescriptions = {
    WASHED:
      "Clean, bright, and vibrant — our washed coffees highlight the pure essence of the bean.",
    ANEROBIC:
      "Sweet, bold, and full-bodied — natural process coffees are sun-dried inside the cherry.",
    EXPERIMENTAL:
      "Innovative and intriguing — our experimental lots explore unique fermentation techniques.",
  };

  const priceBySize =
    productType === "filter roasted" ||
      productType === "anerobic process" ||
      productType === "cold brew"
      ? itemPricesBySize[id]?.[selectedSize] || productPrice
      : productPrice;

  const handleAddToCart = () =>
  {
    const cartKey = `${id}-${selectedSize}-${selectedProcess}`;
    if (cartItems[cartKey])
    {
      setToastMessage("Item already in cart!");
      setToastType("error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return;
    }

    addToCart(id, quantity, selectedSize, selectedProcess);
    setToastMessage("Added to cart successfully!");
    setToastType("success");
    setAddedToCart(true);
    setShowToast(true);

    setTimeout(() =>
    {
      setAddedToCart(false);
      setShowToast(false);
    }, 3000);
  };

  if (!productName || !productImage || !productDescription)
  {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 px-6 py-16">
        <img src={notfound} alt="Not Found" className="w-48 mb-6 opacity-80" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Product Not Found
        </h1>
        <p className="text-gray-600 text-center max-w-md">
          We couldn’t find the product you’re looking for. It may have been
          removed or renamed.
        </p>
        <Link
          to={"/"}
          className="mt-6 px-6 py-3 bg-brownn text-white rounded transition"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  // 🎯 Generate related products by type or random
  const relatedProducts = food_list
    .filter((p) =>
      p._id !== id &&
      (
        (productType === "cold brew" && p.type !== "cold brew") ||
        (productType === "drip box" && p.type !== "drip box") ||
        (productType === "filter roasted" && p.type !== "filter roasted")
      )
    )
    .slice(0, 4);

  return (
    <>
      {showToast && (
        <div
          role="alert"
          className={`fixed top-20 right-5 z-50 px-6 py-4 rounded-lg text-sm font-medium flex items-center space-x-3 shadow-lg transition ${toastType === "success"
            ? "bg-white border border-green-500 text-green-700"
            : "bg-white border border-red-500 text-red-700"
            }`}
        >
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 mt-36 py-8 bg-white rounded-3xl shadow-xl">
        <div className="text-sm text-gray-400 mb-4">
          <Link to="/" className="hover:text-amber-800" >  JHP Store &gt;</Link>
          {" "}
          <span className="text-black font-semibold">{productName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 md:hidden">
              {productName}
            </h1>

            <img
              src={productImage}
              alt={productName}
              className="rounded-2xl shadow-lg w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover mb-6"
            />

            <div className="space-y-4">
              {/* SIZE + PROCESS */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Choose Size
                  </label>
                  <select
                    id="size"
                    className="w-full sm:w-48 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-600"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(Number(e.target.value))}
                  >
                    {productType === "drip box" ? (
                      <option value={70}>70g</option>
                    ) : (
                      <>
                        <option value={250}>250g</option>
                        {["filter roasted", "anerobic process", "cold brew"].includes(
                          productType
                        ) && (
                            <>
                              <option value={500}>500g</option>
                              <option value={1000}>1kg</option>
                            </>
                          )}
                      </>
                    )}
                  </select>
                </div>

                {productFlavors?.length > 0 && (
                  <div>
                    <label
                      htmlFor="process"
                      className="block text-sm font-medium text-gray-800 mb-1"
                    >
                      Choose Process
                    </label>
                    <select
                      id="process"
                      className="w-full sm:w-48 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-600"
                      value={selectedProcess}
                      onChange={(e) => setSelectedProcess(e.target.value)}
                    >
                      {productFlavors.map((flavor) => (
                        <option key={flavor} value={flavor}>
                          {flavor}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* QUANTITY + PRICE */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    Quantity:
                  </span>
                  <div className="flex items-center border rounded-lg px-3 py-1 bg-gray-50 shadow-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-2 text-gray-700 text-xl hover:text-black"
                    >
                      –
                    </button>
                    <span className="px-3 text-lg font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-2 text-gray-700 text-xl hover:text-black"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-2xl font-bold text-gray-900">
                  Rs. {priceBySize * quantity}
                </div>
              </div>

              <button
                className={`w-full sm:w-fit px-6 py-3 font-semibold rounded-lg shadow-md transition ${addedToCart
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                onClick={handleAddToCart}
              >
                {addedToCart ? "✔ Added to Cart" : "Add to Cart"}
              </button>
            </div>

            <div className="text-red-500 font-semibold pt-4 text-sm">
              *Note: EXPERIMENTAL are only available after pre-orders
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-start space-y-6">
            <div>
              <h1 className="header text-4xl font-extrabold text-gray-900 hidden md:block mb-2">
                {productName}
              </h1>
              <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                {productType || "Coffee"}
              </span>
            </div>

            {productFlavors?.map((flavor) => (
              <div key={flavor}>
                <h4 className="text-sm font-bold text-gray-800 uppercase mb-1">
                  {flavor}
                </h4>
                <p className="text-sm text-gray-600">
                  {flavorDescriptions[flavor.toUpperCase()]}
                </p>
              </div>
            ))}

            <div className="border-t pt-6 mt-4 text-sm text-gray-600 space-y-2">
              <div>- Handpicked beans from the lush hills of Illam</div>
              <div>- Roasted in small batches for consistent flavor</div>
              <div>- Crafted with passion by local farmers</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 YOU MAY ALSO LIKE */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brownn mb-2">
              You May Also Like
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
              Discover more from our curated Himalayan coffee range — roasted with precision and passion.
            </p>
            <div className="w-16 h-1 bg-brownn mx-auto mt-3 rounded-full"></div>
          </div>

          {/* 🟤 Responsive Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {relatedProducts.map((product) => (
              <Link
                to={`/${product._id}`}
                key={product._id}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                {/* 🖼️ Product Image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
                  <img
                    src={itemImages[product._id]}
                    alt={itemNames[product._id]}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-[9px] sm:text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full shadow-md tracking-wide">
                    {product.type?.toUpperCase() || "COFFEE"}
                  </span>
                </div>

                {/* 🧾 Product Details */}
                <div className="p-3 sm:p-4 flex flex-col">
                  <h3 className="text-[12px] sm:text-sm md:text-base font-semibold text-gray-900 truncate mb-1">
                    {itemNames[product._id]}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-gray-500 mb-2">
                    Starting Rs. {itemPrices[product._id]}
                  </p>

                  <button className="w-full mt-auto border border-brownn text-brownn font-medium text-[11px] sm:text-sm rounded-lg py-1.5 sm:py-2 hover:bg-brownn hover:text-white transition duration-300">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </>
  );
}

export default StoreDetail;
