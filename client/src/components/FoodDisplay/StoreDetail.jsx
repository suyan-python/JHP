import React, { useState } from "react";
import { useParams } from "react-router-dom"; // We'll read the product id from the URL
import { useStore } from "../../context/StoreContext"; // your context file
import AddToCartButton from "../layout/AddToCart";

function StoreDetail() {
  const { id } = useParams(); // getting product id from URL
  const { food_list, addToCart, itemNames, itemPrices, itemImages } =
    useStore(); // getting data from context

  const productName = itemNames[id];
  const productPrice = itemPrices[id];
  const productImage = itemImages[id];

  const [quantity, setQuantity] = useState(1); // Start with quantity = 1
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // minimum quantity = 1
  };

  const [addedItems, setAddedItems] = useState([]);
  const handleAddToCart = (id) => {
    addToCart(id);
    setAddedItems((prev) => [...prev, id]);
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((itemId) => itemId !== id));
    }, 4000);
  };

  if (!productName || !productPrice || !productImage) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12 my-36 bg-gray-100 rounded-3xl shadow-lg">
      {/* Left Side - Product Image */}
      <div className="flex justify-center items-start">
        <img
          src={productImage}
          alt={productName}
          className="rounded-2xl shadow-md object-cover w-full max-h-[500px]"
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex flex-col space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400">
          Home &gt; Coffee &gt; Under transfer &gt;{" "}
          <span className="text-black font-semibold">{productName}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
          {productName}
        </h1>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="text-yellow-400 text-lg">★★★★★</div>
          <span className="text-sm text-gray-500">(1 Customer Review)</span>
        </div>

        {/* Specialty Coffee Tag */}
        <div className="text-blue-600 font-semibold underline cursor-pointer hover:text-blue-800 transition">
          Specialty coffee from the Direct Trade series
        </div>

        {/* Flavors */}
        <div className="text-gray-700 text-sm">
          <strong>Flavors:</strong> wine, strawberries, creamy smoothie, pomelo
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed">
          Herrera Colombia in exceptional processing{" "}
          <strong>carbonic maceration</strong> is a symphony of sweet aromas
          with a velvety mouthfeel, offering a rich sensory experience that
          stands out...
        </p>

        {/* Attributes */}
        <div className="text-gray-700 text-sm space-y-1">
          <p>
            <strong>Scoring:</strong> 90.00
          </p>
          <p>
            <strong>100% ARABICA</strong>
          </p>
          <p>
            <strong>COFFEE SPECIALISTS</strong>
          </p>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 text-2xl text-gray-400">
          <span>☕</span> <span>🏡</span> <span>📦</span> <span>🚚</span>{" "}
          <span>🛒</span>
        </div>

        {/* Select Options */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Size Selection */}
          <div className="flex flex-col">
            <label
              htmlFor="size"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Size
            </label>
            <select
              id="size"
              className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-400"
            >
              <option>250g</option>
              <option>500g</option>
              <option>1kg</option>
            </select>
          </div>

          {/* Grinding Selection */}
          <div className="flex flex-col">
            <label
              htmlFor="grinding"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Grinding
            </label>
            <select
              id="grinding"
              className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-400"
            >
              <option>Grainy coffee</option>
              <option>Ground for espresso</option>
              <option>Ground for filter</option>
            </select>
          </div>
        </div>

        {/* Price and Cart */}
        <div className="flex flex-wrap items-center gap-6 mt-6">
          {/* Price */}
          <div className="text-2xl font-bold text-gray-900">
            Rs. {productPrice * quantity}
          </div>

          {/* Quantity Control */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={decrementQuantity}
              className="px-3 py-2 font-bold text-xl text-gray-600 hover:bg-gray-200 transition"
            >
              -
            </button>
            <span className="px-6 text-lg">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-3 py-2 font-bold text-xl text-gray-600 hover:bg-gray-200 transition"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg shadow-md transition">
            ADD TO CART
          </button>

          {/* <button
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
          </button> */}

          {/* <AddToCartButton productId={product._id} /> */}
        </div>

        {/* Payment Methods */}
        <div className="flex items-center space-x-4 mt-8">
          <img
            src="/path/to/applepay-icon.png"
            alt="Apple Pay"
            className="h-6"
          />
          <img
            src="/path/to/googlepay-icon.png"
            alt="Google Pay"
            className="h-6"
          />
          <img src="/path/to/visa-icon.png" alt="Visa" className="h-6" />
          <img
            src="/path/to/mastercard-icon.png"
            alt="Mastercard"
            className="h-6"
          />
          <img src="/path/to/paypal-icon.png" alt="PayPal" className="h-6" />
          <img src="/path/to/blik-icon.png" alt="Blik" className="h-6" />
        </div>
      </div>
    </div>
  );
}

export default StoreDetail;
