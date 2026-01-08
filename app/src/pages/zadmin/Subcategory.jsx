import React, { useEffect, useState } from "react";
import AdminModal from "./Modal";
import Admin2 from "../Admin2";
import AdminTable from "./Admintable";
import api from "../../apis/axiosInstance";
import { renderMatches } from "react-router-dom";

const AdminSubcategories = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "" });

  useEffect(() => {
    api.get("/products/subcategories/").then(r => setItems(r.data));
    api.get("/products/categoryin/").then(r => setCategories(r.data));
  }, []);

  const submit = async e => {
    e.preventDefault();
    editing
      ? await api.put(`/products/subcategoryin/${editing.id}/`, form)
      : await api.post("/products/subcategoryin/", form);
    setOpen(false);
  };

  return (
    <Admin2 title="Subcategories"
    action={
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-black px-4 py-2 rounded"
        >
          Add SUBCategory
        </button>
      }>
      
      <AdminTable
        data={items}
        columns={[
          { key: "name", label: "Name" },
          { key: "category", label: "Category",
            render: (item) => item.category?.name ?? "_"
          }
        ]}
        onEdit={i => {
          setEditing(i);
          setForm(i);
          setOpen(true);
        }}
        onDelete={id =>
          api.delete(`/products/subcategoryin/${id}/`)
        }

      />
      <AdminModal
        title={editing ? "Edit Subcategory" : "Add Subcategory"}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
          setForm({ name: "", category: "" });
        }}
        onSubmit={submit}
      >
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <select
            className="w-full border p-2 rounded"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </form>
      </AdminModal>
    </Admin2>
  );
};
export default AdminSubcategories;