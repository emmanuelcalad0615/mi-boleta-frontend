import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginUser } from '@/application/usecases/auth/LoginUser';
import { AuthRepository } from '@/domain/repositories/AuthRepository';
import { TokenStorage } from '@/application/ports/TokenStorage';
import { UserSessionStorage } from '@/application/ports/UserSessionStorage';
import { PublicUser } from '@/domain/entities/User';

const mockUser: PublicUser = {
  id: '1',
  name: 'Test',
  email: 'test@test.com',
  role: 'user',
  createdAt: new Date(),
};

const mockRepo: AuthRepository = {
  register: vi.fn(),
  login: vi.fn().mockResolvedValue({ token: 'tok123', user: mockUser }),
};

const mockTokenStorage: TokenStorage = {
  get: vi.fn(),
  set: vi.fn(),
  clear: vi.fn(),
};

const mockSessionStorage: UserSessionStorage = {
  get: vi.fn(),
  set: vi.fn(),
  clear: vi.fn(),
};

describe('LoginUser', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls repo.login with input', async () => {
    const useCase = new LoginUser(mockRepo, mockTokenStorage, mockSessionStorage);
    await useCase.execute({ email: 'test@test.com', password: 'password123' });
    expect(mockRepo.login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password123' });
  });

  it('stores token after login', async () => {
    const useCase = new LoginUser(mockRepo, mockTokenStorage, mockSessionStorage);
    await useCase.execute({ email: 'test@test.com', password: 'password123' });
    expect(mockTokenStorage.set).toHaveBeenCalledWith('tok123');
  });

  it('stores user session after login', async () => {
    const useCase = new LoginUser(mockRepo, mockTokenStorage, mockSessionStorage);
    await useCase.execute({ email: 'test@test.com', password: 'password123' });
    expect(mockSessionStorage.set).toHaveBeenCalledWith(mockUser);
  });

  it('returns token and user', async () => {
    const useCase = new LoginUser(mockRepo, mockTokenStorage, mockSessionStorage);
    const result = await useCase.execute({ email: 'test@test.com', password: 'password123' });
    expect(result.token).toBe('tok123');
    expect(result.user).toEqual(mockUser);
  });
});
