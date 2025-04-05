import { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets"; // Ensure food_list contains your food items with id, price, and image
import { FaTrashAlt } from "react-icons/fa"; // Trash icon import

export const CartContext = createContext({ food_list: [] });

export const useStore = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  // Extract prices, images, and names from food_list
  const itemPrices = food_list.reduce((acc, item) => {
    acc[item._id] = item.price;
    return acc;
  }, {});

  const itemImages = food_list.reduce((acc, item) => {
    acc[item._id] = item.image;
    return acc;
  }, {});

  const itemNames = food_list.reduce((acc, item) => {
    acc[item._id] = item.name;
    return acc;
  }, {});

  // Add item to the cart (increment quantity if it already exists)
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Remove one item from the cart (decrement quantity or remove completely if quantity is 0)
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;

      const newQuantity = prev[itemId] - 1;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [itemId]: newQuantity };
    });
  };

  // Decrement an item completely from the cart
  const decrementCartItem = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[id];
      return updatedItems;
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems({});
  };

  // Get the total price of all cart items
  // StoreContext.jsx or your context provider file
  const getTotalPrice = () => {
    return Object.keys(cartItems).reduce((total, id) => {
      const price = itemPrices[id] || 0;
      const quantity = cartItems[id] || 0;
      return total + price * quantity;
    }, 0);
  };

  useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    decrementCartItem,
    clearCart,
    getTotalPrice,
    itemPrices,
    itemImages,
    itemNames,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
