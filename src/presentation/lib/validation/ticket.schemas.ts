import { z } from 'zod';
import { GAME_TYPES, TICKET_STATUSES } from '@/domain/entities/Ticket';

export const ticketSchema = z.object({
  title: z
    .string()
    .min(1, 'El nombre del sorteo es obligatorio')
    .max(120, 'No puede exceder 120 caracteres'),
  gameType: z.enum(GAME_TYPES, { error: 'Selecciona un tipo de juego válido' }),
  gameNumber: z.string().max(50, 'No puede exceder 50 caracteres').optional(),
  gameDate: z
    .string()
    .min(1, 'La fecha del sorteo es obligatoria')
    .refine((v) => !Number.isNaN(Date.parse(v)), 'Fecha inválida'),
  amount: z
    .string()
    .optional()
    .refine((v) => !v || !Number.isNaN(Number(v)), 'Ingresa un número válido')
    .refine((v) => !v || Number(v) >= 0, 'El valor no puede ser negativo'),
  place: z.string().max(120, 'No puede exceder 120 caracteres').optional(),
  status: z.enum(TICKET_STATUSES, { error: 'Selecciona un estado válido' }),
  notes: z.string().max(1000, 'No puede exceder 1000 caracteres').optional(),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;
