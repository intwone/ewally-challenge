import { CleanPersonsRepositoryProtocol } from '../../protocols/repositories/person/clean-persons-repository-protocol';
import { CleanRelationshipsRepositoryProtocol } from '../../protocols/repositories/person/clean-relationships-repository-protocol';
import { CleanPersonsUsecaseProtocol } from '../../protocols/usecases/person/clean-persons-usecase-protocol';

export class CleanPersonsUsecase implements CleanPersonsUsecaseProtocol {
  constructor(
    private readonly cleanPersonsRepository: CleanPersonsRepositoryProtocol,
    private readonly cleanRelationshipsRepository: CleanRelationshipsRepositoryProtocol,
  ) {}

  async clean(): Promise<void> {
    this.cleanPersonsRepository.clean();
    this.cleanRelationshipsRepository.clean();
  }
}
