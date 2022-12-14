export class RegisterNotExistsError extends Error {
  constructor() {
    super();
    this.name = 'NOT_EXISTS_ERROR';
    this.message = 'cpf does not exist';
  }
}
