import { StringHelperProtocol } from '../protocols/helpers/string-helper-protocol';

export class StringHelper implements StringHelperProtocol {
  removeSpecialCaracteresAndLetters(input: string): string {
    return input.match(/\d+/g)?.join('').replace(/\W/g, '') as string;
  }
}
