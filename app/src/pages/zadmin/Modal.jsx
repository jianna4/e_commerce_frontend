const AdminModal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/40 backdrop-blur-sm
    ">
      {/* Modal Card */}
      <div className="
        relative w-full max-w-lg
        rounded-2xl
        bg-white
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        border border-gray-200
        animate-[fadeIn_0.25s_ease-out]
      ">
        
        {/* Header */}
        <div className="
          flex items-center justify-between
          px-6 py-4
          border-b border-gray-200
          bg-gradient-to-r from-[#5AB7E6]/15 to-transparent
          rounded-t-2xl
        ">
          <h2 className="text-base font-semibold text-gray-800">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-full
              text-gray-500
              hover:bg-gray-100
              hover:text-gray-800
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="
          p-6
          max-h-[calc(90vh-80px)]
          overflow-y-auto
          text-sm text-gray-700
        ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
