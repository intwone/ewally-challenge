import { PersonProtocol } from '../../protocols/models/person-model-protocol';
import { CleanPersonsRepositoryProtocol } from '../../protocols/repositories/person/clean-persons-repository-protocol';
import { InsertPersonRepositoryProtocol } from '../../protocols/repositories/person/insert-person-repository-protocol';
import { LoadAllPersonsByDocumentRepositoryProtocol } from '../../protocols/repositories/person/load-all-persons-by-document.protocol';
import { LoadAllPersonsRepositoryProtocol } from '../../protocols/repositories/person/load-all-persons-repository-protocol';
import { LoadPersonByDocumentRepositoryProtocol } from '../../protocols/repositories/person/load-person-by-document-repository-protocol';
import { CreatePersonParamsProtocol } from '../../protocols/usecases/person/create-person-usecase-protocol';
import { personTable } from '../db/person-table';

export class MemoryPersonRepository
  implements
    CleanPersonsRepositoryProtocol,
    InsertPersonRepositoryProtocol,
    LoadAllPersonsRepositoryProtocol,
    LoadPersonByDocumentRepositoryProtocol,
    LoadAllPersonsByDocumentRepositoryProtocol
{
  async loadByDocument(cpf: string): Promise<PersonProtocol> {
    const personFound = personTable.find(person => person.cpf === cpf);
    return personFound as PersonProtocol;
  }

  async loadAllByDocument(cpfs: string[]): Promise<boolean> {
    const cpfsFound = [];

    for (const cpf of cpfs) {
      const personFound = personTable.find(person => person.cpf === cpf);
      if (personFound) {
        cpfsFound.push(cpf);
      }
    }
    return cpfsFound.length === cpfs.length;
  }

  async insert(data: CreatePersonParamsProtocol): Promise<PersonProtocol> {
    const person = { ...data };
    personTable.push(person);
    return person;
  }

  async clean(): Promise<void> {
    personTable.length = 0;
  }

  async loadAll(): Promise<PersonProtocol[]> {
    return personTable;
  }
}
