import Button from "../layout/Button.jsx";
import { Link } from "react-router-dom";
import iNaya from "../../assets/inaya.png";
import JHCB from "../../assets/JHCB.jpg";

function JHPHome2() {
  return (
    <div className="  ">
      {/* <div className="mt-32 text-center font-medium text-5xl text-red-700">
        Our Businesses
      </div> */}
      <div className="lg:flex justify-around h-full py-2 mb-32 gap-10 ">
        {/* JHCB Section */}
        <div className="relative bg-farm bg-cover w-full rounded-2xl shadow-lg overflow-hidden py-10 p-10 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center h-96 gap-6  md:p-8 bg-black bg-opacity-10 hover:bg-opacity-30 rounded-2xl text-white text-center transition transform hover:scale-105">
            {/* Title Section with Logo */}

            <div className="title flex justify-center ">
              <div className="flex flex-col items-center justify-center gap-4 text-3xl md:text-4xl font-semibold bg-red-">
                <div className="w-16 md:w-36 ">
                  <img
                    className="rounded-2xl shadow-lg"
                    src={JHCB}
                    alt="JHCB Logo"
                  />
                </div>
              </div>
            </div>

            {/* Visit Farm Button */}
            <Link to="/farming">
              <Button
                className="font-semibold text-lg md:text-2xl text-white bg-green-700 bg-opacity-40 px-6 py-3 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
                title="Visit Our Farm"
              />
            </Link>
          </div>
        </div>

        {/* Mystical Section */}
        <div className="two rounded-2xl p-3 w-full  h-[72vh] bg-mystical bg-cover  flex flex-col text-center justify-center gap-6 shadow-xl my-7 ">
          <div className="title flex justify-center">
            {/* <div className="text font-medium text-3xl md:text-5xl">
              Coffee Trading
            </div> */}
          </div>
        </div>

        {/* iNaya Cafe Section */}
        <div className="bg-cafe w-full rounded-2xl shadow-lg bg-cover p-5 md:p-8 lg:p-10 flex flex-col justify-center items-center">
          <div className="rounded-2xl h-96 flex flex-col text-center justify-center gap-6 bg-black bg-opacity-20  p-6 md:p-8 lg:p-10 shadow-lg transition transform hover:scale-105 hover:bg-opacity-30">
            <div className="images flex justify-center">
              <img
                className="w-1/2 rounded-2xl transition-transform transform hover:scale-105 bg-white"
                src={iNaya}
                alt="iNaya"
                loading="lazy"
              />
            </div>

            <div className="title flex justify-center">
              <div className="text font-semibold text-lg md:text-2xl lg:text-3xl text-white bg-orange-400  p-2 md:px-4 rounded-full shadow-sm  transition duration-300 animated-gradient-text">
                Food, Coffee, Conversation
              </div>
            </div>

            <Link to={"/inaya"}>
              <Button
                className="font-semibold text-lg md:text-2xl text-white bg-green-700 bg-opacity-40 px-6 py-3 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
                title="Visit Us"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JHPHome2;
