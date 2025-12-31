import React, { useState } from "react";
import api from "../../apis/axiosInstance";

const Categoryin = () => {
  const [form, setForm] = useState({ name: "", slug: "", description: "", image: null });
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);
    try {
      
      await api.post("/products/categoryin/", formData, {
        headers: { "Content-Type": "multipart/form-data" }, 
      });

      setError("");
      alert("Category created successfully!");
      setForm({ name: "", slug: "", description: "", image: null });
    } catch (err) {
      console.error(err.response?.data);
      setError(
        err.response?.data?.name?.[0] ||
        err.response?.data?.slug?.[0] ||
        err.response?.data?.description?.[0] ||
        err.response?.data?.image?.[0] ||
        "Category creation failed."
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Category</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-row gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Electronics"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="electronics"
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
          <label className="text-sm font-medium">Image</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Categoryin;
