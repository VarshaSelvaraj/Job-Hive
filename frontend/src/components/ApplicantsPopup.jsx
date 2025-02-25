import React from "react";

const ApplicantsPopup = ({ applicants, onClose }) => {
    // Ensure applicants is always an array
    const jobSeekers = Array.isArray(applicants) ? applicants : [];

    return (
        <div className="fixed inset-0 flex mt-20 items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 text-center">Applicants</h2>

                {jobSeekers.length === 0 ? (
                    <p className="text-gray-500 text-center">No applicants found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
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
                                    <tr key={applicant.email} className="text-center">
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

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ApplicantsPopup;
