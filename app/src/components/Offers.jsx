import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../../apis/axiosInstance";

const OffersSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/products/")  // your endpoint
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);
  const OfferProducts= products.filter(
    product=>product.active_offer
  );
  //now we group products according to campaign titles
  
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Hot Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default OffersSection;
