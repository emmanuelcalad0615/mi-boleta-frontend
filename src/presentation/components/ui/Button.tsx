import { forwardRef } from 'react';
import { cn } from '@/presentation/lib/cn';
import { Spinner } from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#00D4FF] text-[#0D0D0D] font-medium hover:shadow-[0_0_12px_#00D4FF44] active:brightness-95',
  accent:
    'bg-[#00D4FF] text-[#0D0D0D] font-semibold hover:shadow-[0_0_18px_#00D4FF66] active:brightness-95',
  secondary:
    'bg-transparent text-[#F0F0F0] border border-white/10 hover:border-white/30 hover:bg-[#1A1A1A]',
  ghost:
    'bg-transparent text-[#F0F0F0]/80 hover:bg-[#1A1A1A] hover:text-[#F0F0F0]',
  danger:
    'bg-transparent border border-[#FF6B6B]/30 text-[#FF6B6B] hover:bg-[#FF6B6B]/10',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-10 px-5 text-sm rounded-lg',
  lg: 'h-12 px-6 text-base rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-200',
        'focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading && <Spinner size="sm" className="text-current" />}
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
