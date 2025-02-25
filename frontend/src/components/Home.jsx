import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import About from "../pages/About";

const Home = () => {
  const fullText = "Connecting Talent with Success!";
  const typingSpeed = 100;

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);


  // Typing effect for the heading
  useEffect(() => {

    // Typing effect logic for the heading text
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <>
      {/* Conditionally render MainNavbar or Navbar */}
      

      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 px-6">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://assets-v2.lottiefiles.com/a/d07c305c-117f-11ee-b58d-d7baacc402de/OXV1AtPqup.gif"
            alt="Find Your Dream Job"
            className="w-3/4 md:w-2/3 rounded-lg shadow-lg mt-10"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800">{text}</h1>
          <p className="text-gray-600 mt-4 text-lg">
            Explore thousands of job opportunities and kickstart your career today.
          </p>
          <Link to="/jobs">
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div><About /></div>
    </>
  );
};

export default Home;
