'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/presentation/components/forms/RegisterForm';
import { RegisterFormValues } from '@/presentation/lib/validation/auth.schemas';
import { useAuth } from '@/presentation/hooks/useAuth';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (values: RegisterFormValues) => {
    setError('');
    try {
      const { confirmPassword: _, ...registerInput } = values;
      await register(registerInput);
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta');
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-[#F0F0F0]">Crea tu cuenta</h2>
        <p className="mt-1 text-sm text-[#888888]">Empezá a registrar tus boletas en segundos.</p>
      </div>
      <RegisterForm onSubmit={handleSubmit} error={error} />
      <p className="mt-6 text-center text-sm text-[#888888]">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-semibold text-[#00D4FF] hover:underline">
          Inicia sesión
        </Link>
      </p>
    </>
  );
}
