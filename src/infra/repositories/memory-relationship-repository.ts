import { RelationshipProtocol } from '../../protocols/models/relationship-model-protocol';
import { CleanRelationshipsRepositoryProtocol } from '../../protocols/repositories/person/clean-relationships-repository-protocol';
import { InsertRelationshipRepositoryProtocol } from '../../protocols/repositories/relationship/insert-relationship-repository-protocol';
import { LoadAllRelationshipsRepositoryProtocol } from '../../protocols/repositories/relationship/load-all-relationships-repository-protocol';
import { CreateRelationshipParamsProtocol } from '../../protocols/usecases/relationship/create-relationship-usecase-protocol';
import { relationshipsTable } from '../db/relationships-table';

export class MemoryRelationshipRepository
  implements
    InsertRelationshipRepositoryProtocol,
    LoadAllRelationshipsRepositoryProtocol,
    CleanRelationshipsRepositoryProtocol
{
  async insert(data: CreateRelationshipParamsProtocol): Promise<void> {
    const relationship = { ...data };
    relationshipsTable.push(relationship);
  }

  async loadAll(): Promise<RelationshipProtocol[]> {
    return relationshipsTable;
  }

  async clean(): Promise<void> {
    relationshipsTable.length = 0;
  }
}
