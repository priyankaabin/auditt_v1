
import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useInviteStore } from '../store/inviteStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Eye, EyeOff } from 'lucide-react'; 

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export default function SignUp() {
  const { createInviteRequest } = useInviteStore();
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');  // Add lastName state
  const [username, setUsername] = useState('');  // Add username state
  const [password, setPassword] = useState('');  // Add password state
  const [reason, setReason] = useState('');
  const [token, setToken] = useState('no_token');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const inviteToken = params.get('token');
    if (inviteToken) {
      setToken(inviteToken);
    } else {
      setError('Invite token is missing or invalid.');
    }
  }, [location.search]);

  const handleRequestInvite = async (e) => {
    e.preventDefault();
  
    // Validation Errors State
    const validationErrors = {};
  
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  
    if (!email.trim() || !name.trim() || !lastName.trim() || !username.trim() || !password.trim()) {
      setError("Please fill in all required fields");
      return;
    }
  
    if (!passwordRegex.test(password)) {
      validationErrors.password = "Password must be at least 8 characters and contain a special character.";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors.password);
      return;
    }
  
    if (token === 'no_token') {
      setError("Invalid or missing invite token.");
      return;
    }
  
    setIsSubmitting(true);
    setError('');
  
    try {
      const response = await api.post("/auth/signup", {
        email: email.trim(),
        name: name.trim(),
        last_name: lastName.trim(),
        username: username.trim(),
        password: password.trim(),
        reason: reason.trim(),
        token,
      });
  
      if (response.data.message === "User created successfully") {
        setSuccess(true);
      } else {
        throw new Error("Failed to submit invite request");
      }
    } catch (error) {
      setError(error.response?.data?.detail || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {success ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4" style={{ color: themeColors.primary }}>Sign Up Successful!</h1>
            <p className="text-gray-600 mb-6">Congratulations! Your account with Family Creative has been created successfully. You can now log in and start exploring.</p>
            <Link to="/signin" className="inline-block px-6 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: themeColors.primary }}>Back to Sign In</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-6">
              <img 
              src="/Images/Auditt_logo.jpeg"
              
                alt="Family Creatives Logo" 
                className="w-24 h-auto mb-4"
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <h1 className="text-2xl font-bold text-center mb-8" style={{ color: themeColors.primary }}>Welcome to FamilyCreatives!</h1>

            <form onSubmit={handleRequestInvite} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name*</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50" 
                  required 
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Last Name*</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}  // Handle last name
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Username*</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}  // Handle username
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email*</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50" 
                  required 
                />
              </div>

            
                <div>
                          <label className="block text-gray-700 mb-2">Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#1877f2] pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

              <div>
                <label className="block text-gray-700 mb-2">Why do you want to join? (Optional)</label>
                <textarea 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)} 
                 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 min-h-[100px]" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-2 rounded-lg text-white font-medium" 
                style={{ backgroundColor: themeColors.primary }} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'SignUp Here!'}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">Already have an account?</p>
              <Link to="/signin" className="inline-block mt-2 font-medium" style={{ color: themeColors.primary }}>
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

