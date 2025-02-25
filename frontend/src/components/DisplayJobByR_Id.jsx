import React, { useEffect, useState } from "react";
import axios from "axios";

function DisplayJobByR_Id() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")); // Get recruiter details

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:5000/recruiter/${user.id}`)
        .then((response) => {
          setJobs(response.data.jobs);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
          setLoading(false);
        });
    }
  }, [user]);

  // Function to handle job deletion
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job.id !== jobId)); // Remove job from UI
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Function to handle job edit (Placeholder for future logic)
  const handleEdit = (jobId) => {
    console.log("Edit job:", jobId);
    // Navigate to job edit page or open a modal (Future implementation)
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading jobs...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Jobs Posted by You</h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-600">{job.job_title}</h3>
              <div className="mt-3">
                <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
                <p className="text-gray-600"><strong>Salary:</strong> {job.salary_range}</p>
                <p className="text-gray-600"><strong>Experience Required:</strong> {job.experience}</p>
                <p className="text-gray-600"><strong>Job Type:</strong> {job.employment_type}</p>
                <p className="text-gray-600"><strong>Posted On:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(job.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DisplayJobByR_Id;
