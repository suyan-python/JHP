import React from "react";

import JavaLogo from "../assets/partners/Java.jpg";
import Ama from "../assets/partners/ama.jpg";
import arabica from "../assets/partners/arabica.jpeg";
import barista from "../assets/partners/barista.jpeg";
import ektafe from "../assets/partners/ektafe.png";
import mama from "../assets/partners/mama.png";

const Partners = () =>
{
  const partnerLogos = [
    JavaLogo,
    Ama,
    arabica,
    barista,
    ektafe,
    mama,
  ];

  return (
    <>
      <section className="relative overflow-hidden py-20 px-4 sm:px-8 bg-gradient-to-br from-brownn/50 via-yellow-900/30 to-brownn/70 rounded-3xl shadow-2xl">
        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
            Trusted by Our Valued Partners
          </h2>
          <p className="text-white/80 mb-12 text-base sm:text-lg max-w-2xl mx-auto">
            We proudly collaborate with top-tier coffee brands to deliver excellence and authenticity in every cup.
          </p>

          {/* Logo Carousel */}
          <div className="relative overflow-hidden select-none">
            {/* Fading Edges */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-20" />

            <div
              className="marquee-wrapper overflow-hidden"
              onMouseEnter={(e) =>
                (e.currentTarget.querySelector(".marquee-inner").style.animationPlayState = "paused")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.querySelector(".marquee-inner").style.animationPlayState = "running")
              }
            >
              <div
                className="marquee-inner flex items-center gap-20 min-w-[200%] py-4"
                style={{
                  animationDuration: "35s",
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
                    className="h-24 sm:h-28 w-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-110"
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
