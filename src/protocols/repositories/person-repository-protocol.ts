import { PersonProtocol } from '../models/person-model-protocol';
import { CreatePersonParamsProtocol } from '../usecases/create-person-usecase-protocol';

export interface PersonRepositoryProtocol {
  insert: (data: CreatePersonParamsProtocol) => Promise<PersonProtocol>;
  loadAll: () => Promise<PersonProtocol[]>;
  loadByDocument: (document: string) => Promise<PersonProtocol>;
  cleanPersons: () => Promise<void>;
}
