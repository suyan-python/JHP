import React, { useState, useMemo } from "react";
import prod4 from "../../assets/prodc/pack4.JPG";

import prod2 from "../../assets/prodc/drip2.JPG";
import prod3 from "../../assets/prodc/pack3.JPG";
import prod5 from "../../assets/prodc/pack5.JPG";
import prod6 from "../../assets/prodc/pack6.JPG";
import prod7 from "../../assets/prodc/pack7.JPG";
import prod8 from "../../assets/prodc/pack8.JPG";
import prod9 from "../../assets/prodc/pack9.JPG";
import prod10 from "../../assets/prodc/pack10.JPG";
import prod11 from "../../assets/prodc/pack11.avif";

const FoodImage = () => {
  const [stopScroll, setStopScroll] = useState(false);

  const cardData = useMemo(
    () => [
      { title: "Packed With Love and Beans", image: prod6 },
      { title: "Build with Passion, Ship with Pride", image: prod7 },
      { title: "Unlock Your Drip Flow-Sip", image: prod2 },
      { title: "Packed with style", image: prod3 },
      { title: "Authentic Beans", image: prod5 },
      { title: "Buy me Open me", image: prod4 },
      { title: "Packed With Love and Beans", image: prod6 },
      { title: "Authentic Beans", image: prod5 },
      { title: "Build with Passion, Ship with Pride", image: prod7 },
      { title: "Packed with style", image: prod3 },
      { title: "Family Pack, Packed with Love", image: prod8 },
      { title: "Buy me Open me", image: prod9 },
      { title: "Mystical at your doorsteps", image: prod10 },
      { title: "Build with Passion, Ship with Pride", image: prod11 },
    ],
    []
  );

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
          will-change: transform;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="overflow-hidden w-full relative max-w-full mx-auto rounded-3xl mb-24 mt-7"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#F5F7FF] to-transparent" />

        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: `${cardData.length * 2500}ms`,
          }}
        >
          <div className="flex">
            {[...cardData, ...cardData].map((card, index) => (
              <div
                key={index}
                className="w-64 mx-4 h-[26rem] relative group hover:scale-95 hover:-rotate-1 transition-transform duration-500 shadow-xl rounded-3xl overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-500 absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-black/30 to-transparent bg-transparent rounded-3xl">
                  <p className="text-white text-lg md:text-xl font-bold text-center drop-shadow-md">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#F5F7FF] to-transparent" />
      </div>
    </>
  );
};

export default FoodImage;
