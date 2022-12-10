import { Request, Response } from 'express';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { loadAllPersonsControllerFactory } from '../../factories/usecases/person/load-all-persons-controller-factory';

const loadAllPersonsUsecase = loadAllPersonsControllerFactory();

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
