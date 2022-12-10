import { LoadAllRelationshipsUsecase } from '../../../../core/relationship/load-all-relationships-usecase';
import { MemoryRelationshipRepository } from '../../../../infra/repositories/memory-relationship-repository';

export const loadAllRelationships = (): LoadAllRelationshipsUsecase => {
  const memoryRelationshipRepository = new MemoryRelationshipRepository();
  const loadAllRelationshipsUsecase = new LoadAllRelationshipsUsecase(
    memoryRelationshipRepository,
  );
  return loadAllRelationshipsUsecase;
};
