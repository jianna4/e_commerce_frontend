import { NavLink } from "react-router-dom";

const Nav = () => {
  const linkClasses = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-black font-semibold"
        : "text-black hover:text-blue"
    }`;

  return (
    <aside className="w-64 bg-dark text-white p-6">
      <h1 className="text-xl font-bold text-primary mb-8">Admin</h1>

      <nav className="space-y-4 flex flex-col">
        <NavLink to="/admin2/products" className={linkClasses}>
          Products
        </NavLink>

        <NavLink to="/admin2/categories" className={linkClasses}>
          Categories
        </NavLink>

        <NavLink to="/admin2/subcategories" className={linkClasses}>
          Subcategories
        </NavLink>

        <NavLink to="/admin2/mainoffers" className={linkClasses}>
          Main Offers
        </NavLink>

        <NavLink to="/admin2/offers" className={linkClasses}>
          Offers
        </NavLink>

        <NavLink to="/admin2/orders" className={linkClasses}>
          Orders
        </NavLink>

        <NavLink to="/admin2/users" className={linkClasses}>
          Users
        </NavLink>
      </nav>
    </aside>
  );
};

export default Nav;
