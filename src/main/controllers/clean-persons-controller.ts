import { Request, Response } from 'express';
import { CreatePersonsUsecase } from '../../core/clean-persons-usecase';
import { MemoryPersonRepository } from '../../infra/repositories/memory-person-repository';

const memoryPersonRepository = new MemoryPersonRepository();
const createPersonsUsecase = new CreatePersonsUsecase(memoryPersonRepository);

export class CleanPersonsController {
  async handle(request: Request, response: Response) {
    try {
      await createPersonsUsecase.clean();

      return response.json();
    } catch (error) {
      return response.status(500).json({
        code: 'UNEXPECTED_ERROR',
        message: 'an unexpected error occurred',
      });
    }
  }
}
