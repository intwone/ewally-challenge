import { DocumentLengthError } from '../../errors/document-length-error';
import { InvalidCaractersError } from '../../errors/invalid-characters-error';
import { InvalidRelationshipError } from '../../errors/invalid-relationship-error';
import { MissingParamError } from '../../errors/missing-param-error';
import { LoadAllPersonsByDocumentRepositoryProtocol } from '../../protocols/repositories/person/load-all-persons-by-document.protocol';
import { InsertRelationshipRepositoryProtocol } from '../../protocols/repositories/relationship/insert-relationship-repository-protocol';
import {
  CreateRelationshipParamsProtocol,
  CreateRelationshipUsecaseProtocol,
} from '../../protocols/usecases/relationship/create-relationship-usecase-protocol';
import { ValidationProtocol } from '../../protocols/validation-protocol';

export class CreateRelationshipUsecase
  implements CreateRelationshipUsecaseProtocol
{
  constructor(
    private readonly insertRelationshipRepository: InsertRelationshipRepositoryProtocol,
    private readonly loadAllPersonsByDocumentRepository: LoadAllPersonsByDocumentRepositoryProtocol,
    private readonly documentValidator: ValidationProtocol,
    private readonly documentOnlyNumbersValidator: ValidationProtocol,
  ) {}

  async a(persons: CreateRelationshipParamsProtocol): Promise<boolean> {
    if (Object.values(persons).some(document => !document)) {
      return new MissingParamError() as unknown as boolean;
    }
    for await (const personDocument of Object.values(persons)) {
      const isValidLengthDocument =
        this.documentValidator.validate(personDocument);
      if (!isValidLengthDocument) {
        return new DocumentLengthError() as unknown as boolean;
      }
      const documentHaveOnlyNumbers =
        this.documentOnlyNumbersValidator.validate(personDocument);
      if (!documentHaveOnlyNumbers) {
        return new InvalidCaractersError() as unknown as boolean;
      }
    }
    if (persons.document1 === persons.document2) {
      return new InvalidRelationshipError() as unknown as boolean;
    }
    const personFounds =
      await this.loadAllPersonsByDocumentRepository.loadAllByDocument([
        persons.document1,
        persons.document2,
      ]);
    if (!personFounds) {
      return new MissingParamError() as unknown as boolean;
    }
    await this.insertRelationshipRepository.insert(persons);
    return true;
  }
}
