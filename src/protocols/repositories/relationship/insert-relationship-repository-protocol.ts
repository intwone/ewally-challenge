import { CreateRelationshipParamsProtocol } from '../../usecases/relationship/create-relationship-usecase-protocol';

export interface InsertRelationshipRepositoryProtocol {
  insert: (data: CreateRelationshipParamsProtocol) => Promise<void>;
}
