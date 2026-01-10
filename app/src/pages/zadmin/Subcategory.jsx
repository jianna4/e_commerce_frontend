import React, { useEffect, useState } from "react";
import AdminModal from "./Modal";
import Admin2 from "../Admin2";
import AdminTable from "./Admintable";
import api from "../../apis/axiosInstance";
import { renderMatches } from "react-router-dom";

const AdminSubcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "" });

   const fetchSubcategories = async () => {
    const res = await api.get("/products/subcategories/");
    setSubcategories(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/products/categoryin/");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const submit = async e => {
    e.preventDefault();
    
    editing
      ? await api.put(`/products/subcategoryin/${editing.id}/`, form)
      : await api.post("/products/subcategoryin/", form);
     
    await fetchSubcategories();

    setEditing(null);
    setForm({ name: "", category: "" });
    setOpen(false);
  };
   const handleDelete = async (id) => {
    if (!confirm("Delete subcategory?")) return;
    await api.delete(`/products/subcategoryin/${id}/`);
    fetchSubcategories();
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      category: item.category?.id || "",
    });
    setOpen(true);
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
        data={subcategories}
        columns={[
          { key: "name", label: "Name" },
          { key: "category", label: "Category",
            render: (item) => item.category?.name ?? "_"
          }
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}

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
              <option key={c.id} value={Number(c.id)}>
                {c.name}
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
export default AdminSubcategories;