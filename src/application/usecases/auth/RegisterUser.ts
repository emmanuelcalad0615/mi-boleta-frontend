import { AuthRepository } from '@/domain/repositories/AuthRepository';
import { PublicUser } from '@/domain/entities/User';
import { RegisterInput } from '@/application/dtos/auth.dto';

export class RegisterUser {
  constructor(private readonly repo: AuthRepository) {}

  execute(input: RegisterInput): Promise<PublicUser> {
    return this.repo.register(input);
  }
}
