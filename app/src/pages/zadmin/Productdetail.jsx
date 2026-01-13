import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../apis/axiosInstance";
import AdminModal from "./Modal";
const BASE_URL = "http://127.0.0.1:8000";

const ProductDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true); // ← Added

  const [editingType, setEditingType] = useState(null); // 'product', 'size', 'color'
  const [editingItem, setEditingItem] = useState(null);

  const [product, setProduct] = useState(null);

  // Forms
  const [productForm, setProductForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const [sizeForm, setSizeForm] = useState({
    waist_shoe_size: "",
    hips: "",
    height: "",
    product: id, // auto-link to current product
  });

  const [colorForm, setColorForm] = useState({
    product_size: "", // this should be a size ID
    color_name: "",
    hex_code: "",
    quantity: "",
  });

  // Fetch product
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/products/${id}/`);
      setProduct(res.data);

      // Preload main product form
      setProductForm({
        name: res.data.name || "",
        slug: res.data.slug || "",
        description: res.data.description || "",
        price: res.data.price || "",
        stock: res.data.stock || "",
        image: null, // don't prefill file input
      });
    } catch (err) {
      console.error("Failed to fetch product", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  // ===== PRODUCT HANDLERS =====
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(productForm).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        fd.append(key, value);
      }
    });
    fd.append("is_active", "true");

    try {
      if (editingItem) {
        await api.put(`/products/productin/${editingItem.id}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products/productin/", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchProduct(); // refresh
    } catch (err) {
      console.error("Error saving product", err);
    }
    handleCloseModal();
  };

  const handleProductEdit = () => {
    setEditingType("product");
    setEditingItem(product);
    setProductForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: null,
    });
    setOpen(true);
  };

  // ===== SIZE HANDLERS =====
  const handleSizeSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(sizeForm).forEach(([key, value]) => {
      if (value) fd.append(key, value);
    });

    try {
      if (editingItem) {
        await api.put(`/products/product_size_in/${editingItem.id}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products/product_size_in/", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchProduct();
    } catch (err) {
      console.error("Error saving size", err);
    }
    handleCloseModal();
  };

  const handleSizeEdit = (size) => {
    setEditingType("size");
    setEditingItem(size);
    setSizeForm({
      waist_shoe_size: size.waist_shoe_size || "",
      hips: size.hips || "",
      height: size.height || "",
      product: id,
    });
    setOpen(true);
  };

  const handleSizeAdd = () => {
    setEditingType("size");
    setEditingItem(null);
    setSizeForm({
      waist_shoe_size: "",
      hips: "",
      height: "",
      product: id,
    });
    setOpen(true);
  };

  const handleSizeDelete = async (sizeId) => {
    if (!window.confirm("Delete this size?")) return;
    try {
      await api.delete(`/products/product_size_in/${sizeId}/`);
      fetchProduct();
    } catch (err) {
      console.error("Error deleting size", err);
    }
  };

  // ===== COLOR HANDLERS =====
  const handleColorSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(colorForm).forEach(([key, value]) => {
      if (value) fd.append(key, value);
    });

    try {
      if (editingItem) {
        await api.put(`/products/product_color_in/${editingItem.id}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products/product_color_in/", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchProduct();
    } catch (err) {
      console.error("Error saving color", err);
    }
    handleCloseModal();
  };

  const handleColorEdit = (color) => {
    setEditingType("color");
    setEditingItem(color);
    setColorForm({
      product_size: color.product_size?.id || color.product_size || "",
      color_name: color.color_name || "",
      hex_code: color.hex_code || "",
      quantity: color.quantity || "",
    });
    setOpen(true);
  };

  const handleColorAdd = (sizeId) => {
    setEditingType("color");
    setEditingItem(null);
    setColorForm({
      product_size: sizeId,
      color_name: "",
      hex_code: "",
      quantity: "",
    });
    setOpen(true);
  };

  const handleColorDelete = async (colorId) => {
    if (!window.confirm("Delete this color?")) return;
    try {
      await api.delete(`/products/product_color_in/${colorId}/`);
      fetchProduct();
    } catch (err) {
      console.error("Error deleting color", err);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditingType(null);
    setEditingItem(null);
  };
  
  if (loading) return <div className="p-6">Loading product...</div>;
  if (!product) return <div className="p-6">Product not found.</div>;


  const imageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `${api.defaults.baseURL}${product.image}`
    : "/placeholder.png";
  // ===== RENDER MODAL CONTENT DYNAMICALLY =====
  const renderModalContent = () => {
    const commonInputClass =
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

    if (editingType === "product") {
      return (
        <form onSubmit={handleProductSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
            className={commonInputClass}
            required
          />
          <input
            type="text"
            placeholder="Slug"
            value={productForm.slug}
            onChange={(e) =>
              setProductForm({ ...productForm, slug: e.target.value })
            }
            className={commonInputClass}
          />
          <textarea
            placeholder="Description"
            value={productForm.description}
            onChange={(e) =>
              setProductForm({ ...productForm, description: e.target.value })
            }
            className={commonInputClass}
            rows="3"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({ ...productForm, price: e.target.value })
            }
            className={commonInputClass}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={productForm.stock}
            onChange={(e) =>
              setProductForm({ ...productForm, stock: e.target.value })
            }
            className={commonInputClass}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProductForm({ ...productForm, image: e.target.files[0] })
            }
            className="mt-2"
          />
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      );
    }

    if (editingType === "size") {
      return (
        <form onSubmit={handleSizeSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Waist / Shoe Size"
            value={sizeForm.waist_shoe_size}
            onChange={(e) =>
              setSizeForm({ ...sizeForm, waist_shoe_size: e.target.value })
            }
            className={commonInputClass}
            required
          />
          <input
            type="text"
            placeholder="Hips"
            value={sizeForm.hips}
            onChange={(e) =>
              setSizeForm({ ...sizeForm, hips: e.target.value })
            }
            className={commonInputClass}
          />
          <input
            type="text"
            placeholder="Height"
            value={sizeForm.height}
            onChange={(e) =>
              setSizeForm({ ...sizeForm, height: e.target.value })
            }
            className={commonInputClass}
          />
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingItem ? "Update" : "Add"} Size
            </button>
          </div>
        </form>
      );
    }

    if (editingType === "color") {
      return (
        <form onSubmit={handleColorSubmit} className="space-y-4">
          {/* Hidden or disabled size selector if editing */}
          <input
            type="text"
            placeholder="Size ID (auto-filled)"
            value={colorForm.product_size}
            readOnly
            className={`${commonInputClass} bg-gray-100`}
          />
          <input
            type="text"
            placeholder="Color Name"
            value={colorForm.color_name}
            onChange={(e) =>
              setColorForm({ ...colorForm, color_name: e.target.value })
            }
            className={commonInputClass}
            required
          />
          <input
            type="text"
            placeholder="Hex Code (e.g. #FF5733)"
            value={colorForm.hex_code}
            onChange={(e) =>
              setColorForm({ ...colorForm, hex_code: e.target.value })
            }
            className={commonInputClass}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={colorForm.quantity}
            onChange={(e) =>
              setColorForm({ ...colorForm, quantity: e.target.value })
            }
            className={commonInputClass}
            required
          />
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingItem ? "Update" : "Add"} Color
            </button>
          </div>
        </form>
      );
    }

    return null;
  };

  // ===== LOADING & EMPTY STATE =====
  if (loading) return <div className="p-6">Loading product...</div>;
  if (!product) return <div className="p-6">Product not found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Details</h1>

      {/* Main Product Card */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {product.image && (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-48 h-48 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <p className="mt-2">
              <span className="font-medium">Price:</span> ${product.display_price}
            </p>
            <p>
              <span className="font-medium">Stock:</span> {product.stock}
            </p>
            <p>
              <span className="font-medium">Slug:</span> {product.slug}
            </p>
            <button
              onClick={handleProductEdit}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>

      {/* Sizes Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sizes</h2>
          <button
            onClick={handleSizeAdd}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            + Add Size
          </button>
        </div>
        {product.sizes && product.sizes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.sizes.map((size) => (
              <div key={size.id} className="border p-4 rounded-lg">
                <p>
                  <strong>Size:</strong> {size.waist_shoe_size}
                </p>
                {size.hips && <p>Hips: {size.hips}</p>}
                {size.height && <p>Height: {size.height}</p>}
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() => handleSizeEdit(size)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleSizeDelete(size.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>

                {/* Colors under this size */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Colors:</span>
                    <button
                      onClick={() => handleColorAdd(size.id)}
                      className="text-xs text-green-600 hover:underline"
                    >
                      + Add Color
                    </button>
                  </div>
                  {size.colors && size.colors.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {size.colors.map((color) => (
                        <div
                          key={color.id}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          style={{ backgroundColor: color.hex_code || "#f9f9f9" }}
                        >
                          <span>{color.color_name || "Unnamed"}</span>
                          <span>Qty: {color.quantity}</span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleColorEdit(color)}
                              className="text-blue-600 text-xs hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleColorDelete(color.id)}
                              className="text-red-600 text-xs hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm mt-1">No colors</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No sizes added yet.</p>
        )}
      </div>

      {/* Modal */}
      <AdminModal
        open={open}
        title={
          editingType === "product"
            ? editingItem
              ? "Edit Product"
              : "Add Product"
            : editingType === "size"
            ? editingItem
              ? "Edit Size"
              : "Add Size"
            : editingType === "color"
            ? editingItem
              ? "Edit Color"
              : "Add Color"
            : "Edit"
        }
        onClose={handleCloseModal}
      >
        {renderModalContent()}
      </AdminModal>
    </div>
  );
};

export default ProductDetails;