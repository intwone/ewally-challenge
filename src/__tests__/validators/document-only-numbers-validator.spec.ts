import { DocumentOnlyNumberValidator } from '../../validators/document-only-numbers-validator';

describe('DocumentOnlyNumbers Validator', () => {
  it('should return false if document is invalid', async () => {
    const sut = new DocumentOnlyNumberValidator();
    const invalidParam = '@3$#_=-11!1--';
    const result = sut.validate(invalidParam);
    expect(result).toBeFalsy();
  });

  it('should return true if document is valid', async () => {
    const sut = new DocumentOnlyNumberValidator();
    const validParam = '11111111111';
    const result = sut.validate(validParam);
    expect(result).toBeTruthy();
  });
});
