import { LoadAllPersonsUsecase } from '../../../../core/person/load-all-persons-usecase';
import { MemoryPersonRepository } from '../../../../infra/repositories/memory-person-repository';

export const loadAllPersonsControllerFactory = (): LoadAllPersonsUsecase => {
  const memoryPersonRepository = new MemoryPersonRepository();
  const loadAllPersonsUsecase = new LoadAllPersonsUsecase(
    memoryPersonRepository,
  );
  return loadAllPersonsUsecase;
};
