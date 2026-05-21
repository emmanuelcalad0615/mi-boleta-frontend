'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/presentation/components/forms/LoginForm';
import { LoginFormValues } from '@/presentation/lib/validation/auth.schemas';
import { useAuth } from '@/presentation/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (values: LoginFormValues) => {
    setError('');
    try {
      await login(values);
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-[#F0F0F0]">Bienvenido de vuelta</h2>
        <p className="mt-1 text-sm text-[#888888]">Inicia sesión para ver tus boletas.</p>
      </div>
      <LoginForm onSubmit={handleSubmit} error={error} />
      <p className="mt-6 text-center text-sm text-[#888888]">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="font-semibold text-[#00D4FF] hover:underline">
          Regístrate gratis
        </Link>
      </p>
    </>
  );
}
