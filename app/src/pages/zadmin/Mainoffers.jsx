import { useEffect, useState } from "react";
import AdminTable from "./Admintable";

import AdminModal from "./Modal";
import Admin2 from "../Admin2";
import api from "../../apis/axiosInstance";

const MainOffers = () => {
  const [mainoffers, setMainOffers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startdate: "",
    enddate: ""
  });

  const fetchMainOffers = async () => {
      const res = await api.get("/products/mainofferin/");
      // ONLY ACTIVE OFFERS
      const activeOffers = res.data.filter(
      offer => offer.is_active === true
  );

  setMainOffers(activeOffers);
    };
  
    useEffect(() => {
      fetchMainOffers();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
  
      if (editing) {
        await api.put(`/products/mainofferin/${editing.id}/`, fd);
      } else {
        await api.post("/products/mainofferin/", fd);
      }
  
      setOpen(false);
      setEditing(null);
      fetchMainOffers();
    };
  
    const handleEdit = (item) => {
      setEditing(item);
      setForm({
        title: item.title,
        description: item.description,
        start_date: item.startdate,
        end_date: item.enddate
      });
      setOpen(true);
    };
  
    const handleDelete = async (id) => {
      if (!confirm("Delete category?")) return;
      await api.delete(`/products/mainofferin/${id}/`);
      fetchMainOffers();
    };
  

  return (
    <Admin2
      title="MainOffers"
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
          { key: "title", label: "title" },
          { key: "description", label: "description" },
          { key: "start_date", label: "Start Date",
            render: (c) => new Date(c.start_date).toLocaleDateString()
           },
          { key: "end_date", label: "End Date",
            render: (c) => new Date(c.end_date).toLocaleDateString()
          },
          
        ]}
        data={mainoffers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        open={open}
        title={editing ? "Edit Main Offer" : "New Main Offer"}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => {
              const title = e.target.value;
              setForm({
                ...form,
                title
                
              });
            }}
            required
          />


          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={form.start_date}
            onChange={(e) =>
              setForm({ ...form, start_date: e.target.value })
            }
          />


          <input
            type="date"
            className="w-full border p-2 rounded"
            value={form.end_date}
            onChange={(e) =>
              setForm({ ...form, end_date: e.target.value })
            }
          />

          <button className="bg-primary text-white px-4 py-2 rounded w-full">
            Save
          </button>
        </form>
      </AdminModal>
    </Admin2>
  );
};

export default MainOffers;
