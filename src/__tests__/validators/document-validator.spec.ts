import { DocumentValidation } from '../../validators/document-validator';

describe('DocumentValidation Validator', () => {
  it('should return false if cpf length is different 11', async () => {
    const sut = new DocumentValidation();
    const invalidParam = '11';
    const result = sut.validate(invalidParam);
    expect(result).toBeFalsy();
  });

  it('should return true if cpf length to equal 11', async () => {
    const sut = new DocumentValidation();
    const validParam = '11111111111';
    const result = sut.validate(validParam);
    expect(result).toBeTruthy();
  });
});
