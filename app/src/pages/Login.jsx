import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../apis/AuthContext';
import img1 from '../assets/logo.png';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', form, {
        headers: { 'Content-Type': 'application/json' },
      });
      login(res.data.tokens.access, res.data.user); // correct

      setError(''); // Clear any previous errors
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err.response?.data);
      setError(err.response?.data?.detail || 'Login failed. Check credentials.');
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
