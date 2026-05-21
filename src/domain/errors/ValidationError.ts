import { DomainError } from './DomainError';

export class ValidationError extends DomainError {
  constructor(message: string, details?: string) {
    super(message, details);
    this.name = 'ValidationError';
  }
}
