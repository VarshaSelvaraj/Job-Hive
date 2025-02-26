import React from "react";
import { X } from "lucide-react"; // Importing the close icon

const ApplicantsPopup = ({ applicants, onClose }) => {
    // Ensure applicants is always an array
    const jobSeekers = Array.isArray(applicants) ? applicants : [];

    return (
        <div className="fixed inset-0 flex mt-20 items-center justify-center backdrop-blur-md bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-200 max-h-[80vh] overflow-y-auto relative">
                {/* Close Icon */}
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
                    <X size={24} />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center text-zinc-500">Applicants</h2>

                {jobSeekers.length === 0 ? (
                    <p className="text-gray-500 text-center">No applicants found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-zinc-500">
                                    <th className="border border-gray-300 px-4 py-2">Email</th>
                                    <th className="border border-gray-300 px-4 py-2">Phone</th>
                                    <th className="border border-gray-300 px-4 py-2">DOB</th>
                                    <th className="border border-gray-300 px-4 py-2">Education</th>
                                    <th className="border border-gray-300 px-4 py-2">Experience</th>
                                    <th className="border border-gray-300 px-4 py-2">Language</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobSeekers.map((applicant) => (
                                    <tr key={applicant.email} className="text-center text-zinc-900">
                                        <td className="border border-gray-300 px-4 py-2">{applicant.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">{applicant.phone || "No phone available"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{applicant.dob || "Not provided"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{applicant.education || "Not provided"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{applicant.experienceYears ? `${applicant.experienceYears} years` : "No experience"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{applicant.language?.trim() || "Not specified"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicantsPopup;
