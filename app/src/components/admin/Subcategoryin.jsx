import React, { useState, useEffect, useRef } from 'react';
import api from "../../apis/axiosInstance";

const Subcategoryin = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    categoryname: "",
    categoryid: null,
  });
  const [error, setError] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    api
      .get("/products/categories/")
      .then((res) => {
        console.log("CATEGORIES LOADED:", res.data);
        setCategories(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
        setCategories([]); // Ensure fallback
      });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log current form state for debugging
    console.log("Submitting form:", form);

    // Validation
    if (!form.categoryid) {
      setError("Please select a category.");
      return;
    }

    if (!form.name.trim()) {
      setError("Please enter a subcategory name.");
      return;
    }

    // Prepare payload
    const payload = {
      name: form.name.trim(),
      category: form.categoryid, // Must be integer ID
    };

    console.log("Sending to backend:", payload);

    try {
      await api.post("/products/subcategoryin/", payload);
      
      // Reset form on success
      setForm({ name: "", categoryname: "", categoryid: null });
      setError("");
      alert("Subcategory created successfully!");
    } catch (err) {
      console.error("API Error:", err);

      let errorMessage = "Failed to create subcategory. Please try again.";

      if (err.response?.data) {
        const resData = err.response.data;

        // Extract first meaningful error message
        if (resData.category) {
          errorMessage = `Category: ${Array.isArray(resData.category) ? resData.category[0] : resData.category}`;
        } else if (resData.name) {
          errorMessage = `Name: ${Array.isArray(resData.name) ? resData.name[0] : resData.name}`;
        } else {
          errorMessage = Object.values(resData)
            .flat()
            .map((msg) => msg.toString())
            .join(", ");
        }
      } else if (err.request) {
        errorMessage = "No response from server. Check your connection.";
      }

      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Subcategory Name Input */}
      <div>
        <input
          type="text"
          placeholder="Subcategory Name"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Select Category"
          value={form.categoryname || ""}
          readOnly
          onClick={() => categories.length > 0 && setOpen(!open)}
          className="border p-2 rounded w-full cursor-pointer bg-white"
        />

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg border z-50 max-h-60 overflow-auto">
            {categories.length === 0 ? (
              <p className="px-4 py-3 text-gray-500 text-sm">No categories available</p>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      categoryname: cat.name,
                      categoryid: Number(cat.id),
                    }));
                    setOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition"
                >
                  {cat.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Create Subcategory
      </button>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 text-sm mt-2">
          <strong>Error:</strong> {error}
        </p>
      )}
    </form>
  );
};

export default Subcategoryin;