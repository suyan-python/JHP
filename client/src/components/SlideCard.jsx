import React, { useState } from "react";
import prod1 from "../assets/prodc/drip.JPG";
import prod2 from "../assets/prodc/drip2.JPG";
import prod3 from "../assets/prodc/pack2.JPG";
import prod4 from "../assets/med2.JPG";
import farm1 from "../assets/farm/1.JPG";
import farm2 from "../assets/farm/2.JPG";
import farm3 from "../assets/farm/3.JPG";
import farm4 from "../assets/farm/4.JPG";
import farm5 from "../assets/farm/5.JPG";
import farm7 from "../assets/farm/7.JPG";
import brew from "../assets/brew.JPG";

const SlideCard = () => {
  const [stopScroll, setStopScroll] = useState(false);
  const cardData = [
    {
      title: "Unlock Your Creative Flow",
      image: prod2,
    },
    {
      title: "Build with Passion, Ship with Pride",
      image: farm1,
    },
    {
      title: "Think Big, Code Smart",
      image: farm2,
    },
    {
      title: "Design Your Digital Future",
      image: prod3,
    },
    {
      title: "Think Big, Think Drip",
      image: farm3,
    },
    {
      title: "Think Big, Think Drip",
      image: farm4,
    },
    {
      title: "Think Big, Think Drip",
      image: prod4,
    },
    {
      title: "Think Big, Think Drip",
      image: farm5,
    },
    {
      title: "Think Big, Think Drip",
      image: farm7,
    },
    {
      title: "Think Big, Think Drip",
      image: brew,
    },
  ];

  return (
    <>
      <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

      <div
        className="overflow-hidden w-full relative max-w-full mx-auto rounded-3xl my-24"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#F5F7FF] to-transparent" />
        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: cardData.length * 2500 + "ms",
          }}
        >
          <div className="flex">
            {[...cardData, ...cardData].map((card, index) => (
              <div
                key={index}
                className="w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300"
              >
                <img
                  src={card.image}
                  alt="card"
                  className="w-full h-full object-cover"
                />
                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20">
                  <p className="text-white text-lg font-semibold text-center">
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

export default SlideCard;
