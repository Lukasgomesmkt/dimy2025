"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiShoppingBag,
  FiVideo,
  FiPieChart,
  FiTrendingUp,
  FiDollarSign,
  FiBarChart2,
  FiSettings,
  FiSun,
  FiMoon,
  FiLogOut,
  FiScissors
} from "react-icons/fi";
import { logout } from "@/lib/auth-service";
import AppointmentModal from "@/components/AppointmentModal";
import useAppointmentModal from "@/hooks/useAppointmentModal";

interface FunctionsMenuProps {
  onClose?: () => void;
  className?: string;
}

export function FunctionsMenu({ onClose, className = "" }: FunctionsMenuProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dados de exemplo para agendamentos
  const appointments = [];

  // Função para lidar com a criação de um novo agendamento
  const handleAppointmentCreated = (newAppointment: any) => {
    // Aqui você poderia adicionar o agendamento a uma lista ou enviar para uma API
    console.log("Novo agendamento criado:", newAppointment);
    // Redirecionar para a página de agenda
    router.push("/dashboard/agenda");
    // Fechar o menu de funções se estiver aberto
    if (onClose) onClose();
  };

  // Usar o hook personalizado para gerenciar o modal de agendamento
  const {
    isModalOpen,
    openModal,
    closeModal,
    handleSaveAppointment,
    clients,
    services,
    barbers
  } = useAppointmentModal(appointments, handleAppointmentCreated);

  // Verificar o tema atual ao carregar o componente
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);

  // Função para alternar o tema
  const toggleTheme = () => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark");
      setIsDarkMode(!isDarkMode);

      // Salvar preferência no localStorage
      localStorage.setItem("theme", isDarkMode ? "light" : "dark");
    }
  };

  // Função para fazer logout
  const handleLogout = () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    logout().then(() => {
      router.push('/auth/login');
    }).catch(error => {
      console.error('Erro ao fazer logout:', error);
      setIsLoggingOut(false);
    });
  };
  const menuItems = [
    {
      name: "Minha Barbearia",
      href: "/dashboard/functions/my-barbershop",
      icon: <FiHome className="h-5 w-5" />,
    },
    {
      name: "Novo Agendamento",
      icon: <FiCalendar className="h-5 w-5" />,
      onClick: openModal,
    },
    {
      name: "Clientes",
      href: "/dashboard/functions/clients",
      icon: <FiUsers className="h-5 w-5" />,
    },
    {
      name: "Adicionar Barbeiro",
      href: "/dashboard/functions/barbers/new",
      icon: <FiScissors className="h-5 w-5" />,
    },
    {
      name: "Adicionar Produtos",
      href: "/dashboard/products/new",
      icon: <FiShoppingBag className="h-5 w-5" />,
    },
    {
      name: "Adicionar Cursos",
      href: "/dashboard/courses/new",
      icon: <FiVideo className="h-5 w-5" />,
    },
    {
      name: "Gestão",
      href: "/dashboard/functions/management",
      icon: <FiPieChart className="h-5 w-5" />,
    },
    {
      name: "Marketing",
      href: "/dashboard/functions/marketing",
      icon: <FiTrendingUp className="h-5 w-5" />,
    },
    {
      name: "Vendas",
      href: "/dashboard/functions/sales",
      icon: <FiDollarSign className="h-5 w-5" />,
    },
    {
      name: "Relatórios",
      href: "/dashboard/functions/reports",
      icon: <FiBarChart2 className="h-5 w-5" />,
    },
    {
      name: "Configurações",
      href: "/dashboard/functions/settings",
      icon: <FiSettings className="h-5 w-5" />,
    },
  ];

  return (
    <div className={`py-2 bg-white dark:bg-gray-900 rounded-md shadow-lg ${className}`}>
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">Funções</h3>
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {menuItems.map((item) => (
          item.onClick ? (
            <button
              key={item.name}
              onClick={() => {
                item.onClick();
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
            >
              <span className="text-primary">{item.icon}</span>
              <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
            </button>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <span className="text-primary">{item.icon}</span>
              <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
            </Link>
          )
        ))}

        {/* Tema */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
        >
          <span className="text-primary">
            {isDarkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {isDarkMode ? "Tema Claro" : "Tema Escuro"}
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left disabled:opacity-50"
        >
          <span className="text-primary">
            <FiLogOut className="h-5 w-5" />
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {isLoggingOut ? "Saindo..." : "Sair"}
          </span>
        </button>
      </div>

      {/* Modal de Novo Agendamento - Componente Reutilizável */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveAppointment}
        barbers={barbers}
        services={services}
        clients={clients}
      />
    </div>
  );
}
