import { CreatePersonUsecase } from '../../../../core/person/create-person-usecase';
import { MemoryPersonRepository } from '../../../../infra/repositories/memory-person-repository';
import { DocumentOnlyNumberValidator } from '../../../../validators/document-only-numbers-validator';
import { DocumentValidation } from '../../../../validators/document-validator';

export const createPersonControllerFactory = (): CreatePersonUsecase => {
  const documentValidator = new DocumentValidation();
  const documentOnlyNumberValidator = new DocumentOnlyNumberValidator();
  const memoryPersonRepository = new MemoryPersonRepository();
  const createPersonUsecase = new CreatePersonUsecase(
    memoryPersonRepository,
    memoryPersonRepository,
    documentValidator,
    documentOnlyNumberValidator,
  );
  return createPersonUsecase;
};
