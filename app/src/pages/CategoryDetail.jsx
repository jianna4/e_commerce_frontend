import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryHero from "../components/category components/hero";
import SubCategorySection from "../components/category components/subcategory";
import FeaturedProductsCarousel from "../components/category components/Carousell";
import api from '../apis/axiosInstance'; //importing the global axios instance

const CategoryDetail = () => {
  const { slug } = useParams(); // from URL
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get(`/products/categories/${slug}/`)
      .then((res) => {
        setCategory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load category:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p className="text-center mt-20">Loading category...</p>;
  }

  if (!category) {
    return <p className="text-center mt-20">Category not found.</p>;
  }

  const allProducts = category.subcategories.flatMap(sub => sub.products);
  //this is used to loop through all products in the category,we use flatmap to flatten the array of arrays,sub is just a variable name for each subcategory

  return (
    <div>
      <CategoryHero category={category} />

      <FeaturedProductsCarousel products={allProducts} />

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
       {(!category.subcategories || category.subcategories.length === 0) && (
       <p className="text-gray-500">No subcategories available.</p>
          )}

        {category.subcategories.map((sub) => (
          <SubCategorySection key={sub.id} subcategory={sub} />
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
