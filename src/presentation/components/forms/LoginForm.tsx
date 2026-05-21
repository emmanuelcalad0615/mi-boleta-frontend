'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '@/presentation/lib/validation/auth.schemas';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { FieldError } from '../ui/FieldError';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  error?: string;
};

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {error && <Alert message={error} />}

      <div>
        <Label htmlFor="email" required>Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          hasError={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="password" required>Contraseña</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          hasError={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password')}
        />
        <FieldError id="password-error" message={errors.password?.message} />
      </div>

      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full">
        Iniciar sesión
      </Button>
    </form>
  );
}
