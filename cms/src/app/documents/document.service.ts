import { Injectable , EventEmitter} from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Array<Document>  = [];
  highDocumentId!: number;
  documentSelectedEvent = new EventEmitter<Document>();
  documentChanged = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  
  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.highDocumentId = this.getHighId();
  }

  getDocuments(): Array<Document> {
    return this.documents.slice();
  } 

  getDocument(id: string): Document {
    return this.documents.find(element => element.id == id)!;
  }

  addDocument(newDocument: Document) {
    if(!newDocument) {
      return;
    }

    this.highDocumentId++;
    newDocument.id = this.highDocumentId.toString();
    this.documents.push(newDocument);
    let documentListClone: Document[] = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

  updateDocument(oldDocument: Document, newDocument: Document) {
    if(!oldDocument || !newDocument) {
      return;
    }

    let position: number = this.documents.indexOf(oldDocument);
    if(position < 0) {
      return
    }

    newDocument.id = oldDocument.id;
    this.documents[position] = newDocument;
    let documentListClone: Document[] = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
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
    let documentListClone: Document[] = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

  getHighId(): number {
    let maxId: number = 0;
    this.documents.forEach(document => {
      let currentId: number = parseInt(document.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }
}
