import { forwardRef } from 'react';
import { cn } from '@/presentation/lib/cn';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, className, children, ...props }, ref) => (
    <select
      ref={ref}
      aria-invalid={hasError}
      className={cn(
        'block w-full rounded-lg bg-[#1A1A1A] border px-3.5 py-2.5 text-sm text-[#F0F0F0] outline-none appearance-none',
        'transition-colors cursor-pointer',
        'focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20',
        'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22/%3E%3C/svg%3E")] bg-no-repeat bg-[length:14px] bg-[position:right_12px_center] pr-9',
        hasError ? 'border-[#FF6B6B]/60 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]/20' : 'border-white/10',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);

Select.displayName = 'Select';
