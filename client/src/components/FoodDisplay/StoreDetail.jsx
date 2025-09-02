import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { Star } from "lucide-react";
import notfound from '../../assets/notfound.svg'

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
      "Clean, bright, and vibrant — our washed coffees highlight the pure essence of the bean. Expect crisp acidity, floral aromatics, and a refined, tea-like clarity that showcases origin at its finest.",
    ANEROBIC:
      "Sweet, bold, and full-bodied — natural process coffees are sun-dried inside the cherry, giving you a fruit-forward cup with notes of berries, tropical fruit, and a rich, wine-like depth.",
    EXPERIMENTAL:
      "Innovative and intriguing — our experimental lots explore unique fermentation techniques to unlock complex layers of flavor. Expect adventurous profiles, from jammy sweetness to spicy or boozy undertones.",
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
        <img
          src={notfound}
          alt="Not Found"
          className="w-48 mb-6 opacity-80"
        />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Product Not Found</h1>
        <p className="text-gray-600 text-center max-w-md">
          We couldn’t find the product you’re looking for. It may have been removed, renamed, or temporarily unavailable.
        </p>
        <Link to={'/'}
          className="mt-6 px-6 py-3 bg-brownn text-white rounded transition"
        >
          Return to Store
        </Link>
      </div>
    );
  }

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 mt-36 py-8 bg-white rounded-3xl shadow-xl">
        <div className="text-sm text-gray-400 mb-4">
          JHP Store &gt;{" "}
          <span className="text-black font-semibold">{productName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT: IMAGE + FORM */}
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* SIZE SELECTOR */}
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
                        {["filter roasted", "anerobic process", "cold brew"].includes(productType) && (
                          <>
                            <option value={500}>500g</option>
                            <option value={1000}>1kg</option>
                          </>
                        )}
                      </>
                    )}
                  </select>

                </div>

                {/* PROCESS SELECTOR */}
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

              {/* ADD TO CART */}
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
            <div className="text-red-500 font-semibold pt-4">
              *Note: EXPERIMENTAL are only available after pre-orders
            </div>
          </div>

          {/* RIGHT: DESCRIPTION */}
          <div className="flex flex-col justify-start space-y-6">
            <div>
              <h1 className="header text-4xl font-extrabold text-gray-900 hidden md:block mb-2">
                {productName}
              </h1>
              <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                {productType || "Coffee"}
              </span>
            </div>

            {productFlavors?.length > 0 && (
              <div className="text-sm text-gray-600">
                <strong className="text-gray-800">PROCESS:</strong>{" "}
                {productFlavors.join(" ")}
              </div>
            )}

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
              <div className="flex items-center gap-2">
              </div>
              <div>
                - Handpicked beans grown sustainably in the lush hills of Illam
              </div>
              <div>
                - Roasted in small batches for consistent flavor and aroma
              </div>
              <div>
                - Crafted with passion by farmers and roasters who care deeply
                about every step
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreDetail;
