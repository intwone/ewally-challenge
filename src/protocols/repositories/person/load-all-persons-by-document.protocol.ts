export interface LoadAllPersonsByDocumentRepositoryProtocol {
  loadAllByDocument: (documents: string[]) => Promise<boolean>;
}
