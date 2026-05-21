import { AuthRepository } from '@/domain/repositories/AuthRepository';
import { PublicUser } from '@/domain/entities/User';
import { httpClient } from '../http/httpClient';
import { ApiSuccess } from '../http/types';

function reviveUser(raw: PublicUser & { createdAt: string }): PublicUser {
  return { ...raw, createdAt: new Date(raw.createdAt) };
}

export class HttpAuthRepository implements AuthRepository {
  async register(input: { name: string; email: string; password: string }): Promise<PublicUser> {
    const { data } = await httpClient.post<ApiSuccess<PublicUser & { createdAt: string }>>(
      '/auth/register',
      input,
    );
    return reviveUser(data.data);
  }

  async login(input: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: PublicUser }> {
    const { data } = await httpClient.post<
      ApiSuccess<{ token: string; user: PublicUser & { createdAt: string } }>
    >('/auth/login', input);
    return { token: data.data.token, user: reviveUser(data.data.user) };
  }
}
