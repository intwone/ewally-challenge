export interface CreateRelationshipParamsProtocol {
  document1: string;
  document2: string;
}

export interface CreateRelationshipResultProtocol {
  document: string;
  isFound: boolean;
}

export interface CreateRelationshipUsecaseProtocol {
  create: (persons: CreateRelationshipParamsProtocol) => Promise<boolean>;
}
