import { ValidationProtocol } from '../protocols/validation-protocol';

export class DocumentOnlyNumberValidator implements ValidationProtocol {
  validate(input: any): boolean {
    return !/\D+/.test(input);
  }
}
