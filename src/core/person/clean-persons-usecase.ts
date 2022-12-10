import { PersonRepositoryProtocol } from '../../protocols/repositories/person-repository-protocol';
import { CleanPersonsUsecaseProtocol } from '../../protocols/usecases/clean-persons-usecase-protocol';

export class CreatePersonsUsecase implements CleanPersonsUsecaseProtocol {
  constructor(private readonly personRepository: PersonRepositoryProtocol) {}

  async clean(): Promise<void> {
    this.personRepository.cleanPersons();
  }
}
