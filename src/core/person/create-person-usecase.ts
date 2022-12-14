import { DocumentAlreadyInUseError } from '../../errors/document-already-in-use-error';
import { DocumentLengthError } from '../../errors/document-length-error';
import { InvalidCaractersError } from '../../errors/invalid-characters-error';
import { MissingParamError } from '../../errors/missing-param-error';
import { PersonProtocol } from '../../protocols/models/person-model-protocol';
import { InsertPersonRepositoryProtocol } from '../../protocols/repositories/person/insert-person-repository-protocol';
import { LoadPersonByDocumentRepositoryProtocol } from '../../protocols/repositories/person/load-person-by-document-repository-protocol';
import {
  CreatePersonParamsProtocol,
  CreatePersonUsecaseProtocol,
} from '../../protocols/usecases/person/create-person-usecase-protocol';
import { ValidationProtocol } from '../../protocols/validation-protocol';

export class CreatePersonUsecase implements CreatePersonUsecaseProtocol {
  constructor(
    private readonly inserPersonRepository: InsertPersonRepositoryProtocol,
    private readonly loadPersonByDocumentRepository: LoadPersonByDocumentRepositoryProtocol,
    private readonly documentValidator: ValidationProtocol,
    private readonly documentOnlyNumbersValidator: ValidationProtocol,
  ) {}

  async create({
    cpf,
    name,
  }: CreatePersonParamsProtocol): Promise<PersonProtocol> {
    if ([cpf, name].some(param => !param)) {
      return new MissingParamError() as unknown as PersonProtocol;
    }
    const isValidLengthDocument = this.documentValidator.validate(cpf);
    if (!isValidLengthDocument) {
      return new DocumentLengthError() as unknown as PersonProtocol;
    }
    const documentHaveOnlyNumbers =
      this.documentOnlyNumbersValidator.validate(cpf);
    if (!documentHaveOnlyNumbers) {
      return new InvalidCaractersError() as unknown as PersonProtocol;
    }
    const personAlreadyExists =
      await this.loadPersonByDocumentRepository.loadByDocument(cpf);
    if (personAlreadyExists) {
      return new DocumentAlreadyInUseError() as unknown as PersonProtocol;
    }
    const person = await this.inserPersonRepository.insert({ cpf, name });
    return person;
  }
}
