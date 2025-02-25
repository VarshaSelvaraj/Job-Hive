import { Link } from "react-router-dom";
import { FaHive, FaSearch } from "react-icons/fa"; // Importing icons

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full top-0 left-0 shadow-lg py-4 mb-400  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center">
          
          {/* Brand Name with Icon */}
          <div className="flex items-center space-x-2 text-black text-2xl font-bold ">
            <FaHive className="text-yellow-500" /> {/* Hive icon */}
            <Link to="/">JobHive</Link>
          </div>

          {/* Search Bar with Button */}
          <div className="relative flex items-center w-1/3"> {/* Adjust width as needed */}
            {/* Search Icon */}
            <FaSearch className="absolute left-4 text-gray-500" />
            
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for jobs..."
              className="w-full pl-12 pr-24 py-3  border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {/* Search Button */}
            <button className="absolute right-1 bg-blue-600 text-white mr-2 px-4 py-1.5 rounded-full hover:bg-blue-700">
              Search
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Register
            </Link>
          
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
