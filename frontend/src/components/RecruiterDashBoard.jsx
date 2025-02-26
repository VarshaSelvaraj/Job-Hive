import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayJobByR_Id from "./DisplayJobByR_Id";

function RecruiterDashBoard() {
  const [recruiter, setRecruiter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecruiterDetails = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.error("No user found in local storage");
          return;
        }
        const user = JSON.parse(storedUser);
        if (user.userType !== "recruiter") {
          console.error("User is not a recruiter");
          return;
        }
        const response = await axios.get(`http://localhost:5000/getRecruiterDetails/${user.id}`);
        setRecruiter(response.data);
      } catch (error) {
        console.error("Error fetching recruiter details:", error);
      }
    };

    fetchRecruiterDetails();
  }, []);

  return (
    <div className="min-h-screen bg-[#9CDAD8] flex flex-col items-center p-4 sm:p-8 mt-15">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        
        {/* Left Section: Recruiter Info */}
        <div className="bg-white shadow-lg rounded-lg w-full lg:w-1/3 text-center overflow-hidden ">
          {recruiter ? (
            <>
              <img
                src={ "https://static.vecteezy.com/system/resources/previews/036/280/654/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
                alt="Profile"
                className="w-full h-100 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">Hi, {recruiter.username}!</h2>
                <p className="text-gray-600 mt-2"><strong>Email:</strong> {recruiter.email}</p>
                <p className="text-gray-600"><strong>Phone:</strong> {recruiter.phone}</p>
                <p className="text-gray-600"><strong>Company:</strong> {recruiter.company_name}</p>

                <button
                  className="mt-6 bg-[#9CDAD8] hover:bg-gray-300 text-zinc-800 font-semibold py-2 px-6 rounded-lg transition duration-300"
                  onClick={() => navigate("/addJob")}
                >
                  Post New Job
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 p-6">Loading recruiter details...</p>
          )}
        </div>

        {/* Right Section: Jobs Posted */}
        <div className="bg-white shadow-lg rounded-lg w-full lg:w-2/3 p-6">
          <DisplayJobByR_Id />
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashBoard;
