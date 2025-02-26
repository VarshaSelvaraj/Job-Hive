import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { jobid } = useParams();
  const emailandid = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    email: emailandid.email,
    applicant_id: emailandid.id,
    job_id: Number(jobid),
    username: "",
    phone: "",
    dob: "",
    education: "",
    skills: "",
    experience: "",
    languages: "",
    resume: null,
    declaration: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be numeric";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.education.trim()) newErrors.education = "Education is required";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    if (formData.experience === "" || formData.experience < 0) newErrors.experience = "Valid experience is required";
    if (!formData.languages.trim()) newErrors.languages = "Languages are required";
    if (!formData.resume) newErrors.resume = "Resume is required";
    if (!formData.declaration) newErrors.declaration = "You must accept the declaration";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Upload Resume to Cloudinary
  const uploadToCloudinary = async (file) => {
    try {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("upload_preset", "resumes");
      cloudinaryFormData.append("folder", "resumes");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dxtauy7ce/upload",
        cloudinaryFormData
      );
      return response.data.secure_url || null;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    let resumeUrl = null;
    if (formData.resume) {
      resumeUrl = await uploadToCloudinary(formData.resume);
    }

    if (!resumeUrl) {
      alert("Resume upload failed. Please try again.");
      return;
    }

    const payload = { ...formData, resume: resumeUrl };

    try {
      const backendResponse = await axios.post("http://localhost:5000/appliedjob", payload);
      console.log("Backend Response:", backendResponse.data);
      alert("Application submitted successfully!");
      navigate("/main");
    } catch (error) {
      console.error("Backend Error:", error);
      alert("Submission Successfully!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9CDAD8] p-6">
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-center text-2xl font-bold text-zinc-600 mb-6">Apply for Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter your name" name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

        <input className="w-full p-3 border border-gray-300 rounded-md" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <input type="date" className="w-full p-3 border border-gray-300 rounded-md" name="dob" value={formData.dob} onChange={handleChange} />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

        <input className="w-full p-3 border border-gray-300 rounded-md" placeholder="Education" name="education" value={formData.education} onChange={handleChange} />
        {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}

        <input className="w-full p-3 border border-gray-300 rounded-md" placeholder="Skills (comma-separated)" name="skills" value={formData.skills} onChange={handleChange} />
        {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}

        <input className="w-full p-3 border border-gray-300 rounded-md" placeholder="Experience (years)" type="number" name="experience" value={formData.experience} onChange={handleChange} />
        {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}

        <input className="w-full p-3 border border-gray-300 rounded-md" placeholder="Languages" name="languages" value={formData.languages} onChange={handleChange} />
        {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}

        <label className="block font-medium text-gray-700">Upload Resume (.doc, .pdf)</label>
        <input type="file" name="resume" accept=".pdf,.doc,.docx" className="w-full p-3 border border-gray-300 rounded-md" onChange={handleChange} />
        {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}

        <div className="flex items-center gap-2">
          <input type="checkbox" name="declaration" className="h-4 w-4 text-blue-600" checked={formData.declaration} onChange={handleChange} />
          <label className="text-gray-700">I declare that the provided details are correct.</label>
        </div>
        {errors.declaration && <p className="text-red-500 text-sm">{errors.declaration}</p>}

        <button type="submit" className="w-full text-zinc-700 bg-[#9CDAD8] hover:bg-gray-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition-all">Apply</button>
      </form>
    </div>
  </div>
  );
};

export default ApplyJob;
