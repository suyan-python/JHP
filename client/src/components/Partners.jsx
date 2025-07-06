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
  ];

  return (
    <>
      <section className="relative overflow-hidden py-16 px-6">
        <div className="absolute inset-0 bg-black/20  rounded-3xl mx-4 sm:mx-12 md:mx-24 lg:mx-32 shadow-2xl border border-white/20" />

        <div className="relative max-w-7xl mx-auto text-center py-12 px-6">
          <h2 className="header text-5xl font-extrabold text-white drop-shadow mb-4">
            We deliver to our partners
          </h2>
          <p className="text-white/80 mb-10 max-w-xl mx-auto">
            Proudly collaborating with top brands to bring you the best coffee
            experience.
          </p>

          <div className="relative overflow-hidden select-none">
            {/* Left Gradient Fade */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black/50 to-transparent z-20 rounded-l-3xl" />
            {/* Right Gradient Fade */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black/50 to-transparent z-20 rounded-r-3xl" />

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
                    className="h-20 w-auto object-contain filter drop-shadow-lg transition duration-500"
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
