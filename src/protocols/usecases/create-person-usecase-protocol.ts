import { PersonProtocol } from '../models/person-model-protocol';

export interface CreatePersonParamsProtocol {
  document: string;
  name: string;
}

export interface CreatePersonUsecaseProtocol {
  create: (person: CreatePersonParamsProtocol) => Promise<PersonProtocol>;
}
