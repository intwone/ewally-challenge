import { CleanPersonsUsecase } from '../../../../core/person/clean-persons-usecase';
import { MemoryPersonRepository } from '../../../../infra/repositories/memory-person-repository';
import { MemoryRelationshipRepository } from '../../../../infra/repositories/memory-relationship-repository';

export const cleanPersonsUsecaseFactory = (): CleanPersonsUsecase => {
  const memoryPersonRepository = new MemoryPersonRepository();
  const memoryRelationshipRepository = new MemoryRelationshipRepository();
  const cleanPersonsUsecase = new CleanPersonsUsecase(
    memoryPersonRepository,
    memoryRelationshipRepository,
  );
  return cleanPersonsUsecase;
};
