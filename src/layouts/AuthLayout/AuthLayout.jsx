import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "../../routes/path";

export default function AuthLayout({ children }) {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser) {
    if (currentUser.maLoaiNguoiDung === "QuanTri") {
      return <Navigate to={PATH.ADMIN} />;
    } else {
      return <Navigate to={PATH.HOME} />;
    }
  }
  return (
    <div>
      {children}
      <Outlet />
    </div>
  );
}
