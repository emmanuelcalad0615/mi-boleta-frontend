'use client';

import { useQuery } from '@tanstack/react-query';
import { useCases } from '@/infrastructure/di/container';
import { AdminTicketFilters } from '@/domain/repositories/AdminTicketRepository';

export function useAdminTicketsQuery(filters: AdminTicketFilters = {}) {
  return useQuery({
    queryKey: ['admin', 'tickets', filters],
    queryFn: () => useCases.listAdminTickets.execute(filters),
    staleTime: 30_000,
  });
}
