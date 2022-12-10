import { randomUUID } from 'crypto';
import { RelationshipProtocol } from '../../protocols/models/relationship-model-protocol';
import { InsertRelationshipRepositoryProtocol } from '../../protocols/repositories/relationship/insert-relationship-repository-protocol';
import { LoadAllRelationshipsRepositoryProtocol } from '../../protocols/repositories/relationship/load-all-relationships-repository-protocol';
import { CreateRelationshipParamsProtocol } from '../../protocols/usecases/relationship/create-relationship-usecase-protocol';
import { relationshipsTable } from '../db/relationships-table';

export class MemoryRelationshipRepository
  implements
    InsertRelationshipRepositoryProtocol,
    LoadAllRelationshipsRepositoryProtocol
{
  async insert(data: CreateRelationshipParamsProtocol): Promise<void> {
    const relationship = { ...data, id: randomUUID() };
    relationshipsTable.push(relationship);
  }

  async loadAll(): Promise<RelationshipProtocol[]> {
    return relationshipsTable;
  }
}
