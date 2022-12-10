import { PersonProtocol } from '../../models/person-model-protocol';
import { CreatePersonParamsProtocol } from '../../usecases/person/create-person-usecase-protocol';

export interface InsertPersonRepositoryProtocol {
  insert: (data: CreatePersonParamsProtocol) => Promise<PersonProtocol>;
}
