/* eslint-disable max-classes-per-file */
import { LoadAllPersonsUsecase } from '../../../core/person/load-all-persons-usecase';
import { PersonProtocol } from '../../../protocols/models/person-model-protocol';
import { LoadAllPersonsRepositoryProtocol } from '../../../protocols/repositories/person/load-all-persons-repository-protocol';

interface SutProtocols {
  sut: LoadAllPersonsUsecase;
  loadAllPersonsRepositoryStub: LoadAllPersonsRepositoryProtocol;
}

const mockLoadAllPersonsRepository = (): LoadAllPersonsRepositoryProtocol => {
  class LoadAllPersonsRepositoryStub
    implements LoadAllPersonsRepositoryProtocol
  {
    loadAll(): Promise<PersonProtocol[]> {
      return Promise.resolve([
        {
          id: 'any_id1',
          name: 'any_name1',
          document: 'any_document1',
        },
        {
          id: 'any_id2',
          name: 'any_name2',
          document: 'any_document2',
        },
      ]);
    }
  }
  return new LoadAllPersonsRepositoryStub();
};

const makeSut = (): SutProtocols => {
  const loadAllPersonsRepositoryStub = mockLoadAllPersonsRepository();
  const sut = new LoadAllPersonsUsecase(loadAllPersonsRepositoryStub);
  return {
    sut,
    loadAllPersonsRepositoryStub,
  };
};

describe('LoadAllPersons Usecase', () => {
  it('should call LoadAllPersonsRepository', async () => {
    const { sut, loadAllPersonsRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadAllPersonsRepositoryStub, 'loadAll');
    await sut.loadAll();
    expect(loadAllSpy).toHaveBeenCalled();
    expect(loadAllSpy).toHaveBeenCalledTimes(1);
  });
});
