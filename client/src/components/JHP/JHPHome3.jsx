import React from "react";
import farmImage from "../../assets/farm.jpeg";
import roastingImage from "../../assets/beans.jpg";
import brewingImage from "../../assets/women3.jpg";

function JHPHome3() {
  return (
    <div
      className="bg-gradient-to-l from-[#6A3E36] via-[#9B5E55] to-[#F0B67F]
 py-12 px-6 lg:px-20 rounded-lg my-28"
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-10">
        Our Coffee Journey
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Step 1: Farming */}
        <div className="flex flex-col items-center">
          <img
            src={farmImage}
            alt="Farm"
            className="w-full h-48 lg:h-64 object-cover rounded-lg shadow-lg"
          />
          <h3 className="text-xl font-semibold text-white mt-4">Farming</h3>
          <p className="text-center text-white font-medium">
            Our coffee beans are grown sustainably on organic farms in Illam,
            with care for the environment and local communities.
          </p>
        </div>

        {/* Step 2: Roasting */}
        <div className="flex flex-col items-center">
          <img
            src={roastingImage}
            alt="Roasting"
            className="w-full h-48 lg:h-64 object-cover rounded-lg shadow-lg"
          />
          <h3 className="text-xl font-semibold text-white mt-4">Roasting</h3>
          <p className="text-center text-white font-medium">
            We roast our beans with precision, using techniques that enhance the
            natural flavors and create a smooth, rich taste.
          </p>
        </div>

        {/* Step 3: Brewing */}
        <div className="flex flex-col items-center">
          <img
            src={brewingImage}
            alt="Brewing"
            className="w-full h-48 lg:h-64 object-cover rounded-lg shadow-lg"
          />
          <h3 className="text-xl font-semibold text-white mt-4">Brewing</h3>
          <p className="text-center text-white font-medium">
            Enjoy our expertly brewed coffee, perfected by generations of
            farmers and craftsmen, in every cup you savor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default JHPHome3;
