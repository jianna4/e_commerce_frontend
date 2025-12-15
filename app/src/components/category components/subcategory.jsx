import ProductCard from "./product";

const SubCategorySection = ({ subcategory }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">
  {(() => {
    const words = subcategory.name.split(" ");
    return (
      <>
        <span className="text-black">{words[0]}</span>{" "}
        <span className="text-green-950">{words.slice(1).join(" ")}</span>
      </>
    );
  })()}
</h2>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        {subcategory.products.length === 0 && (
          <p className="text-gray-500">
            No products in this subcategory.
          </p>
        )}

        {subcategory.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default SubCategorySection;
