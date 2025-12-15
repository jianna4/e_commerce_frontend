import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../apis/AuthContext";
import img1 from "../assets/logo.png";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          email: form.email,
          full_name: form.name, // must match serializer
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setError("");
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data);
      setError(
        err.response?.data?.email?.[0] ||
          err.response?.data?.password?.[0] ||
          err.response?.data?.full_name?.[0] ||
          "Registration failed."
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex min-h-full flex-col justify-center mt-10 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={img1} alt="Logo" className="mx-auto h-10 w-auto mt-2" />
          <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
            Sign up for WasteWise
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="block w-full rounded-md bg-orange-50 px-3 py-1.5 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="block w-full rounded-md bg-orange-50 px-3 py-1.5 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="block w-full rounded-md bg-orange-50 px-3 py-1.5 text-gray-900"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#FFA500] text-white py-1.5 rounded-md hover:bg-orange-500"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
