import React from "react";

const products = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1587734005433-8a1fb1aa2d43?auto=format&fit=crop&q=80",
    description:
      "Light roasted, floral and bright with notes of bergamot and citrus",
  },
  {
    id: 2,
    name: "Colombian Supremo",
    price: 18.99,
    image:
      "https://images.unsplash.com/photo-1587734005433-8a1fb1aa2d43?auto=format&fit=crop&q=80",
    description:
      "Medium roasted, smooth with caramel sweetness and nutty undertones",
  },
  {
    id: 3,
    name: "Sumatra Mandheling",
    price: 21.99,
    image:
      "https://images.unsplash.com/photo-1587734005433-8a1fb1aa2d43?auto=format&fit=crop&q=80",
    description: "Dark roasted, full-bodied with earthy and spicy notes",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-amber-50" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">
                    ${product.price}
                  </span>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
