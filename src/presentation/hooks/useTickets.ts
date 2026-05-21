'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCases } from '@/infrastructure/di/container';
import { TicketFilters, CreateTicketInput, UpdateTicketInput } from '@/domain/repositories/TicketRepository';

export function useTicketsQuery(filters: TicketFilters = {}) {
  return useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => useCases.listTickets.execute(filters),
    staleTime: 30_000,
  });
}

export function useTicketQuery(id: string) {
  return useQuery({
    queryKey: ['ticket', id],
    queryFn: () => useCases.getTicket.execute(id),
    staleTime: 30_000,
    enabled: !!id,
  });
}

export function useCreateTicketMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTicketInput) => useCases.createTicket.execute(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets'] }),
  });
}

export function useUpdateTicketMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTicketInput }) =>
      useCases.updateTicket.execute(id, input),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['tickets'] });
      qc.invalidateQueries({ queryKey: ['ticket', id] });
    },
  });
}

export function useDeleteTicketMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => useCases.deleteTicket.execute(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets'] }),
  });
}
