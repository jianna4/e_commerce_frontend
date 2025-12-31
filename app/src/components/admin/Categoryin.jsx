
import React from 'react'
import { useState } from 'react'
import api from '../../apis/axiosInstance';

const Categoryin = () => {
  const [form, setForm] = useState({ name: "", Slug: "", description: "", image: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce=await api.post(
        "/products/Categoriesin/",
        { name: form.name,
          Slug: form.Slug,
          description: form.description,
          image: form.image,
        },
        {headers:{"Content-Type":"application/json"}}

      );
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.name?.[0] ||
        error.response?.data?.Slug?.[0] ||
        error.response?.data?.description?.[0] ||
        error.response?.data?.image?.[0] ||
        "Category creation failed."
      );
    }
  };
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label>Slug</label>
          <input type="text" value={form.Slug} onChange={(e) => setForm({ ...form, Slug: e.target.value })} />
        </div>
        <div>
          <label>Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <label>Image</label>
          <input type="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </div>
        <button type="submit">Create Category</button>
      </form>
    </div>
  )
};

export default Categoryin;