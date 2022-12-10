import { Request, Response } from 'express';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { InvalidCaractersError } from '../../../errors/invalid-characters-error';
import { InvalidRelationshipError } from '../../../errors/invalid-relationship-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { createRelationshipControllerFactory } from '../../factories/usecases/relationship/create-relationship-controller-factory';

const createRelationshipUsecase = createRelationshipControllerFactory();

export class CreateRelationshipController {
  async handle(request: Request, response: Response) {
    try {
      const { document1, document2 } = request.body;
      const relationship: any = await createRelationshipUsecase.create({
        document1,
        document2,
      });
      if (relationship instanceof MissingParamError) {
        return response.status(400).json(new MissingParamError());
      }
      if (relationship instanceof InvalidCaractersError) {
        return response.status(404).json(new InvalidCaractersError());
      }
      if (relationship instanceof DocumentLengthError) {
        return response.status(400).json(new DocumentLengthError());
      }
      if (relationship instanceof InvalidRelationshipError) {
        return response.status(400).json(new InvalidRelationshipError());
      }
      return response.json();
    } catch (error) {
      return response.status(500).json(new UnexpectedError());
    }
  }
}
