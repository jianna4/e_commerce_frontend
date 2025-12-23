import { useState } from "react";
import { Link } from "react-router-dom";
import api from '../../apis/axiosInstance';

const BASE_URL = "http://127.0.0.1:8000";

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null); // pending | completed

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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 relative">
            
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Product Info */}
            <img
              src={imageUrl}
              alt={product.name}
              className="h-48 w-full object-cover rounded"
            />

            <h2 className="text-xl font-bold">{product.name}</h2>

            <p className="text-gray-600 text-sm">
              {product.description}
            </p>

            <p className="font-bold text-lg text-orange-600">
              KES {product.price}
            </p>

            {/* STATUS */}
            {status === "pending" && (
              <p className="text-yellow-600 font-medium">
                🕒 Added to cart (pending)
              </p>
            )}

            {status === "completed" && (
              <p className="text-[#006400] font-medium">
                ✅ Payment confirmed (completed)
              </p>
            )}

            {/* ACTIONS */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStatus("pending")}
                className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-100"
              >
                Add to Cart
              </button>

              <button
                onClick={() => setStatus("completed")}
                className="flex-1 bg-[#006400] text-white py-2 rounded hover:bg-[#006400]"
              >
                Confirm Payment
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
