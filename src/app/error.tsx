'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Algo deu errado!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Ocorreu um erro ao carregar esta página.
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Tentar novamente
          </button>
          <Link 
            href="/auth/login" 
            className="inline-block w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
