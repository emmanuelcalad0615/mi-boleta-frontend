'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ticketSchema, TicketFormValues } from '@/presentation/lib/validation/ticket.schemas';
import { GAME_TYPES, TICKET_STATUSES, Ticket } from '@/domain/entities/Ticket';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { FieldError } from '../ui/FieldError';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { format } from 'date-fns';

type TicketFormProps = {
  mode: 'create' | 'edit';
  initialValues?: Ticket;
  onSubmit: (values: TicketFormValues) => Promise<void>;
  error?: string;
};

function toDatetimeLocal(date?: Date | null): string {
  if (!date) return '';
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

export function TicketForm({ mode, initialValues, onSubmit, error }: TicketFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: initialValues
      ? {
          title: initialValues.title,
          gameType: initialValues.gameType,
          gameNumber: initialValues.gameNumber ?? '',
          gameDate: toDatetimeLocal(initialValues.gameDate),
          amount: initialValues.amount != null ? String(initialValues.amount) : '',
          place: initialValues.place ?? '',
          status: initialValues.status,
          notes: initialValues.notes ?? '',
        }
      : { status: 'Pendiente', gameType: 'Lotería' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {error && <Alert message={error} />}

      <div>
        <Label htmlFor="title" required>Nombre del sorteo</Label>
        <Input
          id="title"
          placeholder="Ej: Lotería de Medellín"
          hasError={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
          {...register('title')}
        />
        <FieldError id="title-error" message={errors.title?.message} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="gameType" required>Tipo de juego</Label>
          <Select
            id="gameType"
            hasError={!!errors.gameType}
            aria-describedby={errors.gameType ? 'gameType-error' : undefined}
            {...register('gameType')}
          >
            {GAME_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
          <FieldError id="gameType-error" message={errors.gameType?.message} />
        </div>

        <div>
          <Label htmlFor="status" required>Estado</Label>
          <Select
            id="status"
            hasError={!!errors.status}
            aria-describedby={errors.status ? 'status-error' : undefined}
            {...register('status')}
          >
            {TICKET_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
          <FieldError id="status-error" message={errors.status?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="gameDate" required>Fecha del sorteo</Label>
          <Input
            id="gameDate"
            type="datetime-local"
            hasError={!!errors.gameDate}
            aria-describedby={errors.gameDate ? 'gameDate-error' : undefined}
            {...register('gameDate')}
          />
          <FieldError id="gameDate-error" message={errors.gameDate?.message} />
        </div>

        <div>
          <Label htmlFor="gameNumber">Número jugado</Label>
          <Input
            id="gameNumber"
            placeholder="Ej: 1234"
            hasError={!!errors.gameNumber}
            {...register('gameNumber')}
          />
          <FieldError message={errors.gameNumber?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="amount">Valor apostado (COP)</Label>
          <Input
            id="amount"
            type="number"
            min={0}
            step={100}
            placeholder="Ej: 5000"
            hasError={!!errors.amount}
            {...register('amount')}
          />
          <FieldError message={errors.amount?.message} />
        </div>

        <div>
          <Label htmlFor="place">Lugar de compra</Label>
          <Input
            id="place"
            placeholder="Ej: Tienda La Esquina"
            hasError={!!errors.place}
            {...register('place')}
          />
          <FieldError message={errors.place?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notas adicionales</Label>
        <Textarea
          id="notes"
          placeholder="Ej: Premio: un carro, soñé con este número..."
          hasError={!!errors.notes}
          {...register('notes')}
        />
        <FieldError message={errors.notes?.message} />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" variant="accent" size="lg" loading={isSubmitting}>
          {mode === 'create' ? 'Registrar boleta' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  );
}
