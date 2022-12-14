export class DocumentLengthError extends Error {
  constructor() {
    super();
    this.name = 'INVALID_LENGTH_DOCUMENT_ERROR';
    this.message = 'the cpf should be 11 caracters';
  }
}
