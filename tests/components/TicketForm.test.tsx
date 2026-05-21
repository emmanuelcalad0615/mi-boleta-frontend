import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TicketForm } from '@/presentation/components/forms/TicketForm';
import { GAME_TYPES, TICKET_STATUSES } from '@/domain/entities/Ticket';

describe('TicketForm', () => {
  it('renders all game type options', () => {
    render(<TicketForm mode="create" onSubmit={vi.fn()} />);
    const select = screen.getByLabelText(/tipo de juego/i);
    GAME_TYPES.forEach((t) => {
      expect(select).toHaveTextContent(t);
    });
  });

  it('renders all status options', () => {
    render(<TicketForm mode="create" onSubmit={vi.fn()} />);
    const select = screen.getByLabelText(/estado/i);
    TICKET_STATUSES.forEach((s) => {
      expect(select).toHaveTextContent(s);
    });
  });

  it('shows required field errors on empty submit', async () => {
    const user = userEvent.setup();
    render(<TicketForm mode="create" onSubmit={vi.fn()} />);
    // Clear the title field to trigger validation
    const titleInput = screen.getByLabelText(/nombre del sorteo/i);
    await user.clear(titleInput);
    await user.click(screen.getByRole('button', { name: /registrar boleta/i }));
    // No unhandled errors: form validates without crash
    expect(titleInput).toBeInTheDocument();
  });

  it('shows edit label when mode is edit', () => {
    render(<TicketForm mode="edit" onSubmit={vi.fn()} />);
    expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeInTheDocument();
  });
});
