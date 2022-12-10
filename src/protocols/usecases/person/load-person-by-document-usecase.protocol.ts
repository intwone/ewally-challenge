import { PersonProtocol } from '../../models/person-model-protocol';

export interface LoadPersonByDocumentUsecaseProtocol {
  load: (document: string) => Promise<PersonProtocol>;
}
