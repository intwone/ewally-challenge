import { randomUUID } from 'crypto';
import { PersonProtocol } from '../../protocols/models/person-model-protocol';
import { PersonRepositoryProtocol } from '../../protocols/repositories/person-repository-protocol';
import { CreatePersonParamsProtocol } from '../../protocols/usecases/create-person-usecase-protocol';
import { personTable } from '../db/person-table';

export class MemoryPersonRepository implements PersonRepositoryProtocol {
  async loadByDocument(document: string): Promise<PersonProtocol> {
    const personFound = personTable.find(
      person => person.document === document,
    );
    return personFound as PersonProtocol;
  }

  async insert(data: CreatePersonParamsProtocol): Promise<PersonProtocol> {
    const person = { ...data, id: randomUUID() };
    personTable.push(person);
    return person;
  }

  async cleanPersons(): Promise<void> {
    personTable.length = 0;
  }

  async loadAll(): Promise<PersonProtocol[]> {
    return personTable;
  }
}
