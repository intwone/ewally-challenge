import { Request, Response } from 'express';
import { LoadPersonByDocumentUsecase } from '../../../core/person/load-person-by-document-usecase';
import { StringHelper } from '../../../helpers/string-helper';
import { MemoryPersonRepository } from '../../../infra/repositories/memory-person-repository';
import { DocumentValidation } from '../../../validators/document-validator';

const documentValidator = new DocumentValidation();
const memoryPersonRepository = new MemoryPersonRepository();
const loadPersonByDocumentUsecase = new LoadPersonByDocumentUsecase(
  memoryPersonRepository,
);

export class CreatePersonController {
  async handle(request: Request, response: Response) {
    try {
      const { document, name } = request.body;

      const formattedDocument = StringHelper.removeDocumentMask(document);
      const isValidDocument = documentValidator.validate(formattedDocument);

      if (!isValidDocument) {
        return response.status(400).json({
          code: 'INVALID_LENGTH_DOCUMENT_ERROR',
          message: 'the document should be 11 caracters.',
        });
      }

      const personAlreadyExists = await loadPersonByDocumentUsecase.load(
        formattedDocument,
      );

      if (personAlreadyExists) {
        return response.status(400).json({
          code: 'DOCUMENT_IN_USE_ERROR',
          message: 'the document is already being used.',
        });
      }

      const person = await memoryPersonRepository.insert({
        document: formattedDocument,
        name,
      });

      return response.status(201).json(person);
    } catch (error) {
      return response.status(500).json({
        code: 'UNEXPECTED_ERROR',
        message: 'an unexpected error occurred',
      });
    }
  }
}
