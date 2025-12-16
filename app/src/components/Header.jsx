import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import img from "../assets/logo.png";
import axios from "axios";
import { useAuth } from "../apis/AuthContext";

function Header() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get initials (name OR email fallback)
  const getInitials = () => {
    if (!user) return "";
    if (user.full_name) {
      return user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return user.email?.[0]?.toUpperCase();
  };

  return (
    <header className="bg-gray-100 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT: Logo */}
          <div className="flex items-center gap-4">
            <img src={img} alt="Logo" className="h-9 w-9" />
            <h1 className="text-xl font-bold text-orange-500">
              Kikapu Kuu
            </h1>
          </div>

          {/* CENTER: Search bar */}
          <div className="flex-1 flex justify-center px-6">
            <input
              type="text"
              placeholder="Search products..."
              className="
                w-full max-w-md
                px-4 py-2
                rounded-md
                border
                border-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-orange-400
              "
            />
          </div>

          {/* RIGHT: Nav */}
          <nav className="flex items-center gap-6">

            {/* Categories */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="font-medium text-gray-700 hover:text-orange-500"
              >
                Categories
              </button>

              {open && (
                <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
                  {categories.length === 0 ? (
                    <p className="px-4 py-2 text-sm text-gray-500">
                      No categories available
                    </p>
                  ) : (
                    categories.map(({ id, name, slug }) => (
                      <Link
                        key={id}
                        to={`/category/${slug}`}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                      >
                        {name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <Link to="/" className="text-gray-700 hover:text-orange-500">Home</Link>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-orange-500">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-orange-500">
                  Signup
                </Link>
              </>
            ) : (
              /* USER AVATAR */
              <div
                title={user?.email}
                className="
                  h-10 w-10
                  rounded-full
                  bg-orange-500
                  text-white
                  flex items-center justify-center
                  font-semibold
                  cursor-pointer
                "
              >
                {getInitials()}
              </div>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
