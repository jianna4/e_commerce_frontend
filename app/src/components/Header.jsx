import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/logo.png";

function Header() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const categories = [
    "Household Appliances",
    "Electronics",
    "Clothing",
    "Books",
    "Toys",
  ];

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left side: Logo + Site name */}
          <div className="flex items-center gap-4">
            <img src={img} alt="Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-orange-500">Kikapu Kuu</h1>
          </div>

          {/* Right side: Navigation */}
          <nav className="flex items-center gap-6">

            {/* Categories first */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="hover:text-orange-500 transition"
              >
                Categories
              </button>

              {categoriesOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                  {categories.map((item, index) => (
                    <Link
                      key={index}
                      to={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {item}
                    </Link>
                  ))}
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
