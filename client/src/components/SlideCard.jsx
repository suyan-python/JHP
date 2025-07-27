import React, { useState, useMemo } from "react";
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

const SlideCard = () =>
{
  const [stopScroll, setStopScroll] = useState(false);

  const cardData = useMemo(
    () => [
      { title: "Unlock Your Drip Flow-Sip", image: prod2 },
      { title: "Build with Authenticity", image: farm1 },
      { title: "Think Green, Grown Green", image: farm2 },
      { title: "Build with Passion, Ship with Pride", image: prod3 },
      { title: "Beans made with Hands", image: farm3 },
      { title: "Washed Beans, Unfiltered", image: farm4 },
      { title: "Unfiltered, Washed, Natural", image: prod4 },
      { title: "Roasted with Love", image: farm5 },
      { title: "Where it comes from", image: farm7 },
      { title: "Think Big, Think Brew", image: brew },
    ],
    []
  );

  return (
    <>
      <style>{`
  .marquee-inner {
    animation: marqueeScroll 40s linear infinite;
    will-change: transform;
  }

  @keyframes marqueeScroll {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
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
                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-500 absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-black/30 to-transparent bg-transparent  rounded-3xl">
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

export default SlideCard;
