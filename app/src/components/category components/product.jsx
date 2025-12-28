import { useState } from "react";
import { Link } from "react-router-dom";
import api from '../../apis/axiosInstance';
import ProductModal from "./productmodal";

const BASE_URL = "http://127.0.0.1:8000";

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${api.defaults.baseURL}${product.image}`
    : "/placeholder.png";

  return (
    <>
      {/* CARD */}
      <div className="border border-gray-200 shadow-xl rounded-lg overflow-hidden bg-gray hover:shadow-gray-400 hover:border-2 hover:border-gray-300 transition">
        <Link to={`/product/${product.id}`}>
          <img
            src={imageUrl}
            alt={product.name}
            className="h-48 w-full object-cover"
          />
        </Link>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold">{product.name}</h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <p className="font-bold text-orange-600">
            KES {product.price}
          </p>

          <button
            onClick={() => setOpen(true)}
            className="w-full bg-[#006400] text-white py-2 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* POPUP MODAL */}
     
         {open && (
        <ProductModal
          product={product}
          imageUrl={imageUrl}
          onClose={() => setOpen(false)}
        />
      )}
     
    </>
  );
};

export default ProductCard;
