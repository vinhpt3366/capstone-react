import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg p-6 w-[90%] max-w-md flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full border-2 border-red-400 flex items-center justify-center mb-4">
          <X className="w-8 h-8 text-red-400" />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-medium text-gray-700 mb-2">Bạn chưa đăng nhập</h2>
        <p className="text-gray-600 mb-6">Bạn có muốn đăng nhập không ?</p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button onClick={handleLogin} className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Đồng ý
          </button>
          <button onClick={onClose} className="px-8 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
