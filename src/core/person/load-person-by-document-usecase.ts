import { PersonProtocol } from '../../protocols/models/person-model-protocol';
import { PersonRepositoryProtocol } from '../../protocols/repositories/person-repository-protocol';

export class LoadPersonByDocumentUsecase
  implements LoadPersonByDocumentUsecase
{
  constructor(private readonly personRepository: PersonRepositoryProtocol) {}

  async load(document: string): Promise<PersonProtocol> {
    const person = await this.personRepository.loadByDocument(document);
    return person;
  }
}
