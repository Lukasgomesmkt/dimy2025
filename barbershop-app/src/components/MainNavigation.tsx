"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiCalendar, FiShoppingBag, FiVideo, FiMenu, FiHome } from "react-icons/fi";

interface MainNavigationProps {
  className?: string;
}

export function MainNavigation({ className = "" }: MainNavigationProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    return pathname.startsWith(path) && path !== "/dashboard";
  };

  return (
    <div className="flex flex-col w-full">
      {/* Navigation Bar */}
      <div className={`${className} bg-gray-200 dark:bg-gray-800 w-full`}>
        <div className="container mx-auto">
          <div className="flex items-center h-14">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 h-full">
              <NavLink
                href="/dashboard"
                active={isActive("/dashboard") || pathname === "/dashboard"}
                icon={<FiHome className="h-5 w-5" />}
              >
                Home
              </NavLink>
              <NavLink
                href="/dashboard/agenda"
                active={isActive("/dashboard/agenda")}
                icon={<FiCalendar className="h-5 w-5" />}
              >
                Agenda
              </NavLink>
              <NavLink
                href="/dashboard/products"
                active={isActive("/dashboard/products")}
                icon={<FiShoppingBag className="h-5 w-5" />}
              >
                Shopping
              </NavLink>
              <NavLink
                href="/dashboard/courses"
                active={isActive("/dashboard/courses")}
                icon={<FiVideo className="h-5 w-5" />}
              >
                Barberflix
              </NavLink>
              <NavLink
                href="/dashboard/functions"
                active={isActive("/dashboard/functions")}
                icon={<FiMenu className="h-5 w-5" />}
              >
                Funções
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
}

function NavLink({ href, active, children, icon }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 px-4 py-2 h-full border-b-2 transition-colors ${
        active
          ? "border-primary text-primary"
          : "border-transparent hover:bg-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );
}

// MobileNavLink foi movido para o componente MobileNavigation
