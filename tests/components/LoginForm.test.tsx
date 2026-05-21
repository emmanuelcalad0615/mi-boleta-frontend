import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '@/presentation/components/forms/LoginForm';

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);
    await user.type(screen.getByLabelText(/correo electrónico/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    await waitFor(() => {
      expect(screen.getByText(/el email no es válido/i)).toBeInTheDocument();
    });
  });

  it('shows error prop when provided', () => {
    render(<LoginForm onSubmit={vi.fn()} error="Credenciales incorrectas" />);
    expect(screen.getByText('Credenciales incorrectas')).toBeInTheDocument();
  });

  it('calls onSubmit with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<LoginForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/correo electrónico/i), 'test@test.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'password123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { email: 'test@test.com', password: 'password123' },
        expect.anything(),
      );
    });
  });
});
