import { Outlet } from "react-router-dom";

export default function NonAuthLayout({ children }) {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="flex-1 w-full">
        {children}
        <Outlet />
      </main>
    </div>
  );
}
