export interface LoadAllPersonsByDocumentRepositoryProtocol {
  loadAllByDocument: (cpfs: string[]) => Promise<boolean>;
}
