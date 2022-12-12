import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../../enums/status-code-enum';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { InvalidCaractersError } from '../../../errors/invalid-characters-error';
import { InvalidRelationshipError } from '../../../errors/invalid-relationship-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { createRelationshipUsecaseFactory } from '../../factories/usecases/relationship/create-relationship-usecase-factory';

const createRelationshipUsecase = createRelationshipUsecaseFactory();

export class CreateRelationshipController {
  async handle(request: Request, response: Response) {
    try {
      const { document1, document2 } = request.body;
      const relationship: any = await createRelationshipUsecase.create({
        document1,
        document2,
      });
      if (relationship instanceof MissingParamError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new MissingParamError());
      }
      if (relationship instanceof InvalidCaractersError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new InvalidCaractersError());
      }
      if (relationship instanceof DocumentLengthError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new DocumentLengthError());
      }
      if (relationship instanceof InvalidRelationshipError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new InvalidRelationshipError());
      }
      return response.status(StatusCodeEnum.CREATED).json();
    } catch (error) {
      return response
        .status(StatusCodeEnum.SERVER_ERROR)
        .json(new UnexpectedError());
    }
  }
}
