import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
  
    try {
      const response = await api.post('/auth/forgot-password', { email });
  
      if (response.data?.status) {
        setMessage(response.data.message || 'OTP has been sent to your email.');
        
        // Navigate to reset password page after successful OTP send
        setTimeout(() => {
          navigate('/reset-password');
        }, 2000);
      } else {
        setError(response.data?.message || 'Failed to send OTP.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to send reset instructions.');
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[#1877f2] mb-8">Reset Password</h1>
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#1877f2]"
              required
            />
          </div>
          
         

<button
            type="submit"
            className="w-full bg-[#1877f2] text-white py-2 rounded-lg hover:bg-[#166fe5] transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <Link to="/signin" className="text-[#1877f2] hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}