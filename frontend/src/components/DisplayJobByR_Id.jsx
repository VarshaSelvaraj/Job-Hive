import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ApplicantsPopup from "./ApplicantsPopup";

function DisplayJobByR_Id() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showApplicants, setShowApplicants] = useState(false);
    const [applicants, setApplicants] = useState([]);
    const user = JSON.parse(localStorage.getItem("user")); // Get recruiter details
    // const [applicant_count, setApplicant_count] = useState(0);
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

    const openApplicants = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/applicants/${id}`);
            setApplicants(response.data.jobSeekers || []); // Ensure it's always an array
            // applicant_count = response.data.jobSeekers.length;
            setShowApplicants(true);
        } catch (error) {
            console.error("Error fetching applicants:", error);
            setApplicants([]); // Ensure state is always an array
            setShowApplicants(true);
        }
    };

    const handleDelete = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:5000/jobs/${jobId}`);

            if (response.status === 200) {
                alert("Job deleted successfully!");
                // Refresh job list after deletion
                setJobs(jobs.filter((job) => job.id !== jobId));
            }
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("Failed to delete the job. Please try again.");
        }
    };

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
                                {/* <p className="text-gray-600"><strong>Applicants:</strong> {applicant_count}</p> */}
                            </div>

                            <div className="mt-4 flex justify-between">
                                <Link to={`/editJob/${job.id}`}>
                                    <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    onClick={() => openApplicants(job.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg"
                                >
                                    See Applicants
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

            {showApplicants && (
                <ApplicantsPopup 
                    applicants={applicants} 
                    onClose={() => setShowApplicants(false)} 
                />
            )}
        </div>
    );
}

export default DisplayJobByR_Id;
