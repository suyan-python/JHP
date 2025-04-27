import React, { useEffect } from "react";
import { ExternalLink } from "lucide-react";

function Parent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-white via-gray-100 to-gray-300 px-6 text-center my-36 rounded-3xl shadow-2xl">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 animate-fade-in">
          Discover Our Story
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed animate-fade-in delay-150">
          Journey through the rich heritage and passion behind{" "}
          <span className="text-blue-600 font-semibold">
            Jewel Himalayan Products
          </span>{" "}
          — bringing the finest treasures from the heart of the Himalayas to
          you.
        </p>

        <a
          href="https://about.jewelhimalayanproducts.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-xl animate-fade-in delay-300"
        >
          Visit Our Parent Company
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      {/* Optional Decorative Element */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
    </div>
  );
}

export default Parent;
