import { LoadPersonByDocumentUsecase } from '../../../../core/person/load-person-by-document-usecase';
import { MemoryPersonRepository } from '../../../../infra/repositories/memory-person-repository';
import { DocumentOnlyNumberValidator } from '../../../../validators/document-only-numbers-validator';
import { DocumentValidation } from '../../../../validators/document-validator';

export const loadPersonByDocumentUsecaseFactory =
  (): LoadPersonByDocumentUsecase => {
    const documentValidator = new DocumentValidation();
    const documentOnlyNumberValidator = new DocumentOnlyNumberValidator();
    const memoryPersonRepository = new MemoryPersonRepository();
    const loadPersonByDocumentUsecase = new LoadPersonByDocumentUsecase(
      memoryPersonRepository,
      documentValidator,
      documentOnlyNumberValidator,
    );
    return loadPersonByDocumentUsecase;
  };
