
import React from 'react'
import api from "../../apis/axiosInstance";
import { useState ,useEffect, useRef } from 'react';
const Subcategoryin = () => {
  const[categories,setCategories]= useState([])
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [form,setForm]=useState({name:"",categoryname:"",categoryid:""})
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/products/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories:", err));
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
    try { await api.post("/products/subcategoryin/",{
      name:form.name,
      category:{ id: form.categoryid }//aparently dont send the category name bu the id
    });
    setForm({ name: "", categoryname: "", categoryid: "" }); // reset form
    setError("");
    alert("Subcategory created successfully!");
  } catch (error) {
    setError(
      error.response?.data?.name?.[0] ||
      error.response?.data?.category?.[0] ||
        "Subcategory creation failed."
    );
  }}
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Subcategory Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        
           {/* Categories */}
            <div className="relative" ref={dropdownRef}>
              <input className="border p-2 rounded w-full cursor-pointer" type="text" placeholder="Select Category" value={form.categoryname} readOnly
              onClick={() => setOpen(!open)}/>

              {open && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                  {categories.length === 0 ? (
                    <p className="px-4 py-3 text-gray-500 text-sm">
                      No categories
                    </p>
                  ) : (
                    categories.map(({ id, name }) => (
                      <div
                        key={id}
                        
                        onClick={() =>{
                         setForm({...form, categoryname: name , categoryid: id });
                           setOpen(false)}}
                        className=" block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition">
                        {name}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

        <button type="submit">Create Subcategory</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
};

export default Subcategoryin;