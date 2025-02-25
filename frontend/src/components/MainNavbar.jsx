import { Link, useLocation } from "react-router-dom";
import { FaHive } from "react-icons/fa";
import { useState, useEffect } from "react";

const MainNavbar = ({ logout }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();

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
  }, []);

  const linkClass = (path) =>
    `text-xl font-semibold transition duration-300 ${
      location.pathname === path ? "text-[#9CDAD8] font-bold" : "text-gray-400"
    } hover:text-[#9CDAD8]`;

  return (
    <nav className="backdrop-blur-md fixed w-full top-0 left-0 shadow-lg py-4 z-50 bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Name with Icon */}
          <div className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
            <FaHive className="text-[#9CDAD8]" />
            <Link to="/" className="text-zinc-400 hover:text-[#9CDAD8] transition duration-300">
              JHire
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/jobs" className={linkClass("/jobs")}>
              Jobs
            </Link>
            <Link to={`/seeker-profile/${user?.id || ""}`} className={linkClass(`/seeker-profile/${user?.id || ""}`)}>
              Profile
            </Link>
            <Link to="/premium" className={linkClass("/premium")}>
              Premium
            </Link>
            <button onClick={logout} className="text-xl font-semibold text-gray-400 hover:text-[#9CDAD8] transition duration-300">
              <span>Logout</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
