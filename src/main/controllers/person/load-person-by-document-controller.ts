import { Request, Response } from 'express';
import { LoadPersonByDocumentUsecase } from '../../../core/person/load-person-by-document-usecase';
import { StringHelper } from '../../../helpers/string-helper';
import { MemoryPersonRepository } from '../../../infra/repositories/memory-person-repository';

const memoryPersonRepository = new MemoryPersonRepository();
const loadPersonByDocumentUsecase = new LoadPersonByDocumentUsecase(
  memoryPersonRepository,
);

export class LoadPersonByDocumentController {
  async handle(request: Request, response: Response) {
    try {
      const { document } = request.params;
      const formattedDocument = StringHelper.removeDocumentMask(document);
      const person = await loadPersonByDocumentUsecase.load(formattedDocument);
      if (!person) {
        return response.status(404).json({
          code: 'NOT_EXISTS_ERROR',
          message: 'document does not exist.',
        });
      }
      return response.json(person);
    } catch (error) {
      return response.status(500).json({
        code: 'UNEXPECTED_ERROR',
        message: 'an unexpected error occurred.',
      });
    }
  }
}
