import { RequireAuth } from '@/presentation/guards/RequireAuth';
import { ProtectedShell } from '@/presentation/components/layout/ProtectedShell';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <ProtectedShell>{children}</ProtectedShell>
    </RequireAuth>
  );
}
