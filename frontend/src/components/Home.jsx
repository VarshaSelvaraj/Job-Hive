import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Home = () => {

  

  return (
    <>
    

      <div className="bg-[url(/home-bg.gif)] bg-no-repeat bg-cover h-screen flex items-center justify-center  relative">

<div className="absolute left-30 bottom-20 bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg w-130">
  <h1 className="text-4xl pb-3 font-semibold text-zinc-800">"Unlock Your Dream Career"</h1>
  <h2 className="text-2xl pb-3 font-medium text-zinc-500"> <i> Explore exciting opportunities and take the next step in your journey</i></h2>
  <Link to="/login">
    <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
      Get Started
    </button>
  </Link>
</div>
<div className="absolute right-30 top-30 bg-white/30 backdrop-blur-md p-10 rounded-lg shadow-lg w-138">
  <h1 className="text-4xl  pb-3 font-semibold text-zinc-800">"Find Top Talent Effortlessly"</h1>
  <h2 className="text-2xl pb-3 font-medium text-zinc-500"><i>Connect with skilled professionals and grow your team</i></h2>
  <Link to="/login">
    <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5">
      Start posting jobs!
    </button>
  </Link>
</div>

</div>
      
    </>
  );
};

export default Home;
