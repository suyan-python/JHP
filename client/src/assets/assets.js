import med from "./med.jpg";
import med2 from "./med2.JPG";
import drip2 from "./prodc/drip2.JPG";
import drip3 from "./prodc/drip3.JPG";
import dripHover from "./prodc/driphover.jpeg";
import pack2 from "./prodc/pack2.JPG";
import pack5 from "./prodc/pack5.JPG";

import red from "./prodc/red.JPG";
import blue from "./prodc/blue.JPG";
import pack12 from "./prodc/pack12.JPG";
import pack12hover from "./prodc/pack12hover.JPG";
import pack13 from "./prodc/pack13.JPG";

import red2 from "./prodc/red2.JPG";
import blue2 from "./prodc/blue2.JPG";

export const food_list = [
  {
    _id: 1,
    name: "Cold Brew Premium",
    image: red2,
    hoverImage: pack5,
    price: 1200,
    description:
      "Smooth, clean, and refreshing — perfect for iced coffee lovers.",
    category: "coffee",
    flavors: ["WASHED"],
    type: "cold brew",
    pricesBySize: {
      250: 1200,
      500: 2500,
      1000: 4000,
    },
    rating: 4.8,
    reviews: 87,
  },
  {
    _id: 2,
    name: "Cold Brew Premium",
    image: blue2,
    hoverImage: pack5,
    price: 1500,
    description: "Fruity, bold, and vibrant — a refreshing twist on cold brew.",
    category: "coffee",
    flavors: ["ANEROBIC"],
    type: "cold brew",
    pricesBySize: {
      250: 1500,
      500: 3200,
      1000: 6000,
    },
    rating: 4.4,
    reviews: 53,
  },
  {
    _id: 3,
    name: "Drip Box",
    image: drip2,
    hoverImage: dripHover,
    price: 565,
    description: "Convenient 5-pack sachets with clean, bright flavors.",
    category: "coffee",
    flavors: ["WASHED"],
    type: "drip box",
    pricesBySize: {
      70: 565,
    },
    rating: 4.8,
    reviews: 96,
  },
  {
    _id: 4,
    name: "Drip Box",
    image: drip2,
    hoverImage: dripHover,
    price: 850,
    description: "Easy-brew sachets packed with fruity, bold flavors.",
    category: "coffee",
    flavors: ["ANEROBIC"],
    type: "drip box",
    pricesBySize: {
      70: 1500,
    },
    rating: 4.9,
    reviews: 100,
  },
  {
    _id: 5,
    name: "Filter Roasted Beans",
    image: pack12,
    hoverImage: pack12hover,
    price: 900,
    description: "Bright, floral, and clean — ideal for filter brews.",
    category: "coffee",
    flavors: ["WASHED"],
    type: "filter roasted",
    pricesBySize: {
      250: 900,
      500: 1800,
      1000: 3200,
    },
    rating: 4.5,
    reviews: 70,
  },
  {
    _id: 6,
    name: "Filter Roasted Beans",
    image: pack13,
    hoverImage: med,
    price: 1250,
    description: "Fruity, complex, and smooth — crafted for filter brewing.",
    category: "coffee",
    flavors: ["ANEROBIC"],
    type: "filter roasted",
    pricesBySize: {
      250: 1250,
      500: 2700,
      1000: 5000,
    },
    rating: 4.6,
    reviews: 77,
  },
];
