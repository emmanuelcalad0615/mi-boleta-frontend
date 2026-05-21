import { cn } from '@/presentation/lib/cn';
import { Loader2 } from 'lucide-react';

type SpinnerProps = { size?: 'sm' | 'md' | 'lg'; className?: string };

const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' };

export function Spinner({ size = 'md', className }: Readonly<SpinnerProps>) {
  return (
    <Loader2
      aria-hidden="true"
      className={cn('animate-spin text-[#00D4FF]', sizes[size], className)}
    />
  );
}
