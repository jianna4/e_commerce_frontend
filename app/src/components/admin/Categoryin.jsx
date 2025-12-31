
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
};

export default Categoryin;