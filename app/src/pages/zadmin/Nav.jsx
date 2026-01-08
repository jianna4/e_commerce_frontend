import { NavLink } from "react-router-dom";

const Nav = () => {
  const linkClasses = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-primary font-semibold"
        : "text-black hover:text-primary"
    }`;

  return (
    <aside className="w-64 bg-dark text-white p-6">
      <h1 className="text-xl font-bold text-primary mb-8">Admin</h1>

      <nav className="space-y-4 flex flex-col">
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
