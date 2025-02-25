import React from "react";
import { Briefcase, Info } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="w-80 h-76 border border-gray-200 rounded-xl shadow-2xl p-6 bg-white transition-transform transform hover:scale-105 duration-300 flex flex-col justify-between mt-20">
      {/* Job Title */}
      <h2 className="text-xl font-bold text-zinc-600 flex items-center gap-2">
        <Briefcase size={22} className="text-[#9CDAD8]" />
        {job.job_title}
      </h2>

      {/* Company Name */}
      <p className="text-lg text-gray-700">Company: {job.company}</p>

      {/* Experience, Role, Salary */}
      <div className="flex-grow">
        <p className="text-gray-700 text-sm mt-2">Experience: {job.experience}</p>
        <p className="text-gray-700 text-sm mt-2">Role: {job.role}</p>
        <p className="text-gray-700 text-sm mt-2">Salary: {job.salary_range}</p>
      </div>

      {/* Posted Date */}
      <p className="text-gray-500 text-sm">📅 Posted on: {new Date(job.created_at).toLocaleDateString()}</p>

      {/* Buttons Section */}
      <div className="mt-3">
        <Link
          to={`/jobs/${job.id}`}
          className="block text-center bg-[#9CDAD8] hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
        >
          <Info size={18} />
          View Full Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
