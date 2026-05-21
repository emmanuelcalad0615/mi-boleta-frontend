import { DomainError } from './DomainError';

export class UnauthorizedError extends DomainError {
  constructor(message = 'No autorizado') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
