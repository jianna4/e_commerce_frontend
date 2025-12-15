import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from '../assets/logo.png';

const Signup = () => {
  const [form, setForm] = useState({ full_name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register/',
        {
          full_name: form.full_name,
          email: form.email,
          password: form.password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex min-h-full flex-col justify-center mt-10 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={img1} alt="Your Company" className="mx-auto h-10 w-auto mt-2" />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign up to WasteWise
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="full_name"
                  type="text"
                  name="full_name"
                  autoComplete="name"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  required
                  className="block w-full rounded-md bg-orange-50 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-orange-50 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email Address
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#FFA500] px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-orange-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
