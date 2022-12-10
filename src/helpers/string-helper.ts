export class StringHelper {
  static removeDocumentMask(document: string): string {
    return document.replace(/\W/g, '');
  }
}
