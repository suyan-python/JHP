import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function StoreDetail() {
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
  const priceBySize =
    productType === "washed process"
      ? itemPricesBySize[id]?.[selectedSize] || productPrice
      : productPrice;

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleAddToCart = () => {
    const existingItem = cartItems[id];

    // If same size item is already in cart, show error
    if (existingItem && existingItem.selectedSize === selectedSize) {
      setToastMessage("Item already in cart!");
      setToastType("error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return;
    }

    addToCart(id, quantity, selectedSize);
    setToastMessage("Added to cart successfully!");
    setToastType("success");
    setAddedToCart(true);
    setShowToast(true);
    setTimeout(() => {
      setAddedToCart(false);
      setShowToast(false);
    }, 4000);
  };

  if (!productName || !productImage || !productDescription) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <>
      {showToast && (
        <div
          role="alert"
          className={`fixed bottom-5 right-5 px-6 py-4  shadow-xl z-50 text-sm font-medium flex items-center space-x-3 transform transition-all duration-500 ease-in-out ${
            toastType === "success"
              ? "animate-slideIn border border-green-500 text-green-500 bg-white"
              : "animate-slideIn border border-red-500 text-red-500 bg-white"
          }`}
        >
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 my-36 py-12 bg-white rounded-3xl shadow-xl">
        {/* Product Image */}
        <div className="flex justify-center items-start">
          <img
            src={productImage}
            alt={productName}
            className="rounded-2xl shadow-md object-cover w-full h-[600px]"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6 justify-between">
          <div className="text-sm text-gray-400">
            JHP Store &gt;{" "}
            <span className="text-black font-semibold">{productName}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 leading-snug">
            {productName}
          </h1>

          {productFlavors?.length > 0 && (
            <div className="text-gray-600 text-sm">
              <strong className="text-gray-800">Flavors:</strong>{" "}
              {productFlavors.join(", ")}
            </div>
          )}

          <p className="text-gray-700 text-base leading-relaxed">
            {productDescription}
          </p>

          <div className="flex flex-col max-w-[200px]">
            <label
              htmlFor="size"
              className="text-sm font-medium text-gray-800 mb-1"
            >
              Size
            </label>
            <select
              id="size"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-600"
              value={selectedSize}
              onChange={(e) => setSelectedSize(Number(e.target.value))}
            >
              <option value={250}>250g</option>
              {productType === "washed process" && (
                <>
                  <option value={500}>500g</option>
                  <option value={1000}>1kg</option>
                </>
              )}
            </select>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <div className="text-2xl font-semibold text-gray-900">
              Rs. {priceBySize * quantity}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center border rounded-lg px-3 py-1 shadow-sm bg-gray-50">
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

            <button
              className={`w-fit px-6 py-3 font-semibold rounded-lg shadow-md transition duration-200 ${
                addedToCart
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
              onClick={handleAddToCart}
            >
              {addedToCart ? "✔ Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreDetail;
