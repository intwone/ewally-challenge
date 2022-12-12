export class RegisterNotExistsError extends Error {
  constructor() {
    super();
    this.name = 'NOT_EXISTS_ERROR';
    this.message = 'document does not exist';
  }
}
