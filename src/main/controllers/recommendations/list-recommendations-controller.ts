import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../../enums/status-code-enum';
import { DocumentLengthError } from '../../../errors/document-length-error';
import { MissingParamError } from '../../../errors/missing-param-error';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { loadRecommendationsUsecaseFactory } from '../../factories/usecases/recommendation/load-recommendations-usecase-factory';

const loadRecommendationsUsecase = loadRecommendationsUsecaseFactory();

export class ListRecommendationsController {
  async handle(request: Request, response: Response) {
    try {
      const recommendation = await loadRecommendationsUsecase.loadAll(
        request.params.document,
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
      return response.status(StatusCodeEnum.OK).json(recommendation);
    } catch (error) {
      return response
        .status(StatusCodeEnum.SERVER_ERROR)
        .json(new UnexpectedError());
    }
  }
}
