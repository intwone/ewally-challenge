import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../../enums/status-code-enum';
import { UnexpectedError } from '../../../errors/unexpected-error';
import { cleanPersonsControllerFactory } from '../../factories/usecases/person/clean-persons-controller-factory';

const cleanPersonsUsecase = cleanPersonsControllerFactory();

export class CleanPersonsController {
  async handle(request: Request, response: Response) {
    try {
      await cleanPersonsUsecase.clean();
      return response.status(StatusCodeEnum.OK).json();
    } catch (error) {
      return response
        .status(StatusCodeEnum.SERVER_ERROR)
        .json(new UnexpectedError());
    }
  }
}
