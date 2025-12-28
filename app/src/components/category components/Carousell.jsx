import React, { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000";

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
    <section className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            <span className="text-black">Featured</span>{" "}
            <span className="text-[#006400]">Products</span>
          </h2>
        </div>

        <div className="flex gap-6 flex-wrap md:flex-nowrap">
          {/* Left: Big product */}
          <div className="flex-1 md:flex-[2] h-80 relative rounded-xl shadow-lg overflow-hidden">
            <img
              src={
                getProduct(currentIndex).image
                  ? getProduct(currentIndex).image.startsWith("http")
                    ? getProduct(currentIndex).image
                    : `${BASE_URL}${getProduct(currentIndex).image}`
                  : "/placeholder.png"
              }
              alt={getProduct(currentIndex).name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-white/50 text-black p-4 w-full">
              <h3 className="font-semibold text-base md:text-lg">
                {getProduct(currentIndex).name}
              </h3>
              <p className="text-sm md:text-base line-clamp-2">
                {getProduct(currentIndex).description}
              </p>
            </div>
          </div>

          {/* Right: Two smaller products stacked */}
          <div className="flex flex-col gap-6 flex-1 md:flex-[1]">
            {[1, 2].map((offset) => {
              const product = getProduct(currentIndex + offset);
              return (
                <div
                  key={offset}
                  className="relative rounded-xl shadow-md overflow-hidden h-36 md:h-40"
                >
                  <img
                    src={
                      product.image
                        ? product.image.startsWith("http")
                          ? product.image
                          : `${BASE_URL}${product.image}`
                        : "/placeholder.png"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-white/40 text-black p-2 w-full">
                    <h3 className="font-medium text-sm md:text-base">
                      {product.name}
                    </h3>
                    <p className="text-xs md:text-sm line-clamp-1">
                      {product.description}
                    </p>
                    
                    
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
