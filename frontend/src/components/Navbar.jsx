import { Link } from "react-router-dom";
import { FaHive } from "react-icons/fa"; // Importing icons

const Navbar = () => {
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
          <Link to="/home" className="text-xl font-semibold text-gray-400 hover:text-[#9CDAD8] transition duration-300">
             Home
            </Link>
            <Link to="/login" className="text-xl font-semibold text-gray-400 hover:text-[#9CDAD8] transition duration-300">
              Login
            </Link>
            <Link to="/signup" className="text-xl font-semibold text-gray-400 hover:text-[#9CDAD8] transition duration-300">
              Register
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
