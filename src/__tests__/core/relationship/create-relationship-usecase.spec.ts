import { CreateRelationshipUsecase } from '../../../core/relationship/create-relationship-usecase';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { InvalidCaractersError } from '../../../errors/invalid-characters-error';
import { InvalidRelationshipError } from '../../../errors/invalid-relationship-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { RegisterNotExistsError } from '../../../errors/register-not-exists';
import { LoadAllPersonsByDocumentRepositoryProtocol } from '../../../protocols/repositories/person/load-all-persons-by-document.protocol';
import { InsertRelationshipRepositoryProtocol } from '../../../protocols/repositories/relationship/insert-relationship-repository-protocol';
import { CreateRelationshipParamsProtocol } from '../../../protocols/usecases/relationship/create-relationship-usecase-protocol';
import { ValidationProtocol } from '../../../protocols/validation-protocol';

interface SutProtocols {
  sut: CreateRelationshipUsecase;
  insertRelationshipRepositoryStub: InsertRelationshipRepositoryProtocol;
  loadAllPersonsByDocumentRepositoryStub: LoadAllPersonsByDocumentRepositoryProtocol;
  documentValidatorStub: ValidationProtocol;
  documentOnlyNumbersValidatorStub: ValidationProtocol;
}

const mockInsertRelationshipRepository =
  (): InsertRelationshipRepositoryProtocol => {
    class InsertRelationshipRepositoryStub
      implements InsertRelationshipRepositoryProtocol
    {
      insert(data: CreateRelationshipParamsProtocol): Promise<void> {
        return Promise.resolve();
      }
    }
    return new InsertRelationshipRepositoryStub();
  };

const mockLoadAllPersonsByDocumentRepository =
  (): LoadAllPersonsByDocumentRepositoryProtocol => {
    class LoadAllPersonsByDocumentRepositoryStub
      implements LoadAllPersonsByDocumentRepositoryProtocol
    {
      loadAllByDocument(cpfs: string[]): Promise<boolean> {
        return Promise.resolve(true);
      }
    }
    return new LoadAllPersonsByDocumentRepositoryStub();
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
  const insertRelationshipRepositoryStub = mockInsertRelationshipRepository();
  const loadAllPersonsByDocumentRepositoryStub =
    mockLoadAllPersonsByDocumentRepository();
  const documentValidatorStub = mockDocumentValidator();
  const documentOnlyNumbersValidatorStub = mockDocumentOnlyNumbersValidator();
  const sut = new CreateRelationshipUsecase(
    insertRelationshipRepositoryStub,
    loadAllPersonsByDocumentRepositoryStub,
    documentValidatorStub,
    documentOnlyNumbersValidatorStub,
  );
  return {
    sut,
    insertRelationshipRepositoryStub,
    loadAllPersonsByDocumentRepositoryStub,
    documentValidatorStub,
    documentOnlyNumbersValidatorStub,
  };
};

describe('CreateRelationship Usecase', () => {
  it('should return error if some cpf is not provided', async () => {
    const { sut } = makeSut();
    const params = { cpf1: 'any_document', cpf2: '' };
    const result = await sut.create(params);
    expect(result).toBeInstanceOf(MissingParamError);
  });

  it('should call DocumentValidator with correct params', async () => {
    const { sut, documentValidatorStub } = makeSut();
    const params = { cpf1: 'any_document', cpf2: 'any_document' };
    const validateSpy = jest.spyOn(documentValidatorStub, 'validate');
    await sut.create(params);
    expect(validateSpy).toHaveBeenCalledWith(params.cpf1);
    expect(validateSpy).toHaveBeenCalledWith(params.cpf2);
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it('should call DocumentOnlyNumbersValidator with correct param', async () => {
    const { sut, documentOnlyNumbersValidatorStub } = makeSut();
    const params = { cpf1: 'any_document', cpf2: 'any_document' };
    const validateSpy = jest.spyOn(
      documentOnlyNumbersValidatorStub,
      'validate',
    );
    await sut.create(params);
    expect(validateSpy).toHaveBeenCalledWith(params.cpf1);
    expect(validateSpy).toHaveBeenCalledWith(params.cpf2);
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it('should call LoadAllPersonsByDocumentRepository with correct params', async () => {
    const { sut, loadAllPersonsByDocumentRepositoryStub } = makeSut();
    const loadAllByDocumentSpy = jest.spyOn(
      loadAllPersonsByDocumentRepositoryStub,
      `loadAllByDocument`,
    );
    const params = { cpf1: 'any_document', cpf2: 'other_document' };
    await sut.create(params);
    expect(loadAllByDocumentSpy).toHaveBeenCalledWith([
      'any_document',
      'other_document',
    ]);
  });

  it('should return true if create relationship on success', async () => {
    const { sut } = makeSut();
    const params = { cpf1: 'any_document', cpf2: 'other_document' };
    const result = await sut.create(params);
    expect(result).toBeTruthy();
  });

  it('should return MissingParamError if some document is not provided', async () => {
    const { sut } = makeSut();
    const params = { cpf1: 'any_document', cpf2: '' };
    const result = await sut.create(params);
    expect(result).toBeInstanceOf(MissingParamError);
  });

  it('should return DocumentLengthError if DocumentValidator return false', async () => {
    const { sut, documentValidatorStub } = makeSut();
    jest.spyOn(documentValidatorStub, 'validate').mockReturnValue(false);
    const params = { cpf1: 'any_document', cpf2: 'any_document' };
    const result = await sut.create(params);
    expect(result).toBeInstanceOf(DocumentLengthError);
  });

  it('should return InvalidCaractersError if DocumentOnlyNumbersValidator return false', async () => {
    const { sut, documentOnlyNumbersValidatorStub } = makeSut();
    jest
      .spyOn(documentOnlyNumbersValidatorStub, 'validate')
      .mockReturnValue(false);
    const params = { cpf1: 'any_document', cpf2: 'any_document' };
    const result = await sut.create(params);
    expect(result).toBeInstanceOf(InvalidCaractersError);
  });

  it('should return InvalidRelationshipError if documents to be equals', async () => {
    const { sut } = makeSut();
    const params = { cpf1: 'any_document', cpf2: 'any_document' };
    const result = await sut.create(params);
    expect(result).toBeInstanceOf(InvalidRelationshipError);
  });

  it('should return MissingParamError if LoadAllPersonsByDocumentRepository return false', async () => {
    const { sut, loadAllPersonsByDocumentRepositoryStub } = makeSut();
    jest
      .spyOn(loadAllPersonsByDocumentRepositoryStub, 'loadAllByDocument')
      .mockReturnValue(Promise.resolve(false));
    const params = { cpf1: 'any_document', cpf2: 'other_document' };
    const result = await sut.create(params);
    expect(result).toBeInstanceOf(RegisterNotExistsError);
  });

  it('should return true if create relationship on success', async () => {
    const { sut } = makeSut();
    const params = { cpf1: 'any_document', cpf2: 'other_document' };
    const result = await sut.create(params);
    expect(result).toBeTruthy();
  });
});
