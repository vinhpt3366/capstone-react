import React, { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-xl font-bold">Logo</div>
      <div>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Chào, {user.name}</span>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Đăng xuất</button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Đăng nhập</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Đăng ký</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
