import React, { useState } from "react";
import api from "../../apis/axiosInstance";

const Mainoffer = () => {
  const [form, setForm] = useState({ title: "", description: "", startdate: "", enddate: "" });
  const [error, setError] = useState("");

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append(
       "start_date", new Date(form.startdate).toISOString()
      );
      formData.append(
       "end_date", new Date(form.enddate).toISOString()
       );
      
    try {
      
      await api.post("/products/mainofferin/", formData, {
        headers: { "Content-Type": "multipart/form-data" }, 
      });

      setError("");
      alert("Main Offer created successfully!");
      setForm({ title: "", description: "", start_date: "", enddate: "" });
    } catch (err) {
      console.error(err.response?.data);
      setError(
        err.response?.data?.title?.[0] ||
        err.response?.data?.description?.[0] ||
        err.response?.data?.start_date?.[0] ||
        err.response?.data?.end_date?.[0] ||

        "Main Offer creation failed."
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Main Offer</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-row gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Electronics"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        

        <div className="flex flex-col">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={form.startdate}
            onChange={(e) => setForm({ ...form, startdate: e.target.value })}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            value={form.enddate}
            onChange={(e) => setForm({ ...form, enddate: e.target.value })}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Main Offer
        </button>
      </form>
    </div>
  );
};

export default Mainoffer;
