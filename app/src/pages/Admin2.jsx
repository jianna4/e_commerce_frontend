import Nav from "./zadmin/Nav.jsx";

const Admin2 = ({ title, action, children }) => {
  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <Nav />

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Bar */}
        <div className="
          sticky top-0 z-30
          bg-white/80 backdrop-blur
          border-b border-gray-200
        ">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              {title}
            </h1>
            {action}
          </div>
        </div>

        {/* Page Content */}
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="
              bg-white
              rounded-2xl
              border border-gray-200
              shadow-sm
              p-6
            ">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin2;
