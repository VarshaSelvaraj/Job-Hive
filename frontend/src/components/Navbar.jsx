import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHive } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"; // Mobile menu icon
import { IoClose } from "react-icons/io5"; // Close icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoClose size={30} /> : <GiHamburgerMenu size={30} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-white shadow-md">
            <Link to="/home" className="text-xl font-semibold text-gray-600 hover:text-[#9CDAD8] transition duration-300" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/login" className="text-xl font-semibold text-gray-600 hover:text-[#9CDAD8] transition duration-300" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="text-xl font-semibold text-gray-600 hover:text-[#9CDAD8] transition duration-300" onClick={() => setIsOpen(false)}>
              Register
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
