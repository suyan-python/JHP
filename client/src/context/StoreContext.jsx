import { createContext, useContext, useState } from "react";
import { food_list } from "../assets/assets"; // Your updated array with _id, name, image, hoverImage, price, description, flavors, type

export const CartContext = createContext();

export const useStore = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  // Generate maps from food_list
  const itemPrices = food_list.reduce((acc, item) => {
    acc[item._id] = item.price; // Default price for non-washed process items
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

  const itemDescriptions = food_list.reduce((acc, item) => {
    acc[item._id] = item.description;
    return acc;
  }, {});

  const itemFlavors = food_list.reduce((acc, item) => {
    acc[item._id] = item.flavors;
    return acc;
  }, {});

  const itemTypes = food_list.reduce((acc, item) => {
    acc[item._id] = item.type;
    return acc;
  }, {});

  const itemPricesBySize = food_list.reduce((acc, item) => {
    if (item.type === "washed process") {
      // Store prices by size for washed process products
      acc[item._id] = item.pricesBySize || {};
    }
    return acc;
  }, {});

  // Cart management function

  const addToCart = (itemId, quantity = 1, selectedSize = 250) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart[itemId];

      if (existingItem && existingItem.selectedSize === selectedSize) {
        // If item with same size already exists, update quantity
        return {
          ...prevCart,
          [itemId]: {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
          },
        };
      }

      // If item is new or size is different, treat as new entry
      return {
        ...prevCart,
        [itemId]: {
          quantity,
          selectedSize,
        },
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const newQuantity = prev[itemId].quantity - 1;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: { ...prev[itemId], quantity: newQuantity } };
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const deleteItemFromCart = (itemId) => {
    setCartItems((prev) => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce(
      (total, [id, { quantity, selectedSize }]) => {
        const pricePerUnit =
          itemTypes[id] === "washed process"
            ? itemPricesBySize[id]?.[selectedSize] || itemPrices[id]
            : itemPrices[id];

        return total + pricePerUnit * quantity;
      },
      0
    );
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    deleteItemFromCart,
    getTotalPrice,
    itemPrices,
    itemImages,
    itemNames,
    itemDescriptions,
    itemFlavors,
    itemTypes,
    itemPricesBySize,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
