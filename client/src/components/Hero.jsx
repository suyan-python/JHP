import React, { useState, useEffect } from "react";
import { Story } from "./Story";
import { WhyJHP } from "./Hero2";
import { ExperienceVideo } from "./Hero3";
import { NavLink } from "react-router-dom";

// Import all images
import img1 from "../assets/farm/1.JPG";
import img2 from "../assets/farm/2.JPG";
import img3 from "../assets/farm/3.JPG";
import img4 from "../assets/farm/4.JPG";
import img5 from "../assets/farm/5.JPG";
import img6 from "../assets/farm/6.JPG";
import img7 from "../assets/farm/7.JPG";
import img8 from "../assets/farm/8.JPG";
import img9 from "../assets/farm/9.JPG";
import TrustedBy from "./TrustedBy";
import SlideCard from "./SlideCard";
import Partners from "./Partners";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const HomeHero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative my-40 overflow-hidden rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] ">
      {/* Slideshow Background with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] z-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Dark Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[30px] sm:rounded-[40px] lg:rounded-[60px]" />
      </div>

      {/* Hero Content */}
      <div
        className="relative z-10 flex items-center justify-center text-center px-4 sm:px-6 lg:px-12 h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[72vh] xl:h-[90vh]"
        id="home"
      >
        <div className="max-w-3xl mx-auto text-white drop-shadow-xl">
          <h1 className="header text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Discover the Art of Fine Coffee
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-white/90">
            Jewel Himalayan Products (JHP) delivers 100% premium organic Arabica
            beans while empowering local farmers with expert support in
            cultivation and processing.
          </p>

          <NavLink
            to="/store"
            className="header inline-block border border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-2 sm:py-3 rounded-2xl text-sm sm:text-lg font-semibold transition-all duration-300"
          >
            Order Coffee Beans
          </NavLink>
        </div>
      </div>

      {/* Below Hero Sections */}
      <SlideCard />
      <Story />
      <Partners />
      <WhyJHP />
      {/* <ExperienceVideo /> */}
      <TrustedBy />
    </div>
  );
};

export default HomeHero;
