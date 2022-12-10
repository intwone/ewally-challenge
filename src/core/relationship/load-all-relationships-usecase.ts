import { RelationshipProtocol } from '../../protocols/models/relationship-model-protocol';
import { LoadAllRelationshipsRepositoryProtocol } from '../../protocols/repositories/relationship/load-all-relationships-repository-protocol';
import { LoadAllRelationshipsUsecaseProtocol } from '../../protocols/usecases/relationship/load-all-relationships-usecase-protocol';

export class LoadAllRelationshipsUsecase
  implements LoadAllRelationshipsUsecaseProtocol
{
  constructor(
    private readonly loadAllRelationshipsRepository: LoadAllRelationshipsRepositoryProtocol,
  ) {}

  async loadAll(): Promise<RelationshipProtocol[]> {
    const loadAllRelationshipsUsecase =
      await this.loadAllRelationshipsRepository.loadAll();
    return loadAllRelationshipsUsecase;
  }
}
