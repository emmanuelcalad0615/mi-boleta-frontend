import { AuthRepository } from '@/domain/repositories/AuthRepository';
import { TokenStorage } from '@/application/ports/TokenStorage';
import { UserSessionStorage } from '@/application/ports/UserSessionStorage';
import { LoginInput, LoginResult } from '@/application/dtos/auth.dto';

export class LoginUser {
  constructor(
    private readonly repo: AuthRepository,
    private readonly tokenStorage: TokenStorage,
    private readonly sessionStorage: UserSessionStorage,
  ) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    const result = await this.repo.login(input);
    this.tokenStorage.set(result.token);
    this.sessionStorage.set(result.user);
    return result;
  }
}
