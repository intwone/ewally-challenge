import { RelationshipProtocol } from '../../models/relationship-model-protocol';

export interface LoadAllRelationshipsUsecaseProtocol {
  loadAll: () => Promise<RelationshipProtocol[]>;
}
