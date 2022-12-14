/* eslint-disable max-classes-per-file */
import { LoadPersonByDocumentUsecase } from '../../../core/person/load-person-by-document-usecase';
import { InvalidCaractersError } from '../../../errors/invalid-characters-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { RegisterNotExistsError } from '../../../errors/register-not-exists';
import { PersonProtocol } from '../../../protocols/models/person-model-protocol';
import { LoadPersonByDocumentRepositoryProtocol } from '../../../protocols/repositories/person/load-person-by-document-repository-protocol';
import { ValidationProtocol } from '../../../protocols/validation-protocol';

interface SutProtocols {
  sut: LoadPersonByDocumentUsecase;
  loadPersonByDocumentRepositoryStub: LoadPersonByDocumentRepositoryProtocol;
  documentOnlyNumbersValidatorStub: ValidationProtocol;
}

const mockLoadPersonByDocumentoRepository =
  (): LoadPersonByDocumentRepositoryProtocol => {
    class LoadPersonByDocumentRepositoryStub
      implements LoadPersonByDocumentRepositoryProtocol
    {
      loadByDocument(cpf: string): Promise<PersonProtocol> {
        return Promise.resolve({
          name: 'any_name',
          cpf: 'any_document',
        });
      }
    }
    return new LoadPersonByDocumentRepositoryStub();
  };

const mockDocumentOnlyNumbersValidator = (): ValidationProtocol => {
  class DocumentOnlyNumbersValidatorStub implements ValidationProtocol {
    validate(input: any): boolean {
      return true;
    }
  }
  return new DocumentOnlyNumbersValidatorStub();
};

const makeSut = (): SutProtocols => {
  const loadPersonByDocumentRepositoryStub =
    mockLoadPersonByDocumentoRepository();
  const documentOnlyNumbersValidatorStub = mockDocumentOnlyNumbersValidator();
  const sut = new LoadPersonByDocumentUsecase(
    loadPersonByDocumentRepositoryStub,
    documentOnlyNumbersValidatorStub,
  );
  return {
    sut,
    loadPersonByDocumentRepositoryStub,
    documentOnlyNumbersValidatorStub,
  };
};

describe('LoadPersonByDocument Usecase', () => {
  it('should return MissingParamError if document is not provided', async () => {
    const { sut } = makeSut();
    const result = await sut.load('');
    expect(result).toBeInstanceOf(MissingParamError);
  });

  it('should return InvalidCaractersError if DocumentOnlyNumbersValidator returns false', async () => {
    const { sut, documentOnlyNumbersValidatorStub } = makeSut();
    jest
      .spyOn(documentOnlyNumbersValidatorStub, 'validate')
      .mockReturnValue(false);
    const result = await sut.load('any_document');
    expect(result).toBeInstanceOf(InvalidCaractersError);
  });

  it('should return RegisterNotExistsError if LoadPersonByDocumentRepository returns a person', async () => {
    const { sut, loadPersonByDocumentRepositoryStub } = makeSut();
    jest
      .spyOn(loadPersonByDocumentRepositoryStub, 'loadByDocument')
      .mockReturnValue(Promise.resolve(null as unknown as PersonProtocol));
    const result = await sut.load('any_document');
    expect(result).toBeInstanceOf(RegisterNotExistsError);
  });

  it('should call DocumentOnlyNumbersValidator with correct param', async () => {
    const { sut, documentOnlyNumbersValidatorStub } = makeSut();
    const validateSpy = jest.spyOn(
      documentOnlyNumbersValidatorStub,
      'validate',
    );
    await sut.load(`any_document`);
    expect(validateSpy).toHaveBeenCalledWith(`any_document`);
  });

  it('should call LoadPersonByDocumentRepository with correct param', async () => {
    const { sut, loadPersonByDocumentRepositoryStub } = makeSut();
    const loadByDocumentSpy = jest.spyOn(
      loadPersonByDocumentRepositoryStub,
      'loadByDocument',
    );
    await sut.load('any_document');
    expect(loadByDocumentSpy).toHaveBeenCalledWith('any_document');
  });

  it('should return a person loaded', async () => {
    const { sut } = makeSut();
    const result = await sut.load('any_document');
    expect(result).toEqual({
      name: 'any_name',
      cpf: 'any_document',
    });
  });
});
