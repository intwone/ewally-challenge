import { DocumentLengthError } from '../../errors/document-length-error';
import { InvalidCaractersError } from '../../errors/invalid-characters-error';
import { MissingParamError } from '../../errors/missing-param-error';
import { RegisterNotExists } from '../../errors/register-not-exists';
import { StringHelperProtocol } from '../../protocols/helpers/string-helper-protocol';
import { PersonProtocol } from '../../protocols/models/person-model-protocol';
import { LoadPersonByDocumentRepositoryProtocol } from '../../protocols/repositories/person/load-person-by-document-repository-protocol';
import { ValidationProtocol } from '../../protocols/validation-protocol';

export class LoadPersonByDocumentUsecase
  implements LoadPersonByDocumentUsecase
{
  constructor(
    private readonly loadPersonByDocumentRepository: LoadPersonByDocumentRepositoryProtocol,
    private readonly stringHelper: StringHelperProtocol,
    private readonly documentValidator: ValidationProtocol,
    private readonly documentOnlyNumbersValidator: ValidationProtocol,
  ) {}

  async load(document: string): Promise<PersonProtocol> {
    if (!document) {
      return new MissingParamError() as unknown as PersonProtocol;
    }
    const isValidLengthDocument = this.documentValidator.validate(document);
    if (!isValidLengthDocument) {
      return new DocumentLengthError() as unknown as PersonProtocol;
    }
    const documentHaveOnlyNumbers =
      this.documentOnlyNumbersValidator.validate(document);
    if (!documentHaveOnlyNumbers) {
      return new InvalidCaractersError() as unknown as PersonProtocol;
    }
    const person = await this.loadPersonByDocumentRepository.loadByDocument(
      document,
    );
    if (!person) {
      return new RegisterNotExists() as unknown as PersonProtocol;
    }
    return person;
  }
}
