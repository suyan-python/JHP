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
      <section className="relative overflow-hidden py-16 px-4 sm:px-8 bg-black/30 rounded-3xl ">
        {/* Glass Background Panel */}
        <div className="absolute inset-0 mx-2 sm:mx-8 md:mx-16 shadow-2xl" />

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto text-center py-12 px-4 sm:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow mb-4">
            We deliver to our partners
          </h2>
          <p className="text-white/80 mb-10 max-w-xl mx-auto text-sm sm:text-base">
            Proudly collaborating with top brands to bring you the best coffee
            experience.
          </p>

          {/* Logo Carousel */}
          <div className="relative overflow-hidden select-none">
            {/* Fading edges */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-black/50 to-transparent z-20 rounded-l-3xl" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-black/50 to-transparent z-20 rounded-r-3xl" />

            <div
              className="marquee-wrapper overflow-hidden"
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationPlayState = "paused")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.animationPlayState = "running")
              }
            >
              <div
                className="marquee-inner flex items-center gap-12 sm:gap-16 min-w-[200%] py-2"
                style={{
                  animationDuration: "24s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationName: "marqueeScroll",
                }}
              >
                {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo}
                    alt={`partner-logo-${idx}`}
                    className="h-16 sm:h-20 w-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animation */}
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
