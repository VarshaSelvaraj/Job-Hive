import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJobForm = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    job_title: "",
    role: "",
    experience: "",
    qualifications: "",
    salary_range: "",
    location: "",
    country: "",
    work_type: "",
    employment_type: "",
    job_portal: "",
    job_description: "",
    skills: "",
    company: "",
    company_profile: "",
  });

  const options = {
    experience: ["0-1 years", "1-3 years", "3-5 years", "5+ years"],
    salary_range: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"],
    work_type: ["Remote", "Hybrid", "On-Site"],
    employment_type: ["Internship", "Part-time", "Freelance", "Full-time"],
    country: ["India", "USA", "UK", "Germany", "Canada", "Australia", "Singapore", "UAE"],
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get user data from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id || !user.email) {
          alert("User data not found. Please login again.");
          return;
      }

      // Add user ID and email to job data
      const jobDataWithUser = {
          ...jobData,
          recruiter_id: user.id,
          recruiter_email: user.email
      };

      const response = await axios.post("http://localhost:5000/post-job", jobDataWithUser, {
          headers: { "Content-Type": "application/json" },
      });

      alert("Job posted successfully!");
      console.log("Response Data:", response.data);
     

      setJobData({
          job_title: "",
          role: "",
          experience: "",
          qualifications: "",
          salary_range: "",
          location: "",
          country: "",
          work_type: "",
          employment_type: "",
          job_portal: "",
          job_description: "",
          skills: "",
          company: "",
          company_profile: "",
      });

  } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
  }
  finally {
    navigate('/dashboard');
  };
  }
  return (
    <div className="flex justify-center mt-20 items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">Post a New Job</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {Object.keys(jobData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="block font-medium text-gray-700 mb-1">
                {key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
              </label>
              {options[key] ? (
                <select
                  name={key}
                  value={jobData[key]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select {key.replace("_", " ")}</option>
                  {options[key].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : key === "job_description" || key === "qualifications" || key === "company_profile" ? (
                <textarea
                  name={key}
                  value={jobData[key]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg bg-gray-50 h-12 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
                ></textarea>
              ) : (
                <input
                  type="text"
                  name={key}
                  value={jobData[key]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              )}
            </div>
          ))}
          <div className="col-span-2 flex justify-center mt-6">
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;
