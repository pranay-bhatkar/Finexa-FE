import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"; // Shadcn Breadcrumb
import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";

// Optional: Map route paths to readable names
const routeNameMap: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/dashboard/analytics": "Analytics",
  "/transactions": "Transactions",
  "/categories": "Categories",
  "/profile": "Profile",
  "/settings": "Settings",
};

const AppBreadcrumb: FC = () => {
  const location = useLocation();

  // Split path into parts
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="w-4 h-4 text-gray-400">
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>

      {pathnames.map((_, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const name = routeNameMap[to] || pathnames[index];

        return (
          <BreadcrumbItem key={to} aria-current={isLast ? "page" : undefined}>
            {isLast ? (
              <span className="text-gray-400">{name}</span>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={to}>{name}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
