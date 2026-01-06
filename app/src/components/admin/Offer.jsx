import React, { useState, useEffect, useRef } from 'react';
import api from "../../apis/axiosInstance";

const Offerin = () => {
  const [products, setProducts] = useState([]);
  const [mainoffers, setMainOffers] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [form, setForm] = useState({
    new_price: "",
    old_price: "",
    campaign: "",
    product: "",
  });
  const [error, setError] = useState("");

  // Fetch products on mount
  useEffect(() => {
    api
      .get("/products/products/")
      .then((res) => {
        console.log("products LOADED:", res.data);
        setProducts(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setProducts([]); // Ensure fallback
      });
  }, []);

   // Fetch categories on mount
  useEffect(() => {
    api
      .get("/products/mainoffersin/")
      .then((res) => {
        console.log("CATEGORIES LOADED:", res.data);
        setMainOffers(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
        setMainOffers([]); // Ensure fallback
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
    if (!form.product) {
      setError("Please select a product.");
      return;
    }
    

    if (!form.campaign.trim()) {
      setError("Please enter a campaign name.");
      return;
    }
    

    // Prepare payload
    const payload = {
      new_price: form.new_price,
      old_price: form.old_price,
      campaign: form.campaign,
      product: form.product,
    };

    console.log("Sending to backend:", payload);

    try {
      await api.post("/products/offerin/", payload);
      
      // Reset form on success
      setForm({ new_price: "", old_price: "", campaign: "", product: "" });
      setError("");
      alert("Offer created successfully!");
    } catch (err) {
      console.error("API Error:", err);

      let errorMessage = "Failed to create Offer. Please try again.";

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
      {/* Offer Name Input */}
      //price
        <div className="flex flex-col">
          <label className="text-sm font-medium">Price</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="100"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        //price
        <div className="flex flex-col">
          <label className="text-sm font-medium">Price</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="100"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
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
        Create Offer
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

export default Offerin;