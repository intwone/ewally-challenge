import { Request, Response } from 'express';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { cleanPersonsControllerFactory } from '../../factories/usecases/person/clean-persons-controller-factory';

const cleanPersonsUsecase = cleanPersonsControllerFactory();

export class CleanPersonsController {
  async handle(request: Request, response: Response) {
    try {
      await cleanPersonsUsecase.clean();
      return response.json();
    } catch (error) {
      return response.status(500).json(new UnexpectedError());
    }
  }
}
