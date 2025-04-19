import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function Story() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      id="story"
      className="relative w-full bg-brownn text-white overflow-hidden py-20 px-4 md:px-12 my-8 rounded-2xl"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div
          className="relative h-[400px] md:h-[550px] w-full rounded-xl overflow-hidden shadow-2xl"
          data-aos="fade-right"
        >
          <img
            src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80"
            alt="Roasting beans"
            className="w-full h-full object-cover"
          />
          {/* Optional overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        </div>

        {/* Right Text */}
        <div data-aos="fade-left" className="z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-[#f4eadd]">
            Our Journey into the Brew
          </h2>
          <p className="text-lg text-[#ddd6cc] leading-relaxed mb-5">
            From the misty highlands of Illam to the cozy corners of our café,
            every bean we roast has a story to tell. Brew Haven began with a
            vision: brew bold, brew responsibly.
          </p>
          <p className="text-lg text-[#ddd6cc] leading-relaxed mb-8">
            We partner with farmers who care for the earth, roast with
            precision, and serve with purpose — so your cup doesn’t just taste
            good, it does good.
          </p>
          <button className="bg-[#f4eadd] hover:bg-[#ddcdb7] text-[#3e2c1c] px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
