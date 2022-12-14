import { DocumentLengthError } from '../../errors/document-length-error';
import { InvalidCaractersError } from '../../errors/invalid-characters-error';
import { MissingParamError } from '../../errors/missing-param-error';
import { RegisterNotExistsError } from '../../errors/register-not-exists';
import { LoadPersonByDocumentRepositoryProtocol } from '../../protocols/repositories/person/load-person-by-document-repository-protocol';
import { LoadRecommendationsRepositoryProtocol } from '../../protocols/repositories/recommendations/load-recommendations-repository-protocol';
import { LoadRecommendationsUsecaseProtocol } from '../../protocols/usecases/recommendation/load-recommendations-usecase-protocol';
import { ValidationProtocol } from '../../protocols/validation-protocol';

export class LoadARecommendationsUsecase
  implements LoadRecommendationsUsecaseProtocol
{
  constructor(
    private readonly loadRecommendationsRepository: LoadRecommendationsRepositoryProtocol,
    private readonly loadPersonByDocumentRepository: LoadPersonByDocumentRepositoryProtocol,
    private readonly documentValidator: ValidationProtocol,
    private readonly documentOnlyNumbersValidator: ValidationProtocol,
  ) {}

  async loadAll(cpf: string): Promise<string[]> {
    if (!cpf) {
      return new MissingParamError() as unknown as string[];
    }
    const isValidLengthDocument = this.documentValidator.validate(cpf);
    if (!isValidLengthDocument) {
      return new DocumentLengthError() as unknown as string[];
    }
    const documentHaveOnlyNumbers =
      this.documentOnlyNumbersValidator.validate(cpf);
    if (!documentHaveOnlyNumbers) {
      return new InvalidCaractersError() as unknown as string[];
    }
    const person = await this.loadPersonByDocumentRepository.loadByDocument(
      cpf,
    );
    if (!person?.cpf) {
      return new RegisterNotExistsError() as unknown as string[];
    }
    const recommendation = await this.loadRecommendationsRepository.load(cpf);
    return recommendation.length ? recommendation : [];
  }
}
