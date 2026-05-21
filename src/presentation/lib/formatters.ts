import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDate(date: Date): string {
  return format(date, "d 'de' MMMM yyyy", { locale: es });
}

export function formatDateTime(date: Date): string {
  return format(date, "d 'de' MMMM yyyy, HH:mm", { locale: es });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
}
