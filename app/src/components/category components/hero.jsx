
import api from '../../apis/axiosInstance';

const CategoryHero = ({ category }) => {
  // Handle image URL
  const imageUrl = category.image
    ? category.image.startsWith("http")
      ? category.image
      : `${api.defaults.baseURL}${category.image}`
    : "/placeholder.png"; // fallback if no image

  return (
    <div className="bg-gray-100 min-h-screen pt-6">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT: Text */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900">
              Explore our
              <div className="text-[#006400]"> {category.name}</div>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              {category.description}
            </p>
          </div>

          {/* RIGHT: Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={imageUrl}
              alt={category.name}
              className="
                w-full
                max-w-md
                h-72
                object-cover
                rounded-xl
                shadow-lg
              "
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
