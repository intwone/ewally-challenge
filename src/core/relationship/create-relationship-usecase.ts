import { LoadPersonByDocumentRepositoryProtocol } from '../../protocols/repositories/person/load-person-by-document-repository-protocol';
import { InsertRelationshipRepositoryProtocol } from '../../protocols/repositories/relationship/insert-relationship-repository-protocol';
import {
  CreateRelationshipParamsProtocol,
  CreateRelationshipUsecaseProtocol,
} from '../../protocols/usecases/relationship/create-relationship-usecase-protocol';

export class CreateRelationshipUsecase
  implements CreateRelationshipUsecaseProtocol
{
  constructor(
    private readonly loadPersonByDocumentRepository: LoadPersonByDocumentRepositoryProtocol,
    private readonly insertRelationshipRepository: InsertRelationshipRepositoryProtocol,
  ) {}

  async create(persons: CreateRelationshipParamsProtocol): Promise<boolean> {
    for await (const document of Object.values(persons)) {
      const personFound =
        await this.loadPersonByDocumentRepository.loadByDocument(document);
      if (!personFound) return false;
    }
    await this.insertRelationshipRepository.insert(persons);
    return true;
  }
}
