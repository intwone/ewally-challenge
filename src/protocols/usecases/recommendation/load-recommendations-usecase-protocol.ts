import { RelationshipProtocol } from '../../models/relationship-model-protocol';

export interface LoadAllRelationshipsUsecaseProtocol {
  load: () => Promise<RelationshipProtocol[]>;
}
