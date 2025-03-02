import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./FoodItem.css";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, decrementCartItem } = useContext(StoreContext);

  return (
    <div className={`food-item ${cartItems[id] ? "added-to-cart" : ""}`}>
      <div className="food-item-img-container">
        <img src={image} alt={name} className="food-item-image" />
      </div>

      <div className="food-item-info">
        <h3>{name}</h3>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Rs.{price}</p>

        {/* Add or Remove button below the price */}
        <div className="food-item-actions text-lg">
          {!cartItems[id] ? (
            <button
              className="hover:text-green-500"
              onClick={() => addToCart(id)}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="hover:text-red-500"
              onClick={() => decrementCartItem(id)}
            >
              Remove from Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
