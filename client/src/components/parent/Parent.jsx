import React, { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import backgroundImage from "../../assets/background/aboutus.JPG";

function Parent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center h-[80vh] md:h-[85vh] my-40 px-6 text-center text-white rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-2xl"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full px-4 py-16 sm:py-20 lg:py-24">
        <h1 className="header text-5xl sm:text-4xl md:text-7xl font-serif font-bold tracking-tight mb-6 animate-fade-in">
          Discover Our Story
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-10 leading-relaxed animate-fade-in delay-150">
          Journey through the rich heritage and passion behind{" "}
          <span className="text-[#b3e5ff] font-semibold">
            Jewel Himalayan Products
          </span>{" "}
          — bringing the finest treasures from the heart of the Himalayas to
          you.
        </p>

        <a
          href="https://jewelhimalayanproducts.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-md hover:shadow-lg animate-fade-in delay-300 text-sm sm:text-base"
        >
          Parent Company
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Decorative Glow Circles */}
      <div className="absolute top-[-60px] left-[-60px] w-64 h-64 bg-blue-400 rounded-full blur-[110px] opacity-20 z-0"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 bg-pink-400 rounded-full blur-[110px] opacity-20 z-0"></div>
    </div>
  );
}

export default Parent;
