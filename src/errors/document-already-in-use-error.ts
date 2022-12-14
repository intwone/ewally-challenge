export class DocumentAlreadyInUseError extends Error {
  constructor() {
    super();
    this.name = 'DOCUMENT_ALREADY_IN_USE_ERROR';
    this.message = 'the cpf is already being used';
  }
}
