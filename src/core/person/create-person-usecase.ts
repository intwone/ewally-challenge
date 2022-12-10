import { PersonProtocol } from '../../protocols/models/person-model-protocol';
import { InsertPersonRepositoryProtocol } from '../../protocols/repositories/person/insert-person-repository-protocol';
import {
  CreatePersonParamsProtocol,
  CreatePersonUsecaseProtocol,
} from '../../protocols/usecases/create-person-usecase-protocol';

export class CreatePersonUsecase implements CreatePersonUsecaseProtocol {
  constructor(
    private readonly inserPersonRepository: InsertPersonRepositoryProtocol,
  ) {}

  async create({
    document,
    name,
  }: CreatePersonParamsProtocol): Promise<PersonProtocol> {
    const person = await this.inserPersonRepository.insert({ document, name });
    return person;
  }
}
