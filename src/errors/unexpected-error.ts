export class UnexpectedError extends Error {
  constructor() {
    super();
    this.name = 'UNEXPECTED_ERROR';
    this.message = 'an unexpected error occurred';
  }
}
