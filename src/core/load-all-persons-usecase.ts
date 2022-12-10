import { PersonProtocol } from '../protocols/models/person-model-protocol';
import { PersonRepositoryProtocol } from '../protocols/repositories/person-repository-protocol';
import { LoadAllPersonsUsecaseProtocol } from '../protocols/usecases/load-all-persons-usecase-protocol';

export class LoadAllPersonsUsecase implements LoadAllPersonsUsecaseProtocol {
  constructor(private readonly personRepository: PersonRepositoryProtocol) {}

  async loadAll(): Promise<PersonProtocol[]> {
    const persons = await this.personRepository.loadAll();
    return persons;
  }
}
