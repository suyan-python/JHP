import med from "./med.jpg";
import med2 from "./med2.JPG";
import drip2 from "./prodc/drip2.JPG";
import drip3 from "./prodc/drip3.JPG";
import pack from "./prodc/pack.JPG";
import pack2 from "./prodc/pack2.JPG";

export const food_list = [
  {
    _id: 1,
    name: "Cold Brew Grounds (Washed)",
    image: pack,
    hoverImage: pack2,
    price: 1200,
    description:
      "A bold, rich espresso made from carefully selected single-origin beans. Perfectly roasted to unlock deep chocolate notes and a smooth crema finish. Ideal for espresso lovers who savor intensity and precision.",
    category: "coffee",
    flavors: ["WASHED", "EXPERIMENTAL"],
    type: "cold brew",
    pricesBySize: {
      250: 1200,
      500: 2500,
      1000: 4000,
    },
  },
  {
    _id: 2,
    name: "Cold Brew Grounds (Anerobic)",
    image: pack,
    hoverImage: pack2,
    price: 1500,
    description:
      "A bold, rich espresso made from carefully selected single-origin beans. Perfectly roasted to unlock deep chocolate notes and a smooth crema finish. Ideal for espresso lovers who savor intensity and precision.",
    category: "coffee",
    flavors: ["ANEROBIC", "EXPERIMENTAL"],
    type: "cold brew",
    pricesBySize: {
      250: 1500,
      500: 3200,
      1000: 6000,
    },
  },

  {
    _id: 3,
    name: "Drip Box (Washed)",
    image: drip2,
    hoverImage: drip3,
    price: 565,
    description:
      "Brew café-quality coffee anywhere with our Drip Box set. Each box contains 5 individually packed sachets (14g each), delivering convenience without compromising flavor. Ideal for travelers, campers, or busy mornings.",
    category: "coffee",
    flavors: ["WASHED", "EXPERIMENTAL"],
    type: "drip box",
  },
  {
    _id: 4,
    name: "Drip Box (Anerobic)",
    image: drip2,
    hoverImage: drip3,
    price: 850,
    description:
      "Brew café-quality coffee anywhere with our Drip Box set. Each box contains 5 individually packed sachets (14g each), delivering convenience without compromising flavor. Ideal for travelers, campers, or busy mornings.",
    category: "coffee",
    flavors: ["ANEROBIC", "EXPERIMENTAL"],
    type: "drip box",
  },

  {
    _id: 5,
    name: "Filter Roasted Washed Coffee Beans",
    image: med2,
    hoverImage: med,
    price: 900,
    description:
      "Artisanally roasted for filter brewing, this coffee brings out vibrant acidity, floral undertones, and a clean finish. Available in 250g, 500g, and 1kg — choose your size and enjoy the purity of the filter roasted.",
    category: "coffee",
    flavors: ["WASHED", "EXPERIMENTAL"],
    type: "filter roasted",
    pricesBySize: {
      250: 900,
      500: 1800,
      1000: 3200,
    },
  },
  {
    _id: 6,
    name: "Filter Roasted Anerobic Coffee Beans",
    image: med2,
    hoverImage: med,
    price: 1250,
    description:
      "Artisanally roasted for filter brewing, this coffee brings out vibrant acidity, floral undertones, and a clean finish. Available in 250g, 500g, and 1kg — choose your size and enjoy the purity of the filter roasted.",
    category: "coffee",
    flavors: ["ANEROBIC", "EXPERIMENTAL"],
    type: "filter roasted",
    pricesBySize: {
      250: 1250,
      500: 2700,
      1000: 5000,
    },
  },
];
