"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiCalendar, FiShoppingBag, FiVideo, FiUser, FiSettings, FiLogOut, FiPackage } from "react-icons/fi";
import { Logo } from "./Logo";
import { logout } from "@/lib/auth-service";
import { useState, memo, useCallback } from "react";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

// Usando memo para evitar re-renderizações desnecessárias
const SidebarLink = memo(function SidebarLink({ href, icon, children, active }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
        active
          ? "bg-primary text-white"
          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      prefetch={false} // Evita pré-carregamento desnecessário
    >
      <span className="text-xl">{icon}</span>
      <span>{children}</span>
    </Link>
  );
});

export const Sidebar = memo(function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Usando useCallback para evitar recriação da função em cada renderização
  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, router]);

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Logo />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink
          href="/dashboard"
          icon={<FiCalendar />}
          active={pathname === "/dashboard" || pathname.startsWith("/dashboard/appointments")}
        >
          Agendamentos
        </SidebarLink>

        <SidebarLink
          href="/dashboard/orders"
          icon={<FiPackage />}
          active={pathname.startsWith("/dashboard/orders")}
        >
          Pedidos
        </SidebarLink>

        <SidebarLink
          href="/dashboard/products"
          icon={<FiShoppingBag />}
          active={pathname.startsWith("/dashboard/products")}
        >
          Produtos
        </SidebarLink>

        <SidebarLink
          href="/dashboard/courses"
          icon={<FiVideo />}
          active={pathname.startsWith("/dashboard/courses")}
        >
          Cursos
        </SidebarLink>

        <SidebarLink
          href="/dashboard/profile"
          icon={<FiUser />}
          active={pathname === "/dashboard/profile"}
        >
          Perfil
        </SidebarLink>

        <SidebarLink
          href="/dashboard/settings"
          icon={<FiSettings />}
          active={pathname === "/dashboard/settings"}
        >
          Configurações
        </SidebarLink>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center space-x-3 p-3 w-full rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-xl"><FiLogOut /></span>
          <span>{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
        </button>
      </div>
    </div>
  );
}
