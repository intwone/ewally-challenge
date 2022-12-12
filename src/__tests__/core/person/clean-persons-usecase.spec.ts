import { CleanPersonsUsecase } from '../../../core/person/clean-persons-usecase';
import { CleanPersonsRepositoryProtocol } from '../../../protocols/repositories/person/clean-persons-repository-protocol';

interface SutProtocols {
  sut: CleanPersonsUsecase;
  cleanPersonsRepositoryProtocolStub: CleanPersonsRepositoryProtocol;
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

const makeSut = (): SutProtocols => {
  const cleanPersonsRepositoryProtocolStub = mockCleanPersonsRepository();
  const sut = new CleanPersonsUsecase(cleanPersonsRepositoryProtocolStub);
  return {
    sut,
    cleanPersonsRepositoryProtocolStub,
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
});
