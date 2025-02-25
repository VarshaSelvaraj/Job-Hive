import React from "react";
import { Briefcase, Info } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="max-w-lg mx-auto border border-gray-200 rounded-xl shadow-lg p-6 bg-white transition-transform transform hover:scale-105 duration-300">
      {/* Job Title */}
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Briefcase size={22} className="text-blue-500" />
        {job.job_title}
      </h2>

      {/* Company Name */}
      <p className="text-lg text-gray-700 mt-1">Company : {job.company}</p>

      {/* Experience */}
      <p className="text-gray-700 text-sm mt-2"> Experience: {job.experience}</p>

      {/* Role */}
      <p className="text-gray-700 text-sm mt-2"> Role: {job.role}</p>

      {/* Salary Range */}
      <p className="text-gray-700 text-sm mt-2"> Salary: {job.salary_range}</p>

      {/* Posted Date */}
      <p className="text-gray-500 text-sm mt-3">📅 Posted on: {new Date(job.created_at).toLocaleDateString()}</p>

      {/* Buttons Section */}
      <div className="mt-5 flex gap-3">
        <Link
          to={`/jobs/${job.id}`}
          className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
        >
          <Info size={18} />
          View Full Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;