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
        console.log("Stored user:", storedUser);
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
    <div className="p-6 min-h-screen mt-20 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Recruiter Dashboard</h1>

      {recruiter ? (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700">{recruiter.username}</h2>
          <p className="text-gray-600"><strong>Email:</strong> {recruiter.email}</p>
          <p className="text-gray-600"><strong>Company:</strong> {recruiter.company_name}</p>
        </div>
      ) : (
        <p className="text-gray-700">Loading recruiter details...</p>
      )}

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        onClick={() => navigate("/addJob")}
      >
        Add New Job
      </button>
      <DisplayJobByR_Id/>
    </div>
  );
}

export default RecruiterDashBoard;
