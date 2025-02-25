import { Link } from "react-router-dom";
import { FaHive } from "react-icons/fa"; // Importing icons

const RecruiterNavBar = ({ logout }) => {
  return (
    <nav className="backdrop-blur-md fixed w-full top-0 left-0 shadow-lg py-4 z-50 bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Name with Icon */}
          <div className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
            <FaHive className="text-[#9CDAD8]" /> {/* Hive icon */}
            <Link to="/" className="text-zinc-400 hover:text-[#9CDAD8] transition duration-300">
              JHire
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl font-semibold text-gray-400 hover:text-[#9CDAD8] transition duration-300">
              Home
            </Link>
            <Link to="/dashboard" className="text-xl font-semibold text-gray-400 hover:text-[#9CDAD8] transition duration-300">
              Dashboard
            </Link>
            <Link to="/premium" className="text-xl font-semibold text-gray-400 hover:text-[#9CDAD8] transition duration-300">
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

export default RecruiterNavBar;
