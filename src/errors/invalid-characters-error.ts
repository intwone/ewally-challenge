export class InvalidCaractersError extends Error {
  constructor() {
    super();
    this.name = 'INVALID_CHARACTERS_ERROR';
    this.message = 'the cpf cannot have special characters';
  }
}
