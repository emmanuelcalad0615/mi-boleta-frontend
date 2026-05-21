import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 text-center px-4 bg-dots">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1A1A1A] border border-[#00D4FF]/30 text-[#00D4FF] shadow-[0_0_24px_#00D4FF44]">
        <Ticket className="h-9 w-9" />
      </div>
      <div>
        <h1 className="font-display text-4xl font-bold text-[#F0F0F0]">404</h1>
        <p className="mt-2 text-[#888888]">Esta página no existe o fue movida.</p>
      </div>
      <Link href="/">
        <Button variant="accent">Volver al inicio</Button>
      </Link>
    </div>
  );
}
