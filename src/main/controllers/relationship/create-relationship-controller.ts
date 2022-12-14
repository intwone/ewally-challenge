import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../../enums/status-code-enum';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { InvalidCaractersError } from '../../../errors/invalid-characters-error';
import { InvalidRelationshipError } from '../../../errors/invalid-relationship-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { RegisterNotExistsError } from '../../../errors/register-not-exists';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { createRelationshipUsecaseFactory } from '../../factories/usecases/relationship/create-relationship-usecase-factory';

const createRelationshipUsecase = createRelationshipUsecaseFactory();

export class CreateRelationshipController {
  async handle(request: Request, response: Response) {
    try {
      const { cpf1, cpf2 } = request.body;
      const relationship: any = await createRelationshipUsecase.create({
        cpf1,
        cpf2,
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
      if (relationship instanceof RegisterNotExistsError) {
        return response
          .status(StatusCodeEnum.NOT_FOUND)
          .json(new RegisterNotExistsError());
      }
      return response.status(StatusCodeEnum.OK).json();
    } catch (error) {
      return response
        .status(StatusCodeEnum.SERVER_ERROR)
        .json(new UnexpectedError());
    }
  }
}
