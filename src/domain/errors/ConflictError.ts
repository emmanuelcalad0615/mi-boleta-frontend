import { DomainError } from './DomainError';

export class ConflictError extends DomainError {
  constructor(message = 'El recurso ya existe') {
    super(message);
    this.name = 'ConflictError';
  }
}
