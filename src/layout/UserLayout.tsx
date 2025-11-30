import Sidebar from "@/components/common/sidebar/SideBar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex">
      <Sidebar role="user" />
      <main className="flex-1 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
