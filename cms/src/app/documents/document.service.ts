import { Injectable , EventEmitter} from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Array<Document>  = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Array<Document> {
    return this.documents.slice();
  } 

  getDocument(id: string): Document {
    return this.documents.find(element => element.id == id)!;
  }
}
