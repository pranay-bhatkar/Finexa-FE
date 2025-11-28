import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  HandCoins,
  LayoutDashboard,
  type LucideIcon,
  Menu,
  Settings,
  Tags,
  User,
  Users,
  X,
} from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../btn/LogoutBtn";
import "./index.css";
import { useNotifications } from "@/providers/NotificationProvider";

interface SidebarProps {
  role: "admin" | "user";
}

interface LinkItem {
  name: string;
  path: string;
  icon: LucideIcon;
  children?: LinkItem[];
}

const Sidebar: FC<SidebarProps> = ({ role }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const { unreadCount } = useNotifications();

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleMobileDrawer = () => setMobileDrawer((prev) => !prev);

  // Close mobile drawer if screen width >= md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileDrawer(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const adminLinks: LinkItem[] = [
    { name: "Dashboard", path: ROUTES.ADMIN.DASHBOARD, icon: LayoutDashboard },
    { name: "Users", path: ROUTES.ADMIN.USERS, icon: Users },
    { name: "Settings", path: ROUTES.ADMIN.SETTINGS, icon: Settings },
    { name: "Profile", path: ROUTES.ADMIN.PROFILE, icon: User },
  ];

  const userLinks: LinkItem[] = [
    {
      name: "Dashboard",
      path: ROUTES.USER.DASHBOARD,
      icon: LayoutDashboard,
      // children: [
      //   {
      //     name: "Overview",
      //     path: ROUTES.USER.DASHBOARD,
      //     icon: LayoutDashboard,
      //   },
      // ],
    },
    { name: "Transactions", path: ROUTES.USER.TRANSACTIONS, icon: HandCoins },
    { name: "Categories", path: ROUTES.USER.CATEGORIES, icon: Tags },
    { name: "Profile", path: ROUTES.USER.PROFILE, icon: User },
    { name: "Settings", path: ROUTES.USER.SETTINGS, icon: Settings },
    {
      name: "Notifications",
      path: ROUTES.USER.NOTIFICATIONS,
      icon: Bell,
    },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  const renderLink = (link: LinkItem, isMobile = false) => {
    const hasChildren = link.children && link.children.length > 0;
    const isOpen = openMenus[link.name];

    // If the link has children, render button to toggle
    if (hasChildren) {
      return (
        <div key={link.path} className="flex flex-col">
          <button
            type="button"
            onClick={() => toggleMenu(link.name)}
            className={`flex items-center justify-between gap-4 px-4 py-3 rounded-lg text-sm transition-colors border-2 w-full cursor-pointer ${
              isOpen
                ? "border-brand-primary/50 bg-brand-primary/40 text-brand-accent"
                : "border-transparent text-gray-300 hover:bg-brand-primary/20 hover:text-brand-accent"
            }`}
          >
            <div className="flex items-center gap-4">
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </div>
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Nested links */}
          <div
            className={`flex flex-col pl-10 mt-1 overflow-hidden transition-all duration-300 overflow-y-auto scrollbar-hide ${
              isOpen ? "max-h-40" : "max-h-0"
            }`}
          >
            {link.children!.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "border-brand-accent text-brand-accent font-medium"
                      : "border-transparent text-gray-300 hover:text-brand-accent"
                  }`
                }
                onClick={() => isMobile && setMobileDrawer(false)}
              >
                <child.icon className="w-4 h-4" />
                <span>{child.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      );
    }

    const isNotificationLink = link.name === "Notifications";

    // Normal link
    return (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) =>
          `flex items-center gap-4 px-4 py-3 rounded-lg text-sm transition-colors border-2 ${
            isActive
              ? "border-brand-primary/50 bg-brand-primary/40 text-brand-accent"
              : "border-transparent text-gray-300 hover:bg-brand-primary/20 hover:text-brand-accent"
          }`
        }
        onClick={() => isMobile && setMobileDrawer(false)}
      >
        <link.icon className="w-5 h-5" />

        {/* Text + Badge container */}
        <div className="flex items-center gap-5">
          <span>{link.name}</span>

          {isNotificationLink && unreadCount > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-2 text-xs font-bold leading-none text-brand-primary bg-[#1EF1C7] rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </NavLink>
    );
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <Card className="hidden md:flex flex-col w-64 h-screen p-4 shadow-xl bg-brand-midnight border-r border-brand-primary/30 fixed left-0 top-0">
        <CardContent className="flex flex-col gap-2 px-0 flex-1">
          {/* Logo */}
          <div className="px-3 pb-6">
            <h1 className="text-4xl font-extrabold text-brand-accent">
              Finexa
            </h1>
            <p className="text-sm text-gray-400 mt-1">Smart Finance Manager</p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1">
            {links.map((link) => renderLink(link))}
          </nav>
        </CardContent>

        <div className="pt-2">
          <LogoutButton />
        </div>
      </Card>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-brand-primary-dark border-t border-brand-primary/40 flex justify-between items-center py-2 px-4 backdrop-blur-md z-50">
        <button onClick={toggleMobileDrawer} className="cursor-pointer">
          {mobileDrawer ? (
            <X className="w-6 h-6 text-brand-accent" />
          ) : (
            <Menu className="w-6 h-6 text-gray-400" />
          )}
        </button>
        <span className="text-brand-accent font-semibold">Menu</span>
        <LogoutButton />
      </div>

      {/* MOBILE SLIDE-UP DRAWER */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-brand-midnight z-40 transition-transform duration-300 ease-in-out md:hidden ${
          mobileDrawer ? "translate-y-0" : "translate-y-full"
        } shadow-lg border-t border-brand-primary/30 max-h-[70%] overflow-y-auto`}
      >
        <nav className="flex flex-col gap-1 p-4 pb-20">
          {links.map((link) => renderLink(link, true))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
