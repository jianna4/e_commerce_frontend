import { useState } from "react";
import { motion } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const ProductModal = ({ product, imageUrl, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const availableColors = selectedSize?.colors || [];

  if (!product) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gray/70 backdrop-blur-sm flex items-center justify-center z-50"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      onClick={onClose}
    >
      <motion.div
        variants={modal}
        initial="hidden"
        animate="visible"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl  bg-gray-600 p-6 text-white"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          ✕
        </button>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -18 }}
          animate={{ opacity: 1, y: 0, rotate: -12 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <img
            src={imageUrl}
            alt={product.name}
            className="h-52 w-40 object-cover rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* INFO */}
        <motion.h2 variants={item} className="text-2xl font-bold">
          {product.name}
        </motion.h2>

        <motion.p variants={item} className="text-sm text-white/70">
          {product.description}
        </motion.p>

        <motion.p
          variants={item}
          className="text-lg font-bold text-[#5AB7E6]"
        >
          KES {product.price}
        </motion.p>

        {/* SIZES */}
        <motion.div variants={item}>
          <h4 className="font-semibold mt-4 mb-2">Size</h4>
          <div className="flex flex-wrap gap-2">
            {product.sizes?.map((size) => (
              <button
                key={size.id}
                onClick={() => {
                  setSelectedSize(size);
                  setSelectedColor(null);
                }}
                className={`px-3 py-1 rounded-full border transition
                  ${
                    selectedSize?.id === size.id
                      ? "bg-white text-black"
                      : "border-white/30 text-white"
                  }`}
              >
                {size.waist_shoe_size}
              </button>
            ))}
          </div>
        </motion.div>

        {/* COLORS */}
        {selectedSize && (
          <motion.div variants={item}>
            <h4 className="font-semibold mt-4 mb-2">Color</h4>
            <div className="flex gap-3">
              {availableColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition
                    ${
                      selectedColor?.id === color.id
                        ? "border-white scale-110"
                        : "border-white/30"
                    }`}
                  style={{ backgroundColor: color.hex_code || "#000" }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* BUTTON */}
        <motion.button
          variants={item}
          disabled={!selectedSize || !selectedColor}
          className="w-full mt-6 rounded-xl bg-white text-black py-2 font-semibold disabled:opacity-40"
        >
          Add to Cart
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
