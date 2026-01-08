const AdminTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 border-b">
        <tr>
          {columns.map(col => (
            <th key={col.key} className="text-left px-4 py-3 font-medium">
              {col.label}
            </th>
          ))}
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            {columns.map(col => (
              <td key={col.key} className="px-4 py-3">
                {col.render ? col.render(item) : item[col.key]}
              </td>
            ))}
            <td className="px-4 py-3 text-right space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="text-primary hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
