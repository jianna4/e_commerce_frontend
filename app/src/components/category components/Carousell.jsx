import React from "react";

const FeaturedProductsCarousel = ({ products }) => {
  if (!products || products.length === 0) return null;

  // We will only show the first 3 for now, but can expand with scrolling later
  const [bigProduct, ...smallProducts] = products;

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Discover Our Top Picks
        </h2>

        {/* Carousel */}
        <div className="grid grid-cols-3 gap-6">
          {/* Big Product */}
          {bigProduct && (
            <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={bigProduct.image}
                alt={bigProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 text-white">
                <h3 className="text-xl font-bold">{bigProduct.name}</h3>
                <p className="text-sm">{bigProduct.description}</p>
              </div>
            </div>
          )}

          {/* Two smaller products */}
          {smallProducts.slice(0, 2).map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-end relative rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-1/2 object-cover"
              />
              <div className="bg-white/90 p-2">
                <h4 className="font-semibold text-gray-900 text-sm">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
