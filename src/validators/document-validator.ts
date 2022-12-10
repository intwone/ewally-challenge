import { ValidationProtocol } from '../protocols/validation-protocol';

export class DocumentValidation implements ValidationProtocol {
  validate(input: any): boolean {
    const MAX_LENGTH_DOCUMENT = 11;
    return input.length === MAX_LENGTH_DOCUMENT;
  }
}
