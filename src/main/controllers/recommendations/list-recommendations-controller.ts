import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../../enums/status-code-enum';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { RegisterNotExistsError } from '../../../errors/register-not-exists';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { loadRecommendationsUsecaseFactory } from '../../factories/usecases/recommendation/load-recommendations-usecase-factory';

const loadRecommendationsUsecase = loadRecommendationsUsecaseFactory();

export class ListRecommendationsController {
  async handle(request: Request, response: Response) {
    try {
      const recommendation = await loadRecommendationsUsecase.loadAll(
        request.params.cpf,
      );
      if (recommendation instanceof MissingParamError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new MissingParamError());
      }
      if (recommendation instanceof DocumentLengthError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new DocumentLengthError());
      }
      if (recommendation instanceof RegisterNotExistsError) {
        return response
          .status(StatusCodeEnum.BAD_REQUEST)
          .json(new RegisterNotExistsError());
      }
      return response.status(StatusCodeEnum.OK).json(recommendation);
    } catch (error) {
      return response
        .status(StatusCodeEnum.SERVER_ERROR)
        .json(new UnexpectedError());
    }
  }
}
