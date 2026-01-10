const AdminTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm text-gray-800">
        
        {/* HEADER */}
        <thead className="bg-[#5AB7E6]/10 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-4 text-left font-semibold uppercase tracking-wide text-gray-700"
              >
                {col.label}
              </th>
            ))}
            <th className="px-5 py-4 text-right font-semibold uppercase tracking-wide text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-6 py-10 text-center text-gray-500"
              >
                No records found
              </td>
            </tr>
          )}

          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`
                border-b border-gray-100
                transition-all duration-200
                hover:bg-[#5AB7E6]/5
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
              `}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-5 py-4 text-gray-700"
                >
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}

              {/* ACTIONS */}
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="
                      inline-flex items-center rounded-md
                      border border-[#5AB7E6]
                      px-3 py-1.5 text-xs font-medium
                      text-[#5AB7E6]
                      transition
                      hover:bg-[#5AB7E6]
                      hover:text-white
                      focus:outline-none
                    "
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => onDelete(item.id)}
                    className="
                      inline-flex items-center rounded-md
                      border border-red-500
                      px-3 py-1.5 text-xs font-medium
                      text-red-500
                      transition
                      hover:bg-red-500
                      hover:text-white
                      focus:outline-none
                    "
                  >
                    🗑 Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
