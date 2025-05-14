import React, { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import backgroundImage from "../../assets/background/aboutus.JPG";

function Parent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center h-[72vh] my-40 rounded-3xl px-6 text-center text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${backgroundImage})`,
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 max-w-3xl w-full py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in">
          Discover Our Story
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed animate-fade-in delay-150">
          Journey through the rich heritage and passion behind{" "}
          <span className="text-blue-400 font-semibold">
            Jewel Himalayan Products
          </span>{" "}
          — bringing the finest treasures from the heart of the Himalayas to
          you.
        </p>

        <a
          href="https://about.jewelhimalayanproducts.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-md hover:shadow-lg animate-fade-in delay-300"
        >
          Visit Parent Company
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Optional Decorative Blurs */}
      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-blue-400 rounded-full blur-[120px] opacity-20 z-0"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-pink-400 rounded-full blur-[120px] opacity-20 z-0"></div>
    </div>
  );
}

export default Parent;
