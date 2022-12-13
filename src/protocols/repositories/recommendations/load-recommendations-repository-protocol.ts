export interface RecommendationFriendResultProtocol {
  id: string;
  document: string;
}

export interface LoadRecommendationsRepositoryProtocol {
  load: (document: string) => Promise<string[]>;
}
