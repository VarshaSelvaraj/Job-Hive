import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const SeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    dob: "",
    education: "",
    skills: "",
    experienceYears: "",
    languages: "",
    resume: null,
    declaration: false,
  });

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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.declaration) {
      alert("You must agree to the declaration before submitting.");
      return;
    }

    const updatedProfile = new FormData();
    updatedProfile.append("dob", formData.dob);
    updatedProfile.append("education", formData.education);
    updatedProfile.append("skills", formData.skills);
    updatedProfile.append("experienceYears", formData.experienceYears);
    updatedProfile.append("languages", formData.languages);
    updatedProfile.append("resume", formData.resume);
    updatedProfile.append("email", profile.email);
    updatedProfile.append("username", profile.username);
    updatedProfile.append("phone", profile.phone);

    try {
      await axios.put(`${API_BASE_URL}/update-profile/${userEmail}`, updatedProfile, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Job Seeker Profile</h2>
        {!isEditing ? (
          <>
            <div className="mt-4 space-y-2">
              <p className="text-lg font-semibold text-gray-700">Name: {profile.username}</p>
              <p className="text-lg font-semibold text-gray-700">Email: {profile.email}</p>
              <p className="text-lg font-semibold text-gray-700">Phone: {profile.phone || "N/A"}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Update Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="text-gray-700 font-medium">Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Education</label>
              <input type="text" name="education" value={formData.education} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Skills (comma-separated)</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Experience (Years)</label>
              <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Upload Resume</label>
              <input type="file" name="resume" onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
            </div>
            <div className="flex items-center mt-2">
              <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} className="mr-2" />
              <label className="text-gray-700">I declare that the provided details are correct.</label>
            </div>
            <button type="submit" className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Save Profile
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="mt-2 w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SeekerProfile;
