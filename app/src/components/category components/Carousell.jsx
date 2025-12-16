import React, { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000"; // your backend base URL

const FeaturedProductsCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [products.length]);

  if (!products || products.length === 0) return null;

  const getProduct = (index) => products[index % products.length];

  return (
    <section className="bg-gray-100 py-2">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center">
        <h2 className="text-2xl  md:text-3xl font-bold text-gray-900 mb-4">
          <span className="text-black">Featured</span>{" "}
          <span className="text-[#006400]">Products</span>
        </h2></div>

        <div className="flex gap-4 h-100 overflow-hidden">
          {/* Left: Big product */}
          <div className=" w-1/2 h-64 md:h-80 relative rounded-lg shadow-lg overflow-hidden">
            <img
              src={getProduct(currentIndex).image
                ? getProduct(currentIndex).image.startsWith("http")
                  ? getProduct(currentIndex).image
                  : `${BASE_URL}${getProduct(currentIndex).image}`
                : "/placeholder.png"}
              alt={getProduct(currentIndex).name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black/50 text-white p-3 w-full">
              <h3 className="font-semibold text-sm md:text-base">{getProduct(currentIndex).name}</h3>
              <p className="text-xs md:text-sm line-clamp-2">{getProduct(currentIndex).description}</p>
            </div>
          </div>

          {/* Right: Two smaller products */}
          <div className="flex flex-col gap-4 w-1/2">
            {[1, 2].map((offset) => {
              const product = getProduct(currentIndex + offset);
              return (
                <div key={offset} className="flex-1 relative rounded-lg shadow overflow-hidden h-28 md:h-36">
                  <img
                    src={product.image
                      ? product.image.startsWith("http")
                        ? product.image
                        : `${BASE_URL}${product.image}`
                      : "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-black/40 text-white p-2 w-full">
                    <h3 className="font-medium text-xs md:text-sm">{product.name}</h3>
                    <p className="text-[10px] md:text-xs line-clamp-1">{product.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
