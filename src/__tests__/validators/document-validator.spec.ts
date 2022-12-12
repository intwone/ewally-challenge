import { DocumentValidation } from '../../validators/document-validator';

describe('DocumentValidation Validator', () => {
  it('should return false if document length is different 11', async () => {
    const sut = new DocumentValidation();
    const invalidParam = '11';
    const result = sut.validate(invalidParam);
    expect(result).toBeFalsy();
  });

  it('should return true if document length to equal 11', async () => {
    const sut = new DocumentValidation();
    const validParam = '11111111111';
    const result = sut.validate(validParam);
    expect(result).toBeTruthy();
  });
});
