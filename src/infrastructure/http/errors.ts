import { AxiosError } from 'axios';
import { DomainError } from '@/domain/errors/DomainError';
import { UnauthorizedError } from '@/domain/errors/UnauthorizedError';
import { ForbiddenError } from '@/domain/errors/ForbiddenError';
import { NotFoundError } from '@/domain/errors/NotFoundError';
import { ConflictError } from '@/domain/errors/ConflictError';
import { ValidationError } from '@/domain/errors/ValidationError';

export function mapApiError(err: AxiosError<{ error: string }>): DomainError {
  const message = err.response?.data?.error ?? err.message ?? 'Error inesperado';
  switch (err.response?.status) {
    case 400:
      return new ValidationError(message);
    case 401:
      return new UnauthorizedError(message);
    case 403:
      return new ForbiddenError(message);
    case 404:
      return new NotFoundError(message);
    case 409:
      return new ConflictError(message);
    default:
      return new DomainError(message);
  }
}
