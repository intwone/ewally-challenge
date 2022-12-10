export class InvalidRelationshipError extends Error {
  constructor() {
    super();
    this.name = 'INVALID_RELATIONSHIP';
    this.message = 'you cannot create a relationship with the same documents';
  }
}
