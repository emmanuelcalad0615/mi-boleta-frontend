'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/authStore';
import { Spinner } from '../components/ui/Spinner';

export function RequireAuth({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0D0D0D]">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
