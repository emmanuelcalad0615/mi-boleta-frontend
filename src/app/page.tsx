'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/presentation/stores/authStore';
import { Spinner } from '@/presentation/components/ui/Spinner';

export default function RootPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    router.replace(token ? '/dashboard' : '/login');
  }, [token, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#0D0D0D]">
      <Spinner size="lg" />
    </div>
  );
}
