import { CreateRelationshipUsecase } from '../../../../core/relationship/create-relationship-usecase';
import { MemoryPersonRepository } from '../../../../infra/repositories/memory-person-repository';
import { MemoryRelationshipRepository } from '../../../../infra/repositories/memory-relationship-repository';
import { DocumentOnlyNumberValidator } from '../../../../validators/document-only-numbers-validator';
import { DocumentValidation } from '../../../../validators/document-validator';

export const createRelationshipControllerFactory =
  (): CreateRelationshipUsecase => {
    const documentValidator = new DocumentValidation();
    const documentOnlyNumberValidator = new DocumentOnlyNumberValidator();
    const memoryRelationshipRepository = new MemoryRelationshipRepository();
    const memoryPersonRepository = new MemoryPersonRepository();
    const createRelationshipUsecase = new CreateRelationshipUsecase(
      memoryRelationshipRepository,
      memoryPersonRepository,
      documentValidator,
      documentOnlyNumberValidator,
    );
    return createRelationshipUsecase;
  };
