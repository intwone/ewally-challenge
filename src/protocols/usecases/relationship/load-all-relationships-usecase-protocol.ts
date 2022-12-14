import { RelationshipProtocol } from '../../models/relationship-model-protocol';

export interface LoadAllRelationshipsUsecaseProtocol {
  loadAll: (cpf: string) => Promise<RelationshipProtocol[]>;
}
