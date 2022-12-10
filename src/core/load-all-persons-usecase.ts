import { LoadAllPersonsUsecaseProtocol } from '../protocols/load-all-persons-usecase-protocol';
import { PersonProtocol } from '../protocols/models/person-model-protocol';
import { PersonRepositoryProtocol } from '../protocols/repositories/person-repository-protocol';

export class LoadAllPersonsUsecase implements LoadAllPersonsUsecaseProtocol {
  constructor(private readonly personRepository: PersonRepositoryProtocol) {}

  async loadAll(): Promise<PersonProtocol[]> {
    const persons = await this.personRepository.loadAll();
    return persons;
  }
}
