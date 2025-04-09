'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Versão básica da página de login
import LoginPageBasic from './page-basic';

// Usar a versão básica da página de login para evitar problemas
export default function LoginPage() {
  return <LoginPageBasic />;
}
