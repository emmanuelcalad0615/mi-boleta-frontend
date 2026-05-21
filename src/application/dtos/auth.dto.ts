import { PublicUser } from '@/domain/entities/User';

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResult = {
  token: string;
  user: PublicUser;
};
