import { UserSessionStorage } from '@/application/ports/UserSessionStorage';
import { PublicUser } from '@/domain/entities/User';

const KEY = 'mi-boleta-user';

export class LocalUserSessionStorage implements UserSessionStorage {
  get(): PublicUser | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as PublicUser & { createdAt: string };
      return { ...parsed, createdAt: new Date(parsed.createdAt) };
    } catch {
      return null;
    }
  }

  set(user: PublicUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEY, JSON.stringify(user));
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEY);
  }
}

export const localUserSessionStorage = new LocalUserSessionStorage();
