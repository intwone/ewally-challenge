import { CleanPersonsUsecase } from '../../../../core/person/clean-persons-usecase';
import { MemoryPersonRepository } from '../../../../infra/repositories/memory-person-repository';

export const cleanPersonsUsecaseFactory = (): CleanPersonsUsecase => {
  const memoryPersonRepository = new MemoryPersonRepository();
  const cleanPersonsUsecase = new CleanPersonsUsecase(memoryPersonRepository);
  return cleanPersonsUsecase;
};
