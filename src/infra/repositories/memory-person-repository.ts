import { randomUUID } from 'crypto';
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
  async loadByDocument(document: string): Promise<PersonProtocol> {
    const personFound = personTable.find(
      person => person.document === document,
    );
    return personFound as PersonProtocol;
  }

  async loadAllByDocument(documents: string[]): Promise<boolean> {
    const documentsFound = [];

    for (const document of documents) {
      const personFound = personTable.find(
        person => person.document === document,
      );
      if (personFound) {
        documentsFound.push(document);
      }
    }
    return documentsFound.length === documents.length;
  }

  async insert(data: CreatePersonParamsProtocol): Promise<PersonProtocol> {
    const person = { ...data, id: randomUUID() };
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
