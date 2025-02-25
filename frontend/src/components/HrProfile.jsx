import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HrProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePhoto: '',
    linkedin: '',
    twitter: '',
    industry: '',
    companyName: '',
    location: '',
    website: '',
    university: '',
    specialization: '',
    graduationYear: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/recruiter/profile')
      .then(response => setFormData(prev => ({ ...prev, ...response.data })))
      .catch(error => console.error('Error fetching recruiter data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', 'jobportal_profiles');
  
    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dcj0kv07d/image/upload', imageData);
      setFormData(prev => ({ ...prev, profilePhoto: res.data.secure_url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/recruiter/update-profile', formData);
      alert('Profile updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-10 bg-gray-100">
      <div className="w-full max-w-5xl flex gap-10">
        
        {/* Left - Profile Image & Details */}
        <div className="flex flex-col items-center w-1/4">
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="profilePhoto" />
          <label htmlFor="profilePhoto" className="cursor-pointer">
            <img 
              src={formData.profilePhoto || "https://via.placeholder.com/150"} 
              alt="uploard your profile photo" 
              className="w-40 h-40 object-cover items-center rounded border border-gray-300" 
            />
          </label>
          <p className="text-gray-600 mt-2">Upload Profile Photo</p>

          {/* Social Links */}
<div className="mt-6 text-center">
  <p className="font-semibold">{formData.firstName} {formData.lastName}</p>
  
  <input 
    type="text" 
    name="linkedin" 
    value={formData.linkedin} 
    onChange={handleInputChange} 
    placeholder="LinkedIn Profile URL" 
    className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none mt-2"
  />
  
  <input 
    type="text" 
    name="twitter" 
    value={formData.twitter} 
    onChange={handleInputChange} 
    placeholder="Twitter Profile URL" 
    className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none mt-2"
  />
</div>

        </div>

        {/* Right - Form Fields */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-6">Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Details */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Personal Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
              </div>
            </div>

            {/* Company Details */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Company Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Company Location" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
                <input type="text" name="industry" value={formData.industry} onChange={handleInputChange} placeholder="Industry Type" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
                <input type="text" name="website" value={formData.website} onChange={handleInputChange} placeholder="Company Website" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
              </div>
            </div>

            {/* Educational Details */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Educational Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <input type="text" name="university" value={formData.university} onChange={handleInputChange} placeholder="University/College" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
                <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="Specialization" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
                <input type="text" name="graduationYear" value={formData.graduationYear} onChange={handleInputChange} placeholder="Graduation Year" className="w-full p-2 bg-transparent border-b border-gray-400 focus:outline-none" />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HrProfile;