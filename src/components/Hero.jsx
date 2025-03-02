import React from "react";

export function Hero() {
  return (
    <div className="relative h-screen" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover the Art of Fine Coffee
          </h1>
          <p className="text-xl mb-8">
            Carefully sourced and expertly roasted beans delivered fresh to your
            doorstep
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors">
            <a href="#products">Order Coffee Beans</a>
          </button>
        </div>
      </div>
    </div>
  );
}
