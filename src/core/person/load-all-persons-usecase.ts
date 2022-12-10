import { PersonProtocol } from '../../protocols/models/person-model-protocol';
import { LoadAllPersonsRepositoryProtocol } from '../../protocols/repositories/load-all-persons-repository-protocol';
import { LoadAllPersonsUsecaseProtocol } from '../../protocols/usecases/load-all-persons-usecase-protocol';

export class LoadAllPersonsUsecase implements LoadAllPersonsUsecaseProtocol {
  constructor(
    private readonly loadAllPersonsRepository: LoadAllPersonsRepositoryProtocol,
  ) {}

  async loadAll(): Promise<PersonProtocol[]> {
    const persons = await this.loadAllPersonsRepository.loadAll();
    return persons;
  }
}
