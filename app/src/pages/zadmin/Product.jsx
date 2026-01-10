import React, { useEffect, useState } from "react";
import AdminModal from "./Modal";
import Admin2 from "../Admin2";
import AdminTable from "./Admintable";
import api from "../../apis/axiosInstance";
const Products = () => {
 
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", subcategory: "" });


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

    editing
      ? await api.put(`/products/productin/${editing.id}/`, form)
      : await api.post("/products/productin/", form);

    await fetchProducts();

    setEditing(null);
    setForm({ name: "", category: "", subcategory: "" });
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
      category: item.category?.id || "",
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
          { key: "category", label: "Category",
            render: (item) => item.category?.name ?? "_"
          },
          { key: "subcategory", label: "Subcategory",
            render: (item) => item.subcategory?.name ?? "_"
          }
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AdminModal
        title={editing ? "Edit Product" : "Add Product"}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
          setForm({ name: "", category: "", subcategory: "" });
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
          <div className="border-t pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={() => alert("Product saved")}
              className="px-4 py-2 rounded bg-primary text-black"
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
