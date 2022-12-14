import { PersonProtocol } from '../../models/person-model-protocol';

export interface LoadPersonByDocumentUsecaseProtocol {
  load: (cpf: string) => Promise<PersonProtocol>;
}
