'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';
import { useAuthStore } from '@/presentation/stores/authStore';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (token) router.replace('/dashboard');
  }, [token, router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dots px-4 py-12">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#00D4FF] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[#FFD166] opacity-5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A1A1A] border border-[#00D4FF]/30 text-[#00D4FF] shadow-[0_0_18px_#00D4FF44]">
            <Ticket className="h-7 w-7" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#F0F0F0]">
            Mi <span className="text-[#00D4FF]">Boleta</span>
          </h1>
          <p className="mt-2 text-sm text-[#888888]">¿Y si sí me lo gané?</p>
        </div>

        <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-8 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          {children}
        </div>

        <p className="mt-6 text-center text-xs text-[#888888]">
          Nunca pierdas un sorteo, nunca olvides un número
        </p>
      </motion.div>
    </div>
  );
}
