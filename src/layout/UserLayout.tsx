import Sidebar from "@/components/common/SideBar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex">
      <Sidebar role="user" />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
