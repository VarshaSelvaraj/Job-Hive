// import { Link } from "react-router-dom";
// import { FaHive, FaSearch } from "react-icons/fa"; // Importing icons

// const MainNavbar = () => {
//   return (
//     <nav className="bg-white fixed w-full top-0 left-0 shadow-lg py-4 ">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center">
          
//           {/* Brand Name with Icon */}
//           <div className="flex items-center space-x-2 text-black text-2xl font-bold ">
//             <FaHive className="text-yellow-500" /> {/* Hive icon */}
//             <Link to="/">JobHive</Link>
//           </div>

//           {/* Search Bar with Button */}
//           <div className="relative flex items-center w-1/3"> {/* Adjust width as needed */}
//             {/* Search Icon */}
//             <FaSearch className="absolute left-4 text-gray-500" />
            
//             {/* Search Input */}
//             <input
//               type="text"
//               placeholder="Search for jobs..."
//               className="w-full pl-12 pr-24 py-3  border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
            
//             {/* Search Button */}
//             <button className="absolute right-1 bg-blue-600 text-white mr-2 px-4 py-1.5 rounded-full hover:bg-blue-700">
//               Search
//             </button>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Link
//               to="/"
//               className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200"
//             >
//               Home
//             </Link>
//             <Link
//               to="/jobs"
//               className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200"
//             >
//               Jobs
//             </Link>
//             <Link
//               to="/profile"
//               className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200"
//             >
//               Profile
//             </Link>
//             <Link
//               to="/about"
//               className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200"
//             >
//               About
//             </Link>
//             <Link
//               to="/logout"
//               className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200"
//             >
//               Logout
//             </Link>
          
//           </div>
         
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default MainNavbar;


import { Link } from "react-router-dom";
import { FaHive, FaSearch, FaHome, FaBriefcase, FaUser, FaSignOutAlt } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const RecruiterNavBar = ({logout}) => {
 
  

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
            <Link to="/addJob" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <span>Add New Job</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <FaUser /> <span>DashBoard</span>
            </Link>
            <Link to="/premium" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <span>👑Premium</span>
            </Link>
           
              <FaSignOutAlt /> <button  onClick={logout}><span>Logout</span></button>
           
          </div>

        </div>
      </div>
    </nav>
  );
};

export default RecruiterNavBar;
