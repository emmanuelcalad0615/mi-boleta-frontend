import { PublicUser } from '../entities/User';

export interface AuthRepository {
  register(input: { name: string; email: string; password: string }): Promise<PublicUser>;
  login(input: { email: string; password: string }): Promise<{ token: string; user: PublicUser }>;
}
