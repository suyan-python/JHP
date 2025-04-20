import React from "react";
import Cafe from "../../assets/background/cafe.jpg";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

function Home() {
  return (
    <>
      <div className="bg-orange-50 py-16 lg:py-32 rounded-b-[50px] lg:rounded-b-[70px] shadow-lg mt-36">
        <div className="flex flex-col lg:flex-row justify-around px-8 lg:px-44 gap-10 lg:gap-20 items-center">
          {/* Text Area */}
          <div className="text-area text-center lg:text-left py-10 lg:py-16">
            <div className="">
              <div className="title font-semibold lg:text-[68px] text-gray-800">
                Welcome to iNaya Cafe
              </div>
              <div className="description my-4 text-gray-600 text-base lg:text-lg text-justify">
                Discover the story of iNaya Cafe, where passion for coffee meets
                the comfort of home. Our mission is to bring delightful brews to
                your doorstep.
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 lg:mt-20 flex flex-col lg:flex-row gap-6 items-center">
              <Link to={"home"}>
                <button className="flex items-center font-medium  gap-4 explore-our-story bg-brightColor text-white text-sm lg:text-xl px-6 py-3 rounded-full hover:bg-orange-500 transition duration-300">
                  Order Now
                  <div className="bg-white p-2 rounded-full  text-brightColor">
                    <MdArrowOutward />
                  </div>
                </button>
              </Link>
              {/* <button className="meet-the-team text-orange-600 text-sm lg:text-base hover:text-orange-800 transition duration-300">
                Meet the Team →
              </button> */}
            </div>

            {/* Statistics */}
            <div className="flex flex-col lg:flex-row mt-10 lg:mt-14 gap-8 justify-center lg:justify-start">
              <div className="text-center">
                <div className="title text-3xl font-bold text-gray-900">
                  100K+
                </div>
                <div className="description text-sm text-gray-600">
                  Cups Served
                </div>
              </div>
              <div className="text-center">
                <div className="title text-3xl font-bold text-gray-900">
                  500+
                </div>
                <div className="description text-sm text-gray-600">
                  Unique Blends
                </div>
              </div>
              <div className="text-center">
                <div className="title text-3xl font-bold text-gray-900">
                  50+
                </div>
                <div className="description text-sm text-gray-600">
                  Coffee Artisans
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="image-section mt-10 lg:mt-0">
            <div className="relative rounded-tl-[50px] rounded-br-[50px] rounded-tr-[20px] rounded-bl-[20px] shadow-xl overflow-hidden">
              <img
                className="h-[40vh] lg:h-[50vh] object-cover transform transition duration-500 hover:scale-105"
                src={Cafe}
                alt="Cafe"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
