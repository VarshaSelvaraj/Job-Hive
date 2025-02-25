import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Briefcase, Globe, MapPin, Calendar, Building, Users, Info } from "lucide-react";

const formatJobDescription = (description) => {
  if (!description) return "No description available.";
  description = description.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  description = description.replace(/✅ (.*?)\n/g, "<li>✅ $1</li>");
  description = description.replace(/\* (.*?)\n/g, "<li>• $1</li>");
  description = description.replace(/\n/g, "<br />");
  return description;
};

const JobDetailsView = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${job_id}`);
        const data = await response.json();
        if (response.ok) {
          setJob(data.job);
        } else {
          console.error("Error fetching job details:", data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  const handleSubmit = () => {
    navigate(`/ApplyJob/${job_id}`);
  };

  if (loading) return <p className="text-center text-gray-500">Loading job details...</p>;
  if (!job) return <p className="text-center text-red-500">Job not found!</p>;

  return (
    <div className="bg-[#9CDAD8] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        {/* Job Title */}
        <h1 className="text-3xl font-bold text-gray-600 flex items-center gap-2">
          <Briefcase size={28} className="text-[#9CDAD8]" /> {job.job_title}
        </h1>

        {/* Company Name */}
        <h3 className="text-lg font-semibold text-gray-700 mt-2 flex items-center gap-2">
          <Building size={22} className="text-gray-400" /> {job.company}
        </h3>

        {/* Job Details */}
        <div className="mt-4 space-y-3">
          <p className="text-gray-700 flex items-center gap-2">
            <Briefcase size={18} className="text-gray-400" />
            <strong>Role:</strong> {job.role}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Users size={18} className="text-gray-400" />
            <strong>Experience:</strong> {job.experience}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Info size={18} className="text-gray-400" />
            <strong>Qualifications:</strong> {job.qualifications}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Users size={18} className="text-gray-400" />
            <strong>Salary Range:</strong> {job.salary_range}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Building size={18} className="text-gray-400" />
            <strong>Work Type:</strong> {job.work_type}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Building size={18} className="text-gray-400" />
            <strong>Employment Type:</strong> {job.employment_type}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <MapPin size={18} className="text-gray-400" />
            <strong>Location:</strong> {job.location}, {job.country}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Info size={18} className="text-gray-400" />
            <strong>Skills:</strong>{" "}
            {Array.isArray(job.skills) ? job.skills.join(", ") : job.skills}
          </p>
        </div>

        {/* Job Description */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Info size={22} className="text-[#9CDAD8]" />
            Job Description
          </h3>
          <div
            className="text-gray-700 mt-2 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: formatJobDescription(job.job_description),
            }}
          />
        </div>

        {/* Apply Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-full max-w-xs text-center bg-[#9CDAD8] hover:bg-gray-300 text-zinc-900 font-semibold py-3 px-5 rounded-lg transition duration-300"
          >
            Apply Now 
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsView;
