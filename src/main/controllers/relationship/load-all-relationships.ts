import { Request, Response } from 'express';
import { LoadAllRelationshipsUsecase } from '../../../core/relationship/load-all-relationships-usecase';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { MemoryRelationshipRepository } from '../../../infra/repositories/memory-relationship-repository';

const memoryRelationshipRepository = new MemoryRelationshipRepository();
const loadAllRelationshipsUsecase = new LoadAllRelationshipsUsecase(
  memoryRelationshipRepository,
);

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
