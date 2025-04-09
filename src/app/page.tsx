import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the direct login page instead of /auth/login
  redirect('/login');
}

// Adicionar uma função de geração estática para garantir que a página seja gerada corretamente
export const generateStaticParams = async () => {
  return [];
};
