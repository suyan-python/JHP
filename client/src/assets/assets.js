import basket_icon from "./basket_icon.png";
import logo from "./logo.png";
import header_img from "./header_img.png";
import search_icon from "./search_icon.png";
import menu_1 from "./coffee.jpeg";
import menu_2 from "./noncaf.jpeg";
import menu_3 from "./menu_3.png";
import menu_4 from "./menu_4.png";
import menu_5 from "./blended.jpeg";
import menu_6 from "./menu_6.png";
import menu_7 from "./menu_7.png";
import menu_8 from "./momo.jpeg";
import menu_9 from "./menu_8.png";
import menu_10 from "./menu_8.png";
import menu_11 from "./pizza.jpeg";
import menu_12 from "./menu_8.png";
import menu_13 from "./corn.jpeg";
import menu_14 from "./menu_8.png";
import menu_15 from "./pasta.jpeg";
import menu_16 from "./menu_8.png";
import menu_17 from "./menu_8.png";
import menu_18 from "./menu_8.png";
import menu_19 from "./menu_8.png";
import menu_20 from "./menu_8.png";

import food_1 from "./image1.png";
import med from "./med.jpg";
import med2 from "./med2.JPG";
import drip from "./prodc/drip.JPG";
import drip2 from "./prodc/drip2.JPG";
import drip3 from "./prodc/drip3.JPG";
import pack from "./prodc/pack.JPG";
import pack2 from "./prodc/pack2.JPG";
import dripH from "./dripH.JPG";
import special from "./special.JPG";
import specialH from "./specialH.JPG";
import med3 from "./med3.png";
import food_2 from "./food_2.png";
import food_3 from "./america.jpeg";
import food_4 from "./america.jpeg";
import food_5 from "./cappa.jpeg";
import food_6 from "./food_6.png";
import food_7 from "./food_7.png";
import food_8 from "./food_8.png";
import food_9 from "./food_9.png";
import food_10 from "./food_10.png";
import food_11 from "./food_11.png";
import food_12 from "./food_12.png";
import food_13 from "./food_13.png";
import food_14 from "./food_14.png";
import food_15 from "./food_15.png";
import food_16 from "./food_16.png";
import food_17 from "./food_17.png";
import food_18 from "./food_18.png";
import food_19 from "./food_19.png";
import food_20 from "./food_20.png";
import food_21 from "./food_21.png";
import food_22 from "./food_22.png";
import food_23 from "./food_23.png";
import food_24 from "./food_24.png";
import food_25 from "./food_25.png";
import food_26 from "./oreokitkat.jpeg";
import food_27 from "./food_27.png";
import food_28 from "./food_28.png";
import food_29 from "./food_29.png";
import food_30 from "./food_30.png";
import food_31 from "./food_31.png";
import food_32 from "./food_32.png";

import hover_1 from "./hover1.png";

import coffee from "./coffee.jpeg";

import add_icon_white from "./add_icon_white.png";
import add_icon_green from "./add_icon_green.png";
import remove_icon_red from "./remove_icon_red.png";
import app_store from "./app_store.png";
import play_store from "./play_store.png";
import linkedin_icon from "./linkedin_icon.png";
import facebook_icon from "./facebook_icon.png";
import twitter_icon from "./twitter_icon.png";
import cross_icon from "./cross_icon.png";
import selector_icon from "./selector_icon.png";
import rating_starts from "./rating_starts.png";
import profile_icon from "./profile_icon.png";
import bag_icon from "./bag_icon.png";
import logout_icon from "./logout_icon.png";
import parcel_icon from "./parcel_icon.png";

export const assets = {
  logo,
  basket_icon,
  header_img,
  search_icon,
  rating_starts,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  app_store,
  play_store,
  linkedin_icon,
  facebook_icon,
  twitter_icon,
  cross_icon,
  selector_icon,
  profile_icon,
  logout_icon,
  bag_icon,
  parcel_icon,
};

export const menu_list = [
  {
    menu_name: "Coffee",
    menu_image: menu_1,
  },
  {
    menu_name: "Non-Coffee",
    menu_image: menu_2,
  },
  {
    menu_name: "Iced Drinks",
    menu_image: menu_3,
  },
  {
    menu_name: "Frosty Favor",
    menu_image: menu_4,
  },
  {
    menu_name: "Blended Items",
    menu_image: menu_5,
  },
  {
    menu_name: "Chicken MO:MO",
    menu_image: menu_6,
  },
  {
    menu_name: "Paneer MO:MO",
    menu_image: menu_7,
  },
  {
    menu_name: "Buff MO:MO",
    menu_image: menu_8,
  },
  {
    menu_name: "Tibetan Veg MO:MO",
    menu_image: menu_9,
  },
  {
    menu_name: "Tibetan Chicken MO:MO",
    menu_image: menu_10,
  },
  {
    menu_name: "Pizza",
    menu_image: menu_11,
  },
  {
    menu_name: "Early Bites",
    menu_image: menu_12,
  },
  {
    menu_name: "Quick Bites",
    menu_image: menu_13,
  },
  {
    menu_name: "Spaghetti",
    menu_image: menu_14,
  },
  {
    menu_name: "Pasta",
    menu_image: menu_15,
  },
  {
    menu_name: "Chowmein",
    menu_image: menu_16,
  },
  {
    menu_name: "Wrap",
    menu_image: menu_17,
  },
  {
    menu_name: "Burritos",
    menu_image: menu_18,
  },
  {
    menu_name: "Nachos",
    menu_image: menu_19,
  },
  {
    menu_name: "Rice Menu",
    menu_image: menu_20,
  },
];

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
      "Artisanally roasted for filter brewing, this coffee brings out vibrant acidity, floral undertones, and a clean finish. Available in 250g, 500g, and 1kg — choose your size and enjoy the purity of the washed process.",
    category: "coffee",
    flavors: ["WASHED", "EXPERIMENTAL"],
    type: "washed process",
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
      "Artisanally roasted for filter brewing, this coffee brings out vibrant acidity, floral undertones, and a clean finish. Available in 250g, 500g, and 1kg — choose your size and enjoy the purity of the washed process.",
    category: "coffee",
    flavors: ["ANEROBIC", "EXPERIMENTAL"],
    type: "anerobic process",
    pricesBySize: {
      250: 1250,
      500: 2700,
      1000: 5000,
    },
  },
];
