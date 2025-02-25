import { Link } from "react-router-dom";
import { FaHive, FaSearch, FaHome, FaBriefcase, FaUser, FaSignOutAlt } from "react-icons/fa"; // Importing icons
import { useState, useEffect } from "react"; // Import useState and useEffect
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const MainNavbar = ({ logout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      try {
        const parsedUser = JSON.parse(userDetails);
        console.log("User data from localStorage:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []); // ✅ Corrected the closing bracket placement

  return (
    <nav className="bg-white fixed w-full top-0 left-0 shadow-lg py-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Name with Icon */}
          <div className="flex items-center space-x-2 text-black text-2xl font-bold">
            <FaHive className="text-yellow-500" /> {/* Hive icon */}
            <Link to="/">JobHive</Link>
          </div>

          {/* Search Bar with Button */}
          <div className="relative flex items-center w-1/3">
            <FaSearch className="absolute left-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search for jobs..."
              className="w-full pl-12 pr-24 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-1 bg-blue-600 text-white mr-2 px-4 py-1.5 rounded-full hover:bg-blue-700">
              Search
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <FaHome /> <span>Home</span>
            </Link>
            <Link to="/jobs" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <FaBriefcase /> <span>Jobs</span>
            </Link>
            <Link to={`/seeker-profile/${user?.id || ""}`} className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <FaUser /> <span>Profile</span>
            </Link>
            <Link to="/premium" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <span>👑Premium</span>
            </Link>
            <button onClick={logout} className="flex items-center space-x-1 text-gray-700 hover:text-red-600">
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
