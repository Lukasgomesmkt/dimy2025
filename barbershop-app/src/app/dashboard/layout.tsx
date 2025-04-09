"use client";

import { Header } from "@/components/Header";
import { MainNavigation } from "@/components/MainNavigation";
import { MobileNavigation } from "@/components/MobileNavigation";
import { FunctionsMenu } from "@/components/FunctionsMenu";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Dashboard" />
      <MainNavigation />

      <div className="flex-1 flex overflow-hidden scrollbar-hide">
        <main className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4 scrollbar-hide">
          {children}
        </main>

        {/* Menu de Funções Fixo na Lateral Direita - Apenas Desktop */}
        <div className="hidden md:block w-64 border-l border-gray-200 dark:border-gray-700 overflow-y-auto scrollbar-hide">
          <FunctionsMenu className="h-full rounded-none shadow-none" />
        </div>
      </div>

      {/* Navegação mobile */}
      <MobileNavigation />
    </div>
  );
}
