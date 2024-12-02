import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogIn, ShoppingCart, LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/user.slice";

const UserButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    dispatch(logout());
  };

  if (!currentUser) {
    return (
      <button
        type="button"
        className="text-sm sm:text-base text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 text-xs mr-2 flex items-center whitespace-nowrap"
        onClick={handleLogin}
      >
        <LogIn className="size-4 mr-1" /> Login
      </button>
    );
  }

  const handleCartClick = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button type="button" className="relative bg-blue-100 flex items-center hover:opacity-80 transition-opacity mr-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <div className="relative">
          <UserCircle className="size-5 sm:size-5 text-custom-500 dark:text-custom-400" />
          {/* <div className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-medium text-white pointer-events-none">{currentUser.name?.charAt(0).toUpperCase() || "U"}</div> */}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />

          {/* Dropdown content */}
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
            {/* User Info */}
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
            </div>

            <div onClick={handleCartClick} className="w-full text-left px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100 flex items-center">
              <ShoppingCart className="size-4 mr-2" />
              Giỏ hàng
            </div>

            <div className="border-t border-gray-100">
              <div onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100 flex items-center">
                <LogOut className="size-4 mr-2" />
                Logout
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserButton;
