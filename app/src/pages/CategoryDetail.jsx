import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryHero from "../components/category components/hero";
import SubCategorySection from "../components/category components/subcategory";

const CategoryDetail = () => {
  const { slug } = useParams(); // from URL
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/products/categories/${slug}/`)
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

  return (
    <div>
      <CategoryHero category={category} />

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
