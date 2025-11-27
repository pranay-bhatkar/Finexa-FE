import Sidebar from "@/components/common/SideBar";
import type { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex">
      <Sidebar role="user" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
