import { PersonProtocol } from '../../models/person-model-protocol';

export interface LoadAllPersonsUsecaseProtocol {
  loadAll: () => Promise<PersonProtocol[]>;
}
