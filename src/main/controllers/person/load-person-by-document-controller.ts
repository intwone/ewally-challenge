import { Request, Response } from 'express';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { RegisterNotExists } from '../../../errors/register-not-exists';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { loadPersonByDocumentControllerFactory } from '../../factories/usecases/person/load-person-by-document-controller-factory';

const loadPersonByDocumentUsecase = loadPersonByDocumentControllerFactory();

export class LoadPersonByDocumentController {
  async handle(request: Request, response: Response) {
    try {
      const { document } = request.params;
      const person = await loadPersonByDocumentUsecase.load(document);
      if (person instanceof MissingParamError) {
        return response.status(400).json(new MissingParamError());
      }
      if (person instanceof DocumentLengthError) {
        return response.status(400).json(new DocumentLengthError());
      }
      if (person instanceof RegisterNotExists) {
        return response.status(404).json(new RegisterNotExists());
      }
      return response.json(person);
    } catch (error) {
      return response.status(500).json(new UnexpectedError());
    }
  }
}
