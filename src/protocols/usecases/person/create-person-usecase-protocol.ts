import { PersonProtocol } from '../../models/person-model-protocol';

export interface CreatePersonParamsProtocol {
  cpf: string;
  name: string;
}

export interface CreatePersonUsecaseProtocol {
  create: (person: CreatePersonParamsProtocol) => Promise<PersonProtocol>;
}
