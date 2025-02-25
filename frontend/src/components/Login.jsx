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

        navigate('/');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        
        <h2 className="text-2xl font-semibold text-center mb-4">Choose Account Type</h2>
        <div className="flex justify-center gap-6 mb-6">
          <div
            onClick={() => handleSelectUserType('jobSeeker')}
            className={`cursor-pointer p-4 border rounded-lg text-center transition-all duration-300 w-40 shadow-md ${
              userType === 'jobSeeker' ? 'border-blue-500' : 'border-gray-300'
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

        <h1 className="text-3xl font-semibold text-center mb-6">
          Login as {userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : '...'}
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
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  );
};

export default Login;
