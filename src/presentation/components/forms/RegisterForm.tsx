'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormValues } from '@/presentation/lib/validation/auth.schemas';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { FieldError } from '../ui/FieldError';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';

type RegisterFormProps = {
  onSubmit: (values: RegisterFormValues) => Promise<void>;
  error?: string;
};

export function RegisterForm({ onSubmit, error }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {error && <Alert message={error} />}

      <div>
        <Label htmlFor="name" required>Nombre completo</Label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Juan Pérez"
          hasError={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        <FieldError id="name-error" message={errors.name?.message} />
      </div>

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
          autoComplete="new-password"
          placeholder="Mínimo 8 caracteres"
          hasError={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password')}
        />
        <FieldError id="password-error" message={errors.password?.message} />
      </div>

      <div>
        <Label htmlFor="confirmPassword" required>Confirmar contraseña</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          hasError={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
          {...register('confirmPassword')}
        />
        <FieldError id="confirm-error" message={errors.confirmPassword?.message} />
      </div>

      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full">
        Crear cuenta
      </Button>
    </form>
  );
}
