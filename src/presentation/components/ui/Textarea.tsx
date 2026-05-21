import { forwardRef } from 'react';
import { cn } from '@/presentation/lib/cn';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, className, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={3}
      aria-invalid={hasError}
      className={cn(
        'block w-full rounded-lg bg-[#1A1A1A] border px-3.5 py-2.5 text-sm text-[#F0F0F0] outline-none resize-none',
        'placeholder:text-[#888888] transition-colors',
        'focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20',
        hasError ? 'border-[#FF6B6B]/60 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]/20' : 'border-white/10',
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';
