import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectUserType = (type) => {
    setUserType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!userType) {
      setError('Please select a user type before logging in.');
      setLoading(false);
      return;
    }

    try {
      console.log('Submitting login request:', { ...formData, userType });
      const response = await axios.post('http://localhost:5000/login', {
        ...formData,
        userType,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        alert('Login successful!');

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (userType === 'jobSeeker') navigate('/');
        else if (userType === 'recruiter') navigate('/dashboard');

        window.location.reload();
      }
    } catch (err) {
      console.error('Login error:', err.response);
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex mt-10  items-center justify-center bg-[#9CDAD8] p-6">
      <div className="w-full max-w-6xl flex bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Welcome Message */}
        <div className="w-1/2 p-8 flex flex-col justify-center bg-[#73C6C4] text-white">
          <h2 className="text-4xl font-bold">Welcome Back!</h2>
          <p className="mt-2 text-xl">Sign in to access your account.</p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-center mb-4 text-zinc-500">Choose Account Type</h2>
          <div className="flex justify-center gap-4 mb-6">
            <div
              onClick={() => handleSelectUserType('jobSeeker')}
              className={`cursor-pointer p-4 border rounded-lg text-center transition-all duration-300 w-40 shadow-md ${
                userType === 'jobSeeker' ? 'border-blue-500 ' : 'border-gray-300'
              }`}
            >
              <p className="font-medium">Job Seeker</p>
            </div>

            <div
              onClick={() => handleSelectUserType('recruiter')}
              className={`cursor-pointer p-4 border rounded-lg text-center transition-all duration-300 w-40 shadow-md ${
                userType === 'recruiter' ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              <p className="font-medium">Recruiter</p>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-6 text-zinc-700">
            Login as <span className='text-[#73C6C4]'>{userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : '...'}</span>
          </h1>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />

            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center mt-4">
              Don't have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate('/signup')}
              >
                Sign up here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
