import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../apis/AuthContext';
import img1 from '../assets/logo.png';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', form, {
        headers: { 'Content-Type': 'application/json' },
      });
       console.log("Login response:", res.data);
    
    if (res.data.tokens?.access && res.data.user) {
      // Store tokens and user data
      await login(res.data.tokens.access); // Add await since login is async now
      console.log("Login successful, navigating to home");
      navigate("/");
    } else {
      // If response doesn't have expected structure
      setError("Login response missing expected data");
    }
  } catch (err) {
    console.error("Full error object:", err);
    console.error("Error response:", err.response);
    console.error("Error data:", err.response?.data);
    console.error("Error status:", err.response?.status);
    
    // Check for network errors first
    if (err.code === 'ERR_NETWORK') {
      setError('Network error. Please check your connection.');
      return;
    }
    
    
    
    // Handle different error statuses and formats
    const errorData = err.response.data;
    
    if (err.response.status === 400) {
      if (typeof errorData === 'object') {
        // Handle object error responses
        const errors = [];
        for (const [key, value] of Object.entries(errorData)) {
          if (Array.isArray(value)) {
            errors.push(`${key}: ${value.join(', ')}`);
          } else {
            errors.push(`${key}: ${value}`);
          }
        }
        setError(errors.join('. '));
      } else if (typeof errorData === 'string') {
        setError(errorData);
      } else {
        setError('Invalid request. Please check your input.');
      }
    } else if (err.response.status === 401) {
      setError(errorData?.error || errorData?.detail || 'Invalid credentials');
    } else if (err.response.status === 500) {
      setError('Server error. Please try again later.');
    } else {
      setError(`Error ${err.response.status}: ${errorData?.detail || errorData?.error || 'Login failed'}`);
    }
  }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex min-h-full flex-col justify-center mt-10 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={img1} alt="WasteWise" className="mx-auto h-10 w-auto mt-2" />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Log in to BaskitKE
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="block w-full rounded-md bg-orange-50 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-orange-50 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="block w-full rounded-md bg-orange-50 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-orange-50 sm:text-sm"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#FFA500] px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-orange-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
