export default function Sidebar() {
  return (
    <aside className="w-64 bg-dark text-white p-6">
      <h1 className="text-xl font-bold text-primary mb-8">Admin</h1>

      <nav className="space-y-4">
        <a href="/admin/products">Products</a>
        <a href="/admin/categories">Categories</a>
        <a href="/admin/offers">Offers</a>
      </nav>
    </aside>
  );
}
