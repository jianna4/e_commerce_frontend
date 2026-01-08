const AdminSubcategories = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "" });

  useEffect(() => {
    api.get("/products/subcategoryin/").then(r => setItems(r.data));
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
    <AdminLayout title="Subcategories">
      <AdminTable
        data={items}
        columns={[
          { key: "name", label: "Name" },
          { key: "category", label: "Category" },
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
    </AdminLayout>
  );
};
export default AdminSubcategories;