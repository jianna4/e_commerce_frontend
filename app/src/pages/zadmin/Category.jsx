import { useEffect, useState } from "react";
import AdminTable from "./Admintable";

import AdminModal from "./Modal";
import Admin2 from "../Admin2";
import api from "../../apis/axiosInstance";


const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: null,
  });

  const fetchCategories = async () => {
    const res = await api.get("/products/categoryin/");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
    fd.append("is_active", "true");

    if (editing) {
      await api.put(`/products/categoryin/${editing.id}/`, fd, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
    } else {
      await api.post("/products/categoryin/", fd, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
    }

    setOpen(false);
    setEditing(null);
    fetchCategories();
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description,
      image: null,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete category?")) return;
    await api.delete(`/products/categoryin/${id}/`);
    fetchCategories();
  };

  return (
    <Admin2
      title="Categories"
      action={
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-black px-4 py-2 rounded"
        >
          Add Category
        </button>
      }
    >
      <AdminTable
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
          { key: "created_at", label: "Created" },
        ]}
        data={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        open={open}
        title={editing ? "Edit Category" : "New Category"}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4 pb-10">
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
            required
          />
          <label className="text-sm">Slug</label>
          <input
            className="w-full border p-2 rounded bg-gray-100"
            value={form.slug}
            disabled={!!editing}  
          />
          <label className="text-sm">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <label className="text-sm">Image</label>
          <input type="file" onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          } />

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

export default AdminCategories;
