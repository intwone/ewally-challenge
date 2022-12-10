import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../../enums/status-code-enum';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { loadAllPersonsControllerFactory } from '../../factories/usecases/person/load-all-persons-controller-factory';

const loadAllPersonsUsecase = loadAllPersonsControllerFactory();

export class LoadAllPersonsController {
  async handle(request: Request, response: Response) {
    try {
      const persons = await loadAllPersonsUsecase.loadAll();
      return response.status(StatusCodeEnum.OK).json(persons);
    } catch (error) {
      return response
        .status(StatusCodeEnum.SERVER_ERROR)
        .json(new UnexpectedError());
    }
  }
}
