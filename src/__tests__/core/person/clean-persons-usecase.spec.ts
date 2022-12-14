import { CleanPersonsUsecase } from '../../../core/person/clean-persons-usecase';
import { CleanPersonsRepositoryProtocol } from '../../../protocols/repositories/person/clean-persons-repository-protocol';
import { CleanRelationshipsRepositoryProtocol } from '../../../protocols/repositories/person/clean-relationships-repository-protocol';

interface SutProtocols {
  sut: CleanPersonsUsecase;
  cleanPersonsRepositoryProtocolStub: CleanPersonsRepositoryProtocol;
  cleanRelationshipsRepositoryStub: CleanRelationshipsRepositoryProtocol;
}

const mockCleanPersonsRepository = (): CleanPersonsRepositoryProtocol => {
  class CleanPersonsRepositoryProtocolStub
    implements CleanPersonsRepositoryProtocol
  {
    async clean(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new CleanPersonsRepositoryProtocolStub();
};

const mockCleanRelationshipsRepository =
  (): CleanRelationshipsRepositoryProtocol => {
    class CleanRelationshipsRepositoryStub
      implements CleanRelationshipsRepositoryProtocol
    {
      async clean(): Promise<void> {
        return Promise.resolve();
      }
    }
    return new CleanRelationshipsRepositoryStub();
  };

const makeSut = (): SutProtocols => {
  const cleanPersonsRepositoryProtocolStub = mockCleanPersonsRepository();
  const cleanRelationshipsRepositoryStub = mockCleanRelationshipsRepository();
  const sut = new CleanPersonsUsecase(
    cleanPersonsRepositoryProtocolStub,
    cleanRelationshipsRepositoryStub,
  );
  return {
    sut,
    cleanPersonsRepositoryProtocolStub,
    cleanRelationshipsRepositoryStub,
  };
};

describe('CleanPersons Usecase', () => {
  it('should call CleanPersonsRepository', async () => {
    const { sut, cleanPersonsRepositoryProtocolStub } = makeSut();
    const cleanSpy = jest.spyOn(cleanPersonsRepositoryProtocolStub, 'clean');
    sut.clean();
    expect(cleanSpy).toHaveBeenCalled();
    expect(cleanSpy).toHaveBeenCalledTimes(1);
  });

  it('should call CleanRelationshipsRepository', async () => {
    const { sut, cleanRelationshipsRepositoryStub } = makeSut();
    const cleanSpy = jest.spyOn(cleanRelationshipsRepositoryStub, 'clean');
    sut.clean();
    expect(cleanSpy).toHaveBeenCalled();
    expect(cleanSpy).toHaveBeenCalledTimes(1);
  });
});
