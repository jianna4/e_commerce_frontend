import { Link } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

const ProductCard = ({ product }) => {
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image}`
    : "/placeholder.png"; // optional fallback

  return (
    <Link
      to={`/product/${product.id}`}
      className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition"
    >
      <img
        src={imageUrl}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{product.name}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <p className="font-bold text-orange-600">
          KES {product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
