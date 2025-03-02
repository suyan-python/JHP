import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { Story } from "./components/Story";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";
import ExploreMenu from "./components/ExploreMenu/ExploreMenu";

function App() {
  const [category, setCategory] = useState("All");
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        {/* <FeaturedProducts /> */}
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <Story />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
