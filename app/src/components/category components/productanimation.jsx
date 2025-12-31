import { motion } from "framer-motion";

import api from '../../apis/axiosInstance';

const random = (min, max) => Math.random() * (max - min) + min;

const AnimatedProductCloud = ({ products = [] }) => {
  if (!products.length) return null;

  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden">
      {products.slice(0, 6).map((product, index) => {
        const imageUrl = product.image
          ? `${api.defaults.baseURL}${product.image}`
          : "/placeholder.png";

        return (
          <motion.img
            key={product.id}
            src={imageUrl}
            alt=""
            className="absolute w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl shadow-xl"
            initial={{
              x: random(-50, 200),
              y: random(-30, 150),
              rotate: random(-10, 10),
              opacity: 0,
            }}
            animate={{
              x: random(0, 300),
              y: random(0, 200),
              rotate: random(-15, 15),
              opacity: 1,
            }}
            transition={{
              duration: random(8, 14),
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: index * 0.4,
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedProductCloud;