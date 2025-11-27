import { NavLink } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import type { FC } from "react";

interface SidebarProps {
  role: "admin" | "user";
}

const Sidebar: FC<SidebarProps> = ({ role }) => {
  const commonLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Profile", path: "/profile" },
  ];

  const adminLinks = [
    { name: "Users", path: "/admin/users" },
    { name: "Settings", path: "/admin/settings" },
  ];

  const links =
    role === "admin" ? [...commonLinks, ...adminLinks] : commonLinks;

  return (
    <Card className="w-64 h-screen p-4 shadow-lg">
      <CardContent className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-bold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </CardContent>
    </Card>
  );
};

export default Sidebar;
