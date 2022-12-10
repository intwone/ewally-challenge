export class MissingParamError extends Error {
  constructor() {
    super();
    this.name = 'MISSING_PARAM_ERROR';
    this.message = 'two documents should be provided';
  }
}
