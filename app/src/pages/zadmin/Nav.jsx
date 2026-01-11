import { NavLink } from "react-router-dom";

const Nav = () => {
  const linkClasses = ({ isActive }) =>
    `
      block rounded-lg px-4 py-2.5
      text-sm font-medium
      transition-all duration-200
      ${
        isActive
          ? "bg-[#5AB7E6]/15 text-[#5AB7E6]"
          : "text-gray-300 hover:bg-white/5 hover:text-white"
      }
    `;

  return (
    <aside className="
      w-64 min-h-screen
      bg-gray-800
      border-r border-white/10
      p-6
    ">
      {/* Title */}
      <h1 className="
        text-xl font-bold
        text-[#5AB7E6]
        mb-10
        tracking-wide
      ">
        Admin Panel
      </h1>

      {/* Navigation */}
      <nav className="space-y-1">
        <NavLink to="/admin/products" className={linkClasses}>
          Products
        </NavLink>

        <NavLink to="/admin/categories" className={linkClasses}>
          Categories
        </NavLink>

        <NavLink to="/admin/subcategories" className={linkClasses}>
          Subcategories
        </NavLink>

        <NavLink to="/admin/mainoffers" className={linkClasses}>
          Main Offers
        </NavLink>

        <NavLink to="/admin/offers" className={linkClasses}>
          Offers
        </NavLink>

        <NavLink to="/admin/orders" className={linkClasses}>
          Orders
        </NavLink>

        <NavLink to="/admin/users" className={linkClasses}>
          Users
        </NavLink>
      </nav>
    </aside>
  );
};

export default Nav;
