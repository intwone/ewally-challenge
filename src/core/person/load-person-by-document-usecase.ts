import { PersonProtocol } from '../../protocols/models/person-model-protocol';
import { LoadPersonByDocumentRepositoryProtocol } from '../../protocols/repositories/load-person-by-document-repository-protocol';

export class LoadPersonByDocumentUsecase
  implements LoadPersonByDocumentUsecase
{
  constructor(
    private readonly loadPersonByDocumentRepository: LoadPersonByDocumentRepositoryProtocol,
  ) {}

  async load(document: string): Promise<PersonProtocol> {
    const person = await this.loadPersonByDocumentRepository.loadByDocument(
      document,
    );
    return person;
  }
}
