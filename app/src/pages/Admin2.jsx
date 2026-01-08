import { Outlet } from "react-router-dom";


import Nav from "./zadmin/Nav.jsx";

const Admin2 = () => {
  return (
    <div className="flex min-h-screen bg-adminGray">
      {/* Sidebar */}
      <Nav />

      {/* Page Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm border border-adminBorder p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin2;
