import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../apis/axiosInstance";

const ProductDetails = () => {


  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/productin/${id}/`).then(res => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{product.name}</h1>

      <img src={product.image} className="w-48 mt-4 rounded" />

      <p className="mt-2">{product.description}</p>

      {/* MORE STAFF HERE 👇 */}
      {/* stock management */}
      {/* offers */}
      {/* variants */}
      {/* analytics */}
    </div>
  );
};


export default ProductDetails;
