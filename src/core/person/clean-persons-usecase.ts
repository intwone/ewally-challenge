import { CleanPersonsRepositoryProtocol } from '../../protocols/repositories/person/clean-persons-repository-protocol';
import { CleanPersonsUsecaseProtocol } from '../../protocols/usecases/person/clean-persons-usecase-protocol';

export class CreatePersonsUsecase implements CleanPersonsUsecaseProtocol {
  constructor(
    private readonly cleanPersonsRepository: CleanPersonsRepositoryProtocol,
  ) {}

  async clean(): Promise<void> {
    this.cleanPersonsRepository.clean();
  }
}
