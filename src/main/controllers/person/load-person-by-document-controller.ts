import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../../enums/status-code-enum';
import { InvalidCaractersError } from '../../../errors/invalid-characters-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { RegisterNotExistsError } from '../../../errors/register-not-exists';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { loadPersonByDocumentUsecaseFactory } from '../../factories/usecases/person/load-person-by-document-usecase-factory';

const loadPersonByDocumentUsecase = loadPersonByDocumentUsecaseFactory();

export class LoadPersonByDocumentController {
  async handle(request: Request, response: Response) {
    try {
      const { cpf } = request.params;
      const person = await loadPersonByDocumentUsecase.load(cpf);
      if (person instanceof MissingParamError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new MissingParamError());
      }
      if (person instanceof InvalidCaractersError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new InvalidCaractersError());
      }
      if (person instanceof RegisterNotExistsError) {
        return response
          .status(StatusCodeEnum.NOT_FOUND)
          .json(new RegisterNotExistsError());
      }
      return response.status(StatusCodeEnum.OK).json(person);
    } catch (error) {
      return response
        .status(StatusCodeEnum.SERVER_ERROR)
        .json(new UnexpectedError());
    }
  }
}
