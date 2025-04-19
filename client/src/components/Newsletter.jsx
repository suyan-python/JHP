import React from "react";

export function Newsletter() {
  return (
    <section className="bg-brownn py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Coffee Club
          </h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, brewing tips, and
            early access to new products.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
