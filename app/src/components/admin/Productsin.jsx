
import React from 'react'
import api from "../../apis/axiosInstance";
import { useState ,useEffect, useRef } from 'react';
const Productin = () => {
  const[subcategories,setsubcategories]= useState([])
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [form,setForm]=useState({name:"",slug:"",description:"",price:"",image:"",subcategoryname:"",subcategoryid:null})
  const [error, setError] = useState("");

  //file change handling...from categories
  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  useEffect(() => {
    api
      .get("/products/subcategories/")
      .then((res) => setsubcategories(res.data))
      .catch((err) => console.error("Failed to load subcategories:", err));
  }, []);

  // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("price", form.price); 
      formData.append("subcategory", form.subcategoryid);
      if (form.image) formData.append("image", form.image);
    try {
      
      await api.post("/products/productin/", formData, {
        headers: { "Content-Type": "multipart/form-data" }, 
      });
    setForm({ name:"",slug:"",description:"",price:"",image:"",subcategoryname:"",subcategoryid:null}); // reset form
    setError("");
    alert("Subproduct created successfully!");
  } catch (error) {
    setError(
      error.response?.data?.name?.[0] ||
      error.response?.data?.slug?.[0] ||
      error.response?.data?.description?.[0] ||
      error.response?.data?.price?.[0] ||
      error.response?.data?.image?.[0] ||
      error.response?.data?.subcategory?.[0] ||
        "product creation failed."
    );
  }}
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 space-y-5">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <div className="relative" ref={dropdownRef}>
              <input className="border p-2 rounded w-full cursor-pointer" type="text" placeholder="Select SUBcategory" value={form.subcategoryname} readOnly
              onClick={() => setOpen(!open)}/>

              {open && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                  {subcategories.length === 0 ? (
                    <p className="px-4 py-3 text-gray-500 text-sm">
                      No subcategories
                    </p>
                  ) : (
                    subcategories.map((subcat) => (
                      <div
                        key={subcat.id}
                        onClick={() =>{
                         setForm({...form, subcategoryname: subcat.name , subcategoryid: subcat.id });
                           setOpen(false)}}
                        className=" block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition">
                        {subcat.name}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="electronics"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        //price
        <div className="flex flex-col">
          <label className="text-sm font-medium">Price</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="100"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Image</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <button type="submit">Create product</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
};

export default Productin;