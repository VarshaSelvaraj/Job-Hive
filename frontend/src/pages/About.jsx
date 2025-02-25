
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function About() {
  const fullText = "Your Career, Your Future"; // The text to animate
  const typingSpeed = 100; // Typing speed in milliseconds

  const [text, setText] = useState(""); // State to store the displayed text
  const [index, setIndex] = useState(0); // Tracks current letter index

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, index + 1)); // Update text with next character
        setIndex(index + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout); // Cleanup function
    }
  }, [index, fullText]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">

      {/* Career Section */}
      <div className="text-center max-w-4xl mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {text}
        </h1>
        <p className="text-lg text-gray-700">
          Discover job opportunities that match your skills and ambitions. Whether you're 
          a fresher or an experienced professional, we connect you with the right employers.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row max-w-5xl w-full">
        
        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <ul className="text-gray-700 text-lg space-y-3">
            <li>✔ Smart job recommendations tailored for you.</li>
            <li>✔ Real-time job alerts and instant applications.</li>
            <li>✔ Insights into salaries, industries, and career growth.</li>
            <li>✔ Build your network and advance your career.</li>
          </ul>

          <div className="mt-6">
            <Link
              to="/jobs"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Explore Jobs Now
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img 
            src="https://cdn.dribbble.com/userupload/25159474/file/original-1a44e02216c519975a1f592b13d72076.gif" 
            alt="Career Growth" 
            className="w-3/4 md:w-full rounded-lg"
          />
        </div>
      </div>

    </div>
  );
}

export default About;
