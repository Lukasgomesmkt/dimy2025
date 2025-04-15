"use client";

import { FiCalendar, FiShoppingBag, FiVideo, FiUsers, FiDollarSign, FiTrendingUp, FiAward, FiScissors } from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";
import AppointmentModal from "@/components/AppointmentModal";
import useAppointmentModal from "@/hooks/useAppointmentModal";

export default function DashboardPage() {
  // Estado para controlar o filtro de período (hoje ou mês)
  const [periodFilter, setPeriodFilter] = useState<"today" | "month">("today");

  // Estado para controlar o slide atual do banner
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efeito para alternar os slides automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Dados de exemplo para agendamentos
  const appointments = [];

  // Função para lidar com a criação de um novo agendamento
  const handleAppointmentCreated = (newAppointment: any) => {
    // Aqui você poderia adicionar o agendamento a uma lista ou enviar para uma API
    console.log("Novo agendamento criado:", newAppointment);
    // Redirecionar para a página de agenda
    window.location.href = "/dashboard/agenda";
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

  // Dados de exemplo para acesso rápido
  const quickAccess = [
    {
      title: "Novo Agendamento",
      icon: <FiCalendar className="h-6 w-6" />,
      href: "#",
      onClick: openModal
    },
    { title: "Metas", icon: <FiTrendingUp className="h-6 w-6" />, href: "/dashboard/functions/goals" },
    { title: "Comissões", icon: <FiDollarSign className="h-6 w-6" />, href: "/dashboard/functions/commissions" },
    { title: "Mais Vendidos", icon: <FiShoppingBag className="h-6 w-6" />, href: "/dashboard/functions/top-products" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bem-vindo ao seu Negócio</h1>
      </div>

      {/* Principais Indicadores */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold mr-3">Principais Indicadores</h2>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md p-1">
              <button
                onClick={() => setPeriodFilter("today")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${periodFilter === "today" ? "bg-white dark:bg-gray-600 shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
              >
                Hoje
              </button>
              <button
                onClick={() => setPeriodFilter("month")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${periodFilter === "month" ? "bg-white dark:bg-gray-600 shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
              >
                Mês
              </button>
            </div>
          </div>
          <Link
            href="/dashboard/functions/reports"
            className="text-primary hover:text-primary-dark text-xs md:text-sm flex items-center"
          >
            <span>Ver mais</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Faturamento</p>
                <p className="text-xl font-semibold mt-1">{periodFilter === "today" ? "R$ 850" : "R$ 5.240"}</p>
                <p className="text-xs text-green-500 mt-1">{periodFilter === "today" ? "+10% vs ontem" : "+15% este mês"}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <FiDollarSign className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Ticket Médio</p>
                <p className="text-xl font-semibold mt-1">{periodFilter === "today" ? "R$ 90,00" : "R$ 85,00"}</p>
                <p className="text-xs text-green-500 mt-1">{periodFilter === "today" ? "+8% vs ontem" : "+5% este mês"}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <FiDollarSign className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Atendimentos</p>
                <p className="text-xl font-semibold mt-1">{periodFilter === "today" ? "12" : "82"}</p>
                <p className="text-xs text-green-500 mt-1">{periodFilter === "today" ? "+2 vs ontem" : "+8% este mês"}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <FiCalendar className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Novos Clientes</p>
                <p className="text-xl font-semibold mt-1">{periodFilter === "today" ? "3" : "19"}</p>
                <p className="text-xs text-green-500 mt-1">{periodFilter === "today" ? "+1 vs ontem" : "+12% este mês"}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <FiUsers className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner de Propagandas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64">
          {/* Slide 1 - Máquina de Corte */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="h-full flex items-center p-8">
              <div className="w-1/2">
                <div className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-2">OFERTA ESPECIAL</div>
                <h3 className="text-2xl font-bold text-white mb-2">Máquina de Corte Profissional</h3>
                <p className="text-white text-sm mb-4">Ideal para barbeiros exigentes. Precisão e durabilidade garantidas.</p>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300 line-through">R$ 350,00</span>
                  <span className="text-white font-bold text-xl">R$ 297,50</span>
                </div>
                <button className="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>

          {/* Slide 2 - Kit Barba */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="h-full flex items-center p-8">
              <div className="w-1/2">
                <div className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">NOVO</div>
                <h3 className="text-2xl font-bold text-white mb-2">Kit Barba Completo</h3>
                <p className="text-white text-sm mb-4">Tudo o que você precisa para cuidar da barba com estilo e qualidade.</p>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-bold text-xl">R$ 120,00</span>
                </div>
                <button className="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>

          {/* Slide 3 - Cadeira de Barbeiro */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="h-full flex items-center p-8">
              <div className="w-1/2">
                <div className="inline-block bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">POPULAR</div>
                <h3 className="text-2xl font-bold text-white mb-2">Cadeira de Barbeiro Clássica</h3>
                <p className="text-white text-sm mb-4">Conforto e estilo para seu salão. Design clássico com tecnologia moderna.</p>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-bold text-xl">R$ 1.200,00</span>
                </div>
                <button className="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>

          {/* Slide 4 - Pomada */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="h-full flex items-center p-8">
              <div className="w-1/2">
                <div className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">EXCLUSIVO</div>
                <h3 className="text-2xl font-bold text-white mb-2">Pomada Modeladora Premium</h3>
                <p className="text-white text-sm mb-4">Fixação extra forte e aroma exclusivo para um visual impecável.</p>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-bold text-xl">R$ 45,00</span>
                </div>
                <button className="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>

          {/* Slide 5 - Navalha */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="h-full flex items-center p-8">
              <div className="w-1/2">
                <div className="inline-block bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">ÚLTIMAS UNIDADES</div>
                <h3 className="text-2xl font-bold text-white mb-2">Navalha Profissional</h3>
                <p className="text-white text-sm mb-4">Precisão e durabilidade garantidas para o barbeiro profissional.</p>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-bold text-xl">R$ 75,00</span>
                </div>
                <button className="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>

          {/* Indicadores de navegação */}
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-primary' : 'bg-white bg-opacity-50'}`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ranking e Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Ranking de Barbeiros */}
        <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Ranking de Barbeiros</h2>
            <Link
              href="/dashboard/functions/reports"
              className="text-primary hover:text-primary-dark text-sm flex items-center"
            >
              <span>Ver mais</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Pódio Redesenhado - Estilo Horizontal */}
          <div className="flex items-center justify-center h-24 relative mb-2">
            {/* Base do Pódio */}
            <div className="absolute bottom-0 w-full h-10 flex items-end">
              {/* Segundo Lugar */}
              <div className="w-1/3 h-16 bg-gray-300 dark:bg-gray-700 rounded-t-md flex flex-col items-center justify-end pb-1 relative">
                <div className="absolute -top-10 w-full flex justify-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-500 dark:text-gray-300">2</span>
                    </div>
                  </div>
                </div>
                <p className="font-medium text-xs">Carlos</p>
                <p className="text-xs font-bold">8.7</p>
              </div>

              {/* Primeiro Lugar */}
              <div className="w-1/3 h-24 bg-yellow-400 rounded-t-md flex flex-col items-center justify-end pb-1 relative">
                <div className="absolute -top-12 w-full flex justify-center">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden border-2 border-yellow-300 flex items-center justify-center">
                      <FiAward className="h-8 w-8 text-yellow-500" />
                    </div>
                  </div>
                </div>
                <p className="font-bold text-white text-sm">Rafael</p>
                <p className="text-sm font-bold text-yellow-100">9.5</p>
              </div>

              {/* Terceiro Lugar */}
              <div className="w-1/3 h-12 bg-amber-700 rounded-t-md flex flex-col items-center justify-end pb-1 relative">
                <div className="absolute -top-8 w-full flex justify-center">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden border-2 border-amber-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-amber-700 dark:text-amber-500">3</span>
                    </div>
                  </div>
                </div>
                <p className="font-medium text-white text-xs">Pedro</p>
                <p className="text-xs font-bold text-amber-200">8.2</p>
              </div>
            </div>
          </div>

          {/* Legenda */}
          <div className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400">
            Ranking baseado na média de desempenho mensal
          </div>
        </div>

        {/* Botões de Ação Rápida */}
        <div className="flex flex-col space-y-2 md:space-y-3">
          <Link
            href="/dashboard/products/new"
            className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white rounded-lg shadow-md p-2 md:p-3 transition-colors"
          >
            <FiShoppingBag className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            <span className="font-medium text-sm md:text-base">+ Produto</span>
          </Link>

          <button
            onClick={openModal}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md p-2 md:p-3 transition-colors w-full"
          >
            <FiCalendar className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            <span className="font-medium text-sm md:text-base">+ Serviço</span>
          </button>

          <Link
            href="/dashboard/courses/new"
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md p-2 md:p-3 transition-colors"
          >
            <FiVideo className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            <span className="font-medium text-sm md:text-base">+ Curso</span>
          </Link>

          <Link
            href="/dashboard/functions/barbers/new"
            className="flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow-md p-2 md:p-3 transition-colors"
          >
            <FiScissors className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            <span className="font-medium text-sm md:text-base">+ Equipe</span>
          </Link>
        </div>
      </div>

      {/* Acesso Rápido */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccess.map((item, index) => (
            item.onClick ? (
              <button
                key={index}
                onClick={item.onClick}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left w-full"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
              </button>
            ) : (
              <Link
                key={index}
                href={item.href}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
              </Link>
            )
          ))}
        </div>
      </div>

      {/* Top 10 Produtos - Estilo Netflix */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Top 10 Produtos</h2>
          <Link
            href="/dashboard/functions/top-products"
            className="text-primary hover:text-primary-dark text-xs md:text-sm flex items-center"
          >
            <span>Ver mais</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {/* Produto 1 */}
            <div className="flex-shrink-0 w-36 md:w-44">
              <div className="relative">
                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  {/* Imagem do produto */}
                </div>
                <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>1</div>
              </div>
              <h3 className="mt-2 font-medium text-sm truncate">Pomada Modeladora</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">R$ 45,00</p>
            </div>

            {/* Produto 2 */}
            <div className="flex-shrink-0 w-36 md:w-44">
              <div className="relative">
                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  {/* Imagem do produto */}
                </div>
                <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>2</div>
              </div>
              <h3 className="mt-2 font-medium text-sm truncate">Óleo para Barba</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">R$ 35,00</p>
            </div>

            {/* Produto 3 */}
            <div className="flex-shrink-0 w-36 md:w-44">
              <div className="relative">
                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  {/* Imagem do produto */}
                </div>
                <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>3</div>
              </div>
              <h3 className="mt-2 font-medium text-sm truncate">Shampoo Anticaspa</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">R$ 40,00</p>
            </div>

            {/* Produto 4 */}
            <div className="flex-shrink-0 w-36 md:w-44">
              <div className="relative">
                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  {/* Imagem do produto */}
                </div>
                <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>4</div>
              </div>
              <h3 className="mt-2 font-medium text-sm truncate">Kit Barba Completo</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">R$ 120,00</p>
            </div>

            {/* Produto 5 */}
            <div className="flex-shrink-0 w-36 md:w-44">
              <div className="relative">
                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  {/* Imagem do produto */}
                </div>
                <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>5</div>
              </div>
              <h3 className="mt-2 font-medium text-sm truncate">Pente de Madeira</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">R$ 25,00</p>
            </div>

            {/* Produto 6 */}
            <div className="flex-shrink-0 w-36 md:w-44">
              <div className="relative">
                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  {/* Imagem do produto */}
                </div>
                <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>6</div>
              </div>
              <h3 className="mt-2 font-medium text-sm truncate">Loção Pós-Barba</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">R$ 30,00</p>
            </div>

            {/* Produtos 7-10 */}
            {[7, 8, 9, 10].map((num) => (
              <div key={num} className="flex-shrink-0 w-36 md:w-44">
                <div className="relative">
                  <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                    {/* Imagem do produto */}
                  </div>
                  <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>{num}</div>
                </div>
                <h3 className="mt-2 font-medium text-sm truncate">Produto {num}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">R$ {20 + num},00</p>
              </div>
            ))}
          </div>

          {/* Indicadores de rolagem */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/20 dark:bg-white/20 p-2 rounded-l-md hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Top 10 Cursos - Estilo Netflix */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Top 10 Cursos</h2>
          <Link
            href="/dashboard/courses"
            className="text-primary hover:text-primary-dark text-xs md:text-sm flex items-center"
          >
            <span>Ver mais</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {/* Curso 1 */}
            <div className="flex-shrink-0 w-64 md:w-72">
              <div className="relative">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  {/* Thumbnail do curso */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>1</div>
              </div>
              <h3 className="mt-2 font-medium text-sm">Técnicas Avançadas de Corte Masculino</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">12 aulas • 3h total</p>
            </div>

            {/* Curso 2 */}
            <div className="flex-shrink-0 w-64 md:w-72">
              <div className="relative">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  {/* Thumbnail do curso */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>2</div>
              </div>
              <h3 className="mt-2 font-medium text-sm">Barba Perfeita: Do Básico ao Avançado</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">8 aulas • 2h total</p>
            </div>

            {/* Curso 3 */}
            <div className="flex-shrink-0 w-64 md:w-72">
              <div className="relative">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  {/* Thumbnail do curso */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>3</div>
              </div>
              <h3 className="mt-2 font-medium text-sm">Gestão Financeira para Barbearias</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">10 aulas • 4h total</p>
            </div>

            {/* Curso 4 */}
            <div className="flex-shrink-0 w-64 md:w-72">
              <div className="relative">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  {/* Thumbnail do curso */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>4</div>
              </div>
              <h3 className="mt-2 font-medium text-sm">Marketing Digital para Barbearias</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">6 aulas • 2.5h total</p>
            </div>

            {/* Cursos 5-10 */}
            {[5, 6, 7, 8, 9, 10].map((num) => (
              <div key={num} className="flex-shrink-0 w-64 md:w-72">
                <div className="relative">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                    {/* Thumbnail do curso */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -left-2 -bottom-2 font-bold text-5xl text-primary/90 drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>{num}</div>
                </div>
                <h3 className="mt-2 font-medium text-sm">Curso de Especialização {num}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{num} aulas • {num/2}h total</p>
              </div>
            ))}
          </div>

          {/* Indicadores de rolagem */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/20 dark:bg-white/20 p-2 rounded-l-md hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-8">
        <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
                <FiCalendar className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Novo agendamento confirmado</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cliente: João Silva • Serviço: Corte + Barba</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Há {item} hora{item > 1 ? 's' : ''} atrás</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-primary hover:text-primary-dark font-medium">
            Ver todas as atividades
          </button>
        </div>
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




