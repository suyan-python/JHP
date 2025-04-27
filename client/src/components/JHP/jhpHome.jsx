import React from "react";
import Jewel from "../../assets/jhp.png";
import JHPback from "../../assets/background/herobean.jpg";

export default function JHPHome() {
  return (
    <div className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden rounded-3xl my-36 shadow-lg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-50 blur-sm scale-110"
        style={{
          backgroundImage: `url(${JHPback})`,
        }}
      ></div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-md w-52 h-52 flex items-center justify-center mb-6">
          <img src={Jewel} alt="Jewel Logo" className="object-contain h-full" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-snug drop-shadow-lg animate-fadeIn">
          From Seeds to Cup
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl lg:text-2xl text-slate-200 max-w-2xl leading-relaxed animate-fadeIn delay-200">
          <strong className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 text-transparent bg-clip-text">
            Jewel Himalayan Products (JHP)
          </strong>{" "}
          delivers premium Nepali Arabica coffee to connoisseurs worldwide,
          celebrating the expertise of our hardworking farmers.
        </p>
      </div>
    </div>
  );
}
