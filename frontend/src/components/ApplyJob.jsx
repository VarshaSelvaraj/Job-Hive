import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const ApplyJob = () => {
  const navigate=useNavigate()
    const { jobid } = useParams();
    const emailandid = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(emailandid)
    console.log(emailandid.email)
  const [formData, setFormData] = useState({
    email: emailandid.email,
    applicant_id: emailandid.id,
    job_id:Number( jobid),
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
//email, applicantid, jobid, username, phone, dob, education, skills, experience, languages, resume, declaration
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
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
console.log(response.data.secure_url)
      return response.data.secure_url || null;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let resumeUrl = null;
    if (formData.resume) {
      resumeUrl = await uploadToCloudinary(formData.resume);
    }

    if (!resumeUrl) {
      alert("Resume upload failed. Please try again.");
      return;
    }

    
    const payload = {
      ...formData,
      resume: resumeUrl,
    };

    try {
        console.log(payload)
      const backendResponse = await axios.post("http://localhost:5000/appliedjob", payload);
      console.log("Backend Response:", backendResponse.data);
      alert("Application submitted successfully!");
      navigate("/main")
    } catch (error) {
      console.error("Backend Error:", error);
      alert("Submission failed. Please try again.");
    }
  };
 

  return (
    <div className="max-w-md mx-auto bg-aqua-100 p-6 rounded-lg shadow-md mt-30 ml-120 border-2 ">
      <h2 className="text-center text-xl font-bold mb-4 px-20">Apply</h2>
      <form onSubmit={handleSubmit}>
        
        <input className="w-full p-2 mb-2 border rounded" placeholder="Enter your name" name="username" value={formData.username} onChange={handleChange} />
        <input className="w-full p-2 mb-2 border rounded" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
        <input type="date" className="w-full p-2 mb-2 border rounded" name="dob" value={formData.dob} onChange={handleChange} />
        <input className="w-full p-2 mb-2 border rounded" placeholder="Education" name="education" value={formData.education} onChange={handleChange} />
        <input className="w-full p-2 mb-2 border rounded" placeholder="Skills (comma-separated)" name="skills" value={formData.skills} onChange={handleChange} />
        <input className="w-full p-2 mb-2 border rounded" placeholder="Experience " type="number" name="experience" value={formData.experience} onChange={handleChange} />
        <input className="w-full p-2 mb-2 border rounded" placeholder="Languages" name="languages" value={formData.languages} onChange={handleChange} />

       
        <label className="block mb-2 font-medium">Upload Resume (.doc,.pdf)</label>
        <input type="file" name="resume" accept=".pdf,.doc,.docx" className="w-full p-2 mb-2 border rounded" onChange={handleChange} />

        <div className="flex items-center mb-4">
          <input type="checkbox" name="declaration" className="mr-2" checked={formData.declaration} onChange={handleChange} />
          <label>I declare that the provided details are correct.</label>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" >Apply</button>
       
      </form>
    </div>
  );
};

export default ApplyJob;
