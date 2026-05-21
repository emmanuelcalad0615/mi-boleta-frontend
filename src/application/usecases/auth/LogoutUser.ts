import { TokenStorage } from '@/application/ports/TokenStorage';
import { UserSessionStorage } from '@/application/ports/UserSessionStorage';

export class LogoutUser {
  constructor(
    private readonly tokenStorage: TokenStorage,
    private readonly sessionStorage: UserSessionStorage,
  ) {}

  execute(): void {
    this.tokenStorage.clear();
    this.sessionStorage.clear();
  }
}
