import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[url(/home-bg.gif)] bg-no-repeat bg-cover h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">

      {/* Left Card */}
      <div className="absolute md:left-20 bottom-10 md:bottom-20 bg-white/30 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg w-full md:w-[40%] max-w-lg text-center md:text-left">
        <h1 className="text-3xl md:text-4xl pb-3 font-semibold text-zinc-800">
          "Unlock Your Dream Career"
        </h1>
        <h2 className="text-lg md:text-2xl pb-3 font-medium text-zinc-500">
          <i>Explore exciting opportunities and take the next step in your journey.</i>
        </h2>
        <Link to="/about">
          <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-lg px-5 py-2.5">
            Get Started
          </button>
        </Link>
      </div>

      {/* Right Card */}
      <div className="absolute md:right-20 top-10 md:top-20 bg-white/30 backdrop-blur-md p-6 md:p-10 rounded-lg shadow-lg w-full md:w-[40%] max-w-lg text-center md:text-left">
        <h1 className="text-3xl md:text-4xl pb-3 font-semibold text-zinc-800">
          "Find Top Talent Effortlessly"
        </h1>
        <h2 className="text-lg md:text-2xl pb-3 font-medium text-zinc-500">
          <i>Connect with skilled professionals and grow your team. Build a workforce that takes your business to new heights!</i>
        </h2>
      </div>

    </div>
  );
};

export default Home;
