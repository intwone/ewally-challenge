import { PersonProtocol } from '../../models/person-model-protocol';

export interface LoadPersonByDocumentRepositoryProtocol {
  loadByDocument: (cpf: string) => Promise<PersonProtocol>;
}
