'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PublicUser } from '@/domain/entities/User';

type AuthState = {
  token: string | null;
  user: PublicUser | null;
  setSession: (token: string, user: PublicUser) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    { name: 'mi-boleta-auth' },
  ),
);
