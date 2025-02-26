import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import ApplicantsPopup from "./ApplicantsPopup";

function DisplayJobByR_Id() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showApplicants, setShowApplicants] = useState(false);
    const [applicants, setApplicants] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

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
            setApplicants(response.data.jobSeekers || []);
            setShowApplicants(true);
        } catch (error) {
            console.error("Error fetching applicants:", error);
            setApplicants([]);
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
                setJobs(jobs.filter((job) => job.id !== jobId));
            }
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("Failed to delete the job. Please try again.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-white ">
            <h2 className="text-3xl font-bold text-center text-zinc-600 mb-6">Jobs Posted by You</h2>

            {jobs.length === 0 ? (
                <p className="text-center text-gray-500">No jobs found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white text-zinc-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 w-full"
                        >
                            <h3 className="text-2xl font-semibold">{job.job_title}</h3>
                            <div className="mt-4 space-y-2">
                                <p className="text-zinc-700"><strong>Location:</strong> {job.location}</p>
                                <p className="text-zinc-700"><strong>Salary:</strong> {job.salary_range}</p>
                                <p className="text-zinc-700"><strong>Experience:</strong> {job.experience}</p>
                                <p className="text-zinc-700"><strong>Type:</strong> {job.employment_type}</p>
                                <p className="text-zinc-700"><strong>Posted On:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
                            </div>

                            <div className="mt-6 gap-2 p-4 flex flex-col items-center ">
                                <button
                                    onClick={() => openApplicants(job.id)}
                                    className="w-full sm:w-auto flex-1 px-5 py-2 bg-blue-200 text-zinc-700 rounded-lg hover:bg-blue-300 transition shadow-md hover:shadow-lg"
                                >
                                    <b>View Applicants</b>
                                </button>

                                <Link to={`/editJob/${job.id}`} className="w-full sm:w-auto flex-1">
                                    <button className="w-full px-5 py-2 bg-yellow-200 text-zinc-700 rounded-lg hover:bg-yellow-300 transition over">
                                        <b>Edit</b>                                  </button>
                                </Link>

                                <button
                                    onClick={() => handleDelete(job.id)}
                                    className="w-full sm:w-auto flex-1 px-5 py-2 bg-red-200 text-zinc-700 rounded-lg hover:bg-red-300 transition flex items-center justify-center"
                                ><b>Delete</b>
                                    
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
