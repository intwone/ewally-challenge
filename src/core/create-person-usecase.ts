import { PersonProtocol } from '../protocols/models/person-model-protocol';
import { PersonRepositoryProtocol } from '../protocols/repositories/person-repository-protocol';
import {
  CreatePersonParamsProtocol,
  CreatePersonUsecaseProtocol,
} from '../protocols/usecases/create-person-usecase-protocol';

export class CreatePersonUsecase implements CreatePersonUsecaseProtocol {
  constructor(private readonly personRepository: PersonRepositoryProtocol) {}

  async create({
    document,
    name,
  }: CreatePersonParamsProtocol): Promise<PersonProtocol> {
    const person = await this.personRepository.insert({ document, name });
    return person;
  }
}
