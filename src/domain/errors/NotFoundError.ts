import { DomainError } from './DomainError';

export class NotFoundError extends DomainError {
  constructor(message = 'Recurso no encontrado') {
    super(message);
    this.name = 'NotFoundError';
  }
}
