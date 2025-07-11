import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import brew from "../assets/brew.jpg";
import { NavLink } from "react-router-dom";

export function Story() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section
      id="ourstory"
      className="relative w-full bg-[#3e2c1c] text-white overflow-hidden py-20 px-6 sm:px-10 md:px-16 my-24 rounded-[40px] sm:rounded-[50px] lg:rounded-[70px]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Image with rich overlay */}
        <div
          className="relative h-[320px] sm:h-[400px] md:h-[520px] w-full rounded-[30px] overflow-hidden shadow-2xl"
          data-aos="fade-right"
        >
          <img
            src={brew}
            alt="Coffee Brewing"
            className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Story Text */}
        <div data-aos="fade-left">
          <h2 className="header text-5xl sm:text-5xl font-serif font-semibold mb-6 text-[#f4eadd] leading-snug tracking-tight">
            Our Journey into the Brew
          </h2>
          <p className="text-lg sm:text-xl text-[#e8ddd1] mb-4 leading-relaxed font-light">
            From the misty highlands of Illam, Nepal, our organic Arabica coffee
            beans begin their journey—handpicked by local farmers who carry
            generations of tradition and care in every harvest.
          </p>
          <p className="text-lg sm:text-xl text-[#e8ddd1] mb-8 leading-relaxed font-light">
            Each batch is artisanally roasted to highlight the unique flavor of
            Himalayan coffee. Rooted in sustainability and crafted with heart,
            every cup brings the pure taste of Nepal from our farms to your
            brew.
          </p>
          <NavLink to={"/parent"}>
            <button className="header bg-[#f4eadd] hover:bg-[#e0cdb9] text-[#3e2c1c] px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
