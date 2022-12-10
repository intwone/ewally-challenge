import { Request, Response } from 'express';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { loadAllRelationships } from '../../factories/usecases/relationship/load-all-relationships';

const loadAllRelationshipsUsecase = loadAllRelationships();

export class LoadAllRelationshipsController {
  async handle(request: Request, response: Response) {
    try {
      const relationships = await loadAllRelationshipsUsecase.loadAll();
      return response.json(relationships);
    } catch (error) {
      return response.status(500).json(new UnexpectedError());
    }
  }
}
