import { DomainError } from './DomainError';

export class ForbiddenError extends DomainError {
  constructor(message = 'Acceso denegado') {
    super(message);
    this.name = 'ForbiddenError';
  }
}
