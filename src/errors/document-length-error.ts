export class DocumentLengthError extends Error {
  constructor() {
    super();
    this.name = 'INVALID_LENGTH_DOCUMENT_ERROR';
    this.message = 'the document should be 11 caracters';
  }
}
