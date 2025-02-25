import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const { username, email, phone, password, confirmPassword } = formData;

    const usernameRegex = /^[a-zA-Z0-9_]{5,}$/;
    if (!usernameRegex.test(username)) return "Username must be at least 5 characters long and contain only letters, numbers, or underscores.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) return "Phone number must be exactly 10 digits.";

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) return "Password must be at least 6 characters, with one number and one special character.";

    if (password !== confirmPassword) return "Passwords do not match!";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!userType) {
      setError("Please select a user type before signing up.");
      setLoading(false);
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const apiUrl =
        userType === 'recruiter'
          ? 'http://localhost:5000/recruiter'
          : 'http://localhost:5000/jobseeker';

      await axios.post(apiUrl, { ...formData, userType });
      alert("User created successfully!");
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || "There was an error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center mt-18 justify-center bg-[#9CDAD8] p-6">
      <div className="w-full max-w-6xl flex bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side - Welcome Message */}
        <div className="w-1/2 p-8 flex flex-col justify-center bg-[#73C6C4] text-white">
          <h2 className="text-4xl font-bold">Join Us Today!</h2>
          <p className="mt-2 text-xl">Create an account and start your journey.</p>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-center mb-4 text-zinc-500">Choose Account Type</h2>
          <div className="flex justify-center gap-4 mb-6">
            <div
              onClick={() => setUserType('jobSeeker')}
              className={`cursor-pointer p-4 border rounded-lg text-center transition-all duration-300 w-40 shadow-md ${
                userType === 'jobSeeker' ? 'border-blue-500 ' : 'border-gray-300'
              }`}
            >
              <p className="font-medium">Job Seeker</p>
            </div>

            <div
              onClick={() => setUserType('recruiter')}
              className={`cursor-pointer p-4 border rounded-lg text-center transition-all duration-300 w-40 shadow-md ${
                userType === 'recruiter' ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              <p className="font-medium">Recruiter</p>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-6 text-zinc-700">
            Sign Up as <span className='text-[#73C6C4]'>{userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : '...'}</span>
          </h1>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username" />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Phone (10 digits only)" />
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" />
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirm Password" />

            {userType === 'recruiter' && (
              <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Company Name" />
            )}

            <button type="submit" className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="text-center mt-4">
              Already have an account?{' '}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
