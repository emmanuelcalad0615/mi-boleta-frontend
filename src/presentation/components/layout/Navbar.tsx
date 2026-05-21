'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, List, Shield, LogOut, Ticket, Trophy } from 'lucide-react';
import { useAuth } from '@/presentation/hooks/useAuth';
import { Container } from './Container';
import { cn } from '@/presentation/lib/cn';

type NavLink = { href: string; label: string; Icon: React.ComponentType<{ className?: string }> };

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', Icon: Home },
  { href: '/tickets', label: 'Mis Boletas', Icon: List },
  { href: '/resultados', label: 'Resultados', Icon: Trophy },
];

export function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const pathname = usePathname();

  const allLinks = isAdmin
    ? [...navLinks, { href: '/admin', label: 'Admin', Icon: Shield }]
    : navLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0D0D0D]/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A1A1A] border border-[#00D4FF]/30 text-[#00D4FF] shadow-[0_0_10px_#00D4FF33] transition-shadow group-hover:shadow-[0_0_18px_#00D4FF66]">
              <Ticket className="h-4.5 w-4.5" />
            </div>
            <span className="font-display font-bold text-lg text-[#F0F0F0]">
              Mi <span className="text-[#00D4FF]">Boleta</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {allLinks.map(({ href, label, Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                    active
                      ? 'bg-[#00D4FF]/10 text-[#00D4FF] border-l-2 border-[#00D4FF]'
                      : 'text-[#F0F0F0]/70 hover:bg-[#1A1A1A] hover:text-[#F0F0F0]',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#00D4FF] to-[#00A8CC] text-sm font-semibold text-[#0D0D0D]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-[#F0F0F0] leading-tight">{user.name}</p>
                  <p className="text-xs text-[#888888] leading-tight">{user.email}</p>
                </div>
              </div>
            )}
            <button
              onClick={logout}
              aria-label="Cerrar sesión"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#888888] hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex md:hidden gap-1 pb-3 -mx-2 overflow-x-auto scrollbar-hide">
          {allLinks.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all',
                  active
                    ? 'bg-[#00D4FF]/10 text-[#00D4FF]'
                    : 'text-[#F0F0F0]/70 hover:bg-[#1A1A1A]',
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
