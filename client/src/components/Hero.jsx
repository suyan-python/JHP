import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import img1 from "../assets/farm/1.JPG";
import img2 from "../assets/farm/2.JPG";
import img3 from "../assets/farm/3.JPG";
import img4 from "../assets/farm/4.JPG";
import img5 from "../assets/farm/5.JPG";
import img6 from "../assets/farm/6.JPG";
import img7 from "../assets/farm/7.JPG";
import img8 from "../assets/farm/8.JPG";
import img9 from "../assets/farm/9.JPG";

import SlideCard from "./SlideCard";
import { Story } from "./Story";
import Partners from "./Partners";
import { WhyJHP } from "./Hero2";
import TrustedBy from "./TrustedBy";

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
    <div className="relative overflow-hidden my-20 sm:my-32 md:my-40 rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] shadow-xl">
      {/* Background Slideshow */}
      <div className="absolute inset-0 h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[95vh]">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] transition-opacity duration-[2000ms] ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-[30px] sm:rounded-[40px] lg:rounded-[60px]" />
      </div>

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-10 h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[95vh] text-white"
        id="home"
      >
        <h1 className=" animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold mb-4 sm:mb-6 leading-tight drop-shadow-lg">
          Discover the Art of Fine Coffee
        </h1>
        <p className="animate-fade-in-up text-base sm:text-lg md:text-xl mb-8 text-white/90 max-w-2xl drop-shadow-md">
          Jewel Himalayan Products (JHP) brings you 100% premium organic Arabica
          beans, empowering local farmers with expert support in cultivation and
          processing.
        </p>
        <NavLink
          to="/store"
          className="animate-fade-in-up inline-block border border-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black px-8 py-3 sm:px-10 sm:py-4 rounded-full text-lg sm:text-xl font-semibold transition-all duration-300"
        >
          Order Coffee Beans
        </NavLink>
      </div>

      {/* Rest of homepage sections */}
      <SlideCard />
      <Story />
      <Partners />
      <WhyJHP />
      <TrustedBy />

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease both;
        }
      `}</style>
    </div>
  );
};

export default HomeHero;
