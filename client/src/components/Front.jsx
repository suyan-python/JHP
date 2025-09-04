// pages/HeroSection.jsx
import React, { useState } from "react";
import heroImage1 from "../assets/background/hero/1.png";
import heroImage2 from "../assets/background/hero/2.png";
import heroImage3 from "../assets/background/hero/3.png";
import heroImage4 from "../assets/background/hero/4.png";
import heroImage5 from "../assets/background/hero/5.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Front()
{
    const images = [heroImage2, heroImage1, heroImage4, heroImage5, heroImage3];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttonVisible, setButtonVisible] = useState(true);

    const prevImage = () =>
    {
        setButtonVisible(false);
        setTimeout(() =>
        {
            setCurrentIndex((currentIndex - 1 + images.length) % images.length);
            setButtonVisible(true);
        }, 300);
    };

    const nextImage = () =>
    {
        setButtonVisible(false);
        setTimeout(() =>
        {
            setCurrentIndex((currentIndex + 1) % images.length);
            setButtonVisible(true);
        }, 300);
    };

    return (
        <section className="relative w-full max-w-7xl mx-auto aspect-[21/9]  flex items-end justify-center text-center rounded-3xl overflow-hidden lg:mt-56 mt-32">
            {/* Sliding Images */}
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl ">
                {images.map((img, index) =>
                {
                    const offset = (index - currentIndex) * 100;
                    return (
                        <img
                            key={index}
                            src={img}
                            alt={`Hero ${index}`}
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 rounded-3xl "
                            style={{ transform: `translateX(${offset}%)` }}
                        />
                    );
                })}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition"
            >
                <ChevronRight size={20} />
            </button>

            {/* Text Content with Animation */}
            <div className="z-10 px-4 sm:px-8 max-w-lg sm:max-w-2xl mb-4 sm:mb-8">
                <a href="#products">
                    <button
                        className={`bg-brownn/70 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-2xl font-semibold transition-all duration-500 ${buttonVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                            }`}
                    >
                        SHOP NOW
                    </button>
                </a>
            </div>
        </section>
    );
}

export default Front;
