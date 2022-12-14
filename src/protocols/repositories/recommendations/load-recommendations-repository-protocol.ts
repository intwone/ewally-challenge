export interface LoadRecommendationsRepositoryProtocol {
  load: (cpf: string) => Promise<string[]>;
}
