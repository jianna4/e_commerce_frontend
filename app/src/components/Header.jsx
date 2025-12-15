import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import img from "../assets/logo.png";
import axios from 'axios';

function Header() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Logo + Site name */}
          <div className="flex items-center gap-4">
            <img src={img} alt="Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-orange-500">Kikapu Kuu</h1>
          </div>

          {/* Right side: Navigation */}
          <nav className="flex items-center gap-6">

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="font-medium hover:text-orange-500"
              >
                Categories
              </button>

              {open && (
                <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
                  {categories.length === 0 ? (
                    <p className="px-4 py-2 text-sm text-gray-500">No categories available</p>
                  ) : (
                    categories.map(({ id, name, slug }) => (
                      <Link
                        key={id}
                        to={`/category/${slug}`}
                        className="block px-4 py-2 text-sm hover:bg-orange-50 text-black"
                        onClick={() => setOpen(false)} // close dropdown after click
                      >
                        {name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Other nav links */}
            <Link to="/" className="hover:text-orange-500 transition">Home</Link>
            <Link to="/about" className="hover:text-orange-500 transition">About</Link>
            <Link to="/contact" className="hover:text-orange-500 transition">Contact</Link>
            <Link to="/login" className="hover:text-orange-500 transition">Login</Link>
            <Link to="/signup" className="hover:text-orange-500 transition">Signup</Link>

          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
