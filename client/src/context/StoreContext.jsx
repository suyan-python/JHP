import { createContext, useContext, useState } from "react";
import { food_list } from "../assets/assets";

export const CartContext = createContext();
export const useStore = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  /* ---------- lookup tables built once ---------- */
  const itemPrices = Object.fromEntries(food_list.map((i) => [i._id, i.price]));
  const itemImages = Object.fromEntries(food_list.map((i) => [i._id, i.image]));
  const itemNames = Object.fromEntries(food_list.map((i) => [i._id, i.name]));
  const itemDescriptions = Object.fromEntries(
    food_list.map((i) => [i._id, i.description])
  );
  const itemFlavors = Object.fromEntries(
    food_list.map((i) => [i._id, i.flavors])
  );
  const itemTypes = Object.fromEntries(food_list.map((i) => [i._id, i.type]));
  const itemPricesBySize = Object.fromEntries(
    food_list
      .filter((i) =>
        ["filter roasted", "anerobic process", "cold brew"].includes(i.type)
      )
      .map((i) => [i._id, i.pricesBySize || {}])
  );

  const [cartItems, setCartItems] = useState({});

  /* ---------- cart helpers ---------- */
  const addToCart = (itemId, quantity = 1, selectedSize = 250) => {
    const cartKey = `${itemId}-${selectedSize}`;

    setCartItems((prev) => {
      // already in cart → just bump quantity
      if (prev[cartKey]) {
        return {
          ...prev,
          [cartKey]: {
            ...prev[cartKey],
            quantity: prev[cartKey].quantity + quantity,
          },
        };
      }

      // new entry → gather full data for PlaceOrder
      const type = itemTypes[itemId];
      const pricePerUnit =
        type === "filter roasted" ||
        type === "anerobic process" ||
        type === "cold brew"
          ? itemPricesBySize[itemId]?.[selectedSize] ?? itemPrices[itemId]
          : itemPrices[itemId];

      return {
        ...prev,
        [cartKey]: {
          id: itemId,
          name: itemNames[itemId],
          image: itemImages[itemId],
          type,
          pricesBySize: itemPricesBySize[itemId], // undefined for non-washed items
          price: pricePerUnit, // always something
          quantity,
          selectedSize,
        },
      };
    });
  };

  const removeFromCart = (id, size) => {
    const cartKey = `${id}-${size}`;
    setCartItems((prev) => {
      const item = prev[cartKey];
      if (!item) return prev;

      if (item.quantity <= 1) {
        const { [cartKey]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [cartKey]: {
          ...item,
          quantity: item.quantity - 1,
        },
      };
    });
  };

  const deleteItemFromCart = (cartKey) => {
    setCartItems((prev) => {
      const { [cartKey]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearCart = () => setCartItems({});

  const getTotalPrice = () =>
    Object.values(cartItems).reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );

  /* ---------- context ---------- */
  const ctx = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    deleteItemFromCart,
    clearCart,
    getTotalPrice,
    itemPrices,
    itemImages,
    itemNames,
    itemDescriptions,
    itemFlavors,
    itemTypes,
    itemPricesBySize,
  };

  return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>;
};

export default CartProvider;
