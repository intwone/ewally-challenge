import { StringHelper } from '../helpers/string-helper';
import { ValidationProtocol } from '../protocols/validation-protocol';

export class DocumentValidation implements ValidationProtocol {
  validate(input: any): boolean {
    const MAX_LENGTH_DOCUMENT = 11;
    const formattedInput = StringHelper.removeDocumentMask(input);
    return formattedInput.length === MAX_LENGTH_DOCUMENT;
  }
}
