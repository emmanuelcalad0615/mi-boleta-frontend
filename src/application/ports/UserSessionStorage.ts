import { PublicUser } from '@/domain/entities/User';

export interface UserSessionStorage {
  get(): PublicUser | null;
  set(user: PublicUser): void;
  clear(): void;
}
