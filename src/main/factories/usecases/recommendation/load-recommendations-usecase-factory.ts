import { LoadARecommendationsUsecase } from '../../../../core/recommendation/load-recommendations-usecase';
import { MemoryPersonRepository } from '../../../../infra/repositories/memory-person-repository';
import { MemoryRecommendationRepository } from '../../../../infra/repositories/memory-recommendation-repository';
import { DocumentOnlyNumberValidator } from '../../../../validators/document-only-numbers-validator';
import { DocumentValidation } from '../../../../validators/document-validator';

export const loadRecommendationsUsecaseFactory =
  (): LoadARecommendationsUsecase => {
    const documentValidator = new DocumentValidation();
    const documentOnlyNumberValidator = new DocumentOnlyNumberValidator();
    const memoryRecommendationRepository = new MemoryRecommendationRepository();
    const memoryPersonRepository = new MemoryPersonRepository();
    const loadRecommendations = new LoadARecommendationsUsecase(
      memoryRecommendationRepository,
      memoryPersonRepository,
      documentValidator,
      documentOnlyNumberValidator,
    );
    return loadRecommendations;
  };
