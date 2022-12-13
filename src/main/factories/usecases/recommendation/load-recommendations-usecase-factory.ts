import { LoadARecommendationsUsecase } from '../../../../core/recommendation/load-recommendations-usecase';
import { MemoryRecommendationRepository } from '../../../../infra/repositories/memory-recommendation-repository';
import { DocumentOnlyNumberValidator } from '../../../../validators/document-only-numbers-validator';
import { DocumentValidation } from '../../../../validators/document-validator';

export const loadRecommendationsUsecaseFactory =
  (): LoadARecommendationsUsecase => {
    const documentValidator = new DocumentValidation();
    const documentOnlyNumberValidator = new DocumentOnlyNumberValidator();
    const memoryRecommendationRepository = new MemoryRecommendationRepository();
    const loadRecommendations = new LoadARecommendationsUsecase(
      memoryRecommendationRepository,
      documentValidator,
      documentOnlyNumberValidator,
    );
    return loadRecommendations;
  };
