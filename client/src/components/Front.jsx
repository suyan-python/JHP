// pages/HeroSection.jsx
import React from "react";
import heroImage from "../assets/background/hero.jpeg"; // <-- adjust path if needed

function Front()
{
    return (
        <section
            className="relative w-full h-[500px] md:h-[500px] flex items-end justify-center text-center rounded-3xl overflow-hidden mt-48 bg-black"
        >
            {/* Background Image */}
            <img
                src={heroImage}
                alt="Coffee Background"
                className="absolute inset-0 w-full h-full object-cover px-16"
            />

            {/* Overlay for darkening */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-10"></div> */}

            {/* Text Content */}
            <div className="z-10 px-6 md:px-12 text-white max-w-3xl  mb-5">
                {/* <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                    SALE
                </h1>
                <h2 className="text-xl md:text-2xl italic mb-6 drop-shadow-md">
                    COLOMBIA COFFEE
                </h2>
                <p className="text-lg md:text-xl mb-6 font-light">
                    Wszystkie kawy z Kolumbii <strong>taniej o 10%</strong>
                </p> */}
                <button className="hero bg-gradient-to-l from-[#d7dee2] via-[#d7dee2] to-[#ffff] text-black  px-4 py-2 rounded-2xl font-semibold hover:bg-gray-200 transition">
                    <a href="#products">


                        SHOP NOW
                    </a>
                </button>
            </div>
        </section>
    );
}

export default Front;
