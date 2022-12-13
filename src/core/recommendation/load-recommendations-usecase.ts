import { DocumentLengthError } from '../../errors/document-length-error';
import { InvalidCaractersError } from '../../errors/invalid-characters-error';
import { MissingParamError } from '../../errors/missing-param-error';
import { LoadRecommendationsRepositoryProtocol } from '../../protocols/repositories/recommendations/load-recommendations-repository-protocol';
import { ValidationProtocol } from '../../protocols/validation-protocol';

export class LoadARecommendationsUsecase
  implements LoadARecommendationsUsecase
{
  constructor(
    private readonly loadRecommendationsRepository: LoadRecommendationsRepositoryProtocol,
    private readonly documentValidator: ValidationProtocol,
    private readonly documentOnlyNumbersValidator: ValidationProtocol,
  ) {}

  async loadAll(document: string): Promise<string[]> {
    if (!document) {
      return new MissingParamError() as unknown as string[];
    }
    const isValidLengthDocument = this.documentValidator.validate(document);
    if (!isValidLengthDocument) {
      return new DocumentLengthError() as unknown as string[];
    }
    const documentHaveOnlyNumbers =
      this.documentOnlyNumbersValidator.validate(document);
    if (!documentHaveOnlyNumbers) {
      return new InvalidCaractersError() as unknown as string[];
    }
    const recommendation = await this.loadRecommendationsRepository.load(
      document,
    );
    return recommendation.length ? recommendation : [];
  }
}
