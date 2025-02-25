import React, { useState } from "react";
import axios from "axios";

const AddJobForm = () => {
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

  const experienceOptions = ["0-1 years", "1-3 years", "3-5 years", "5+ years"];
  const salaryOptions = ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"];
  const workTypeOptions = ["Remote", "Hybrid", "On-Site"];
  const employmentTypeOptions = ["Internship", "Part-time", "Freelance", "Full-time"];
  const countryOptions = ["India", "USA", "UK", "Germany", "Canada", "Australia", "Singapore", "UAE"];

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Job Data:", jobData);

    try {
      const response = await axios.post("http://localhost:5000/post-job", jobData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-20 bg-yellow-100 p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg border border-yellow-300">
        <h2 className="text-3xl font-bold text-yellow-800 text-center mb-6">🐝 Post a New Job</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <label className="block font-medium text-yellow-800">Job Title</label>
            <input type="text" name="job_title" value={jobData.job_title} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50" />

            <label className="block mt-3 font-medium text-yellow-800">Role</label>
            <input type="text" name="role" value={jobData.role} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50" />

            <label className="block mt-3 font-medium text-yellow-800">Experience</label>
            <select name="experience" value={jobData.experience} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50">
              <option value="">Select Experience</option>
              {experienceOptions.map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>

            <label className="block mt-3 font-medium text-yellow-800">Salary Range (LPA)</label>
            <select name="salary_range" value={jobData.salary_range} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50">
              <option value="">Select Salary</option>
              {salaryOptions.map((sal) => (
                <option key={sal} value={sal}>{sal}</option>
              ))}
            </select>

            <label className="block mt-3 font-medium text-yellow-800">Location</label>
            <input type="text" name="location" value={jobData.location} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50" />

            <label className="block mt-3 font-medium text-yellow-800">Country</label>
            <select name="country" value={jobData.country} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50">
              <option value="">Select Country</option>
              {countryOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Right Column */}
          <div>
            <label className="block font-medium text-yellow-800">Work Type</label>
            <select name="work_type" value={jobData.work_type} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50">
              <option value="">Select Work Type</option>
              {workTypeOptions.map((wt) => (
                <option key={wt} value={wt}>{wt}</option>
              ))}
            </select>

            <label className="block mt-3 font-medium text-yellow-800">Employment Type</label>
            <select name="employment_type" value={jobData.employment_type} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50">
              <option value="">Select Type</option>
              {employmentTypeOptions.map((et) => (
                <option key={et} value={et}>{et}</option>
              ))}
            </select>

            <label className="block mt-3 font-medium text-yellow-800">Job Portal</label>
            <input type="text" name="job_portal" value={jobData.job_portal} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50" />

            <label className="block mt-3 font-medium text-yellow-800">Job Description</label>
            <textarea name="job_description" value={jobData.job_description} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50 h-24"></textarea>

            <label className="block mt-3 font-medium text-yellow-800">Skills Required</label>
            <input type="text" name="skills" value={jobData.skills} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50" />
          </div>

          {/* Full Width Inputs */}
          <div className="col-span-2">
            <label className="block font-medium text-yellow-800">Company Name</label>
            <input type="text" name="company" value={jobData.company} onChange={handleChange} required className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50" />

            <label className="block mt-3 font-medium text-yellow-800">Company Profile</label>
            <textarea name="company_profile" value={jobData.company_profile} onChange={handleChange} className="w-full mt-1 p-2 border border-yellow-400 rounded-md bg-yellow-50 h-20"></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button type="submit" className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
              🐝 Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;