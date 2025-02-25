import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Adjust this if needed

const SeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Job Seeker Profile</h2>
        <div className="mt-4 space-y-2">
          <p className="text-lg font-semibold text-gray-700">Name: {profile.username}</p>
          <p className="text-lg font-semibold text-gray-700">Email: {profile.email}</p>
          <p className="text-lg font-semibold text-gray-700">Phone: {profile.phone || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;