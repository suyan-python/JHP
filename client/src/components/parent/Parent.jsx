import React, { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import backgroundImage from "../../assets/background/aboutus.JPG";
import shekhar from "../../assets/people/shekhar.jpg";
import binayak from "../../assets/people/binayak.jpg";
import pranit from "../../assets/people/pranit.jpg";
import dilasha from "../../assets/people/dilasha.jpg";

function Parent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[80vh] md:min-h-[85vh] py-24 sm:py-32 max-w-full w-full text-center rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-2xl bg-gradient-to-b from-[#f7f9ff] via-[#fffbee] to-[#f7f9ff] my-36"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full animate-fade-in">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-extrabold tracking-tight mb-6 text-white drop-shadow-lg">
            Discover The Story of{" "}
            <span className="text-[#b3e5ff] font-semibold">
              Jewel Himalayan Products
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-10 leading-relaxed drop-shadow animate-fade-in delay-150">
            Journey through the rich heritage and passion behind{" "}
            <span className="text-[#b3e5ff] font-semibold">
              Jewel Himalayan Products
            </span>{" "}
            — bringing the finest treasures from the heart of the Himalayas to
            you.
          </p>
        </div>

        <a
          href="https://jewelhimalayanproducts.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg animate-fade-in delay-300 text-sm sm:text-base"
        >
          Read Success Stories
          <ExternalLink className="w-4 h-4" />
        </a>

        <div
          aria-label="Photos of leaders"
          className="mt-12 flex flex-wrap md:flex-nowrap justify-center gap-6 max-w-4xl w-full pb-6 px-2 overflow-x-auto md:overflow-visible"
        >
          {[shekhar, binayak, pranit, dilasha].map((src, idx) => (
            <img
              key={idx}
              alt={`JHP Leader ${idx + 1}`}
              className="w-36 sm:w-36 md:w-44 lg:w-56 h-auto aspect-[3/4] rounded-lg object-cover shadow-lg hover:-translate-y-1 transition duration-300 flex-shrink-0"
              src={src}
              width="290"
              height="270"
            />
          ))}
        </div>
      </div>

      {/* Decorative Glow Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-400 rounded-full blur-[120px] opacity-20 z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-pink-400 rounded-full blur-[120px] opacity-20 z-0 animate-pulse-slow"></div>
    </section>
  );
}

export default Parent;
