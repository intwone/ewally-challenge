import { Request, Response } from 'express';
import { CreatePersonUsecase } from '../../../core/person/create-person-usecase';
import { DocumentAlreadyInUseError } from '../../../errors/document-already-in-use-error';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { InvalidCaractersError } from '../../../errors/invalid-characters-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { MemoryPersonRepository } from '../../../infra/repositories/memory-person-repository';
import { DocumentOnlyNumberValidator } from '../../../validators/document-only-numbers-validator';
import { DocumentValidation } from '../../../validators/document-validator';

const documentValidator = new DocumentValidation();
const documentOnlyNumberValidator = new DocumentOnlyNumberValidator();
const memoryPersonRepository = new MemoryPersonRepository();
const createPersonUsecase = new CreatePersonUsecase(
  memoryPersonRepository,
  memoryPersonRepository,
  documentValidator,
  documentOnlyNumberValidator,
);

export class CreatePersonController {
  async handle(request: Request, response: Response) {
    try {
      const { document, name } = request.body;
      const person = await createPersonUsecase.create({
        document,
        name,
      });
      if (person instanceof MissingParamError) {
        return response.status(400).json(new MissingParamError());
      }
      if (person instanceof DocumentLengthError) {
        return response.status(400).json(new DocumentLengthError());
      }
      if (person instanceof InvalidCaractersError) {
        return response.status(400).json(new InvalidCaractersError());
      }
      if (person instanceof DocumentAlreadyInUseError) {
        return response.status(400).json(new DocumentAlreadyInUseError());
      }
      return response.status(201).json(person);
    } catch (error) {
      return response.status(500).json(new UnexpectedError());
    }
  }
}
