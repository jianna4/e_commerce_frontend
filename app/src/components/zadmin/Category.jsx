import { useEffect, useState } from "react";
import AdminTable from "./Admintable";
import AdminLayout from "./Adminlayout";
import AdminModal from "./Adminmodal";
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

    if (editing) {
      await api.put(`/products/categoryin/${editing.id}/`, fd);
    } else {
      await api.post("/products/categoryin/", fd);
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
    <AdminLayout
      title="Categories"
      action={
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded"
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
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <input
            className="w-full border p-2 rounded bg-gray-100"
            value={form.slug}
            disabled={!!editing}  
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input type="file" onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          } />

          <button className="bg-primary text-white px-4 py-2 rounded w-full">
            Save
          </button>
        </form>
      </AdminModal>
    </AdminLayout>
  );
};

export default AdminCategories;
