import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "../assets/logo.png";
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (user) => {
    if (!user) return "";

    if (user.first_name && user.last_name) {
      return (
        user.first_name[0] + user.last_name[0]
      ).toUpperCase();
    }

  if (user.username) {
    return user.username[0].toUpperCase();
  }
  
  return "";
};
    console.log("AUTH USER:", user);
  return (
    <header className="bg-gray-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Logo */}
          <div className="flex items-center gap-3">
            <img src={img} alt="Logo" className="h-9 w-9" />
            <span className="text-xl font-bold text-orange-500">
              BaskitKE
            </span>
          </div>

          {/* CENTER: Search */}
          <div className="flex-1 px-10">
            <input
              type="text"
              placeholder="Search for products..."
              className="
                w-full max-w-lg
                px-4 py-2
                rounded-full
                border border-gray-300
                bg-white
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-orange-400
              "
            />
          </div>

          {/* RIGHT: Navigation */}
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">

            {/* Categories */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="hover:text-orange-500 transition"
              >
                Categories
              </button>

              {open && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                  {categories.length === 0 ? (
                    <p className="px-4 py-3 text-gray-500 text-sm">
                      No categories
                    </p>
                  ) : (
                    categories.map(({ id, name, slug }) => (
                      <Link
                        key={id}
                        to={`/category/${slug}`}
                        onClick={() => setOpen(false)}
                        className="
                          block px-4 py-2
                          text-gray-700
                          hover:bg-orange-50
                          hover:text-orange-600
                          transition
                        "
                      >
                        {name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Other links (RESTORED) */}
            <Link to="/" className="hover:text-orange-500 transition">
              Home
            </Link>

            <Link to="/about" className="hover:text-orange-500 transition">
              About
            </Link>

            <Link to="/contact" className="hover:text-orange-500 transition">
              Contact
            </Link>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="hover:text-orange-500 transition">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-orange-500 transition">
                  Signup
                </Link>
              </>
            ) : (
              /* USER AVATAR (far right) */
              <div
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
                {user?.initials}
              </div>
            )}
          </nav>

        </div>
      </div>
     
    </header>
  );
}

export default Header;
