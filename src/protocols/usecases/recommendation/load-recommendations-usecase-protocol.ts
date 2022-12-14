export interface LoadRecommendationsUsecaseProtocol {
  loadAll: (cpf: string) => Promise<string[]>;
}
