import React from "react";

import JavaLogo from "../assets/partners/Java.jpg";
import Ama from "../assets/partners/ama.jpg";

const Partners = () => {
  const partnerLogos = [
    JavaLogo,
    Ama,
    JavaLogo,
    Ama,
    JavaLogo,
    Ama,
    JavaLogo,
    Ama,
    JavaLogo,
    Ama,
    JavaLogo,
    Ama,
    JavaLogo,
    Ama,
  ];

  return (
    <>
      <section className="shadow-lg rounded-3xl py-12">
        <div className="max-w-full mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
            We deliver to our partners
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Proudly collaborating with top brands to bring you the best coffee
            experience.
          </p>

          <div className="relative overflow-hidden select-none">
            {/* Left Gradient Fade */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#f0f4ff] to-transparent z-20" />
            {/* Right Gradient Fade */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#f0f4ff] to-transparent z-20" />

            <div
              className="marquee-inner flex will-change-transform min-w-[200%]"
              style={{
                animationDuration: "18s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationName: "marqueeScroll",
              }}
            >
              <div className="flex items-center space-x-12">
                {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo}
                    alt={`partner-logo-${idx}`}
                    className="h-20 w-auto object-contain filter  transition duration-500"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
};

export default Partners;
