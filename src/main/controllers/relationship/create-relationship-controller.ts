import { Request, Response } from 'express';
import { CreateRelationshipUsecase } from '../../../core/relationship/create-relationship-usecase';
import { MemoryPersonRepository } from '../../../infra/repositories/memory-person-repository';
import { MemoryRelationshipRepository } from '../../../infra/repositories/memory-relationship-repository';
import { DocumentValidation } from '../../../validators/document-validator';

const documentValidator = new DocumentValidation();
const memoryRelationshipRepository = new MemoryRelationshipRepository();
const memoryPersonRepository = new MemoryPersonRepository();
const createRelationshipUsecase = new CreateRelationshipUsecase(
  memoryPersonRepository,
  memoryRelationshipRepository,
);

export class CreateRelationshipController {
  async handle(request: Request, response: Response) {
    try {
      const { document1, document2 } = request.body;

      if ([document1, document2].some(document => !document)) {
        return response.status(400).json({
          code: 'MISSING_PARAM_ERROR',
          message: `two documents should be provided to create a relationship`,
        });
      }

      for (const document of [document1, document2]) {
        const isValidDocument = documentValidator.validate(document);
        if (!isValidDocument) {
          return response.status(400).json({
            code: 'INVALID_LENGTH_DOCUMENT_ERROR',
            message: `the document ${document} should be 11 caracters.`,
          });
        }
      }
      if (document1 === document2) {
        return response.status(400).json({
          code: 'INVALID_RELATIONSHIP',
          message: 'you cannot create a relationship with the same documents',
        });
      }
      const createRelationshipResult = await createRelationshipUsecase.create({
        document1,
        document2,
      });
      if (!createRelationshipResult) {
        return response.status(404).json({
          code: 'NOT_EXISTS_ERROR',
          message: 'one of the documents provided does not exist.',
        });
      }
      return response.json();
    } catch (error) {
      return response.status(500).json({
        code: 'UNEXPECTED_ERROR',
        message: 'an unexpected error occurred.',
      });
    }
  }
}
