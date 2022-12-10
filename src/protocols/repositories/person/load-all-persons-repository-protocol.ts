import { PersonProtocol } from '../../models/person-model-protocol';

export interface LoadAllPersonsRepositoryProtocol {
  loadAll: () => Promise<PersonProtocol[]>;
}
