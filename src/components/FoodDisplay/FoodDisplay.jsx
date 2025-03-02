import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

// Helper function to shuffle an array (Fisher-Yates Shuffle)
const shuffleArray = (array) => {
  if (!array || array.length === 0) return []; // Handle empty arrays
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [displayItems, setDisplayItems] = useState([]);
  const maxItemsToShow = 6;

  // Debugging logs
  useEffect(() => {
    console.log("Received food_list:", food_list);
    console.log("Selected category:", category);
  }, [food_list, category]);

  useEffect(() => {
    if (!food_list || food_list.length === 0) return; // Ensure food_list has items

    // Normalize category comparison
    const normalizedCategory = category.trim().toLowerCase();

    let filteredItems;
    if (normalizedCategory === "all") {
      filteredItems = shuffleArray(food_list).slice(0, maxItemsToShow);
    } else {
      filteredItems = food_list.filter(
        (item) => item.category?.trim().toLowerCase() === normalizedCategory
      );
    }

    console.log("Filtered items:", filteredItems); // Debugging filtered results
    setDisplayItems(filteredItems);

    // Smooth scroll to the section
    const scrollToSection = document.getElementById("food_display");
    if (scrollToSection) {
      scrollToSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [food_list, category]);

  return (
    <>
      <div id="food_display"></div>
      <div className="food-display-container">
        <h2 className="food-display-title">Get our products</h2>

        {category !== "All" && (
          <h1 className="category-heading font-medium text-3xl my-3 text-orange-400">
            {category}
          </h1>
        )}

        {displayItems.length === 0 ? (
          <p className="no-items">
            No items found in "{category}" category.{" "}
            <span style={{ fontSize: "2em" }}>😕</span>
          </p>
        ) : (
          <div className="food-display-list">
            {displayItems.map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FoodDisplay;
