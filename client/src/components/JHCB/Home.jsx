import React from "react";
import Button from "../layout/Button";
import { Link } from "react-router-dom";

function JHCBHome1() {
  return (
    <div className="bg-aboutback bg-cover bg-center rounded-3xl my-36">
      <div className="flex flex-col lg:flex-row h-full rounded-3xl shadow-xl py-16 lg:py-56">
        {/* Text Area */}
        <div className="text-area flex flex-col lg:w-3/4 text-center lg:text-left justify-center items-center lg:items-start px-5 lg:px-10 bg-black text-white mx-7 py-4 bg-opacity-40 rounded-sm">
          {/* Logo / Slogan */}
          <div className="slog rounded-full flex w-full lg:w-3/4 justify-center lg:justify-start py-2 gap-3 mb-4">
            <h1 className="text-2xl lg:text-3xl font-semibold">
              Jewel Himalayan Coffee Beans
            </h1>
          </div>

          {/* Title */}
          <div className="title text-2xl md:text-3xl lg:text-5xl py-3 font-medium w-full lg:w-3/4">
            Premium Arabica Coffee from the Himalayas
          </div>

          {/* Description */}
          <div className="description text-slate-200 text-xs sm:text-sm lg:text-base w-full lg:w-2/3 font-medium">
            We source our delicious, premium Arabica from our sister company,
            Jewel Himalayan Coffee Beans (JHCB), in Province No 1, Ilam
            district.
          </div>

          {/* Call to Action */}
          <div className="book py-4">
            <Link to="/contact">
              <Button
                className="font-medium text-green-400 hover:text-green-500"
                title="Contact JHP for Premium Arabica from the Himalaya"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JHCBHome1;
