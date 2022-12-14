/* eslint-disable max-classes-per-file */
import { LoadARecommendationsUsecase } from '../../../core/recommendation/load-recommendations-usecase';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { InvalidCaractersError } from '../../../errors/invalid-characters-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { PersonProtocol } from '../../../protocols/models/person-model-protocol';
import { LoadPersonByDocumentRepositoryProtocol } from '../../../protocols/repositories/person/load-person-by-document-repository-protocol';
import { LoadRecommendationsRepositoryProtocol } from '../../../protocols/repositories/recommendations/load-recommendations-repository-protocol';
import { ValidationProtocol } from '../../../protocols/validation-protocol';

interface SutProtocols {
  sut: LoadARecommendationsUsecase;
  loadRecommendationsRepositoryStub: LoadRecommendationsRepositoryProtocol;
  loadPersonByDocumentRepositoryStub: LoadPersonByDocumentRepositoryProtocol;
  documentValidatorStub: ValidationProtocol;
  documentOnlyNumbersValidatorStub: ValidationProtocol;
}

const mockLoadRecommendationsRepository =
  (): LoadRecommendationsRepositoryProtocol => {
    class LoadRecommendationsRepositoryStub
      implements LoadRecommendationsRepositoryProtocol
    {
      async load(document: string): Promise<string[]> {
        return Promise.resolve(['1111111111', '22222222222']);
      }
    }
    return new LoadRecommendationsRepositoryStub();
  };

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

const mockDocumentValidator = (): ValidationProtocol => {
  class DocumentValidatorStub implements ValidationProtocol {
    validate(input: any): boolean {
      return true;
    }
  }
  return new DocumentValidatorStub();
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
  const loadRecommendationsRepositoryStub = mockLoadRecommendationsRepository();
  const documentValidatorStub = mockDocumentValidator();
  const documentOnlyNumbersValidatorStub = mockDocumentOnlyNumbersValidator();
  const sut = new LoadARecommendationsUsecase(
    loadRecommendationsRepositoryStub,
    loadPersonByDocumentRepositoryStub,
    documentValidatorStub,
    documentOnlyNumbersValidatorStub,
  );
  return {
    sut,
    loadPersonByDocumentRepositoryStub,
    loadRecommendationsRepositoryStub,
    documentValidatorStub,
    documentOnlyNumbersValidatorStub,
  };
};

describe('LoadRecommendation Usecase', () => {
  it('should return MissingParamError if document is not provided', async () => {
    const { sut } = makeSut();
    const result = await sut.loadAll('');
    expect(result).toBeInstanceOf(MissingParamError);
  });

  it('should return DocumentLengthError if DocumentValidator returns false', async () => {
    const { sut, documentValidatorStub } = makeSut();
    jest.spyOn(documentValidatorStub, 'validate').mockReturnValue(false);
    const result = await sut.loadAll('any_document');
    expect(result).toBeInstanceOf(DocumentLengthError);
  });

  it('should return InvalidCaractersError if DocumentOnlyNumbersValidator returns false', async () => {
    const { sut, documentOnlyNumbersValidatorStub } = makeSut();
    jest
      .spyOn(documentOnlyNumbersValidatorStub, 'validate')
      .mockReturnValue(false);
    const result = await sut.loadAll('any_document');
    expect(result).toBeInstanceOf(InvalidCaractersError);
  });

  it('should call DocumentValidator with correct param', async () => {
    const { sut, documentValidatorStub } = makeSut();
    const validateSpy = jest.spyOn(documentValidatorStub, 'validate');
    await sut.loadAll('any_document');
    expect(validateSpy).toHaveBeenCalledWith(`any_document`);
  });

  it('should call DocumentOnlyNumbersValidator with correct param', async () => {
    const { sut, documentOnlyNumbersValidatorStub } = makeSut();
    const validateSpy = jest.spyOn(
      documentOnlyNumbersValidatorStub,
      'validate',
    );
    await sut.loadAll(`any_document`);
    expect(validateSpy).toHaveBeenCalledWith(`any_document`);
  });

  it('should call LoadRecommendationsRepository with correct param', async () => {
    const { sut, loadRecommendationsRepositoryStub } = makeSut();
    const loadByDocumentSpy = jest.spyOn(
      loadRecommendationsRepositoryStub,
      'load',
    );
    await sut.loadAll('any_document');
    expect(loadByDocumentSpy).toHaveBeenCalledWith('any_document');
  });

  it('should return recommendation', async () => {
    const { sut } = makeSut();
    const result = await sut.loadAll('any_document');
    expect(result).toEqual(['1111111111', '22222222222']);
  });
});
