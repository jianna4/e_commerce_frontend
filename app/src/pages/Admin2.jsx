

import Sidebarr from "./zadmin/Sidebar";
const Admin2 = ({ title, action, children }) => {
  return (
    <div className="flex">
      <Sidebarr />
      <div className="flex-1 min-h-screen bg-adminGray p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-adminText">
              {title}
            </h1>
            {action}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-adminBorder">
          {children}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Admin2;