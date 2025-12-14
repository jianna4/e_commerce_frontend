import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../apis/AuthContext';
import img1 from '../assets/img.png'
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://127.0.0.1:8000/api/login/', form);
    login(res.data.access);
    navigate('/book');

  };
  const handleLogin = (e) => {
  e.preventDefault();
  console.log("Login button clicked ✅");
};
console.log("Login component loaded ✅");

  return (
    <div className="bg-gray-100 min-h-screen" >
    
    <div class="flex min-h-full flex-col justify-center mt-10 px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src={img1} alt="Your Company" class="mx-auto h-10 w-auto mt-2" />
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">log in to wastewise</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action="#" method="POST" class="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" type="email" name="email" required autocomplete="email" class="block w-full rounded-md bg-orange-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-50 sm:text-sm/6" 
          value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          
        </div>
        <div class="mt-2">
          <input id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-orange-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
          value={form.password} onChange={e => setForm({...form, password: e.target.value})}/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-[#FFA500] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">login</button>
      </div>
    </form>

    
  </div>
</div>

    </div>
    
    
    
  );
};

export default Login;