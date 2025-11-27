import Sidebar from "@/components/common/SideBar";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex">
      <Sidebar role="admin" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
