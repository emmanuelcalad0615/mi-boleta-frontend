import { TokenStorage } from '@/application/ports/TokenStorage';

const KEY = 'mi-boleta-token';

export class LocalTokenStorage implements TokenStorage {
  get(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(KEY);
  }

  set(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEY, token);
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEY);
  }
}

export const localTokenStorage = new LocalTokenStorage();
