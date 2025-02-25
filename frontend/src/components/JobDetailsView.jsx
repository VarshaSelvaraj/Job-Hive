import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, Globe, Linkedin, MapPin, Calendar, Building, Users, Info } from "lucide-react";

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

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${job_id}`);
        const data = await response.json();
        if (response.ok) {
          if (data.job.company_profile) {
            data.job.company_profile = JSON.parse(data.job.company_profile);
          }
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

  if (loading) return <p className="text-center text-gray-500">Loading job details... </p>;
  if (!job) return <p className="text-center text-red-500">Job not found!</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-30">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <Briefcase size={26} className="text-blue-500" /> {job.job_title}
      </h1>

      <div className="mt-4 flex items-center gap-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Building size={22} className="text-gray-600" /> {job.company}
        </h3>
        {job.company_profile?.Website && (
          <a href={`https://${job.company_profile.Website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
            <Globe size={18} /> Visit Website
          </a>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-gray-700 flex items-center gap-2"><Briefcase size={18} className="text-gray-600" /><strong>Role:</strong> {job.role}</p>
        <p className="text-gray-700 flex items-center gap-2"><Users size={18} className="text-gray-600" /><strong>Experience:</strong> {job.experience}</p>
        <p className="text-gray-700 flex items-center gap-2"><Info size={18} className="text-gray-600" /><strong>Qualifications:</strong> {job.qualifications}</p>
        <p className="text-gray-700 flex items-center gap-2"><Users size={18} className="text-gray-600" /><strong>Salary Range:</strong> {job.salary_range}</p>
        <p className="text-gray-700 flex items-center gap-2"><Building size={18} className="text-gray-600" /><strong>Work Type:</strong> {job.work_type}</p>
        <p className="text-gray-700 flex items-center gap-2"><Building size={18} className="text-gray-600" /><strong>Employment Type:</strong> {job.employment_type}</p>
        <p className="text-gray-700 flex items-center gap-2"><Info size={18} className="text-gray-600" /><strong>Skills:</strong> {job.skills}</p>
        <p className="text-gray-700 flex items-center gap-2"><MapPin size={18} className="text-gray-600" /><strong>Location:</strong> {job.location}, {job.country}</p>
        {job.company_profile && (
          <>
            <p className="text-gray-700 flex items-center gap-2"><Info size={18} className="text-gray-600" /><strong>Sector:</strong> {job.company_profile.Sector}</p>
            <p className="text-gray-700 flex items-center gap-2"><Info size={18} className="text-gray-600" /><strong>Industry:</strong> {job.company_profile.Industry}</p>
            <p className="text-gray-700 flex items-center gap-2"><MapPin size={18} className="text-gray-600" /><strong>City:</strong> {job.company_profile.City}</p>
          </>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Info size={22} className="text-blue-500" />
          Job Description
        </h3>
        <div className="text-gray-700 mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatJobDescription(job.job_description) }} />
      </div>

      <div className="mt-6 flex gap-4">
        {job.company_profile?.Website && (
          <a href={`https://${job.company_profile.Website}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg transition duration-300">
            Apply Now 🚀
          </a>
        )}
      </div>
    </div>
  );
};

export default JobDetailsView;