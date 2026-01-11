import React, { useEffect, useState } from "react";
import AdminModal from "./Modal";
import Admin2 from "../Admin2";
import AdminTable from "./Admintable";
import api from "../../apis/axiosInstance";

import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", description: "", image: "", price: "", subcategory: "" });


  const fetchProducts = async () => {
    const res = await api.get("/products/productin/");
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/products/categoryin/");
    setCategories(res.data);
  };

  const fetchSubcategories = async () => {
    const res = await api.get("/products/subcategoryin/");
    setSubcategories(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
    if (value !== "" && value !== null) {
      formData.append(key, value);
    }
  });

    editing
      ? await api.put(`/products/productin/${editing.id}/`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
})
      : await api.post("/products/productin/", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

    await fetchProducts();

    setEditing(null);
    setForm({ name: "", slug: "", description: "", image: null, price: "", subcategory: "" });
    setOpen(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    await api.delete(`/products/productin/${id}/`);
    fetchProducts();
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description,
      image: null,
      price: item.price,
      subcategory: item.subcategory?.id || "",
    });
    setOpen(true);
  };

  return (
    
      <Admin2 title="Products"
      action={
          <button
            onClick={() => setOpen(true)}
            className="bg-primary text-black px-4 py-2 rounded"
          >
            Add Product
          </button>
        }>
      <AdminTable
        data={products}
        columns={[
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
         
          {
            key: "image",
            label: "Image",
            render: (c) =>
              c.image ? (
                <img src={c.image} className="w-10 h-10 object-cover rounded" />
              ) : (
                "-"
              ),
          },
          { key: "price", label: "Price" },
          { key: "category", label: "Category",
            render: (item) => item.category?.name ?? "_"
          },
          { key: "subcategory", label: "Subcategory",
            render: (item) => item.subcategory?.name ?? "_"
          }
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowClick={(item) => navigate(`/admin2/products/${item.id}`)}
      />
      <AdminModal
        title={editing ? "Edit Product" : "Add Product"}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
          setForm({ name: "", slug: "", description: "", image: null, price: "", subcategory: "" });
        }}
        onSubmit={submit}
      >
        <form onSubmit={submit} className="space-y-4">
          <label className="text-sm">Name</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Name"
           
            value={form.name}
            onChange={(e) => {
              const name = e.target.value;
              setForm({
                ...form,
                name,
                slug: editing ? form.slug : name.toLowerCase().replace(/\s+/g, "-"),
              });
            }}
          />
          <label className="text-sm">Slug</label>
          <input
            className="w-full border p-2 rounded"
            value={form.slug}
            disabled={!!editing}
          />
          <label className="text-sm">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <label className="text-sm">Image</label>
          <input
            type="file"
            className="w-full border p-2 rounded"
            onChange={e => setForm({ ...form, image: e.target.files[0] })}
          />
          <label className="text-sm">Price</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
          
          <label className="text-sm">Subcategory</label>
          <select
            className="w-full border p-2 rounded"
            value={form.subcategory}
            onChange={e => setForm({ ...form, subcategory: e.target.value })}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map(sc => (
              <option key={sc.id} value={Number(sc.id)}>
                {sc.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-3 mt-4">
           <button
            type="button"
           onClick={() => setOpen(false)}
            className=" px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition focus:outline-none"
   >
            Cancel
            </button>

            <button
              type="submit"
              className=" px-4 py-2 rounded-lg bg-[#5AB7E6] text-white hover:bg-[#4aa8d4] shadow-md transition focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </AdminModal>
    </Admin2>
  );
};

export default Products;
