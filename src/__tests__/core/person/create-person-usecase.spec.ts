/* eslint-disable max-classes-per-file */
import { CreatePersonUsecase } from '../../../core/person/create-person-usecase';
import { DocumentAlreadyInUseError } from '../../../errors/document-already-in-use-error';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { InvalidCaractersError } from '../../../errors/invalid-characters-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { PersonProtocol } from '../../../protocols/models/person-model-protocol';
import { InsertPersonRepositoryProtocol } from '../../../protocols/repositories/person/insert-person-repository-protocol';
import { LoadPersonByDocumentRepositoryProtocol } from '../../../protocols/repositories/person/load-person-by-document-repository-protocol';
import { CreatePersonParamsProtocol } from '../../../protocols/usecases/person/create-person-usecase-protocol';
import { ValidationProtocol } from '../../../protocols/validation-protocol';

interface SutProtocols {
  sut: CreatePersonUsecase;
  insertPersonRepositoryStub: InsertPersonRepositoryProtocol;
  loadPersonByDocumentRepositoryStub: LoadPersonByDocumentRepositoryProtocol;
  documentValidatorStub: ValidationProtocol;
  documentOnlyNumbersValidatorStub: ValidationProtocol;
}

const mockInserPersonRepository = (): InsertPersonRepositoryProtocol => {
  class InsertPersonRepositoryProtocolStub
    implements InsertPersonRepositoryProtocol
  {
    insert(data: CreatePersonParamsProtocol): Promise<PersonProtocol> {
      return Promise.resolve({
        cpf: 'any_document',
        name: 'any_name',
      });
    }
  }
  return new InsertPersonRepositoryProtocolStub();
};

const mockLoadPersonByDocumentoRepository =
  (): LoadPersonByDocumentRepositoryProtocol => {
    class LoadPersonByDocumentRepositoryStub
      implements LoadPersonByDocumentRepositoryProtocol
    {
      loadByDocument(cpf: string): Promise<PersonProtocol> {
        return Promise.resolve(null as unknown as PersonProtocol);
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
  const insertPersonRepositoryStub = mockInserPersonRepository();
  const loadPersonByDocumentRepositoryStub =
    mockLoadPersonByDocumentoRepository();
  const documentValidatorStub = mockDocumentValidator();
  const documentOnlyNumbersValidatorStub = mockDocumentOnlyNumbersValidator();
  const sut = new CreatePersonUsecase(
    insertPersonRepositoryStub,
    loadPersonByDocumentRepositoryStub,
    documentValidatorStub,
    documentOnlyNumbersValidatorStub,
  );
  return {
    sut,
    insertPersonRepositoryStub,
    loadPersonByDocumentRepositoryStub,
    documentValidatorStub,
    documentOnlyNumbersValidatorStub,
  };
};

describe('CreatePersons Usecase', () => {
  it('should return error if same params is not provided', async () => {
    const { sut } = makeSut();
    const params = { cpf: 'any_document', name: '' };
    const result = await sut.create(params);
    expect(result).toBeInstanceOf(MissingParamError);
  });

  it('should call DocumentValidator with correct param', async () => {
    const { sut, documentValidatorStub } = makeSut();
    const params = { cpf: 'any_document', name: 'any_name' };
    const validateSpy = jest.spyOn(documentValidatorStub, 'validate');
    await sut.create(params);
    expect(validateSpy).toHaveBeenCalledWith(params.cpf);
  });

  it('should call DocumentOnlyNumbersValidator with correct param', async () => {
    const { sut, documentOnlyNumbersValidatorStub } = makeSut();
    const params = { cpf: 'any_document', name: 'any_name' };
    const validateSpy = jest.spyOn(
      documentOnlyNumbersValidatorStub,
      'validate',
    );
    await sut.create(params);
    expect(validateSpy).toHaveBeenCalledWith(params.cpf);
  });

  it('should call LoadPersonByDocumentRepository with correct param', async () => {
    const { sut, loadPersonByDocumentRepositoryStub } = makeSut();
    const params = { cpf: 'any_document', name: 'any_name' };
    const loadByDocumentSpy = jest.spyOn(
      loadPersonByDocumentRepositoryStub,
      'loadByDocument',
    );
    await sut.create(params);
    expect(loadByDocumentSpy).toHaveBeenCalledWith(params.cpf);
  });

  it('should call InserPersonRepository with corrects values', async () => {
    const { sut, insertPersonRepositoryStub } = makeSut();
    const insertSpy = jest.spyOn(insertPersonRepositoryStub, 'insert');
    const params = { cpf: 'any_document', name: 'any_name' };
    await sut.create(params);
    expect(insertSpy).toHaveBeenCalledWith(params);
  });

  it('should return DocumentLengthError if DocumentValidator returns false', async () => {
    const { sut, documentValidatorStub } = makeSut();
    jest.spyOn(documentValidatorStub, 'validate').mockReturnValue(false);
    const params = { cpf: 'any_document', name: 'any_name' };
    const result = await sut.create(params);
    expect(result).toBeInstanceOf(DocumentLengthError);
  });

  it('should return InvalidCaractersError if DocumentOnlyNumbersValidator returns false', async () => {
    const { sut, documentOnlyNumbersValidatorStub } = makeSut();
    jest
      .spyOn(documentOnlyNumbersValidatorStub, 'validate')
      .mockReturnValue(false);
    const params = { cpf: 'any_document', name: 'any_name' };
    const result = await sut.create(params);
    expect(result).toBeInstanceOf(InvalidCaractersError);
  });

  it('should return DocumentAlreadyInUseError if LoadByDocument returns a person', async () => {
    const { sut, loadPersonByDocumentRepositoryStub } = makeSut();
    jest
      .spyOn(loadPersonByDocumentRepositoryStub, 'loadByDocument')
      .mockReturnValue(
        Promise.resolve({
          name: 'any_name',
          cpf: 'any_document',
        }),
      );
    const params = { cpf: 'any_document', name: 'any_name' };
    const result = await sut.create(params);
    expect(result).toBeInstanceOf(DocumentAlreadyInUseError);
  });

  it('should return a person created', async () => {
    const { sut } = makeSut();
    const params = { cpf: 'any_document', name: 'any_name' };
    const result = await sut.create(params);
    expect(result).toEqual({
      name: 'any_name',
      cpf: 'any_document',
    });
  });
});
