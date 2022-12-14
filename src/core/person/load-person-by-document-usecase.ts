import { InvalidCaractersError } from '../../errors/invalid-characters-error';
import { MissingParamError } from '../../errors/missing-param-error';
import { RegisterNotExistsError } from '../../errors/register-not-exists';
import { PersonProtocol } from '../../protocols/models/person-model-protocol';
import { LoadPersonByDocumentRepositoryProtocol } from '../../protocols/repositories/person/load-person-by-document-repository-protocol';
import { LoadPersonByDocumentUsecaseProtocol } from '../../protocols/usecases/person/load-person-by-document-usecase.protocol';
import { ValidationProtocol } from '../../protocols/validation-protocol';

export class LoadPersonByDocumentUsecase
  implements LoadPersonByDocumentUsecaseProtocol
{
  constructor(
    private readonly loadPersonByDocumentRepository: LoadPersonByDocumentRepositoryProtocol,
    private readonly documentOnlyNumbersValidator: ValidationProtocol,
  ) {}

  async load(cpf: string): Promise<PersonProtocol> {
    if (!cpf) {
      return new MissingParamError() as unknown as PersonProtocol;
    }
    const documentHaveOnlyNumbers =
      this.documentOnlyNumbersValidator.validate(cpf);
    if (!documentHaveOnlyNumbers) {
      return new InvalidCaractersError() as unknown as PersonProtocol;
    }
    const person = await this.loadPersonByDocumentRepository.loadByDocument(
      cpf,
    );
    if (!person) {
      return new RegisterNotExistsError() as unknown as PersonProtocol;
    }
    return person;
  }
}
