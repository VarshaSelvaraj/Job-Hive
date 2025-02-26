import React, { useEffect, useState } from "react";
import axios from "axios";

function SeekerAppliedJobs({ seeker_id }) {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/applied-jobs/${seeker_id}`)
      .then((response) => {
        if (response.data.jobs) {
          setAppliedJobs(response.data.jobs);
        }
      })
      .catch((error) => {
        console.error("Error fetching applied jobs:", error);
      });
  }, [seeker_id]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-zinc-700">Applied Jobs</h2>
      
      {appliedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {appliedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 flex flex-col justify-between h-full"
            >
              {/* Job Title & Company */}
              <div className="border-b pb-4 grid grid-cols-2 align-middle">
                <h3 className="text-xl font-semibold text-zinc-700">{job.job_title}</h3>
                <p className="text-gray-800 font-medium">Company : {job.company}</p>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm mt-4">
                <p><strong>🌍 Country:</strong> {job.country || "Not specified"}</p>
                <p><strong>📍 Location:</strong> {job.location}</p>
                <p><strong>💰 Salary:</strong> {job.salary || "Not mentioned"}</p>
                <p><strong>💼 Experience:</strong> {job.experience || "Not specified"}</p>
                <p><strong>🏢 Work Type:</strong> {job.work_type || "N/A"}</p>
              </div>

              {/* Job Description */}
              <div className="mt-4 text-gray-700 text-sm">
                <p className="font-semibold">📝 Job Description:</p>
                <p className="line-clamp-3">{job.job_description || "No description available"}</p>
              </div>

              {/* Footer - Status at Bottom Right */}
              <div className="flex justify-end items-center mt-auto pt-4">
                <span className="text-gray-700 font-medium mr-2">Status:</span>
                <span className="bg-green-500 text-white px-4 py-1 rounded-lg font-medium text-sm">
                  ✅ Applied
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No applied jobs found.</p>
      )}
    </div>
  );
}

export default SeekerAppliedJobs;
