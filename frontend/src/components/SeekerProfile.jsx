import React, { useEffect, useState } from "react";
import axios from "axios";
import SeekerAppliedJobs from "./SeekerAppliedJobs";

const API_BASE_URL = "http://localhost:5000"; // Adjust if needed

const SeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seeker_id, setSeeker_id] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  useEffect(() => {
    if (user?.id) {
      setSeeker_id(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (!userEmail) {
      setError("User email not found. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE_URL}/profile/${userEmail}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch profile.");
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#9CDAD8]">
      
      {/* Layout for Profile & Applied Jobs */}
      <div className="mt-10 w-full  max-w-6xl flex flex-col md:flex-row gap-16">
        
        {/* Left Section - Profile Image & Details */}
        <div className="flex flex-col items-center md:items-start w-full h-100 mt-21 md:w-1/3 bg-white shadow-lg p-6 rounded-xl border border-gray-300 transition-transform hover:scale-105 hover:shadow-xl">
          <img src="/profile-icon.png" alt="Profile" className="h-32 w-32 rounded-full border-4 border-gray-300" />
          <div className="mt-6 text-left space-y-2">
            <p className="text-lg font-medium text-gray-700"><strong>Username:</strong> {profile.username}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Email:</strong> {profile.email}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Phone:</strong> {profile.phone || "N/A"}</p>
          </div>
        </div>

        {/* Right Section - Applied Jobs */}
        <div className="w-full md:w-2/3">
          {seeker_id && <SeekerAppliedJobs seeker_id={seeker_id} />}
        </div>

      </div>
    </div>
  );
};

export default SeekerProfile;
