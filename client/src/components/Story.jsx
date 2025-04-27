import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function Story() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      id="ourstory"
      className="relative w-full bg-brownn text-white overflow-hidden py-16 px-4 sm:px-6 md:px-12 my-2 rounded-[40px] sm:rounded-[50px] lg:rounded-[70px]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div
          className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-2xl"
          data-aos="fade-right"
        >
          <img
            src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80"
            alt="Roasting beans"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        </div>

        {/* Right Text */}
        <div data-aos="fade-left" className="z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight text-[#f4eadd]">
            Our Journey into the Brew
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#ddd6cc] leading-relaxed mb-4">
            From the misty highlands of Illam to the cozy corners of our café,
            every bean we roast has a story to tell. Brew Haven began with a
            vision: brew bold, brew responsibly.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-[#ddd6cc] leading-relaxed mb-6">
            We partner with farmers who care for the earth, roast with
            precision, and serve with purpose — so your cup doesn’t just taste
            good, it does good.
          </p>
          <button className="bg-[#f4eadd] hover:bg-[#ddcdb7] text-[#3e2c1c] px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
