import React from "react";
import FoodDisplay from "./FoodDisplay/FoodDisplay";
import FoodImage from "./FoodDisplay/FoodImage";
import Front from "./Front";

const StoreSection = () =>
{
  return (
    <div>
      <Front />
      <FoodDisplay />
      <FoodImage />
    </div>
  );
};

export default StoreSection;
