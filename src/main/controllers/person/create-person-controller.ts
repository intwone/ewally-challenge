import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../../enums/status-code-enum';
import { DocumentAlreadyInUseError } from '../../../errors/document-already-in-use-error';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { InvalidCaractersError } from '../../../errors/invalid-characters-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { createPersonUsecaseFactory } from '../../factories/usecases/person/create-person-usecase-factory';

const createPersonUsecase = createPersonUsecaseFactory();

export class CreatePersonController {
  async handle(request: Request, response: Response) {
    try {
      const { cpf, name } = request.body;
      const person = await createPersonUsecase.create({
        cpf,
        name,
      });
      if (person instanceof MissingParamError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new MissingParamError());
      }
      if (person instanceof DocumentLengthError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new DocumentLengthError());
      }
      if (person instanceof InvalidCaractersError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new InvalidCaractersError());
      }
      if (person instanceof DocumentAlreadyInUseError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new DocumentAlreadyInUseError());
      }
      return response.status(StatusCodeEnum.OK).json(person);
    } catch (error) {
      return response
        .status(StatusCodeEnum.SERVER_ERROR)
        .json(new UnexpectedError());
    }
  }
}
