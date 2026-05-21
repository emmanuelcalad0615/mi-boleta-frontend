import { TokenStorage } from '@/application/ports/TokenStorage';
import { UserSessionStorage } from '@/application/ports/UserSessionStorage';
import { PublicUser } from '@/domain/entities/User';

export class GetCurrentSession {
  constructor(
    private readonly tokenStorage: TokenStorage,
    private readonly sessionStorage: UserSessionStorage,
  ) {}

  execute(): { token: string; user: PublicUser } | null {
    const token = this.tokenStorage.get();
    const user = this.sessionStorage.get();
    if (!token || !user) return null;
    return { token, user };
  }
}
