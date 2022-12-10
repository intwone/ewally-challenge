import { RelationshipProtocol } from '../../models/relationship-model-protocol';

export interface LoadAllRelationshipsRepositoryProtocol {
  loadAll: () => Promise<RelationshipProtocol[]>;
}
