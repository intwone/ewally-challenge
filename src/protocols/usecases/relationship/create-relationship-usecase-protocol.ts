export interface CreateRelationshipParamsProtocol {
  cpf1: string;
  cpf2: string;
}

export interface CreateRelationshipResultProtocol {
  document: string;
  isFound: boolean;
}

export interface CreateRelationshipUsecaseProtocol {
  create: (persons: CreateRelationshipParamsProtocol) => Promise<boolean>;
}
