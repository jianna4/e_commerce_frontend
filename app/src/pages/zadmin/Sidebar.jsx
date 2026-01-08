import { NavLink } from "react-router-dom";

const Sidebarr = () => {
  const linkClasses = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-primary font-semibold"
        : "text-black hover:text-primary"
    }`;

  return (
    <aside className="w-64 bg-dark text-white p-6">
      <h1 className="text-xl font-bold text-primary mb-8">
        Admin
      </h1>

      <nav className="space-y-4 flex flex-col">
        <NavLink to="/zadmin/products" className={linkClasses}>
          Products
        </NavLink>

        <NavLink to="/zadmin/categories" className={linkClasses}>
          Categories
        </NavLink>
        <NavLink to="/zadmin/subcategories" className={linkClasses}>
          Subcategories
        </NavLink>
        <NavLink to="/zadmin/Main offers" className={linkClasses}>
          Main offers
        </NavLink>

        <NavLink to="/zadmin/offers" className={linkClasses}>
          Offers
        </NavLink>
        <NavLink to="/zadmin/orders" className={linkClasses}>
          Orders
        </NavLink>
        <NavLink to="/zadmin/users" className={linkClasses}>
          Users
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebarr;
