import { PersonProtocol } from './person-model-protocol';

export interface LoadAllPersonsUsecaseProtocol {
  loadAll: () => Promise<PersonProtocol[]>;
}
