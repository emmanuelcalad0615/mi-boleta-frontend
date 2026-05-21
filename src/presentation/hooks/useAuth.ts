'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/authStore';
import { useCases } from '@/infrastructure/di/container';
import { LoginInput, RegisterInput } from '@/application/dtos/auth.dto';

export function useAuth() {
  const router = useRouter();
  const { token, user, setSession, clearSession } = useAuthStore();

  const login = async (input: LoginInput) => {
    const result = await useCases.loginUser.execute(input);
    setSession(result.token, result.user);
    return result;
  };

  const register = async (input: RegisterInput) => {
    const newUser = await useCases.registerUser.execute(input);
    const loginResult = await useCases.loginUser.execute({
      email: input.email,
      password: input.password,
    });
    setSession(loginResult.token, loginResult.user);
    return newUser;
  };

  const logout = () => {
    useCases.logoutUser.execute();
    clearSession();
    router.replace('/login');
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  };
}
