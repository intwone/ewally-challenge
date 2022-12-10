import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../../enums/status-code-enum';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { loadAllRelationships } from '../../factories/usecases/relationship/load-all-relationships';

const loadAllRelationshipsUsecase = loadAllRelationships();

export class LoadAllRelationshipsController {
  async handle(request: Request, response: Response) {
    try {
      const relationships = await loadAllRelationshipsUsecase.loadAll();
      return response.status(StatusCodeEnum.OK).json(relationships);
    } catch (error) {
      return response
        .status(StatusCodeEnum.SERVER_ERROR)
        .json(new UnexpectedError());
    }
  }
}
