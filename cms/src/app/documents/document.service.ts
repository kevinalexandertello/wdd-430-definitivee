import { Injectable , EventEmitter} from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Array<Document>  = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChanged = new EventEmitter<Document[]>();
  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Array<Document> {
    return this.documents.slice();
  } 

  getDocument(id: string): Document {
    return this.documents.find(element => element.id == id)!;
  }
  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }

    const position = this.documents.indexOf(document);
    if (position < 0) {
      return;
    }

    this.documents.splice(position, 1);
    this.documentChanged.emit(this.documents.slice());
  }
}
