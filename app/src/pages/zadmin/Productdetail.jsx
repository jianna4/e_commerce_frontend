import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../apis/axiosInstance";
import AdminModal from "./Modal";



const ProductDetails = () => {

  const{id} = useParams()
  const[open,setOpen]=useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingSize, setEditingSize] = useState(null);
  const [editingColor, setEditingColor] = useState(null);
  const [product,setProduct]=useState(null);
  const[sizesform,setSizesform] =useState({
    waist_shoe_size:"",
    hips:"",
    height:"",
    product:"",
  })
  const[colorform,setColorform]= useState({
    product_size:"",
    color_name:"",
    hex_code:"",
    quantity:"",

  })
  const[imagesform,setImagesform] = useState({
    product:"",
    image:"",
  })
  const [form, setForm] = useState({
    name:"",
    slug:"",
    description:"",
    price:"",
    image:null,
    active_offers:[{new_price:"",
                    mainoffer:[{title:"",
                                description:""}]}]
  });

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/products/products/${id}/`);
      setProduct(res.data);
      // preload main form
      setForm({
        name: res.data.name,
        slug: res.data.slug,
        description: res.data.description,
        price: res.data.price,
        stock: res.data.stock,
        image: null,
      });

      setForm({
         name: res.data.name,
        slug: res.data.slug,
        description: res.data.description,
        price: res.data.price,
        stock: res.data.stock,
        image: null,
       });
    } catch (err) {
      console.error("Failed to fetch products", err);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [id]);

   const handleProductSubmit = async (e) => {
       e.preventDefault();
       const fd = new FormData();
       Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
       fd.append("is_active", "true");
   
       if (editingProduct) {
         await api.put(`/products/productin/${editingProduct.id}/`, fd, {
     headers: {
       "Content-Type": "multipart/form-data",
     },
   });
       } else {
         await api.post("/products/productin/", fd, {
     headers: {
       "Content-Type": "multipart/form-data",
     },
   });
       }
   
       setOpen(false);
       setEditingProduct(null);
       fetchProducts();
     };
   
     const handleProductEdit = (item) => {
       setEditingProduct(item);
       setForm({
         name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        stock: item.stock,
        image: null,
       });
       setOpen(true);
     };
   
     const handleProductDelete = async (id) => {
       if (!confirm("Delete category?")) return;
       await api.delete(`/products/productin/${id}/`);
       fetchProducts();
     };
   
/*SIZES*/
const handleSizesSubmit = async (e) => {
       e.preventDefault();
       const fd = new FormData();
       Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
       
   
       if (editingSize) {
         await api.put(`/products/product_size_in/${editingSize.id}/`, fd, {
     headers: {
       "Content-Type": "multipart/form-data",
     },
   });
       } else {
         await api.post("/products/product_size_in/", fd, {
     headers: {
       "Content-Type": "multipart/form-data",
     },
   });
       }
   
       setOpen(false);
       setEditingSize(null);
       fetchProducts();
     };
   
     const handleSizesEdit = (item) => {
       setEditingSize(item);
       setSizesform({
        waist_shoe_size: item.waist_shoe_size,
        hips: item.hips,
        height: item.height,
        product: item.product,
       });
       setOpen(true);
     };
   
     const handleSizesDelete = async (id) => {
       if (!confirm("Delete size?")) return;
       await api.delete(`/products/product_size_in/${id}/`);
       fetchProducts();
     };
   


/*colors*/

const handleColorsSubmit = async (e) => {
       e.preventDefault();
       const fd = new FormData();
       Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
       
   
       if (editingSize) {
         await api.put(`/products/product_color_in/${editingSize.id}/`, fd, {
     headers: {
       "Content-Type": "multipart/form-data",
     },
   });
       } else {
         await api.post("/products/product_color_in/", fd, {
     headers: {
       "Content-Type": "multipart/form-data",
     },
   });
       }
   
       setOpen(false);
       setEditingSize(null);
       fetchProducts();
     };
   
     const handleColorsEdit = (item) => {
       setEditingColor(item);
       setColorform({
        product_size:item.product_size,
        color_name:item.color_name,
        hex_code:item.hex_code,
        quantity:item.quantity,
       });
       setOpen(true);
     };
   
     const handleColorsDelete = async (id) => {
       if (!confirm("Delete Color?")) return;
       await api.delete(`/products/product_color_in/${id}/`);
       fetchProducts();
     }; 
   

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{product.name}</h1>

      <img src={product.image} className="w-48 mt-4 rounded" />

      <p className="mt-2">{product.description}</p>

      {product.price}
      
    </div>
  );
};


export default ProductDetails;
