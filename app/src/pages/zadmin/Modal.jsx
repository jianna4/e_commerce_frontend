const AdminModal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
        <div className="border-b px-6 py-4 flex justify-between">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="p-6">{children}</div>
         <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="admin-form"
            className="px-4 py-2 rounded bg-primary text-black"
          >
            Save
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default AdminModal;
