import React from "react";
// import Link from "next/link";
import speaker from "../../assets/speaker.png";
import working from "../../assets/working.png";

const Banner = () => {
  return (
    <div className="p-14 grid grid-flow-rows grid-cols-12 gap-x-4">
      <div className="col-span-7">
        <h1 className="text-8xl font-medium text-end">React</h1>
        <h1 className="text-8xl font-medium text-end">Conference</h1>
        <div className="grid grid-flow-row grid-cols-8 gap-x-8 pt-6">
          <img src={speaker.src} className="col-span-3" />
          <div className="col-span-5">
            <p className="text-lg leading-8">
              Lorem uis diam turpis quam id fermentum.In quis diam turpis quam
              id fermentum..id fermentum.In quis diam turpis quam id fermentum.{" "}
            </p>
            <button className="mt-6 bg-primary-1 w-48 text-center px-4 py-3 rounded-full text-lg">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-5 pt-28">
        <img src={working.src} className="col-span-3" />
      </div>
    </div>
  );
};

export default Banner;
