import { cn } from '@/presentation/lib/cn';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean };

export function Label({ required, className, children, ...props }: Readonly<LabelProps>) {
  return (
    <label className={cn('block text-xs font-medium uppercase tracking-wider text-[#888888] mb-1.5', className)} {...props}>
      {children}
      {required && <span className="ml-1 text-[#FF6B6B]">*</span>}
    </label>
  );
}
