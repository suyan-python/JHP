import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets"; // Ensure food_list contains your food items with id, price, and image

export const StoreContext = createContext({ food_list: [] });

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // Extract prices and images from food_list
  const itemPrices = food_list.reduce((acc, item) => {
    acc[item._id] = item.price;
    return acc;
  }, {});

  const itemImages = food_list.reduce((acc, item) => {
    acc[item._id] = item.image; // Map item._id to its image URL
    return acc;
  }, {});

  const itemNames = food_list.reduce((acc, item) => {
    acc[item._id] = item.name; // Map item._id to its image URL
    return acc;
  }, {});

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1, // Increment quantity or set to 1
    }));
  };

  const getTotalPrice = () => {
    return Object.keys(cartItems).reduce((total, id) => {
      return total + (itemPrices[id] || 0) * cartItems[id]; // Calculate total price
    }, 0);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev; // If the item is not in the cart, return previous state
      const newQuantity = prev[itemId] - 1; // Decrease quantity by 1

      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev; // Remove item if quantity is zero
        return rest;
      }

      return { ...prev, [itemId]: newQuantity }; // Otherwise, update the quantity
    });
  };
  const decrementCartItem = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[id]; // Removes the item from the cart entirely
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems({}); // Reset cartItems to an empty object
  };

  useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    decrementCartItem,
    itemPrices, // Provide itemPrices
    itemImages, // Provide itemImages
    itemNames,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
