import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div>
      {children}
      <Outlet />
    </div>
  );
}
