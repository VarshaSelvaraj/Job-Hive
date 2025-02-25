import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditJob = () => {
  const { id } = useParams(); // Get job ID from URL
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

  const [loading, setLoading] = useState(true);


  const options = {
    experience: ["0-1 years", "1-3 years", "3-5 years", "5+ years"],
    salary_range: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"],
    work_type: ["Remote", "Hybrid", "On-Site"],
    employment_type: ["Internship", "Part-time", "Freelance", "Full-time"],
    country: ["India", "USA", "UK", "Germany", "Canada", "Australia", "Singapore", "UAE"],
  };

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/jobs/${id}`);
      const job = response.data.job; // Access the "job" object from the response
      console.log("Job Data:", job); // Log the job data for debugging

      setJobData({
        job_title: job.job_title || "",
        role: job.role || "",
        experience: job.experience || "",
        qualifications: job.qualifications || "",
        salary_range: job.salary_range || "",
        location: job.location || "",
        country: job.country || "",
        work_type: job.work_type || "",
        employment_type: job.employment_type || "",
        job_portal: job.job_portal || "",
        job_description: job.job_description || "",
        // skills: job.skills || "", // Ensure skills is a string
        company: job.company || "",
        company_profile: job.company_profile || "",
      });
    } catch (error) {
      console.error("Error fetching job details:", error);
      alert("Failed to load job details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch job details on component mount
  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...jobData,
        skills: jobData.skills ? jobData.skills.split(",").map((s) => s.trim()) : [],
      };

      await axios.put(`http://localhost:5000/jobs/${id}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Job updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job.");
    }
  };

  if (loading) return <div className="text-center text-xl mt-10">Loading job details...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(jobData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1 capitalize">{key.replace(/_/g, " ")}</label>
            {key === "job_description" || key === "qualifications" || key === "company_profile" ? (
              <textarea
                name={key}
                value={jobData[key]}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-50 h-24 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            ) : key === "experience" || key === "salary_range" || key === "work_type" || key === "employment_type" || key === "country" ? (
              <select
                name={key}
                value={jobData[key]}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select {key.replace("_", " ")}</option>
                {options[key].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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

        <div className="col-span-2 flex justify-center gap-4 mt-6">
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Update Job
          </button>
          <button type="button" onClick={() => navigate("/dashboard")} className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;
