import { PersonProtocol } from '../../models/person-model-protocol';

export interface LoadPersonByDocumentRepositoryProtocol {
  loadByDocument: (document: string) => Promise<PersonProtocol>;
}
