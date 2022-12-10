import { randomUUID } from 'crypto';
import { InsertRelationshipRepositoryProtocol } from '../../protocols/repositories/relationship/insert-relationship-repository-protocol';
import { CreateRelationshipParamsProtocol } from '../../protocols/usecases/relationship/create-relationship-usecase-protocol';
import { relationshipTable } from '../db/relationship-table';

export class MemoryRelationshipRepository
  implements InsertRelationshipRepositoryProtocol
{
  async insert(data: CreateRelationshipParamsProtocol): Promise<void> {
    const relationship = { ...data, id: randomUUID() };
    relationshipTable.push(relationship);
  }
}
