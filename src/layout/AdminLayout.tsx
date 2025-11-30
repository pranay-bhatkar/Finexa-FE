import Sidebar from "@/components/common/sidebar/SideBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar role="admin" />
      <main className="flex-1 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
