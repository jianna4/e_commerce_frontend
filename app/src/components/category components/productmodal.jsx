import { useState } from "react";

const ProductModal = ({ product, imageUrl, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // ✅ FIX: backend sends `colors`, not `size_colors`
  const availableColors = selectedSize?.colors || [];

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={imageUrl}
          alt={product.name}
          className="h-48 w-full object-cover rounded"
        />

        {/* Info */}
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-600 text-sm">{product.description}</p>

        <p className="font-bold text-lg text-orange-600">
          KES {product.price}
        </p>

        {/* ---------- SIZES ---------- */}
        <div>
          <h4 className="font-semibold mb-2">Select Size</h4>
          <div className="flex flex-wrap gap-2">
            {product.sizes?.length > 0 ? (
              product.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => {
                    setSelectedSize(size);
                    setSelectedColor(null);
                  }}
                  className={`px-3 py-1 rounded border
                    ${
                      selectedSize?.id === size.id
                        ? "bg-[#006400] text-white"
                        : "bg-white"
                    }
                  `}
                >
                  {size.waist_shoe_size}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500">No sizes available</p>
            )}
          </div>
        </div>

        {/* ---------- COLORS ---------- */}
        {selectedSize && (
          <div>
            <h4 className="font-semibold mb-2">Select Color</h4>

            {availableColors.length > 0 ? (
              <div className="flex gap-3 flex-wrap">
                {availableColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    disabled={color.quantity === 0}
                    className={`w-8 h-8 rounded-full border-2
                      ${
                        selectedColor?.id === color.id
                          ? "border-black"
                          : "border-gray-300"
                      }
                      ${
                        color.quantity === 0
                          ? "opacity-40 cursor-not-allowed"
                          : ""
                      }
                    `}
                    title={`${color.color_name} (${color.quantity} left)`}
                    style={{
                      backgroundColor: color.hex_code || "#ccc",
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No colors for this size
              </p>
            )}
          </div>
        )}

        {/* ---------- QUANTITY ---------- */}
        {selectedColor && (
          <p className="text-sm text-gray-600">
            Available:{" "}
            <span className="font-semibold">
              {selectedColor.quantity}
            </span>
          </p>
        )}

        {/* ---------- ACTION ---------- */}
        <button
          disabled={!selectedSize || !selectedColor}
          className="w-full mt-4 bg-[#006400] text-white py-2 rounded disabled:opacity-50"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductModal;
