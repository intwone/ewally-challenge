import { Request, Response } from 'express';
import { LoadAllPersonsUsecase } from '../../../core/person/load-all-persons-usecase';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { MemoryPersonRepository } from '../../../infra/repositories/memory-person-repository';

const memoryPersonRepository = new MemoryPersonRepository();
const loadAllPersonsUsecase = new LoadAllPersonsUsecase(memoryPersonRepository);

export class LoadAllPersonsController {
  async handle(request: Request, response: Response) {
    try {
      const persons = await loadAllPersonsUsecase.loadAll();
      return response.json(persons);
    } catch (error) {
      return response.status(500).json(new UnexpectedError());
    }
  }
}
