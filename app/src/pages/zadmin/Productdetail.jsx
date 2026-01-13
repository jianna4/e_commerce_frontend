import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../apis/axiosInstance";




const ProductDetails = () => {

  const{id} = useParams()
  const[open,setOpen]=useState(false);
  const[editing,setEditing]=useState(null);
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
    } catch (err) {
      console.error("Failed to fetch products", err);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [id]);



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
