import React from "react";

export function Story() {
  return (
    <section className="my-12 py-20 bg-white" id="story">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80"
              alt="Coffee roasting process"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-amber-900">
              Our Story
            </h2>
            <p className="text-gray-600 mb-6">
              Founded in 2020, Brew Haven began with a simple mission: to bring
              the world's finest coffee to your cup. Our journey started in the
              heart of Seattle's coffee culture, where our master roasters
              perfected the art of bringing out the unique character of each
              bean.
            </p>
            <p className="text-gray-600 mb-6">
              We work directly with farmers across the globe, ensuring fair
              trade practices and sustainable farming methods. Every bean is
              carefully selected, roasted to perfection, and delivered fresh to
              your doorstep.
            </p>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
