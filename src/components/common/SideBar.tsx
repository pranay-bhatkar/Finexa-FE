import { NavLink } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import type { FC } from "react";
import LogoutButton from "../btn/LogoutBtn";
import { ROUTES } from "@/constants/routes";

interface SidebarProps {
  role: "admin" | "user";
}

const Sidebar: FC<SidebarProps> = ({ role }) => {
  // ADMIN NAV
  const adminLinks = [
    { name: "Dashboard", path: ROUTES.ADMIN.DASHBOARD },
    { name: "Users", path: ROUTES.ADMIN.USERS },
    { name: "Settings", path: ROUTES.ADMIN.SETTINGS },
    { name: "Profile", path: ROUTES.ADMIN.PROFILE },
  ];


  // USER NAV
  const userLinks = [
    { name: "Dashboard", path: ROUTES.USER.DASHBOARD },
    { name: "Transactions", path: ROUTES.USER.TRANSACTIONS },
    { name: "Categories", path: ROUTES.USER.CATEGORIES },
    { name: "Profile", path: ROUTES.USER.PROFILE },
    { name: "Settings", path: ROUTES.USER.SETTINGS },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <Card className="w-64 h-screen p-4 shadow-lg flex flex-col justify-between">
      <CardContent className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-gray-200 transition ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </CardContent>

      <LogoutButton />
    </Card>
  );
};

export default Sidebar;
