'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/authStore';
import { Spinner } from '../components/ui/Spinner';

export function RequireAdmin({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    } else if (user && user.role !== 'admin') {
      router.replace('/dashboard');
    }
  }, [token, user, router]);

  if (!token || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0D0D0D]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (user.role !== 'admin') return null;

  return <>{children}</>;
}
