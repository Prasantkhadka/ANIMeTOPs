import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-hero bg-cover bg-center bg-no-repeat w-full min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] lg:h-[811px] flex items-center px-4 sm:px-8 md:px-16">
      <div className="flex flex-col justify-center max-w-[777px] w-full text-center sm:text-left">
        <h1 className="font-extrabold leading-tight uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-md">
          <span className="block">Unleash</span>
          <span className="block">your</span>
          <span className="block">inner</span>
          <span className="block">hero</span>
        </h1>

        <Link
          to="/collection"
          className="inline-flex justify-center sm:justify-start bg-tertiary text-white font-bold mt-8 py-3 sm:py-4 px-6 sm:px-8 text-lg sm:text-xl rounded-xl hover:bg-tertiary/90 transition-all duration-300 w-full sm:w-auto mx-auto sm:mx-0"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;

{
  /* <h3 className="h3 text-secondary font-paci font-thin">
          Wear Your Fandom. Rule the Streets.
        </h3>
        <h2 className="h2 !mb-0 tracking-[0.22rem]">
          Discover premium anime-inspired tops. Limited drops. 40% off!
        </h2>
        <h1 className="h1 max-w-[699px] font-[800] leading-none">
          On Tees & Hoodies
        </h1>
        <div className="flex items-center">
          <h3 className="h3">Starting at</h3>
          <span className="px-1 inline-block rotate-[-2deg] ml-2.5 !bold-40">
            <span className="text-2xl relative bottom-3">$</span>49.
            <span className="text-2xl">99</span>
          </span>
        </div> */
}
